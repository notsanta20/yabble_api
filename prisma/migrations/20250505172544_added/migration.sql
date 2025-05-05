/*
  Warnings:

  - You are about to drop the column `userAID` on the `FriendsList` table. All the data in the column will be lost.
  - You are about to drop the column `userBID` on the `FriendsList` table. All the data in the column will be lost.
  - You are about to drop the column `userAID` on the `Requests` table. All the data in the column will be lost.
  - You are about to drop the column `userBID` on the `Requests` table. All the data in the column will be lost.
  - Added the required column `userAId` to the `FriendsList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userBId` to the `FriendsList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactId` to the `Messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiverId` to the `Messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `Messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userAId` to the `Requests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userBId` to the `Requests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FriendsList" DROP CONSTRAINT "FriendsList_userAID_fkey";

-- DropForeignKey
ALTER TABLE "FriendsList" DROP CONSTRAINT "FriendsList_userBID_fkey";

-- DropForeignKey
ALTER TABLE "Requests" DROP CONSTRAINT "Requests_userAID_fkey";

-- DropForeignKey
ALTER TABLE "Requests" DROP CONSTRAINT "Requests_userBID_fkey";

-- AlterTable
ALTER TABLE "FriendsList" DROP COLUMN "userAID",
DROP COLUMN "userBID",
ADD COLUMN     "userAId" TEXT NOT NULL,
ADD COLUMN     "userBId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Messages" ADD COLUMN     "contactId" TEXT NOT NULL,
ADD COLUMN     "receiverId" TEXT NOT NULL,
ADD COLUMN     "senderId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Requests" DROP COLUMN "userAID",
DROP COLUMN "userBID",
ADD COLUMN     "userAId" TEXT NOT NULL,
ADD COLUMN     "userBId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Requests" ADD CONSTRAINT "Requests_userAId_fkey" FOREIGN KEY ("userAId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requests" ADD CONSTRAINT "Requests_userBId_fkey" FOREIGN KEY ("userBId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendsList" ADD CONSTRAINT "FriendsList_userAId_fkey" FOREIGN KEY ("userAId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendsList" ADD CONSTRAINT "FriendsList_userBId_fkey" FOREIGN KEY ("userBId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "FriendsList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
