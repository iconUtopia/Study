# React-router

第三方库，依赖基础是 history 路由方案，可以兼容在不同浏览器、环境下对历史记录的管理，拥有统一的 API。分为三类，通过覆盖某些基础公用方法（go()、replace()、push()等）：

- HashRouter：通过 hash 来实现兼容，对应 `createHashHistory()`
  - 使用 `location.hash` 方法和 `hashchange` 事件来构建路由。
- BrowserRouter：通过 history 来实现，对应 `createBrowserHistory()`
  - 使用 `pushState()` 方法和 `popstate` 事件来构建路由
- MemoryRouter：node 环境下，主要存储在 memory 里，对应 `createMemoryHistory()`

### API
- 前进
  - HashRouter：`pushState()`、`replaceState()`
  - BrowserRouter：`location.hash=****`、`location.replace()`
  - MemoryRouter：在内存中进行历史记录的存储
- 回退：
  - HashRouter：`popstate`
  - BrowserRouter：`hashchange`
  - MemoryRouter：在内存中进行历史记录的存储