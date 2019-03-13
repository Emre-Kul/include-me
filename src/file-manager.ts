import * as fs from 'fs';
import { IFile } from './interfaces/IFile';

class FileManager {

  private readonly file: IFile;

  constructor(path: string) {

    this.file = {
      content: '',
      extension: '',
      name: '',
      path,
    };

  }

  public init() {
    this.file.extension = this.getExtensionFromPath(this.file.path);
    this.file.name = this.getNameFromPath(this.file.path);
  }

  public loadContent() {
    this.file.content = fs.readFileSync(this.file.path, 'utf8');
  }

  public getFile(): IFile {
    return this.file;
  }

  private getNameFromPath(path: string): string {
    const pathPiece = path.split('/');
    return pathPiece[pathPiece.length - 1].split('.')[0];
  }

  private getExtensionFromPath(path: string): string {
    const pathPiece = path.split('/');
    return pathPiece[pathPiece.length - 1].split('.')[1];
  }
}

export default FileManager;
