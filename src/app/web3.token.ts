import { InjectionToken } from '@angular/core';
import Web3 from 'web3';

declare let window: any;
declare let web3: any;
declare let require: any;

const HDWalletProvider = require('truffle-hdwallet-provider');

let web3Provider: any;

// if (typeof window.web3 !== 'undefined') {
//   web3Provider = window.web3.currentProvider;
// } else {
//   web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
// }

web3Provider = new HDWalletProvider(
  'spice creek mule tennis wagon fly fruit spice anger absurd rival habit',
  'https://rinkeby.infura.io/v3/5434edd6345b4302aacc6619c1673781'
);

// window.web3 = this.web3;

export const WEB3 = new InjectionToken<Web3>('web3', {
  providedIn: 'root',
  factory: () => new Web3(web3Provider)
});