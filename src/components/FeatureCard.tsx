import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  bgColor: string;
  onClick?: () => void;
}

const FeatureCard = ({ icon, title, description, bgColor, onClick }: FeatureCardProps) => {
  return (
    <Card className={`${bgColor} border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer`} onClick={onClick}>
      <CardContent className="p-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-lg bg-white/80 flex items-center justify-center">
            {icon}
          </div>
        </div>
        <h3 className="font-semibold text-card-foreground mb-2">{title}</h3>
        <p className="text-sm text-card-foreground/70">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;