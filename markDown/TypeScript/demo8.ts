/**
 * 类的概念和使用
 */
namespace demo8 {
  class Demo8 {
    content = "Hi";
    say(text: string) {
      return this.content + " " + text;
    }
  }
  // 继承
  class ThisDemo extends Demo8 {
    // 重写
    // say() {
    //   return "honey";
    // }
    // super 关键字
    say() {
      return super.say("boy") + " friend";
    }
    answer(text: string) {
      return text;
    }
  }
  const boy = new Demo8();
  console.log(boy.say("gir"));
  const gir = new ThisDemo();
  console.log(gir.say());
  console.log(gir.answer("How are you"));
}
