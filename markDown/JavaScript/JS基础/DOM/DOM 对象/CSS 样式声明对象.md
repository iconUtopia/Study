# CSS 样式声明对象(CSSStyleDeclaration)

CSSStyleDeclaration 对象表示一个 CSS 属性-值（property-value）对的集合。

## CSSStyleDeclaration 对象属性

| 属性                  | 描述                                                              |
| :-------------------- | :---------------------------------------------------------------- |
| element.style.cssText | 设置或返回样式声明文本，cssText 对应的是 HTML 元素的 style 属性。 |
| element.style.length  | 返回样式中包含多少条声明。                                        |
| object.parentRule     | 返回包含当前规则的规则。                                          |

## CSSStyleDeclaration 对象方法

| 方法                                              | 描述                                              |
| :------------------------------------------------ | :------------------------------------------------ |
| object.getPropertyPriority(propertyname)          | 返回指定的 CSS 属性是否设置了 "important!" 属性。 |
| object.getPropertyValue(propertyname)             | 返回指定的 CSS 属性值。                           |
| style.item(index)                                 | 通过索引方式返回 CSS 声明中的 CSS 属性名。        |
| object.removeProperty(propertyname)               | 移除 CSS 声明中的 CSS 属性。                      |
| object.setProperty(propertyname, value, priority) | 在 CSS 声明块中新建或者修改 CSS 属性。            |
