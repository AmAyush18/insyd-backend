import { PrismaClient } from '../generated/prisma'

const prisma = new PrismaClient()

async function main() {
  const users = [
    { name: 'Alice Johnson', username: 'alicej' },
    { name: 'Bob Smith', username: 'bobsmith' },
    { name: 'Charlie Zhang', username: 'charliez' },
    { name: 'Rohan Patel', username: 'rohanp' },
    { name: 'Ethan Kim', username: 'ethank' },
  ]

  for (const user of users) {
    await prisma.user.upsert({
      where: { username: user.username },
      update: {},
      create: user,
    })
  }

  console.log('Seeded 5 users 🌱')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
