const Chalk = require('chalk');
const Translate = require('@vitalets/google-translate-api');
const languages = require('google-translate-api').languages;
const fs = require('fs');


const words = JSON.parse(fs.readFileSync("./keywords.json", "utf-8"));
let requestedLanguages = process.argv.splice(2, process.argv.length);

let asciiOnly = false;
if (requestedLanguages.includes("-ascii")) {
    requestedLanguages = requestedLanguages.filter(lang => lang !== "-ascii");
    asciiOnly = true;
}

if (requestedLanguages.empty) {
    console.error("No language specified");
    process.exit();

}
else
    log(`Found ${requestedLanguages.length} languages to translate\n\tTranslating languages [${Chalk.whiteBright(requestedLanguages.map(lang => { return languages[lang]}).join(" "))}]`);

requestedLanguages.forEach(lang => translateLanguage(lang).then());

async function translateLanguage(language) {
    log(`Starting to translate language ${Chalk.whiteBright(languages[language])}`);

    let file = "";
    for (let i = 0; i < words.words.length; i++) {
        let res = await Translate(words.words[i].content,{to: language});

        const text = res.text.split(" ").join(words.words[i].replacement);

        const original = words.words[i].content.split(" ").join(words.words[i].replacement);
        let translated = text;

        if (asciiOnly)
            translated = translated.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

        if (original !== translated)
            file += `#define ${translated.split(" ").join("").toLowerCase()} ${original.split(" ").join("")}\n`;
    }

    fs.writeFileSync(`./lang/${languages[language].toLowerCase()}_trans`, file);
}



function log(msg) {
    console.log(Chalk.cyanBright(`[${Chalk.whiteBright("INFO")}] ${Chalk.white(msg)}`));
}