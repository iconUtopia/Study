const files = require.context("./", true, /\.vue$/);
const path = require("path");
const modules = {};
files.keys().forEach(key => {
  console.log(
    "%c 🥟 key: ",
    "font-size:20px;background-color: #FFDD4D;color:#fff;",
    key
  );
  const name = path.basename(key, ".vue");
  console.log(
    "%c 🍛 name: ",
    "font-size:20px;background-color: #FFDD4D;color:#fff;",
    name
  );
  console.log(
    "%c 🥨 files(key): ",
    "font-size:20px;background-color: #ED9EC7;color:#fff;",
    files(key)
  );
  modules[name] = files(key).default || files(key);
  console.log(
    "%c 🍥 modules[name]: ",
    "font-size:20px;background-color: #EA7E5C;color:#fff;",
    modules[name]
  );
});
export default modules;
// export default files.keys().reduce((components, key) => {
//   [...components, ...files(key).default], [];
// });
