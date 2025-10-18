import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, FileText, GraduationCap, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

const StatsSection = () => {
  const { data: stats } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const [documentsResult, subjectsResult, levelsResult] = await Promise.all([
        supabase.from("documents").select("id", { count: "exact", head: true }),
        supabase.from("subjects").select("id", { count: "exact", head: true }),
        supabase.from("levels").select("id", { count: "exact", head: true }),
      ]);

      return {
        documents: documentsResult.count || 0,
        subjects: subjectsResult.count || 0,
        levels: levelsResult.count || 0,
        users: 15847, // Static for demo
      };
    },
  });

  const statCards = [
    {
      icon: FileText,
      label: "وثيقة متاحة",
      value: stats?.documents || 0,
      gradient: "from-purple-500 to-purple-700",
    },
    {
      icon: BookOpen,
      label: "مادة دراسية",
      value: stats?.subjects || 0,
      gradient: "from-blue-500 to-blue-700",
    },
    {
      icon: GraduationCap,
      label: "مستوى تعليمي",
      value: stats?.levels || 0,
      gradient: "from-green-500 to-green-700",
    },
    {
      icon: Users,
      label: "مستخدم نشط",
      value: stats?.users || 0,
      gradient: "from-orange-500 to-orange-700",
    },
  ];

  return (
    <section className="py-16 bg-[hsl(var(--darker-bg))] border-y border-border">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center animate-fade-in-up">
          إحصائيات <span className="text-gradient">المنصة</span>
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className="relative overflow-hidden glass-effect border-primary/20 p-6 md:p-8 text-center group hover:border-primary/50 transition-all duration-300 hover-lift animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-primary/20 rounded-2xl mb-4 group-hover:bg-primary/30 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <Icon className="h-7 w-7 md:h-8 md:w-8 text-primary" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gradient mb-3">
                    {stat.value.toLocaleString("ar-DZ")}
                  </div>
                  <div className="text-sm md:text-base text-muted-foreground font-medium">{stat.label}</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-500"></div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
