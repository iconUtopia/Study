/**
 * Enum 枚举类型详细讲解
 */
namespace demo14 {
  enum Status {
    Boy,
    Girl,
    Man = 4,
    Woman
  }
  function howAddress(status: any) {
    switch (status) {
      case Status.Boy:
        return "Boy";
      case Status.Girl:
        return "Girl";
      case Status.Man:
        return "Man";
      case Status.Woman:
        return "Woman";
    }
  }
  // Enum 类型对象有默认的值，从 0 开始的枚举
  console.log(Status.Boy);
  console.log(Status.Girl);
  // Enum 类型对象可以给键赋值，从赋值的键开始递增
  console.log(Status.Man);
  console.log(Status.Woman);
  // 也可以通过下标查找到Enum 类型对象的值
  console.log(Status.Boy, Status[0]);
  const result = howAddress(1);
  console.log(`请称呼我 ${result}`);
}
