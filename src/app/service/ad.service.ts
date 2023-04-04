import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ad, Content, Page } from '../model/ad';

@Injectable({
  providedIn: 'root'
})
export class AdService {
  ad!: Ad
  url = "http://localhost:8081/";
  constructor(private http: HttpClient) { }

  add(ad: {}){
    return this.http.post<Ad>(this.url + "api/ads", ad)
  }

  getAllPosts(page:number){
    return this.http.get<Page>(this.url + `api/ads?page=${page}&size=8`)
  }

  getByTitle(title: string){
    return this.http.get<Ad[]>(this.url + "api/ads/title?title=" + title )
  }
  getById(id: any){
    return this.http.get<Ad>(this.url + "api/ads/" + id)
  }

  getByUsername(username: string){
  return this.http.get<Ad[]>(this.url + "api/ads/username?username=" + username)
  }

  getByCategory(category: string){
    return this.http.get<Ad[]>(this.url + `api/ads/category?category=${category}`)
  }

  getFavouriteAdsByProfileId(id: number){
    return this.http.get<Ad[]>(this.url + "api/ads/like/" + id)
  }

  delete(id: number){
    return this.http.delete(this.url + "api/ads/" + id)
  }
  // put like
  putLike(id: number, like: {}){
    return this.http.put(this.url + "api/ads/like/" + id, like)
  }
  // remove like
  removeLike(adId: number){
    return this.http.delete(this.url + "api/ads/like/" + adId)
  }

  // edit ad
  updateAd(id: number, ad: {}){
    return this.http.put(this.url + "api/ads/edit/" + id, ad)
  }

  //  get tops
  getTops(){
    return this.http.get<Ad[]>(this.url + "api/ads/tops")
  }

  // remove like


}
