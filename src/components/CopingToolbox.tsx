import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Leaf, 
  Brain, 
  Heart, 
  Wind, 
  Sun, 
  Waves,
  Clock,
  Play,
  Star,
  Plus
} from "lucide-react";
import { toast } from "sonner";
import { ExerciseGuide } from "./ExerciseGuide";

interface CopingStrategy {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: "breathing" | "mindfulness" | "grounding" | "movement" | "cognitive";
  icon: any;
  isFavorite: boolean;
  steps: Array<{
    id: number;
    instruction: string;
    duration: number;
    type: "instruction" | "breathing" | "hold" | "mindfulness";
  }>;
}

export function CopingToolbox() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeExercise, setActiveExercise] = useState<CopingStrategy | null>(null);
  const [strategies, setStrategies] = useState<CopingStrategy[]>([
    {
      id: "box-breathing",
      title: "Box Breathing",
      description: "4-4-4-4 breathing pattern to calm your nervous system",
      duration: "3 min",
      category: "breathing",
      icon: Wind,
      isFavorite: true,
      steps: [
        { id: 1, instruction: "Let's begin with finding a comfortable position", duration: 10, type: "instruction" },
        { id: 2, instruction: "Breathe in slowly through your nose", duration: 4, type: "breathing" },
        { id: 3, instruction: "Hold your breath gently", duration: 4, type: "hold" },
        { id: 4, instruction: "Exhale slowly through your mouth", duration: 4, type: "breathing" },
        { id: 5, instruction: "Hold empty for a moment", duration: 4, type: "hold" },
        { id: 6, instruction: "Continue this pattern", duration: 150, type: "breathing" },
        { id: 7, instruction: "Take a moment to notice how you feel", duration: 15, type: "mindfulness" }
      ]
    },
    {
      id: "54321-grounding",
      title: "5-4-3-2-1 Grounding",
      description: "Use your senses to ground yourself in the present moment",
      duration: "5 min",
      category: "grounding",
      icon: Leaf,
      isFavorite: false,
      steps: [
        { id: 1, instruction: "Find a comfortable position and take a deep breath", duration: 15, type: "instruction" },
        { id: 2, instruction: "Look around and name 5 things you can see", duration: 45, type: "mindfulness" },
        { id: 3, instruction: "Notice 4 things you can touch or feel", duration: 45, type: "mindfulness" },
        { id: 4, instruction: "Listen for 3 different sounds around you", duration: 45, type: "mindfulness" },
        { id: 5, instruction: "Identify 2 things you can smell", duration: 30, type: "mindfulness" },
        { id: 6, instruction: "Think of 1 thing you can taste", duration: 20, type: "mindfulness" },
        { id: 7, instruction: "Take three deep breaths and feel yourself in the present", duration: 30, type: "breathing" }
      ]
    },
    {
      id: "body-scan",
      title: "Body Scan Meditation",
      description: "Progressive relaxation through body awareness",
      duration: "10 min",
      category: "mindfulness",
      icon: Heart,
      isFavorite: true,
      steps: [
        { id: 1, instruction: "Lie down or sit comfortably with your eyes closed", duration: 20, type: "instruction" },
        { id: 2, instruction: "Focus on your toes, notice any sensations", duration: 60, type: "mindfulness" },
        { id: 3, instruction: "Move your attention to your feet and ankles", duration: 60, type: "mindfulness" },
        { id: 4, instruction: "Scan up through your legs, noticing each part", duration: 90, type: "mindfulness" },
        { id: 5, instruction: "Focus on your torso, from hips to shoulders", duration: 90, type: "mindfulness" },
        { id: 6, instruction: "Notice your arms, from shoulders to fingertips", duration: 60, type: "mindfulness" },
        { id: 7, instruction: "Scan your neck, face, and the top of your head", duration: 60, type: "mindfulness" },
        { id: 8, instruction: "Feel your whole body at once, completely relaxed", duration: 60, type: "mindfulness" }
      ]
    },
    {
      id: "thought-stop",
      title: "Thought Stopping",
      description: "Interrupt negative thought cycles with gentle redirection",
      duration: "2 min",
      category: "cognitive",
      icon: Brain,
      isFavorite: false,
      steps: [
        { id: 1, instruction: "Notice the negative thought pattern", duration: 15, type: "instruction" },
        { id: 2, instruction: "Say 'STOP' out loud or in your mind", duration: 5, type: "instruction" },
        { id: 3, instruction: "Take 3 deep breaths to create space", duration: 15, type: "breathing" },
        { id: 4, instruction: "Replace with a positive or neutral thought", duration: 30, type: "mindfulness" },
        { id: 5, instruction: "Focus on the present moment", duration: 45, type: "mindfulness" },
        { id: 6, instruction: "Acknowledge your strength in redirecting thoughts", duration: 10, type: "mindfulness" }
      ]
    },
    {
      id: "gentle-movement",
      title: "Gentle Movement",
      description: "Simple stretches to release tension and boost mood",
      duration: "7 min",
      category: "movement",
      icon: Sun,
      isFavorite: false,
      steps: [
        { id: 1, instruction: "Stand with your feet hip-width apart", duration: 10, type: "instruction" },
        { id: 2, instruction: "Roll your shoulders back and down 5 times", duration: 30, type: "instruction" },
        { id: 3, instruction: "Gently turn your head left and right", duration: 30, type: "instruction" },
        { id: 4, instruction: "Reach your arms up and stretch to each side", duration: 60, type: "instruction" },
        { id: 5, instruction: "Do gentle forward fold, hanging loose", duration: 45, type: "instruction" },
        { id: 6, instruction: "Stand and do gentle side bends", duration: 60, type: "instruction" },
        { id: 7, instruction: "End with 3 deep breaths, arms overhead", duration: 20, type: "breathing" },
        { id: 8, instruction: "Notice how your body feels now", duration: 25, type: "mindfulness" }
      ]
    },
    {
      id: "wave-breathing",
      title: "Wave Breathing",
      description: "Rhythmic breathing like ocean waves for deep calm",
      duration: "5 min",
      category: "breathing",
      icon: Waves,
      isFavorite: false,
      steps: [
        { id: 1, instruction: "Sit comfortably and imagine ocean waves", duration: 15, type: "instruction" },
        { id: 2, instruction: "Breathe in slowly like a wave building", duration: 6, type: "breathing" },
        { id: 3, instruction: "Exhale slowly like a wave receding", duration: 8, type: "breathing" },
        { id: 4, instruction: "Continue this wave-like rhythm", duration: 240, type: "breathing" },
        { id: 5, instruction: "Feel the calm that comes like still water", duration: 30, type: "mindfulness" }
      ]
    },
  ]);

  const categories = [
    { value: "all", label: "All Tools", icon: Star },
    { value: "breathing", label: "Breathing", icon: Wind },
    { value: "mindfulness", label: "Mindfulness", icon: Heart },
    { value: "grounding", label: "Grounding", icon: Leaf },
    { value: "cognitive", label: "Cognitive", icon: Brain },
    { value: "movement", label: "Movement", icon: Sun },
  ];

  const filteredStrategies = selectedCategory === "all" 
    ? strategies 
    : strategies.filter(s => s.category === selectedCategory);

  const favoriteStrategies = strategies.filter(s => s.isFavorite);

  const toggleFavorite = (id: string) => {
    setStrategies(prev => 
      prev.map(strategy => 
        strategy.id === id 
          ? { ...strategy, isFavorite: !strategy.isFavorite }
          : strategy
      )
    );
  };

  const startExercise = (strategy: CopingStrategy) => {
    setActiveExercise(strategy);
  };

  const handleExerciseComplete = () => {
    toast.success("Exercise completed! 🌟", {
      description: "Great job taking time for your well-being",
    });
    setActiveExercise(null);
  };

  const handleExerciseClose = () => {
    setActiveExercise(null);
  };

  const getCategoryColor = (category: CopingStrategy["category"]) => {
    const colors = {
      breathing: "calm",
      mindfulness: "gentle",
      grounding: "energy",
      cognitive: "hero",
      movement: "energy",
    };
    return colors[category] || "gentle";
  };

  if (activeExercise) {
    return (
      <div className="min-h-screen bg-background p-4">
        <ExerciseGuide 
          exercise={activeExercise}
          onComplete={handleExerciseComplete}
          onClose={handleExerciseClose}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Your Personal Wellness Toolkit 🧰
        </h1>
        <p className="text-muted-foreground">
          Save the strategies that help you most
        </p>
      </div>

      {/* Favorites Section */}
      {favoriteStrategies.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Your Favorites
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {favoriteStrategies.map((strategy) => {
              const IconComponent = strategy.icon;
              return (
                <Card key={strategy.id} className="hover:shadow-soft transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-gradient-calm">
                          <IconComponent className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium">{strategy.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{strategy.duration}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="hero"
                        size="sm"
                        onClick={() => startExercise(strategy)}
                      >
                        <Play className="h-3 w-3 mr-1" />
                        Start
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? "hero" : "gentle"}
              size="sm"
              onClick={() => setSelectedCategory(category.value)}
              className="gap-2"
            >
              <IconComponent className="h-4 w-4" />
              {category.label}
            </Button>
          );
        })}
      </div>

      {/* All Strategies */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStrategies.map((strategy) => {
          const IconComponent = strategy.icon;
          return (
            <Card 
              key={strategy.id} 
              className="hover:shadow-soft transition-all hover:scale-105"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl bg-gradient-${getCategoryColor(strategy.category)}`}>
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{strategy.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{strategy.duration}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(strategy.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Star 
                      className={`h-4 w-4 ${
                        strategy.isFavorite 
                          ? "fill-yellow-400 text-yellow-400" 
                          : "text-muted-foreground"
                      }`} 
                    />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-4">
                  {strategy.description}
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="capitalize">
                    {strategy.category}
                  </Badge>
                  <Button
                    variant="hero"
                    size="sm"
                    onClick={() => startExercise(strategy)}
                  >
                    <Play className="h-3 w-3 mr-1" />
                    Start
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Add Custom Strategy */}
      <Card className="border-dashed border-2 border-border/50 hover:border-primary/30 transition-colors">
        <CardContent className="p-8 text-center">
          <Plus className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <h3 className="font-medium mb-1">Add Your Own Strategy</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Create a custom coping technique that works for you
          </p>
          <Button variant="gentle">
            <Plus className="h-4 w-4 mr-2" />
            Add Strategy
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}