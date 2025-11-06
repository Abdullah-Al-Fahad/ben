import { PrismaClient } from '@prisma/client';
import { main as seedSchedule } from './seed-schedule.ts';
import { seedDisciplines } from './seed-disciplines.ts';

const prisma = new PrismaClient();

async function main() {
  // Seed OurGym
  const ourGym = await prisma.ourGym.findFirst();
  if (!ourGym) {
    await prisma.ourGym.create({
      data: {
        title: 'Our Gym',
        content: 'Our gym has had both a local and a national presence since its founding in 2011, however its roots go much deeper. Our Team has been training and competing across the world in multiple combat sports to bring you the best instruction available. We are athletes, hobbyists, competitors, competitors, students and professionals. We strive to learn and grow while pushing others around us to do the same. We are people who always are working to improve ourselves and our community. We are a family, and we are a team.',
        imageUrl: 'https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68e43e0279ad2b357d6c0f2d_Large_Banner.webp',
      },
    });
  }

  await seedSchedule();
  await seedDisciplines();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });