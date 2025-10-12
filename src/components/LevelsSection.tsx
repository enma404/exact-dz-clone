import LevelCard from "./LevelCard";
import { useLevels } from "@/hooks/useLevels";
import { Loader2 } from "lucide-react";

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

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-6">
          {levels?.map((level, index) => (
            <div
              key={level.id}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
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
    </section>
  );
};

export default LevelsSection;
