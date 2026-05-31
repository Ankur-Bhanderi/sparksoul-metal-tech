const { PrismaClient } = require("@prisma/client");

async function migrateData() {
  console.log("Starting data migration from Supabase to Render...");
  
  // Connect to Supabase
  const sourcePrisma = new PrismaClient({
    datasourceUrl: "postgresql://postgres:%23SparkSoulMetal@db.tkavbbgvbkekdidftpcv.supabase.co:5432/postgres"
  });

  // Connect to Render (External URL)
  const destPrisma = new PrismaClient({
    datasourceUrl: "postgresql://sparksoul_db_user:a1FYWfW80JF3xbMve5w0AfS40cPa5r7u@dpg-d8e4m468bjmc73ap0fj0-a.oregon-postgres.render.com/sparksoul_db"
  });

  try {
    // 1. Ensure schema exists on Render by pushing it
    console.log("Pushing schema to Render database...");
    const { execSync } = require('child_process');
    execSync('npx prisma db push', { 
      env: { ...process.env, DATABASE_URL: "postgresql://sparksoul_db_user:a1FYWfW80JF3xbMve5w0AfS40cPa5r7u@dpg-d8e4m468bjmc73ap0fj0-a.oregon-postgres.render.com/sparksoul_db" },
      stdio: 'inherit'
    });

    // 2. Read all data from Supabase
    console.log("Reading data from Supabase...");
    const users = await sourcePrisma.user.findMany();
    const categories = await sourcePrisma.category.findMany();
    const products = await sourcePrisma.product.findMany();
    const inquiries = await sourcePrisma.inquiry.findMany();
    const settings = await sourcePrisma.setting.findMany();

    // 3. Write all data to Render
    console.log("Writing data to Render...");
    
    // Create users if not exist
    for (const u of users) {
      await destPrisma.user.upsert({
        where: { id: u.id },
        update: {},
        create: u
      });
    }

    for (const c of categories) {
      await destPrisma.category.upsert({
        where: { id: c.id },
        update: {},
        create: c
      });
    }

    for (const p of products) {
      await destPrisma.product.upsert({
        where: { id: p.id },
        update: {},
        create: p
      });
    }

    for (const i of inquiries) {
      await destPrisma.inquiry.upsert({
        where: { id: i.id },
        update: {},
        create: i
      });
    }

    for (const s of settings) {
      await destPrisma.setting.upsert({
        where: { id: s.id },
        update: {},
        create: s
      });
    }

    console.log("Migration complete! Copied " + users.length + " users.");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await sourcePrisma.$disconnect();
    await destPrisma.$disconnect();
  }
}

migrateData();
