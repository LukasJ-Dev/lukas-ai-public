declare namespace Portfolio {
  export interface ChatMessage {
    role: string;
    content: string;
    cards?: {
      title: string;
      description: string;
      images: string[];
      link: string;
    }[];
  }
}
