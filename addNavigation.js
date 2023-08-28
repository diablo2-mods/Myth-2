const fs = require("fs");

const pageFiles = fs
  .readdirSync(`${__dirname}/docs`)
  .filter((i) => i.endsWith(".html"));

fs.copyFileSync(`${__dirname}/_index.html`, `${__dirname}/docs/index.html`);
fs.copyFileSync(`${__dirname}/logo.jpg`, `${__dirname}/docs/logo.jpg`);

const navTemplate = fs.readFileSync(`${__dirname}/_nav.html`).toString();

for (const f of pageFiles) {
  const text = fs.readFileSync(`${__dirname}/docs/${f}`).toString();
  if (text.indexOf("theNavContainerOfSiko") < 0) {
    const updated = text.replace("<body>", navTemplate);
    fs.writeFileSync(`${__dirname}/docs/${f}`, updated);
  }
}
