import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      // retrieving from cookies
      req.cookies?.accessToken ||
      // retrieving from header where "Bearer <token>" is passed
      // here replace method is removing the "Bearer " by replace method
      req.header("Authorization")?.replace("Bearer ", "");
    
      console.log("token", token);

    if (!token) {
      throw new ApiError(401, "Unauthorised request.");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
