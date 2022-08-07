# React 面试题

## React 是什么

React 是前端的一个 UI 渲染框架，通过组件化的方式解决视图层开发复用的问题，本质是一个组件化框架。

它的核心思路有三点，分别是声明式、组件化于通用性：

- 声明式的优势在于直观与组合
- 组件化的优势在与视图的拆分与模块复用，可以更容易做到高内聚低耦合
- 通用性在于一次学习，随处编写。比如 RN 等主要靠虚拟 DOM 来保证实现的。

这使得 React 适用范围变得足够广，无论是 Web、Native、VR，甚至 Shell 应用都可以进行开发。这也是 React 的优势。

但作为一个视图层的框架，React 的劣势也十分明显。它并没有提供完整的一揽子解决方案，在开发大型前端应用时，需要向社区寻找并整合解决方案。虽然一定程度傻姑娘促进了社区的繁荣，但也为开发者在技术选型和学习上增加了一定成本。

---

## React 为什么要使用 JSX

#### 一句话解释 JSX

为了更便捷高效的使用声明式开发组件，引入了 XML 语法结构的 JSX，JSX 是一个 JavaScript 的语法扩展，或者说是一个类似于 XML 的 ECMASCript 语法扩展。

#### 核心概念

React 本身并不强制使用 JSX，在不使用 JSX 的情况下，React 实现一个组建依赖于 `React.createElement()` 方法。而 JSX 更像是一种语法糖，通过类似 HTMl 的描述方式，描述函数对象，代码会显得更为简洁，代码结构层次更为清晰。因为 React 需要将组件转化为虚拟 DOM 树，而 XML 在树结构的描述上天生具有可读性强的优势。

```js
// 不使用 jsx
class Hello extends React.Component {
  render() {
    return React.createElement("div", null, `Hello ${this.props.toWhat}`);
  }
}
ReactDOM.render(
  React.createElement(Hello, { toWhat: "World" }, null),
  document.getElement("root")
);
// 使用 jsx
class Hello extends React.Component {
  render() {
    return <div>Hello {this.props.toWhat}</div>;
  }
}
ReactDOM.render(<Hello toWhat="World" />, document.getElement("root"));
```

#### 方案对比

React 设计初衷是**关注点分离**，将代码分隔为不同部分的设计原则，也是面向对象的程序设计的**核心概念**。

关注带你分离的价值在于简化程序的开发和维护，当关注点分开时，各部分可以重复使用，以及独立开发和更新，具有特俗价值的是能够稍后改进或修改一段代码，而无须知道其它部分的细节，必须对这些部分进行相应的更改。

##### 模版

React 团队觉得引入模版是一种不佳的实现，因为模版分离了技术栈，引入了很多独有的概念。而 JSX 并不会引入太多新的概念，他任然是 JS，比如条件渲染和循环渲染，这使得 React 的代码更简洁，更具有可读性。

##### 模板字符串

模板字符串会使得代码结构更复杂，不易于阅读，且开发工具的代码提示变得更为苦难。

---

## Class Component

### 生命周期

React 组件的生命周期啊分为三个周期：

1. **加载**阶段：创建阶段的生命周期函数，在组件的一辈子中，只执行一次。
2. **更新**阶段：根据组件的 state 和 props 的改变，有选择性的触发 0 次或多次。
3. **销毁**阶段：只执行一次

