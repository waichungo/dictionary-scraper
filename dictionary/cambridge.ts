import { Definition, Pronunciation, Word } from "../utils/utils";


import jsdom from "jsdom"
const { JSDOM } = jsdom;
//Find definition of a word from the Cambridge dictionary
export async function define(word: string) {

    if (word && word.trim().length > 0) {

        word = word.trim().toLowerCase();
        const jsdom = require("jsdom");
        const { JSDOM } = jsdom;

        var uri = `https://dictionary.cambridge.org/dictionary/english/${encodeURIComponent(word)}`
        const options = {
            referrer: "https://dictionary.cambridge.org/",
            includeNodeLocations: true,
            storageQuota: 10000000,
            userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
            pretendToBeVisual: true,
            runScripts: "dangerously",
            verbose:false,
        }
        const dom = await JSDOM.fromURL(uri, options);
        var definition = new Word()
        definition.word = word

        Array.from(dom.window.document.querySelectorAll(".pos-header")).map((section:any)=>section.parentElement).filter((sec:any)=>sec.className.includes("entry-body")).forEach((e: any) => {
            var description = new Definition()
            description.source="Cambridge"
            description.link=uri
            const pos = e.querySelector(".pos");
            const exE = e.querySelectorAll(".type-example")
            const thesE =  e.querySelector(".thes")
            const defE =  e.querySelector(".def-block")
            var pron = new Pronunciation();

            pron.ipa = e.querySelector(".pron").textContent.trim();
            if (e.querySelector(".region.dreg")) {
                if (e.querySelector(".region.dreg").textContent.toLowerCase().includes("uk")) {
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


            description.examples = !defE ? [] : Array.from(defE.querySelectorAll(".examp")).map((ex:any) => ex.textContent.trim());
            description.synonyms = !thesE ? [] : Array.from(thesE.querySelectorAll(".ref")).map((syn:any) => {
                return decodeURIComponent(syn.textContent.trim());
            });
            definition.definitions.push(description)

        })
        return definition;

    }
    return {} 
} 