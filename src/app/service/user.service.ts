import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from '../model/profile';
import { UserInterface } from '../model/user-interface';
import { UserProfile } from '../model/user-profile';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = "http://localhost:8081/";
  constructor(private http: HttpClient) { }

  //  get all users
  getAllUsers(){
    return this.http.get<UserProfile[]>(this.url + "users")
  }

  // swith user status (ban)
  switchStatus(id: number, user: {}){
    return this.http.put<UserProfile>(this.url + "users/" + id, user)
  }

  // get logged user
  getUser(){
    return this.http.get<UserProfile>(this.url + "profiles/username")
  }
  // get user by username
  getUser1(username:string){
    return this.http.get<UserProfile>(this.url + "profiles/username1?username=" + username)
  }
  // get user by id
  getUserById(id:number){
    return this.http.get<UserProfile>(this.url + "profiles/" + id)
  }

  // PUT to edit the profile
  editProfile(id: number, user: {}){
    return this.http.put<Profile>(this.url + "profiles/edit/"+ id, user)
  }
}
