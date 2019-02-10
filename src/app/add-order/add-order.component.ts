import { HelperService } from './../helper.service';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {
  pid: number;
  value: number;
  unit: string;

  constructor(private http: HttpClient, public help: HelperService) { }

  ngOnInit() {
  }

  onAddOrder() {
    let httpOptions = {
      headers : new HttpHeaders({
        'Content-type': 'application/json'
      })
    }
    this.http.post<any>('http://localhost:3004/addOrder', {pid: this.pid, value: this.value, unit: this.unit},httpOptions)
      .subscribe(console.log);
  }

}
