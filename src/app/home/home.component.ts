import { EncrypterAesService } from './../encrypter-aes.service';
import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import SplitFile from "js-split-file";

import * as csv from 'csvtojson';
import * as pako  from 'pako';
import Papa from 'papaparse';
Papa.SCRIPT_PATH = 'node_modules/papaparse/papaparse.js'
import * as aesutil from '../AesUtil';
import * as crypto from 'crypto';
import { Parser } from '@angular/compiler';
// import * as sjcl from 'sjcl';  , m m .0

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data;
  options;
  output;
  slice_size = 1000 * 1024;
  reader: any;
  file: any;
  FirstHeader: any = ["SOF", ]
  totalRows = 1;
  endRow;
  fileParts = [];
  publicKey = `-----BEGIN PUBLIC KEY-----
  MIIBITANBgkqhkiG9w0BAQEFAAOCAQ4AMIIBCQKCAQBmgw7rPRC/Hi+l8rKeZvVr
  +WWRcHMviJbfy9FHNYD80GGO2OZ79PLfmZKc79GOUPILfA/vUmPdPGiKQdKXgY5b
  CUZbzkPcb4D+RxCec0KZTq5ZnoMKd9jcZiFYafEkh8EO6aUQP46ks09y6+hMROq1
  /aUS3FXWlnvQVwOEQOYqjzQiQYg063G4IDGCkkWVyBNWadQMwm8SqUWOmeO0WKdR
  i43hRK3CQ8+RLxsNIEYTjbbYfgxqDLkGT+q00GTCNLDB7JTSGbxE0aCMxqbOSErk
  WzryZXzLCt1O7LEJmNejKHNFqK4ntmaagq4w4W0cAyFUmAB7btVymZ4+mNNgL2K9
  AgMBAAE=
  -----END PUBLIC KEY-----`;


  privateKey = `-----BEGIN RSA PRIVATE KEY-----
  MIIEowIBAAKCAQBmgw7rPRC/Hi+l8rKeZvVr+WWRcHMviJbfy9FHNYD80GGO2OZ7
  9PLfmZKc79GOUPILfA/vUmPdPGiKQdKXgY5bCUZbzkPcb4D+RxCec0KZTq5ZnoMK
  d9jcZiFYafEkh8EO6aUQP46ks09y6+hMROq1/aUS3FXWlnvQVwOEQOYqjzQiQYg0
  63G4IDGCkkWVyBNWadQMwm8SqUWOmeO0WKdRi43hRK3CQ8+RLxsNIEYTjbbYfgxq
  DLkGT+q00GTCNLDB7JTSGbxE0aCMxqbOSErkWzryZXzLCt1O7LEJmNejKHNFqK4n
  tmaagq4w4W0cAyFUmAB7btVymZ4+mNNgL2K9AgMBAAECggEASgwC+8LZVOPOETW0
  9hxyzHKSfjLW0Q/9w1wrKB+qs3Ml9RQRsJon0YHR2JCWMxGfNNKBhCJkRks7TBrt
  rkiD9phFfU0J0bGtYH8erwWcprah09Re3XHicJlJHt8vs25n8oislYcDV066Zc2n
  t2fUjm7QDUagrmd2ufAQdziVyUlHQMTkI5j+0zjz2stPNcEgYJD9UaIFFfcrHmnC
  R/6rZcLzKhEhkJMIFsuoZOSmaYesdPDIl7b1Jic5P0fCQ7CNGUontoNMCz2HGsx5
  4RgJRk48MzP+7ibp/KWDmt9NWULm9bOq3TdDbWXOdoGVJ0hxUdrqvDiKMypfOrZN
  2Vtr1QKBgQDEaYKZYGJXT+Vhc7hvqxgTcX+4/wSMqtbzb6aL4q0tyI1AoE/hHzg0
  coXf+NYyUTWAHalXsPmgSoMbypo8L7DN1VGqQs/XAzHD9TAPcWl3maOVbrsFcG1k
  4W0LoNAgCeG4hBuSfJ2WF9nDf8d7rh8LwNNI/CdYHFk8S82DwWT+gwKBgQCFnLjI
  5bGcWDwShBBtZ7r14tHWCTKFe7y0kRrDHdgrCd1mrl7oabgqVITMITl+xfC4JWKL
  Wb4sV3jygZ6D7IYOXE6us9nLToplcLP320XaU1hwfmy2u40Dg24RxM8j9Q5hBsoR
  MxCMQqV6aGuTYgSBl1CN0YkuasKcdz6fvRxVvwKBgQCjCnqw2wOHOvlMNgVKHRq1
  OSgu5vJd2oroNSxpPldHhA1NMkZct8+uKcrbqvITfroMiZLDClONLY08CqiRgX0g
  wA00apWhBDPRWLz2dMx5zX2vU+XHlBYbAc3FM07Q6aMHyhIhPXSK3W2VDYMINffr
  h7tcAISgbZfdp4cH8gfmBQKBgGkZOSUVwJrpsP8jkMRuRtspesNw4qOrDGnAhhua
  uzJHhTdCy/bnSe1KJFdpfw9gZhSDm7tfcT7x43pmSSkegOiE5YN4h0Xr1uMqPvYl
  LhIpYzTBzYQDjU2JMaiadhGjrpbVv1a+IzMhLYdW4d/BxyekvcGAY/b2FXT8O29t
  Uv+DAoGBAL4Zm6jAt1jQ+bYZiLnLZ/aS3xtLm1gX5aACinYdKs1QJaWjl46AdktA
  vnhkDUYdD6sODC4lWQWDuJamZG+HSsCoHZlfaTzEvgaE12v9UeHjASMx19zsejnJ
  DbSJ1F40sjX9ggfteXDgeeUrTovFx7QSlNpBDyJ8b6mwBh43MmVr
  -----END RSA PRIVATE KEY-----`;

  constructor(private aesService: EncrypterAesService) { }

  ngOnInit() {
    this.options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: false,
      headers: [],
      showTitle: true,
      title: 'asfasf',
      useBom: false,
      removeNewLines: true,
      keys: ['approved','age','name' ]
    };
    this.data = [
      {
        name: "Test, 1",
        age: 13,
        average: 8.2,
        approved: true,
        description: "using 'Content here, content here' "
      },
      {
        name: 'Test 2',
        age: 11,
        average: 8.2,
        approved: true,
        description: "using 'Content here, content here' "
      },
      {
        name: 'Test 3',
        age: 10,
        average: 8.2,
        approved: true,
        description: "using 'Content here, content here' "
      }
    ];
    let csvStr = "\"134.9\",36,\"t\",\"Tonne(n)\",0.001,\"123\",118,\"m3\",\"cubic meter\",1000,0,0,\"\",\"\",0,\"1543440910000\"";
    csv({
        noheader:true,
        output: "csv"
    })
    .fromString(csvStr)
    .then((csvRow)=>{ 
        console.log(csvRow) // => [["1","2","3"], ["4","5","6"], ["7","8","9"]]
    })
  }

  triggercheck(){
    console.log(this.FirstHeader, this.endRow, this.fileParts, "Check")
  }

  onChange(event){
    this.file = event.srcElement.files[0];
    console.log(this.file)
    localStorage.setItem('my_file', JSON.stringify(this.file));
    console.log("FIle ",localStorage.getItem('my_file'))
    let temp = '';
    // this.reader = new FileReader();
    // this.upload_file(0);
    let i = 0;
    let part = 0;
    console.time('Validation')
    Papa.parse(this.file, {
      // chunk: (results) => {
      //   console.log(results.data.length);
      // },
      step:
       async (results, parser) => {
        temp+=results.data[0].join(",");
        temp+="\n"
        if(i>30000){
          i=0;
          let file3 = new Blob([temp], {type: 'txt/plain'})
          saveAs(file3, "myFile2-original" + ".txt");
          let compressedData;
          let file2 = new Blob([temp], {type: 'application/json'})
          console.log(file2)
          try{
            compressedData = pako.gzip(temp);
            pako.ungzip(compressedData)
            console.log(compressedData)
          }catch(err){
            console.log(err, "Compression Failed");
            return;
          }
          console.time("Encryption")

          let encryptedObj;
          try{
            // encryptedData = await this.encryptData(compressedData, this.accountResponse.publicKey)
            // const salt = crypto.randomBytes(256);
            // encryptedData = sjcl.encrypt('verylongstring', compressedData, {mode : "gcm"})
            // encryptedData = aesutil.encrypt(compressedData, salt)
            parser.pause();
            encryptedObj = await this.aesService.encryptdata(this.publicKey, compressedData)
            console.timeEnd("Encryption")
            console.log("Enc Data", encryptedObj.encryptedData, temp.length)
            // parser.abort()
            // return;
          } catch(err){
            console.log("Error", err)
            return;
          }
          let file = new Blob([encryptedObj.encryptedData], {type: 'plain/text'})
          saveAs(file, "myFile2" + ".txt");

          console.log("Done", file);
          parser.abort();
          part+=1;
          // let file = new File([blob], 'jsdj.csv', {type: 'application/vnd.ms-excel'})
          this.fileParts.push(file);
          temp = '';
          return;
        }
        i+=1;
      },
      complete: (result) => {
        console.log("DOne", result.data.length)
        let file = new Blob([temp], {type: 'application/vnd.ms-excel'})
        this.fileParts.push(file);
        console.timeEnd('Validation')
        this.triggercheck()
        console.log("Count", i)
      }
    });


    // var buf; 
    // console.log(file)
    // var blob = file.slice(0, 1e6)
    // var fr = new FileReader()
    // this.reader.onload = (e) => {
    //   console.log(e.target.result)
    //   let data = e.target.result;
    //   const compressedData = pako.gzip(data)
    //   console.log("Compressed Data", compressedData);
    //   let newFile = new File([compressedData], 'compressed.gzip', {type: 'application/x-gzip'})

      // var fr = new FileReader();
      // fr.onload = (e) => {
      //   const decompressedData = pako.ungzip(e.target.result)
      //   console.log("decompressed Data", decompressedData)
      // }
      // fr.readAsArrayBuffer(newFile);
      // console.log(newFile)

      // var blob = newFile.slice(0, 1e6);
      // blob = new File([blob], 'fileName_part_i', {type: 'application/x-gzip'})
      // console.log(blob)

      // this.splitAndSendFile(new Uint8Array(e.target.result), file);
      // const splitFile = new SplitFile();
      // const binary = new Uint8Array(e.target.result); // for browser, from File or Blob to Uint8Array; for nodejs, from Buffer to Uint8Array
      // const blocks = splitFile.split(binary, "a.csv", 1e6);
      // blocks.forEach((ele) => {
      //   const piece = splitFile.decodeBlock(ele);   
      // })
      
        
    //   console.log(piece)
    // };
    // this.reader.readAsArrayBuffer(this.file);
  }


//   upload_file(start ) {
//     var next_slice = start + this.slice_size + 1;
//     var blob = this.file.slice( start, next_slice );
//     blob.type = this.file.type;

//     this.reader.onloadend = (event) => {
//       if ( event.target.readyState !== FileReader.DONE ) {
//           return;
//       }
//       console.log(blob, event.target.result)

//       if ( next_slice < this.file.size ) {
//         this.upload_file(next_slice);
//       }
//     }
//     this.reader.readAsDataURL(blob);
// }

  // splitAndSendFile(dataArray, file) {
  //   var i = 0, formData, blob;
  //   for (; i < dataArray.length; i += 1e6) {
  //       blob = new Blob([dataArray.subarray(i, i + 1e6)]);
  //       formData = new FormData();
  //       formData.append("fileUpload", blob, file.name + ".part" + (i / 1e6));
  //       console.log(formData.get(), blob)
  //   }
  
  // }
}
