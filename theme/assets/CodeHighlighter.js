import Prism from "https://esm.sh/prismjs";
import htm from "https://esm.sh/htm";
import { h, render } from "https://esm.sh/preact";
import { useLayoutEffect } from "https://esm.sh/preact/hooks";
import { useStoredState } from "./hooks/useStoredState.js";
import { elementClass as themeFormPrefix } from "./ThemeForm.js";

const html = htm.bind(h);

/**
 * The ID of element this component will be rendered in.
 * @type {string}
 */
const elementId = "codehighlighter";

/**
 * Light theme CSS file for Prism.
 * @type {string}
 */
const lightCss = "https://esm.sh/prismjs/themes/prism-solarizedlight.min.css";

/**
 * Dark theme CSS file for Prism.
 * @type {string}
 */
const darkCss = "https://esm.sh/prismjs/themes/prism-okaidia.min.css";

/**
 * Highlights multi-language code elements using Prism and keeps their style up
 * to date with the page theme settings.
 */
export function CodeHighlighter() {
  /**
   * Creates a CSS link in the document header for Prism's theme, and updates it
   * depending on the theme.
   */
  const updateCssLink = () => {
    // Use the stored value of the theme or detect it if there is none.
    let theme = read("theme") || "detect";
    if (theme === "detect") {
      theme = matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark" : "light";
    }
    // Create the link element if it does not exist.
    let cssLink = document.getElementById(`${elementId}-theme`);
    if (!cssLink) {
      cssLink = document.createElement("link");
      cssLink.rel = "stylesheet";
      cssLink.id = `${elementId}-theme`;
      document.head.appendChild(cssLink);
    }
    // Set the CSS of the link element according to the theme.
    cssLink.href = theme === "dark" ? darkCss : lightCss;
  }

  /**
   * Update the CSS link every time the theme from the "stored state" changes.
   */
  const { read } = useStoredState(themeFormPrefix, updateCssLink);

  /**
   * Highlights `code` elements of multiple languages using Prism every time the
   * page loads.
   */
  useLayoutEffect(() => {
    // Set the theme for Prism first, then initialise the elements.
    updateCssLink();
    [...document.querySelectorAll("code")].forEach(code => {
      // Get the highlighter for this element or fall back to `language-markup`.
      const highlighter = (
        code.parentElement.nodeName === "PRE" &&
        code.parentElement.getAttribute("class")
      )
        ? `language-${code.parentElement.getAttribute("class")}`
        : "language-markup";
      code.classList.add(highlighter);
      // Set the messages shown when clicking on the "copy to clipboard" button.
      code.setAttribute("data-prismjs-copy", "📋");
      code.setAttribute("data-prismjs-copy-success", "✅");
      code.setAttribute("data-prismjs-copy-error", "❌");
    });
    // Highlight all the code elements in the page.
    try {
      Prism.highlightAll();
    } catch (error) { }
  }, []);

  // This component modifies external elements only.
  return null;
}

// Render this component in an element with ID like `elementId`.
render(html`<${CodeHighlighter} />`, document.getElementById(elementId));
