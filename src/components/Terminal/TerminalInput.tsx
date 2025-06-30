
import { useState, useRef, useEffect } from "react";

interface TerminalInputProps {
  onCommand: (command: string) => void;
  prompt?: string;
  autoFocus?: boolean;
}

const TerminalInput = ({ 
  onCommand, 
  prompt = ">", 
  autoFocus = false 
}: TerminalInputProps) => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onCommand(input.trim());
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center w-full">
      <span className="text-accent mr-2 font-mono">{prompt}</span>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 bg-transparent border-none outline-none font-mono"
        autoFocus={autoFocus}
        spellCheck="false"
        autoComplete="off"
        aria-label="Terminal input"
      />
    </form>
  );
};

export default TerminalInput;
