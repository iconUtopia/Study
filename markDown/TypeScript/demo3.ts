/**
 * type annotation 类型注解
 * type inference 类型推断
 */
namespace demo3 {
  // 类型注解 变量:类型
  let count: number;
  count = 123;

  // 类型推断
  let count2 = 123;

  // ts 能自动推断的时候就让其自行推断，不能推断的时候再注解
  const one = 1;
  const two = 2;
  const three = one + two;

  function getTotal(one: number, tow: number) {
    return one + tow;
  }
  const total = getTotal(1, 2);

  const demo3Obj = {
    name: "name",
    age: 18
  };
}
