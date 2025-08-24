import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/hooks/use-theme";
import { 
  Bell, 
  Moon, 
  Sun, 
  Volume2, 
  Heart, 
  Shield, 
  User, 
  Clock,
  Smartphone,
  Mail,
  Download,
  Trash2,
  AlertTriangle,
  Monitor
} from "lucide-react";
import { toast } from "sonner";

interface SettingsProps {
  userName: string;
  userFocus: string;
  onUpdateProfile: (data: { name: string; focus: string }) => void;
}

export function Settings({ userName, userFocus, onUpdateProfile }: SettingsProps) {
  const { theme, setTheme } = useTheme();
  const [name, setName] = useState(userName);
  const [focus, setFocus] = useState(userFocus);
  const [notifications, setNotifications] = useState(true);
  const [dailyCheckins, setDailyCheckins] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [reminderTime, setReminderTime] = useState("09:00");
  const [emergencyContact, setEmergencyContact] = useState("");

  const handleSaveProfile = () => {
    if (name.trim()) {
      onUpdateProfile({ name: name.trim(), focus });
      toast.success("Profile updated successfully! 🌟");
    }
  };

  const handleExportData = () => {
    toast.info("Data export started - you'll receive an email shortly");
  };

  const handleDeleteData = () => {
    toast.error("This action cannot be undone", {
      description: "Please contact support to delete your data",
    });
  };

  const focusOptions = [
    "Reduce stress and anxiety",
    "Improve focus and concentration", 
    "Better sleep and relaxation",
    "Emotional regulation",
    "Building resilience",
    "Mindfulness practice"
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Settings ⚙️
        </h1>
        <p className="text-muted-foreground">
          Customize your wellness journey
        </p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="focus">Primary Focus</Label>
              <select 
                value={focus} 
                onChange={(e) => setFocus(e.target.value)}
                className="w-full p-2 border rounded-md bg-background"
              >
                {focusOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          <Button onClick={handleSaveProfile} variant="hero">
            Save Profile Changes
          </Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications & Reminders
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive gentle reminders and encouragement
              </p>
            </div>
            <Switch 
              checked={notifications} 
              onCheckedChange={setNotifications}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Daily Check-ins</Label>
              <p className="text-sm text-muted-foreground">
                Gentle prompts to reflect on your day
              </p>
            </div>
            <Switch 
              checked={dailyCheckins} 
              onCheckedChange={setDailyCheckins}
            />
          </div>

          {notifications && (
            <div className="space-y-2">
              <Label htmlFor="reminder-time">Daily Reminder Time</Label>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="reminder-time"
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="w-32"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Experience Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Experience Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Sound Effects</Label>
              <p className="text-sm text-muted-foreground">
                Calming sounds during exercises and interactions
              </p>
            </div>
            <Switch 
              checked={soundEffects} 
              onCheckedChange={setSoundEffects}
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="space-y-1">
              <Label>Voice Narration</Label>
              <p className="text-sm text-muted-foreground">
                Get soothing voice guidance during exercises
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="elevenlabs-api">ElevenLabs API Key (Optional)</Label>
              <Input
                id="elevenlabs-api"
                type="password"
                placeholder="Enter your ElevenLabs API key for voice narration"
                onChange={(e) => {
                  if (e.target.value) {
                    localStorage.setItem('elevenlabs_api_key', e.target.value);
                    toast.success("ElevenLabs API key saved for voice narration");
                  } else {
                    localStorage.removeItem('elevenlabs_api_key');
                  }
                }}
              />
              <p className="text-xs text-muted-foreground">
                Optional: Add your ElevenLabs API key to enable soothing voice narration during exercises
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <Label>Theme Preference</Label>
              <p className="text-sm text-muted-foreground">
                Choose your preferred theme for better comfort
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={theme === "light" ? "hero" : "gentle"}
                size="sm"
                onClick={() => setTheme("light")}
                className="flex flex-col gap-1 h-16"
              >
                <Sun className="h-4 w-4" />
                <span className="text-xs">Light</span>
              </Button>
              <Button
                variant={theme === "dark" ? "hero" : "gentle"}
                size="sm"
                onClick={() => setTheme("dark")}
                className="flex flex-col gap-1 h-16"
              >
                <Moon className="h-4 w-4" />
                <span className="text-xs">Dark</span>
              </Button>
              <Button
                variant={theme === "system" ? "hero" : "gentle"}
                size="sm"
                onClick={() => setTheme("system")}
                className="flex flex-col gap-1 h-16"
              >
                <Monitor className="h-4 w-4" />
                <span className="text-xs">System</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Crisis Support */}
      <Card className="border-amber-200 bg-amber-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-700">
            <Shield className="h-5 w-5" />
            Crisis Support Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="emergency-contact">Emergency Contact (Optional)</Label>
            <Input
              id="emergency-contact"
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
              placeholder="Trusted person's phone or email"
              type="email"
            />
            <p className="text-xs text-muted-foreground">
              We'll never contact them without your explicit permission
            </p>
          </div>

          <div className="p-4 bg-white rounded-lg border border-amber-200">
            <h4 className="font-medium text-amber-800 mb-2">Crisis Resources</h4>
            <div className="space-y-1 text-sm">
              <p><strong>US:</strong> 988 (Suicide & Crisis Lifeline)</p>
              <p><strong>UK:</strong> 116 123 (Samaritans)</p>
              <p><strong>Crisis Text:</strong> Text HOME to 741741</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data & Privacy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Data & Privacy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Export Your Data</Label>
              <p className="text-sm text-muted-foreground">
                Download all your journal entries and progress data
              </p>
            </div>
            <Button variant="gentle" size="sm" onClick={handleExportData}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-destructive">Delete All Data</Label>
              <p className="text-sm text-muted-foreground">
                Permanently remove all your personal information
              </p>
            </div>
            <Button variant="destructive" size="sm" onClick={handleDeleteData}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* App Info */}
      <Card>
        <CardContent className="p-4 text-center space-y-2">
          <Badge variant="secondary">Mindful Companion v1.0.0</Badge>
          <p className="text-xs text-muted-foreground">
            Your privacy and well-being are our top priorities
          </p>
        </CardContent>
      </Card>
    </div>
  );
}