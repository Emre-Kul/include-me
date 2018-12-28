import * as fs from 'fs';
import FileManager from './file-manager';
import {IFile} from './interfaces/IFile';

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
                const fileLoader = new FileManager(`${path}/${file}`);
                fileLoader.loadContent();
                this.pages.push(fileLoader.getFile());
            }
        }
    }

}

export default PageController;
