"use strict";

const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
// const crypto = require("crypto");
const crypto = require("node:crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");
const { BadRequestError, ConflictRequestError } = require("../core/error.response");

const RoleShop = {
    SHOP: "SHOP",
    WRITER: "WRITER",
    EDITOR: "EDITOR",
    ADMIN: "ADMIN",
};

class AccessService {
    static signUp = async({ name, email, password }) => {
        try {
            // step 1: check email exist?
            const holderShop = await shopModel.findOne({ email }).lean();
            if (holderShop) {
                throw new BadRequestError('Error: Shop already registered!')
            }

            const passwordHashed = await bcrypt.hash(password, 10);
            const newShop = await shopModel.create({
                name,
                email,
                password: passwordHashed,
                roles: [RoleShop.SHOP],
            });
            if (newShop) {
                // create privateKey, publicKey
                // const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
                //   modulusLength: 4096,
                //   publicKeyEncoding: {
                //     type: "pkcs1",
                //     format: "pem",
                //   },
                //   privateKeyEncoding: {
                //     type: "pkcs1",
                //     format: "pem",
                //   },
                // });
                const privateKey = crypto.randomBytes(64).toString("hex");
                const publicKey = crypto.randomBytes(64).toString("hex");

                console.log({ privateKey, publicKey });

                const keyStore = await KeyTokenService.createKeyToken({
                    userID: newShop._id,
                    privateKey,
                    publicKey,
                });

                if (!keyStore) {
                    return {
                        code: "xxx",
                        message: "keyStore error",
                    };
                }

                // created token pair
                const tokens = await createTokenPair({ userID: newShop._id, email },
                    publicKey,
                    privateKey
                );
                console.log(`Created Token Success:`, tokens);

                return {
                    code: 201,
                    metadata: {
                        shop: getInfoData({
                            fields: ["_id", "_name", "email"],
                            object: newShop,
                        }),
                        tokens,
                    },
                };
            }

            return {
                code: 200,
                metadata: null,
            };
        } catch (error) {
            return {
                code: "xxx",
                message: error.message,
                status: "error",
            };
        }
    };
}

module.exports = AccessService;