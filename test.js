import containsJudol from "./index.js";
import fs from "node:fs";

const bannedWords = fs.readFileSync("./ban.txt").toLocaleString().trim().split("\n");

fs.readFile("./comments.txt", (err, data) => {
  const comments = data.toLocaleString().trim().split('\n');

  for (let i=0;i<comments.length;i++) {
    const comment = comments[i];
    const result = containsJudol(comment, bannedWords);
    console.log(`[${result ? `❌ Dilarang karena terdapat ${result}` : "✅ Aman"}] ${comment}`);
  }
});
