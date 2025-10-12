import { ArrowUp, Facebook, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[hsl(var(--darker-bg))] border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          {/* Social Media Icons */}
          <div className="flex items-center gap-4">
            <Button
              size="icon"
              className="bg-[#1877F2] hover:bg-[#1877F2]/90 rounded-lg"
              onClick={() => window.open("https://facebook.com", "_blank")}
            >
              <Facebook className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              className="bg-[#0088cc] hover:bg-[#0088cc]/90 rounded-lg"
              onClick={() => window.open("https://telegram.org", "_blank")}
            >
              <Send className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              className="bg-[#25D366] hover:bg-[#25D366]/90 rounded-lg"
              onClick={() => window.open("https://whatsapp.com", "_blank")}
            >
              <MessageCircle className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              className="bg-primary hover:bg-primary/90 rounded-lg"
              onClick={scrollToTop}
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
          </div>

          {/* Palestine Support Badge */}
          <div className="flex items-center gap-3 bg-[hsl(var(--card-bg))]/30 backdrop-blur-sm px-6 py-3 rounded-full border border-primary/20">
            <div className="flex gap-1">
              <div className="w-6 h-4 bg-[#000000] rounded-sm"></div>
              <div className="w-6 h-4 bg-[#FFFFFF] rounded-sm"></div>
              <div className="w-6 h-4 bg-[#00A758] rounded-sm"></div>
              <div className="w-6 h-4 bg-[#EE2A35] rounded-sm"></div>
            </div>
            <span className="text-sm font-semibold text-white">نحن مع فلسطين</span>
          </div>

          {/* Copyright */}
          <div className="text-center text-muted-foreground text-sm">
            <p>© 2024 DzExams.com - جميع الحقوق محفوظة</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
