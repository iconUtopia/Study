namespace demo1 {
  function tsFunction() {
    let web: string = "Hello world";
    console.log(web);
  }
  tsFunction();
}

/**
 *  1. node 无法直接运行ts，所以需要通过运命令tsc xxx.ts将其转换为js。然后 node xxx.js 运行 js 文件中的代码
 *  2. 如果想直接运行ts，可以通过 npm install -g ts-node 全局安装ts-node,转换需要3-5s
 *  3. namespace + 空间名{},命名空间，防止变量冲突
 */
