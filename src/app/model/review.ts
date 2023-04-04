import { UserProfile } from "./user-profile"

export interface Review {
  title: string,
  description: string
  stars: number
  date: string
  user: UserProfile
}
