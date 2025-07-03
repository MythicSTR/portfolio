
import { ArrowDown, Github, Linkedin, Download } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import TypingAnimation from "./TypingAnimation";
import { motion } from "framer-motion";
import { usePersonalData } from "@/hooks/usePersonalData";
import { ToastContainer, toast } from 'react-toastify';

import resume from "public/resume.pdf";

const HeroSection = () => {
  const titleReveal = useScrollReveal();
  const subtitleReveal = useScrollReveal({ delay: 200 });
  const descriptionReveal = useScrollReveal({ delay: 400 });
  const ctaReveal = useScrollReveal({ delay: 600 });
  const personalData = usePersonalData();

  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-8 px-4">
          <motion.div 
            ref={titleReveal.ref as React.RefObject<HTMLDivElement>} 
            className={`${titleReveal.isVisible ? 'animate-fade-in' : 'opacity-0'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={titleReveal.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-sm md:text-base font-medium bg-accent/10 text-accent px-3 py-1 rounded-full">
              {personalData.personal.title}
            </span>
          </motion.div>
          
          <motion.h1 
            ref={subtitleReveal.ref as React.RefObject<HTMLHeadingElement>}
            className={`text-4xl md:text-5xl lg:text-7xl font-bold leading-tight ${
              subtitleReveal.isVisible ? 'animate-fade-in' : 'opacity-0'
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={subtitleReveal.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Hi, I'm <TypingAnimation 
              texts={[personalData.personal.name, "Developer", "Problem Solver"]} 
              typingSpeed={100}
              className="text-accent"
            />
          </motion.h1>
          
          <motion.p 
            ref={descriptionReveal.ref as React.RefObject<HTMLParagraphElement>}
            className={`text-lg md:text-xl text-muted-foreground max-w-2xl ${
              descriptionReveal.isVisible ? 'animate-fade-in' : 'opacity-0'
            }`}
            initial={{ opacity: 0, y: 40 }}
            animate={descriptionReveal.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            {personalData.personal.description}
          </motion.p>
          
          <motion.div 
            ref={ctaReveal.ref as React.RefObject<HTMLDivElement>}
            className={`flex flex-wrap gap-4 mt-4 ${
              ctaReveal.isVisible ? 'animate-fade-in' : 'opacity-0'
            }`}
            initial={{ opacity: 0, y: 50 }}
            animate={ctaReveal.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.a 
              href={resume}
              download="Shishir_Tamrakar_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent btn-lg flex items-center gap-2"
              onClick={(e) => {
                e.preventDefault();
                // This would be replaced with actual resume download
                toast("Thank you for your interest in my profile.");
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={18} />
              Download Resume
            </motion.a>
            
            <div className="flex gap-4 items-center">
              <motion.a 
                href={personalData.personal.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-ghost btn-icon rounded-full"
                aria-label="GitHub Profile"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={20} />
              </motion.a>
              <motion.a 
                href={personalData.personal.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-ghost btn-icon rounded-full"
                aria-label="LinkedIn Profile"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={20} />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1.5, 
          delay: 1,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <a 
          href="#about"
          className="flex flex-col items-center text-sm text-muted-foreground gap-2"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span>Scroll Down</span>
          <ArrowDown size={20} />
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
