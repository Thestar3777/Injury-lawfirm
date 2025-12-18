import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { useCmsContent, CmsContent } from "@/hooks/useCmsContent";

const navLinks = [{
  name: "Practice Areas",
  path: "/services"
}, {
  name: "Case Results",
  path: "/testimonials"
}, {
  name: "About Us",
  path: "/about"
}, {
  name: "Contact",
  path: "/contact"
}];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  const { data: allContent } = useCmsContent();
  
  const contentMap = (allContent as CmsContent[] || []).reduce((acc, item) => {
    acc[item.section_key] = item.content;
    return acc;
  }, {} as Record<string, Record<string, unknown>>);

  const contactContent = contentMap.contact || {};
  const firmContent = contentMap.firm || {};

  const phone = (contactContent.phone as string) || "1-800-555-1234";
  const firmName = (firmContent.name as string) || "JUSTICE & ASSOCIATES";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-sm shadow-lg" : "bg-transparent"}`}>
      <div className="container-custom">
        <nav className="flex items-center h-16">
          <Link to="/" className="flex flex-col shrink-0">
            <span className={`text-xl md:text-2xl font-bold font-display tracking-wide transition-colors duration-300 ${isScrolled ? "text-primary" : "text-white"}`}>
              {firmName.toUpperCase()}
            </span>
            <span className={`text-[10px] tracking-widest uppercase transition-colors duration-300 ${isScrolled ? "text-primary/60" : "text-white/60"}`}>
              Personal Injury Attorneys
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex gap-0.5 items-center justify-center flex-1 mx-8">
            {navLinks.map(link => (
              <li key={link.path}>
                <Link to={link.path} className={`font-bold transition-colors duration-200 px-3 py-1.5 rounded text-sm ${location.pathname === link.path ? "text-emerald-light bg-primary/10" : isScrolled ? "text-primary/90 hover:text-primary hover:bg-primary/5" : "text-white/90 hover:text-white hover:bg-white/5"}`}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="hidden lg:block shrink-0">
            <a href={`tel:${phone.replace(/[^0-9]/g, '')}`} className="text-white font-semibold px-5 py-2 rounded-lg hover:bg-emerald-light transition-colors text-sm flex items-center gap-2 shadow-md bg-primary">
              <Phone className="w-4 h-4" />
              Free Consultation
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className={`lg:hidden p-2 ml-auto min-h-[44px] min-w-[44px] flex items-center justify-center rounded transition-colors ${isScrolled ? "text-primary hover:bg-primary/5" : "text-white hover:bg-white/5"}`} onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation - Full Screen Overlay */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-0 left-0 w-full h-full bg-black z-50 animate-fade-in flex flex-col">
            {/* Close button */}
            <div className="flex justify-between items-center p-4 border-b border-white/10">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white font-display hover:text-emerald-light transition-colors">{firmName.toUpperCase()}</Link>
              <button 
                onClick={() => setIsMenuOpen(false)} 
                className="text-white p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Navigation Links */}
            <ul className="flex flex-col gap-2 p-6 flex-1">
              {navLinks.map(link => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    onClick={() => setIsMenuOpen(false)} 
                    className={`block w-full py-4 px-4 font-medium text-lg transition-colors duration-200 rounded-lg ${location.pathname === link.path ? "text-emerald-light bg-white/10" : "text-white hover:text-white hover:bg-white/5"}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* CTA at bottom */}
            <div className="p-6 border-t border-white/10">
              <a 
                href={`tel:${phone.replace(/[^0-9]/g, '')}`} 
                className="block w-full bg-primary text-white font-semibold px-5 py-4 rounded-lg text-center text-lg shadow-md hover:bg-emerald-light transition-colors"
              >
                Call Now: {phone}
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
