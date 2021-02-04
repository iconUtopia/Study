/**
 * 数组类型注解的方法
 */
namespace demo5 {
  const numberArr = [1, 2, 3];
  const numberArr2: number[] = [1, 2, 3];
  const stringArr: string[] = ["1", "2", "3"];
  const undefinedArr: undefined[] = [undefined, null];
  const arr = [1, "2", undefined, null];
  const arr2: (number | string)[] = [1, "2", undefined, null];
  const obj = [
    { name: "xiaoZhi", age: 16 },
    { name: "xiaoXia", age: 18 },
    { name: "xiaoGang", age: 20 }
  ];

  // type alias 类型别名
  type info = { name: string; age: number };
  class Info {
    name: string;
    age: number;
  }
  const obj2: info[] = [
    { name: "xiaoZhi", age: 16 },
    { name: "xiaoXia", age: 18 },
    { name: "xiaoGang", age: 20 }
  ];
  const obj3: Info[] = [
    { name: "xiaoZhi", age: 16 },
    { name: "xiaoXia", age: 18 },
    { name: "xiaoGang", age: 20 }
  ];
}
