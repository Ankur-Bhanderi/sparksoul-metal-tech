const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const setting = await prisma.setting.findUnique({ where: { id: "global" } });
  console.log("Current DB Settings:");
  console.log("Email:", setting?.smtpEmail);
  console.log("Password:", setting?.smtpPassword ? `[${setting.smtpPassword}] (Length: ${setting.smtpPassword.length})` : "null");
}

main().finally(() => prisma.$disconnect());
