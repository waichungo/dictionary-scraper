export class Word {
    word = "";
    definitions: Array<Definition> = []

}
export class Pronunciation {
    ipa = ""
    language = ""
}
export class Definition {
    source=""
    link = ""
    description = ""
    wordType = ""
    examples: Array<String> = []
    synonyms: Array<String> = []
    atonyms: Array<String> = []
    ipa: Array<Pronunciation> = []

}
