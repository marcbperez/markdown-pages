import htm from "https://esm.sh/htm";
import { h, render } from "https://esm.sh/preact";
import { useState, useLayoutEffect } from "https://esm.sh/preact/hooks";
import { useStoredState } from "./hooks/useStoredState.js";
import { Select, Checkbox, CheckboxValue } from "./components/FormComponents.js";

const html = htm.bind(h);

/**
 * The CSS class of the elements this component will be rendered in, and the
 * prefix for its "stored-state".
 * @type {string}
 */
export const elementClass = "themeform";

/**
 * Types of fields allowed in the form rendered by this component.
 * @readonly
 * @enum {string}
 */
const FieldType = {
  SELECT: "select",
  CHECKBOX: "checkbox",
};

/**
 * Form field definition and behaviours.
 * @typedef {Object} Field
 * @property {FieldType} type Type of the field.
 * @property {string[]} [options] Optional. Options for type `FieldType.SELECT`.
 * @property {string} default Default field value.
 * @property {function} onChange Executed every time the field changes.
 * @property {function} updateBody Executed after the field changes.
 */

/**
 * Renders a form with components that change the CSS classes of the document
 * body, letting the user customise the theme of the page.
 */
export function ThemeForm() {
  /**
   * Adds the selected option as CSS class to the body and removes the rest,
   * given the ID of a select field and its value, the selected option.
   * @param {string} id The ID of the select field.
   * @param {string} value The value of the select field.
   */
  const updateBodyFromSelect = (id, value) => {
    for (let i = 0; i < fields[id]["options"].length; i++) {
      const option = fields[id]["options"][i];
      if (option === value) {
        // Add the selected option as CSS class to the body.
        document.body.classList.add(option);
      } else {
        // Remove the CSS class of the option that is not selected.
        document.body.classList.remove(option);
      }
    }
  };

  /**
   * Adds a checkbox ID as CSS class to the body when checked, or removes it
   * otherwise, given the ID of a checkbox field and its value.
   * @param {string} id The ID of the checkbox field.
   * @param {CheckboxValue} value The value of the checkbox field.
   */
  const updateBodyFromCheckbox = (id, value) => {
    (value === CheckboxValue.ON)
      ? document.body.classList.add(id)
      : document.body.classList.remove(id);
  };

  /**
   * Returns the first option to appear as a CSS class in the body, or nothing
   * if none of them are present.
   * @param {string[]} options The options of the select element.
   * @returns {string|undefined} The option found, or nothing.
   */
  const selectValueFromBody = (options) => {
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      if (document.body.classList.contains(option)) {
        return option;
      }
    }
  };

  /**
   * Returns the positive value for a checkbox if its ID appears as a CSS class
   * in the body, or the negative value otherwise.
   * @param {string} id The ID of the checkbox.
   * @returns {CheckboxValue} The found value of the checkbox.
   */
  const checkboxValueFromBody = (id) => {
    return document.body.classList.contains(id)
      ? CheckboxValue.ON
      : CheckboxValue.OFF;
  }

  /**
   * Form values shared through "stored state", because there might be several
   * instances of this component in the same page (ie. header and footer).
   */
  const [values, setValues] = useState({});

  /**
   * Load the "stored state" into the form values after every call to `save`
   * without updating the CSS classes in the body.
   */
  const { save, read } = useStoredState(elementClass, () => {
    let values = {};
    for (const [key, field] of Object.entries(fields)) {
      // Use the stored value or the field's default if there is none.
      values[key] = read(key) || field["default"];
    }
    // Update the form.
    setValues(values);
  });

  /**
   * Saves the value of a select element in "stored state" and updates the CSS
   * classes of the body according to the element, when the element changes.
   * @param {Event} e The change event of the select element.
   */
  const onChangeSelect = (e) => {
    const { id, value } = e.currentTarget;
    const { updateBody } = fields[id];
    save(id, value);
    updateBody(id, value);
  };

  /**
   * Saves the value of a checkbox element in "stored state" and updates the CSS
   * classes of the body according to the element, when the element changes.
   * @param {Event} e The change event of the checkbox element.
   */
  const onChangeCheckbox = (e) => {
    const { id, checked } = e.currentTarget;
    const { updateBody } = fields[id];
    const value = checked ? CheckboxValue.ON : CheckboxValue.OFF;
    save(id, value);
    updateBody(id, value);
  };

  /**
   * Load the "stored state" into the form values and update the CSS classes in
   * the body according to each field every time the page loads.
   */
  useLayoutEffect(() => {
    let values = {};
    for (const [key, field] of Object.entries(fields)) {
      // Use the stored value or the field's default if there is none.
      values[key] = read(key) || field["default"];
      field.updateBody(key, values[key]);
    }
    // Update the form.
    setValues(values);
  }, []);

  // Options and default value for the theme selector.
  const themeOptions = ["detect", "light", "dark"];
  const themeDefault = "detect";

  // Options and default value for the font size selector.
  const textOptions = ["small", "medium", "large"];
  const textDefault = "medium";

  // Options and default value for the font family selector.
  const fontOptions = ["monospace", "sans-serif", "serif"];
  const fontDefault = "serif";

  /**
   * Form configuration object with keys representing element ID's, and values
   * containing field paremeters.
   * @type {Object.<string, Field>}
   */
  const fields = {
    /** Theme name. */
    theme: {
      type: FieldType.SELECT,
      options: themeOptions,
      default: selectValueFromBody(themeOptions) || themeDefault,
      onChange: onChangeSelect,
      updateBody: (id, value) => {
        let detected;
        if (value === "detect") {
          detected = matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark" : "light";
        }
        // Use the detected theme instead of "detect" if that was the value, or
        // use the selected value if not.
        updateBodyFromSelect(id, detected || value);
      },
    },
    /** Font size. */
    text: {
      type: FieldType.SELECT,
      options: textOptions,
      default: selectValueFromBody(textOptions) || textDefault,
      onChange: onChangeSelect,
      updateBody: updateBodyFromSelect,
    },
    /** Font family. */
    font: {
      type: FieldType.SELECT,
      options: fontOptions,
      default: selectValueFromBody(fontOptions) || fontDefault,
      onChange: onChangeSelect,
      updateBody: updateBodyFromSelect,
    },
    /** Layout width. */
    stretch: {
      type: FieldType.CHECKBOX,
      default: checkboxValueFromBody("stretch") || CheckboxValue.OFF,
      onChange: onChangeCheckbox,
      updateBody: updateBodyFromCheckbox,
    },
  };

  // Show a form with the fields from above.
  return html`<form>
    ${Object.entries(fields).map(([key, field]) => {
    switch (field["type"]) {
      case FieldType.SELECT:
        return html`<${Select}
          id=${key}
          value=${values[key]}
          onChange=${field["onChange"]}
          options=${field["options"]}
        />`;
      case FieldType.CHECKBOX:
        return html`<${Checkbox}
          id=${key}
          value=${values[key]}
          onChange=${field["onChange"]}
        />`;
      default:
        return null;
    }
  })}
  </form>`;
}

// Render this component in elements with a CSS class like `elementClass`.
const elements = document.getElementsByClassName(elementClass);
for (let i = 0; i < elements.length; i++) {
  render(html`<${ThemeForm} />`, elements[i]);
}
