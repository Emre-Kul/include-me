import * as fs from 'fs';
import FileLoader from './file-loader';
import {IFile} from './interfaces/IFile';
import TemplateEngine from './template-engine';

class App {
    private readonly rootFolderPath: string;
    private readonly files: IFile[];

    constructor(rootFolderPath: string) {
        this.rootFolderPath = rootFolderPath;
        this.files = [];
    }

    public loadFilesFromFolder(path: string = this.rootFolderPath) {
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

    public getFiles(): IFile[] {
        return this.files;
    }

}

const app = new App('./example');
const templateEngine = new TemplateEngine();

app.loadFilesFromFolder();
templateEngine.replaceIncludes(app.getFiles());
console.log(app.getFiles());
