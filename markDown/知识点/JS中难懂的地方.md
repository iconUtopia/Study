# 作用域

## JS作用域中的特殊情况

###### 函数的参数
```js
function fn(age){}
console.log(age)
```
函数的参数属于函数局部作用域里的变量

###### for循环
```js
for(var i=0;i<10;i++){}
console.log(i)
```
当for循环使用 `var` 进行声明循环变量的时候，在循环体外是能访问到循环变量的。

使用`let`、`const`的时候，在循环体外就不会被访问到

###### `try…catch`
```js
try{}
catch(err){
  console.log(err)
  var test1 = 1
  let test2 = 2
}
console.log(test1)
console.log(test2)
console.log(err)
```
`try…catch`的`catch`的参数在执行体外并不能访问到；使用`var`声明变量的时候，在执行体外又能访问到；但使用`let`或`const`声明的变量在执行体外并不能访问到。


# 全局对象