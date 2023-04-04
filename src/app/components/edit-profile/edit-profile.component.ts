import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfile } from 'src/app/model/user-profile';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  id!: number;
  profile = {};
  address = {};
  user= {};

  path: string | undefined
  clicked = false;
  url!: string

  userDetails!: UserProfile


  constructor(private userSrv: UserService, private route: ActivatedRoute, private router: Router, private af: AngularFireStorage) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.getUserDetail();
  }

  updateProfile(f: NgForm) {

    console.log(this.path);

    if(this.path){
      this.af.upload("/file" + Math.random(), this.path).then(d => {
        d.ref.getDownloadURL().then(data => {
          this.url = data;
          console.log(this.url);
          this.clicked = true;
          const img = this.url

          const username = f.value.username
          const city = f.value.city
          const postalCode = f.value.postalCode
          const street = f.value.street
          const email = f.value.email

          this.address = {
            city: city,
            postalCode: postalCode,
            street: street
          }
          this.profile = {
            img: img
          }

          this.user = {
            profile: this.profile,
            address: this.address,
            username: username,
            email: email
          }

          this.userSrv.editProfile(this.id, this.user).subscribe(data => console.log(data))
          this.router.navigate(['/home'])
        })
      })
    } else{
      this.clicked = true;
          const img = ""
          const username = f.value.username
          const city = f.value.city
          const postalCode = f.value.postalCode
          const street = f.value.street
          const email = f.value.email

          this.address = {
            city: city,
            postalCode: postalCode,
            street: street
          }
          this.profile = {
            img: img
          }

          this.user = {
            profile: this.profile,
            address: this.address,
            username: username,
            email: email
          }

          this.userSrv.editProfile(this.id, this.user).subscribe(data => console.log(data))
          this.router.navigate(['/home'])
    }

  }

  getUserDetail(){
    this.userSrv.getUser().subscribe(data=>{
      this.userDetails = data;
      console.log(data);

    })
  }

  upload($event: any) {
    this.path = $event.target.files[0]
  }

}
