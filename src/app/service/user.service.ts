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

  getAllUsers(){
    return this.http.get<UserProfile[]>(this.url + "users")
  }

  switchStatus(id: number, user: {}){
    return this.http.put<UserProfile>(this.url + "users/" + id, user)
  }

  getUser(){
    return this.http.get<UserProfile>(this.url + "profiles/username")
  }
  getUser1(username:string){
    return this.http.get<UserProfile>(this.url + "profiles/username1?username=" + username)
  }
  getUserById(id:number){
    return this.http.get<UserProfile>(this.url + "profiles/" + id)
  }

  // PUT to edit the profile
  editProfile(id: number, user: {}){
    return this.http.put<Profile>(this.url + "profiles/edit/"+ id, user)
  }
}
