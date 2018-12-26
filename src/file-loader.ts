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
        return '';
    }

    private getExtensionFromPath(path: string): string {
        return '';
    }
}

export default FileLoader;
