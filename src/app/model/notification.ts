import { Message } from "./message"
import { UserProfile } from "./user-profile"

export interface Notification {
  id:number
  title: string
  message: Message
  read: boolean
  recipient: UserProfile
}
