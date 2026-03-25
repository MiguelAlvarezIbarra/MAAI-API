/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `lastname` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(400)` to `VarChar(205)`.
  - You are about to drop the `tasks` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `lastname` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `refreshToken` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_user_id_fkey";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "createdAt",
ADD COLUMN     "created_dt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "hash" TEXT,
ADD COLUMN     "rol_id" INTEGER,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "lastname" SET NOT NULL,
ALTER COLUMN "lastname" SET DATA TYPE VARCHAR(205),
ALTER COLUMN "username" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "refreshToken" SET NOT NULL,
ALTER COLUMN "refreshToken" SET DEFAULT '',
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "tasks";

-- CreateTable
CREATE TABLE "Rol" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(200) NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "description" VARCHAR(200) NOT NULL,
    "priority" BOOLEAN NOT NULL,
    "created_dt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "Rol"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
