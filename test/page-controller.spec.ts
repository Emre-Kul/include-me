import { expect } from 'chai';
import * as faker from 'faker';
import 'mocha';
import PageController from '../src/page-controller';
import * as fs from 'fs';
import sinon = require('sinon');
import FileManager from "../src/file-manager";

describe('page-controller Spec',  () => {

  afterEach(() => {
      sinon.restore();
  });

  it('should create correct pageController instance', () => {
    const rootFolderPath = faker.random.word();
    const pageController = new PageController(rootFolderPath);

    expect(pageController.getRootFolderPath()).to.eq(rootFolderPath);
    expect(pageController.getPages()).to.deep.eq([]);
  });

  it('should load pages from folder' , () => {
      const rootFolderPath = faker.random.word();
      const files: any = ['a.html', 'b.html'];
      const pages: any = [
          {content: '', extension: 'html', name: 'a', path: '/a.html'},
          {content: '', extension: 'html', name: 'b', path: '/b.html'}
      ];
      const stat: any = {isDirectory : () => false};
      sinon.stub(fs, 'readdirSync').returns(files);
      sinon.stub(fs, 'statSync').returns(stat);
      sinon.stub(FileManager.prototype, 'loadContent').callsFake( () => {});
      const pageController = new PageController(rootFolderPath);

      pageController.loadPagesFromFolder();
      expect(pageController.getPages()).to.deep.eq(pages);
  });

  it('should load pages from empty folder' , () => {
    const rootFolderPath = faker.random.word();
    const files: any = [];
    sinon.stub(fs, 'readdirSync').returns(files);
    const pageController = new PageController(rootFolderPath);

    pageController.loadPagesFromFolder();
    expect(pageController.getPages()).to.deep.eq([]);
  });
});
