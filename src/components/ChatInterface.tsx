import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Mic, Heart, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  mood?: "stressed" | "anxious" | "sad" | "calm" | "happy" | "crisis";
}

interface ChatInterfaceProps {
  userName: string;
  userFocus: string;
}

export function ChatInterface({ userName, userFocus }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: `Hi ${userName}! I'm so glad you're here. How are you feeling today? 💙`,
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const detectMood = (text: string): Message["mood"] => {
    const lowerText = text.toLowerCase();
    
    // Crisis keywords
    const crisisKeywords = ["suicide", "kill myself", "end it all", "don't want to live", "hurt myself"];
    if (crisisKeywords.some(keyword => lowerText.includes(keyword))) {
      return "crisis";
    }
    
    // Stress keywords
    const stressKeywords = ["stressed", "overwhelmed", "pressure", "can't cope", "too much"];
    if (stressKeywords.some(keyword => lowerText.includes(keyword))) {
      return "stressed";
    }
    
    // Anxiety keywords
    const anxietyKeywords = ["anxious", "worried", "nervous", "panic", "fear"];
    if (anxietyKeywords.some(keyword => lowerText.includes(keyword))) {
      return "anxious";
    }
    
    // Sad keywords
    const sadKeywords = ["sad", "depressed", "down", "lonely", "hopeless"];
    if (sadKeywords.some(keyword => lowerText.includes(keyword))) {
      return "sad";
    }
    
    // Happy keywords
    const happyKeywords = ["happy", "good", "great", "wonderful", "excited"];
    if (happyKeywords.some(keyword => lowerText.includes(keyword))) {
      return "happy";
    }
    
    return "calm";
  };

  const generateBotResponse = (userMessage: string, mood: Message["mood"]): string => {
    if (mood === "crisis") {
      return `I hear you, and I'm really concerned about you. You matter, and there are people who want to help. Please reach out:
      
🆘 **Crisis Helplines:**
• US: 988 (Suicide & Crisis Lifeline)
• UK: 116 123 (Samaritans)
• Crisis Text Line: Text HOME to 741741

You don't have to go through this alone. Please consider talking to a mental health professional. 💙`;
    }
    
    if (mood === "stressed") {
      return `It sounds like you're feeling really overwhelmed right now. I'm here for you 🌱 

Let's try a quick breathing exercise: Take a slow breath in for 4 counts, hold for 4, then out for 6. This can help calm your nervous system.

Would you like me to guide you through a longer relaxation technique?`;
    }
    
    if (mood === "anxious") {
      return `I can sense the anxiety you're experiencing. That feeling is valid, and you're not alone 💙

Try this grounding technique: Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.

Remember: This feeling will pass. You've gotten through difficult moments before, and you can do it again. 🌸`;
    }
    
    if (mood === "sad") {
      return `I hear the sadness in your words, and I want you to know that it's okay to feel this way. Your feelings are valid 💙

Sometimes when we're sad, it helps to:
• Acknowledge the feeling without judgment
• Practice self-compassion
• Reach out to someone you trust
• Do something small that usually brings you comfort

You're being brave by sharing this with me. 🌱`;
    }
    
    if (mood === "happy") {
      return `It's wonderful to hear you're feeling good! 🌟 I love seeing you in this positive space. 

These moments of joy are precious - consider taking a moment to really savor this feeling. What's bringing you happiness today?`;
    }
    
    // Default calm response
    return `Thank you for sharing that with me. I'm here to listen and support you in whatever way I can 💙

Is there anything specific you'd like to talk about or work through together today?`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Detect mood and generate response
    const mood = detectMood(userMessage.text);
    const botResponseText = generateBotResponse(userMessage.text, mood);

    // Simulate typing delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: "bot",
        timestamp: new Date(),
        mood,
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      if (mood === "crisis") {
        toast.error("Crisis support resources have been shared", {
          duration: 5000,
        });
      } else if (mood === "stressed" || mood === "anxious") {
        toast.info("Coping strategy suggested", {
          duration: 3000,
        });
      }
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto">
      <div className="bg-gradient-hero text-white p-4 rounded-t-2xl">
        <h1 className="text-xl font-semibold text-center">
          How are you feeling today? 💙
        </h1>
        <p className="text-center text-white/80 text-sm mt-1">
          Share what's on your mind — I'm listening
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <Card
              className={`max-w-[80%] p-3 ${
                message.sender === "user"
                  ? "bg-primary text-primary-foreground ml-12"
                  : message.mood === "crisis"
                  ? "bg-destructive/10 border-destructive/20 mr-12"
                  : "bg-gradient-card mr-12"
              }`}
            >
              {message.mood === "crisis" && (
                <div className="flex items-center gap-2 mb-2 text-destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-xs font-medium">Crisis Support</span>
                </div>
              )}
              <p className="text-sm whitespace-pre-line">{message.text}</p>
              <span className="text-xs opacity-60 mt-1 block">
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </Card>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <Card className="bg-gradient-card mr-12 p-3">
              <div className="flex items-center gap-1">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.1s]"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></div>
                </div>
                <span className="text-xs text-muted-foreground ml-2">typing...</span>
              </div>
            </Card>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-background border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share how you're feeling..."
            className="rounded-full flex-1 border-border/50 focus:ring-primary"
          />
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full w-10 h-10 shrink-0"
          >
            <Mic className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleSend}
            variant="hero"
            size="chat"
            className="rounded-full w-10 h-10 shrink-0"
            disabled={!input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}