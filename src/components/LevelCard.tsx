import { BookOpen, ChevronLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface LevelCardProps {
  id: string;
  title: string;
  count: number;
  gradient?: string;
}

const LevelCard = ({ id, title, count, gradient }: LevelCardProps) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="relative overflow-hidden bg-[hsl(var(--card-bg))]/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-300 card-shimmer group cursor-pointer hover-scale"
      onClick={() => navigate(`/level/${id}`)}
    >
      <div className="p-5 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="bg-primary/20 p-3 rounded-xl group-hover:bg-primary/30 transition-all duration-300 group-hover:scale-110">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {count} ملف متاح
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-primary/20 backdrop-blur-sm px-3 py-1 rounded-lg border border-primary/30">
            <span className="text-xl font-bold text-primary">{count}</span>
          </div>
          <ChevronLeft className="h-5 w-5 text-muted-foreground/50 group-hover:text-primary transition-all duration-300 group-hover:-translate-x-1" />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </Card>
  );
};

export default LevelCard;
