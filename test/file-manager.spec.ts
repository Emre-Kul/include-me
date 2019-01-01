import { expect } from 'chai';
import * as faker from 'faker';
import * as fs from 'fs';
import 'mocha';
import sinon = require('sinon');
import FileManager from '../src/file-manager';

describe('file-manager Spec',  () => {

  afterEach(() => {
    sinon.restore();
  });

  it('should initiate correct file', () => {
    const name = faker.random.word();
    const ext = faker.random.word();
    const path = `${faker.random.word()}/${name}.${ext}`;
    const file = {
      content: '',
      extension: ext,
      name,
      path,
    };

    const fileManager = new FileManager(path);
    expect(fileManager.getFile()).to.deep.eq(file);
  });

  it('should load correct content of file', () => {
    const fakeContent = faker.random.word();
    const fileManager = new FileManager('');

    sinon.stub(fs, 'readFileSync').returns(fakeContent);

    fileManager.loadContent();

    expect(fileManager.getFile().content).to.eq(fakeContent);

  });
    // TODO : Test extension and name functions
});
