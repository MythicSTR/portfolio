
import { Link } from "react-router-dom";

const TerminalFooter = () => {
  return (
    <div className="text-xs text-muted-foreground mt-4 flex justify-between items-center">
      <span>© {new Date().getFullYear()} Shishir Tamrakar</span>
      <Link to="/classic" className="hover:text-accent transition-colors">
        View Classic Mode
      </Link>
    </div>
  );
};

export default TerminalFooter;
