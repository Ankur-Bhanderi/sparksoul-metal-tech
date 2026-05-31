const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.setting.upsert({
    where: { id: "global" },
    update: {
      smtpHost: "smtp.resend.com",
      smtpPort: 465,
      smtpEmail: "resend",
      smtpPassword: "re_3sx1S5p4_Laq57yaMLscwVKURhgNP2ZKD"
    },
    create: {
      id: "global",
      smtpHost: "smtp.resend.com",
      smtpPort: 465,
      smtpEmail: "resend",
      smtpPassword: "re_3sx1S5p4_Laq57yaMLscwVKURhgNP2ZKD"
    }
  });
  console.log("Resend settings injected into database successfully!");
}

main().finally(() => prisma.$disconnect());
