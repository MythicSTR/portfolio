
import { SectionId } from "./Terminal";
import type { ReactNode } from "react";

interface CommandInfo {
  name: string;
  description: string;
  usage?: string;
  action: (args?: string[]) => CommandResult;
}

export interface CommandResult {
  type: "success" | "error" | "section";
  message: string | ReactNode;
  sectionId?: SectionId;
}

export class CommandProcessor {
  private commands: Map<string, CommandInfo> = new Map();
  private commandHistory: string[] = [];
  private historyIndex: number = -1;

  constructor(sections: SectionId[]) {
    this.registerBaseCommands(sections);
  }

  registerBaseCommands(sections: SectionId[]) {
    // Help command
    this.registerCommand({
      name: "help",
      description: "Display available commands",
      action: () => this.helpCommand()
    });

    // Clear command
    this.registerCommand({
      name: "clear",
      description: "Clear the terminal",
      action: () => ({ type: "success", message: "clear-terminal" })
    });

    // About command
    this.registerCommand({
      name: "about",
      description: "Show information about Shishir",
      action: () => ({ type: "section", message: "Loading about section...", sectionId: "about" })
    });

    // Experience command
    this.registerCommand({
      name: "experience",
      description: "Show work experience",
      action: () => ({ type: "section", message: "Loading experience section...", sectionId: "experience" })
    });

    // Projects command
    this.registerCommand({
      name: "projects",
      description: "Show projects",
      action: () => ({ type: "section", message: "Loading projects section...", sectionId: "projects" })
    });

    // Skills command
    this.registerCommand({
      name: "skills",
      description: "Show skills and technologies",
      action: () => ({ type: "section", message: "Loading skills section...", sectionId: "skills" })
    });

    // Education command
    this.registerCommand({
      name: "education",
      description: "Show education and certifications",
      action: () => ({ type: "section", message: "Loading education section...", sectionId: "education" })
    });

    // Contact command
    this.registerCommand({
      name: "contact",
      description: "Show contact information",
      action: () => ({ type: "section", message: "Loading contact section...", sectionId: "contact" })
    });

    // Theme toggle command
    this.registerCommand({
      name: "theme",
      description: "Toggle dark/light theme",
      usage: "theme [dark|light]",
      action: (args) => {
        if (args && args.length > 0) {
          const mode = args[0].toLowerCase();
          if (mode !== "dark" && mode !== "light") {
            return { 
              type: "error", 
              message: "Invalid theme. Use 'theme dark' or 'theme light'." 
            };
          }
          return { 
            type: "success", 
            message: `Theme set to ${mode} mode.`,
            sectionId: `theme-${mode}` 
          };
        }
        return { 
          type: "success", 
          message: "Theme toggled.",
          sectionId: "theme-toggle" 
        };
      }
    });

    // Home command
    this.registerCommand({
      name: "home",
      description: "Go to home page",
      action: () => ({ type: "section", message: "Going to home page...", sectionId: "home" })
    });

    // Download resume command
    this.registerCommand({
      name: "download",
      description: "Download resume",
      usage: "download resume",
      action: (args) => {
        if (!args || args.length === 0 || args[0].toLowerCase() !== "resume") {
          return { 
            type: "error", 
            message: "Please specify what to download. Try 'download resume'." 
          };
        }
        return { 
          type: "success", 
          message: "Downloading resume...",
          sectionId: "download-resume" 
        };
      }
    });

    // Social links commands
    this.registerCommand({
      name: "github",
      description: "Open GitHub profile",
      action: () => ({ 
        type: "success", 
        message: "Opening GitHub profile...",
        sectionId: "github" 
      })
    });

    this.registerCommand({
      name: "linkedin",
      description: "Open LinkedIn profile",
      action: () => ({ 
        type: "success", 
        message: "Opening LinkedIn profile...",
        sectionId: "linkedin" 
      })
    });
  }

  registerCommand(command: CommandInfo) {
    this.commands.set(command.name.toLowerCase(), command);
  }

  processCommand(input: string): CommandResult {
    this.addToHistory(input);
    
    const parts = input.trim().split(/\s+/);
    const commandName = parts[0].toLowerCase();
    const args = parts.slice(1);

    const command = this.commands.get(commandName);
    
    if (!command) {
      return {
        type: "error",
        message: `Command not found: ${commandName}. Type 'help' for available commands.`
      };
    }

    return command.action(args);
  }

  addToHistory(command: string) {
    this.commandHistory.push(command);
    this.historyIndex = this.commandHistory.length;
  }

  getPreviousCommand(): string {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      return this.commandHistory[this.historyIndex];
    }
    return "";
  }

  getNextCommand(): string {
    if (this.historyIndex < this.commandHistory.length - 1) {
      this.historyIndex++;
      return this.commandHistory[this.historyIndex];
    }
    return "";
  }

  private helpCommand(): CommandResult {
    const helpContent = Array.from(this.commands.values()).map(cmd => {
      return `${cmd.name.padEnd(12)} - ${cmd.description}${cmd.usage ? ` (Usage: ${cmd.usage})` : ''}`;
    }).join('\n');

    return {
      type: "success",
      message: `Available commands:\n\n${helpContent}`
    };
  }
}
