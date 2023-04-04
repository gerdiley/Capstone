import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../model/user';
import { UserInterface } from '../model/user-interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = "http://localhost:8081/";
  user!: User;


  // user properties

  username = new BehaviorSubject<string | null>(localStorage.getItem('username'))
  username$ = this.username.asObservable();

  isLoggedin = new BehaviorSubject<boolean>(false);
  isLoggedin$ = this.isLoggedin.asObservable()

  toggle = this.isLoggedin.asObservable();


  constructor(private http: HttpClient, private router: Router) {
  }

  signUp(user: {}){
    return this.http.post(this.url + "auth/signup", user)
  }

  login(user: {}){
    return this.http.post<UserInterface>(this.url + "auth/login", user).pipe(tap(data=>{
      this.isLoggedin.next(true)
    }));
  }

  logout(){
    this.isLoggedin.next(false);
    localStorage.removeItem('user')
    localStorage.removeItem('username')
    this.router.navigate(['/login'])
    this.isLoggedin.next(false)
  }

  createUser(expirationDate: Date, roles: string[], token: string, type: string, username: string) {
    this.user = new User(expirationDate, roles, token, type, username);
  }
}
