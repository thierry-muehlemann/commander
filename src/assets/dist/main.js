import { filterCommands, runCommand } from "./commands.js";
import { getConfig } from "./config.js";

const config = getConfig();

function el(tagName, className, children = []) {
  const node = document.createElement(tagName);
  if (className) {
    if (Array.isArray(className)) {
      className.forEach((cn) => {
        node.classList.add(cn);
      });
    } else {
      node.classList.add(className);
    }
  }
  if (children.length) {
    node.append(...children);
  }
  return node;
}

function createPlaceholder() {
  const inProd = config.env.toLowerCase().startsWith("prod");

  const infos = el("div", "infos", [
    el("h4", "primarySite", config.siteUrl),
    el("b", inProd ? "warning" : undefined, [
      inProd ? "⚠ Production" : config.env,
    ]),
  ]);

  const ad = el("div", "ad");
  ad.innerHTML = `Commander is a <a target="_blank" href="https://thierry.sh">thierry.sh</a> project.`;

  const placeholder = el("div", "placeholder", [infos, ad]);

  return placeholder;
}

function mountApp() {
  // creating the markup
  const input = el("input");
  input.name = "commander";
  const placeholder = createPlaceholder();
  const results = el("ul", "results");
  const panel = el("div", "cmd-panel", [input, results, placeholder]);
  const root = el("div", "commander", [panel]);

  document.body.appendChild(root);
  root.classList.add("hidden");

  // attaching event listeners
  window.addEventListener("keydown", (e) => {
    // Bail if the user is typing in a form field
    const tag = e.target.tagName;
    if (
      e.target.isContentEditable ||
      tag === "INPUT" ||
      tag === "TEXTAREA" ||
      tag === "SELECT"
    ) {
      if (!e.ctrlKey) {
        return;
      }
    }

    switch (e.key) {
      case "/":
        e.preventDefault();
        open();
        break;
      case "k":
        if (!e.ctrl) return;
        e.preventDefault();
        open();
        break;
      case "Escape":
        e.preventDefault();
        close();
        break;
    }
  });

  input.addEventListener("input", (e) => {
    handleSearch(e.target.value);
  });

  input.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "Escape":
        e.preventDefault();
        close();
        break;
      case "ArrowDown":
        e.preventDefault();
        selectNext();
        break;
      case "ArrowUp":
        e.preventDefault();
        selectPrev();
        break;
      case "Enter":
        if (commands?.length) {
          runCommand(commands[commandIndex], e.ctrlKey);
        }
    }
  });

  function open() {
    root.classList.remove("hidden");
    input.focus();
  }

  function close() {
    input.blur();
    root.classList.add("hidden");

    input.value = "";
    results.innerText = null;
  }

  let commands;
  let commandIndex = 0;

  function handleSearch(query) {
    results.innerText = null;

    commands = filterCommands(query);

    // display results
    commands.forEach((cmd) => {
      const res = createResult(cmd);
      results.appendChild(res);
    });

    if (commands.length) {
      setSelection(0);
    }
  }

  function createResult(cmd) {
    const res = el("li");
    cmd.title.split(":").forEach((part) => {
      res.appendChild(el("span", undefined, [part]));
    });
    return res;
  }

  function selectNext() {
    setSelection(Math.min(commands.length - 1, commandIndex + 1));
  }

  function selectPrev() {
    setSelection(Math.max(0, commandIndex - 1));
  }

  function setSelection(nextIndex) {
    const old = results.children.item(commandIndex);
    if (old !== null) {
      old.classList.remove("selected");
    }
    commandIndex = nextIndex;
    results.children.item(commandIndex).classList.add("selected");
  }
}

mountApp();
