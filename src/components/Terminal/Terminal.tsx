
import { useEffect, useRef, useState } from "react";
import TerminalInput from "./TerminalInput";
import TerminalOutput, { OutputType } from "./TerminalOutput";
import { CommandProcessor, CommandResult } from "./CommandProcessor";
import { useTheme } from "@/context/ThemeContext";
import TypingAnimation from "../TypingAnimation";
import TerminalFooter from "./TerminalFooter";

export type SectionId = 
  | "about" 
  | "experience" 
  | "projects" 
  | "skills" 
  | "education" 
  | "contact" 
  | "home" 
  | "theme-toggle" 
  | "theme-dark" 
  | "theme-light" 
  | "download-resume" 
  | "github" 
  | "linkedin";

interface TerminalProps {
  onSectionChange: (sectionId: SectionId) => void;
}

type OutputEntry = {
  id: string;
  type: OutputType;
  content: React.ReactNode;
};

const WELCOME_MESSAGE = (
  <div>
    <div className="font-bold text-lg mb-2">Welcome to Shishir Tamrakar's Portfolio Terminal</div>
    <p className="mb-1">Type 'help' to see available commands.</p>
    <p>Try navigating to sections with commands like 'about', 'projects', or 'skills'.</p>
  </div>
);

const Terminal = ({ onSectionChange }: TerminalProps) => {
  const [output, setOutput] = useState<OutputEntry[]>([
    { id: "welcome", type: "welcome", content: WELCOME_MESSAGE }
  ]);
  const [showTypingPrompt, setShowTypingPrompt] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const commandProcessorRef = useRef<CommandProcessor>(
    new CommandProcessor([
      "about", "experience", "projects", "skills", 
      "education", "contact", "home"
    ])
  );
  const { toggleTheme, setTheme } = useTheme();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [output]);

  const handleCommand = (command: string) => {
    // Add command to output
    const commandEntry: OutputEntry = {
      id: `cmd-${Date.now()}`,
      type: "command",
      content: command
    };
    
    setOutput(prev => [...prev, commandEntry]);
    setShowTypingPrompt(false);
    
    // Process command
    setTimeout(() => {
      const result = commandProcessorRef.current.processCommand(command);
      
      if (result.message === "clear-terminal") {
        setOutput([]);
      } else {
        // Format the message if it's a string and contains newlines (like help command)
        let formattedContent = result.message;
        if (typeof result.message === 'string' && result.message.includes('\n')) {
          formattedContent = (
            <div className="whitespace-pre-wrap">
              <pre>{result.message}</pre>
            </div>
          );
        }
        
        const resultEntry: OutputEntry = {
          id: `res-${Date.now()}`,
          type: result.type === "error" ? "error" : 
                result.type === "section" ? "section" : "response",
          content: formattedContent
        };
        
        setOutput(prev => [...prev, resultEntry]);
        
        // Handle special actions
        if (result.sectionId) {
          if (result.sectionId === "theme-toggle") {
            toggleTheme();
          } else if (result.sectionId === "theme-dark") {
            setTheme("dark");
          } else if (result.sectionId === "theme-light") {
            setTheme("light");
          } else if (result.sectionId === "download-resume") {
            alert("Resume download would happen here");
          } else if (result.sectionId === "github") {
            window.open("https://github.com", "_blank");
          } else if (result.sectionId === "linkedin") {
            window.open("https://linkedin.com", "_blank");
          } else {
            onSectionChange(result.sectionId);
          }
        }
      }
      
      // Show typing prompt again
      setShowTypingPrompt(true);
    }, 300);
  };

  return (
    <div className="glass p-4 md:p-6 rounded-lg max-h-[80vh] overflow-auto w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4 border-b border-border pb-2">
        <div className="flex space-x-2">
          <div className="h-3 w-3 rounded-full bg-destructive"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs text-muted-foreground">portfolio@shishir:~</div>
      </div>
      
      <div className="font-mono">
        {output.map((entry) => (
          <TerminalOutput
            key={entry.id}
            type={entry.type}
            content={entry.content}
          />
        ))}
        
        {showTypingPrompt && (
          <div className="mt-2">
            <TerminalInput onCommand={handleCommand} autoFocus />
          </div>
        )}
        
        <div ref={bottomRef} />
      </div>
      
      <TerminalFooter />
    </div>
  );
};

export default Terminal;
