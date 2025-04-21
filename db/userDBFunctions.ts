import prisma from "./db.config"; // or wherever your Prisma client is

export const getAllUsersBasicDetails = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      name: true,
    },
  });
};
