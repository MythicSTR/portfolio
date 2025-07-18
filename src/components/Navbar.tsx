import { useTheme } from "@/context/ThemeContext";
import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { usePersonalData } from "@/hooks/usePersonalData";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const personalData = usePersonalData();
  const location = useLocation();

  // Handle scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to section smoothly
  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "glass shadow-sm py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link 
          to="/" 
          className="text-lg font-bold relative z-10"
        >
          <span className="text-accent">{personalData.personal.name_jp.split(' ')[0]}</span> {personalData.personal.name_jp.split(' ')[1]}
          {/* <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-accent/50"></span> */}
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {location.pathname === '/' ? (
            <>
              <a onClick={() => scrollToSection("about")} className="nav-link cursor-pointer">About</a>
              <a onClick={() => scrollToSection("experience")} className="nav-link cursor-pointer">Experience</a>
              <a onClick={() => scrollToSection("projects")} className="nav-link cursor-pointer">Projects</a>
              <a onClick={() => scrollToSection("skills")} className="nav-link cursor-pointer">Skills</a>
              <a onClick={() => scrollToSection("education")} className="nav-link cursor-pointer">Education</a>
              <a onClick={() => scrollToSection("contact")} className="nav-link cursor-pointer">Contact</a>
            </>
          ) : (
            <>
              <Link to="/#about" className="nav-link">About</Link>
              <Link to="/#experience" className="nav-link">Experience</Link>
              <Link to="/#projects" className="nav-link">Projects</Link>
              <Link to="/#skills" className="nav-link">Skills</Link>
              <Link to="/#education" className="nav-link">Education</Link>
              <Link to="/#contact" className="nav-link">Contact</Link>
            </>
          )}
          <Link to="/story" className="nav-link border-2 border-accent text-accent rounded px-4 py-1 transition hover:bg-accent hover:text-background">My Journey</Link>
          <button 
            onClick={toggleTheme} 
            className="ml-4 p-2 rounded-full hover:bg-muted transition-all"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-muted transition-all"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 glass pb-8 pt-20 px-6 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <nav className="flex flex-col items-center gap-6 text-lg">
          {location.pathname === '/' ? (
            <>
              <a onClick={() => scrollToSection("about")} className="nav-link w-full text-center py-2">About</a>
              <a onClick={() => scrollToSection("experience")} className="nav-link w-full text-center py-2">Experience</a>
              <a onClick={() => scrollToSection("projects")} className="nav-link w-full text-center py-2">Projects</a>
              <a onClick={() => scrollToSection("skills")} className="nav-link w-full text-center py-2">Skills</a>
              <a onClick={() => scrollToSection("education")} className="nav-link w-full text-center py-2">Education</a>
              <a onClick={() => scrollToSection("contact")} className="nav-link w-full text-center py-2">Contact</a>
            </>
          ) : (
            <>
              <Link to="/#about" className="nav-link w-full text-center py-2">About</Link>
              <Link to="/#experience" className="nav-link w-full text-center py-2">Experience</Link>
              <Link to="/#projects" className="nav-link w-full text-center py-2">Projects</Link>
              <Link to="/#skills" className="nav-link w-full text-center py-2">Skills</Link>
              <Link to="/#education" className="nav-link w-full text-center py-2">Education</Link>
              <Link to="/#contact" className="nav-link w-full text-center py-2">Contact</Link>
            </>
          )}
          <Link to="/story" className="nav-link w-full text-center py-2" onClick={() => setIsMenuOpen(false)}>Story</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;