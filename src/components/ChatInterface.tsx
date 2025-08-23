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
    const lowerMessage = userMessage.toLowerCase();
    
    if (mood === "crisis") {
      return `I hear you, and I'm really concerned about you. You matter, and there are people who want to help. Please reach out:
      
🆘 **Crisis Helplines:**
• US: 988 (Suicide & Crisis Lifeline)
• UK: 116 123 (Samaritans)
• Crisis Text Line: Text HOME to 741741

You don't have to go through this alone. Please consider talking to a mental health professional. 💙`;
    }
    
    // Enhanced conversation based on context
    if (lowerMessage.includes("work") || lowerMessage.includes("job")) {
      if (mood === "stressed") {
        return `Work stress can feel overwhelming. I understand how that pressure can weigh on you 🌱

Here are some quick strategies:
• Take 3 deep breaths between tasks
• Step away for 2 minutes every hour
• Write down what's bothering you - sometimes getting it out of your head helps

What's the most stressful part of your work situation right now?`;
      }
    }
    
    if (lowerMessage.includes("sleep") || lowerMessage.includes("tired") || lowerMessage.includes("exhausted")) {
      return `Sleep challenges can affect everything else, can't they? 😔 Your well-being matters.

Some gentle suggestions:
• Try a 10-minute wind-down routine before bed
• Keep your room cool and dark
• Consider limiting screens 1 hour before sleep
• Practice the 4-7-8 breathing technique

How has your sleep been affecting your daily life? I'm here to listen and help you find strategies that work for you. 💙`;
    }
    
    if (lowerMessage.includes("relationship") || lowerMessage.includes("friend") || lowerMessage.includes("family")) {
      return `Relationships can bring such joy and sometimes such challenges too. Thank you for sharing this with me 💙

When we're struggling with relationships, it helps to remember:
• Your feelings are valid, no matter what
• Sometimes we can only control our own actions and responses
• It's okay to set boundaries when needed
• You deserve to be treated with kindness and respect

Would you like to talk more about what's happening? I'm here to listen without judgment. 🌸`;
    }
    
    if (mood === "stressed") {
      return `I can feel the stress in your words. That overwhelmed feeling is so real, and I want you to know you're not alone in this 🌱

Let's start with your breath - it's something we always have control over:
• Breathe in slowly for 4 counts
• Hold gently for 4 counts  
• Exhale slowly for 6 counts
• Repeat 3 times

What's been the biggest source of stress for you lately? Sometimes talking through it can help lighten the load. I'm here to listen. 💙`;
    }
    
    if (mood === "anxious") {
      return `I can sense that anxious energy you're experiencing. Anxiety can feel so intense, but you're safe right now 💙

Let's try grounding together:
🌿 Look around and name 5 things you can see
✋ Notice 4 things you can touch  
👂 Listen for 3 things you can hear
👃 Identify 2 things you can smell
👅 Think of 1 thing you can taste

This feeling will pass. You've gotten through anxious moments before, and you can do it again. What usually helps you feel more grounded? 🌸`;
    }
    
    if (mood === "sad") {
      return `I can hear the sadness in your words, and I want you to know that it's completely okay to feel this way. Your emotions are valid and important 💙

When we're sad, it can help to:
• Let yourself feel the emotion without fighting it
• Be gentle with yourself, like you would with a dear friend
• Do one small thing that usually brings you comfort
• Remember that feelings come and go like waves

You're being so brave by sharing this with me. Is there anything specific that's been weighing on your heart? I'm here to listen. 🌱`;
    }
    
    if (mood === "happy") {
      return `Your happiness is absolutely beautiful to witness! 🌟 I can feel the positive energy in your message.

These moments of joy are so precious - let's savor this feeling together:
• Take a moment to really notice how happiness feels in your body
• What specifically is bringing you this joy today?
• Consider sharing this feeling with someone you care about

I love seeing you in this wonderful space. What's been the highlight of your day so far? ✨`;
    }
    
    // Enhanced default responses with follow-up questions
    const defaultResponses = [
      `Thank you for sharing that with me. I can sense there's something on your mind 💙\n\nWhat's been occupying your thoughts lately? I'm here to listen and support you however I can.`,
      `I appreciate you opening up to me. Every feeling and thought you have matters 🌱\n\nIs there something specific you'd like to explore together today? I'm here for whatever you need.`,
      `Thank you for trusting me with your thoughts. Creating this space for yourself is already a positive step 💙\n\nWhat would feel most helpful for you right now - talking through something, learning a coping technique, or just having someone listen?`
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
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