import { FileHandle } from "./file-handle";
import { Profile } from "./profile";
import { UserProfile } from "./user-profile";


export interface Ad {
  id: number
  title: string,
  description: string
  category: string
  likes: number,
  expirationDate: string
  likesList: Profile[],
  img: string
  user: UserProfile
}

export interface Content{
  content: Ad[];
}

export interface Page {
  content:          Ad[];
  totalPages:       number;
  totalElements:    number;
  last:             boolean;
  size:             number;
  number:           number;
  numberOfElements: number;
  first:            boolean;
  empty:            boolean;
}
