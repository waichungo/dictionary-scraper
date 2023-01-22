import { Definition, Word } from "../utils/utils";

const fetch = require("node-fetch")

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

export async function define(word: string) {

    if (word && word.trim().length > 0) {

        word = word.trim();

        const dom = new JSDOM(``, {
            url: `https://www.collinsdictionary.com/dictionary/english/${encodeURIComponent(word)}`,
            referrer: "https://www.collinsdictionary.com/",
            contentType: "text/html",
            includeNodeLocations: true,
            storageQuota: 10000000,
            userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
            pretendToBeVisual: true,
            runScripts: "outside-only",

        });
        var definition = new Word()
        definition.word = word
        dom.window.document.querySelectorAll(".hom").forEach((e: any) => {
            var description = new Definition()
            description.wordType = decodeURIComponent(e.querySelector(".pos").innerText.trim())
            description.description = decodeURIComponent(e.querySelector(".def").innerText.trim())
            description.description = decodeURIComponent(e.querySelector(".thes"))

            definition.definitions.push(description)

        })


    }
} 