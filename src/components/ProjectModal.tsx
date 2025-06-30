
import { X, Github, ExternalLink } from "lucide-react";
import { useEffect, useRef } from "react";

export interface ProjectDetails {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

interface ProjectModalProps {
  project: ProjectDetails | null;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    // Lock body scroll
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      
      // Restore body scroll
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
      <div 
        ref={modalRef}
        className="glass w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl shadow-lg animate-slide-up"
      >
        <div className="relative p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-background/50 backdrop-blur-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-all"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
          
          <h3 className="text-2xl font-bold mb-4 pr-12">{project.title}</h3>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech, i) => (
              <span key={i} className="px-2 py-1 bg-accent/10 text-accent rounded text-xs">
                {tech}
              </span>
            ))}
          </div>
          
          <p className="text-muted-foreground mb-6">{project.longDescription || project.description}</p>
          
          <div className="flex flex-wrap gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary flex items-center gap-2"
              >
                <Github size={18} /> View Code
              </a>
            )}
            
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-accent flex items-center gap-2"
              >
                <ExternalLink size={18} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
