import { Definition, Pronunciation, Word } from "../utils/utils";

import fs from "fs/promises"
import jsdom from "jsdom"
const { JSDOM } = jsdom;

export async function define(word: string) {

    if (word && word.trim().length > 0) {

        word = word.trim();
        const jsdom = require("jsdom");
        const { JSDOM } = jsdom;

        var uri = `https://www.collinsdictionary.com/dictionary/english/${encodeURIComponent(word)}`
        const options = {
            referrer: "https://www.collinsdictionary.com/",
            includeNodeLocations: true,
            storageQuota: 10000000,
            userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
            pretendToBeVisual: true,
            runScripts: "dangerously",
            verbose:false,
        }
        const dom = await JSDOM.fromURL(uri, options);
        // const dom = new JSDOM(``, {
        //     url: `https://www.collinsdictionary.com/dictionary/english/${encodeURIComponent(word)}`,
        //     referrer: "https://www.collinsdictionary.com/",
        //     contentType: "text/html",
        //     includeNodeLocations: true,
        //     storageQuota: 10000000,
        //     userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
        //     pretendToBeVisual: true,
        //     runScripts: "outside-only",

        // });
        // await fs.writeFile("export.html",  dom.window.document.outerHTML)
        var definition = new Word()
        definition.word = word

        dom.window.document.querySelectorAll(".dictlink").forEach((e: any) => {
            var description = new Definition()
            description.source="Collins"
            description.link=uri
            const pos = e.querySelector(".pos");
            const exE = e.querySelectorAll(".type-example")
            const thesE =  e.querySelector(".thes")
            var pron = new Pronunciation();

            pron.ipa = e.querySelector(".pron").textContent.trim();
            if (e.querySelector(".dictname")) {
                if (e.querySelector(".dictname").textContent.toLowerCase().includes("british")) {
                    pron.language = "UK";
                }
                else {
                    pron.language = "US";
                }
            }
            else {
                pron.language = "Generic";
            }
            description.ipa.push(pron);
            description.wordType = decodeURIComponent(pos.textContent.trim());
            description.description = decodeURIComponent(e.querySelector(".def").textContent.trim());


            description.examples = !exE ? [] : Array.from(e.querySelectorAll(".type-example")).map((ex:any) => ex.textContent.trim());
            description.synonyms = !thesE ? [] : Array.from(thesE.querySelectorAll(".ref")).map((syn:any) => {
                return decodeURIComponent(syn.textContent.trim());
            });
            definition.definitions.push(description)

        })
        return definition;

    }
} 