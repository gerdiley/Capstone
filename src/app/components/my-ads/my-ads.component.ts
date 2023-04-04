import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ad } from 'src/app/model/ad';
import { AdService } from 'src/app/service/ad.service';


@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.component.html',
  styleUrls: ['./my-ads.component.scss']
})
export class MyAdsComponent implements OnInit {

  ads: Ad[] = [];
  user: any;
  constructor(private adSrv: AdService) { }

  ngOnInit(): void {
    if(localStorage.getItem('user')){
      this.user = JSON.parse(localStorage.getItem('user')|| '{}')
      console.log(this.user);
    } else {
      return
    }
    this.getAds()
  }

  getAds(){
    this.adSrv.getByUsername(this.user.username).subscribe(data=>{
      console.log(data);
      this.ads = data
    });
  }

  deleteAd(id: number){
    this.adSrv.delete(id).subscribe(data=>{
      console.log(data)
      this.getAds();
    });

  }



  }
