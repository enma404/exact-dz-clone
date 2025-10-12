import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const navItems = [
    { title: "الرئيسية", href: "/" },
    { title: "التعليم الثانوي", href: "#secondary" },
    { title: "التعليم المتوسط", href: "#middle" },
    { title: "التعليم الابتدائي", href: "#primary" },
    { title: "المواضيع", href: "#subjects" },
  ];

  return (
    <header className="gradient-header sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[hsl(var(--darker-bg))] border-border">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="text-foreground hover:text-primary transition-colors text-lg font-semibold"
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-white p-2 rounded-lg shadow-md">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <path
                    fill="hsl(var(--primary))"
                    d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 2.18l8 4v8.82c0 4.52-3.23 8.76-8 9.94-4.77-1.18-8-5.42-8-9.94V8.18l8-4z"
                  />
                  <path
                    d="M9 12l2 2 4-4"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
            </div>
            <div className="text-white">
              <h1 className="text-xl font-bold leading-tight">DzExams.com</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="text-white hover:text-white/80 transition-colors font-semibold"
              >
                {item.title}
              </a>
            ))}
          </nav>

          {/* Search */}
          <div className="hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 min-w-[200px]">
            <Search className="h-5 w-5 text-white/70" />
            <Input
              type="search"
              placeholder="ابحث..."
              className="border-0 bg-transparent text-white placeholder:text-white/60 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
