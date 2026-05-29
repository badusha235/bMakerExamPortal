import {
  Calculator, Atom, FlaskConical, Leaf, BookOpen,
  Languages, Globe, Monitor, type LucideIcon
} from "lucide-react";

export interface Chapter {
  id: number;
  title: string;
  summary: string;
  formulas?: string[];
  keyPoints: string[];
  completed: boolean;
  progress: number;
  bookmarked: boolean;
  oneMarkQuestions: number;
  shortNotes: number;
}

export interface Subject {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  gradient: string;
  description: string;
  chapters: Chapter[];
  totalNotes: number;
  totalTests: number;
  progress: number;
}

export interface QuestionPaper {
  id: string;
  year: number;
  subject: string;
  totalMarks: number;
  pages: number;
  difficulty: "Easy" | "Medium" | "Hard";
  hasAnswerKey: boolean;
  downloadUrl: string;
  repeatedTopics: string[];
}

export interface MockTest {
  id: string;
  title: string;
  subject: string;
  type: "subject" | "full" | "daily" | "chapter";
  totalQuestions: number;
  duration: number; // minutes
  negativeMarking: boolean;
  difficulty: "Easy" | "Medium" | "Hard";
  attempts: number;
  bestScore: number | null;
  isLive: boolean;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topic: string;
}

