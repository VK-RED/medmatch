import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  console.log("Prisma Client Initialized !!")
  return new PrismaClient()
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();



if(process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;

export default prisma