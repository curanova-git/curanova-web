import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()
 
async function main() {
  console.log('Seeding database...')

  // Create HR Admin user (hr@curanova.ai)
  const hrPasswordHash = await bcrypt.hash('curanova-hr-2024', 10)

  const hrAdmin = await prisma.hRAdmin.upsert({
    where: { email: 'hr@curanova.ai' },
    update: {},
    create: {
      email: 'hr@curanova.ai',
      passwordHash: hrPasswordHash,
      name: 'HR Admin',
    },
  })
  console.log('Created HR Admin:', hrAdmin.email)

  // Create sample jobs (migrate from existing site.json positions)
  const jobs = [
    {
      title: 'Senior AI/ML Engineer',
      department: 'Engineering',
      location: 'Remote / India',
      type: 'Full-time',
      description: 'Build and optimize AI models for clinical decision support and genomic analysis. Work with cutting-edge machine learning technologies to transform healthcare.',
      requirements: JSON.stringify([
        '5+ years experience in ML/AI development',
        'Strong Python and TensorFlow/PyTorch skills',
        'Experience with healthcare or genomics data',
        'MS/PhD in Computer Science or related field preferred',
      ]),
      status: 'PUBLISHED',
    },
    {
      title: 'Full Stack Developer',
      department: 'Engineering',
      location: 'Remote / India',
      type: 'Full-time',
      description: 'Develop scalable web applications for our healthcare intelligence platforms. Build user interfaces and APIs that power clinical decision support systems.',
      requirements: JSON.stringify([
        '3+ years experience with React/Next.js',
        'Strong TypeScript and Node.js skills',
        'Experience with cloud services (AWS/GCP)',
        'Understanding of healthcare data standards (FHIR, HL7)',
      ]),
      status: 'PUBLISHED',
    },
    {
      title: 'Clinical Informatics Specialist',
      department: 'Clinical',
      location: 'Kerala, India',
      type: 'Full-time',
      description: 'Bridge the gap between clinical workflows and technology solutions. Help design and implement clinical decision support systems that improve patient care.',
      requirements: JSON.stringify([
        'Clinical background (MD, RN, or clinical degree)',
        '3+ years healthcare IT experience',
        'Knowledge of EMR systems and clinical workflows',
        'Strong communication and project management skills',
      ]),
      status: 'PUBLISHED',
    },
    {
      title: 'Genomics Data Scientist',
      department: 'Research',
      location: 'Remote / USA',
      type: 'Full-time',
      description: 'Analyze and interpret genomic data to drive precision medicine insights. Develop algorithms for variant interpretation and pharmacogenomics analysis.',
      requirements: JSON.stringify([
        'PhD in Bioinformatics, Genomics, or related field',
        'Experience with NGS data analysis pipelines',
        'Proficiency in R, Python, and bioinformatics tools',
        'Publications in genomics/bioinformatics preferred',
      ]),
      status: 'PUBLISHED',
    },
  ]

  for (const job of jobs) {
    const created = await prisma.job.upsert({
      where: { id: job.title.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-') },
      update: job,
      create: {
        id: job.title.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-'),
        ...job,
      },
    })
    console.log('Created job:', created.title)
  }

  console.log('Seeding completed!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
