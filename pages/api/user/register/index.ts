// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import formidable from 'formidable'
import type { NextApiRequest, NextApiResponse } from 'next'
import { backendUtils } from "../../../../utils"

type Data = {
  name: string
}
type Error = {
  message: string[]
}

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
    }
    else
    {
      res.status(200).json(data)
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
  if(!data.email || data.email === "") error.push("Email is required")
  if(!data.password || data.password === "" ) error.push("Password is required")
  if(!data.re_password || data.re_password === "" ) error.push("Confirm Password is required")
  if(data.email && !data.email?.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) error.push("Email is not valid")
  if(data.password && data.password.length < 8) error.push("Password must be greater than 8 characters")
  if(data.re_password && data.password !== data.re_password) error.push("Passwords did not matched")

  return error;
}