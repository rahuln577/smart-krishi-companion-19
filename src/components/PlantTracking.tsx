import { useState, useRef } from "react";
import { Camera, Upload, Calendar, TrendingUp, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const PlantTracking = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [trackingHistory, setTrackingHistory] = useState([
    {
      date: "2024-01-20",
      stage: "Seedling",
      health: "Excellent",
      notes: "Strong growth, good leaf development",
      image: null
    },
    {
      date: "2024-01-15",
      stage: "Germination",
      health: "Good",
      notes: "Seeds have sprouted successfully",
      image: null
    }
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        
        // Simulate plant analysis
        setTimeout(() => {
          const newEntry = {
            date: new Date().toISOString().split('T')[0],
            stage: "Vegetative Growth",
            health: "Good",
            notes: "Plant showing healthy development. Recommend maintaining current watering schedule.",
            image: e.target?.result as string
          };
          
          setTrackingHistory([newEntry, ...trackingHistory]);
          setSelectedImage(null);
          
          toast({
            title: "Plant Analysis Complete",
            description: "Your plant photo has been analyzed and added to tracking history.",
          });
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  const getHealthColor = (health: string) => {
    switch (health.toLowerCase()) {
      case "excellent":
        return "text-success bg-success/20";
      case "good":
        return "text-primary bg-primary/20";
      case "warning":
        return "text-warning bg-warning/20";
      case "poor":
        return "text-destructive bg-destructive/20";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  const getHealthIcon = (health: string) => {
    switch (health.toLowerCase()) {
      case "excellent":
      case "good":
        return <TrendingUp className="h-4 w-4" />;
      case "warning":
      case "poor":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <TrendingUp className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Camera className="h-5 w-5" />
            Plant Growth Tracking
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center p-6 border-2 border-dashed border-primary/30 rounded-lg">
            {selectedImage ? (
              <div className="space-y-4">
                <img src={selectedImage} alt="Selected plant" className="max-w-full h-48 object-cover rounded-lg mx-auto" />
                <p className="text-sm text-muted-foreground">Analyzing plant health...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Camera className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Upload Daily Plant Photo</p>
                  <p className="text-sm text-muted-foreground">Track your plant's growth and health</p>
                </div>
                <Button onClick={() => fileInputRef.current?.click()} className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Choose Photo
                </Button>
              </div>
            )}
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Calendar className="h-5 w-5" />
            Growth History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trackingHistory.map((entry, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{entry.stage}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getHealthColor(entry.health)}`}>
                        {getHealthIcon(entry.health)}
                        {entry.health}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{entry.date}</p>
                  </div>
                  {entry.image && (
                    <img src={entry.image} alt="Plant progress" className="w-16 h-16 object-cover rounded-lg" />
                  )}
                </div>
                <p className="text-sm text-foreground">{entry.notes}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlantTracking;