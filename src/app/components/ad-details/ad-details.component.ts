import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Ad } from 'src/app/model/ad';
import { User } from 'src/app/model/user';
import { AdService } from 'src/app/service/ad.service';

@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.scss']
})
export class AdDetailsComponent implements OnInit {

  id!: number;
  ad: Ad |undefined;
  loggedUser!: User;



  constructor(private adSrv: AdService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getDetails();
  }

  getDetails(){
    this.adSrv.getById(this.id).subscribe(data=> {
    console.log(data)
    this.ad = data}
    )
  }

  putLike(){
    this.adSrv.putLike(this.id, {}).subscribe(data=> {console.log(data)
    this.getDetails()})
  }

  deleteAd(){
    this.adSrv.delete(this.id).subscribe(data=> {console.log(data)
    this.router.navigate(['/home'])}
    )
  }

  checkLogged(){
    this.loggedUser = JSON.parse(localStorage.getItem('user')!)
    if(this.loggedUser.username == this.ad?.user.username){
      return true
    } else{
      return false
    }
  }

}
