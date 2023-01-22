"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const utils_1 = require("../utils/utils");
const jsdom_1 = __importDefault(require("jsdom"));
const { JSDOM } = jsdom_1.default;
function define(word) {
    return __awaiter(this, void 0, void 0, function* () {
        if (word && word.trim().length > 0) {
            word = word.trim();
            const jsdom = require("jsdom");
            const { JSDOM } = jsdom;
            var uri = `https://www.collinsdictionary.com/dictionary/english/${encodeURIComponent(word)}`;
            const options = {
                referrer: "https://www.collinsdictionary.com/",
                includeNodeLocations: true,
                storageQuota: 10000000,
                userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
                pretendToBeVisual: true,
                runScripts: "dangerously",
                verbose: false,
            };
            const dom = yield JSDOM.fromURL(uri, options);
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
            var definition = new utils_1.Word();
            definition.word = word;
            dom.window.document.querySelectorAll(".dictlink").forEach((e) => {
                var description = new utils_1.Definition();
                description.source = "Collins";
                description.link = uri;
                const pos = e.querySelector(".pos");
                const exE = e.querySelectorAll(".type-example");
                const thesE = e.querySelector(".thes");
                var pron = new utils_1.Pronunciation();
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
                description.examples = !exE ? [] : Array.from(e.querySelectorAll(".type-example")).map((ex) => ex.textContent.trim());
                description.synonyms = !thesE ? [] : Array.from(thesE.querySelectorAll(".ref")).map((syn) => {
                    return decodeURIComponent(syn.textContent.trim());
                });
                definition.definitions.push(description);
            });
            return definition;
        }
    });
}
exports.define = define;
