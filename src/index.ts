import * as fs from 'fs';
import FileLoader from './file-loader';
import {IFile} from './interfaces/IFile';
import TemplateEngine from './template-engine';

class App {
    private readonly folderPath: string;
    private readonly files: IFile[];

    constructor(folderPath: string) {
        this.folderPath = folderPath;
        this.files = [];
    }

    public loadFilesFromFolder(path: string) {
        const files = fs.readdirSync(path);
        for (const file of files) {
            const fileStat = fs.statSync(`${path}/${file}`);
            if (fileStat.isDirectory()) {
               this.loadFilesFromFolder(`${path}/${file}`);
            } else {
                const fileLoader = new FileLoader(`${path}/${file}`);
                fileLoader.loadContent();
                this.files.push(fileLoader.getFile());
            }
        }
    }

    public getFolderPath(): string {
        return this.folderPath;
    }

    public getFiles(): IFile[] {
        return this.files;
    }

}

const app = new App('./example');

app.loadFilesFromFolder(app.getFolderPath());

TemplateEngine.replaceIncludes(app.getFiles());
