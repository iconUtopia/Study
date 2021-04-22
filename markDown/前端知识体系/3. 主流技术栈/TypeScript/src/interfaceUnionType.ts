/*
 * 联合类型
 * 只要函数的一个参数有两种以上的类型就称为联合类型
 * 联合类型只提示公共的属性。
 * 只有在有联合类型的情况下才有类型保护（类型守护）
 */
namespace InterfaceUnionType {
  interface JieNiGui {
    tortoise: boolean;
    swim: () => {};
  }
  interface SuanTouWangBa {
    tortoise: boolean;
    yygq: () => {};
  }
  let Pokemon1: JieNiGui = {
    tortoise: true,
    swim: () => {
      console.log("杰尼龟使用冲浪");
      return true;
    }
  };
  let Pokemon2: SuanTouWangBa = {
    tortoise: false,
    yygq: () => {
      console.log("不会吧不会吧，不会还有人写代码掉头发吧");
      return true;
    }
  };
  // 第一种类型保护方案：类型断言方式
  function trainPokemon(pokemon: JieNiGui | SuanTouWangBa) {
    // 这里直接调用 pokemon.swim() 是会报错的，因为 SuanTouWangBa 不存在 swim()
    if (pokemon.tortoise) {
      (pokemon as JieNiGui).swim(); // 强制告诉 TS，pokemon 是 JieNiGui 类型
    } else (pokemon as SuanTouWangBa).yygq();
  }
  console.log("类型断言方式:");
  trainPokemon(Pokemon1);
  trainPokemon(Pokemon2);
  // 第二种类型保护方案： in 语法来做类型保护
  function trainPokemon2(pokemon: JieNiGui | SuanTouWangBa) {
    // 告诉 ts pokemon 里面有 swim
    if ("swim" in pokemon) {
      pokemon.swim();
    } else pokemon.yygq();
  }
  console.log("in:");
  trainPokemon2(Pokemon1);
  trainPokemon2(Pokemon2);
  // 第三种类型保护方案： typeof 语法来做类型保护
  function add(first: string | number, second: string | number) {
    // 这里直接 first + second 也会报错，因为有可能他们是 string 类型,这个时候也可以用类型保护
    if (typeof first === "string" || typeof second === "string") {
      return `${first}${second}`;
    }
    return first + second;
  }
  console.log("typeof:");
  console.log(add(1, 2));
  console.log(add("1", 2));
  // 第四种类型保护方案： instanceof 语法来做类型保护
  class NumberObj {
    // 因为只有 class 才能用 instanceof 做类型保护
    count: number = 1;
  }
  let numberObj = new NumberObj();
  function addSecond(first: object | NumberObj, second: object | NumberObj) {
    // 这里直接 first.count + second.count 也会报错，因为有可能他们是 object，没有 count 属性，这个时候也可以用类型保护
    if (first instanceof NumberObj && second instanceof NumberObj) {
      return first.count + second.count;
    }
    return 0;
  }
  console.log("instanceof:");
  console.log(addSecond(numberObj, numberObj));
  console.log(addSecond(numberObj, { count: 1 }));
}
