import prisma from "./db.config";

export const getAllUsersBasicDetails = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      name: true,
    },
  });
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        posts: {
          include: {
            comments: true,
            likes: true,
            notifications: true,
          },
        },
        comments: {
          include: {
            notifications: true,
          },
        },
        likes: {
          include: {
            post: true,
          },
        },
        followers: true,
        following: true,
        notifications: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    throw error;
  }
};
