const { readFile } = require("fs/promises");
const { createServer } = require("http");
const { basename, resolve } = require("path");
const { parse } = require("querystring");

const host = "localhost";
const port = 8000;

createServer((req, res) => {
  const [name, query] = req.url.split("?");
  const filename = basename(name);
  const file = resolve(__dirname, "static", filename);

  const mode = parse(query).mode || "default";

  switch (mode) {
    case "default": {
      res.setHeader("SourceMap", "bundle_header.js.map");
      res.setHeader("X-SourceMap", "bundle_xheader.js.map");
    }
    case "header": {
      res.setHeader("SourceMap", "bundle_header.js.map");
      break;
    }
    case "xheader": {
      res.setHeader("X-SourceMap", "bundle_xheader.js.map");
      break;
    }
    case "inline": {
      break;
    }

    default: {
      console.error(
        `Incorrect mode: ${mode}. Allowed: default, inline, header, xheader`
      );
      res.writeHead(404);
      res.end();
      return;
    }
  }

  return readFile(file)
    .then((contents) => {
      if (filename.endsWith(".js")) {
        res.setHeader("Content-Type", "text/javascript");
      } else if (filename.endsWith(".js.map")) {
        res.setHeader("Content-Type", "application/json");
      }

      console.log(`Sending static file: ${file}`);
      res.writeHead(200);
      res.end(contents);
    })
    .catch((e) => {
      console.error(e);
      res.writeHead(404);
      res.end();
    });
}).listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
