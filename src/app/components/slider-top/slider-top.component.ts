import { Component, Input, OnInit } from '@angular/core';
import { Ad } from 'src/app/model/ad';
import { AdService } from 'src/app/service/ad.service';

@Component({
  selector: 'app-slider-top',
  templateUrl: './slider-top.component.html',
  styleUrls: ['./slider-top.component.scss']
})
export class SliderTopComponent implements OnInit {
  // topAds: Ad[] = [];

  @Input() topAds: Ad[] = [];

  constructor(private adSrv: AdService) { }

  ngOnInit(): void {
    // this.getTops();
  }


  // get tops
  // getTops(){
  //   this.adSrv.getTops().subscribe(data=>{
  //     console.log(data);
  //     this.topAds = data;
  //   })
  // }
}
