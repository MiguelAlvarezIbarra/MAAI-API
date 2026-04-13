-- CreateTable
CREATE TABLE "Log" (
    "id" SERIAL NOT NULL,
    "statusCode" INTEGER NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "path" VARCHAR(200) NOT NULL,
    "error" VARCHAR(500) NOT NULL,
    "errorCode" VARCHAR(200) NOT NULL,
    "session_id" INTEGER,
    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;