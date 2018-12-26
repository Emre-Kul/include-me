import {IFile} from './interfaces/IFile';
import PageController from './page-controller';
import TemplateEngine from './template-engine';

class App {
    private pageController: PageController;
    private templateEngine: TemplateEngine;

    constructor(rootFolderPath: string, fileSelector: string, includeRegex: RegExp) {
        this.pageController = new PageController(rootFolderPath);
        this.templateEngine = new TemplateEngine(fileSelector, includeRegex);
    }

    public run(): IFile[] {
        this.pageController.loadPagesFromFolder();
        this.templateEngine.replaceIncludes(this.pageController.getPages());
        return this.pageController.getPages();
    }
}
export = {
    IncludeMe : App,
};
