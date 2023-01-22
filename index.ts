import { define as collinsDefine } from "./dictionary/collins"


async function findDefinition() {
    if (process.argv.length > 2) {
        let def = await collinsDefine(process.argv[2])
        console.log(JSON.stringify(def,null,4))
    }
}

findDefinition();



