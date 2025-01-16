import { defineSchema , defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
    messageRecord: defineTable({
        messageID: v.number(), 
        chatID: v.number(), 
        senderEmail: v.string(), 
        content: v.string(), 
        timestamp: v.string(),   
    }).index("chatID", ["chatID"]),
});
