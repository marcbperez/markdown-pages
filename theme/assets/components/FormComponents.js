import htm from "https://esm.sh/htm";
import { h } from "https://esm.sh/preact";

const html = htm.bind(h);

/**
 * Returns the capitalised version of the provided word.
 * @param {string} word The word to capitalise.
 * @returns {string} The capitalised word.
 */
const capitalise = (word) => word.charAt(0).toUpperCase() + word.slice(1);

/**
 * @typedef {Object} SelectProps
 * @property {string} id The ID of the select element.
 * @property {string} value The currently selected option.
 * @property {function} onChange Executed every time the value changes.
 * @property {string[]} options The list of options to choose from.
 */

/**
 * Renders a labeled select with custom change event behaviour.
 * @param {SelectProps} param0
 */
export function Select({ id, value, onChange, options }) {
  return html`<div>
    <label for=${id}>${capitalise(id)}</label>
    <select
      id=${id}
      value=${value}
      onChange=${onChange}
    >
      ${options.map((option) => html`<option value=${option}>
        ${capitalise(option)}
      </option>`)}
    </select>
  </div>`;
}

/**
 * Types of values that the checkbox can represent.
 * @readonly
 * @enum {string}
 */
export const CheckboxValue = {
  ON: "on",
  OFF: "off",
};

/**
 * @typedef {Object} CheckboxProps
 * @property {string} id The ID of the select element.
 * @property {CheckboxValue} value The currently selected option.
 * @property {function} onChange Executed every time the value changes.
 */

/**
 * Renders a labeled checkbox with custom change event behaviour.
 * @param {CheckboxProps} param0
 */
export function Checkbox({ id, value, onChange }) {
  return html`<div>
    <input
      id=${id}
      type="checkbox"
      checked=${value === CheckboxValue.ON}
      onChange=${onChange}
    />
    <label for=${id}>${capitalise(id)}</label>
  </div>`;
}
