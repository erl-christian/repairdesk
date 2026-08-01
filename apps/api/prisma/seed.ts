import "dotenv/config";
import bcrypt from "bcrypt";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const existingAdmin = await prisma.admin.findUnique({
    where: {
      username: "admin",
    },
  });

  if (existingAdmin) {
    console.log("✅ Admin already exists.");
    return;
  }

  const passwordHash = await bcrypt.hash("admin123", 10);

  await prisma.admin.create({
    data: {
      username: "admin",
      email: "admin@repairdesk.local",
      passwordHash,
    },
  });

  console.log("✅ Admin account created successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });