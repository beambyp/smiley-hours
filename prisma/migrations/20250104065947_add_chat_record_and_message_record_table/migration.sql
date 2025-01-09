-- CreateTable
CREATE TABLE "ChatRecord" (
    "chatID" SERIAL NOT NULL,
    "userEmail" TEXT NOT NULL,
    "psychologistEmail" TEXT NOT NULL,

    CONSTRAINT "ChatRecord_pkey" PRIMARY KEY ("chatID")
);

-- CreateTable
CREATE TABLE "MessageRecord" (
    "messageID" SERIAL NOT NULL,
    "chatID" INTEGER NOT NULL,
    "senderEmail" TEXT NOT NULL,
    "messageContent" TEXT NOT NULL,
    "messageDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MessageRecord_pkey" PRIMARY KEY ("messageID")
);

-- AddForeignKey
ALTER TABLE "MessageRecord" ADD CONSTRAINT "MessageRecord_chatID_fkey" FOREIGN KEY ("chatID") REFERENCES "ChatRecord"("chatID") ON DELETE RESTRICT ON UPDATE CASCADE;
