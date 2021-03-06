import { hydrate } from "react-dom";
import { RemixBrowser } from "remix";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // we will register it after the page complete the load
    navigator.serviceWorker.register("/sw.js");
  });
}

hydrate(<RemixBrowser />, document);
