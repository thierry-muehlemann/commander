import { hello } from "./whatup.js";

const config = {
  launchKey: "/",
};

function el(tagName, className, children = []) {
  const node = document.createElement(tagName);
  if (className) {
    node.classList.add(className);
  }
  if (children.length) {
    node.append(...children);
  }
  return node;
}

function mountApp() {
  // creating the markup
  const input = el("input");
  input.name = "commander";
  const results = el("ul", "results");
  const panel = el("div", "cmd-panel", [input, results]);
  const root = el("div", "commander", [panel]);

  document.body.appendChild(root);
  root.classList.add("hidden");

  // attaching event listeners
  window.addEventListener("keydown", (e) => {
    if (e.key === config.launchKey) {
      open(e);
    } else if (e.key === "Escape") {
      close(e);
    }
  });

  function open(e) {
    root.classList.remove("hidden");
    e.preventDefault();
    input.focus();
  }

  function close(e) {
    e.preventDefault();
    input.blur();
    root.classList.add("hidden");
  }

  input.addEventListener("input", (e) => {
    const res = el("li");
    res.innerText = e.target.value;
    results.appendChild(res);
  });
}

mountApp();
