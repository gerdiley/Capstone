import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, interval, Observable, startWith, Subscription, switchMap } from 'rxjs';
import { Notification } from 'src/app/model/notification';
import { UserProfile } from 'src/app/model/user-profile';
import { AuthService } from 'src/app/service/auth.service';
import { MessageService } from 'src/app/service/message.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  title = 'Capstone';
  user!: UserProfile;
  isAdminB: boolean = false;
  logged: boolean = false;
  loginStatus$!: Observable<boolean>;
  notifications: Notification[] = []

  username!: string;
  username$ = this.authSrv.username$

  timeInterval!: Subscription

  notificationObs$ = this.messageSrv.notificationSub.asObservable();

  constructor(private userSrv: UserService, private authSrv: AuthService, private router: Router, private messageSrv: MessageService) {
  }

  ngOnInit(): void {
    this.loginStatus$ = this.authSrv.isLoggedin.asObservable();
    this.username$ = this.authSrv.username.asObservable();
    this.username = JSON.stringify(localStorage.getItem('username'))

    this.messageSrv.notificationObs$.subscribe(data=> {
      console.log("notification data", data)
      // this.getNotification()
    }
    )

    // POLLING FOR NOTIFICATIONS
    this.timeInterval = interval(3000).pipe(
      startWith(0),
      switchMap(() => this.messageSrv.getNotification())
    ).subscribe(data => this.notifications = data)


    // CHECK IF LOGGED
    if (localStorage.getItem('user')) {
      this.authSrv.isLoggedin.next(true);
      this.getLoggedUser()
    }
  }

  // CHECK IF LOGGED
  islogged() {
    return localStorage.getItem('user');
  }

  // LOGOUT
  logout() {
    this.authSrv.logout();
  }

  // GET LOGGED USER

  getLoggedUser() {
    this.userSrv.getUser().subscribe(data => {
      this.user = data
    })
  }

  // CHECK IF ADMIN
  isAdmin() {

    this.user?.roleList.forEach(i => {
      if (i.name == "ROLE_ADMIN") {
        this.isAdminB = true;
      } else {
        null;
      }
    })
    return this.isAdminB
  }



// -------- NOTIFICATIONS --------

  getNotification(){
    this.messageSrv.getNotification().subscribe(data=>{
      console.log(data)
      this.notifications = this.messageSrv.notifications
    }
    )
  }

  readNotification(id:number){
    this.messageSrv.readMessage(id, {}).subscribe(
      data => console.log(data)
    )
  }
}
