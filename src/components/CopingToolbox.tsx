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

interface CopingStrategy {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: "breathing" | "mindfulness" | "grounding" | "movement" | "cognitive";
  icon: any;
  isFavorite: boolean;
}

export function CopingToolbox() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [strategies, setStrategies] = useState<CopingStrategy[]>([
    {
      id: "box-breathing",
      title: "Box Breathing",
      description: "4-4-4-4 breathing pattern to calm your nervous system",
      duration: "3 min",
      category: "breathing",
      icon: Wind,
      isFavorite: true,
    },
    {
      id: "54321-grounding",
      title: "5-4-3-2-1 Grounding",
      description: "Use your senses to ground yourself in the present moment",
      duration: "5 min",
      category: "grounding",
      icon: Leaf,
      isFavorite: false,
    },
    {
      id: "body-scan",
      title: "Body Scan Meditation",
      description: "Progressive relaxation through body awareness",
      duration: "10 min",
      category: "mindfulness",
      icon: Heart,
      isFavorite: true,
    },
    {
      id: "thought-stop",
      title: "Thought Stopping",
      description: "Interrupt negative thought cycles with gentle redirection",
      duration: "2 min",
      category: "cognitive",
      icon: Brain,
      isFavorite: false,
    },
    {
      id: "gentle-movement",
      title: "Gentle Movement",
      description: "Simple stretches to release tension and boost mood",
      duration: "7 min",
      category: "movement",
      icon: Sun,
      isFavorite: false,
    },
    {
      id: "wave-breathing",
      title: "Wave Breathing",
      description: "Rhythmic breathing like ocean waves for deep calm",
      duration: "5 min",
      category: "breathing",
      icon: Waves,
      isFavorite: false,
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
    toast.success(`Starting ${strategy.title}`, {
      description: `Take ${strategy.duration} for yourself 🌱`,
    });
    // Here you would implement the actual exercise flow
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