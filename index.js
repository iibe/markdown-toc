// NOTE: Toggle color scheme
const theme = document.getElementById("color-mode");

theme.addEventListener("click", (e) => {
  e.preventDefault();
  document.documentElement.classList.toggle("dark");
});

// NOTE: Parse markdown headings
const button = document.getElementById("convert");
const i = document.getElementById("markdown-i");
const o = document.getElementById("markdown-o");

button.addEventListener("click", (e) => {
  e.preventDefault();
  const markdown = i.value;
  const regexp = /^#{1,6}.*$/gm;
  const matches = [...markdown.matchAll(regexp)];

  const headings = matches.map((match) => {
    const [heading, ...rest] = match[0].split(" ");
    const title = rest.join(" ");

    // BUG: " = " >>> "-" instead of "--" ???
    const anchor = title
      .toLowerCase()
      .replace(/\s/g, "-")
      .replace(/[^a-z0-9-_]/g, "");

    return { level: heading.length, title, anchor };
  });

  const softtab = 2;
  const list = headings.map(({ level, title, anchor }) => {
    return `${" ".repeat((level - 1) * softtab)}- [${title}](#${anchor})`;
  });

  o.value = "## Table of contents\n\n" + list.join("\n");
});
