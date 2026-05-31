import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = "bhanderiankur@gmail.com";
  const password = "#BHANDERI";
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      role: 'ADMIN',
      isVerified: true,
    },
    create: {
      name: "Admin Bhanderi",
      email: email,
      password: hashedPassword,
      role: 'ADMIN',
      isVerified: true,
    }
  });

  console.log("Admin user created/updated successfully! Email:", user.email, "Role:", user.role);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
