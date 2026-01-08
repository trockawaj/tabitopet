
export interface Spot {
  id: string;
  name: string;
  category: 'accommodation' | 'sightseeing' | 'restaurant';
  description: string;
  imageUrl: string;
  petFriendly: boolean;
  location: {
    lat: number;
    lng: number;
  };
  link?: string;
}

export interface GroundingSource {
  title?: string;
  uri?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  sources?: GroundingSource[];
}
