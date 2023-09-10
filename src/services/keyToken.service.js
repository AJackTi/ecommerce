"use strict";

const keyTokenModel = require("../models/keyToken.model");

class KeyTokenService {
  static createKeyToken = async ({
    userID,
    privateKey,
    publicKey,
    refreshToken,
  }) => {
    try {
      // level 0
      // const tokens = await keyTokenModel.create({
      //   user: userID,
      //   privateKey,
      //   publicKey,
      // });
      // return tokens ? tokens.publicKey : null;

      // level xxx
      const filter = { user: userID },
        update = { publicKey, privateKey, refreshTokenUsed: [], refreshToken },
        options = { upsert: true, new: true };
      const tokens = await keyTokenModel.findOneAndUpdate(
        filter,
        update,
        options
      );

      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  };
}

module.exports = KeyTokenService;
