/**
 * Static Typing
 * ts 静态类型
 */
namespace demo2 {
  //  let 变量: 类型 = 值，定义类型后，修改赋值不可更改值得类型，且变量继承了类型的方法
  let count: number = 1;

  // 自定义静态类型
  interface DIYType {
    uname: string;
    age: number;
  }

  let xiaoMing: DIYType = {
    uname: "xiaoMing",
    age: 12
  };
  console.log(xiaoMing);

  // 基础静态类型：null,undefined,boolean,void,symbol,number,string
  let userName: string = "name";
  let age: number = 18;

  // 对象静态类型，const 声明后必去初始化对象，种类有：{}、[]、class、function
  const obj: {
    str: string;
    num: number;
  } = {
    str: "name",
    num: 1996
  };

  const obj1: string[] = ["前端", "后端", "数据库", "123"];

  class ClassType {}
  const classKey: ClassType = new ClassType();

  const fnType: () => string = () => {
    return "1";
  }; // 定义的时候必须是函数，并且有返回值必须是字符串
}
