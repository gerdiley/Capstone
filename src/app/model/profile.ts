import { UserProfile } from "./user-profile"

export interface Profile {
  id: number
  img: string
  reviews : {
    title: string
    description: string
    stars: number
    user: UserProfile
  }
  soldItems: number
}
