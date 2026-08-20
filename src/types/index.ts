export interface Service {
  id: string;
  title: string;
  slug: string;
  icon: string;
  items: string[];
  image: string;
}

export interface PriceItem {
  name: string;
  price: string;
  duration?: string;
  popular?: boolean;
}

export interface PriceCategory {
  id: string;
  title: string;
  items: PriceItem[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  experience: string;
  instagram: string;
  photo: string;
  bio: string;
}

export interface GalleryItem {
  id: string;
  category: string;
  image: string;
  title: string;
  ratio?: "portrait" | "square" | "tall";
}

export interface Review {
  id: string;
  name: string;
  service: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
}

export interface Settings {
  brand: string;
  tagline: string;
  phone: string;
  phoneDisplay: string;
  instagram: string;
  instagramUrl: string;
  facebookUrl: string;
  facebookDisplay: string;
  city: string;
  address: string;
  mapEmbedUrl: string;
  mapUrl: string;
  workingHours: string;
  rating: number;
  reviewsCount: number;
}
