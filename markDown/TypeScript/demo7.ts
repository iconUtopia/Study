/**
 * 初识接口 interface
 */
namespace demo7 {
  /**
   * interface 和 type 的区别:
   * type Info = string 写法，但interface不可以
   */
  interface Info {
    name: string;
    age: number;
    bust: number;
    waistline?: number; // : 号前加 ? 表示该参数可有可无
    [propName: string]: any; // 这样就可在对象里添加任何东西不受约束
    say(): string; // say 方法的返回值必须是 string
  }
  // interface 的继承
  interface Teacher extends Info {
    teach(): string;
  }
  // 实现 interface 对 类的约束
  class Server implements Info {
    name = "小丽";
    age = 18;
    bust = 42;
    say() {
      return "hello";
    }
  }
  const user = {
    name: "小红",
    age: 28,
    bust: 36,
    waistline: 21,
    sex: "女",
    say() {
      return "欢迎光临";
    },
    teach() {
      return "同学们好";
    }
  };
  const screenResume = (info: Info) => {
    info.age < 24 && info.bust >= 90 && console.log("pass " + info.name);
    (info.age >= 24 || info.bust < 90) && console.log("out " + info.name);
  };
  screenResume(user);
  const getResume = (info: Teacher) => {
    console.log("姓名：" + info.name);
    console.log("年龄：" + info.age);
    console.log("胸围：" + info.bust);
    info.waistline && console.log("腰围：" + info.waistline);
    info.sex && console.log("性别：" + info.sex);
  };
  getResume(user);
}
