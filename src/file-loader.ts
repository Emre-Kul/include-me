import * as fs from 'fs';
import {IFile} from './interfaces/IFile';

class FileLoader {

    private readonly file: IFile;

    constructor(path: string) {

        this.file = {
            content: '',
            extension: this.getExtensionFromPath(path),
            name: this.getNameFromPath(path),
            path,
        };

    }

    public loadContent() {
        this.file.content = fs.readFileSync(this.file.path, 'utf8');
    }

    public getFile(): IFile {
        return this.file;
    }

    private getNameFromPath(path: string): string {
        const splited = path.split('/');
        return splited[splited.length - 1].split('.')[0];
    }

    private getExtensionFromPath(path: string): string {
        const splited = path.split('/');
        return splited[splited.length - 1].split('.')[1];
    }
}

export default FileLoader;
