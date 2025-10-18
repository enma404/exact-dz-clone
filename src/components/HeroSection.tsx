const HeroSection = () => {
  return (
    <section className="relative bg-[hsl(var(--darker-bg))] py-16 md:py-24 border-b border-border overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight animate-fade-in-up">
            بنك الفروض و الاختبارات{" "}
            <span className="text-gradient">الجزائري</span>
          </h2>
          
          <div className="inline-block glass-effect rounded-2xl px-8 py-4 border border-primary/30 animate-scale-in hover-lift glow-effect" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-2xl md:text-3xl font-bold text-gradient">
              التعليم الثانوي
            </h3>
          </div>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: "0.4s" }}>
            احصل الآن على أفضل الملخصات، التمارين ونماذج الفروض والاختبارات في كل المواد لجميع
            مستويات التعليم الثانوي، من أجل التحضير الجيد والنجاح في مشوارك الدراسي
          </p>

          {/* Decorative Elements */}
          <div className="flex justify-center gap-4 pt-4 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></div>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full"></div>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
