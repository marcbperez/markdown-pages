# Tutorial

Install markdown-pages with the [installation command][get-markdown-pages]
first.

## Sites

In a new folder, add a bit of Markdown to `index.md` and run `markdown-pages`.
[http://localhost:8000][dev-server-home] will show the `docs/index.html` that
results from converting `index.md`. The `docs` folder contains all the generated
pages and assets of the site, it is the public directory. Any changes made to
the sources will be reflected in `docs` automatically. Press `CTRL+C` to stop
the site generator and the web server.

```bash
mkdir my-website
cd my-website
echo "# Home" > index.md
markdown-pages
```

## Pages

To create a new page add a Markdown or HTML file. Markdown files are converted
to HTML with the help of a template. HTML files are copied to the `docs` folder
directly. Files with extensions `.draft.md` or `.draft.html` will be excluded,
and so will the files in each line of `.exclude`. Add content to `about.md` for
[http://localhost:8000/about.html][dev-server-about] to appear.

```bash
echo "# About" > about.md
markdown-pages
```

## Metadata

Pages themselves can set their metadata in the header. Add the required title,
description and author information to `about.md` to change the values shown at
[http://localhost:8000/about.html][dev-server-about].

```markdown
---
title: My website
description: My website in cyberspace
author:
  - Jane Dev
---

# About
```

The `metadata` folder contains YAML files that set page metadata, but page
headers will override them.

```bash
mkdir metadata
```

Copy the header of `about.md` inside `metadata/about.yaml`, and add page links
to `nav`. Since the YAML file contains the same values, the page header can be
removed.

```yaml
---
title: My website
description: My website in cyberspace
author:
  - Jane Dev
nav:
  - label: Home
    href: /index.html
  - label: About
    href: /about.html
---
```

The `metadata/default.yaml` file is applied to all pages, but a metadata file
for a page will override it. Move the contents of `metadata/about.yaml` to
`metadata/default.yaml`, and [http://localhost:8000][dev-server-home] will show
the new values.

```bash
mv metadata/about.yaml metadata/default.yaml
```

## Sitemap

The sitemap at [https://localhost:8000/sitemap.xml][dev-server-sitemap] is
generated from `metadata/sitemap.yaml`. The required parameters are `base` and
`url.loc`. `url.loc` is relative to `base`.

```yaml
---
base: https://www.my-website.net
url:
  - loc: /
    lastmod: 2024-01-01
    changefreq: monthly
    priority: 0.5
---
```

Add a link to the sitemap in the navigation list of `metadata/default.yaml`.

```yaml
---
title: My website
description: My website in cyberspace
author:
  - Jane Dev
nav:
  - label: Home
    href: /index.html
  - label: About
    href: /about.html
  - label: Sitemap
    href: /sitemap.xml
---
```

## Feed

The RSS feed at [https://localhost:8000/rss.xml][dev-server-rss] is generated
from `metadata/rss.yaml`. `channel`, `channel.link`, `channel.title`,
`channel.description`, `item.link`, `item.title` and `item.description` are
required. `item.link`, `image.url` and `enclosure.url` are relative to
`channel.link`. `item.enclosure.length` is in bytes.

```yaml
---
channel:
  title: My website
  link: https://www.my-website.net
  description: My website in cyberspace
item:
  - link: /
    title: Home
    description: My website's homepage.
---
```

Set the `rss` parameter and add a link to the RSS feed in the navigation list of
`metadata/default.yaml`.


```yaml
---
rss: /rss.xml
title: My website
description: My website in cyberspace
author:
  - Jane Dev
nav:
  - label: Home
    href: /index.html
  - label: About
    href: /about.html
  - label: RSS
    href: /rss.xml
  - label: Sitemap
    href: /sitemap.xml
---
```

## Assets

The `assets` folder can contain anything, it is copied entirely to `docs`. To
copy any other file add it to `.include`.

```bash
mkdir assets
echo "There are more than 1 billion websites in cyberspace." > assets/fact.txt
echo "This project is open source." > LICENSE
echo LICENSE >> .include
```

In page documents like `index.md` files are accessed via the `/assets` route,
available at `http://localhost:8000/assets`. 

```markdown
# Home

- Download a [fact about the web](/assets/fact.txt) in text format.
- Read the [LICENSE](/LICENSE).
```

## Stylesheets

Add a stylesheet to the assets folder, like `assets/style.css`.

```css
main h1 {
  font-size: 3em;
}
```

Then add it to the metadata in `metadata/default.yaml`. `style` can include any
URL that responds with a valid stylesheet.

```yaml
---
rss: /rss.xml
title: My website
description: My website in cyberspace
author:
  - Jane Dev
nav:
  - label: Home
    href: /index.html
  - label: About
    href: /about.html
  - label: RSS
    href: /rss.xml
  - label: Sitemap
    href: /sitemap.xml
style:
  - /assets/style.css
---
```

## Scripts

Add a script to the assets folder, like `assets/script.js`.

```javascript
alert("Hello, visitor!");
```

Then add it to the metadata in `metadata/default.yaml`. `script` can include any
URL that responds with a valid script.

```yaml
---
rss: /rss.xml
title: My website
description: My website in cyberspace
author:
  - Jane Dev
nav:
  - label: Home
    href: /index.html
  - label: About
    href: /about.html
  - label: RSS
    href: /rss.xml
  - label: Sitemap
    href: /sitemap.xml
style:
  - /assets/style.css
script:
  - /assets/script.js
---
```

## Modules

Add a module to the assets folder, like `assets/Counter.js`.

```javascript
import htm from "https://esm.sh/htm";
import { h, render } from "https://esm.sh/preact";
import { useState } from "https://esm.sh/preact/hooks";

const html = htm.bind(h);

export function Counter() {
  const [value, setValue] = useState(0);
  return html`<button onClick=${() => setValue(value + 1)}>
    Clicked ${value} ${value === 1 ? 'time' : 'times'}
  </button>`;
}

render(html`<${Counter} />`, document.getElementById("counter"));
```

Then add it to the metadata in `metadata/default.yaml`. `module` can include any
URL that responds with a valid module.

```yaml
---
rss: /rss.xml
title: My website
description: My website in cyberspace
author:
  - Jane Dev
nav:
  - label: Home
    href: /index.html
  - label: About
    href: /about.html
  - label: RSS
    href: /rss.xml
  - label: Sitemap
    href: /sitemap.xml
style:
  - /assets/style.css
script:
  - /assets/script.js
module:
  - /assets/Counter.js
---
```

To use the new module add an HTML element with `id="counter"` to a document like
`index.md`.

```markdown
# Home

- Download a [fact about the web](/assets/fact.txt) in text format.
- Read the [LICENSE](/LICENSE).

<p id="counter"></p>
```

## Templates

The `template` folder contains HTML and XML files that use metadata to generate
page layouts.

```bash
mkdir template
```

Templates are applied to pages by name. The `template/index.html` template is
applied to `index.md`. `template/default.html` is applied to all pages, but a
template for a page will override it.

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title>$title$</title>
$if(author)$$
for(author)$
  <meta name="author" content="$author$">
$endfor$
$endif$
$if(description)$
  <meta name="description" content="$description$">
$endif$
$if(rss)$
  <link rel="alternate" type="application/rss+xml" href="$rss$">
$endif$
$if(theme.style)$
$for(theme.style)$
  <link rel="stylesheet" href="$theme.style$">
$endfor$
$endif$
$if(style)$
$for(style)$
  <link rel="stylesheet" href="$style$">
$endfor$
$endif$
$if(theme.module)$
$for(theme.module)$
  <script type="module" src="$theme.module$"></script>
$endfor$
$endif$
$if(module)$
$for(module)$
  <script type="module" src="$module$"></script>
$endfor$
$endif$
</head>

<body>
  <header>
    <h1><a href="/">$title$</a>$if(description)$<br><small>$description$</small>$endif$</h1>
$if(nav)$
    <nav>$for(nav)$<a href="$nav.href$">$nav.label$</a>$sep$ / $endfor$</nav>
$endif$
  </header>

  <main>
$body$
$if(counter)$<p id="counter"></p>$endif$
  </main>

  <footer>
    <p><a href="/">$title$</a>$if(description)$<br><small>$description$</small>$endif$</p>
$if(nav)$
    <nav>$for(nav)$<a href="$nav.href$">$nav.label$</a>$sep$ / $endfor$</nav>
$endif$
  </footer>

$if(theme.script)$
$for(theme.script)$
  <script src="$theme.script$"></script>
$endfor$
$endif$
$if(script)$
$for(script)$
  <script src="$script$"></script>
$endfor$
$endif$
</body>

</html>
```

Add the `counter` parameter to the metadata in `metadata/default.yaml` to show
the counter of the template.

```yaml
---
rss: /rss.xml
title: My website
description: My website in cyberspace
author:
  - Jane Dev
nav:
  - label: Home
    href: /index.html
  - label: About
    href: /about.html
  - label: RSS
    href: /rss.xml
  - label: Sitemap
    href: /sitemap.xml
style:
  - /assets/style.css
script:
  - /assets/script.js
module:
  - /assets/Counter.js
counter: yes
---
```

And remove the counter element from `index.md`.

```markdown
# Home

- Download a [fact about the web](/assets/fact.txt) in text format.
- Read the [LICENSE](/LICENSE).
```

## Theme

The `theme` folder contains assets, metadata and templates used when the project
does not provide them. In that case, it will get them from the installation.

```bash
mkdir -p theme/assets theme/metadata theme/template
```

The `theme/assets` folder can contain anything, it is copied entirely to `docs`.
In page documents like `index.md` files are accessed via the `/theme` route,
available at `http://localhost:8000/theme`. Use only the stylesheet and module.

```bash
mv assets/style.css assets/Counter.js theme/assets
```

Use the template from `template/default.html` and delete the empty folder.

```bash
mv template/default.html theme/template
rm -rf template
```

Put the metadata needed for a new project inside `theme/metadata/default.yaml`.

```yaml
---
title: My website
description: My website in cyberspace
author:
  - Jane Dev
nav:
  - label: Home
    href: /index.html
theme:
  style:
    - /theme/style.css
  module:
    - /theme/Counter.js
counter: yes
---
```

And leave only the metadata for the current project in `metadata/default.yaml`.

```yaml
---
rss: /rss.xml
nav:
  - label: Home
    href: /index.html
  - label: About
    href: /about.html
  - label: RSS
    href: /rss.xml
  - label: Sitemap
    href: /sitemap.xml
script:
  - /assets/script.js
---
```

## Tests

The `test` folder contains Spock test cases named `*Spec.groovy`.

```bash
mkdir test
```

To check that the homepage, sitemap and feed exist add a new test for it, like
`test/MySiteSpec.groovy`. 

```javascript
/* groovylint-disable CompileStatic, JavaIoPackageAccess, NoWildcardImports */
/* groovylint-disable MethodName, FactoryMethodName, MethodReturnTypeRequired */
/* groovylint-disable ClassJavadoc, JUnitPublicNonTestMethod */

import spock.lang.*

class WebPagesSpec extends Specification {

    def 'at least the index source should exist'() {
    expect:
        new File('index.md').exists()
    }

    def 'at least the index output should exist'() {
    expect:
        new File('docs/index.html').exists()
    }

    def 'the sitemap source should exist'() {
    expect:
        new File('metadata/sitemap.yaml').exists()
    }

    def 'the sitemap output should exist'() {
    expect:
        new File('docs/sitemap.xml').exists()
    }

    def 'the feed source should exist'() {
    expect:
        new File('metadata/rss.yaml').exists()
    }

    def 'the feed output should exist'() {
    expect:
        new File('docs/rss.xml').exists()
    }

}
```

## Publish

Go live for free at [Neocities][neocities], [GitLab Pages][gitlab-pages], or
[GitHub Pages][github-pages]. For self-hosting use the `docs` folder as the
public directory of the HTTP server.

## Next steps

The [Elements page][elements] lists everything the Markdown documents can show.

[get-markdown-pages]: /index.html#get-markdown-pages
[dev-server-home]: http://localhost:8000
[dev-server-about]: http://localhost:8000/about.html
[dev-server-sitemap]: http://localhost:8000/sitemap.xml
[dev-server-rss]: http://localhost:8000/rss.xml
[neocities]: https://neocities.org/
[gitlab-pages]: https://docs.gitlab.com/ee/user/project/pages/
[github-pages]: https://pages.github.com/
[elements]: /elements.html
