# Console 对象

Console 对象提供了访问浏览器调试模式的信息到控制台。

| 方法                     | 描述                                                                                              |
| :----------------------- | :------------------------------------------------------------------------------------------------ |
| console.assert()         | 如果断言为 false，则在信息到控制台输出错误信息。                                                  |
| console.clear()          | 清除控制台上的信息。                                                                              |
| console.count()          | 记录 count() 调用次数，一般用于计数。                                                             |
| console.error()          | 输出错误信息到控制台                                                                              |
| console.group()          | 在控制台创建一个信息分组。 一个完整的信息分组以 `console.group()` 开始，`console.groupEnd()` 结束 |
| console.groupCollapsed() | 在控制台创建一个信息分组。 类似 `console.group()` ，但它默认是折叠的。                            |
| console.groupEnd()       | 设置当前信息分组结束                                                                              |
| console.info()           | 控制台输出一条信息                                                                                |
| console.log()            | 控制台输出一条信息                                                                                |
| console.table()          | 以表格形式显示数据                                                                                |
| console.time()           | 计时器，开始计时间，与 `timeEnd()` 联合使用，用于算出一个操作所花费的准确时间。                   |
| console.timeEnd()        | 计时结束                                                                                          |
| console.trace()          | 显示当前执行的代码在堆栈中的调用路径。                                                            |
| console.warn()           | 输出警告信息，信息最前面加一个黄色三角，表示警告                                                  |
