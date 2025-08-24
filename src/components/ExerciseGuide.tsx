import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  Wind, 
  Heart,
  Timer,
  Volume2,
  VolumeX
} from "lucide-react";
import { toast } from "sonner";

interface ExerciseStep {
  id: number;
  instruction: string;
  duration: number;
  type: "instruction" | "breathing" | "hold" | "mindfulness";
}

interface ExerciseGuideProps {
  exercise: {
    id: string;
    title: string;
    description: string;
    duration: string;
    category: string;
    steps: ExerciseStep[];
  };
  onComplete: () => void;
  onClose: () => void;
}

export function ExerciseGuide({ exercise, onComplete, onClose }: ExerciseGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(exercise.steps[0]?.duration || 0);
  const [totalTime, setTotalTime] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Sound effects using Web Audio API
  const playSound = (type: 'start' | 'step' | 'complete' | 'breathe') => {
    if (!soundEnabled) return;
    
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    let frequency = 440;
    let duration = 0.3;
    
    switch (type) {
      case 'start':
        frequency = 523; // C5
        duration = 0.5;
        break;
      case 'step':
        frequency = 659; // E5
        duration = 0.3;
        break;
      case 'complete':
        frequency = 784; // G5
        duration = 0.8;
        break;
      case 'breathe':
        frequency = 392; // G4
        duration = 0.2;
        break;
    }
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  };

  useEffect(() => {
    const total = exercise.steps.reduce((sum, step) => sum + step.duration, 0);
    setTotalTime(total);
  }, [exercise]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            // Play step transition sound
            playSound('step');
            
            // Move to next step or complete
            if (currentStep < exercise.steps.length - 1) {
              setCurrentStep(prev => prev + 1);
              return exercise.steps[currentStep + 1].duration;
            } else {
              setIsCompleted(true);
              setIsActive(false);
              playSound('complete');
              return 0;
            }
          }
          
          // Play breathing sound for breathing exercises
          if (exercise.steps[currentStep]?.type === 'breathing' && time % 4 === 0) {
            playSound('breathe');
          }
          
          return time - 1;
        });
      }, 1000);
    } else if (timeLeft === 0 && !isCompleted) {
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, currentStep, exercise.steps, isCompleted]);

  const startExercise = () => {
    setIsActive(true);
    playSound('start');
    if (currentStep === 0 && timeLeft === 0) {
      setTimeLeft(exercise.steps[0].duration);
    }
  };

  const pauseExercise = () => {
    setIsActive(false);
  };

  const resetExercise = () => {
    setIsActive(false);
    setCurrentStep(0);
    setTimeLeft(exercise.steps[0].duration);
    setIsCompleted(false);
  };

  const completeExercise = () => {
    setIsCompleted(true);
    setIsActive(false);
    toast.success("Exercise completed! 🌟", {
      description: "Great job taking time for your well-being",
    });
    onComplete();
  };

  const currentStepData = exercise.steps[currentStep];
  const progressPercentage = isCompleted 
    ? 100 
    : ((currentStep * 100) / exercise.steps.length) + 
      ((exercise.steps[currentStep]?.duration - timeLeft) / exercise.steps[currentStep]?.duration) * (100 / exercise.steps.length);

  const getStepIcon = (type: string) => {
    switch (type) {
      case "breathing":
        return <Wind className="h-5 w-5 text-primary" />;
      case "mindfulness":
        return <Heart className="h-5 w-5 text-primary" />;
      default:
        return <Timer className="h-5 w-5 text-primary" />;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isCompleted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center space-y-6">
          <div className="space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <h2 className="text-2xl font-bold text-primary">
              Exercise Complete! 🌟
            </h2>
            <p className="text-muted-foreground">
              You've successfully completed the {exercise.title} exercise.
              Take a moment to notice how you feel.
            </p>
          </div>
          
          <div className="space-y-3">
            <Button 
              onClick={resetExercise}
              variant="gentle"
              className="w-full"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Do It Again
            </Button>
            <Button 
              onClick={onClose}
              variant="hero"
              className="w-full"
            >
              Continue Journey
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          {getStepIcon(exercise.category)}
          {exercise.title}
        </CardTitle>
        <p className="text-muted-foreground">{exercise.description}</p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Step {currentStep + 1} of {exercise.steps.length}</span>
            <span>{formatTime(timeLeft)}</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Current Step */}
        <Card className="bg-gradient-gentle border-primary/20">
          <CardContent className="p-6 text-center space-y-4">
            <h3 className="text-lg font-medium">
              {currentStepData?.instruction}
            </h3>
            
            {currentStepData?.type === "breathing" && (
              <div className="text-6xl font-bold text-primary animate-pulse">
                {timeLeft}
              </div>
            )}
            
            {currentStepData?.type === "hold" && (
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">
                  {formatTime(timeLeft)}
                </div>
                <p className="text-sm text-muted-foreground">
                  Hold this position
                </p>
              </div>
            )}
            
            {currentStepData?.type === "mindfulness" && (
              <div className="space-y-2">
                <div className="text-2xl text-primary">
                  🧘‍♀️
                </div>
                <div className="text-lg font-medium text-primary">
                  {formatTime(timeLeft)}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSoundEnabled(!soundEnabled)}
          >
            {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>
          
          {!isActive ? (
            <Button onClick={startExercise} variant="hero" size="lg">
              <Play className="h-5 w-5 mr-2" />
              {currentStep === 0 && timeLeft === exercise.steps[0]?.duration ? "Start" : "Resume"}
            </Button>
          ) : (
            <Button onClick={pauseExercise} variant="gentle" size="lg">
              <Pause className="h-5 w-5 mr-2" />
              Pause
            </Button>
          )}
          
          <Button variant="ghost" size="icon" onClick={resetExercise}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-between">
          <Button variant="ghost" onClick={onClose}>
            Exit Exercise
          </Button>
          <Button variant="ghost" onClick={completeExercise}>
            Mark Complete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}