"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("convex/server");
var values_1 = require("convex/values");
exports.default = (0, server_1.defineSchema)({
    chatRecord: (0, server_1.defineTable)({
        chatID: values_1.v.number(),
        userEmail: values_1.v.string(),
        psychologistEmail: values_1.v.string(),
    }).index("chatID", ["chatID"]),
});
