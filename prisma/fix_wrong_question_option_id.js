import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const loop1 = {
    {
        question_id: 29,
        increment: 5
    }


    30, 31, 32, 34, 35, 36

}

loop1.map((q, i = 1, u) => {
    prisma.responses.updateMany({
        where: {
            question_id: q,
        },
        data: {
            question_option_id += i*6,
        }
    })
    i++;
})
