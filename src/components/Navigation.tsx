import { Home, Cloud, MessageCircle, Camera, User } from "lucide-react";

const Navigation = () => {
  const navItems = [
    { icon: Home, label: "Home", active: true },
    { icon: Cloud, label: "Weather", active: false },
    { icon: MessageCircle, label: "Chat", active: false },
    { icon: Camera, label: "Scan", active: false },
    { icon: User, label: "Profile", active: false },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="container mx-auto">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item, index) => (
            <button
              key={index}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                item.active
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;