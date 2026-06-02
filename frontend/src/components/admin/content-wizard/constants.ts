import { FileText, BookOpen, Zap, Layers, Star } from "lucide-react";

export const BOARDS = [
  { id: "kerala_state", name: "Kerala State Syllabus", icon: "🏫" },
  { id: "cbse", name: "CBSE / NCERT", icon: "📜" },
];

export const CLASSES = [
  { id: "sslc", name: "SSLC (10th)", icon: "🎓" },
  { id: "plus_one", name: "Plus One (11th)", icon: "🔭" },
  { id: "plus_two", name: "Plus Two (12th)", icon: "🚀" },
];

export const STREAMS = [
  { id: "general", name: "General / All", icon: "📚" },
  { id: "science", name: "Science", icon: "🧪" },
  { id: "commerce", name: "Commerce", icon: "📊" },
  { id: "humanities", name: "Humanities", icon: "🌍" },
];

export const CONTENT_TYPES = [
  { id: "papers", name: "Question Paper", icon: FileText, endpoint: "question-papers" },
  { id: "notes", name: "Study Note", icon: BookOpen, endpoint: "notes" },
  { id: "mock_test", name: "Mock Test", icon: Zap, endpoint: "mock-tests" },
  { id: "material", name: "Study Material", icon: Layers, endpoint: "study-materials" },
  { id: "topic", name: "Important Topic", icon: Star, endpoint: "important-topics" },
];

export type SubjectOption = { id: number; name: string; slug?: string };

export type WizardPrefill = {
  board?: string;
  classLevel?: string;
  stream?: string;
  subjectSlug?: string;
};