```js
class Counter extends React.Component {
  state = {
    count: 0,
  };
  handleClick = () => {};

  /* --- 加载阶段 --- */
  // 1. getDerivedStateFromProps
  static getDerivedStateFromProps(props, state) {
    // 作用：组件在 props 变化时更新 state。
    // 触发时机：1. props 被传入时；2. state 发生变化时；3. forceUpdate 被调用时。
    // 该钩子函数为静态方法，必须有返回值，null 表示无需更新 state。
    return null;
  }
  // 2. render()：第一次开始创建虚拟 DOM，进行 diff 算法，更新 dom 树都在此进行。（因为 return 之前，虚拟 DOM 还没创建，虚拟 DOM 在内存中创建好后，但还没挂载到页面上，不能操作 DOM）
  // 3. componentDidMount
  componentDidMount() {
    // 用于组建加载完成时做某些操作，比如发起网络请求或绑定事件，只调用一次。
    // 在浏览器环境下是真实 DOM 绘制完成后调用，但比如在 RN 环境下由于机器的性能所限，视图可能还在回之中
  }
  /* --- 更新阶段 --- */
  // 1. getDerivedStateFromProps
  static getDerivedStateFromProps() {}
  // 2. shouldComponentUpdate
  shouldComponentUpdate(nextProps, nextState) {
    // 通过返回 true 或 false 来判断是否需要触发新的渲染。组件尚未被更新，但 state 和 props 已更新
    // 因为时渲染出发的最后一道关卡，所以是性能优化的关键钩子，通过添加判断条件来阻止不必要的渲染。
    return shadowEqual(nextState, this.props) ||
      shadowEqual(nextState, this.state)
      ? true
      : false;
  }
  // 3. render()：根据新的 state 和 props，重新渲染内存中的虚拟 DOM 树。（调用完毕后，虚拟 DOM 和组件的 state 都是最新的，但页面还没重新渲染）
  // 4. getSnapshotBeforeUpdate
  getSnapshotBeforeUpdate(prevProps, prevState) {
    // 配合 React 的异步渲染机制出现的，返回值作为 componentDidUpdate 的第三个参数使用
    // 在更新之前获取一个快照，必须返回 null 或 更改之前的 props 或 state
  }
  // 5. componentDidUpdate
  componentDidUpdate(prevProps, prevState, snapshot) {
    // 此时组件更新完成，页面被重新渲染。可以使用 steState，会出发重新渲染，但要避免死循环。
  }
  /* --- 销毁阶段 --- */
  // componentWillUnmount
  componentWillUnmount(prevProps, prevState, snapshot) {
    // 组件将被卸载，此时还可以正常使用。用于自身的清理工作，接触事件绑定或取消定时器等。
  }

  render() {
    // 返回 JSX 结构，用于描述具体的渲染内容。render 函数并没真正的去渲染组件，渲染是 React 操作 JSX 描述结构来完成的。
    // render 函数是一个纯函数，不应该在里面产生任何副作用。
    return null;
  }
}
```

###### 被移除的生命周期：

1. `constructor()`：
   1. constructor 是 Class 的初始化函数，不属于 React 生命周期；
   2. constructor 中并不推荐处理初始化意外的逻辑；
   3. 移除 constructor，代码变得更简洁
2. `UNSAFE_componentWillMount()`：用于组建即将加载前的某些操作，被标记为弃用。因为在 React 异步渲染机制下，该方法可能被多次调用。
3. `UNSAFE_componentWillReceiveProps(nextProps)`：组件接受**更新**的 props 时调用。被标记为弃用，被 `getDerivedStateFromProps` 顶替，且 `getDerivedStateFromProps` 存在时，`UNSAFE_componentWillReceiveProps`不会被调用。
4. `UNSAFE_componentWillUpdate(nextProps, nextState)`：此时可以修改 state，`forceUpdate()` 会强制触发该钩子函数。被标记为弃用，因为后续的 React 异步渲染设置中可能会出现暂停更新渲染的情况。

#### 什么情况下会触发重新渲染

1. 函数组件：任何情况下都会重新渲染，没有生命周期，可用 `React.memo()` 优化。
2. `React.Component` 组件不使用 `shouldComponentUpdate()` 函数，有两种重新触发渲染：
   1. 当 state 变化时;
   2. 当父级组建的 props 传入时.
3. `React.PureComponent` 组件默认实现了 `shouldComponentUpdate()` 函数，仅在 props 于 state 浅比较后，确认有变更才会重新渲染。

#### 渲染中发生报错后会发生什么？

无论是 React 还是 React Native，如果没有错误边界，页面会突然白屏。但渲染时的报错只能通过 componentDidCatch 捕获。

##### 怎么处理？

设置错误边界，错误边界是一种 React 组件，这种组件可以捕获并打印发生在子组件树中任何位置的 JS 错误，并且会渲染出备用 ui。

```js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    // 处理当前 state ，使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }
  componentDidCath(error, errorInfo) {
    // 捕获报错的具体类型，然后将错误日志上报到服务端。
    logErrorToMyService(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong</h1>;
    }
    return this.props.children;
  }
}
```

---

### 类组建中的 constructor 中为什么一定要使用 super

1. es6 的 class 知识点
2. 为了继承父类，所以子类必须执行一次 `super()` 调用父组建的构造函数
3. `super()` 只能在派生类构造函数中和静态方法中调用，不能在调用 `super()` 之前饮用 `this`
4. 如果没有定义类构造函数 `constructor()`，在实例化派生类时会调用 `super()`，而且会传入所有传给派生类的参数

---

### setState 同步还是异步

`setState` 同步还是异步取决于它被调用的环境：

- 在 React 能够控制的范围被调用，它就是**异步**的，将状态合并后再进行 DOM 更新。比如：
  - 合成事件处理函数
  - 生命周期函数
- 在原生 JavaScript 控制的范围被调用，它就是**同步**的，被调用后会立即更新 DOM。比如：
  - 原生事件处理函数
  - 异步代码
  - 回调函数，

18 以后全部都是异步

#### Redux 状态管理与 setState() 有什么区别？

Redux 的 dispatch 最终也是会调用 react 的 setState。只使用 react，每个组件都可以有一个 state，每个组件各自管理各自的 state，如果更改 state 每个组件都需要使用 setState。Redux 将所有组件的 state 维护成一个全局的 state，保存到 store 里，需要更改 state 只需要 store 里些修改。

---

### class 组件中，事件中 this 为什么是 undefined

因为被编译后标准函数中的 `this` 指向的是 `window`，但 Babel 编译后在类中定义的方法都默认开启局部严格模式，禁止了函数里的 `this` 指向 `window`，所以返回 `undefined`

---

### 什么是合成事件

React 自己的事件系统模式：

- 解决兼容性
- 提高性能，自动事件委托。React 17 之前是添加在 `document` 上，之后添加在 `root` 上

#### 合成事件和原生事件的执行顺序

合成事件和原生事件的执行顺序与冒泡/捕获模式:

- V17 之前，**无关**，原生事件早于合成事件；
- V17 后，**相关**：
  - 冒泡模式：原生事件早于合成事件；
  - 捕获模式：合成事件早于原生事件。

---

## 对函数式编程的理解

### 函数式编程有两个核心概念：

- **数据不可变（无副作用）**： 它要求你所有的数据都是不可变的，这意味着如果你想修改一个对象，那你应该创建一个新的对象用来修改，而不是修改已有的对象。
- **无状态**： 主要是强调对于一个函数，不管你何时运行，它都应该像第一次运行一样，给定相同的输入，给出相同的输出，完全不依赖外部状态的变化

---

### 纯函数带来的意义

- **便于测试和优化**：这个意义在实际项目开发中意义非常大，由于纯函数对于相同的输入永远会返回相同的结果，因此我们可以轻松断言函数的执行结果，同时也可以保证函数的优化不会影响其他代码的执行。
- **可缓存性**：因为相同的输入总是可以返回相同的输出，因此，我们可以提前缓存函数的执行结果。
- **更少的 Bug**：使用纯函数意味着你的函数中不存在指向不明的 this，不存在对全局变量的引用，不存在对参数的修改，这些共享状态往往是绝大多数 bug 的源头。

---

## Function Component（React Hooks）

### 为什么不能在条件语句里写 Hook

hook 在每次渲染时的查找是根据一个**全局**的下标对链表进行查找的，如果放在条件语句中使用，有一定几率会造成拿到的状态出现错乱。

---

### HOC 和 Hook 的区别

hoc 能复用**逻辑和视图**，hook 只能复用**逻辑**。

---

### 什么是 Hook

Hook 是 React 16.8 新增的特性。让 React 函数可以使用 state 等特性。

React 内置的 Hook API：

- 基础 Hook：
  - useState
  - useEffect
  - useContext
- 额外的 Hook：
  - useReducer
  - useCallback
  - useMemo
  - useRef
  - useImperativeHandle
  - useLayoutEffect
  - useDebuyValue

#### Hook 解决了什么有问题？

Hook 的优点：

- 解决了组件之间复用状态逻辑难的问题，避免了毁掉地狱。
- 解决了复杂组件难以理解

#### Hook 为什么只能在 React 函数的最顶层

遵循 Hook 的规则：

- 只在最顶层使用 Hook：不能在循环、条件或嵌套函数中调用 Hook，保证 Hook 函数存储顺序的稳定性。
- 只在 React 函数中调用 Hook：因为函数组件有自己的 fiber， Hook 关联的数据存在 fiber 节点中。

---

### useEffect 和 useLayoutEffect 区别

- useEffect：可以用来**模拟生命周期**，即看可以完成某些副作用。
- useLayoutEffect：与 useEffect 的用法完全一致，作用也基本相同。唯一不同在执行时机，它会在所有的 DOM 变更之后**同步**调用 effect。

#### useEffect 依赖为空数组与 componentDidMount 区别

- `componentDidMount`：只在挂载阶段执行一次，在此钩子里更新数据，浏览器也只会渲染更新阶段的数据，可以避免闪屏
- `useEffect`：在依赖空数组的情况下，在真实的 DOM 渲染之后才会去执行，更新数据有可能会闪屏。

> 实际上 `useLayoutEffect` 会更接近 `componentDidMount` 的表现，它们都同步执行且会阻碍真实的 DOM 渲染的

---

### React.memo() 和 React.useMemo() 的区别

- `memo` 是一个高阶组件，默认情况下会对 `props` 进行浅比较，如果相等不会重新渲染。多数情况下我们比较的都是引用类型，浅比较就会失效，所以我们可以传入第二个参数手动控制。
- `useMemo` 返回的是一个缓存值，只有依赖发生变化时才会去重新执行作为第一个参数的函数，需要记住的是，`useMemo` 是在 `render` 阶段执行的，所以不要在这个函数内部执行与渲染无关的操作，诸如副作用这类的操作属于 `useEffect` 的适用范畴。

---

### React.useCallback() 和 React.useMemo() 的区别

- `useCallback`：可缓存函数，其实就是避免每次重新渲染后都去重新执行一个新的函数。
- `useMemo`：可缓存值。

有很多时候，我们在 `useEffect` 中使用某个定义的外部函数，是要添加到 `deps` 数组中的，如果不用 `useCallback` 缓存，这个函数在每次重新渲染时都是一个完全新的函数，也就是引用地址发生了变化，这就会导致 `useEffect` 总会无意义的执行。

---

### React.forwardRef 是什么及其作用

一般在父组件要拿到子组件的某个实际的 DOM 元素时会用到。

---

### 函数组件如何实现 forceUpdate

类组建通过 api `this.forceUpdate()` 强制更新组建;

函数组建实现：

```js
// 方法一： 使用 useReducer
const [, forceUpdate] = useReducer((x) => x++, 0);
// 方法二：手写 forceUpdate
const useForceUpdate = function () {
  const [state, setState] = useState(0);
  const update = useCallback(() => {
    setState((prev) => prev++);
  });
  return update;
};
```

---

## 类组件和函数组件的区别?

###### 共同点：

实际用途一样，无论是高阶组件，还是异步加载都可以用作基础组件展示 UI。

###### 不同点：

向较于类组件，函数组件更纯粹、简单、易测试。

- 基础认识：本质上代表两种不同的设计思想于心智模式。
  - 类组件的根基是 OOP，面向对象编程；
  - 函数组件的根基是 FP，也就是函数式程。
- 独有能力：由于根本思考方式不同，类组件通过生命周期包装业务逻辑。
- 使用场景：是否使用 Recompose 或 Hooks
  - 不使用，如需要使用生命周期，就只能用类组件，限定场景是固定的；
  - 使用，类组件于函数组件的能力边界完全相同，都可以使用类似生命周期等能力。
- 设计模式：
  - 类组件可以实现继承
  - 函数组建缺少继承能力
- 性能优化：
  - 类组件优化依靠 `shouldComponentUpdate` 函数去阻断渲染；
  - 函数组建靠 `React.memo` 来优化
- 未来趋势：函数组件成为了社区外来主推的方案。
  - this 的模糊性
  - 业务逻辑散落在生命周期中
  - React 组件代码缺乏标准的拆分方式

---

## 如何设计 React 组件

- 展示组件（哑组件、无状态组件）：只做展示、独立运行、不额外增加功能的组件。复用性更强
- 灵巧组件（有状态组件）：处理业务逻辑于数据状态的组件。更专注于业务本身。

---

## React 组件通信

- 父传子：
  - props
- 子传父：
  - 回调函数
- 兄弟组件：
  - 通过父组件中介传递
- 共祖先组件：
  - `React.createContext()`，但存储的变量难以追溯数据源以及缺人变动点。不利于组件的复用以及测试。
  - 状态管理框架：Redux、Mobx、Flux

---

## 举例一种你了解的 React 状态管理框架

#### Flux

MVC 更适合小型应用，会导致大型应用更复杂。FLUX 提出一种 MVC 意外的单项数据流：

- View：视图层，即代码中的 React 组件。
- Store：数据层，维护了数据和数据处理的逻辑。
- Dispatcher：管理数据流动的中央枢纽
- Action：一种事件通知，通常用 type 标记
  从应用场景看，Flux 除了在 Facebook 内部大规模应用外，业界很少使用了。

#### Redux

Redux 三原则：

- 单一数据源：整个应用的 state 被储存在一棵 object tree 中，并且 object tree 只存在唯一一个 Store 中
- 纯函数 Reducer：为了描述 Action 如何改变状态树，编写的一个纯函数的 Reducer
- state 是只读的：唯一可以改变 state 的方法就是触发 Action，Action 是用于描述已发生的普通对象

#### Mobx

---

## 虚拟(Virtual) DOM 的工作原理是什么？

虚拟(Virtual) DOM 的工作原理是通过 JS 对象模拟 DOM 节点。在 Facebook 初期构建 React 时考虑到要提升代码的抽象能力，避免人为的 DOM 操作降低代码整体风险的因素，所以引入了虚拟 DOM。在 `render()` 中写的 JSX 会被 Babel 编译成 `React.createElement()` 中的实参，`React.createElement()` 执行后会返回一个包含自身信息虚拟 DOM 的 object，这些 object 会组成一棵虚拟 DOM 树，当状态变更时，将变更前后的差异通过 diff 算法比较，然后对真实 DOM 进行操作

###### 优点：

1. 改善大规模操作的性能问题；
2. 规避 XSS 风险；
3. 较低的成本实现跨平台的开发。

###### 缺点：
1. 内存占用较高，因为需要模拟整个真实 DOM；
2. 无法进行极致优化。

---

## React 性能优化手段

- 使用 `React.memo` 来缓存组件。
- 使用 `React.useMemo` 缓存大量的计算。
- 避免使用匿名函数。
- 利用 `React.lazy` 和 `React.Suspense` 延迟加载不是立即需要的组件。
- 尽量使用 CSS 而不是强制加载和卸载组件。
- 使用 `React.Fragment` 避免添加额外的 DOM。

---

## React Fiber

Fiber 是对 React 核心算的重构，重构的产物就是 Fiber Reconciler。

核心目标：酷哒起**适应性**，包裹动画、布局和手势。分为 5 个目标：

- 把可中断的工作拆分成小任务
- 对正在做的工作调整优先次序、重做、复用上次的成果。
- 在父子任务之间从容切换，以支持 React 执行过程中的布局刷新

---

## Next.js

React 是前端的一个渲染框架，用于构建 SPA 单页应用。严重依赖用户侧的 JS 环境，首屏加载慢、安全问题以及 SEO。

nextJS 就是为了解决 React 存在的一些问题。通过渲染后移将 ssr 服务端渲染和 ssg 服务端生成，将原本在客户端进行数据渲染成 DOM 的行为后移到服务器上。通过三个方法：`getServerSideProps()`、`getStaticProps()` 和 `getStaticPaths()`

- getServerSideProps()：用来做服务端的**渲染**，在每一个请求的时候运行。
- getStaticProps() 和 getStaticPaths()：用来服务端**生成**，在生成静态页面的时候运行。
  - getStaticPaths()：用来枚举用户坑呢访问到的各种 ID

---

# 框架对比

## MVC 和 MVVM 的却别

- MVC：**单向数据**改变，默认只实现了数据的更改控制了视图
- MVVM：**双向数据**改变，不仅实现了数据控制视图，也实现了视图控制数据 `onchange()`

> 答：没区别，MVC 和 MVVM 都实现了数据影响视图，无非是 MVVM 默认替我们做好了视图影响数据，通过 onchange 或 oninput 就能达成视图影响数据了

## Vue 和 React 的区别

**vue 双向数据绑定基于 MVVM，react 是通多地方算法基于 MVC，比较数据有没有变化，有变化才会刷新。**

- vue 组件分为全局注册和局部注册，在 react 中都是通过 import 相应组件，然后模版中引用；
- props 是可以动态变化的，子组件也实时更新，在 react 中官方建议 props 要像纯函数那样，输入输出一致对应，而且不太建议通过 props 来更改视图；
- 子组件一般要显示地调用 props 选项来声明它期待获得的数据。而在 react 中不必需，另两者都有 props 校验机制；
- 每个 Vue 实例都实现了事件接口，方便父子组件通信，小型项目中不需要引入状态管理机制，而 react 必需自己实现；
- 使用插槽分发内容，使得可以混合父组件的内容与子组件自己的模板；
- 多了指令系统，让模版可以实现更丰富的功能，而 React 只能使用 JSX 语法；
- Vue 增加的语法糖 computed 和 watch，而在 React 中需要自己写一套逻辑来实现；
- react 的思路是 all in js，通过 js 来生成 html，所以设计了 jsx，还有通过 js 来操作 css，社区的 styled-component、jss 等；而 vue 是把 html，css，js 组合到一起，用各自的处理方式，vue 有单文件组件，可以把 html、css、js 写到一个文件中，html 提供了模板引擎来处理。
- react 做的事情很少，很多都交给社区去做，vue 很多东西都是内置的，写起来确实方便一些， 比如 redux 的 combineReducer 就对应 vuex 的 modules， 比如 reselect 就对应 vuex 的 getter 和 vue 组件的 computed， vuex 的 mutation 是直接改变的原始数据，而 redux 的 reducer 是返回一个全新的 state，所以 redux 结合 immutable 来优化性能，vue 不需要。
- react 是整体的思路的就是函数式，所以推崇纯组件，数据不可变，单向数据流，当然需要双向的地方也可以做到，比如结合 redux-form，组件的横向拆分一般是通过高阶组件。而 vue 是数据可变的，双向绑定，声明式的写法，vue 组件的横向拆分很多情况下用 mixin。

## Vue 和 React 怎么管理数据？

在数据绑定上来说，Vue 的特色是双向数据绑定 MVVM，而在 React 中是单向数据绑定 MVC。
