import LevelCard from "./LevelCard";

const LevelsSection = () => {
  const levels = [
    { title: "السنة الأولى ثانوي", count: 3429 },
    { title: "السنة الثانية ثانوي", count: 4544 },
    { title: "السنة الثالثة ثانوي", count: 7002 },
    { title: "شهادة البكالوريا", count: 709 },
    { title: "بوابة التعليم الجامعي", count: 125 },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-6">
          {levels.map((level, index) => (
            <div
              key={level.title}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <LevelCard title={level.title} count={level.count} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LevelsSection;
