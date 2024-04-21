import prisma from "../src/lib/prisma";

async function main(){

    const emailid1 = process.env.EMAILID_1 as string;
    const emailid2 = process.env.EMAILID_2 as string;

    const userIds = await prisma.user.findMany({
        where:{
            email:emailid1 || emailid2,
        },
        select:{
            id:true,
        }
    })

    userIds.forEach(async (u)=>{
        await prisma.minutesLeft.update({
            where:{
                userId:u.id
            },
            data:{
                minutes:10000
            }
        })
    })
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