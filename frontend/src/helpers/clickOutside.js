import { useEffect } from "react";

// useEffect:
// If you want to run an effect only once, similar to componentDidMount and componentWillUnmount, you can pass an empty array as the second argument.
//
//useEffect(() => {
// Code to run on mount
//  return () => {
// Code to run on unmount
//   };
//}, []);

// You can run the effect when specific dependencies change by including them in the dependency array.

//useEffect(() => {
// Code to run when `someValue` changes
//}, [someValue]);

// If you don't provide the dependency array, the effect will run after every render, similar to componentDidUpdate
//useEffect(() => {
// Code to run after every render
//});

// This custom hook allows you to detect clicks outside a specified element.
// It accepts a ref (reference to the element you want to watch) and a function (fun) to run when a click is detected outside that element.
export default function useClickOutside(ref, fun) {
  // The useEffect hook ensures that the side effect code runs after render.
  useEffect(() => {
    // This listener function is called whenever there's a mousedown or touchstart event.
    const listener = (e) => {
      // If there's no ref assigned, or the event target is inside the referenced element, then do nothing.
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }
      // If the event target is outside the referenced element, run the provided function (fun).
      fun();
    };

    // Adding the listener function to the mousedown and touchstart events.
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    // The returned function will be called when the component using this hook is unmounted. It's used to clean up by removing the event listeners.
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };

    // The dependency array ensures that the effect runs when the ref changes.
    // If ref remains the same across renders, this effect won't re-run, thus optimizing performance.
  }, [ref]);
}
