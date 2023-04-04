import { UserInterface } from "./user-interface"
import { UserProfile } from "./user-profile"

export interface Message {
  id: number,
  date: string,
  text: string,
  sender: UserProfile
  recipient: UserProfile
}
