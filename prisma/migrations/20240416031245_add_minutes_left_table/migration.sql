-- CreateTable
CREATE TABLE "MinutesLeft" (
    "id" TEXT NOT NULL,
    "minutes" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "MinutesLeft_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MinutesLeft_userId_key" ON "MinutesLeft"("userId");

-- AddForeignKey
ALTER TABLE "MinutesLeft" ADD CONSTRAINT "MinutesLeft_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
