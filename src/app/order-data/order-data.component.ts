import { WEB3 } from './../web3.token';
import Web3 from 'web3';
import * as shajs from 'sha.js';

import { HelperService } from './../helper.service';
import { Component, OnInit, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";

let chainABI = require('../SupplyChain.json');

declare let require: any;
declare let openpgp: any;
// let openpgp = require('openpgp');

@Component({
  selector: 'app-order-data',
  templateUrl: './order-data.component.html',
  styleUrls: ['./order-data.component.css']
})
export class OrderDataComponent implements OnInit {
  private key: any;
  sharedData: any = {};
  uid: any;
  bHash: any;
  gHash: any;
  password: any;
  matches: any;
  address: string;
  chainInstance: any;
  

  constructor(private http: HttpClient, private help: HelperService, @Inject(WEB3) private web3: Web3) {
    this.uid = this.help.uid;
    this.initData();
   }

   async initData() {
    this.address = await this.web3.eth.getAccounts();
    console.log(this.address)

    this.chainInstance = new this.web3.eth.Contract(
      JSON.parse(chainABI.interface),
      '0xCCfF1B86908CFa4c24DdE6a8a15439B405e61e3A',
      {
        from: this.address[0],
        gasPrice: '20000000000'
      }
    );
  }

  onGetData() {
    let httpOptions = {
      headers : new HttpHeaders({
        'Content-type': 'application/json'
      })
    }

    this.http.get<any>('http://localhost:3004/getPrivateKey/'+ this.uid, httpOptions)
      .subscribe(res => {
        this.key = res['prKey'][0].pr_key;
        this.http.get<any>('http://localhost:3004/fetchorders/'+ this.uid + '/'+ 2, httpOptions)
          .subscribe(async res => {
            if(res){
              await this.decryptData(res.endData, this.key);
              this.sharedData.addedOn = res.addedOn;
            }
        });
      });
  }

  ngOnInit() {}

  async decryptData(data, privateKey) {
    const privateKeyObj = (await openpgp.key.readArmored(privateKey)).keys[0];
    await privateKeyObj.decrypt(this.password)
    return openpgp.decrypt({
      message: await openpgp.message.readArmored(data),
      privateKeys: [privateKeyObj]
    })
    .then((decryptedData) => {
      console.log(decryptedData.data)
      this.gHash = "0x" + shajs('sha256').update(decryptedData.data).digest('hex');
      decryptedData = JSON.parse(decryptedData.data);
        this.sharedData = decryptedData;
        this.getHash(this.sharedData.index);
    })
  }

  async getHash(index: number) {
    console.log("Reading hash")
    let hash = await this.chainInstance.methods.getOrderbyIndex(index).call();
    console.log(hash,"Block")
    this.bHash = hash;
  }
}
