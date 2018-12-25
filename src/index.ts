import FileLoader from "./file-loader";
import {IFile} from "./interfaces/IFile";
import * as fs from 'fs';

class App {
    private folderPath: string;
    private files: IFile[];

    constructor(folderPath: string){
        this.folderPath = folderPath;
        this.files = [];
    }

    public loadFilesFromFolder(path: string){
        fs.readdir(path, async (err: any, files: any) => {
            for(const file of files){
                const fileStat = await fs.lstat(path+ '/' + file);
                if(await fileStat.isDirectory()){
                   this.loadFilesFromFolder(path+ '/' + file);
                }
                else{
                    const fileLoader = new FileLoader(path+ '/' + file);
                    this.files.push(fileLoader.getFile());
                    console.log(fileLoader.getFile());
                }
            }

        });
    }

    public getFolderPath(): string{
        return this.folderPath;
    }

    public getFiles(): IFile[]{
        return this.files;
    }

}

const app = new App('./example');
app.loadFilesFromFolder(app.getFolderPath());
console.log(app.getFiles());
