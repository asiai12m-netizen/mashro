
export interface Message {
  role: 'user' | 'model';
  text: string;
  image?: string; // Base64 image data
}

export interface FeeItem {
  stage: string;
  price: string;
  details: string;
}
