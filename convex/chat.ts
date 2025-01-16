import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const sendMessage = mutation({
  args: {
    messageID: v.number(), 
    chatID: v.number(), 
    senderEmail: v.string(), 
    content: v.string(), 
    timestamp: v.string(),   
  },
  handler: async (ctx, args) => {
    console.log("This TypeScript function is running on the server.");
    await ctx.db.insert("messageRecord", {
        messageID: args.messageID,
        chatID: args.chatID,
        senderEmail: args.senderEmail,
        content: args.content,
        timestamp: args.timestamp,
    });
  },
});

export const getMessages = query({
  args: { chatID: v.number() },
  handler: async (ctx, { chatID }) => {
    const messages = await ctx.db
      .query("messageRecord")
      .filter(q => q.eq(q.field("chatID"), chatID))
      .order("desc") 
      .take(50); 
    return messages.reverse();
  },
});