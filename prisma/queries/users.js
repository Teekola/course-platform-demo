import prisma from '../prisma';

// GET
const getUser = async id => prisma.user.findUnique({
    where: {
        id
    }
})

const getUsers = async () => prisma.user.findMany();


// POST

// Create a new user with the data from the obj
const createUser = async obj => prisma.user.create({
    data: obj
});

// DELETE
const deleteUser = async id => prisma.user.delete({
    where: {
        id
    }
});


const deleteAllUsers = async () => prisma.user.deleteMany();

export { getUser, getUsers, createUser, deleteUser, deleteAllUsers };