export const sslcSubjects: Subject[] = [
  {
    id: "mathematics",
    name: "Mathematics",
    icon: Calculator,
    color: "bg-blue-500",
    gradient: "from-blue-500 to-blue-600",
    description: "Algebra, Geometry, Trigonometry & Statistics for Kerala SSLC",
    chapters: [
      { id: 1, title: "Arithmetic Sequences", summary: "Understanding arithmetic progressions, nth term, and sum formulas", formulas: ["aₙ = a₁ + (n-1)d", "Sₙ = n/2[2a + (n-1)d]"], keyPoints: ["Common difference", "Sum of n terms", "Real-life applications"], completed: true, progress: 100, bookmarked: false, oneMarkQuestions: 15, shortNotes: 8 },
      { id: 2, title: "Circles", summary: "Tangent properties, chord properties, and circle theorems", formulas: ["Area = πr²", "Circumference = 2πr"], keyPoints: ["Tangent perpendicular to radius", "Chord bisector passes through center", "Angle in semicircle"], completed: true, progress: 100, bookmarked: true, oneMarkQuestions: 12, shortNotes: 6 },
      { id: 3, title: "Mathematics of Chance", summary: "Probability concepts and solving probability problems", formulas: ["P(E) = n(E)/n(S)", "P(E') = 1 - P(E)"], keyPoints: ["Sample space", "Favorable outcomes", "Complementary events"], completed: false, progress: 65, bookmarked: false, oneMarkQuestions: 10, shortNotes: 5 },
      { id: 4, title: "Second Degree Equations", summary: "Quadratic equations, discriminant, and nature of roots", formulas: ["x = (-b ± √(b²-4ac)) / 2a", "Discriminant = b² - 4ac"], keyPoints: ["Nature of roots", "Sum and product of roots", "Factorization method"], completed: false, progress: 45, bookmarked: true, oneMarkQuestions: 14, shortNotes: 7 },
      { id: 5, title: "Trigonometry", summary: "Trigonometric ratios, identities, and heights & distances", formulas: ["sin²θ + cos²θ = 1", "tanθ = sinθ/cosθ"], keyPoints: ["Standard angles", "Trigonometric identities", "Heights and distances"], completed: false, progress: 30, bookmarked: false, oneMarkQuestions: 16, shortNotes: 9 },
      { id: 6, title: "Coordinates", summary: "Distance formula, section formula, and slope of a line", formulas: ["d = √((x₂-x₁)² + (y₂-y₁)²)", "m = (y₂-y₁)/(x₂-x₁)"], keyPoints: ["Midpoint formula", "Section formula", "Area of triangle"], completed: false, progress: 20, bookmarked: false, oneMarkQuestions: 11, shortNotes: 6 },
      { id: 7, title: "Tangent Lines", summary: "Construction and properties of tangent lines to circles", keyPoints: ["External tangent construction", "Length of tangent", "Tangent from external point"], completed: false, progress: 0, bookmarked: false, oneMarkQuestions: 8, shortNotes: 4 },
      { id: 8, title: "Solids", summary: "Surface area and volume of solids - cones, cylinders, spheres", formulas: ["V_cone = (1/3)πr²h", "V_sphere = (4/3)πr³", "CSA_cylinder = 2πrh"], keyPoints: ["Combined solids", "Conversion of shapes", "Real-world problems"], completed: false, progress: 0, bookmarked: false, oneMarkQuestions: 13, shortNotes: 7 },
      { id: 9, title: "Polynomials", summary: "Polynomial division, remainder theorem, and factor theorem", formulas: ["P(x) = anxn + an-1xn-1 + ... + a₀"], keyPoints: ["Degree of polynomial", "Zeros of polynomial", "Factorization"], completed: false, progress: 0, bookmarked: false, oneMarkQuestions: 10, shortNotes: 5 },
      { id: 10, title: "Statistics", summary: "Mean, median, mode and data representation", formulas: ["Mean = Σfx/Σf", "Median = L + ((N/2 - cf)/f) × h"], keyPoints: ["Grouped data", "Ogive curves", "Central tendency"], completed: false, progress: 0, bookmarked: false, oneMarkQuestions: 12, shortNotes: 6 },
    ],
    totalNotes: 86,
    totalTests: 24,
    progress: 36,
  },
  {
    id: "physics",
    name: "Physics",
    icon: Atom,
    color: "bg-violet-500",
    gradient: "from-violet-500 to-purple-600",
    description: "Mechanics, Optics, Electricity & Modern Physics for Kerala SSLC",
    chapters: [
      { id: 1, title: "Effects of Electric Current", summary: "Heating effect, magnetic effect, and electromagnetic induction", formulas: ["V = IR", "P = VI", "H = I²Rt"], keyPoints: ["Ohm's Law", "Joule's law", "Fleming's rules"], completed: true, progress: 100, bookmarked: true, oneMarkQuestions: 15, shortNotes: 8 },
      { id: 2, title: "Electromagnetic Induction", summary: "Faraday's laws, generators, and transformers", formulas: ["e = -dΦ/dt"], keyPoints: ["Faraday's law", "Lenz's law", "AC generator"], completed: true, progress: 100, bookmarked: false, oneMarkQuestions: 12, shortNotes: 6 },
      { id: 3, title: "Reflection of Light", summary: "Laws of reflection, plane mirrors, and spherical mirrors", formulas: ["1/f = 1/v + 1/u", "m = -v/u"], keyPoints: ["Mirror formula", "Magnification", "Image formation"], completed: false, progress: 70, bookmarked: false, oneMarkQuestions: 14, shortNotes: 7 },
      { id: 4, title: "Refraction of Light", summary: "Snell's law, total internal reflection, and lenses", formulas: ["n = sin i / sin r", "1/f = 1/v - 1/u"], keyPoints: ["Refractive index", "Critical angle", "Lens formula"], completed: false, progress: 50, bookmarked: true, oneMarkQuestions: 16, shortNotes: 8 },
      { id: 5, title: "Spectrum of Light", summary: "Dispersion, scattering, and electromagnetic spectrum", keyPoints: ["VIBGYOR", "Scattering of light", "Rainbow formation"], completed: false, progress: 25, bookmarked: false, oneMarkQuestions: 10, shortNotes: 5 },
      { id: 6, title: "Motion and Force", summary: "Newton's laws, momentum, and equations of motion", formulas: ["F = ma", "v = u + at", "s = ut + ½at²"], keyPoints: ["Three laws of motion", "Conservation of momentum", "Free fall"], completed: false, progress: 15, bookmarked: false, oneMarkQuestions: 18, shortNotes: 9 },
      { id: 7, title: "Wave Motion", summary: "Types of waves, characteristics, and sound waves", formulas: ["v = fλ", "v = 332 + 0.6t"], keyPoints: ["Transverse vs longitudinal", "Frequency and wavelength", "Speed of sound"], completed: false, progress: 0, bookmarked: false, oneMarkQuestions: 11, shortNotes: 6 },
      { id: 8, title: "Heat", summary: "Specific heat capacity, latent heat, and thermal expansion", formulas: ["Q = mcΔT", "Q = mL"], keyPoints: ["Calorimetry", "Change of state", "Anomalous expansion"], completed: false, progress: 0, bookmarked: false, oneMarkQuestions: 13, shortNotes: 7 },
    ],
    totalNotes: 72,
    totalTests: 20,
    progress: 45,
  },
  {
    id: "chemistry",
    name: "Chemistry",
    icon: FlaskConical,
    color: "bg-emerald-500",
    gradient: "from-emerald-500 to-teal-600",
    description: "Periodic Table, Chemical Reactions & Organic Chemistry for Kerala SSLC",
    chapters: [
      { id: 1, title: "Periodic Table and Electronic Configuration", summary: "Modern periodic law, groups, periods, and trends", keyPoints: ["Atomic number", "Valency", "Metallic character"], completed: true, progress: 100, bookmarked: false, oneMarkQuestions: 14, shortNotes: 7 },
      { id: 2, title: "Gas Laws and Mole Concept", summary: "Boyle's law, Charles' law, and molar mass", formulas: ["PV = nRT", "Moles = Mass/Molar mass"], keyPoints: ["Avogadro's number", "STP conditions", "Gas laws"], completed: true, progress: 100, bookmarked: true, oneMarkQuestions: 12, shortNotes: 6 },
      { id: 3, title: "Acids, Bases and Salts", summary: "pH scale, neutralization, and salt formation", formulas: ["pH = -log[H⁺]"], keyPoints: ["Indicators", "Strong vs weak acids", "Buffer solutions"], completed: false, progress: 55, bookmarked: false, oneMarkQuestions: 15, shortNotes: 8 },
      { id: 4, title: "Chemical Reactions", summary: "Types of reactions, balancing equations", keyPoints: ["Combination", "Decomposition", "Displacement", "Redox reactions"], completed: false, progress: 40, bookmarked: false, oneMarkQuestions: 16, shortNotes: 8 },
      { id: 5, title: "Metals and Non-metals", summary: "Properties, reactivity series, and extraction", keyPoints: ["Physical properties", "Chemical properties", "Reactivity series"], completed: false, progress: 20, bookmarked: false, oneMarkQuestions: 13, shortNotes: 7 },
      { id: 6, title: "Carbon Compounds", summary: "Hydrocarbons, functional groups, and nomenclature", keyPoints: ["IUPAC naming", "Homologous series", "Isomerism"], completed: false, progress: 10, bookmarked: false, oneMarkQuestions: 14, shortNotes: 7 },
      { id: 7, title: "Chemistry in Everyday Life", summary: "Soaps, detergents, polymers, and medicines", keyPoints: ["Saponification", "Polymers", "Drug types"], completed: false, progress: 0, bookmarked: false, oneMarkQuestions: 10, shortNotes: 5 },
    ],
    totalNotes: 64,
    totalTests: 18,
    progress: 46,
  },
  {
    id: "biology",
    name: "Biology",
    icon: Leaf,
    color: "bg-green-500",
    gradient: "from-green-500 to-lime-600",
    description: "Life Processes, Genetics, Ecology & Human Physiology for Kerala SSLC",
    chapters: [
      { id: 1, title: "Sensations and Responses", summary: "Nervous system, reflex action, and sense organs", keyPoints: ["Neuron structure", "Reflex arc", "Brain parts"], completed: true, progress: 100, bookmarked: false, oneMarkQuestions: 16, shortNotes: 8 },
      { id: 2, title: "Windows of Knowledge", summary: "Eye structure, vision defects, and ear structure", keyPoints: ["Eye anatomy", "Myopia and hypermetropia", "Hearing mechanism"], completed: true, progress: 100, bookmarked: true, oneMarkQuestions: 14, shortNotes: 7 },
      { id: 3, title: "Chemical Messages", summary: "Endocrine glands and hormones", keyPoints: ["Pituitary gland", "Thyroid", "Insulin", "Adrenaline"], completed: false, progress: 60, bookmarked: false, oneMarkQuestions: 13, shortNotes: 7 },
      { id: 4, title: "Keeping Diseases Away", summary: "Immunity, vaccination, and communicable diseases", keyPoints: ["Types of immunity", "Vaccination", "Pathogen types"], completed: false, progress: 35, bookmarked: false, oneMarkQuestions: 15, shortNotes: 7 },
      { id: 5, title: "Genetics", summary: "Mendel's laws, DNA structure, and inheritance", keyPoints: ["Dominant and recessive", "Genotype & phenotype", "DNA structure"], completed: false, progress: 25, bookmarked: true, oneMarkQuestions: 18, shortNotes: 9 },
      { id: 6, title: "Reproduction", summary: "Sexual and asexual reproduction in plants and animals", keyPoints: ["Flower structure", "Pollination", "Fertilization"], completed: false, progress: 10, bookmarked: false, oneMarkQuestions: 14, shortNotes: 7 },
      { id: 7, title: "Ecology and Environment", summary: "Ecosystem, food chains, and environmental conservation", keyPoints: ["Biotic & abiotic factors", "Food web", "Biodiversity"], completed: false, progress: 0, bookmarked: false, oneMarkQuestions: 12, shortNotes: 6 },
      { id: 8, title: "Circulatory System", summary: "Heart, blood vessels, and blood groups", keyPoints: ["Heart chambers", "Blood types", "Blood pressure"], completed: false, progress: 0, bookmarked: false, oneMarkQuestions: 15, shortNotes: 8 },
    ],
    totalNotes: 78,
    totalTests: 22,
    progress: 41,
  },
  {
    id: "english",
    name: "English",
    icon: BookOpen,
    color: "bg-amber-500",
    gradient: "from-amber-500 to-orange-500",
    description: "Prose, Poetry, Grammar & Writing Skills for Kerala SSLC",
    chapters: [
      { id: 1, title: "His First Flight", summary: "Story of a young seagull overcoming fear", keyPoints: ["Theme of courage", "Character analysis", "Vocabulary"], completed: true, progress: 100, bookmarked: false, oneMarkQuestions: 12, shortNotes: 6 },
      { id: 2, title: "The Danger of a Single Story", summary: "Chimamanda Adichie's perspectives on stereotypes", keyPoints: ["Main theme", "Author's message", "Critical thinking"], completed: false, progress: 70, bookmarked: true, oneMarkQuestions: 10, shortNotes: 5 },
      { id: 3, title: "Grammar - Tenses", summary: "All tenses with usage and exercises", keyPoints: ["Simple tenses", "Continuous tenses", "Perfect tenses"], completed: false, progress: 50, bookmarked: false, oneMarkQuestions: 20, shortNotes: 10 },
      { id: 4, title: "Letter Writing", summary: "Formal and informal letter formats", keyPoints: ["Format", "Tone", "Common topics"], completed: false, progress: 30, bookmarked: false, oneMarkQuestions: 5, shortNotes: 8 },
      { id: 5, title: "Poetry Analysis", summary: "Poems from Kerala SSLC English syllabus", keyPoints: ["Figures of speech", "Theme", "Rhyme scheme"], completed: false, progress: 15, bookmarked: false, oneMarkQuestions: 14, shortNotes: 7 },
      { id: 6, title: "Comprehension & Writing", summary: "Reading comprehension and essay writing", keyPoints: ["Summarization", "Main idea", "Essay structure"], completed: false, progress: 0, bookmarked: false, oneMarkQuestions: 8, shortNotes: 6 },
    ],
    totalNotes: 56,
    totalTests: 16,
    progress: 44,
  },
  {
    id: "malayalam",
    name: "Malayalam",
    icon: Languages,
    color: "bg-rose-500",
    gradient: "from-rose-500 to-pink-600",
    description: "കേരള SSLC മലയാളം - Prose, Poetry & Grammar",
    chapters: [
      { id: 1, title: "ജീവിതനൗക (Jeevithanouka)", summary: "Life lessons through poetic narrative", keyPoints: ["Theme of life journey", "Literary devices", "Vocabulary"], completed: true, progress: 100, bookmarked: false, oneMarkQuestions: 12, shortNotes: 6 },
      { id: 2, title: "ഗദ്യഭാഗങ്ങൾ (Prose)", summary: "Prose sections from the Kerala SSLC syllabus", keyPoints: ["Character analysis", "Plot summary", "Message"], completed: false, progress: 60, bookmarked: true, oneMarkQuestions: 14, shortNotes: 7 },
      { id: 3, title: "പദ്യഭാഗങ്ങൾ (Poetry)", summary: "Poems prescribed in Kerala SSLC Malayalam", keyPoints: ["Figures of speech", "Rhyme", "Meter"], completed: false, progress: 40, bookmarked: false, oneMarkQuestions: 12, shortNotes: 6 },
      { id: 4, title: "വ്യാകരണം (Grammar)", summary: "Malayalam grammar rules and exercises", keyPoints: ["Sandhis", "Samasam", "Vibhakti"], completed: false, progress: 25, bookmarked: false, oneMarkQuestions: 18, shortNotes: 9 },
      { id: 5, title: "കത്തെഴുത്ത് (Letter Writing)", summary: "Formal and informal letter writing in Malayalam", keyPoints: ["Format", "Formal tone", "Official letters"], completed: false, progress: 0, bookmarked: false, oneMarkQuestions: 5, shortNotes: 5 },
    ],
    totalNotes: 48,
    totalTests: 14,
    progress: 45,
  },
  {
    id: "social-science",
    name: "Social Science",
    icon: Globe,
    color: "bg-cyan-500",
    gradient: "from-cyan-500 to-sky-600",
    description: "History, Geography, Civics & Economics for Kerala SSLC",
    chapters: [
      { id: 1, title: "Revolutions that Influenced the World", summary: "French Revolution, Russian Revolution and their impact", keyPoints: ["Causes", "Key events", "Impact on world"], completed: true, progress: 100, bookmarked: true, oneMarkQuestions: 16, shortNotes: 8 },
      { id: 2, title: "Indian National Movement", summary: "Freedom struggle and key personalities", keyPoints: ["Gandhian era", "Quit India", "INA"], completed: false, progress: 75, bookmarked: true, oneMarkQuestions: 18, shortNotes: 9 },
      { id: 3, title: "Kerala - Towards Modernity", summary: "Social reform movements in Kerala", keyPoints: ["Sree Narayana Guru", "Ayyankali", "Temple Entry"], completed: false, progress: 55, bookmarked: false, oneMarkQuestions: 14, shortNotes: 7 },
      { id: 4, title: "Geography - Atmosphere & Weather", summary: "Atmospheric layers, weather elements, and climate", keyPoints: ["Layers of atmosphere", "Pressure belts", "Wind systems"], completed: false, progress: 30, bookmarked: false, oneMarkQuestions: 15, shortNotes: 8 },
      { id: 5, title: "Civic Life", summary: "Indian Constitution, fundamental rights, and governance", keyPoints: ["Preamble", "Fundamental rights", "Parliament"], completed: false, progress: 15, bookmarked: false, oneMarkQuestions: 14, shortNotes: 7 },
      { id: 6, title: "Economic Development", summary: "Indian economy, sectors, and development indicators", keyPoints: ["GDP", "Sectors of economy", "Human development"], completed: false, progress: 0, bookmarked: false, oneMarkQuestions: 12, shortNotes: 6 },
      { id: 7, title: "Map Reading", summary: "Map skills, scale, and Indian geography", keyPoints: ["Latitudes", "Longitudes", "Indian states"], completed: false, progress: 0, bookmarked: false, oneMarkQuestions: 10, shortNotes: 5 },
    ],
    totalNotes: 68,
    totalTests: 18,
    progress: 39,
  },
  {
    id: "information-technology",
    name: "Information Technology",
    icon: Monitor,
    color: "bg-indigo-500",
    gradient: "from-indigo-500 to-blue-600",
    description: "Web Development, Database & Programming for Kerala SSLC",
    chapters: [
      { id: 1, title: "Web Designing - HTML", summary: "HTML tags, attributes, and page structure", keyPoints: ["Basic tags", "Tables", "Forms", "Lists"], completed: true, progress: 100, bookmarked: false, oneMarkQuestions: 15, shortNotes: 8 },
      { id: 2, title: "CSS Styling", summary: "Cascading Style Sheets and web page design", keyPoints: ["Selectors", "Properties", "Box model"], completed: true, progress: 100, bookmarked: false, oneMarkQuestions: 12, shortNotes: 6 },
      { id: 3, title: "JavaScript Basics", summary: "Variables, functions, and DOM manipulation", keyPoints: ["Variables", "Loops", "Events"], completed: false, progress: 50, bookmarked: true, oneMarkQuestions: 14, shortNotes: 7 },
      { id: 4, title: "Database Management", summary: "SQL queries, tables, and data management", formulas: ["SELECT * FROM table", "INSERT INTO table VALUES(...)"], keyPoints: ["DDL commands", "DML commands", "Joins"], completed: false, progress: 30, bookmarked: false, oneMarkQuestions: 16, shortNotes: 8 },
      { id: 5, title: "Python Programming", summary: "Python basics, data types, and control structures", keyPoints: ["Variables", "Loops", "Functions", "Lists"], completed: false, progress: 10, bookmarked: false, oneMarkQuestions: 14, shortNotes: 7 },
      { id: 6, title: "Cyber Security", summary: "Internet safety, ethical hacking awareness, and cyber laws", keyPoints: ["Malware types", "Safe browsing", "IT Act"], completed: false, progress: 0, bookmarked: false, oneMarkQuestions: 10, shortNotes: 5 },
    ],
    totalNotes: 52,
    totalTests: 15,
    progress: 48,
  },
];

