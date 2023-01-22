"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Definition = exports.Pronunciation = exports.Word = void 0;
class Word {
    constructor() {
        this.word = "";
        this.definitions = [];
    }
}
exports.Word = Word;
class Pronunciation {
    constructor() {
        this.ipa = "";
        this.language = "";
    }
}
exports.Pronunciation = Pronunciation;
class Definition {
    constructor() {
        this.source = "";
        this.link = "";
        this.description = "";
        this.wordType = "";
        this.examples = [];
        this.synonyms = [];
        this.atonyms = [];
        this.ipa = [];
    }
}
exports.Definition = Definition;
