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
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDefinition = void 0;
const collins_1 = require("./dictionary/collins");
const cambridge_1 = require("./dictionary/cambridge");
const utils_1 = require("./utils/utils");
function findDefinition(word) {
    return __awaiter(this, void 0, void 0, function* () {
        let promises = [];
        try {
            promises.push((0, cambridge_1.define)(word));
        }
        catch (error) {
        }
        try {
            promises.push((0, collins_1.define)(word));
        }
        catch (error) {
        }
        var results = yield Promise.all(promises);
        var def = new utils_1.Word();
        def.word = word;
        results.forEach((defE) => {
            def.definitions = [...def.definitions, ...defE.definitions];
        });
        return def;
    });
}
exports.findDefinition = findDefinition;
function test() {
    return __awaiter(this, void 0, void 0, function* () {
        if (process.argv.length > 2) {
            var def = yield findDefinition(process.argv[2].trim());
            console.log(JSON.stringify(def, null, 4));
        }
    });
}
if (process.env.TEST) {
    test();
}
