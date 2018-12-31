import {IFile} from './interfaces/IFile';
import PageController from './page-controller';
import TemplateEngine from './template-engine';

class App {
    private pageController: PageController;
    private templateEngine: TemplateEngine;

    constructor(rootFolderPath: string, fileSelector?: string, includeRegex?: RegExp) {
        this.pageController = new PageController(rootFolderPath);
        this.templateEngine = new TemplateEngine(fileSelector, includeRegex);
    }

    public load(): App {
        this.pageController.loadPagesFromFolder();
        this.templateEngine.compile(this.pageController.getPages());
        return this;
    }

    public asArray(): IFile[] {
        return this.pageController.getPages();
    }

    public asObject(key: string = 'name'): any {
        const filesObj: any = {};
        const files = this.pageController.getPages();
        files.forEach( (file) => {
            filesObj[file[key]] =  file;
        });
        return filesObj;
    }

}
export = {
    IncludeMe : App,
};
