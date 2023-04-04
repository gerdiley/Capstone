import { Component, OnInit } from '@angular/core';
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
  // username$!: Observable<string | null>

  username!: string;
  username$ = this.authSrv.username$

  timeInterval!: Subscription

  // notificationSub = new BehaviorSubject<Notification[]>(this.notifications);
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

    // this.timeInterval = interval(3000).pipe(
    //   startWith(0),
    //   switchMap(() => this.messageSrv.getNotification())
    // ).subscribe(data => this.notifications = data)



    if (localStorage.getItem('user')) {
      this.authSrv.isLoggedin.next(true);
    }
    if(localStorage.getItem('user')){
      this.getLoggedUser()
    }

  }

  islogged() {
    return localStorage.getItem('user');
  }

  logout() {
    this.authSrv.logout();
  }

  getLoggedUser() {
    this.userSrv.getUser().subscribe(data => {
      this.user = data
    })
  }

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
// --------Notifiche--------

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
