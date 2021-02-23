/*
 * 装饰器
 * 装饰器是一种 特殊类型 的声明，它能够被附加到类声明，方法，属性上，可以为原本额代码添加额外的功能。
 * 通俗的讲装饰器就是一个函数，可以注入到类、方法、属性参数上来扩展类、方法、属性的功能
 */
namespace Decorator {
  /** 普通装饰器 */
  function logClass(params: any) {
    console.log(params);
    //params 就是指代当前类--HttpClient
    params.prototype.apiUrl = "动态扩展属性";
    params.prototype.run = function() {
      console.log("动态扩展方法");
    };
    params.prototype.getDate = function() {
      console.log("动态扩展方法2");
    };
  }
  @logClass
  class HttpClient {
    constructor() {}
    getDate() {
      console.log(1);
    }
  }
  let http: any = new HttpClient();
  console.log(http.apiUrl);
  http.run();
  http.getDate();
  /** 装饰工厂 */
  function logClassB(param: string) {
    return function(target: any) {
      console.log(target, "装饰器以下的类");
      console.log(param, "装饰器传进来的属性");
    };
  }

  @logClassB("小慧")
  class HttpClients {
    constructor() {}
    getDate() {}
  }

  let https: any = new HttpClients();
  console.log(https);
  /** 构造函数装饰器 */
  function logClassC(target: any) {
    console.log(target, 1111);
    //用在这里继承目标类并重载方法和属性
    return class extends target {
      a: any = "我是修改后的属性";
      getDate() {
        console.log(this.a + "--装饰器中的方法输出的");
      }
    };
  }

  @logClassC
  class HttpClient2 {
    public a: string | undefined;
    constructor() {
      this.a = "我是构造函数里面的a";
    }
    getDate() {
      console.log(this.a);
    }
  }
  const https2 = new HttpClient2();
  https2.getDate();
}
