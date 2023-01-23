import { define as collinsDefine } from "./dictionary/collins"
import { define as cambridgeDefine } from "./dictionary/cambridge"
import { Definition, Word } from "./utils/utils"


export async function findDefinition(word: string) {

    let promises: any = []
    try {
        promises.push(cambridgeDefine(word))
    } catch (error) {

    }
    try {
        promises.push(collinsDefine(word))
    } catch (error) {

    }

    var results = await Promise.all(promises)
    var def = new Word()
    def.word = word
    results.forEach((defE: Word) => {
        def.definitions = [...def.definitions, ...defE.definitions]
    });
    return def;

}
async function test() {
    if (process.argv.length > 2) {
        var def=await findDefinition(process.argv[2].trim());
        console.log(JSON.stringify(def, null, 4))
    }
    
}
if(process.env.TEST){
    test()
}


