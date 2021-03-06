import { Component, OnInit } from '@angular/core';
import { Interest } from 'src/app/model/interest';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/UserService/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user!:User
  interest!: Interest
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUser()
    this.getInterest()
  }

  getUser(){
    this.userService.getCurrentUser().subscribe((data) => {
      this.user = data.data
    })
  }

  getInterest(){
    this.userService.getInterest().subscribe((data) => {
      console.log("interest", data.data)
      this.interest = data.data
    })
  }
}
