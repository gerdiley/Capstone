import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdService } from 'src/app/service/ad.service';

@Component({
  selector: 'app-add-ads',
  templateUrl: './add-ads.component.html',
  styleUrls: ['./add-ads.component.scss']
})
export class AddAdsComponent implements OnInit {
  path: string | undefined
  clicked = false;
  url!: string
  data: any;
  constructor(private adSrv: AdService, private router: Router, private af: AngularFireStorage) { }

  ngOnInit(): void {
    this.clicked = false;
  }

  onSubmit(f: NgForm) {


    console.log(this.path);
    this.af.upload("/file" + Math.random(), this.path).then(d => {
      d.ref.getDownloadURL().then(data => {
        this.url = data;
        console.log(this.url)

        this.clicked = true;

        const title = f.value.title
        const expDate = f.value.expDate
        const description = f.value.description
        const category = f.value.category
        // const img = f.value.image
        const img = this.url;
        this.adSrv.add({
          title: title,
          expirationDate: expDate,
          description: description,
          category: category,
          likes: 0,
          img: img
        }).subscribe(data => {console.log(data)
        this.router.navigate(['/home'])});

      })


    })
  }




  upload($event: any) {
    this.path = $event.target.files[0]
    console.log(this.path)
  }

  arrivoData($event:any){
    console.log($event);

  }
}
