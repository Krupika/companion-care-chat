import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Calendar, 
  Smile, 
  Meh, 
  Frown,
  Heart,
  Sparkles,
  Save,
  Plus,
  Search
} from "lucide-react";
import { toast } from "sonner";

interface JournalEntry {
  id: string;
  date: Date;
  prompt: string;
  content: string;
  mood: "happy" | "neutral" | "sad";
  tags: string[];
}

interface DailyPrompt {
  id: string;
  text: string;
  category: "gratitude" | "reflection" | "growth" | "mindfulness";
}

export function Journal() {
  const [activeTab, setActiveTab] = useState<"write" | "entries">("write");
  const [currentEntry, setCurrentEntry] = useState("");
  const [selectedMood, setSelectedMood] = useState<"happy" | "neutral" | "sad" | null>(null);
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: "1",
      date: new Date(Date.now() - 86400000), // Yesterday
      prompt: "What made you smile today?",
      content: "Had a wonderful conversation with a friend and enjoyed my morning coffee in the sunshine.",
      mood: "happy",
      tags: ["gratitude", "friendship"],
    },
    {
      id: "2", 
      date: new Date(Date.now() - 172800000), // 2 days ago
      prompt: "What challenge did you overcome today?",
      content: "Managed to complete a difficult task at work that I'd been putting off. Felt proud of myself for pushing through.",
      mood: "neutral",
      tags: ["accomplishment", "growth"],
    },
  ]);

  const dailyPrompts: DailyPrompt[] = [
    { id: "1", text: "What's one thing that made you smile today?", category: "gratitude" },
    { id: "2", text: "How did you show kindness to yourself today?", category: "mindfulness" },
    { id: "3", text: "What challenge helped you grow today?", category: "growth" },
    { id: "4", text: "What are you most grateful for right now?", category: "gratitude" },
    { id: "5", text: "What emotion did you feel most strongly today, and why?", category: "reflection" },
    { id: "6", text: "What small victory can you celebrate today?", category: "growth" },
  ];

  const [selectedPrompt, setSelectedPrompt] = useState<DailyPrompt>(
    dailyPrompts[Math.floor(Math.random() * dailyPrompts.length)]
  );

  const moodOptions = [
    { value: "happy", icon: Smile, label: "Happy", color: "bg-green-100 text-green-700" },
    { value: "neutral", icon: Meh, label: "Neutral", color: "bg-yellow-100 text-yellow-700" },
    { value: "sad", icon: Frown, label: "Sad", color: "bg-blue-100 text-blue-700" },
  ];

  const saveEntry = () => {
    if (!currentEntry.trim() || !selectedMood) {
      toast.error("Please write something and select your mood");
      return;
    }

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date(),
      prompt: selectedPrompt.text,
      content: currentEntry.trim(),
      mood: selectedMood,
      tags: [selectedPrompt.category],
    };

    setEntries(prev => [newEntry, ...prev]);
    setCurrentEntry("");
    setSelectedMood(null);
    
    // Get new random prompt
    setSelectedPrompt(dailyPrompts[Math.floor(Math.random() * dailyPrompts.length)]);
    
    toast.success("Journal entry saved! 🌱", {
      description: "Thank you for sharing. That took courage 🌸",
    });
  };

  const getMoodIcon = (mood: "happy" | "neutral" | "sad") => {
    const moodOption = moodOptions.find(m => m.value === mood);
    return moodOption ? moodOption.icon : Meh;
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 pb-20 md:pb-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Your Reflection Space ✍️
        </h1>
        <p className="text-muted-foreground">
          Write, release, and reflect
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="bg-muted/30 p-1 rounded-2xl flex gap-1">
          <Button
            variant={activeTab === "write" ? "hero" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("write")}
            className="rounded-xl"
          >
            <Plus className="h-4 w-4 mr-2" />
            Write
          </Button>
          <Button
            variant={activeTab === "entries" ? "hero" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("entries")}
            className="rounded-xl"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Entries ({entries.length})
          </Button>
        </div>
      </div>

      {activeTab === "write" && (
        <div className="space-y-6">
          {/* Daily Prompt */}
          <Card className="bg-gradient-card shadow-gentle border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-primary" />
                Today's Prompt
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground font-medium mb-4">
                {selectedPrompt.text}
              </p>
              <Badge variant="secondary" className="capitalize">
                {selectedPrompt.category}
              </Badge>
            </CardContent>
          </Card>

          {/* Writing Area */}
          <Card className="shadow-soft border-border/50">
            <CardContent className="p-6 space-y-4">
              <Textarea
                value={currentEntry}
                onChange={(e) => setCurrentEntry(e.target.value)}
                placeholder="Start writing your thoughts..."
                rows={8}
                className="resize-none border-border/50 focus:ring-primary rounded-xl"
              />

              {/* Mood Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium">How are you feeling?</label>
                <div className="flex gap-3">
                  {moodOptions.map((mood) => {
                    const IconComponent = mood.icon;
                    return (
                      <Button
                        key={mood.value}
                        variant={selectedMood === mood.value ? "hero" : "gentle"}
                        size="sm"
                        onClick={() => setSelectedMood(mood.value as any)}
                        className="gap-2"
                      >
                        <IconComponent className="h-4 w-4" />
                        {mood.label}
                      </Button>
                    );
                  })}
                </div>
              </div>

              <Button
                onClick={saveEntry}
                variant="hero"
                size="lg"
                className="w-full"
                disabled={!currentEntry.trim() || !selectedMood}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Entry
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "entries" && (
        <div className="space-y-4">
          {entries.length === 0 ? (
            <Card className="border-dashed border-2 border-border/50">
              <CardContent className="p-8 text-center">
                <BookOpen className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <h3 className="font-medium mb-1">No entries yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Start writing to see your reflections here
                </p>
                <Button variant="hero" onClick={() => setActiveTab("write")}>
                  Write Your First Entry
                </Button>
              </CardContent>
            </Card>
          ) : (
            entries.map((entry) => {
              const MoodIcon = getMoodIcon(entry.mood);
              return (
                <Card 
                  key={entry.id} 
                  className="hover:shadow-soft transition-all"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {entry.date.toLocaleDateString([], { 
                            month: 'long', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                        <CardTitle className="text-base text-primary">
                          {entry.prompt}
                        </CardTitle>
                      </div>
                      <div className="flex items-center gap-2">
                        <MoodIcon className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-foreground mb-3 leading-relaxed">
                      {entry.content}
                    </p>
                    <div className="flex gap-2">
                      {entry.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}