import formidable from "formidable"
import CryptoJS from 'crypto-js'
import { env } from "process"

const normalizeData = async (req:any) => {
    const data:{ err: string, fields:formidable.Fields, files: formidable.Files } = await new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm()
        form.parse(req, (err, fields, files) => {
          if (err) reject({ err })
          resolve({ err, fields, files })
        }) 
      })

      return data;
}

const encryptPassword = (x:string) => {
      // Encrypt
      var ciphertext = CryptoJS.AES.encrypt(x, 'SEC17352015').toString();
  return ciphertext;
}

const decryptPassword = (x:string) => {
  var bytes  = CryptoJS.AES.decrypt(x, 'SEC17352015');
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText
}

export default {
    normalizeData,
    encryptPassword,
    decryptPassword
}