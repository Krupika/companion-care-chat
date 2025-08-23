import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Heart, 
  Calendar, 
  Award, 
  Flame, 
  Target,
  BarChart3,
  Sparkles,
  CheckCircle,
  Star,
  Clock,
  BookOpen,
  MessageCircle,
  Smile
} from "lucide-react";

interface ProgressData {
  totalSessions: number;
  currentStreak: number;
  longestStreak: number;
  favoriteExercises: string[];
  weeklyGoal: number;
  weeklyProgress: number;
  moodTrend: "improving" | "stable" | "needs-attention";
  achievements: Achievement[];
  recentActivities: Activity[];
  weeklyStats: WeeklyStats;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  rarity: "common" | "rare" | "legendary";
}

interface Activity {
  id: string;
  type: "chat" | "exercise" | "journal" | "reflection";
  title: string;
  completedAt: Date;
  mood?: "happy" | "calm" | "stressed" | "anxious" | "sad";
}

interface WeeklyStats {
  chatSessions: number;
  exercisesCompleted: number;
  journalEntries: number;
  averageMood: number;
}

export function Progress() {
  const [progressData, setProgressData] = useState<ProgressData>({
    totalSessions: 42,
    currentStreak: 7,
    longestStreak: 12,
    favoriteExercises: ["Box Breathing", "Body Scan Meditation", "5-4-3-2-1 Grounding"],
    weeklyGoal: 5,
    weeklyProgress: 3,
    moodTrend: "improving",
    achievements: [
      {
        id: "first-week",
        title: "First Week Warrior",
        description: "Completed your first week of daily check-ins",
        icon: "🌱",
        unlockedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        rarity: "common"
      },
      {
        id: "streak-master",
        title: "Streak Master",
        description: "Maintained a 7-day wellness streak",
        icon: "🔥",
        unlockedAt: new Date(),
        rarity: "rare"
      },
      {
        id: "mindful-explorer",
        title: "Mindful Explorer",
        description: "Tried 10 different coping strategies",
        icon: "🧭",
        unlockedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        rarity: "legendary"
      }
    ],
    recentActivities: [
      {
        id: "1",
        type: "exercise",
        title: "Box Breathing",
        completedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        mood: "calm"
      },
      {
        id: "2", 
        type: "chat",
        title: "Check-in conversation",
        completedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
        mood: "happy"
      },
      {
        id: "3",
        type: "journal",
        title: "Evening reflection",
        completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        mood: "calm"
      }
    ],
    weeklyStats: {
      chatSessions: 8,
      exercisesCompleted: 12,
      journalEntries: 5,
      averageMood: 7.2
    }
  });

  const getMoodColor = (trend: string) => {
    switch (trend) {
      case "improving": return "text-green-600 bg-green-50 border-green-200";
      case "stable": return "text-blue-600 bg-blue-50 border-blue-200";
      case "needs-attention": return "text-amber-600 bg-amber-50 border-amber-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary": return "border-purple-300 bg-purple-50";
      case "rare": return "border-blue-300 bg-blue-50";
      default: return "border-green-300 bg-green-50";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "chat": return <MessageCircle className="h-4 w-4" />;
      case "exercise": return <Heart className="h-4 w-4" />;
      case "journal": return <BookOpen className="h-4 w-4" />;
      default: return <Sparkles className="h-4 w-4" />;
    }
  };

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case "happy": return "😊";
      case "calm": return "😌";
      case "stressed": return "😰";
      case "anxious": return "😟";
      case "sad": return "😔";
      default: return "🙂";
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now"; 
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Your Wellness Journey 📊
        </h1>
        <p className="text-muted-foreground">
          Every small step matters - celebrate your progress
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{progressData.totalSessions}</div>
            <div className="text-sm text-muted-foreground">Total Sessions</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="flex items-center justify-center gap-1">
              <Flame className="h-5 w-5 text-orange-500" />
              <div className="text-2xl font-bold text-primary">{progressData.currentStreak}</div>
            </div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{progressData.weeklyStats.averageMood}/10</div>  
            <div className="text-sm text-muted-foreground">Avg Mood</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{progressData.achievements.length}</div>
            <div className="text-sm text-muted-foreground">Achievements</div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Progress */}  
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            This Week's Goal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Wellness sessions: {progressData.weeklyProgress}/{progressData.weeklyGoal}</span>
            <Badge variant="secondary">
              {Math.round((progressData.weeklyProgress / progressData.weeklyGoal) * 100)}%
            </Badge>
          </div>
          <ProgressBar 
            value={(progressData.weeklyProgress / progressData.weeklyGoal) * 100} 
            className="h-3" 
          />
          <p className="text-sm text-muted-foreground">
            {progressData.weeklyProgress >= progressData.weeklyGoal 
              ? "🎉 Amazing! You've reached your weekly goal!" 
              : `${progressData.weeklyGoal - progressData.weeklyProgress} more sessions to reach your weekly goal`
            }
          </p>
        </CardContent>
      </Card>

      {/* Mood Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Mood Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`p-4 rounded-lg border ${getMoodColor(progressData.moodTrend)}`}>
            <div className="flex items-center gap-3">
              <div className="text-2xl">
                {progressData.moodTrend === "improving" ? "📈" : 
                 progressData.moodTrend === "stable" ? "📊" : "📉"}
              </div>
              <div>
                <div className="font-medium capitalize">
                  {progressData.moodTrend.replace("-", " ")}
                </div>
                <div className="text-sm">
                  {progressData.moodTrend === "improving" && "Your mood has been trending upward - keep up the great work!"}
                  {progressData.moodTrend === "stable" && "Your mood has been consistently stable - that's wonderful!"}
                  {progressData.moodTrend === "needs-attention" && "Consider reaching out for extra support if you need it."}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {progressData.achievements.slice(0, 3).map((achievement) => (
            <div 
              key={achievement.id}
              className={`p-4 rounded-lg border ${getRarityColor(achievement.rarity)}`}
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <div className="font-medium">{achievement.title}</div>
                  <div className="text-sm text-muted-foreground">{achievement.description}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Unlocked {formatTimeAgo(achievement.unlockedAt)}
                  </div>
                </div>
                <Badge variant="outline" className="capitalize">
                  {achievement.rarity}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {progressData.recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="p-2 rounded-full bg-primary/10">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <div className="font-medium">{activity.title}</div>
                <div className="text-sm text-muted-foreground">
                  {formatTimeAgo(activity.completedAt)}
                </div>
              </div>
              {activity.mood && (
                <div className="text-lg">
                  {getMoodEmoji(activity.mood)}
                </div>
              )}
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Weekly Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            This Week's Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <MessageCircle className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="font-bold text-lg">{progressData.weeklyStats.chatSessions}</div>
              <div className="text-sm text-muted-foreground">Chat Sessions</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <Heart className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="font-bold text-lg">{progressData.weeklyStats.exercisesCompleted}</div>
              <div className="text-sm text-muted-foreground">Exercises</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <BookOpen className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="font-bold text-lg">{progressData.weeklyStats.journalEntries}</div>
              <div className="text-sm text-muted-foreground">Journal Entries</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <Smile className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="font-bold text-lg">{progressData.weeklyStats.averageMood.toFixed(1)}</div>
              <div className="text-sm text-muted-foreground">Avg Mood</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Encouragement */}
      <Card className="bg-gradient-gentle border-primary/20">
        <CardContent className="p-6 text-center space-y-4">
          <Sparkles className="h-12 w-12 mx-auto text-primary" />
          <h3 className="text-xl font-semibold">You're doing amazing! 🌟</h3>
          <p className="text-muted-foreground">
            Every session, every breath, every journal entry is a step toward better well-being. 
            Keep up the wonderful work - you've got this! 💙
          </p>
          <Button variant="hero">
            Continue Your Journey
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}