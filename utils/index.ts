import formidable from "formidable"
import CryptoJS from 'crypto-js'
import { env } from "process"
import jwt from "jsonwebtoken"

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

const generatesToken = (
  data: any,
  expireInDays: number
): { accessToken: string; refreshToken: string } => {

  let accessOption = {
    expiresIn: expireInDays + 'm',
  };
  let refreshOption = {
    expiresIn: (expireInDays*2) + 'm',
  };

  let secret = process.env.SECRET_KEY || '';

  const accessToken = jwt.sign(data, secret, accessOption);
  const refreshToken = jwt.sign(data, secret, refreshOption);
  
  return {
    accessToken,
    refreshToken,
  };
};

const errorKey = 'FCBayernMunich2024'

export default {
    normalizeData,
    encryptPassword,
    decryptPassword,
    generatesToken,
    errorKey
}