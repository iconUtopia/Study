/**
 * 元组的使用和类型约束
 */
namespace demo6 {
  // 元组，一般只有在数据源是 csv 这种文件的时候才会使用元组来强化数组
  const arr: (string | number)[] = ["name", 28, "occupation"]; // 虽然代码没报错，但可能在业务逻辑上已经出现了错误
  const arr2: [string, string, number] = ["name", 28, "occupation"];
}