export const questionPapers: QuestionPaper[] = [
  { id: "maths-2025", year: 2025, subject: "Mathematics", totalMarks: 80, pages: 8, difficulty: "Medium", hasAnswerKey: true, downloadUrl: "#", repeatedTopics: ["Arithmetic Sequences", "Trigonometry", "Circles"] },
  { id: "physics-2025", year: 2025, subject: "Physics", totalMarks: 80, pages: 7, difficulty: "Medium", hasAnswerKey: true, downloadUrl: "#", repeatedTopics: ["Optics", "Electricity", "Newton's Laws"] },
  { id: "chemistry-2025", year: 2025, subject: "Chemistry", totalMarks: 80, pages: 7, difficulty: "Hard", hasAnswerKey: true, downloadUrl: "#", repeatedTopics: ["Periodic Table", "Carbon Compounds", "pH Scale"] },
  { id: "biology-2025", year: 2025, subject: "Biology", totalMarks: 80, pages: 8, difficulty: "Medium", hasAnswerKey: true, downloadUrl: "#", repeatedTopics: ["Genetics", "Nervous System", "Reproduction"] },
  { id: "english-2025", year: 2025, subject: "English", totalMarks: 80, pages: 10, difficulty: "Easy", hasAnswerKey: true, downloadUrl: "#", repeatedTopics: ["Comprehension", "Grammar", "Writing"] },
  { id: "malayalam-2025", year: 2025, subject: "Malayalam", totalMarks: 80, pages: 9, difficulty: "Medium", hasAnswerKey: true, downloadUrl: "#", repeatedTopics: ["Grammar", "Prose", "Poetry"] },
  { id: "social-2025", year: 2025, subject: "Social Science", totalMarks: 80, pages: 9, difficulty: "Medium", hasAnswerKey: true, downloadUrl: "#", repeatedTopics: ["Indian Freedom Movement", "Geography", "Civics"] },
  { id: "it-2025", year: 2025, subject: "Information Technology", totalMarks: 40, pages: 5, difficulty: "Easy", hasAnswerKey: true, downloadUrl: "#", repeatedTopics: ["HTML", "SQL", "Python"] },
  
  { id: "maths-2024", year: 2024, subject: "Mathematics", totalMarks: 80, pages: 8, difficulty: "Hard", hasAnswerKey: true, downloadUrl: "#", repeatedTopics: ["Second Degree Equations", "Statistics", "Solids"] },
  { id: "physics-2024", year: 2024, subject: "Physics", totalMarks: 80, pages: 7, difficulty: "Medium", hasAnswerKey: true, downloadUrl: "#", repeatedTopics: ["Heat", "Wave Motion", "Refraction"] },
  { id: "chemistry-2024", year: 2024, subject: "Chemistry", totalMarks: 80, pages: 7, difficulty: "Medium", hasAnswerKey: true, downloadUrl: "#", repeatedTopics: ["Gas Laws", "Acids and Bases", "Metals"] },
  { id: "biology-2024", year: 2024, subject: "Biology", totalMarks: 80, pages: 8, difficulty: "Easy", hasAnswerKey: true, downloadUrl: "#", repeatedTopics: ["Ecology", "Circulatory System", "Hormones"] },
  { id: "english-2024", year: 2024, subject: "English", totalMarks: 80, pages: 10, difficulty: "Medium", hasAnswerKey: true, downloadUrl: "#", repeatedTopics: ["Tenses", "Comprehension", "Letter Writing"] },
  { id: "malayalam-2024", year: 2024, subject: "Malayalam", totalMarks: 80, pages: 9, difficulty: "Medium", hasAnswerKey: true, downloadUrl: "#", repeatedTopics: ["Sandhis", "Prose", "Letter Writing"] },
  { id: "social-2024", year: 2024, subject: "Social Science", totalMarks: 80, pages: 9, difficulty: "Hard", hasAnswerKey: true, downloadUrl: "#", repeatedTopics: ["Revolutions", "Kerala History", "Economics"] },
  { id: "it-2024", year: 2024, subject: "Information Technology", totalMarks: 40, pages: 5, difficulty: "Easy", hasAnswerKey: true, downloadUrl: "#", repeatedTopics: ["CSS", "JavaScript", "Cyber Security"] },
  
  { id: "maths-2023", year: 2023, subject: "Mathematics", totalMarks: 80, pages: 8, difficulty: "Medium", hasAnswerKey: true, downloadUrl: "#", repeatedTopics: ["Polynomials", "Coordinates", "Trigonometry"] },
  { id: "physics-2023", year: 2023, subject: "Physics", totalMarks: 80, pages: 7, difficulty: "Hard", hasAnswerKey: true, downloadUrl: "#", repeatedTopics: ["Electromagnetic Induction", "Motion", "Light"] },
  { id: "chemistry-2023", year: 2023, subject: "Chemistry", totalMarks: 80, pages: 7, difficulty: "Medium", hasAnswerKey: true, downloadUrl: "#", repeatedTopics: ["Chemical Reactions", "Carbon Compounds", "pH"] },
  { id: "biology-2023", year: 2023, subject: "Biology", totalMarks: 80, pages: 8, difficulty: "Medium", hasAnswerKey: true, downloadUrl: "#", repeatedTopics: ["Genetics", "Disease Prevention", "Eye"] },
  { id: "english-2023", year: 2023, subject: "English", totalMarks: 80, pages: 10, difficulty: "Easy", hasAnswerKey: true, downloadUrl: "#", repeatedTopics: ["Poetry", "Grammar", "Essay Writing"] },
  { id: "social-2023", year: 2023, subject: "Social Science", totalMarks: 80, pages: 9, difficulty: "Medium", hasAnswerKey: true, downloadUrl: "#", repeatedTopics: ["Map Reading", "Constitution", "French Revolution"] },
];

