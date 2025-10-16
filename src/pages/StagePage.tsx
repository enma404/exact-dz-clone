import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import LevelCard from "@/components/LevelCard";
import { useLevels } from "@/hooks/useLevels";
import { Loader2, GraduationCap, BookOpen, Award } from "lucide-react";

const StagePage = () => {
  const { stageId } = useParams();
  const { data: levels, isLoading } = useLevels();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  const stageConfig = {
    primary: {
      title: "التعليم الابتدائي",
      icon: BookOpen,
      type: "primary",
    },
    middle: {
      title: "التعليم المتوسط",
      icon: GraduationCap,
      type: "middle",
    },
    secondary: {
      title: "التعليم الثانوي",
      icon: Award,
      type: "secondary",
    },
  };

  const currentStage = stageConfig[stageId as keyof typeof stageConfig];
  const StageIcon = currentStage?.icon;

  const filteredLevels = levels?.filter(
    (level) => level.level_type === currentStage?.type
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-[hsl(var(--darker-bg))] py-12 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <BackButton to="/" />
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3 mb-4">
                  {StageIcon && (
                    <div className="bg-primary/20 p-4 rounded-2xl">
                      <StageIcon className="h-10 w-10 text-primary" />
                    </div>
                  )}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                  {currentStage?.title}
                </h1>
                <p className="text-muted-foreground text-lg">
                  اختر السنة الدراسية
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Levels Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredLevels?.map((level, index) => (
                  <div
                    key={level.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <LevelCard
                      id={level.id}
                      title={level.name_ar}
                      count={level.documents_count || 0}
                    />
                  </div>
                ))}
              </div>

              {filteredLevels?.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-xl text-muted-foreground">
                    لا توجد سنوات دراسية متاحة حاليًا
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default StagePage;
