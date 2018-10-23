process.env.NODE_ENV = 'production';

const ora = require('ora');
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const inquirer = require('inquirer');
const config = require('../config');

const buildRun = () => {
  const webpackConfig = require('./webpack.prod.conf');

  const spinner = ora('building...');
  spinner.start();

  rm(path.join(config.assetsRoot, config.assetsSubDirectory), err => {
    if (err) throw err;
    webpack(webpackConfig, function (err, stats) {
      spinner.stop();
      if (err) throw err;
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n');

      if (stats.hasErrors()) {
        console.log(chalk.red('  Build failed with errors.\n'));
        process.exit(1)
      }
      console.log(chalk.cyan('  Build complete.\n'));
    })
  })
};

inquirer.prompt([{
  type: 'list',
  name: 'env',
  message: '请选择打包使用环境',
  choices: ['QATest', 'OnlineProduct'],
}]).then((envSelected) => {
  if (envSelected.env === 'QATest') {
    process.env.beta = 'beta';
  }
  buildRun();
});
