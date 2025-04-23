export interface DogBreed {
  id: number;
  name: string;
  temperament: string;
  life_span: string;
  weight: {
    imperial: string;
    metric: string;
  };
  height: {
    imperial: string;
    metric: string;
  };
  bred_for?: string;
  breed_group?: string;
  origin?: string;
}

export interface DogFact {
  id: number;
  fact: string;
  source: string;
}

export interface NewsletterSubscriber {
  email: string;
  firstName?: string;
  lastName?: string;
  preferences: {
    weeklyFacts: boolean;
    breedHighlights: boolean;
    trainingTips: boolean;
  };
}