export const mockTests: MockTest[] = [
  { id: "mt-1", title: "Mathematics Full Syllabus Test", subject: "Mathematics", type: "full", totalQuestions: 40, duration: 90, negativeMarking: false, difficulty: "Medium", attempts: 2345, bestScore: 78, isLive: true },
  { id: "mt-2", title: "Physics - Optics & Electricity", subject: "Physics", type: "subject", totalQuestions: 25, duration: 45, negativeMarking: true, difficulty: "Hard", attempts: 1890, bestScore: 65, isLive: true },
  { id: "mt-3", title: "Chemistry Chapter Test - Periodic Table", subject: "Chemistry", type: "chapter", totalQuestions: 15, duration: 20, negativeMarking: false, difficulty: "Easy", attempts: 3120, bestScore: 92, isLive: false },
  { id: "mt-4", title: "Biology - Human Body Systems", subject: "Biology", type: "subject", totalQuestions: 30, duration: 60, negativeMarking: false, difficulty: "Medium", attempts: 1567, bestScore: 71, isLive: true },
  { id: "mt-5", title: "Daily Quiz - Mixed Subjects", subject: "All", type: "daily", totalQuestions: 10, duration: 10, negativeMarking: false, difficulty: "Easy", attempts: 5430, bestScore: 100, isLive: true },
  { id: "mt-6", title: "SSLC Full Model Exam 2025", subject: "All", type: "full", totalQuestions: 50, duration: 120, negativeMarking: true, difficulty: "Hard", attempts: 8920, bestScore: 82, isLive: true },
  { id: "mt-7", title: "English Grammar Sprint", subject: "English", type: "chapter", totalQuestions: 20, duration: 30, negativeMarking: false, difficulty: "Medium", attempts: 2100, bestScore: null, isLive: false },
  { id: "mt-8", title: "Social Science - Indian History", subject: "Social Science", type: "subject", totalQuestions: 25, duration: 40, negativeMarking: false, difficulty: "Medium", attempts: 1340, bestScore: null, isLive: false },
  { id: "mt-9", title: "IT Practical Exam Prep", subject: "Information Technology", type: "full", totalQuestions: 20, duration: 30, negativeMarking: false, difficulty: "Easy", attempts: 980, bestScore: 95, isLive: true },
  { id: "mt-10", title: "Mathematics - Trigonometry Master", subject: "Mathematics", type: "chapter", totalQuestions: 15, duration: 25, negativeMarking: true, difficulty: "Hard", attempts: 1760, bestScore: 67, isLive: false },
];

