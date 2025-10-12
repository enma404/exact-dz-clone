const QuoteSection = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[hsl(var(--darker-bg))] border border-border rounded-2xl p-6 text-center">
            <p className="text-muted-foreground text-lg leading-relaxed italic">
              « قل إنما حرم ربي الفواحش ما ظهر منها وما بطن والإثم والبغي بغير الحق وأن تشركوا بالله ما
              لم ينزل به سلطانا وأن تقولوا على الله ما لا تعلمون - الأعراف »
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
