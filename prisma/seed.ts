import prisma from "../src/lib/prisma";

async function main(){

    const emailid1 = process.env.EMAILID_1 as string;
    const emailid2 = process.env.EMAILID_2 as string;

    if(!emailid1&&!emailid2){
        return;
    }

    const upsertUser1 = await prisma.user.upsert({
        where:{
            email: emailid1,
        },
        update:{
            minutesLeft:{
                upsert:{
                    where:{
                        user:{
                            email: emailid1
                        }
                    },
                    update:{
                        minutes:10000
                    },
                    create:{
                        minutes:10000
                    }
                }
            }
        },
        create:{
            name:"Random1",
            email:emailid1,
        }
    })

    const upsertUser2 = await prisma.user.upsert({
        where:{
            email: emailid2,
        },
        update:{
            minutesLeft:{
                upsert:{
                    where:{
                        user:{
                            email: emailid2
                        }
                    },
                    update:{
                        minutes:10000
                    },
                    create:{
                        minutes:10000
                    }
                }
            }
        },
        create:{
            name:"Random2",
            email:emailid2,
        }
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