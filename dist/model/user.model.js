"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    name: String,
    phoneNumber: Number,
    imageProfileSRC: String,
    age: Number,
    email: String,
    priority: String,
    problemDescription: String,
    promoDescription: String,
    CURP: String,
    password: String,
    notes: String,
});
//# sourceMappingURL=user.model.js.map