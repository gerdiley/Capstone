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

  // add an ad

  add(ad: {}){
    return this.http.post<Ad>(this.url + "api/ads", ad)
  }

  // get ads
  getAllPosts(page:number){
    return this.http.get<Page>(this.url + `api/ads?page=${page}&size=8`)
  }

  // get ads by title
  getByTitle(title: string){
    return this.http.get<Ad[]>(this.url + "api/ads/title?title=" + title )
  }

  // get ad by id
  getById(id: any){
    return this.http.get<Ad>(this.url + "api/ads/" + id)
  }

  // get ads by username
  getByUsername(username: string){
  return this.http.get<Ad[]>(this.url + "api/ads/username?username=" + username)
  }

  // get ads by category
  getByCategory(category: string){
    return this.http.get<Ad[]>(this.url + `api/ads/category?category=${category}`)
  }

  // get ads by city
  getByCity(city:string){
    return this.http.get<Ad[]>(this.url + `api/ads/city?city=${city}`)
  }

  // get favourite ads
  getFavouriteAdsByProfileId(id: number){
    return this.http.get<Ad[]>(this.url + "api/ads/like/" + id)
  }

  // delete an ad by id
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

}
