import path from "path";
import fs from "fs/promises"
import crypto from "crypto";

class Groot {
    
    constructor(repoPath = "."){
        this.repoPath = path.join(repoPath, ".groot");
        this.objectsPath = path.join(this.repoPath, "objects"); //.groot/objects
        this.headPath = path.join(this.repoPath, "HEAD"); // .groot/HEAD
        this.indexPath = path.join(this.repoPath, "index");
        this.init();
    }

    async init(){
        await fs.mkdir(this.objectsPath, {recursive:true});
        try {
            await fs.writeFile(this.headPath, "", {flag:"wx"}) ; //wx: open for writing , fails if file exists
            await fs.writeFile(this.indexPath, JSON.stringify([]), {flag: "wx"});
        } catch (error) {
           console.log("Already initialized the .groot folder"); 
        }
    }

    //using crypto module to hash the content of the file (provided by nodejs)
    hashObject(content){
        return crypto.createHash("sha1").update(content, 'utf-8').digest("hex");

    }

    async add(fileToBeAdded){
        //file to be added is the path/to/file
        const fileData = await fs.readFile(fileToBeAdded, {encoding:"utf-8"});/// read the file
        const fileHash = this.hashObject(fileData); //hash the file
        console.log(fileHash)
        const newFileHashedObjectPath = path.join(this.objectsPath, fileHash);
        await fs.writeFile(newFileHashedObjectPath, fileData)
    }

}

const groot = new Groot();