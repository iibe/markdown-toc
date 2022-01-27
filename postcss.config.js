module.exports = (config) => ({
  map: config.dev === "development" ? { inline: false } : false,
  parser: [".scss", ".sass"].includes(config.file.extname)
    ? "postcss-scss"
    : false,
  plugins: [
    require("postcss-import"),
    require("postcss-advanced-variables"),
    require("tailwindcss/nesting"),
    require("tailwindcss"),
    require("autoprefixer"),
    require("cssnano")({ preset: "default" }),
  ],
});
