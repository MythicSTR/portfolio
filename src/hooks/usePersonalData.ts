
import { useState, useEffect } from 'react';
import personalDataJson from '../data/personalData.json';

export interface PersonalData {
  personal: {
    name: string;
    title: string;
    location: string;
    description: string;
    github: string;
    linkedin: string;
  };
  about: {
    paragraphs: string[];
    coreSkills: string[];
  };
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    description: string[];
    technologies: string[];
  }>;
  projects: Array<{
    id: string;
    title: string;
    description: string;
    longDescription: string;
    technologies: string[];
    githubUrl: string;
    liveUrl?: string;
  }>;
  skills: Array<{
    name: string;
    icon: string;
    color: string;
    skills: string[];
  }>;
  education: Array<{
    icon: string;
    title: string;
    institution: string;
    duration: string;
    description: string;
  }>;
}

export const usePersonalData = (): PersonalData => {
  const [data, setData] = useState<PersonalData>(personalDataJson as PersonalData);

  useEffect(() => {
    setData(personalDataJson as PersonalData);
  }, []);

  return data;
};
