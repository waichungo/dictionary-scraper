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
const collins_1 = require("./dictionary/collins");
function findDefinition() {
    return __awaiter(this, void 0, void 0, function* () {
        if (process.argv.length > 2) {
            let def = yield (0, collins_1.define)(process.argv[2]);
            console.log(JSON.stringify(def, null, 4));
        }
    });
}
findDefinition();
