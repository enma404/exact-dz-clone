import LevelCard from "./LevelCard";
import { useLevels } from "@/hooks/useLevels";
import { Loader2, GraduationCap, School, BookOpen } from "lucide-react";

const LevelsSection = () => {
  const { data: levels, isLoading } = useLevels();

  if (isLoading) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  // تنظيم المستويات حسب المرحلة التعليمية
  const primaryLevels = levels?.filter(l => l.level_type === 'primary') || [];
  const middleLevels = levels?.filter(l => l.level_type === 'middle') || [];
  const secondaryLevels = levels?.filter(l => l.level_type === 'secondary') || [];

  const renderSection = (
    title: string, 
    icon: React.ReactNode, 
    levelsData: typeof levels, 
    startDelay: number
  ) => {
    if (!levelsData || levelsData.length === 0) return null;
    
    return (
      <div className="space-y-4 animate-fade-in">
        <div className="flex items-center gap-3 pr-2">
          <div className="p-2 rounded-lg bg-primary/10">
            {icon}
          </div>
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          <div className="h-px flex-1 bg-gradient-to-l from-border to-transparent" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {levelsData.map((level, index) => (
            <div
              key={level.id}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${(startDelay + index) * 50}ms` }}
            >
              <LevelCard 
                id={level.id}
                title={level.name_ar} 
                count={level.documents_count || 0} 
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="py-12 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {renderSection(
            "التعليم الابتدائي",
            <BookOpen className="h-6 w-6 text-primary" />,
            primaryLevels,
            0
          )}
          
          {renderSection(
            "التعليم المتوسط",
            <School className="h-6 w-6 text-primary" />,
            middleLevels,
            primaryLevels.length
          )}
          
          {renderSection(
            "التعليم الثانوي",
            <GraduationCap className="h-6 w-6 text-primary" />,
            secondaryLevels,
            primaryLevels.length + middleLevels.length
          )}
        </div>
      </div>
    </section>
  );
};

export default LevelsSection;
