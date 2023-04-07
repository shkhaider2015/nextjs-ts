import { NextApiRequest, NextApiResponse } from "next";
import { backendUtils } from "../../../../utils";
import formidable from "formidable";
import jwt from "jsonwebtoken";
import _ from "lodash";
import { PrismaClient } from "@prisma/client";

export const config = {
  api: {
    bodyParser: false,
  },
};


const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse | IError>
) {
  if (req.method !== "POST") {
    res.status(403).json({ message: `${req.method} request is not allowed` });
    return;
  }

  const data: {
    err: string;
    fields: formidable.Fields;
    files: formidable.Files;
  } = await backendUtils.normalizeData(req);

  let { token } = data.fields;
  let decodedAccessToken: any = null;
  let secret = process.env.SECRET_KEY || '';
  try {
    decodedAccessToken = jwt.verify(token.toString(), secret);
  } catch (error: any) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(400).json({
        message: "You token is expired please login",
      });
    } else if (error instanceof jwt.NotBeforeError) {
      res.status(400).json({
        message: "Not Before Time Error",
      });
    } else if (error instanceof jwt.JsonWebTokenError) {
      res.status(400).json({
        message: "Invalid token, Please provide a valid token",
      });
    } else {
      res.status(400).json({
        message: "Something wrong happened with token",
      });
    }

    return;
  }
  
  let email = decodedAccessToken.email;
  let user = await prisma.user
  .findMany({
    where: {
      email: email.toString(),
    },
  });

  if(!user || _.isEmpty(user))
  {
    res.status(400).json({
      message: 'User not found against this token'
    })
    return
  }
  delete decodedAccessToken['iat'];
  delete decodedAccessToken['exp'];
  const tokens = backendUtils.generatesToken(decodedAccessToken, 2)

  res.status(200).json({
    ...tokens,
    accessTokenExpiry: 60*2,
  });
}

interface IResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiry: number;
}
interface IError {
  message: string;
}
