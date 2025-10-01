import { memo } from 'react'
import { Mail, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import isEqual from 'react-fast-compare'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  // Close menu when transitioning from mobile to desktop
  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false);
    }
  }, [isMobile]);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "/properties", label: "Properties", external: true },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" }
  ];

  const getExternalProps = (isExternal: boolean) => isExternal ? {
    target: "_blank",
    rel: "noopener noreferrer"
  } : {};

  return (
    <header className="bg-white/60 backdrop-blur-md border-b border-gray-100/50 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/">
              <img
                src="/favicon.svg"
                alt="Cyndi Kaszirer REALTOR®"
                className="h-14 w-auto"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...getExternalProps(!!link.external)}
                className="text-gray-700 hover:text-primary font-medium transition-all duration-200 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:-bottom-1 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-700"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="pt-16 bg-white/30 backdrop-blur-xl border-0">
                <nav className="flex flex-col gap-3">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      {...getExternalProps(!!link.external)}
                      className="text-center py-4 rounded-lg bg-white/40 hover:bg-white/50 text-gray-800 hover:text-primary font-medium transition-all duration-200 backdrop-blur-sm shadow-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

export default memo(Header, isEqual)
