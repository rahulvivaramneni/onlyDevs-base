#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "src", "server", "gigs.json");

function resetDatabase() {
  const defaultData = {
    gigs: [
      {
        id: "1",
        title: "React State Management Issue",
        description:
          "I'm having trouble with React state management in my component. The state is not updating properly when I call setState. I've tried using useState and useEffect but the component keeps re-rendering infinitely. Need help debugging this issue.",
        tags: ["React", "JavaScript", "State Management"],
        bounty: "15",
        status: "open",
        author: "Alice Johnson",
        createdAt: "2024-01-15T10:00:00.000Z",
        mentors: [
          {
            id: "m1",
            name: "Sarah Chen",
            avatar:
              "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
            rating: 5,
            message:
              "I can help you debug this React state issue. I have 5+ years of experience with React and have solved similar problems before.",
            specialties: ["React", "JavaScript", "Frontend"],
          },
          {
            id: "m2",
            name: "Mike Rodriguez",
            avatar:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
            rating: 4,
            message:
              "This looks like a classic dependency array problem. I can walk you through the solution step by step.",
            specialties: ["React", "Hooks", "Debugging"],
          },
        ],
      },
      {
        id: "2",
        title: "Solidity Smart Contract Bug",
        description:
          "My Solidity contract is not working as expected. The function is reverting without any clear error message. I'm trying to implement a simple ERC-20 token but the transfer function keeps failing. Need help debugging this blockchain issue.",
        tags: ["Solidity", "Smart Contracts", "Ethereum"],
        bounty: "25",
        status: "open",
        author: "Bob Smith",
        createdAt: "2024-01-15T11:00:00.000Z",
        mentors: [
          {
            id: "m3",
            name: "Alex Kim",
            avatar:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
            rating: 5,
            message:
              "I specialize in Solidity smart contracts. Let me help you debug this issue and optimize your contract.",
            specialties: ["Solidity", "Smart Contracts", "Blockchain"],
          },
          {
            id: "m4",
            name: "Emma Wilson",
            avatar:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
            rating: 4,
            message:
              "I have extensive experience with Ethereum development. I can help you identify and fix the contract issue.",
            specialties: ["Ethereum", "Smart Contracts", "Web3"],
          },
        ],
      },
      {
        id: "3",
        title: "Next.js API Route Problem",
        description:
          "My Next.js API route is returning 500 errors. Need help debugging the server-side code. The route is supposed to handle user authentication but it's failing. The error logs are not very helpful.",
        tags: ["Next.js", "API", "Node.js"],
        bounty: "20",
        status: "in-progress",
        author: "Carol Davis",
        createdAt: "2024-01-15T12:00:00.000Z",
        mentors: [
          {
            id: "m5",
            name: "Tom Anderson",
            avatar:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
            rating: 4,
            message:
              "I can help you debug this Next.js API issue. Let me take a look at your code and identify the problem.",
            specialties: ["Next.js", "Node.js", "Backend"],
          },
          {
            id: "m6",
            name: "Lisa Wang",
            avatar:
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
            rating: 5,
            message:
              "I specialize in Next.js and authentication systems. I can help you fix the API route and implement proper error handling.",
            specialties: ["Next.js", "Authentication", "API Development"],
          },
        ],
      },
    ],
  };

  fs.writeFileSync(DB_PATH, JSON.stringify(defaultData, null, 2));
  console.log(
    "✅ Database reset to default state with 3 test gigs and 6 mentors"
  );
}

function showStats() {
  try {
    const data = fs.readFileSync(DB_PATH, "utf8");
    const { gigs } = JSON.parse(data);

    console.log("\n📊 Database Statistics:");
    console.log(`Total Gigs: ${gigs.length}`);

    const statusCounts = gigs.reduce((acc, gig) => {
      acc[gig.status] = (acc[gig.status] || 0) + 1;
      return acc;
    }, {});

    console.log("Status Breakdown:");
    Object.entries(statusCounts).forEach(([status, count]) => {
      console.log(`  ${status}: ${count}`);
    });

    const totalMentors = gigs.reduce((sum, gig) => sum + gig.mentors.length, 0);
    console.log(`Total Mentors: ${totalMentors}`);

    console.log("\n🎯 Recent Gigs:");
    gigs.slice(0, 3).forEach((gig) => {
      console.log(
        `  ${gig.id}: ${gig.title} (${gig.status}) - ${gig.mentors.length} mentors`
      );
    });
  } catch (error) {
    console.error("Error reading database:", error);
  }
}

const command = process.argv[2];

switch (command) {
  case "reset":
    resetDatabase();
    break;
  case "stats":
    showStats();
    break;
  default:
    console.log("Usage: node db-manager.js [reset|stats]");
    console.log("  reset - Reset database to default state");
    console.log("  stats - Show database statistics");
}
