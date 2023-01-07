// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import formidable from 'formidable';
import type { NextApiRequest, NextApiResponse } from 'next'
import { backendUtils } from '../../../../utils';
import {PrismaClient} from '@prisma/client'

type Data = {
  id: string
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

type Error = {
  message: string | string[]
}

export const config = {
  api: {
    bodyParser: false
  }
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data|Error>
) {
  if(req.method !== "POST") {
    res.status(403).json({ message: `${req.method} request is not allowed` });
    return
  }
  const data:{ err: string, fields:formidable.Fields, files: formidable.Files } = await backendUtils.normalizeData(req);
  
  const validate = validation(data?.fields)
  if(validate.length > 0) {
    res.status(401).json({message: validate})
    return
  }
  const { email, password } = data.fields;
  let user:any[] = []
  await prisma.user.findMany({
    where: {
    email: email
      },
      }).then(res => {
        console.log("Res ", res);
        user = res;
      }).catch(err => {
        console.log("Err ", err)
      });
  if(user.length === 0) {
    res.status(400).json({ message: "Please register your email" })
    return
  }
  
  if(backendUtils.decryptPassword(user[0]?.password) !== password) {
    res.status(400).json({ message: "Password is incorrect" });
    return
  }
  delete user[0]['password'];
  res.status(200).json(user[0])
}


const validation = (data:any):string[] => {
  let error:string[] = [];
  if(!data.email || data.email === "") error.push("Email is required")
  if(!data.password || data.password === "" ) error.push("Password is required")
  if(data.email && !data.email?.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) error.push("Email is not valid")
  if(data.password && data.password.length < 8) error.push("Password must be greater than 8 characters")

  return error;
}