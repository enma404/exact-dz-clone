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
        <section className="py-20 bg-[hsl(var(--dark-bg))]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 space-y-4">
                <h2 className="text-3xl md:text-5xl font-bold text-foreground animate-fade-in-up">
                  اختر <span className="text-gradient">المرحلة التعليمية</span>
                </h2>
                <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
                  ابدأ رحلتك التعليمية باختيار المرحلة الدراسية المناسبة
                </p>
                <div className="flex justify-center gap-2 pt-2 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                  <div className="w-12 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></div>
                  <div className="w-12 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full"></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {stages.map((stage, index) => {
                  const Icon = stage.icon;
                  return (
                    <Card
                      key={stage.id}
                      className="relative overflow-hidden glass-effect border-primary/20 hover:border-primary/50 transition-all duration-500 cursor-pointer group animate-scale-in"
                      style={{ animationDelay: `${index * 0.15}s` }}
                      onClick={() => {
                        navigate(`/stages/${stage.id}`);
                      }}
                    >
                      {/* Animated Background Gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${stage.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                      
                      {/* Glow Effect */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-500 rounded-lg opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
                      
                      <div className="relative p-8 md:p-10">
                        <div className="flex flex-col items-center text-center space-y-6">
                          {/* Icon Container */}
                          <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl group-hover:bg-primary/40 transition-all duration-500"></div>
                            <div className="relative bg-primary/20 p-6 md:p-8 rounded-2xl group-hover:bg-primary/30 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                              <Icon className="h-12 w-12 md:h-14 md:w-14 text-primary group-hover:text-white transition-colors" />
                            </div>
                          </div>
                          
                          {/* Content */}
                          <div className="space-y-3">
                            <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-gradient transition-all duration-300">
                              {stage.title}
                            </h3>
                            <p className="text-muted-foreground text-sm md:text-base font-medium">
                              {stage.description}
                            </p>
                          </div>

                          {/* CTA Button */}
                          <div className="pt-4 w-full">
                            <div className="glass-effect px-6 py-3 rounded-xl border border-primary/30 group-hover:border-primary/60 group-hover:bg-primary/10 transition-all duration-300">
                              <span className="text-sm md:text-base font-bold text-gradient">اضغط للدخول →</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Decorative Corner Element */}
                      <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-purple-500/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
