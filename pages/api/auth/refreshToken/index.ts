import { NextApiRequest, NextApiResponse } from "next";
import { backendUtils } from "../../../../utils";
import formidable from "formidable";
import jwt from "jsonwebtoken";
import _ from "lodash";

export const config = {
  api: {
    bodyParser: false,
  },
};

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
  let secret = "It is my secret";
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

  // let currentTimeStamp = Math.floor(Date.now() / 1000);
  // let refreshTokenExipry = Math.floor(decodedAccessToken?.exp);

  // if (refreshTokenExipry < currentTimeStamp) {
  //   res.status(400).json({
  //     message: "Refresh Token is expired, Please login",
  //   });
  //   return;
  // }

  console.log("Data sss ", decodedAccessToken)
  delete decodedAccessToken['iat'];
  delete decodedAccessToken['exp'];
  console.log("Data sss After ", decodedAccessToken)
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
