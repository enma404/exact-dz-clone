import { ArrowUp, Facebook, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[hsl(var(--darker-bg))] border-t border-border/50 py-12 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center gap-8">
          {/* Social Media Icons */}
          <div className="flex items-center gap-4 animate-fade-in-up">
            <Button
              size="icon"
              className="bg-[#1877F2] hover:bg-[#1877F2]/90 rounded-xl transition-all hover-scale glow-effect"
              onClick={() => window.open("https://facebook.com", "_blank")}
            >
              <Facebook className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              className="bg-[#0088cc] hover:bg-[#0088cc]/90 rounded-xl transition-all hover-scale glow-effect"
              onClick={() => window.open("https://telegram.org", "_blank")}
            >
              <Send className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              className="bg-[#25D366] hover:bg-[#25D366]/90 rounded-xl transition-all hover-scale glow-effect"
              onClick={() => window.open("https://whatsapp.com", "_blank")}
            >
              <MessageCircle className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              className="bg-primary hover:bg-primary/90 rounded-xl transition-all hover-scale glow-effect"
              onClick={scrollToTop}
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
          </div>

          {/* Palestine Support Badge */}
          <div className="flex items-center gap-3 glass-effect px-8 py-4 rounded-full border border-primary/30 group hover:border-primary/50 transition-all hover-scale animate-scale-in" style={{ animationDelay: "0.2s" }}>
            <div className="flex gap-1 group-hover:scale-110 transition-transform">
              <div className="w-6 h-4 bg-[#000000] rounded-sm shadow-md"></div>
              <div className="w-6 h-4 bg-[#FFFFFF] rounded-sm shadow-md"></div>
              <div className="w-6 h-4 bg-[#00A758] rounded-sm shadow-md"></div>
              <div className="w-6 h-4 bg-[#EE2A35] rounded-sm shadow-md"></div>
            </div>
            <span className="text-sm md:text-base font-bold text-gradient">نحن مع فلسطين 🇵🇸</span>
          </div>

          {/* Decorative Line */}
          <div className="flex items-center gap-4 w-full max-w-md animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          </div>

          {/* Copyright */}
          <div className="text-center text-muted-foreground text-sm md:text-base animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <p className="font-medium">© 2024 <span className="text-gradient font-bold">DzExams.com</span> - جميع الحقوق محفوظة</p>
            <p className="text-xs mt-2 opacity-75">صُنع بـ ❤️ للطلاب الجزائريين</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
