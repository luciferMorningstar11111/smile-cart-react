const fs = require("fs");

const buildPathGroupsBasedOnWebpackAliases = ({
  customJSRoot = "src",
  customAliasPath = "config/webpack/resolve.js",
}) => {
  const rootOfProject = __dirname + `/../../`;

  const isFile = (filePath) =>
    fs.existsSync(filePath) && fs.lstatSync(filePath).isFile();

  const webpackAliasPath = rootOfProject + customAliasPath;

  const hasWebpackAliasConfig = isFile(webpackAliasPath);

  const isRailsProject = isFile(rootOfProject + "Gemfile");

  const emptyPathGroups = [];

  if (!hasWebpackAliasConfig || !isRailsProject) return emptyPathGroups;

  const { alias } = require(webpackAliasPath);

  const railsJSFilesRoot = rootOfProject + customJSRoot;

  const pathGroups = Object.entries(alias).map(([name, path]) => {
    // sometimes alias might be already resolved to full absolute path
    const isAleadyAnAbsolutePath =
      path.includes("cypress-tests/") || path.includes("app/");

    const absolutePath = isAleadyAnAbsolutePath
      ? path
      : `${railsJSFilesRoot}${path}`;
    const wildCard =
      isFile(absolutePath + ".js") || isFile(absolutePath + ".jsx")
        ? ""
        : "/**";

    let group = "internal";
    if (name === "neetoui") {
      group = "external";
    }

    return { pattern: `${name}${wildCard}`, group };
  });

  return pathGroups;
};

module.exports = { buildPathGroupsBasedOnWebpackAliases };
