// test-prisma.js
// prisma/test-insert.js
const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      username: 'testuser4',
      password: 'password123',
      mobile: '0812345678',     // ต้อง 10 ตัว
      cardId: '1234567890123'   // ต้อง 13 ตัว
    }
  })
  console.log('Created user:', user)
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect())