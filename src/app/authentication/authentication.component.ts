import { HelperService } from './../helper.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  uid: number;

  constructor(private help: HelperService) { }

  ngOnInit() {
  }

  setUid() {
    this.help.uid = this.uid;
  }

}
