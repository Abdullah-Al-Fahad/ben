import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const disciplines = await prisma.discipline.findMany();

  if (disciplines.length === 0) {
    await prisma.discipline.create({
      data: {
        name: 'Muay Thai',
        slug: 'mua-thai',
        heroImage: 'https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68f1701389a222b62a80b254_mt_header_2.jpg',
        heroTitle: 'THE ART OF MUAY THAI',
        description: `Muay Thai, known as the “Art of Eight Limbs,” is one of the most versatile and effective striking systems in the world. Practitioners learn to use punches, kicks, knees, elbows, and clinch work to create a complete striking arsenal. This well-rounded approach not only builds physical skill and conditioning, but also provides a strong foundation for athletes pursuing success in combat sports, mixed martial arts, or overall fitness and self-defense.
At Warrior, our Muay Thai program blends the traditional roots of the art with modern applications. Classes are structured to teach authentic striking techniques while also relating them to what has proven effective across other combat disciplines, such as MMA. We emphasize proper form, the development of solid movement patterns, and a safe training environment so that students of all ages and experience levels can progress with confidence.
We are an official affiliate of Classic Muay Thai, led by coach Tyler Wombles. This system is built on ring-tested fundamentals—balanced stance and footwork, layered defense (parry/check/frame), clean kick and knee mechanics, efficient elbow entries, and disciplined clinch posture and off-balancing—producing success for athletes from beginners to high-level competitors. We incorporate Classic’s curriculum cycles, padwork templates, bag tasks, and sparring protocols, along with shared terminology, film study, and cornering standards, so your day-one fundamentals scale seamlessly into advanced tactics and MMA integration. This affiliation keeps our training current, consistent, and accountable, while giving students access to a proven roadmap for developing real fight IQ and results.Our philosophy of training is guided by the Warrior mission: to use martial arts as a vehicle for growth, both personally and professionally. Every class is designed to be practical, useful, and universally applicable. We view Muay Thai through three essential lenses:`,
        sections: JSON.stringify([
          {
            title: 'STREET',
            content: 'Training is grounded in real-world applicability. While rules exist in sport and training for safety, our focus is on adaptability beyond any one ruleset, preparing students for practical scenarios.',
          },
          {
            title: 'SPORT',
            content: 'Competition provides structure and feedback. Whether in controlled drilling or live events, improvement takes priority over temporary outcomes, ensuring lasting growth.',
          },
          {
            title: 'ART',
            content: 'At its heart, Muay Thai is a journey. Students train not only for performance but for the joy of practice, the pursuit of truth in technique, and the challenge of self-discovery.',
          },
        ]),
      },
    });
  }

  const video = await prisma.video.findFirst();

  if (!video) {
    await prisma.video.create({
      data: {
        url: '/123.mp4',
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
