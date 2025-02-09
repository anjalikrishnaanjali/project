export interface Pet {
  id: string;
  name: string;
  type: string;
  breeds: {
    primary: string;
    secondary?: string;
    mixed: boolean;
  };
  age: string;
  gender: string;
  size: string;
  description?: string;
  photos: Array<{
    small: string;
    medium: string;
    large: string;
    full: string;
  }>;
  status: string;
  contact: {
    email: string;
    phone?: string;
    address: {
      city: string;
      state: string;
    };
  };
  url: string;
}