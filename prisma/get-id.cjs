const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const classType = await prisma.classType.findFirst({
    where: { name: 'Uncategorized' },
  });
  console.log(classType ? classType.id : 'NOT_FOUND');
  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
