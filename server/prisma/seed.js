import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database with updated names...');

  // Clean existing tables
  await prisma.activityLog.deleteMany({});
  await prisma.authLog.deleteMany({});
  await prisma.billingRecord.deleteMany({});
  await prisma.exam.deleteMany({});
  await prisma.subject.deleteMany({});
  await prisma.student.deleteMany({});
  await prisma.teacher.deleteMany({});
  await prisma.parent.deleteMany({});
  await prisma.user.deleteMany({});

  // 1. Create Users & Profiles
  // Admin / Owner
  const owner = await prisma.user.create({
    data: {
      email: 'owner@school.edu',
      password: 'password123',
      name: 'ADMIN',
      role: 'OWNER',
      avatar: 'AD',
      department: 'Administration',
    },
  });

  // Principal
  const principal = await prisma.user.create({
    data: {
      email: 'principal@school.edu',
      password: 'password123',
      name: 'Principal',
      role: 'PRINCIPAL',
      avatar: 'PR',
      department: 'Academic Operations',
    },
  });

  // Registrar Office
  const registrar = await prisma.user.create({
    data: {
      email: 'registrar@school.edu',
      password: 'password123',
      name: 'Registrar Office',
      role: 'REGISTRAR',
      avatar: 'RO',
      department: 'Registrar & Student Records',
    },
  });

  // Teachers (Sajith, Rehan, Amal, Siriwardhane)
  const teacherSajith = await prisma.user.create({
    data: {
      email: 'teacher@school.edu',
      password: 'password123',
      name: 'Sajith',
      role: 'TEACHER',
      avatar: 'SA',
      department: 'Mathematics',
    },
  });

  await prisma.teacher.create({
    data: {
      userId: teacherSajith.id,
      department: 'Mathematics',
      specialization: 'Calculus & Algebra',
    },
  });

  const teacherRehan = await prisma.user.create({
    data: {
      email: 'rehan@school.edu',
      password: 'password123',
      name: 'Rehan',
      role: 'TEACHER',
      avatar: 'RE',
      department: 'Biology',
    },
  });

  await prisma.teacher.create({
    data: {
      userId: teacherRehan.id,
      department: 'Biology',
      specialization: 'Cellular Biology',
    },
  });

  // Parents (Amitha, Supuni, Ajith) & Students (Ruwin, Tharin, Amoda, Hasini)
  const parentAmitha = await prisma.user.create({
    data: {
      email: 'parent@gmail.com',
      password: 'password123',
      name: 'Amitha',
      role: 'PARENT',
      avatar: 'AM',
    },
  });

  const parentProfileAmitha = await prisma.parent.create({
    data: {
      userId: parentAmitha.id,
      phone: '+94 77 123 4567',
    },
  });

  const studentRuwin = await prisma.user.create({
    data: {
      email: 'student@school.edu',
      password: 'password123',
      name: 'Ruwin',
      role: 'STUDENT',
      avatar: 'RU',
    },
  });

  await prisma.student.create({
    data: {
      userId: studentRuwin.id,
      grade: 'Grade 10',
      parentId: parentProfileAmitha.id,
    },
  });

  // 2. Activity Logs
  await prisma.activityLog.createMany({
    data: [
      {
        role: 'TEACHER',
        user: 'Sajith (Mathematics)',
        actionDescription: 'Submitted "Spring 2026 Math Final" exam papers for Grade 11-B.',
        timestamp: new Date('2026-03-12T14:22:01Z'),
      },
      {
        role: 'PARENT',
        user: 'Amitha (Ruwin)',
        actionDescription: 'Cleared Tuition Fees for Q1 2026 via Credit Card. Transaction #8822.',
        timestamp: new Date('2026-03-12T13:45:12Z'),
      },
      {
        role: 'STUDENT',
        user: 'Ruwin (Grade 10)',
        actionDescription: 'Late submission: "Historical Context of Rome" Assignment. Flagged: Late.',
        timestamp: new Date('2026-03-12T11:10:44Z'),
      },
      {
        role: 'SYSTEM',
        user: 'PostgreSQL Worker',
        actionDescription: 'Automatic database indexing completed. Reclaiming 2.4GB space.',
        timestamp: new Date('2026-03-12T09:00:00Z'),
      },
      {
        role: 'TEACHER',
        user: 'Rehan (Biology)',
        actionDescription: 'Marked attendance for "Cell Division" lecture. 3 absentees noted.',
        timestamp: new Date('2026-03-12T08:32:15Z'),
      },
    ],
  });

  // 3. Auth Logs
  await prisma.authLog.createMany({
    data: [
      {
        status: 'AUTH_OK',
        message: 'owner@school.edu authorized session.',
        timestamp: new Date('2026-03-12T03:45:11Z'),
      },
      {
        status: 'AUTH_WARN',
        message: 'Failed login attempt from IP 192.168.1.44 (Student).',
        ip: '192.168.1.44',
        timestamp: new Date('2026-03-12T02:12:04Z'),
      },
      {
        status: 'AUTH_OK',
        message: 'SysWorker rotation of security tokens completed.',
        timestamp: new Date('2026-03-12T01:05:00Z'),
      },
      {
        status: 'AUTH_OK',
        message: 'admin session refreshed.',
        timestamp: new Date('2026-03-12T00:12:12Z'),
      },
    ],
  });

  console.log('✅ Database seeded successfully with custom names and exact emails!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
