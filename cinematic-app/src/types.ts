export interface PooConcept {
  name: string;
  desc: string;
}

export interface LineExplanation {
  lines: string;
  codeSnippet: string;
  text: string;
}

export interface TutorialStage {
  id: number;
  slug: string;
  title: string;
  file: string;
  category: string;
  orderBadge: string;
  analogy: string;
  pooConcepts: PooConcept[];
  whyItExists: string;
  orderReason: string;
  code: string;
  lineExplanations: LineExplanation[];
  summary: string;
}

export interface GlossaryItem {
  term: string;
  category: string;
  definition: string;
  example: string;
}
