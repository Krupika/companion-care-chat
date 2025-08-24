import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Heart, Brain, Leaf } from "lucide-react";
import heroImage from "@/assets/hero-wellness.jpg";

interface OnboardingProps {
  onComplete: (data: { name: string; focus: string }) => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [focus, setFocus] = useState("");

  const focusOptions = [
    { value: "stress", label: "Reduce Stress", icon: Leaf, color: "calm" },
    { value: "anxiety", label: "Manage Anxiety", icon: Heart, color: "gentle" },
    { value: "focus", label: "Improve Focus", icon: Brain, color: "energy" },
    { value: "mood", label: "Feel Calmer", icon: Sparkles, color: "hero" },
  ];

  const handleNext = () => {
    if (step === 1 && name.trim()) {
      setStep(2);
    } else if (step === 2 && focus) {
      setStep(3);
    }
  };

  const handleComplete = () => {
    onComplete({ name: name.trim(), focus });
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-warm border-0 bg-gradient-card">
        <CardHeader className="text-center space-y-2">
          <div className="w-20 h-20 mx-auto mb-2 rounded-full overflow-hidden shadow-soft">
            <img 
              src={heroImage} 
              alt="Mindful Companion" 
              className="w-full h-full object-cover"
            />
          </div>
          <CardTitle className="text-2xl font-semibold bg-gradient-primary bg-clip-text text-transparent">
            Welcome to Mindful Companion 🌸
          </CardTitle>
          <p className="text-muted-foreground">
            A safe, supportive space for your well-being
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  What should I call you?
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="rounded-xl border-border/50 focus:ring-primary"
                />
              </div>
              <Button
                onClick={handleNext}
                disabled={!name.trim()}
                variant="hero"
                size="lg"
                className="w-full"
              >
                Continue
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-3">
                  Hi {name}! How would you like to focus today?
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {focusOptions.map((option) => {
                    const IconComponent = option.icon;
                    const isSelected = focus === option.value;
                    return (
                      <Button
                        key={option.value}
                        onClick={() => setFocus(option.value)}
                        variant={isSelected ? option.color as any : "outline"}
                        className={`justify-start h-12 text-left transition-all ${
                          isSelected ? "ring-2 ring-primary ring-offset-2 shadow-warm" : ""
                        }`}
                      >
                        <IconComponent className="mr-3 h-5 w-5" />
                        {option.label}
                      </Button>
                    );
                  })}
                </div>
              </div>
              <Button
                onClick={handleNext}
                disabled={!focus}
                variant="hero"
                size="lg"
                className="w-full"
              >
                Continue
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 text-center">
              <div className="space-y-3">
                <h3 className="text-lg font-medium">
                  Perfect! I'm here to support you 💙
                </h3>
                <div className="bg-muted/50 rounded-xl p-4 text-sm text-muted-foreground border border-border/30">
                  <p className="font-medium mb-1">Important reminder:</p>
                  <p>I'm here to support you, but I'm not a licensed therapist. For professional help, please consult a healthcare provider.</p>
                </div>
              </div>
              <Button
                onClick={handleComplete}
                variant="hero"
                size="lg"
                className="w-full"
              >
                Start My Journey 🌱
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}