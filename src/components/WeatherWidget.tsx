import { useState, useEffect } from "react";
import { Cloud, Sun, CloudRain, Zap, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState({
    location: "Loading...",
    temperature: 20,
    condition: "sunny",
    minTemp: 18,
    maxTemp: 22,
    date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
  });

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="h-8 w-8 text-weather-sunny" />;
      case "cloudy":
        return <Cloud className="h-8 w-8 text-weather-cloudy" />;
      case "rainy":
        return <CloudRain className="h-8 w-8 text-weather-rainy" />;
      case "stormy":
        return <Zap className="h-8 w-8 text-weather-stormy" />;
      default:
        return <Sun className="h-8 w-8 text-weather-sunny" />;
    }
  };

  const getWeatherBg = (condition: string) => {
    switch (condition) {
      case "sunny":
        return "from-weather-sunny/20 to-weather-sunny/10";
      case "cloudy":
        return "from-weather-cloudy/20 to-weather-cloudy/10";
      case "rainy":
        return "from-weather-rainy/20 to-weather-rainy/10";
      case "stormy":
        return "from-weather-stormy/20 to-weather-stormy/10";
      default:
        return "from-weather-sunny/20 to-weather-sunny/10";
    }
  };

  useEffect(() => {
    // Simulate getting user location and weather data
    setTimeout(() => {
      setWeatherData({
        location: "Your Location",
        temperature: 25,
        condition: "sunny",
        minTemp: 19,
        maxTemp: 28,
        date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
      });
    }, 1000);
  }, []);

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold text-primary mb-3">Weather Conditions</h2>
      <Card className={`bg-gradient-to-br ${getWeatherBg(weatherData.condition)} border-primary/20`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{weatherData.location}</span>
            </div>
            <span className="text-sm text-muted-foreground">{weatherData.date}</span>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <div>
              <div className="text-3xl font-bold text-foreground">
                {weatherData.temperature}°C
              </div>
              <div className="text-sm text-muted-foreground">
                {weatherData.minTemp}°C / {weatherData.maxTemp}°C
              </div>
            </div>
            <div className="flex flex-col items-center">
              {getWeatherIcon(weatherData.condition)}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherWidget;