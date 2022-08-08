# Redux 面试题

## Redux 是什么？

Redux 是一个数据管理库，用于整个应用程序的状态管理，包括存储单一数据源，以及提供变更数据、读取数据、的方法。以此来明确数据的来源，方便调试和问题的定位。可以在不同的环境中运行，表现出一致的行为。易于应用程序测试。

---

## Redux 三原则是什么？

- 单一数据源：整个应用只存在唯一一个 Store，Store 的 State 被储存在唯一的 object tree 中。
- 状态（State）是只读的：State 不可操作，唯一可以改变 State 的方法就是触发 Action，让 Reducer 返回全新引用的 State。
- Reducer：是一个纯函数，描述 Action 如何改变 State。

### Redux 的组件

- State：Store 中存储状态的数据。
- Action：描述如何操作 State 的对象。一般会写成 actionCreator 函数的形式，返回 action 对象，对象的 type 属性用于标识当前的动作。
- Reducer：Redux 的核心，内部处理接受到 Action 后返回新的 state 的逻辑。Reducer 可进行嵌套，一个 Store 只能由一个 Reducer。
- Store：由 State、Reducer、Action 组成的对象，一个应用仅一个。并提供读取应用的 State，监听 State 变化，以及派发（dispatch） Action 等操作。

```js
// Action
const ADD_TYPE = "ADD";
const addActionCreator = (num) => ({ type: ADD_TYPE, num });
const squareActionCreator = (num) => ({ type: "SQUARE" });
// Reducer
const reducer = (state = 10, action) => {
  switch (action.type) {
    case "ADD":
      return state + action.num;
    case "SQUARE":
      return state * state;
    default:
      return state;
  }
};
// Store
const store = createStore(reducer);
console.log(store.getState()); // 10
console.log(store.dispatch(addActionCreator(1))); // {type:"ADD",num:1}
console.log(store.getState()); // 11
console.log(store.dispatch(squareActionCreator(1))); // {type:"SQUARE"}
console.log(store.getState()); // 121
```

### Redux 的数据流

View 在 Redux 中派发一个 Action，Action 通过 `store.dispatch()` 派发给 Store，Store 接收到 Action 连同之前老的 State 一期传给 Reducer，Reducer 返回新的数据给 Store，Store 改变自己的 State。

### Redux 怎么重置状态

现在 Store 初始化时保存状态，然后在 Reducer 中定义 `type=RESET` 的初始化 Action 逻辑。

---

## Redux 的中间件

中间提供第三方插件的模式，拦截 Redux 数据流从 action -> reducer 变为 action -> middleware -> reducer。实现异步 action，action 过滤，日志输出，异常报告等功能。

### 常见的 Redux 的中间件

- React-redux：处理显示组件和容器组件之间的连接
- Redux-logger：提供日志输出
- Redux-thunk：改变 Redux 中原本 `dispatch` 的作用，使它可以接受一个 function 作为参数，且这个 function 可以进行异步操作。
- Redux-saga：用于处理副作用（AJAX）的中间件，使用 Generator 函数。
- Redux-promise：处理异步操作，actionCreator 的返回值是 promise

#### Redux 中 Action 异步和同步的最大区别

- 异步 Action：执行 `dispatch()` 后，对应的 Reducer 立即执行，Reducer 执行完后 State 立即改变，此时通过 `getState()` 获得的是新的 State 值。
- 同步 Action：执行 `dispatch()` 处理异步的 Action，目标 State 不会立即改变。

#### Redux 中怎么发起网络请求？

Redux 本身不适合发起网络请求，因为 Redux 的组件中 Reducer 是纯函数，不能有副作用，不适合进行异步操作。必须使用中间件：

- Redux-thunk： `dispatch` 可以接受异步 function。
- Redux-saga：使用 saga 定义的 Generator 函数。

---

## Redux 有什么优缺点？

- 优点：
  - 结果的可预测性：
  - 可维护性：通过可预测的结果和严格的结构，代码变的更容易维护。
  - 易于测试：Redux 的代码主要是小的、纯的和隔离的函数。
- 缺点：每一次 dispatch 都会从根节点的 Reducer 到子节点的 Reducer 嵌套递归的执行，效率低，且会造成传递过程中的组件都重新渲染。

### Redux 如何做到局部渲染？

有疑问

合理利用 Selector，在 connect 函数中的第一个函数 `mapStateToProps` ，从 Store state 返回当前组件需要使用的 props，需要一个筛选器 Selector，

---

## Redux 中如何定义操作？

React 中的操作必须具有 type 属性，该属性指示正在执行的操作的类型。它们必须被定义为一个字符串常量，且可以添加更多的属性。

Redux 中，操作是使用 Action creator 的函数创建的。

---

## RxJS 是什么？

可以 RxJS 当作用来处理事件的 Lodash，它使用 Observable 序列来编写异步和基于事件的程序。它提供了一个核心类型 Observable，以及附属类型（Observer、Schedulers、Subjects）和受 Array extras 启发的操作符（map、filter、reduce、every 等），这些数组操作符可以把异步事件作为集合来处理。

---

## 可以不使用 Redux 吗？

可以利用 Context API 组合 useReducer 实现简化的 Redux。但没法实现数据修改的单一性，清晰的数据流向，依赖不可变性的数据实现时间旅行等，这是 React 原始 API 不具备的。
