import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ad } from 'src/app/model/ad';
import { AdService } from 'src/app/service/ad.service';

@Component({
  selector: 'app-edit-ad',
  templateUrl: './edit-ad.component.html',
  styleUrls: ['./edit-ad.component.scss']
})
export class EditAdComponent implements OnInit {
  id!: number;
  ad = {};
  path: string | undefined;
  url: string | undefined;
  clicked = false;
  preAd!: Ad;

  constructor(private route: ActivatedRoute, private adSrv: AdService, private af: AngularFireStorage, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.getAdById();
  }

  // ON SUBMIT

  editAd(f: NgForm) {

    console.log(this.path);
    // if there is a file
    if(this.path){
      // Upload the image on firebase and get the url
      this.af.upload("/file" + Math.random(), this.path).then(d => {
        d.ref.getDownloadURL().then(data => {
          this.url = data;
          console.log(this.url);
          this.clicked = true
          //  get form values
          const title = f.value.title
          const description = f.value.description
          const img = this.url
          const category = f.value.category
          const expirationDate = f.value.expirationDate

          // subscribe
          this.ad = {
            title: title,
            description: description,
            img: img,
            // category: category,
            expirationDate: expirationDate
          }

          this.adSrv.updateAd(this.id, this.ad).subscribe(data => {console.log(data)
            this.router.navigate(['/ads', this.id])}
          )
        })
      })
      // if there is no file
    } else {
      this.clicked = true


          const title = f.value.title
          const description = f.value.description
          const img = ""
          // const category = f.value.category
          const expirationDate = f.value.expirationDate

          this.ad = {
            title: title,
            description: description,
            img: img,
            // category: category,
            expirationDate: expirationDate
          }

          this.adSrv.updateAd(this.id, this.ad).subscribe(data => {console.log(data)
            this.router.navigate(['/ads', this.id])}
          )
    }
  }
  //  GET AD BY ID

  getAdById(){
    this.adSrv.getById(this.id).subscribe(
      data=>
      this.preAd = data
    )
  }

  // ASSIGN THE UPLOADED FILE TO A VARIABLE

  upload($event: any) {
    this.path = $event.target.files[0]
    console.log(this.path)
  }


}
