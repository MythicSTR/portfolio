
import { useTheme } from "@/context/ThemeContext";
import React from "react";

export type OutputType = "command" | "response" | "error" | "welcome" | "section";

interface TerminalOutputProps {
  type: OutputType;
  content: React.ReactNode;
  prompt?: string;
}

const TerminalOutput = ({ type, content, prompt = ">" }: TerminalOutputProps) => {
  const { theme } = useTheme();
  
  const getTypeStyles = () => {
    switch (type) {
      case "command":
        return "opacity-90";
      case "response":
        return "opacity-80";
      case "error":
        return "text-destructive";
      case "welcome":
        return "text-accent font-bold";
      case "section":
        return "text-accent/90";
      default:
        return "";
    }
  };

  return (
    <div className={`font-mono mb-2 ${getTypeStyles()}`}>
      {type === "command" && <span className="text-accent mr-2">{prompt}</span>}
      <div className={type === "command" ? "inline" : "ml-0 mt-1"}>
        {content}
      </div>
    </div>
  );
};

export default TerminalOutput;
