import { useScrollReveal } from "@/hooks/useScrollReveal";
import { usePersonalData } from "@/hooks/usePersonalData";

interface ExperienceItemProps {
  title: string;
  company: string;
  duration: string;
  description: string[];
  technologies: string[];
  index: number;
}

const ExperienceItem = ({ title, company, duration, description, technologies, index }: ExperienceItemProps) => {
  const itemReveal = useScrollReveal({ delay: 200 * index });

  return (
    <div
      ref={itemReveal.ref as React.RefObject<HTMLDivElement>}
      className={`relative pl-8 pb-12 ${itemReveal.isVisible ? "animate-fade-in" : "opacity-0"}`}
    >
      <div className="timeline-line"></div>
      <div className="timeline-dot"></div>
      
      <div className="glass rounded-lg p-6 hover:shadow-md transition-all">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <h3 className="font-semibold text-xl">{title}</h3>
          <span className="text-sm font-medium bg-accent/10 text-accent px-3 py-1 rounded-full mt-2 md:mt-0">
            {duration}
          </span>
        </div>
        
        <h4 className="text-accent font-medium mb-4">{company}</h4>
        
        <ul className="list-disc pl-5 mb-4 space-y-2">
          {description.map((item, i) => (
            <li key={i} className="text-muted-foreground">{item}</li>
          ))}
        </ul>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {technologies.map((tech, i) => (
            <span key={i} className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const ExperienceSection = () => {
  const titleReveal = useScrollReveal();
  const personalData = usePersonalData();
  
  return (
    <section id="experience" className="relative overflow-hidden bg-secondary/50">
      <div className="container mx-auto max-w-5xl">
        <div
          ref={titleReveal.ref as React.RefObject<HTMLDivElement>}
          className={`mb-12 ${titleReveal.isVisible ? "animate-fade-in" : "opacity-0"}`}
        >
          <h2 className="section-title">Experience</h2>
        </div>

        <div className="ml-4">
          {personalData.experience.map((exp, index) => (
            <ExperienceItem
              key={index}
              {...exp}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
