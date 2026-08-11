// pullRequest.js - Easy test helper for PR workflows 🐱
// Last updated: 2026-08-11

/**
 * Simple utility to demonstrate PR creation/testing
 * Used for Arena workflow tests
 */

function createTestMessage() {
  const timestamp = new Date().toISOString();
  const messages = [
    "meow meow meow! 🐱",
    "purr purr test ✨",
    "testing 1-2-3, cats are cute 😺",
    "hello from arena test branch! 🐾",
  ];
  const random = messages[Math.floor(Math.random() * messages.length)];
  return `${random} - ${timestamp}`;
}

function logTestInfo() {
  console.log("🐾 Pull Request Test Helper");
  console.log("---------------------------");
  console.log(createTestMessage());
  console.log("Branch:", process.env.GITHUB_REF || "local");
  console.log("Repo: meow-meow-repo");
  console.log("Status: test OK ✅");
}

// Run if called directly
if (require.main === module) {
  logTestInfo();
}

module.exports = { createTestMessage, logTestInfo };
