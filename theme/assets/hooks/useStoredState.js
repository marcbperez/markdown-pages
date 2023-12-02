import { useLayoutEffect } from "https://esm.sh/preact/hooks";

/**
 * A set of operations for manipulating stored data.
 * @typedef {Object} StoredState
 * @property {function} save Saves a key-value pair.
 * @property {function} read Returns the value of the provided key.
 */

/**
 * Reads and writes to local storage, dispatching a custom event after a write.
 * Components can subscribe to a common event type to share and update state.
 * This is specially useful when two components are rendered in the same page,
 * but belong to different contexts, like two React apps rendered in two
 * different HTML elements.
 * @param {string} prefix The prefix contained in the event name.
 * @param {function} onChange Executed every time a key-value pair changes.
 * @returns {StoredState} A set of operations for manipulating stored data.
 */
export function useStoredState(prefix, onChange) {
  /**
   * The name of the event dispatched after a write operation.
   * @type {string}
   */
  const eventName = `${prefix}storedstate`;

  /**
   * Resolves the key of a key-value pair by appending the prefix to it.
   * @param {string} key The key, without the prefix.
   * @returns {string} The complete key.
   */
  const getKey = (key) => `${prefix}:${key}`;

  /**
   * Stores a key-value pair and dispatches an event so other subscribers can
   * make a read operation if they wish.
   * @param {string} key The key of the key-value pair to store.
   * @param {string} value The value of the key-value pair to store.
   */
  const save = (key, value) => {
    localStorage.setItem(getKey(key), value);
    dispatchEvent(new CustomEvent(eventName));
  };

  /**
   * Retrieves a stored key-value pair and returns the value.
   * @param {string} key The key of the key-value pair to retrieve.
   * @returns {string} The value of the key-value pair.
   */
  const read = (key) => {
    return localStorage.getItem(getKey(key));
  };

  /**
   * Subscribe the component to the event so that its change routine is called
   * every time there are changes, and cleans up the subscription when unloaded.
   */
  useLayoutEffect(() => {
    addEventListener(eventName, onChange);
    return () => removeEventListener(eventName, onChange);
  }, []);

  // Pass the read and write operations so that the component can use them.
  return { save, read };
}
