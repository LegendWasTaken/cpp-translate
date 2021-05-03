const fs = require('fs');
const keywords = fs.readFileSync('./raw_keywords.txt', 'utf-8').split('\n');

let keywordJson = { words: [] };

keywords.forEach(word => {
   let replacement = "";
   if (word.includes("_"))
      replacement = "_";
   else if (word.includes(" "))
      replacement = " ";

   keywordJson.words.push({ content: word.replace("_", " "), replacement: replacement });
});

fs.writeFileSync("./keywords.json", JSON.stringify(keywordJson, null, 2));
