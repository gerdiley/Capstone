import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Message } from '../model/message';
import { Notification } from '../model/notification';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  url = "http://localhost:8081/";
  constructor(private http: HttpClient) { }
  notifications: Notification[] = []
  notificationSub = new BehaviorSubject<Notification[]>(this.notifications);
  notificationObs$ = this.notificationSub.asObservable();

  getAllMessages(id: number) {
    return this.http.get<Message[]>(this.url + "chat/all?rec_id=" + id);
  }

  getSentMessage(rec_id:number){
    return this.http.get<Message[]>(this.url + "chat/sent?rec_id="+ rec_id)
  }
  getReceivedMessage(sender_id:number){
    return this.http.get<Message[]>(this.url + "chat/received?sender_id="+ sender_id)
  }

  sendMessage(rec_id:number, message: {}){
    return this.http.post(this.url + "chat/" + rec_id, message);
  }

  getNotification(){
    return this.http.get<Notification[]>(this.url + "notifications/unread").pipe(tap(data =>{
      this.notificationSub.next(data);
    }))
  }

  readMessage(id: number, {}){
    return this.http.put<Notification>(this.url + "notifications/" + id, {})
  }

}
