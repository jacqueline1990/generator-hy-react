/*
 * @Author: hy
 * @Date: 2021-11-13 19:10:14
 * @LastEditTime: 2021-12-17 15:10:46
 * @LastEditors: Please set LastEditors
 * @Description: 生成一个组件
 * @FilePath: /generator-hy-react/generators/app/templates/plopfile.js
 */

module.exports = (plop) => {
  plop.setGenerator('com', {
    description: 'create a component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name',
        default: 'myComponent',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{name}}/{{name}}.tsx',
        templateFile: 'plop-templates/component.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{name}}/{{name}}.scss',
        templateFile: 'plop-templates/component.scss.hbs',
      },
    ],
  });
  plop.setGenerator('page', {
    description: 'create a component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name',
        default: 'myComponent',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/pages/{{name}}/{{name}}.tsx',
        templateFile: 'plop-templates/component.hbs',
      },
      {
        type: 'add',
        path: 'src/pages/{{name}}/{{name}}.scss',
        templateFile: 'plop-templates/component.scss.hbs',
      },
    ],
  });
};
