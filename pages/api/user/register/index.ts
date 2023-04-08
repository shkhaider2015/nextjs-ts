// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import formidable from 'formidable'
import type { NextApiRequest, NextApiResponse } from 'next'
import { backendUtils } from "../../../../utils"
import { PrismaClient } from '@prisma/client'
import { IResponseBody } from '../../../../interfaces'

type Data = {
  name: string
}
type Error = {
  message: string[]
}

const prisma = new PrismaClient();
export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any|Error>
) {
  
  if (req.method === "POST") {
    const data:{ err: string, fields:formidable.Fields, files: formidable.Files } = await backendUtils.normalizeData(req);
    const validate = validation(data?.fields)
    
    if(validate.length > 0)
    {
      res.status(400).json({message: validate})
      return
    }
    else
    {
      const { name, email, password } = data.fields;
      let user:any[] = []
      await prisma.user.findMany({
        where: {
          email: email.toString()
        }
      }).then(res => user = res)
      if(user.length && user[0].email === email ){ 
        res.status(400).json({message : "Email is already registered" })
        return
      }
      let newUser = null
      await prisma.user.create({
        data: {
          name: name.toString(),
          email: email.toString(),
          password: backendUtils.encryptPassword(password.toString())
        },
      }).then(async res => {
        const { password, ...others } = res
        newUser = others;
        await prisma.$disconnect()
      })
      .catch(async err => {
        console.error("Error : ",err)
        await prisma.$disconnect()
        process.exit(1)
      })
      let responseBody:IResponseBody = {
          error: null,
          data: newUser
      }
      res.status(200).json(responseBody)
    }
  }
  else
  {
    res.status(403).json({
      message: "This method is not allowed"
    })
  }
}

const validation = (data:any):string[] => {
  let error = [];
  if(!data.name || data.name === "") error.push("Name is required")
  if(!data.email || data.email === "") error.push("Email is required")
  if(!data.password || data.password === "" ) error.push("Password is required")
  if(!data.confirmPassword || data.confirmPassword === "" ) error.push("Confirm Password is required")
  if(data.email && !data.email?.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) error.push("Email is not valid")
  if(data.password && data.password.length < 8) error.push("Password must be greater than 8 characters")
  if(data.confirmPassword && data.password !== data.confirmPassword) error.push("Passwords did not matched")

  return error;
}