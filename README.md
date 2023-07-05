# Source Maps Headers

Repository contains basic test setup for verifying the behavior of browser devtools and other tools consuming Source Maps files.
It can be used to verify the implementation of Source Maps specification.

Requires `node` runtime to be installed locally.

There are 2 ways for using this repository. Either with provided test page or by pointing your tool to exposed resources.
If you want to use it with your tool, run `make serve` and point it to fetch and process `http://localhost:8000/bundle.js` file.

To use built-in test page however:
- run `make serve` and `make test` in separate terminals
- open `http://localhost:3000` in the browser of your choice
- observe devtools panel 

All source files will have suffix prepended, based on the loaded resources:
- `_header` for resources loaded via `SourceMap` header
- `_xheader` for resources loaded via `X-SourceMap` header
- `_inline` for resources loaded via `sourceMappingURL` header

By default, both headers and inline pragma are present. To force a specific behavior, modify query string of loaded `bundle.js` file, either in `index.html` or in the url itself if used directly.

- `?mode=default` serve with both, `SourceMap` and `X-SourceMap` headers + inlined pragma
- `?mode=header` serve with `SourceMap` header only + inlined pragma
- `?mode=xheader` serve with `X-SourceMap` header only + inlined pragma
- `?mode=inline` serve with inlined pragma only