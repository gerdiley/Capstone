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

  constructor(private adSrv: AdService) { }

  ngOnInit(): void {
  }


  }
