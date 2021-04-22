# Anchor 对象

Anchor 对象表示 HTML 超链接。

在 HTML 文档中 <a> 标签每出现一次，就会创建 Anchor 对象。

锚可用于创建指向另一个文档的链接（通过 href 属性），或者创建文档内的书签（通过 name 属性）。

您可以通过搜索 Document 对象中的 anchors[] 数组来访问锚，或者使用 document.getElementById()。

## Anchor 对象属性

| 属性                  | 描述                                    |
| :-------------------- | :-------------------------------------- |
| anchorObject.charset  | 设置或返回被链接资源的字符集            |
| anchorObject.href     | 设置或返回被连接资源的 URL              |
| anchorObject.hreflang | 设置或返回被链接资源的语言代码          |
| anchorObject.name     | 设置或返回一个链接的名称                |
| anchorObject.rel      | 设置或返回当前文档与目标 URL 之间的关系 |
| anchorObject.rev      | 设置或返回目标 URL 与之间当前文档的关系 |
| anchorObject.target   | 设置或返回何处打开拦截                  |
| anchorObject.type     | 设置或返回被链接资源的 MIME 类型        |
