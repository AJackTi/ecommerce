"use strict";

const keyTokenModel = require("../models/keyToken.model");

class KeyTokenService {
  static createKeyToken = async ({ userID, privateKey, publicKey }) => {
    try {
      const tokens = await keyTokenModel.create({
        user: userID,
        privateKey,
        publicKey,
      });

      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  };
}

module.exports = KeyTokenService;
