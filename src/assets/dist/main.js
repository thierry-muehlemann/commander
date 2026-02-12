import { filterCommands, runCommand } from "./commands.js";

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
      case "k":
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
          runCommand(commands[commandIndex]);
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
      const res = el("li");
      res.innerText = cmd.title;
      results.appendChild(res);
    });

    if (commands.length) {
      setSelection(0);
    }
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
