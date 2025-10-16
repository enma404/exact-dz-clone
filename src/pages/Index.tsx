import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import QuoteSection from "@/components/QuoteSection";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { GraduationCap, BookOpen, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const stages = [
    {
      id: "primary",
      title: "التعليم الابتدائي",
      icon: BookOpen,
      description: "السنة الأولى إلى الخامسة ابتدائي",
      gradient: "from-blue-500/20 to-blue-600/20",
    },
    {
      id: "middle",
      title: "التعليم المتوسط",
      icon: GraduationCap,
      description: "السنة الأولى إلى الرابعة متوسط",
      gradient: "from-purple-500/20 to-purple-600/20",
    },
    {
      id: "secondary",
      title: "التعليم الثانوي",
      icon: Award,
      description: "السنة الأولى إلى الثالثة ثانوي",
      gradient: "from-pink-500/20 to-pink-600/20",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        
        {/* Educational Stages Section */}
        <section className="py-16 bg-[hsl(var(--dark-bg))]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  اختر المرحلة التعليمية
                </h2>
                <p className="text-muted-foreground text-lg">
                  ابدأ رحلتك التعليمية باختيار المرحلة الدراسية المناسبة
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stages.map((stage, index) => {
                  const Icon = stage.icon;
                  return (
                    <Card
                      key={stage.id}
                      className="relative overflow-hidden bg-[hsl(var(--card-bg))]/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-300 cursor-pointer hover-scale group animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onClick={() => {
                        // Navigate to levels filtered by stage type
                        navigate(`/stages/${stage.id}`);
                      }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${stage.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                      
                      <div className="relative p-8">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className="bg-primary/20 p-6 rounded-2xl group-hover:bg-primary/30 transition-all duration-300 group-hover:scale-110">
                            <Icon className="h-12 w-12 text-primary" />
                          </div>
                          
                          <div>
                            <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                              {stage.title}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              {stage.description}
                            </p>
                          </div>

                          <div className="pt-4">
                            <div className="bg-primary/10 px-4 py-2 rounded-lg border border-primary/30">
                              <span className="text-sm font-medium text-primary">اضغط للدخول</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <QuoteSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
