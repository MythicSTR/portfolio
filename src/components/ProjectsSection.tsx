import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";
import ProjectModal, { ProjectDetails } from "./ProjectModal";
import { ExternalLink, Github, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { usePersonalData } from "@/hooks/usePersonalData";

const ProjectCard = ({ project, onClick }: { project: ProjectDetails; onClick: () => void }) => {
  const cardReveal = useScrollReveal();
  
  return (
    <motion.div
      ref={cardReveal.ref as React.RefObject<HTMLDivElement>}
      className={`glass rounded-xl overflow-hidden group h-full transition-all duration-300 hover:shadow-lg ${
        cardReveal.isVisible ? "animate-fade-in" : "opacity-0"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={cardReveal.isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-semibold group-hover:text-accent transition-colors">{project.title}</h3>
          <motion.button
            onClick={onClick}
            className="btn btn-accent flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={18} /> View Details
          </motion.button>
        </div>
        
        <p className="text-muted-foreground mb-4 line-clamp-3">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech, i) => (
            <span key={i} className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs">
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
        
        <div className="flex gap-4 mt-auto">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
              aria-label={`View ${project.title} code on GitHub`}
            >
              <Github size={18} />
            </a>
          )}
          
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
              aria-label={`View ${project.title} live demo`}
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null);
  const titleReveal = useScrollReveal();
  const personalData = usePersonalData();

  return (
    <section id="projects" className="relative overflow-hidden py-16">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={titleReveal.ref as React.RefObject<HTMLDivElement>}
          className={`mb-12 ${titleReveal.isVisible ? "animate-fade-in" : "opacity-0"}`}
          initial={{ opacity: 0, y: 20 }}
          animate={titleReveal.isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-center mt-4">
            A selection of my recent work and personal projects
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personalData.projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project as ProjectDetails}
              onClick={() => setSelectedProject(project as ProjectDetails)}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default ProjectsSection;
