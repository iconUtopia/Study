/*
 * 泛型
 * 泛型就是解决类、接口、方法的复用性，以及对不特定数据类型的支持。
 * 要求:传入的参数和返回的参数一致
 */
namespace Demo6 {
  // T 可改成其他任意值但定义的值，和传入的参数以及返回的参数是一样的,一般默认写法是 T，也是业内规范的选择

  // 函数 的泛型
  console.log("函数 的泛型:");
  function getDate<T>(value: T): T {
    return value;
  }
  console.log(getDate<number>(123));
  function join<T, P>(first: T, second: P) {
    return `${first}${second}`;
  }
  console.log(join<number, string>(13, "14"));
  function arrT1<T1>(arr: T1[]) {
    return arr;
  }
  console.log(
    arrT1<string>(["123", "456", "789"])
  );
  function arrT2<T2>(arr: Array<T2>) {
    return arr;
  }
  console.log(
    arrT2<number>([123, 456, 789])
  );
  // 类 的泛型
  console.log("类 的泛型:");
  class MinClass<T> {
    public list: T[] = [];
    //添加
    add(value: T): void {
      this.list.push(value);
    }

    //求最小值
    min(): T {
      //假设这个值最小
      let minNum = this.list[0];
      for (let i = 0; i < this.list.length; i++) {
        //比较并获取最小值
        minNum = minNum < this.list[i] ? minNum : this.list[i];
      }
      return minNum;
    }
  }
  //实例化类 并且指定了类的T的类型是number
  let minClass = new MinClass<number>();
  minClass.add(23);
  minClass.add(5);
  minClass.add(2);
  console.log(minClass.min());
  //实例化类 并且指定了类的T的类型是string，则其方法的传参和返回都是string类型
  let minClass2 = new MinClass<string>();
  minClass2.add("23");
  minClass2.add("5");
  minClass2.add("2");
  console.log(minClass2.min());
}
