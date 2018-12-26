import {IFile} from './interfaces/IFile';

class TemplateEngine {

    public static replaceIncludes(files: IFile[]) {
        for (const file of files) {
            console.log(file.content);
        }
    }

}

export default TemplateEngine;
