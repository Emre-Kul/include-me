import {IFile} from './interfaces/IFile';

class TemplateEngine {

    private readonly includeRegex: RegExp;
    private readonly fileSelector: string;

    constructor(fileSelector: string = 'path', includeRegex: RegExp = /\${include\(\'(.*)\'\)}/g) {
        this.fileSelector = fileSelector;
        this.includeRegex = includeRegex;
    }

    public replaceIncludes(files: IFile[]) {
        for (const file of files) {
            let matches: any = [];
            do {
                matches = this.includeRegex.exec(file.content);
                if (matches) {
                    const targetFile = files.find( (f) => f[this.fileSelector] === matches[1] );
                    file.content = file.content.replace(matches[0],
                                                        (targetFile) ? targetFile.content : '');
                }
            }
            while (matches);
        }
    }

}

export default TemplateEngine;
