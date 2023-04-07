import { Component, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/model/user-interface';
import { UserProfile } from 'src/app/model/user-profile';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private userSrv: UserService) { }

  users: UserProfile[] = []

  ngOnInit(): void {
    this.getUsers()
  }

  //  GET ALL USERS

  getUsers(){
    this.userSrv.getAllUsers().subscribe(data=>
      {
        this.users = data
        console.log(data);
      })
  }

  // SWITCH STATUS OF THE USER

  switchStatus(id: number){
    this.userSrv.switchStatus(id, {}).subscribe(data=>
      console.log(data)
      )
  }

}
