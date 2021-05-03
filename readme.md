# Cpp-translate

Cpp-translate is a library that can allows you to program C++ in your own native language! 

## Usage

1) Look in the `lang/` folder, and find your language file, it should look like `{lang}_trans`
   - On the chance that your language is not here, make an issue, or you can [generate your own language](#adding-your-language).
2) Download the file, or copy and paste it in your project, and name it what you want.

## Adding your language

If you're unlucky, and your language is not already added to the repository. These are the steps that can be taken to add your language!

#### Note, if you're lazy and don't want to add it yourself. Make an issue.

1) Ensure your language is on the Google Translate API (I really hope it is...)
2) Open the languages folder and run `node translator.js {language}` (You can add more than one language)
3) Look at the `lang/` folder, and your language should be there! 
4) Open a pull request to add your language, and it'll be merged!

## License
[Happy Bunny](https://glm.g-truc.net/copying.txt)