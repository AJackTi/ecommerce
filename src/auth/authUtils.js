"use strict";

const { findByUserID } = require("../services/keyToken.service");

const { AuthFailureError, NotFoundError } = require("../core/error.response");

const JWT = require("jsonwebtoken");
const { asyncHandler } = require("../helpers/asyncHandler");

const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  AUTHORIZATION: "authorization",
};

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    // accessToken
    const accessToken = await JWT.sign(payload, publicKey, {
      // algorithm: "RS256",
      expiresIn: "2 days",
    });

    const refreshToken = await JWT.sign(payload, privateKey, {
      // algorithm: "RS256",
      expiresIn: "7 days",
    });

    JWT.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.error(`error verify: `, err);
      } else {
        console.log(`decode verify: `, decode);
      }
    });

    return { accessToken, refreshToken };
  } catch (error) {}
};

const authentication = asyncHandler(async (req, res, next) => {
  /*
  1. Check userID exists
  2. Get accessToken
  3. verifyToken
  4. check user in db
  5. check keyStore with this userID
  */

  const userID = req.headers[HEADER.CLIENT_ID];
  if (!userID) throw new AuthFailureError("Invalid Request");

  const keyStore = await findByUserID(userID);
  if (!keyStore) throw new NotFoundError("Not found keyStore");

  const accessToken = req.headers[HEADER.AUTHORIZATION];
  if (!accessToken) throw new AuthFailureError("Invalid Request");

  try {
    const decodeUser = JWT.verify(accessToken, keyStore.publicKey);
    if (userID !== decodeUser.userID)
      throw new AuthFailureError("Invalid UserID");
    req.keyStore = keyStore;
    return next();
  } catch (error) {
    throw error;
  }
});

module.exports = {
  createTokenPair,
  authentication,
};
