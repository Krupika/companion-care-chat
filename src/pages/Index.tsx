import { useState } from "react";
import { Onboarding } from "@/components/Onboarding";
import { ChatInterface } from "@/components/ChatInterface";
import { CopingToolbox } from "@/components/CopingToolbox";
import { Journal } from "@/components/Journal";
import { Settings } from "@/components/Settings";
import { Progress } from "@/components/Progress";
import { Navigation } from "@/components/Navigation";

const Index = () => {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [userData, setUserData] = useState<{ name: string; focus: string } | null>(null);
  const [currentPage, setCurrentPage] = useState("chat");

  const handleOnboardingComplete = (data: { name: string; focus: string }) => {
    setUserData(data);
    setIsOnboarded(true);
  };

  const handleUpdateProfile = (data: { name: string; focus: string }) => {
    setUserData(data);
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
        return <Progress />;
      case "settings":
        return (
          <Settings 
            userName={userData?.name || ""} 
            userFocus={userData?.focus || ""}
            onUpdateProfile={handleUpdateProfile}
          />
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
