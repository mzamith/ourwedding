export interface Recommendation {
  id: number;
  category: string;
  photoUrl: string;
  photoPublicId: string;
  title: string;
  description: string;
  address: string;
  price: number;
  mapCoordinates: string;
}
