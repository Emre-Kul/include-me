import {IFile} from './interfaces/IFile';

class TemplateEngine {

    private readonly includeRegex: RegExp;
    private readonly fileSelector: string;

    constructor(fileSelector: string = 'path', includeRegex: RegExp = /\${include\(\'(.*)\'\)}/g) {
        this.fileSelector = fileSelector;
        this.includeRegex = includeRegex;
    }

    public compile(files: IFile[]) {
        let fileIndex = 0;
        while (fileIndex < files.length) {
            this.processIncludes(files, fileIndex);
            if (!this.includeRegex.test(files[fileIndex].content)) {
                fileIndex++;
            }
        }
    }

    private processIncludes(files: IFile[], fileIndex: number) {
        const file = files[fileIndex];
        const processedBefore: any = {};
        let matches: any = [];
        do {
            matches = this.includeRegex.exec(file.content);
            if (matches) {
                const targetFile = files.find( (f) => f[this.fileSelector] === matches[1] );

                if (!targetFile) {
                    throw new Error(
                        `"${matches[1]}" couldn't find, check out +
                            '${file.name}' ('${file.path}')`);
                }
                if (processedBefore[targetFile.name]) {
                    throw new Error(`Cycle problem at '${file.name}' file`);
                }
                processedBefore[targetFile.name] = true;
                file.content = file.content.replace(matches[0], targetFile.content );
            }
        }
        while (matches);
    }

}

export default TemplateEngine;
