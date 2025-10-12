import { BookOpen } from "lucide-react";
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
      className="relative overflow-hidden bg-[hsl(var(--card-bg))]/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-300 card-shimmer group cursor-pointer"
      onClick={() => navigate(`/level/${id}`)}
    >
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-primary/20 p-3 rounded-xl group-hover:bg-primary/30 transition-colors">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
            {title}
          </h3>
        </div>
        <div className="bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-primary/30">
          <span className="text-2xl font-bold text-primary">{count}</span>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </Card>
  );
};

export default LevelCard;
