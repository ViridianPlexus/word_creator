
// the fs.readFile() method, Include fs module
const fs = require('node:fs');
let words = []; // ?
function main(){
    let words_alpha;
    let definitions;
    let words_from_definitions = [];
    let wordsWithSynonyms = {}
    // Use fs.readFile() method to read the file

    let raw_definitions = fs.readFileSync('Oxford English Dictionary.txt', 'utf8');
     definitions = raw_definitions.split('\n');
     definitions_cleaned = definitions.filter(word => word.trim() !== '');
     //console.log(definitions_cleaned)

     definitions_cleaned.forEach(word => {
        const wordParts = word.split('  '); // Split by two spaces
        const extractedWord = wordParts[0].trim(); // Get the first part (the word) and remove leading/trailing spaces
        words_from_definitions.push(extractedWord);
    });

    let raw_synonyms = fs.readFileSync('synonyms.txt', 'utf8');
    synonyms = raw_synonyms.split('\n');

    // console.log(synonyms)

    words_from_definitions.forEach(word => {
        // Find the line in synonyms containing the word
        const synonymLine = synonyms.find(line => line.split(',').includes(word));

        if (synonymLine) {
            // Extract all words from the line
            const wordsInLine = synonymLine.split(',');
            // Exclude the original word from the synonyms
            const wordSynonyms = wordsInLine.filter(w => w !== word);
            // Save the word and its synonyms
            wordsWithSynonyms[word] = wordSynonyms;

            console.log("word: " +word +"\n" + "its synonyms: " + wordsWithSynonyms[word])
        }


    });




       // console.log(words_from_definitions)

       let x = 0;

    //    definitions_cleaned.forEach(wordDefinition => {
    //     // Split the word and definition
    //     const [word, definition] = wordDefinition.split('  ');

    //     // Clean up the word for use in file name
    //     const fileName = word.trim().toLowerCase().replace(/\s+/g, '-') + '.md';

    //     // Write definition to the markdown file synchronously
    //     try {
    //         fs.writeFileSync(fileName, definition);
    //         console.log(`${fileName} has been created!`);
    //     } catch (err) {
    //         console.error(`Error writing file ${fileName}: ${err}`);
    //     }
    // });

    definitions_cleaned.forEach(wordDefinition => {
        // Split the word and definition
        const [word, definition] = wordDefinition.split('  ');

        // Clean up the word for use in file name
        const fileName = word.trim().toLowerCase().replace(/\s+/g, '-') + '.md';

        // Prepare content for the Markdown file
        let content = 'TARGET DECK\n';
        content += 'ENGLISH\n\n';
        content += `START\n`;
        content += `Basic\n`;
        content += `${word}\n`;
        content += `Back: ${definition}\n`;
        // Add synonyms if available
        if (wordsWithSynonyms[word] && wordsWithSynonyms[word].length > 0) {
            const wrappedSynonyms = wordsWithSynonyms[word].map(synonym => `[[${synonym}]]`).join(', ');
            content += `Tags: ${wrappedSynonyms}\n`;
        }

        content += `END\n`;


        console.log("testing content output: ", content)
        // Write content to the markdown file synchronously
        try {
            fs.writeFileSync(fileName, content);
            console.log(`${fileName} has been created!`);
        } catch (err) {
            console.error(`Error writing file ${fileName}: ${err}`);
        }
    });





     // if a definition begins with a word, make the word the key and the value the definition

}

main();
// get the word, set it as the title of the md file
// write the definition of the word to the md file
// write synonyms in [[]] in the md file

// if word doesn't exist in definitions, skip it
