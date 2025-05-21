import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("123456", 10);
  const adminPassword = await bcrypt.hash("admin123", 10);

  // Criar usuário normal
  const user = await prisma.user.upsert({
    where: { email: "teste@exemplo.com" },
    update: {},
    create: {
      email: "teste@exemplo.com",
      name: "Usuário Teste",
      password,
      role: "USER",
    },
  });

  // Criar admin 1
  const admin1 = await prisma.user.upsert({
    where: { email: "admin1@exemplo.com" },
    update: {},
    create: {
      email: "admin1@exemplo.com",
      name: "Admin Principal",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  // Criar admin 2
  const admin2 = await prisma.user.upsert({
    where: { email: "admin2@exemplo.com" },
    update: {},
    create: {
      email: "admin2@exemplo.com",
      name: "Admin Secundário",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  console.log({ user, admin1, admin2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
