/**
 * 联合类型和类型保护（类型守护）
 * 只有在有联合类型的情况下才有类型保护
 */
namespace demo13 {
  interface Waiter {
    anjiao: boolean;
    say: () => {};
  }

  interface Teacher {
    anjiao: boolean;
    skill: () => {};
  }
  // 只要函数的一个参数有两种以上的类型就称为联合类型
  // 类型守护
  // 一
  function judgeWho(animal: Waiter | Teacher) {
    if (animal.anjiao) {
      (animal as Teacher).skill();
    } else {
      (animal as Waiter).say();
    }
  }
  // 二
  function judgeWho2(animal: Waiter | Teacher) {
    if ("skill" in animal) {
      animal.skill();
    } else {
      animal.say();
    }
  }
  // 三
  function add(first: string | number, second: string | number) {
    if (typeof first === "string" || typeof second === "string") {
      return `${first}${second}`;
    } else {
      return first + second;
    }
  }
  // 四
  class NumberObj {
    count: number = 0;
  }
  function addObj(first: object | NumberObj, second: object | NumberObj) {
    if (first instanceof NumberObj && second instanceof NumberObj) {
      return first.count + second.count;
    }
    return 0;
  }
}
