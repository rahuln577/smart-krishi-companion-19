import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatBot from "@/components/ChatBot";

const FloatingChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setIsOpen(true)}
            className="h-14 w-14 rounded-full bg-gradient-to-r from-primary to-success shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            size="lg"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
          {/* Notification badge */}
          <div className="absolute -top-1 -right-1 h-4 w-4 bg-warning rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-warning-foreground">!</span>
          </div>
        </div>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 shadow-2xl">
          <ChatBot isFloating={true} onClose={() => setIsOpen(false)} />
        </div>
      )}
    </>
  );
};

export default FloatingChatButton;