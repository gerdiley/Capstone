import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage!: string;
  errorStatus!: number
  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  // ON SUBMIT

  onSubmit(f: NgForm){

    // get form values
    const username = f.value.username;
    const password = f.value.password;

      // subscribe
      this.authSrv.login({username: username, password: password}).subscribe(data=> {
        this.authSrv.createUser(data.expirationDate, data.roles, data.token, data.type, data.username);
        localStorage.setItem("user", JSON.stringify(this.authSrv.user))
        localStorage.setItem('username', this.authSrv.user.username)
        this.authSrv.username.next(localStorage.getItem('username'))
        this.router.navigate(['home']);
      },
      err => {
        this.errorStatus = err.status;
        console.log(this.errorStatus);
      }
      )


  }


}
