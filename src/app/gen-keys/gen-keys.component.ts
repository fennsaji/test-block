import { Component, OnInit } from '@angular/core';

import { HttpHeaders, HttpClient } from "@angular/common/http";

declare let openpgp: any;

@Component({
  selector: 'app-gen-keys',
  templateUrl: './gen-keys.component.html',
  styleUrls: ['./gen-keys.component.css']
})
export class GenKeysComponent implements OnInit {
  privkey: any;
  pubkey: any;
  uid: number;
  passphrase: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {}

  onGenerateKey() {
    this.generateKeyPair(this.uid, this.passphrase);
  }

  generateKeyPair(userid: number ,passphrase: string) {
    var options = {
        userIds: [{name: 'Fenn', email: 'fennsaji@outlook.com'}],
        numBits: 2048,                                            // RSA key size
        passphrase : passphrase                                   // protects the private key
    };

    let httpOptions = {
      headers : new HttpHeaders({
        'Content-type': 'application/json'
      })
    }
    
    return openpgp.generateKey(options)
        .then(async (key) => {
            this.privkey = key.privateKeyArmored;               // '-----BEGIN PGP PRIVATE KEY BLOCK ... '
            this.pubkey = key.publicKeyArmored;                 // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
            var revocationSignature = key.revocationSignature;  // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
            this.http.post<any>('http://localhost:3004/saveKeys', 
              {uid: userid, prKey: this.privkey, pbKey: this.pubkey}, httpOptions)
              .subscribe(res => {
                console.log(res);
              });
        });
}

}
