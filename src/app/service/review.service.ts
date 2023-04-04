import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../model/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  url = "http://localhost:8081/";
  constructor(private http: HttpClient) { }

  // post a review
  postReview(id: number, review: {}){
    return this.http.post(this.url + "reviews/" + id, review)
  }

  // Get reviews of an user
  getReviews(id:number){
    return this.http.get<Review[]>(this.url + "reviews/" + id)
  }

}
