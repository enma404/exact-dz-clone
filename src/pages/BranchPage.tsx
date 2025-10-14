import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { lazy, Suspense } from "react";

const BranchPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: branch, isLoading: branchLoading } = useQuery({
    queryKey: ["branch", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("branches")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const { data: subjects, isLoading: subjectsLoading } = useQuery({
    queryKey: ["subjects", "branch", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("subjects")
        .select(`
          *,
          documents:documents(count)
        `)
        .eq("branch_id", id);

      if (error) throw error;
      return data;
    },
  });

  const getIcon = (iconName: string | null) => {
    if (!iconName || !(iconName in dynamicIconImports)) {
      return lazy(dynamicIconImports["book-open"]);
    }
    return lazy(dynamicIconImports[iconName as keyof typeof dynamicIconImports]);
  };

  if (branchLoading || subjectsLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <BackButton />
        
        <div className="max-w-5xl mx-auto mt-8">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              {branch?.name_ar}
            </h1>
            {branch?.description && (
              <p className="text-muted-foreground">{branch.description}</p>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {subjects?.map((subject, index) => {
              const Icon = getIcon(subject.icon_name);
              const documentsCount = subject.documents?.[0]?.count || 0;
              
              return (
                <div
                  key={subject.id}
                  className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Card
                    className="relative overflow-hidden bg-[hsl(var(--card-bg))]/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-300 card-shimmer group cursor-pointer hover-scale"
                    onClick={() => navigate(`/subject/${subject.id}`)}
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-primary/20 p-3 rounded-xl group-hover:bg-primary/30 transition-all duration-300 group-hover:scale-110">
                          <Suspense fallback={<div className="h-8 w-8" />}>
                            <Icon className="h-8 w-8 text-primary" />
                          </Suspense>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {subject.name_ar}
                          </h3>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-sm text-muted-foreground">
                          عدد الملفات
                        </span>
                        <div className="bg-primary/20 backdrop-blur-sm px-3 py-1 rounded-lg border border-primary/30">
                          <span className="text-lg font-bold text-primary">
                            {documentsCount}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BranchPage;
