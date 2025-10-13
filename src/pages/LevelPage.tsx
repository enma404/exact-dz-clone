import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import { Card } from "@/components/ui/card";
import { Loader2, BookOpen, FileText } from "lucide-react";
import * as Icons from "lucide-react";

const LevelPage = () => {
  const { levelId } = useParams();
  const navigate = useNavigate();

  const { data: level, isLoading: levelLoading } = useQuery({
    queryKey: ["level", levelId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("levels")
        .select("*")
        .eq("id", levelId)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const { data: subjects, isLoading: subjectsLoading } = useQuery({
    queryKey: ["subjects", levelId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("subjects")
        .select(`
          *,
          documents:documents(count)
        `)
        .eq("level_id", levelId);

      if (error) throw error;

      return data.map((subject) => ({
        ...subject,
        documents_count: subject.documents?.[0]?.count || 0,
      }));
    },
  });

  const getIcon = (iconName: string | null) => {
    if (!iconName) return BookOpen;
    const Icon = (Icons as any)[iconName.split("-").map((word: string) => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join("")];
    return Icon || BookOpen;
  };

  if (levelLoading || subjectsLoading) {
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
                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  {level?.name_ar}
                </h1>
                <p className="text-muted-foreground text-lg">
                  تصفح جميع المواد الدراسية والوثائق المتاحة
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Subjects Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">المواد الدراسية</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {subjects?.map((subject) => {
                const Icon = getIcon(subject.icon_name);
                return (
                  <Card
                    key={subject.id}
                    className="relative overflow-hidden bg-[hsl(var(--card-bg))]/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-300 card-shimmer group cursor-pointer"
                    onClick={() => navigate(`/subject/${subject.id}`)}
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-primary/20 p-3 rounded-xl group-hover:bg-primary/30 transition-colors">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors flex-1">
                          {subject.name_ar}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <FileText className="h-4 w-4" />
                        <span>{subject.documents_count} وثيقة</span>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LevelPage;
