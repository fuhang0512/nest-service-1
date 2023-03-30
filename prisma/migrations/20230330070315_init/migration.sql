-- CreateTable
CREATE TABLE "Log" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "user_agent" TEXT NOT NULL,
    "uri" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "params" TEXT NOT NULL,
    "create_by" TEXT NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);
