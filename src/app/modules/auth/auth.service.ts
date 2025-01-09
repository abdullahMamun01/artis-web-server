/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../error/AppError";
import { convertObjectIdToId } from "../../utils";
import { compareValidPass, createToken } from "./auth.utils";
import { UserModel } from "../user/user.model";


interface TLogin  {
    email: string;
    password: string;
};

const loginUser = async (payload: TLogin) => {

    const findUserByMail = await UserModel.findOne({ email: payload.email }).lean();
   
    if (!findUserByMail) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        `this email : ${payload.email} is not registered!`,
      );
    }
    const user = convertObjectIdToId(findUserByMail)
    const isValidUser = await compareValidPass(payload.password, user.password);
    if (!isValidUser) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'the password do not match');
    }
    
    const jwtPayload = {
      userId: user.id,
      email: user.email as string,
      role: user.role,
      firstName: user.firstName as string,
      lastName: user.lastName as string,
    };
    //access token generate
    const accessToken = createToken(
      jwtPayload,
      config.accessTokenSecret as string,
      config.access_token_expires_in as string,
    );

    // eslint-disable-next-line no-unused-vars
  
    const { password, ...remainingField } = user;
    return {
      user: convertObjectIdToId(remainingField),
      token: accessToken,
    };
  };


export const AuthService = {
  loginUser,
};