const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient()

async function testConstraints() {
  console.log('=== ทดสอบ Constraints ===')
  
  // ทดสอบ 1: ข้อมูลถูกต้อง (ควรสำเร็จ)
  console.log('\n1. ทดสอบข้อมูลถูกต้อง:')
  try {
    const user1 = await prisma.user.create({
      data: {
        username: 'validuser',
        password: 'password123',
        mobile: '0812345678',      // 10 ตัว ✅
        cardId: '1234567890123'    // 13 ตัว ✅
      }
    })
    console.log('✅ สำเร็จ:', user1)
  } catch (error) {
    console.log('❌ ผิดพลาด:', error.message)
  }

  // ทดสอบ 2: mobile เกิน 10 ตัว (ควรเกิด error)
  console.log('\n2. ทดสอบ mobile เกิน 10 ตัว:')
  try {
    const user2 = await prisma.user.create({
      data: {
        username: 'testuser2',
        password: 'password123',
        mobile: '08123456789',     // 11 ตัว ❌ ควรเกิด error
        cardId: '1234567890123'
      }
    })
    console.log('⚠️  ไม่ควรสำเร็จ:', user2)
  } catch (error) {
    console.log('✅ เกิด error ถูกต้อง:', error.message)
  }

  // ทดสอบ 3: mobile น้อยกว่า 10 ตัว (ควรเกิด error)
  console.log('\n3. ทดสอบ mobile น้อยกว่า 10 ตัว:')
  try {
    const user3 = await prisma.user.create({
      data: {
        username: 'testuser3',
        password: 'password123',
        mobile: '081234567',       // 9 ตัว ❌ ควรเกิด error
        cardId: '1234567890123'
      }
    })
    console.log('⚠️  ไม่ควรสำเร็จ:', user3)
  } catch (error) {
    console.log('✅ เกิด error ถูกต้อง:', error.message)
  }

  // ทดสอบ 4: cardId เกิน 13 ตัว (ควรเกิด error)
  console.log('\n4. ทดสอบ cardId เกิน 13 ตัว:')
  try {
    const user4 = await prisma.user.create({
      data: {
        username: 'testuser4',
        password: 'password123',
        mobile: '0812345678',
        cardId: '12345678901234'   // 14 ตัว ❌ ควรเกิด error
      }
    })
    console.log('⚠️  ไม่ควรสำเร็จ:', user4)
  } catch (error) {
    console.log('✅ เกิด error ถูกต้อง:', error.message)
  }

  // ทดสอบ 5: cardId น้อยกว่า 13 ตัว (ควรเกิด error)
  console.log('\n5. ทดสอบ cardId น้อยกว่า 13 ตัว:')
  try {
    const user5 = await prisma.user.create({
      data: {
        username: 'testuser5',
        password: 'password123',
        mobile: '0812345678',
        cardId: '123456789012'     // 12 ตัว ❌ ควรเกิด error
      }
    })
    console.log('⚠️  ไม่ควรสำเร็จ:', user5)
  } catch (error) {
    console.log('✅ เกิด error ถูกต้อง:', error.message)
  }

  console.log('\n=== เสร็จสิ้นการทดสอบ ===')
}

testConstraints()
  .catch(e => console.error('Error:', e))
  .finally(() => prisma.$disconnect())