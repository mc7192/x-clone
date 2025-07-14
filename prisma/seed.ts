import { PrismaClient, User } from "@prisma/client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenAI } from "@google/genai";

const prisma = new PrismaClient();

async function generateUser(): Promise<User> {
  const ai = new GoogleGenAI({});
  const prompt = `
  Generate a JSON object for a user database with the following fields:
  - id: string (UUID format)
  - email: string (valid email format, no duplicates)
  - username: string (alphanumeric, 5-12 chars)
  - displayName: string (human-readable name)
  - bio: string (10 words about a fictional person)
  - location: string (random real-world city/country)
  - job: string (realistic job title)
  - website: string (valid URL)
  Return ONLY the JSON, without markdown or additional text.
`;
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [prompt],
  });
  const data = response.text?.replace(/^```json|```$/g, "").trim();
  if (!data) throw new Error("No text returned from model");
  const res = JSON.parse(data);
  return res;
}

async function getRandomImageUrl({
  width,
  height,
  query,
}: {
  width: number;
  height: number;
  query: "landscape" | "portrait";
}): Promise<string> {
  const res = await fetch(
    `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=${query}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return `${data.urls.raw}&w=${width}&h=${height}&fit=crop&dpr=2`;
}

async function main() {
  const users = [];
  for (let i = 1; i <= 5; i++) {
    const userData = await generateUser();
    const coverUrl = await getRandomImageUrl({
      width: 1500,
      height: 500,
      query: "landscape",
    });
    const profileUrl = await getRandomImageUrl({
      width: 400,
      height: 400,
      query: "portrait",
    });
    const { id, email, username, displayName, bio, location, job, website } =
      userData;

    // Check if email or username already exists
    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username: userData.username }],
      },
    });

    if (existing) {
      console.log(
        `Skipping duplicate user with email: ${email} or username: ${userData.username}`
      );
      continue; // skip to next iteration
    }

    const user = await prisma.user.create({
      data: {
        id: id,
        email: email,
        username: username,
        displayName: displayName,
        bio: bio,
        location: location,
        job: job,
        website: website,
        cover: coverUrl || "",
        img: profileUrl || "",
      },
    });
    users.push(user);
  }
  console.log(`${users.length} users created.`);

  // Create 5 posts for each user
  const posts = [];
  for (let i = 0; i < users.length; i++) {
    for (let j = 1; j <= 5; j++) {
      const post = await prisma.post.create({
        data: {
          desc: `Post ${j} by ${users[i].username}`,
          userId: users[i].id,
        },
      });
      posts.push(post);
    }
  }
  console.log("Posts created.");

  // Create some follows
  await prisma.follow.createMany({
    data: [
      { followerId: users[0].id, followingId: users[1].id },
      { followerId: users[0].id, followingId: users[2].id },
      { followerId: users[1].id, followingId: users[3].id },
      { followerId: users[2].id, followingId: users[4].id },
      { followerId: users[3].id, followingId: users[0].id },
    ],
  });
  console.log("Follows created.");

  // Create some likes
  await prisma.like.createMany({
    data: [
      { userId: users[0].id, postId: posts[0].id },
      { userId: users[1].id, postId: posts[1].id },
      { userId: users[2].id, postId: posts[2].id },
      { userId: users[3].id, postId: posts[3].id },
      { userId: users[4].id, postId: posts[4].id },
    ],
  });
  console.log("Likes created.");

  // Create some comments (each comment is a post linked to a parent post)
  const comments = [];
  for (let i = 0; i < posts.length; i++) {
    const comment = await prisma.post.create({
      data: {
        desc: `Comment on Post ${posts[i].id} by ${
          users[(i + 1) % 5].username
        }`,
        userId: users[(i + 1) % 5].id,
        parentPostId: posts[i].id, // Linking the comment to the post
      },
    });
    comments.push(comment);
  }
  console.log("Comments created.");

  // Create reposts using the Post model's rePostId
  const reposts = [];
  for (let i = 0; i < posts.length; i++) {
    const repost = await prisma.post.create({
      data: {
        desc: `Repost of Post ${posts[i].id} by ${users[(i + 2) % 5].username}`,
        userId: users[(i + 2) % 5].id, // The user who is reposting
        rePostId: posts[i].id, // Linking to the original post being reposted
      },
    });
    reposts.push(repost);
  }
  console.log("Reposts created.");

  // Create saved posts (users save posts they like)
  await prisma.savedPosts.createMany({
    data: [
      { userId: users[0].id, postId: posts[1].id },
      { userId: users[1].id, postId: posts[2].id },
      { userId: users[2].id, postId: posts[3].id },
      { userId: users[3].id, postId: posts[4].id },
      { userId: users[4].id, postId: posts[0].id },
    ],
  });
  console.log("Saved posts created.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
