import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ad } from 'src/app/model/ad';
import { Review } from 'src/app/model/review';
import { UserProfile } from 'src/app/model/user-profile';
import { AdService } from 'src/app/service/ad.service';
import { ReviewService } from 'src/app/service/review.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username!: string
  user!: UserProfile;
  review!: {};
  reviews: Review[] = []
  ads: Ad[] = []
  favourites: Ad[] = []
  starAverage!: number;

  constructor(private userSrv: UserService, private reviewSrv: ReviewService, private route: ActivatedRoute,private adSrv: AdService, private router: Router) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.username = this.route.snapshot.params['username']
    this.checkLogged()
    this.getUser(this.username)
    // this.getReviews()
    this.getAds()

  }


  //  GET USER
  getUser(username: string) {
    this.userSrv.getUser1(username).subscribe(data => {
      this.user = data;
      this.getReviews()
      this.getFavourites()
    });
  }

  checkLogged() {
    if (localStorage.getItem('username') == this.username) {
      return true;
      ;
    } else {
      return false;
    }
  }

  // GET ADS

  getAds(){
    this.adSrv.getByUsername(this.username).subscribe(data=>{
      this.ads = data
      console.log(data);

    })
  }

  // GET FAVOURITE ADS
  getFavourites(){
    if(this.user){
      this.adSrv.getFavouriteAdsByProfileId(this.user.profile.id).subscribe(data=>{
        console.log("favourites", data);
        this.favourites = data
      })
    }

  }

  // DELETE FAVOURITE AD

  removeLike(adId: number){
    return this.adSrv.removeLike(adId).subscribe(d=>{
      console.log("removed")
      this.getFavourites();
    }
    )
  }

  //  DELETE AD
  deleteAd(id: number){
    this.adSrv.delete(id).subscribe(data=>{
      console.log(data)
      this.getAds();
    })}


  // REVIEWS

  addReview(f: NgForm) {
    const title = f.value.title
    const description = f.value.description
    const stars = f.value.star

    this.review = {
      title: title,
      description: description,
      stars: stars
    }

    this.reviewSrv.postReview(this.user.id, this.review).subscribe(data => {
      console.log(data)
      this.getReviews()
    }
    )
    f.controls['title'].reset();
    f.controls['description'].reset();
    f.controls['stars'];
    this.getReviews()
  }


  getReviews() {
    if(this.user){
      this.reviewSrv.getReviews(this.user.id).subscribe(data => {
        console.log(data)
        this.reviews = data;
        this.starsAverage()
      }
      )
    }


  }

  starsAverage() {
    let s = 0
    this.reviews.forEach(r => {
      s = s + r.stars
    })
    this.starAverage = s / this.reviews.length
    return console.log(this.starAverage);
  }
}
