import { useState } from "react";
import { MessageCircle, Camera, TrendingUp, Zap, Users, Newspaper, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import WeatherWidget from "@/components/WeatherWidget";
import FeatureCard from "@/components/FeatureCard";
import Navigation from "@/components/Navigation";
import CropRecommendation from "@/components/CropRecommendation";
import PlantTracking from "@/components/PlantTracking";
import MarketTrends from "@/components/MarketTrends";
import ChatBot from "@/components/ChatBot";
import heroImage from "@/assets/agri-hero.jpg";
import cropField from "@/assets/crop-field.jpg";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [userName] = useState("Farmer");

  const features = [
    {
      icon: <MessageCircle className="h-6 w-6 text-primary" />,
      title: "AI Chat",
      description: "Get instant farming advice",
      bgColor: "bg-blue-50",
      section: "chat"
    },
    {
      icon: <Camera className="h-6 w-6 text-success" />,
      title: "Disease Scanner",
      description: "Identify plant problems",
      bgColor: "bg-green-50",
      section: "scanner"
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-warning" />,
      title: "Smart Recommendations",
      description: "Get personalized advice",
      bgColor: "bg-yellow-50",
      section: "recommendations"
    },
    {
      icon: <Newspaper className="h-6 w-6 text-purple-600" />,
      title: "Agri News",
      description: "Latest farming updates",
      bgColor: "bg-purple-50",
      section: "news"
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-orange-600" />,
      title: "Market Trends",
      description: "Price and demand insights",
      bgColor: "bg-orange-50",
      section: "market"
    },
    {
      icon: <Camera className="h-6 w-6 text-pink-600" />,
      title: "Plant Tracking",
      description: "Monitor growth daily",
      bgColor: "bg-pink-50",
      section: "tracking"
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "recommendations":
        return <CropRecommendation />;
      case "tracking":
        return <PlantTracking />;
      case "market":
        return <MarketTrends />;
      case "chat":
        return <ChatBot />;
      case "scanner":
        return (
          <div className="text-center py-12">
            <Camera className="h-16 w-16 text-success mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-success mb-2">Disease Scanner</h2>
            <p className="text-muted-foreground">Advanced plant disease detection coming soon...</p>
          </div>
        );
      case "news":
        return (
          <div className="text-center py-12">
            <Newspaper className="h-16 w-16 text-purple-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-purple-600 mb-2">Agricultural News</h2>
            <p className="text-muted-foreground">Latest farming news and updates coming soon...</p>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            {/* Hero Section */}
            <div className="relative h-48 rounded-lg overflow-hidden">
              <img src={heroImage} alt="Agricultural Technology" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                <div className="text-center text-white">
                  <h1 className="text-2xl font-bold mb-2">Welcome {userName}</h1>
                  <p className="text-sm opacity-90">Your Smart Farming Assistant</p>
                </div>
              </div>
            </div>

            {/* Weather Widget */}
            <WeatherWidget />

            {/* Features Grid */}
            <div>
              <h2 className="text-lg font-semibold text-primary mb-4">AgriSmart Features</h2>
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <FeatureCard
                    key={index}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    bgColor={feature.bgColor}
                    onClick={() => setActiveSection(feature.section)}
                  />
                ))}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-primary" />
                <span className="font-medium text-primary">Today's Tip</span>
              </div>
              <p className="text-sm text-foreground">
                Monitor soil moisture levels regularly. Early morning is the best time to check your crops for any signs of pest infestation.
              </p>
            </div>

            {/* Community Section */}
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="font-medium text-primary">Farmer Community</span>
                </div>
                <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">NEW</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Connect with fellow farmers, share experiences, and get community support.
              </p>
              <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg text-sm font-medium">
                Join Community
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6 pb-20">
        {/* Back button for non-dashboard sections */}
        {activeSection !== "dashboard" && (
          <button
            onClick={() => setActiveSection("dashboard")}
            className="flex items-center gap-2 text-primary mb-4 hover:text-primary-dark transition-colors"
          >
            <span>←</span>
            <span>Back to Dashboard</span>
          </button>
        )}
        
        {renderContent()}
      </main>

      <Navigation />
    </div>
  );
};

export default Index;