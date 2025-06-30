
import { ArrowUp } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 px-4 border-t border-border">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-muted-foreground text-sm">
              © {currentYear} Shishir Tamrakar. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Scroll to top"
              className="p-2 rounded-full bg-secondary hover:bg-accent/10 text-muted-foreground hover:text-accent transition-all"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
