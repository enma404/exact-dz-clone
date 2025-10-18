const QuoteSection = () => {
  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="glass-effect border border-primary/30 rounded-3xl p-8 md:p-12 text-center group hover:border-primary/50 transition-all duration-500 hover-lift shadow-xl">
            {/* Decorative Quote Marks */}
            <div className="flex justify-center mb-6">
              <div className="text-6xl md:text-7xl text-primary/30 font-serif leading-none">"</div>
            </div>

            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed italic mb-6 animate-fade-in">
              قل إنما حرم ربي الفواحش ما ظهر منها وما بطن والإثم والبغي بغير الحق وأن تشركوا بالله ما
              لم ينزل به سلطانا وأن تقولوا على الله ما لا تعلمون
            </p>

            {/* Source */}
            <div className="flex items-center justify-center gap-3 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary"></div>
              <span className="text-sm md:text-base font-bold text-gradient">سورة الأعراف</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary"></div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-primary/20 rounded-tl-2xl"></div>
            <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-primary/20 rounded-br-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
