import { useState } from "react";
import { MapPin, Upload, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const CropRecommendation = () => {
  const [location, setLocation] = useState("");
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLocationUpload = async () => {
    if (!location.trim()) {
      toast({
        title: "Location Required",
        description: "Please enter your location to get crop recommendations.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call for crop recommendations
    setTimeout(() => {
      const mockRecommendations = [
        {
          name: "Rice",
          suitability: 95,
          season: "Kharif",
          expectedYield: "4-5 tons/hectare",
          marketPrice: "₹2,500/quintal",
          reasons: ["High water availability", "Suitable soil type", "Good market demand"]
        },
        {
          name: "Wheat",
          suitability: 85,
          season: "Rabi",
          expectedYield: "3-4 tons/hectare",
          marketPrice: "₹2,200/quintal",
          reasons: ["Favorable climate", "Good soil nutrients", "Stable market"]
        },
        {
          name: "Sugarcane",
          suitability: 78,
          season: "Year-round",
          expectedYield: "70-80 tons/hectare",
          marketPrice: "₹350/quintal",
          reasons: ["Water availability", "Suitable temperature", "Processing units nearby"]
        }
      ];
      
      setRecommendations(mockRecommendations);
      setIsLoading(false);
      
      toast({
        title: "Recommendations Generated",
        description: "Found 3 suitable crops for your location.",
      });
    }, 2000);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
          toast({
            title: "Location Detected",
            description: "Your current location has been detected.",
          });
        },
        () => {
          toast({
            title: "Location Error",
            description: "Unable to detect your location. Please enter manually.",
            variant: "destructive",
          });
        }
      );
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <TrendingUp className="h-5 w-5" />
            Crop Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                placeholder="Enter your location or coordinates"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border-primary/20"
              />
            </div>
            <Button variant="outline" onClick={getCurrentLocation} className="border-primary">
              <MapPin className="h-4 w-4" />
            </Button>
          </div>
          
          <Button onClick={handleLocationUpload} disabled={isLoading} className="w-full">
            {isLoading ? "Analyzing..." : "Get Recommendations"}
            <Upload className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      {recommendations.length > 0 && (
        <div className="space-y-3">
          {recommendations.map((crop, index) => (
            <Card key={index} className="border-primary/20">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-primary">{crop.name}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    crop.suitability >= 90 ? 'bg-success/20 text-success' :
                    crop.suitability >= 80 ? 'bg-warning/20 text-warning' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {crop.suitability}% Match
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                  <div>Season: <span className="text-foreground">{crop.season}</span></div>
                  <div>Yield: <span className="text-foreground">{crop.expectedYield}</span></div>
                  <div>Market Price: <span className="text-foreground">{crop.marketPrice}</span></div>
                </div>
                
                <div className="text-sm">
                  <span className="text-muted-foreground">Reasons: </span>
                  <span className="text-foreground">{crop.reasons.join(", ")}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CropRecommendation;