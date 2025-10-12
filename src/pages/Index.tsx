import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LevelsSection from "@/components/LevelsSection";
import StatsSection from "@/components/StatsSection";
import QuoteSection from "@/components/QuoteSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <LevelsSection />
        <QuoteSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
