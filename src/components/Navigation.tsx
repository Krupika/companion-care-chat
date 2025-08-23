import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  MessageCircle, 
  Heart, 
  BookOpen, 
  TrendingUp, 
  Settings,
  Home,
  Menu,
  X
} from "lucide-react";

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  userName: string;
}

export function Navigation({ currentPage, onPageChange, userName }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "chat", label: "Chat", icon: MessageCircle },
    { id: "toolbox", label: "Toolkit", icon: Heart },
    { id: "journal", label: "Journal", icon: BookOpen },
    { id: "progress", label: "Progress", icon: TrendingUp },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handlePageChange = (page: string) => {
    onPageChange(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex bg-gradient-card shadow-gentle border-b border-border/30">
        <div className="max-w-6xl mx-auto px-4 w-full">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-hero rounded-full flex items-center justify-center">
                <Heart className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-lg">Mindful Companion</h1>
                <p className="text-xs text-muted-foreground">Hi, {userName} 🌸</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? "hero" : "ghost"}
                    size="sm"
                    onClick={() => handlePageChange(item.id)}
                    className="gap-2"
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="hidden lg:inline">{item.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Mobile Header */}
        <header className="bg-gradient-card shadow-gentle border-b border-border/30">
          <div className="px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-hero rounded-full flex items-center justify-center">
                <Heart className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="font-semibold">Mindful Companion</h1>
                <p className="text-xs text-muted-foreground">Hi, {userName} 🌸</p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
            <div className="fixed right-0 top-16 w-64 h-full bg-gradient-card shadow-warm border-l border-border/30 p-4">
              <div className="space-y-2">
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Button
                      key={item.id}
                      variant={currentPage === item.id ? "hero" : "ghost"}
                      size="lg"
                      onClick={() => handlePageChange(item.id)}
                      className="w-full justify-start gap-3"
                    >
                      <IconComponent className="h-5 w-5" />
                      {item.label}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation (Alternative) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-card border-t border-border/30 shadow-gentle">
        <div className="grid grid-cols-5 gap-1 p-2">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Button
                key={item.id}
                variant={currentPage === item.id ? "hero" : "ghost"}
                size="sm"
                onClick={() => handlePageChange(item.id)}
                className="flex-col h-12 p-1 gap-1"
              >
                <IconComponent className="h-4 w-4" />
                <span className="text-xs">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </>
  );
}