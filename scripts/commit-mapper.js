const { execSync } = require("child_process");

try {
  const lastCommit = execSync("git log -1 --pretty=%B").toString();

  let newMessage = lastCommit;

  newMessage = newMessage.replace(/^\[add\]!?:/i, "feat$&");
  newMessage = newMessage.replace(/^\[update\]!?:/i, "chore$&");
  newMessage = newMessage.replace(/^\[change\]!?:/i, "chore$&");
  newMessage = newMessage.replace(/^\[fix\]!?:/i, "fix$&");
  newMessage = newMessage.replace(/^\[delete\]!?:/i, "feat!$&");

  if (newMessage !== lastCommit) {
    execSync(
      `git commit --amend -m "${newMessage.replace(/"/g, '\\"')}" --no-edit`
    );
    console.log("Commit message mapped for release-please ✅");
  }
} catch (err) {
  console.error("Error mapping commit message:", err.message);
  process.exit(1);
}
