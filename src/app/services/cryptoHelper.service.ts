import { Injectable } from "@angular/core";
import {environment} from '../../environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class cryptoHelperService {


   encrypt(txt: string): string {
      return CryptoJS.AES.encrypt(txt, environment.encryption_key).toString();
    }
  
   decrypt(txtToDecrypt: string) {
      return CryptoJS.AES.decrypt(txtToDecrypt, environment.encryption_key).toString(CryptoJS.enc.Utf8);
    }

    encryptJSON(text:any) {
      return CryptoJS.AES.encrypt(JSON.stringify(text),environment.encryption_key).toString();
   }

    decryptJSON(ciphertext:any) {
    var bytes  = CryptoJS.AES.decrypt(ciphertext,environment.encryption_key);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    //console.log('decryptJSON ==',decryptedData);
    return decryptedData;
   }

}
