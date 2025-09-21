import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Leaf } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AgriSmart AI assistant. I can help you with crop recommendations, pest management, irrigation, soil health, and general farming advice. What would you like to know?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const farmingResponses = {
    // Crop-related keywords
    "rice": "Rice cultivation requires well-drained, fertile soil with good water retention. Plant during monsoon season (June-July). Maintain 2-3 cm water level during initial growth. Watch for blast disease and brown plant hopper. Expected yield: 4-6 tons per hectare.",
    
    "wheat": "Wheat grows best in cool, dry climate. Sow in October-December. Use certified seeds, maintain proper row spacing (20-23cm). Apply nitrogen in split doses. Watch for rust diseases. Harvest when grains are hard and golden yellow.",
    
    "cotton": "Cotton needs warm climate with 160-200 frost-free days. Plant after soil temperature reaches 18°C. Maintain adequate moisture during flowering. Monitor for bollworm and aphids. Pick when bolls are fully open.",
    
    "sugarcane": "Sugarcane requires hot, humid climate with abundant water. Plant during Feb-March or Oct-Nov. Maintain furrow irrigation. Apply nitrogen, phosphorus, and potassium fertilizers. Harvest after 10-18 months.",
    
    // Pest and disease keywords
    "pest": "Common pests vary by crop and season. Use integrated pest management (IPM). Regular field monitoring is crucial. Consider biological control agents before chemical pesticides. Neem-based products are effective for many pests.",
    
    "disease": "Plant diseases are often caused by fungi, bacteria, or viruses. Ensure proper drainage, avoid overhead watering, practice crop rotation. Remove infected plants immediately. Use disease-resistant varieties when available.",
    
    "fungus": "Fungal diseases thrive in humid conditions. Improve air circulation, avoid overhead watering, apply fungicides preventively during susceptible periods. Copper-based fungicides are effective for many crops.",
    
    // Soil and fertilizer keywords
    "soil": "Healthy soil is foundation of good farming. Test soil pH regularly (most crops prefer 6.0-7.5). Add organic matter like compost or farmyard manure. Practice crop rotation to maintain soil fertility.",
    
    "fertilizer": "Use balanced NPK fertilizers based on soil test results. Apply organic fertilizers for long-term soil health. Split nitrogen application for better utilization. Avoid over-fertilization which can harm crops and environment.",
    
    "organic": "Organic farming uses natural methods. Compost, green manure, crop rotation, and biological pest control are key practices. Takes 3 years for certification. Market demand is growing with premium prices.",
    
    // Water and irrigation keywords
    "water": "Water management is critical for crop success. Use drip irrigation for water efficiency. Monitor soil moisture regularly. Avoid water stress during flowering and grain filling stages. Harvest rainwater when possible.",
    
    "irrigation": "Choose irrigation method based on crop, soil, and water availability. Drip irrigation saves 30-50% water. Sprinkler irrigation good for field crops. Furrow irrigation suitable for row crops.",
    
    "drought": "During drought, prioritize critical growth stages for irrigation. Use mulching to conserve soil moisture. Consider drought-tolerant varieties. Implement water-saving techniques like alternate wetting and drying.",
    
    // Weather-related keywords
    "weather": "Weather significantly impacts farming. Monitor forecasts regularly. Plan operations around weather patterns. Use weather-based advisory services. Climate change requires adaptation in farming practices.",
    
    "rain": "Rainfall timing and amount affect crop growth. Excess rain can cause flooding and disease. Too little rain causes drought stress. Plan planting dates based on monsoon predictions.",
    
    // Market and price keywords
    "price": "Crop prices fluctuate based on supply, demand, and market conditions. Stay informed about market trends. Consider value addition and direct marketing. Plan crop selection based on expected prices.",
    
    "market": "Understand your local markets and demand patterns. Build relationships with buyers. Consider contract farming for price security. Explore online platforms for better price discovery.",
    
    // General farming keywords
    "yield": "Good yield depends on variety selection, proper nutrition, pest management, and timely operations. Use recommended practices for your region. Monitor field regularly and take corrective actions promptly.",
    
    "harvest": "Harvest at right maturity for best quality and yield. Use proper harvesting techniques to minimize losses. Ensure proper drying and storage. Time marketing based on price trends.",
    
    "climate": "Climate change affects farming patterns. Adapt by choosing suitable varieties, adjusting planting dates, and improving water use efficiency. Follow local agricultural advisories.",
    
    // Default responses
    "default": [
      "That's an interesting question! For specific agricultural advice, I recommend consulting your local agricultural extension officer or agronomist.",
      "I'd suggest checking with your regional agricultural department for detailed guidance on this topic.",
      "This requires specific local knowledge. Consider reaching out to successful farmers in your area or agricultural cooperatives.",
      "For the most accurate advice, please consult recent agricultural research or extension services in your region."
    ]
  };

  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Check for specific keywords
    for (const [keyword, response] of Object.entries(farmingResponses)) {
      if (keyword !== "default" && message.includes(keyword)) {
        return response as string;
      }
    }
    
    // If no specific match, return a default response
    const defaultResponses = farmingResponses.default;
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(inputValue),
        sender: "bot",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5 seconds
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-[600px]">
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-primary">
            <Bot className="h-5 w-5" />
            AgriSmart AI Assistant
          </CardTitle>
          <p className="text-sm text-muted-foreground">Ask me about crops, pest management, soil health, irrigation, and farming best practices</p>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 px-4" ref={scrollAreaRef}>
            <div className="space-y-4 pb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.sender === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === "user" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-success text-success-foreground"
                  }`}>
                    {message.sender === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Leaf className="h-4 w-4" />
                    )}
                  </div>
                  
                  <div className={`max-w-[80%] ${
                    message.sender === "user" ? "text-right" : ""
                  }`}>
                    <div className={`rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}>
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-success text-success-foreground flex items-center justify-center">
                    <Leaf className="h-4 w-4" />
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="border-t border-border p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Ask about farming, crops, pests, soil, weather..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 border-primary/20"
                disabled={isTyping}
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={!inputValue.trim() || isTyping}
                className="px-3"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatBot;