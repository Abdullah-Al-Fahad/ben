import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const sections = [
      {
        name: 'intro-hero',
        content: JSON.stringify({
          heroText: 'Train to Win',
          videoUrl: 'https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68e43e0279ad2b357d6c0f43_homepageclipwarrior-transcode.mp4',
          title: `Join our world class mma training programs for all levels - from beginners to pros.`,
          description: `Our gym has had both a local and a national presence since its founding in 2011, however its roots go much deeper. Our Team has been training and competing across the world in multiple combat sports to bring you the best instruction available. We are athletes, hobbyists, competitors, students and professionals. We strive to learn and grow while pushing others around us to do the same. We are people who always are working to improve ourselves and our community.`,
          subtitle: `We are a family, and we are a team.`,
        }),
      },
      {
        name: 'features',
        content: JSON.stringify({
          disciplines: [
            { name: 'Brazillian Jiu-Jitsu', href: '/disciplines/jutsu' },
            { name: 'Muay Thai', href: '/disciplines/mua-thai' },
            { name: 'Mixed Martial Arts', href: '/disciplines/mma' },
            { name: 'Fitness', href: '/disciplines/fitness' },
          ],
          gymFeatures: [
            'Access to Open Gym',
            'Recovery and Wellness Facilities',
            'Open 6 Days / Week',
            '12 Trainers',
            '23 World Medals',
            '1478 Happy Clients',
          ],
          description:
            `We are students, athletes, and builders of our team. Warrior Fitness Center is home to a diverse and dedicated community united by our shared pursuit of growth through martial arts. Our training blends Brazillian Jiu-Jitsu, Muay Thai, Wrestling, Judo, and MMA to foster personal development, confidence, and discipline in an atmosphere that feels like family.
Our coaching staff reflects the diversity of our community, each bringing a wealth of experience from different walks of life. This variety isn’t just a point of pride; it’s a strength that enriches our students’ learning. With coaches who’ve lived through high-level competition, military service, and personal transformation, we offer perspectives that go beyond the technical and into the mental, emotional, and strategic dimensions of martial arts.
Whether you’re just starting your journey or looking to sharpen your edge, you’ll find guidance, accountability, and support here. We are a team that trains, learns, and grows together—while pushing each other toward the next accomplishment in life.`,
          subtitle: 'We are a family, and we are a team.',
        }),
      },
      {
        name: 'core-values',
        content: JSON.stringify({
          title: 'Are We Right For You',
          description:
            `At Warrior, we recognize that every student walks through our doors with a unique set of goals, motivations, and reasons for training. Some come to compete, some to get in shape, some for self-defense, and others to find structure or community. We believe wholeheartedly that these goals don’t need to be the same for us to support one another. In fact, it’s the diversity of those goals—and the shared commitment to growth—that makes our community strong.
We approach training with a mindset rooted in collaboration, not transaction. It’s not about what you get in return—it’s about how we all grow stronger by investing in each other. When one person levels up, we all benefit. When one person struggles, we all step in.`,
          values: [
            { title: 'Realism', description: 'We train for real life. The foundation of our practice is self-defense and practical application—not gamesmanship.' },
            { title: 'Growth Mindset', description: 'We believe that who you are today doesn’t define who you can become.' },
            { title: 'Respect', description: 'Even when it’s not obvious, respect is always present.' },
            { title: 'Safety', description: 'Training is only sustainable when we take care of each other.' },
            { title: 'Diversity', description: 'We embrace different styles, and perspectives.' },
            { title: 'Cohesion', description: 'We are individuals, but we train as one team.' },
          ],
        }),
      },
    ];

    for (const section of sections) {
        await prisma.landingPageSection.upsert({
            where: { name: section.name },
            update: { content: section.content },
            create: { name: section.name, content: section.content },
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