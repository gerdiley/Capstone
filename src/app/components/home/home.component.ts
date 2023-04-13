import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ad, Page } from 'src/app/model/ad';
import { AdService } from 'src/app/service/ad.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ad: Ad[] = [];
  search!: string;
  category!: string;
  pageData!: Page
  togglePag: boolean = false;
  topAds: Ad[] = []
  pageSelector: boolean = true;
  city!: string;


  constructor(private adSrv: AdService, private datePipe: DatePipe, private router:Router, private authSrv: AuthService) { }

  ngOnInit(): void {
    this.getData(0)
    this.getTops();
  }

  getData(page: number) {
    this.adSrv.getAllPosts(page).subscribe({
      next: (data) => {
        this.pageData = data;
        console.log(data)
        this.ad = data.content;
        this.pageSelector = true;
        this.ad.forEach(a => {
          a.expirationDate = this.datePipe.transform(a.expirationDate, 'medium')!
        })
      }, error: (e) => {
        if(e.status == 401){
          this.router.navigate(['/login'])
          this.authSrv.logout();
          // localStorage.removeItem('user')
          // localStorage.removeItem('username')
        }
       }
    }


    )
  }

  getAllByCity(){
    this.pageSelector =false
    this.adSrv.getByCity(this.city).subscribe(data=>{
      this.ad = data
    }
    )
  }

  onSubmit(f: NgForm) {
    this.search = f.value.search
    console.log(f.value.search);
    this.adSrv.getByTitle(this.search).subscribe(d => this.ad = d
    )
  }

  onSubmit2(e:any) {
    this.adSrv.getByTitle(e.target.value).subscribe(d => {this.ad =d
    console.log(this.ad);
    }
    )
  }

  getByCategory(category: string) {
    this.adSrv.getByCategory(category).subscribe(data => {
      console.log(data);
      this.ad = data
    });
    this.pageSelector = false;
  }

  getByCategoryAndCity(category: string, city: string) {
    this.pageSelector =false
    this.ad = [];
    this.adSrv.getByCategory(category).subscribe(data => {
      // this.ad = data;
     data.forEach(e=>{
      if(e.user.address.city == city){
        this.ad.push(e)
      }
    })
    });


    this.pageSelector = false;
  }

  addCity(e: any){
    this.city = e.target.value
    console.log(this.city);

  }


  getTops(){
    this.adSrv.getTops().subscribe(data=>{
      console.log(data);
      this.topAds = data;
    })
  }


}
