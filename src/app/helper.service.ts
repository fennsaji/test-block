import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  public uid: number;

  constructor() {
    this.uid = 1;
   }
}
