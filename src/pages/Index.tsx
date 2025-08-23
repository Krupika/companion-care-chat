import { useState } from "react";
import { Onboarding } from "@/components/Onboarding";
import { ChatInterface } from "@/components/ChatInterface";
import { CopingToolbox } from "@/components/CopingToolbox";
import { Journal } from "@/components/Journal";
import { Navigation } from "@/components/Navigation";

const Index = () => {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [userData, setUserData] = useState<{ name: string; focus: string } | null>(null);
  const [currentPage, setCurrentPage] = useState("chat");

  const handleOnboardingComplete = (data: { name: string; focus: string }) => {
    setUserData(data);
    setIsOnboarded(true);
  };

  if (!isOnboarded) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "chat":
        return (
          <div className="h-screen flex flex-col">
            <div className="flex-1 overflow-hidden">
              <ChatInterface 
                userName={userData?.name || ""} 
                userFocus={userData?.focus || ""} 
              />
            </div>
          </div>
        );
      case "toolbox":
        return <CopingToolbox />;
      case "journal":
        return <Journal />;
      case "progress":
        return (
          <div className="max-w-4xl mx-auto p-4 space-y-6 pb-20 md:pb-6">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Your Wellness Journey 📊
              </h1>
              <p className="text-muted-foreground">
                Every small step matters
              </p>
            </div>
            {/* Progress content will be implemented in future iterations */}
          </div>
        );
      case "settings":
        return (
          <div className="max-w-4xl mx-auto p-4 space-y-6 pb-20 md:pb-6">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Settings ⚙️
              </h1>
              <p className="text-muted-foreground">
                Customize your experience
              </p>
            </div>
            {/* Settings content will be implemented in future iterations */}
          </div>
        );
      default:
        return (
          <div className="h-screen flex flex-col">
            <div className="flex-1 overflow-hidden">
              <ChatInterface 
                userName={userData?.name || ""} 
                userFocus={userData?.focus || ""} 
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        userName={userData?.name || ""}
      />
      {renderCurrentPage()}
    </div>
  );
};

export default Index;
