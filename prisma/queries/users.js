import prisma from '../prisma';

// GET
const getUser = async email => prisma.user.findUnique({
    where: {
        email: email
    }
})

const getUsers = async () => prisma.user.findMany();


// POST

// Create a new user with the data from the obj
const createUser = async (obj) => prisma.user.create({
    data: obj
});

export { getUser, getUsers, createUser };