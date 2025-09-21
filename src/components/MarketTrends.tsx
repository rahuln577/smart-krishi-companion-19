import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MarketTrends = () => {
  const marketData = [
    {
      crop: "Rice",
      currentPrice: "₹2,500",
      change: "+5.2%",
      trend: "up",
      prediction: "Increasing demand expected",
      volume: "2,340 tonnes"
    },
    {
      crop: "Wheat",
      currentPrice: "₹2,200",
      change: "-2.1%",
      trend: "down",
      prediction: "Seasonal price correction",
      volume: "1,890 tonnes"
    },
    {
      crop: "Sugarcane",
      currentPrice: "₹350",
      change: "+1.8%",
      trend: "up",
      prediction: "Stable market conditions",
      volume: "5,670 tonnes"
    },
    {
      crop: "Cotton",
      currentPrice: "₹6,800",
      change: "+3.5%",
      trend: "up",
      prediction: "Export demand rising",
      volume: "890 tonnes"
    }
  ];

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <TrendingUp className="h-4 w-4 text-success" />
    ) : (
      <TrendingDown className="h-4 w-4 text-destructive" />
    );
  };

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "text-success" : "text-destructive";
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <BarChart3 className="h-5 w-5" />
            Market Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {marketData.map((item, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground">{item.crop}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-lg font-bold text-primary">{item.currentPrice}</span>
                      <div className={`flex items-center gap-1 ${getTrendColor(item.trend)}`}>
                        {getTrendIcon(item.trend)}
                        <span className="text-sm font-medium">{item.change}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Volume</p>
                    <p className="font-medium text-foreground">{item.volume}</p>
                  </div>
                </div>
                
                <div className="bg-muted rounded-lg p-3">
                  <p className="text-sm font-medium text-foreground mb-1">Market Prediction</p>
                  <p className="text-sm text-muted-foreground">{item.prediction}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-success" />
            <span className="font-medium text-primary">Market Insight</span>
          </div>
          <p className="text-sm text-foreground">
            Kharif season approaching - Rice and Cotton prices showing upward trend due to increased export demand and favorable weather conditions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketTrends;