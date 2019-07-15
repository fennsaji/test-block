import { Injectable } from '@angular/core';
import * as sjcl from 'sjcl';
import * as JsEncryptModule from 'jsencrypt';
import * as aesutil from './AesUtil';
import * as pako  from 'pako';
import { saveAs } from 'file-saver';
// import { secretbox, randomBytes, box } from "tweetnacl";
// import {
//   decodeUTF8,
//   encodeUTF8,
//   encodeBase64,
//   decodeBase64
// } from "tweetnacl-util";

import * as nacl from 'tweetnacl';
import * as naclutil from 'tweetnacl-util';

@Injectable({
  providedIn: 'root'
})
export class EncrypterAesService {
  newNonce;
  generateKeyMethod;
  key;
  key2;
  anotherKey;
  privateKey = `-----BEGIN RSA PRIVATE KEY-----
  MIIEogIBAAKCAQBvCJm6g4JF3WJaiNdZ0Yn2ZlRuDTmGXqIwXUBJxiLBBp6JPXpU
  EwlD2to9PxdwtfjIVJEyrmXW6vKHqbRX+VFPprZN+gq9REoClD81xcV51YjueqBc
  JkXwnCW+lvDPGhNJ+Yb75qSoxtckJJ2MHBzHAlTArhvlvbMVHFN7STHCkDqvty5j
  9VxLc+eNhkj44wyVodpywDhodhwn3ptWOQ/4VFvWVJMARuyec2ayH2jbdwzcf3h0
  TKniM4R396ZLyYMsIVore8LG3+nXWVTyYBfc2kJOejkr5fJFBd7GL6FVL0GY+Ozi
  vqb6iNhmE2Kv1TtTSytn9He6e4rXQOsXrbb3AgMBAAECggEANN6dhKg2EdpWiNF7
  6XLTBJa5QSXe7FKHXAwrHnXP+qWSO7sgUoQ19y9wl5VBLhQYABv0f3N3XpzFGz/9
  dZ5rz0eMqxiSoIixzQSWDJ69Z0P8TcHqNbaruuQ/PL9Wrua1pJXCZpPud8cmjjk5
  I4wHT+OWQ6Ej+4MWkMjKH3w8y22LQ7qrylQOukEfRtrvShd5LXy7ck3h5i5Bm3SY
  O8zbnPOECGPl0x3MdLE/kx2VpT9E9pY5aVowc56SSEfgFXc5VIw8GD0Oyu/JihQ/
  y/TjFA5bEqI/7nuW2Rlv+9jTPu2YATfAIvbQOuqyrN4xTpOxr5iL3zkoZ76cyBCK
  DwbREQKBgQDF6Wx7aCCbAeBdQIIDGaOESe0Kb+ana8N5CHWzem6it+D1NN5EBPt2
  v0JZZgofU6Zicnj7d6dFqH2CeMTQe+a4Qq9kfX7LLO1ooVMqiiMgBqae47/WQAZG
  C4E0fpf1lBDBdbPGdt6sXfEvaymqG639IvWdmtZiKjxS9MI4HY68zQKBgQCPn1/q
  39/nN9M4VMaIJfkR5Oqi9xM4IC9h0yXea9YMPPaVga6h4N2zT/n4mtgZUdQHBFtx
  t/xRZEM5eou+BvQteKIsxVN0/AYweQhMskLqV6RYiw49DDuCP+omjYuzgCPf2aMW
  Bls8Vztjz7S5gfMZWCLLcdHou1tA88snu8iC0wKBgQC3ilSK1fR3DHRwxuRLz7kv
  dAeayFAWMABl/Ix7WC3GRdUgUllWp3A1ngYANntotgD2B8dfHoZIOYu8NhgAaQd9
  FormHOQ7tHyvrf0c1GLizogzjm9YWKP4za6Taluu6hPn9io1AgRbwftsyGspUOY4
  ffVepjvvac/r9wUvWWoIeQKBgFvhM3WIvy6mMgQJh/C1ij9+WPTkZ3Eydd15PPKr
  vgWaQo2mptd8iZgbA+mc9b5M8P2ENhPsBgjzwWXWFev9etxUHjvSCPAAAt2jsEGQ
  kOpmIwdZ/kPjvXY3+U2so8Czqz+bdY+zhU5259GUoSNEFQcTsT7Bk+31Xg2RaVgD
  8+RtAoGAYXQ/ZLGhomy3lIDKiyORtU1ISzAoONQ7KwTD8f7FTAmmUfdloZLFD+a9
  zuxyrpTlxHJ+ua2a3XSI5KiWqifz1MNRAHd1/3o6qRQTBGfeBx8uEAdKBZwGUerK
  j/wmbJbLDTRtLsZwR1hLUZs1HG5nYDoPiikCXhyO3nLqrcesw4s=
  -----END RSA PRIVATE KEY-----`;

  constructor() {
    // this.newNonce = () => randomBytes(secretbox.nonceLength);

    // this.generateKeyMethod = () => encodeBase64(randomBytes(secretbox.keyLength));
    // this.key = nacl.box.keyPair()
    // this.key2 = nacl.box.keyPair()
    // this.anotherKey = nacl.box.keyPair.fromSecretKey(this.key2.secretKey)
    // console.log("Key", this.key.publicKey, this.anotherKey.secretKey)

    window.crypto.subtle.generateKey(
      {
          name: "AES-GCM",
          length: 256,
      },
      true,
      ["encrypt", "decrypt"]
    ).then(async (key) => {
        this.key = key;
        // console.log(key)

        let key2 = await crypto.subtle.exportKey("jwk", key);
        let jsonKey = JSON.stringify(key2);
        let key3 = JSON.parse(jsonKey);
        const result = await crypto.subtle.importKey(
          "jwk",
          key3,
          "AES-GCM",
          true,
          ["encrypt", "decrypt"]
        );
        // console.log(key2, result);
        
    });

    window.crypto.subtle.generateKey(
      {
      name: "RSA-OAEP",
      // Consider using a 4096-bit key for systems that require long-term security
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
      },
      true,
      ["encrypt", "decrypt"]
    ).then(key => {
      this.key2 = key;
      // console.log("PK", this.key2)
    })
   }

  //  encryptdata(key, data){
  //   const nonce = nacl.randomBytes(24)

  //   const box = nacl.box(
  //     naclutil.decodeUTF8(data),
  //     nonce,
  //     this.key.publicKey,
  //     this.anotherKey.secretKey
  //   );
  //   console.log(box);
  //   return JSON.stringify({box,nonce, publicKey: this.key2.publicKey, privateKey: this.anotherKey.secretKey});
  //  }

      async encryptdata(publicKey, text){
        let cryptoPublicKey = await this.importRsaKey(publicKey);
        // let cryptoPrivateKey = await 
        let iv = window.crypto.getRandomValues(new Uint8Array(12));
    
        // let aesKey = await window.crypto.subtle.generateKey(
        //   {
        //       name: "AES-GCM",
        //       length: 256,
        //   },
        //   true,
        //   ["encrypt", "decrypt"]
        // );

        let rawKey = window.crypto.getRandomValues(new Uint8Array(32));
        let aesKey = await window.crypto.subtle.importKey(
          "raw",
          rawKey,
          "AES-GCM",
          true,
          ["encrypt", "decrypt"]
        )
        // let fileKey = JSON.stringify(new Buffer(rawKey));
        console.log(aesKey, )
        let data;
        try{
          data =  await window.crypto.subtle.encrypt(
            {
              name: "AES-GCM",
              iv: iv,
              tagLength: 128
            },
            aesKey,
            text
          );
          console.log(data)
        }catch(err){
          console.log(err, "Error Occured")
          throw new Error();
        }

        let encPassword;
        try{
          let key = await crypto.subtle.exportKey("jwk", aesKey);
          console.log(key, iv)
          let file = new File([JSON.stringify(new Buffer(iv))], 'iv-new.txt', {type: 'txt/plain'})
          saveAs(file, "myFile2-iv" + ".txt");
          // let file2 = new File([JSON.stringify(new Buffer(rawKey))], 'iv-new.txt', {type: 'txt/plain'})
          // saveAs(file2, "myFile2-key" + ".txt");
          console.log(new Uint8Array(rawKey))
          var encrypt = new JsEncryptModule.JSEncrypt();
          encrypt.setPublicKey(publicKey);
          encPassword = encrypt.encrypt(key.k);
          // encPassword = await window.crypto.subtle.encrypt(
          //   {
          //     name: "RSA-OAEP"
          //   },
          //   cryptoPublicKey,
          //   new Uint8Array(rawKey)
          // );
          let data3 = JSON.stringify(new Buffer(data));
          let data4 = new Buffer(JSON.parse(data3).data);

          try{
            let data2 =  await window.crypto.subtle.decrypt(
              {
                name: "AES-GCM",
                iv: iv,
                tagLength: 128
              },
              aesKey,
              data4
            );
            console.log(data2)
            let data3 = pako.ungzip(data2)
            console.log(data3)
          }catch(err){
            console.log(err, "Error Occured 2")
            throw new Error();
          }

          let str = String.fromCharCode.apply(null, new Uint8Array(encPassword))
          var buf = new ArrayBuffer(str.length); // 2 bytes for each char
          var bufView = new Uint8Array(buf);
          for (var i=0, strLen=str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
          }

          console.log(btoa(encPassword), str, bufView)
          // let dryKey = await window.crypto.subtle.decrypt(
          //   {
          //     name: "RSA-OAEP"
          //   },
          //   cryptoPrivateKey,
          //   encPassword
          // );
          console.log(encPassword, rawKey)
          let file2 = new File([encPassword], 'iv-new.txt', {type: 'txt/plain'})
          saveAs(file2, "myFile2-key" + ".txt");
        } catch(err){
          throw new Error();
        }
        // var enc = new TextDecoder("utf-8");
        // console.log(enc.decode(dataBuffer));
        return {encryptedData: new Buffer(data), encryptedKey: encPassword};
      }

      importRsaKey(pem) {
        // fetch the part of the PEM string between header and footer
        const pemHeader = "-----BEGIN PUBLIC KEY-----";
        const pemFooter = "-----END PUBLIC KEY-----";
        const pemContents = pem.substring(pemHeader.length, pem.length - pemFooter.length);
        // base64 decode the string to get the binary data
        const binaryDerString = window.atob(pemContents);
        // convert from a binary string to an ArrayBuffer
        const binaryDer = this.str2ab(binaryDerString);
    
        return window.crypto.subtle.importKey(
          "spki",
          binaryDer,
          {
            name: "RSA-OAEP",
            hash: "SHA-256"
          },
          true,
          ["encrypt"]
        );
      }

      str2ab(str) {
        const buf = new ArrayBuffer(str.length);
        const bufView = new Uint8Array(buf);
        for (let i = 0, strLen = str.length; i < strLen; i++) {
          bufView[i] = str.charCodeAt(i);
        }
        return buf;
      }

      // importPrivateKey(pem) {
      //   // fetch the part of the PEM string between header and footer
      //   const pemHeader = "-----BEGIN PRIVATE KEY-----";
      //   const pemFooter = "-----END PRIVATE KEY-----";
      //   const pemContents = pem.substring(pemHeader.length, pem.length - pemFooter.length);
      //   // base64 decode the string to get the binary data
      //   const binaryDerString = window.atob(pemContents);
      //   // convert from a binary string to an ArrayBuffer
      //   const binaryDer = this.str2ab(binaryDerString);
      
      //   return window.crypto.subtle.importKey(
      //     "pkcs8",
      //     binaryDer,
      //     {
      //       name: "RSA-OAEP",
      //       // modulusLength: 2048,
      //       // publicExponent: new Uint8Array([1, 0, 1]),
      //       hash: "SHA-256",
      //     },
      //     true,
      //     ["sign"]
      //   );
      // }
      

  //  encryptdata( key, json){
  //   // const keyUint8Array = decodeBase64(this.key.publicKey);

  //   const nonce = this.newNonce();
  //   const messageUint8 = decodeUTF8(json);
  //   const box = box(messageUint8, nonce, this.key.publicKey);

  //   // const fullMessage = new Uint8Array(nonce.length + box.length);
  //   // fullMessage.set(nonce);
  //   // fullMessage.set(box, nonce.length);

  //   // const base64FullMessage = encodeBase64(fullMessage);
  //   // console.log(base64FullMessage)
  //   // return base64FullMessage;
  //  }


  // encryptdata(publicKey,privateKey, text){
    // let password = this.generateKey();
    // let password= await window.crypto.subtle.generateKey(
    //   {
    //       name: "AES-GCM",
    //       length: 256, //can be  128, 192, or 256
    //   },
    //   false, //whether the key is extractable (i.e. can be used in exportKey)
    //   ["encrypt", "decrypt"] //can "encrypt", "decrypt", "wrapKey", or "unwrapKey"
    // )
    // .catch(function(err){
    //     console.error(err);
    // });
    // this.decryptdata(privateKey, text)
    // console.log(password);
    // let cipher = sjcl.encrypt(password, text, {mode : "gcm"})
    // // let cipher = aesutil.encrypt(text, password)
    // // console.log(cipher);
    // // encrypt key using private key
    // var encrypt = new JsEncryptModule.JSEncrypt();
    // encrypt.setPublicKey(publicKey);
    // var encPassword = encrypt.encrypt(password);

    // var decrypt = new JsEncryptModule.JSEncrypt();
    // decrypt.setPrivateKey(privateKey);
    // var uncrypted = decrypt.decrypt(encPassword);

    // let dc = sjcl.decrypt(uncrypted, cipher)

    // console.log("dc",dc)
    // // cipher.password = encrypted;
    // // console.log(cipher)
    // return JSON.stringify({cipher, encPassword});
  // }

  // encryptdata(publicKey, text){
  //   let password = this.generateKey();

  //   // Encyrpt Data
  //   let cipher = sjcl.encrypt(password, text, {mode : "gcm"})

  //   // Encrypt Password
  //   var encrypt = new JsEncryptModule.JSEncrypt();
  //   encrypt.setPublicKey(publicKey);
  //   var encPassword = encrypt.encrypt(password);

  //   // return data
  //   return JSON.stringify({cipher, encPassword});
    // let password = this.generateKey();
    // let key = await window.crypto.subtle.generateKey(
    //   {
    //       name: "AES-GCM",
    //       length: 256,
    //   },
    //   true,
    //   ["encrypt", "decrypt"]
    // )

    // // let key.wrapKey()

    // let iv = window.crypto.getRandomValues(new Uint8Array(12));
    // let ciphertext = await window.crypto.subtle.encrypt(
    //   {
    //     name: "AES-GCM",
    //     iv: iv
    //   },
    //   key,
    //   text
    // );
    // console.log(ciphertext)
    // return ciphertext;

    // let decrypted = await window.crypto.subtle.decrypt(
    //   {
    //     name: "AES-GCM",
    //     iv: iv
    //   },
    //   key,
    //   ciphertext
    // );
    
    // console.log(decrypted)

    // let password= await window.crypto.subtle.generateKey(
    //   {
    //       name: "AES-GCM",
    //       length: 256, //can be  128, 192, or 256
    //   },
    //   false, //whether the key is extractable (i.e. can be used in exportKey)
    //   ["encrypt", "decrypt"] //can "encrypt", "decrypt", "wrapKey", or "unwrapKey"
    // )
    // .catch(function(err){
    //     console.error(err);
    // });
    // console.log(password);
    // let cipher = sjcl.encrypt(password, text, {mode : "gcm"})
    // let cipher = aesutil.encrypt(text, password)
    // console.log(cipher);
    // encrypt key using private key
    // var encrypt = new JsEncryptModule.JSEncrypt();
    // encrypt.setP(privateKey);
    // var encPassword = encrypt.encrypt(password);
    // cipher.password = encrypted;
    // console.log(cipher)
    // return JSON.stringify({cipher, encPassword});
  // }

  generateKey(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 32; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
}
