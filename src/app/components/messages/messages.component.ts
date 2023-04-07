import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/app/model/message';
import { UserInterface } from 'src/app/model/user-interface';
import { UserProfile } from 'src/app/model/user-profile';
import { AuthService } from 'src/app/service/auth.service';
import { MessageService } from 'src/app/service/message.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  sentMessages: Message[] = []
  receivedMessages: Message[] = []
  messages: Message[] = []
  id!: number
  loggedUser!: UserProfile
  user!: UserProfile;
  constructor(private messageSrv: MessageService, private route:ActivatedRoute, private userSrv : UserService) { }

  ngOnInit(): void {
    this.id =this.route.snapshot.params['id']
    this.getAllMessages()
    this.getLoggedUser()
    this.getUserById()
  }


  // GET ALL MESSAGES

  getAllMessages() {
    this.messageSrv.getAllMessages(this.id).subscribe(data => {
      this.messages = data;
      console.log(data);
    })
  }

  // GET LOGGED USER

  getLoggedUser(){
    this.userSrv.getUser().subscribe(data=> this.loggedUser =data)
  }

  // GET USER BY ID

  getUserById(){
    this.userSrv.getUserById(this.id).subscribe(data=>{
      this.user = data;
      console.log(data);

    }
    )
  }


  // SEND MESSAGE

  onSubmit(f: NgForm){
    const text = f.value.text
    this.messageSrv.sendMessage(this.id, {text: text}).subscribe(data=>{
      this.getAllMessages()
      f.reset()
    }
    )
  }


}
