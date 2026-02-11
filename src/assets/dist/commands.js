export const commands = [
  {
    title: "Clear Caches",
    url: "/admin/utilities/clear-caches",
    keywords: ["cache", "clear", "utilities"],
  },
  {
    title: "Database Backup",
    url: "/admin/utilities/db-backup",
    keywords: ["backup", "database", "utilities", "db"],
  },
  {
    title: "Settings",
    url: "/admin/settings",
    keywords: ["settings", "config"],
  },
  {
    title: "Entries",
    url: "/admin/entries",
    keywords: ["entries", "content", "home"],
  },
  {
    title: "Globals",
    url: "/admin/globals",
    keywords: ["globals", "content"],
  },
  {
    title: "settings / Sites",
    url: "/admin/settings/sites",
    keywords: ["sites", "settings"],
  },
  {
    title: "settings / Sections",
    url: "/admin/settings/sections",
    keywords: ["sections", "settings"],
  },
  {
    title: "settings / Entry-Types",
    url: "/admin/settings/entry-types",
    keywords: ["entry-types", "settings"],
  },
  {
    title: "settings / Fields",
    url: "/admin/settings/fields",
    keywords: ["fields", "settings"],
  },
  {
    title: "settings / Globals",
    url: "/admin/settings/globals",
    keywords: ["globals", "settings"],
  },
  {
    title: "settings / Sections / new",
    url: "/admin/settings/sections/new",
    keywords: ["new section", "sections", "settings"],
  },
  {
    title: "settings / Entry-Types / new",
    url: "/admin/settings/entry-types/new",
    keywords: ["new entry-type", "entry-types", "settings"],
  },
  {
    title: "settings / Fields / new",
    url: "/admin/settings/fields/new",
    keywords: ["new field", "fields", "settings"],
  },
  {
    title: "settings / Globals / new",
    url: "/admin/settings/globals/new",
    keywords: ["new global", "globals", "settings"],
  },
  {
    title: "graphql / Schemas",
    url: "/admin/graphql/schemas",
    keywords: ["schemas", "graphql"],
  },
  {
    title: "graphql / Tokens",
    url: "/admin/graphql/tokens",
    keywords: ["tokens", "graphql"],
  },
  {
    title: "graphiQL",
    url: "/admin/graphiql",
    keywords: ["graphiql", "graphql"],
  },
];

export function filterCommands(query) {
  const q = query.toLowerCase().trim();
  if (!q) return commands;

  return commands.filter((cmd) => {
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.keywords.some((kw) => kw.includes(q))
    );
  });
}

export function runCommand(command) {
  if ("url" in command) {
    navigation.navigate(command.url);
  }
}
