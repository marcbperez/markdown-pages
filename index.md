---
toc: false
---

# Hello, web!

Markdown-pages is a Static Site Generator for Markdown powered by Gradle,
Pandoc, Spock, Preact and a minimalistic template. **For Debian with Java 18 or
newer.**

## Get markdown-pages

```bash
curl -L https://raw.githubusercontent.com/marcbperez/markdown-pages/0.10.0/install.sh | sh
```

Installs the latest version in `~/.local/bin`. To change the default folder set
the first parameter. For example, `.../install.sh | sh -s -- .` uses the current
directory.

## Create a site

`markdown-pages` makes sites out of Markdown documents and shows them at
[http://localhost:8000][dev-server-home].

```bash
mkdir my-website
cd my-website
echo "# Home" > index.md
markdown-pages
```

## Next steps

[Continue to the tutorial][tutorial] to learn how to create a site with custom
assets, styles, scripts, templates and themes, and where to publish everything
for free.

For developers, the [Readme][readme] provides instructions on how to download, 
install and extend markdown-pages, and the [Change Log][changelog] keeps track
of its versions.

[dev-server-home]: http://localhost:8000
[tutorial]: /tutorial.html
[readme]: /README.html
[changelog]: /CHANGELOG.html
