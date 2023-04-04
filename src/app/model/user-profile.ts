import { Profile } from "./profile"

export interface UserProfile {
  id: number
  active: boolean
  address: {
    street: string,
    city: string,
    postalCode: string
  }
  email:string
  fullname: string
  lastAccess: Date
  password: string
  profile: Profile
  registrationDate: Date
  roleList: {
    id: number
    name: string
  } []
  username: string
}
