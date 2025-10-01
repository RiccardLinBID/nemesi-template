const fs = require("fs");

const commitMsgFile = process.argv[2];
let msg = fs.readFileSync(commitMsgFile, "utf8");

msg = msg.replace(/^\[add\]\s*:?/i, "feat:");
msg = msg.replace(/^\[update\]\s*:?/i, "chore:");
msg = msg.replace(/^\[change\]\s*:?/i, "chore:");
msg = msg.replace(/^\[fix\]\s*:?/i, "fix:");
msg = msg.replace(/^\[delete\]\s*:?/i, "feat!:");

fs.writeFileSync(commitMsgFile, msg, "utf8");
