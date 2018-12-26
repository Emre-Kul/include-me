import * as fs from 'fs';
import FileLoader from './file-loader';
import {IFile} from './interfaces/IFile';
import TemplateEngine from './template-engine';

class PageController {
    private readonly rootFolderPath: string;
    private readonly pages: IFile[];

    constructor(rootFolderPath: string) {
        this.rootFolderPath = rootFolderPath;
        this.pages = [];
    }

    public getPages(): IFile[] {
        return this.pages;
    }

    public loadPagesFromFolder(path: string = this.rootFolderPath) {
        const files = fs.readdirSync(path);
        for (const file of files) {
            const fileStat = fs.statSync(`${path}/${file}`);
            if (fileStat.isDirectory()) {
                this.loadPagesFromFolder(`${path}/${file}`);
            } else {
                const fileLoader = new FileLoader(`${path}/${file}`);
                fileLoader.loadContent();
                this.pages.push(fileLoader.getFile());
            }
        }
    }

}

export default PageController;
