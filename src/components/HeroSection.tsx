const HeroSection = () => {
  return (
    <section className="bg-[hsl(var(--darker-bg))] py-12 border-b border-border">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            بنك الفروض و الاختبارات الجزائري
          </h2>
          <div className="inline-block bg-primary/20 backdrop-blur-sm rounded-2xl px-8 py-4 border border-primary/30">
            <h3 className="text-2xl md:text-3xl font-bold text-primary">
              التعليم الثانوي
            </h3>
          </div>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            احصل الآن على أفضل الملخصات، التمارين ونماذج الفروض والاختبارات في كل المواد لجميع
            مستويات التعليم الثانوي، من أجل التحضير الجيد والنجاح في مشوارك الدراسي
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
