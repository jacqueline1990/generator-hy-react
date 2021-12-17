/*
 * @Author: hy
 * @Date: 2021-11-12 21:14:38
 * @LastEditTime: 2021-12-17 15:51:11
 * @LastEditors: Please set LastEditors
 * @Description: Generator 核心入口  需要导出一个继承于Yeman Generaor类型
 * @FilePath: /generator-sample/generators/app/index.js
 */

const Generator = require('yeoman-generator');
module.exports = class extends Generator {
  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'projectname',
        message: 'your project name',
        default: this.appname,
      },
      {
        type: 'input',
        name: 'version',
        message: 'your project version',
        default: '0.0.1',
      },
      {
        type: 'input',
        name: 'title',
        message: 'your project title',
        default: '我的react项目',
      },
    ]).then((answer) => {
      // answer => { name :'user input value'}
      this.answer = answer;
    });
  }
  writing() {
    var templates = [
      'package.json',
      'public/index.html',
      'public/favicon.ico',
      'public/manifest.json',
      'src',
      'scripts',
      'config',
      'plop-templates',
      'README.md',
      'tsconfig.json',
      'plopfile.js',
    ];

    templates.forEach((item) => {
      this.fs.copyTpl(
        this.templatePath(item),
        this.destinationPath(item),
        this.answer
      );
    });
  }
};
