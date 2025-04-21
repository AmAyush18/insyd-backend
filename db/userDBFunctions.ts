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

export const followUser = async (followerId: string, followingId: string) => {
  if (followerId === followingId) {
    throw new Error("You cannot follow yourself.");
  }

  const existingFollow = await prisma.follow.findFirst({
    where: {
      followerId,
      followingId,
    },
  });

  if (existingFollow) {
    throw new Error("You are already following this user.");
  }

  const newFollow = await prisma.follow.create({
    data: {
      followerId,
      followingId,
    },
  });

  await prisma.notification.create({
    data: {
      type: "FOLLOW",
      userId: followingId,
    },
  });

  return newFollow;
};

export const createPost = async (title: string, content: string, authorId: string) => {
  return await prisma.post.create({
    data: {
      title,
      content,
      authorId,
    },
  });
};
