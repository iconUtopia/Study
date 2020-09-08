const files = require.context('./', true, /\.vue$/)
const path = require('path')
const modules = {}
files.keys().forEach(key => {
  const name = path.basename(key, '.vue')

  modules[name] = files(key).default || files(key)
})
export default modules
// export default files.keys().reduce((components, key) => {
//   [...components, ...files(key).default], [];
// });
