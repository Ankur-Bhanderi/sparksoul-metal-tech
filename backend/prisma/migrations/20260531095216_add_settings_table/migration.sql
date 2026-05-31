-- CreateTable
CREATE TABLE "Setting" (
    "id" TEXT NOT NULL DEFAULT 'global',
    "smtpEmail" TEXT,
    "smtpPassword" TEXT,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);
