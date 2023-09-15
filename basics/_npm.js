// resource for npm
// https://blog.bitsrc.io/npm-tips-and-tricks-24c5e9defea6
// https://css-tricks.com/a-complete-beginners-guide-to-npm/
// https://nodesource.com/blog/the-basics-getting-started-with-npm
// https://nodesource.com/blog/an-absolute-beginners-guide-to-using-npm/
// https://nodesource.com/blog/seven-more-npm-tricks-to-knock-your-wombat-socks-off
// https://nodesource.com/blog/eleven-npm-tricks-that-will-knock-your-wombat-socks-off



// npm init
// 逐步构建项目的工具
// --yes / -y   标志将自动使用默认值 npm init 填充所有选项

// npm config
// npm config set
// npm config get
// 如 查看仓库源 npm config get registry
// 如 设置仓库源 npm config set registry https://registry.npm.taobao.org


// npm install <package_name> 可简写为 npm i <package_name>   安装包
// 全局安装 --global / -g
// 安装开发环境依赖  --save-dev  / -i -D
// 安装生产环境依赖（默认） --save-prod / -i -P
// 同时安装多个包       npm i express cheerio axios
// 安装具有相同前缀的多个包      npm i eslint-{plugin-import,plugin-react,loader} express
// 指定包名的版本号，如comment@2.24.0，其中数字位分别是大版本号、小版本号（功能号）、修复版本号

// NPM scripts
// 用于自定义脚本
// npm run script_name
console.log(process.npm_package_name) // app-project
console.log(process.npm_package_scripts) // scripts
console.log(process.npm_package_config_myVariable) // Hello World
// npm script 还有许多其他的技巧，如通配符、传参、执行顺序、默认值、钩子、简写形式等，
// 参考http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html


// npm run env
// 将列出我们包中存在的所有 npm 环境变量

// 在 package.json 中配置自己的变量
// 并执行 npm run env | grep npm_package_config_ 查看

// npm list / npm ls            列出所有已安装的包
// npm list jquery / npm ls jquery # 查看本地已安装的jquery的详细信息
// npm update                   更新软件包
// npm login  & npm publish     登录并发布包

// npm root # 查看项目中模块所在的目录
// npm root -g # 查看全局安装的模块所在目录
// npm view jquery dependencies # 查看某个包对于各种包的依赖关系
// npm view jquery version # 查看jquery最新的版本号
// npm view jquery versions # 查看所有jquery历史版本号（很实用）
// npm view jquery # 查看最新的jquery版本的信息
// npm info jquery # 查看jquery的详细信息，等同于上面的npm view jquery
// npm view jquery repository.url # 查看jquery包的来源地址


// npm home <package-name>      查找 npm 包的文档时，可以通过运行此命令命令快速导航到主页   如：npm home axios        
// npm bug <package-name>       导航到 issues 
// npm repo <package-name>      打开存储库
// npm docs <package-name>      打开github中<package-name>的README.MD文件信息

// npm audit                    检查项目依赖项是否存在漏洞。它可以看出有风险的 package、依赖库的依赖链、风险原因及其解决方案。
// npm audit fix                若发现存在漏洞，可以使用此命令将自动安装所有易受攻击依赖包的修补

// npx snyk                     高级版的 npm audit，可自动修复，且支持 CI/CD 集成与多种语言

// npm cache clean --force / yarn cache clean / pnpm store prune     清除 npm 缓存


// cross-env脚本
// 当我们使用 NODE_ENV = production 来设置环境变量的时候，大多数windows命令会提示将会阻塞或者异常，或者，windows不支持NODE_ENV=development的这样的设置方式，会报错。因此 cross-env 出现了。
// 我们就可以使用 cross-env命令，这样我们就不必担心平台设置或使用环境变量了。
// 也就是说 cross-env 能够提供一个设置环境变量的scripts，这样我们就能够以unix方式设置环境变量，然而在windows上也能够兼容的。
// npm install --save-dev cross-env
