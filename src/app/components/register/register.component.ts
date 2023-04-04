import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authSrv: AuthService, private router:Router ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    const fullname = form.value.fullname;
    const username = form.value.username;
    const email = form.value.email;
    const password = form.value.password;

    this.authSrv.signUp({fullname: fullname, username: username, email: email, password: password}).subscribe(data => console.log(data));
    this.router.navigate(['/login/'])
  }
}