export const sampleQuestions: Question[] = [
  { id: 1, text: "If the first term of an arithmetic sequence is 5 and its common difference is 3, what is the 10th term?", options: ["32", "35", "30", "27"], correctAnswer: 0, explanation: "a₁₀ = a₁ + (n-1)d = 5 + (10-1)×3 = 5 + 27 = 32", difficulty: "Easy", topic: "Arithmetic Sequences" },
  { id: 2, text: "The tangent at any point of a circle is _____ to the radius through the point of contact.", options: ["Parallel", "Perpendicular", "Equal", "None of these"], correctAnswer: 1, explanation: "A fundamental property of circles: the tangent at any point is always perpendicular to the radius at that point.", difficulty: "Easy", topic: "Circles" },
  { id: 3, text: "A coin is tossed twice. What is the probability of getting at least one head?", options: ["1/4", "1/2", "3/4", "1"], correctAnswer: 2, explanation: "P(at least one head) = 1 - P(no head) = 1 - (1/2 × 1/2) = 1 - 1/4 = 3/4", difficulty: "Medium", topic: "Probability" },
  { id: 4, text: "The resistance of an electric circuit is doubled. If voltage remains the same, the current flowing through the circuit will:", options: ["Double", "Halve", "Remain same", "Quadruple"], correctAnswer: 1, explanation: "By Ohm's law V = IR, if R doubles and V is constant, I = V/2R, so current halves.", difficulty: "Medium", topic: "Electricity" },
  { id: 5, text: "Which of the following is NOT a greenhouse gas?", options: ["CO₂", "CH₄", "N₂", "N₂O"], correctAnswer: 2, explanation: "Nitrogen (N₂) is not a greenhouse gas. CO₂, CH₄, and N₂O are all greenhouse gases that contribute to global warming.", difficulty: "Easy", topic: "Environment" },
  { id: 6, text: "The pH of a neutral solution at 25°C is:", options: ["0", "7", "14", "1"], correctAnswer: 1, explanation: "A neutral solution has equal concentrations of H⁺ and OH⁻ ions, giving a pH of 7 at 25°C.", difficulty: "Easy", topic: "Acids and Bases" },
  { id: 7, text: "In a right triangle, sin 30° equals:", options: ["1/2", "√3/2", "1/√2", "1"], correctAnswer: 0, explanation: "sin 30° = 1/2 is a standard trigonometric value that should be memorized.", difficulty: "Easy", topic: "Trigonometry" },
  { id: 8, text: "The image formed by a concave mirror when the object is between the pole and the focus is:", options: ["Real and inverted", "Virtual and erect", "Real and erect", "Virtual and inverted"], correctAnswer: 1, explanation: "When object is between pole and focus of a concave mirror, the image formed is virtual, erect, and magnified.", difficulty: "Medium", topic: "Optics" },
  { id: 9, text: "Which SQL command is used to retrieve data from a database?", options: ["INSERT", "UPDATE", "SELECT", "DELETE"], correctAnswer: 2, explanation: "SELECT is the SQL command used for retrieving/querying data from database tables.", difficulty: "Easy", topic: "SQL" },
  { id: 10, text: "The Quit India Movement was launched in:", options: ["1940", "1941", "1942", "1943"], correctAnswer: 2, explanation: "The Quit India Movement was launched on August 8, 1942, by Mahatma Gandhi at the Bombay session of the All India Congress Committee.", difficulty: "Medium", topic: "History" },
];

