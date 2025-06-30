
import { useState, useEffect } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import Terminal, { SectionId } from "@/components/Terminal/Terminal";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import MatrixBackground from "@/components/MatrixBackground";
import TypingAnimation from "@/components/TypingAnimation";
import { ArrowUp } from "lucide-react";

const TerminalPage = () => {
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSectionChange = (sectionId: SectionId) => {
    setActiveSection(sectionId);
    
    if (sectionId === "home") {
      scrollToTop();
      setActiveSection(null);
      return;
    }
    
    // Scroll to section with a delay to allow for animation
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 500);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "about":
        return <AboutSection />;
      case "experience":
        return <ExperienceSection />;
      case "projects":
        return <ProjectsSection />;
      case "skills":
        return <SkillsSection />;
      case "education":
        return <EducationSection />;
      case "contact":
        return <ContactSection />;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <MatrixBackground />
        
        <main className="flex-grow">
          <section className="min-h-screen flex flex-col justify-center items-center p-4">
            <div className={`transition-opacity duration-500 mb-8 ${activeSection ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
              <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-4">
                  Hi, I'm <span className="text-accent">Shishir Tamrakar</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                  <TypingAnimation 
                    texts={["Software Developer", "UI/UX Designer", "Problem Solver", "Innovation Enthusiast"]} 
                    typingSpeed={100}
                  />
                </p>
              </div>
            </div>
            
            <Terminal onSectionChange={handleSectionChange} />
          </section>
          
          {activeSection && (
            <div className="animate-fade-in">
              {renderSection()}
            </div>
          )}
        </main>
        
        <Footer />
        
        <button 
          onClick={scrollToTop}
          className={`fixed bottom-5 right-5 p-3 rounded-full bg-accent text-accent-foreground shadow-lg transition-opacity duration-300 ${
            showScrollButton ? 'opacity-80 hover:opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      </div>
    </ThemeProvider>
  );
};

export default TerminalPage;
