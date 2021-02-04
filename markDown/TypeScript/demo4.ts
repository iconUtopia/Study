/**
 * 函数参数和返回值的类型注解
 */
namespace demo4 {
  function getTotal1(one: number, two: number) {
    return one + two + "";
  }

  // 定义函数返回值类型为 number，指函数返回值为number，会自动检查返回类型
  function getTotal2(one: number, two: number): number {
    return one + two + "";
  }

  const totla = getTotal1(1, 2);

  // 定义函数返回值类型为 void，指函数没有返回值
  function sayHello(): void {
    console.log("hello world");
    return "";
  }

  // 定义函数返回值类型为 never,函数永远执行不完
  function errorFn(): never {
    throw new Error();
    console.log("hello world");
  }
  function forNever(): never {
    while (true) {}
    console.log("hello world");
  }

  function add({ one, two }: { one: number; two: number }) {
    return one + two;
  }
  const total2 = add({ one: 1, two: 2 });
  function getNumber({ one }: { one: number }) {
    return one;
  }
  const num = getNumber({ one: 1 });
}