export const leaderboardData = [
  { rank: 1, name: "Arun Kumar", avatar: "AK", score: 9850, streak: 45, badge: "🏆" },
  { rank: 2, name: "Sneha Nair", avatar: "SN", score: 9720, streak: 38, badge: "🥈" },
  { rank: 3, name: "Vishnu R", avatar: "VR", score: 9580, streak: 42, badge: "🥉" },
  { rank: 4, name: "Lakshmi Devi", avatar: "LD", score: 9410, streak: 31, badge: "⭐" },
  { rank: 5, name: "Rahul Menon", avatar: "RM", score: 9280, streak: 27, badge: "⭐" },
  { rank: 6, name: "Ananya S", avatar: "AS", score: 9150, streak: 35, badge: "⭐" },
  { rank: 7, name: "Karthik M", avatar: "KM", score: 9020, streak: 22, badge: "⭐" },
  { rank: 8, name: "Devika P", avatar: "DP", score: 8890, streak: 29, badge: "⭐" },
  { rank: 9, name: "Nikhil S", avatar: "NS", score: 8760, streak: 25, badge: "⭐" },
  { rank: 10, name: "Priya George", avatar: "PG", score: 8630, streak: 20, badge: "⭐" },
];

export const dashboardStats = {
  studyStreak: 12,
  totalStudyHours: 156,
  completedChapters: 18,
  totalChapters: 59,
  xpPoints: 4250,
  currentLevel: 15,
  nextLevelXP: 5000,
  rank: 42,
  totalStudents: 12500,
  recentScores: [
    { test: "Maths Full Test", score: 78, total: 100, date: "2025-05-28" },
    { test: "Physics Optics", score: 85, total: 100, date: "2025-05-27" },
    { test: "Biology Practice", score: 92, total: 100, date: "2025-05-26" },
    { test: "Chemistry Quiz", score: 65, total: 100, date: "2025-05-25" },
    { test: "English Grammar", score: 88, total: 100, date: "2025-05-24" },
  ],
  weeklyStudyData: [
    { day: "Mon", hours: 3.5 },
    { day: "Tue", hours: 2.8 },
    { day: "Wed", hours: 4.2 },
    { day: "Thu", hours: 3.1 },
    { day: "Fri", hours: 5.0 },
    { day: "Sat", hours: 6.5 },
    { day: "Sun", hours: 4.8 },
  ],
  subjectProgress: [
    { subject: "Mathematics", progress: 36, color: "#3B82F6" },
    { subject: "Physics", progress: 45, color: "#8B5CF6" },
    { subject: "Chemistry", progress: 46, color: "#10B981" },
    { subject: "Biology", progress: 41, color: "#22C55E" },
    { subject: "English", progress: 44, color: "#F59E0B" },
    { subject: "Malayalam", progress: 45, color: "#F43F5E" },
    { subject: "Social Science", progress: 39, color: "#06B6D4" },
    { subject: "IT", progress: 48, color: "#6366F1" },
  ],
  achievements: [
    { id: 1, title: "First Step", description: "Complete your first chapter", icon: "🎯", unlocked: true },
    { id: 2, title: "Week Warrior", description: "7-day study streak", icon: "🔥", unlocked: true },
    { id: 3, title: "Science Star", description: "Score 90%+ in any science test", icon: "⭐", unlocked: true },
    { id: 4, title: "Perfect Score", description: "Get 100% in any test", icon: "💯", unlocked: false },
    { id: 5, title: "Month Master", description: "30-day study streak", icon: "👑", unlocked: false },
    { id: 6, title: "All Rounder", description: "Complete chapters in all subjects", icon: "🌟", unlocked: false },
  ],
  upcomingExams: [
    { name: "SSLC Mathematics", date: "2026-03-10", daysLeft: 285 },
    { name: "SSLC Physics", date: "2026-03-12", daysLeft: 287 },
    { name: "SSLC Chemistry", date: "2026-03-14", daysLeft: 289 },
    { name: "SSLC Biology", date: "2026-03-16", daysLeft: 291 },
  ],
  dailyGoals: [
    { id: 1, title: "Study 3 hours", current: 2.5, target: 3, unit: "hrs", completed: false },
    { id: 2, title: "Complete 1 chapter", current: 1, target: 1, unit: "ch", completed: true },
    { id: 3, title: "Take 1 mock test", current: 0, target: 1, unit: "test", completed: false },
    { id: 4, title: "Review 20 questions", current: 14, target: 20, unit: "qs", completed: false },
  ],
};
