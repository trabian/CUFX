const changeCase = require("change-case");
const fs = require("fs");
const path = require("path");
const pug = require("pug");

const template = path.join(__dirname, "template.pug");
const docsDir = path.join(__dirname, "..", "docs");
const indexPath = path.join(docsDir, "index.html");

const getDocName = fileName =>
  changeCase.titleCase(fileName.replace(/\.html$/, ""));

fs.readdir(docsDir, (err, fileNames) => {
  const files = fileNames
    .filter(fileName => fileName !== "index.html")
    .map(fileName => ({
      name: getDocName(fileName),
      path: `./${fileName}`
    }));

  const rendered = pug.renderFile(template, {
    files
  });

  fs.writeFile(indexPath, rendered, err => {
    if (err) {
      throw err;
    }
    console.info(`Wrote index to ${indexPath}`);
  });
});
