# Elements

A list of all the elements that can be used in Markdown documents to show
content. Read the [tutorial][tutorial] first if you want to know how they are
used to generate web pages.

## Text

```markdown
**Bold**, *italics* or ~~strikethrough~~, with multiple lines.\
Subscript H~2~O or superscript X^2^.
```

**Bold**, *italics* or ~~strikethrough~~, with multiple lines.\
Subscript H~2~O or superscript X^2^.

## Headings

```markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>

## Quote

```markdown
> A section that is quoted from another source.
> The continuation of the text.
```

> A section that is quoted from another source.
> The continuation of the text.

## Definition

```markdown
Term name:
: Term definition.
```

Term name:
: Term definition.

## List

```markdown
- Item A
- Item B
- Item C
```

- Item A
- Item B
- Item C
  
## Ordered list

```markdown
1. First item
2. Second item
3. Third item
```

1. First item
2. Second item
3. Third item

## Checklist

```markdown
- [x] Task 1
- [x] Task 2
- [ ] Task 3
```

- [x] Task 1
- [x] Task 2
- [ ] Task 3

## Link

```markdown
[Link](/elements.html) to this page.
```

[Link](/elements.html) to this page.

## Image

```markdown
![Small image depicting a page.](assets/favicon.ico "Page icon")
```

![Small image depicting a page.](assets/favicon.ico "Page icon")

```markdown
This is an inline image: ![Small image depicting a page.](assets/favicon.ico "Page icon").
```

This is an inline image: ![Small image depicting a page.](assets/favicon.ico "Page icon").

The title at the end, `"Page icon"`, is optional and can be used for styling.

```css
img[title$="icon"] {
  border: 1px solid black;
}
```

## Table

```markdown
| Left-aligned | Center-aligned | Right-aligned | 
| :----------- | :------------: | ------------: |
| 10           | Red, blue.     | Done          |
| 256          | Red, yellow.   | Pending       |
```

| Left-aligned | Center-aligned | Right-aligned | 
| :----------- | :------------: | ------------: |
| 10           | Red, blue.     | Done          |
| 256          | Red, yellow.   | Pending       |

## Separator

```markdown
---
```

See the horizontal rules between the header, content and footer of this page.

## Footnote

```markdown
Here's a sentence with a footnote, the footnote itself must be defined at
the bottom of the document. [^1]
```

Here's a sentence with a footnote, the footnote itself must be defined at
the bottom of the document. [^1]

```markdown
[^1]: This is the footnote itself.
```

## Code

```markdown
This is an inline code block: `user = "dev"`.
```

This is an inline code block: `user = "dev"`.

In the pre-installed template, code highlighting is done by [Prism][prism-js].

``````markdown
```
<!DOCTYPE html>
<html>
  <head>
    <style>
      h1 {
        color: blue;
      }
    </style>
  </head>
  <body>
    <h1>Code highlighter</h1>
    <script>
      for (let i = 0; i < 10; i++) {
        alert(i);
      }
    </script>
  </body>
</html>
```
``````

```
<!DOCTYPE html>
<html>
  <head>
    <style>
      h1 {
        color: blue;
      }
    </style>
  </head>
  <body>
    <h1>Code highlighter</h1>
    <script>
      for (let i = 0; i < 10; i++) {
        alert(i);
      }
    </script>
  </body>
</html>
```

The language can be specified in the first line, like `` ```markup``. The 
available languages are `markup`, shown above and by default, `bash`, `css`,
`javascript`, `markdown`, `python` and `yaml`. New languages can be added to
the `module` list of the page metadata.

```yaml
module:
  - https://esm.sh/prismjs/components/prism-rust.min.js
```

## Math

```markdown
$a^2 + b^2 = c^2$

$v(t) = v_0 + \frac{1}{2}at^2$

$\gamma = \frac{1}{\sqrt{1 - v^2/c^2}}$  

$\int_{0}^{1} x dx = \left[ \frac{1}{2}x^2 \right]_{0}^{1} = \frac{1}{2}$

$e^x = \sum_{n=0}^\infty \frac{x^n}{n!} = \lim_{n\rightarrow\infty} (1+x/n)^n$
```

$a^2 + b^2 = c^2$

$v(t) = v_0 + \frac{1}{2}at^2$

$\gamma = \frac{1}{\sqrt{1 - v^2/c^2}}$  

$\int_{0}^{1} x dx = \left[ \frac{1}{2}x^2 \right]_{0}^{1} = \frac{1}{2}$

$e^x = \sum_{n=0}^\infty \frac{x^n}{n!} = \lim_{n\rightarrow\infty} (1+x/n)^n$

## HTML

```markdown
Text with <small>smaller</small> text inside.

<div>
  <p>All content inside an HTML element must be HTML.</p>
</div>
```

Text with <small>smaller</small> text inside.

<div>
  <p>All content inside an HTML element must be HTML.</p>
</div>

[^1]: This is the footnote itself.

[tutorial]: tutorial.md
[prism-js]: https://prismjs.com/
