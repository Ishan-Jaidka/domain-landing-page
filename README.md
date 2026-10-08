# jaidka.dev

A minimal landing page for jaidka.dev, made with plain HTML, CSS, and JavaScript. No build step or dependencies.

## Local preview

From this repository, run:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open [http://127.0.0.1:8000](http://127.0.0.1:8000). Stop the server with `Ctrl+C`. Use an HTTP server rather than opening `index.html` directly: the directory loads `links.json` with `fetch`, which browsers restrict on `file://` pages.

## Add or edit a project

`links.json` is the single source of truth for directory entries. Each entry needs a `name` and an absolute HTTP(S) `url`; `description` is optional. The JSON order is the display order. Titles, domains, and numbered cards render automatically; links open in the current tab.

```json
{
  "name": "My next project",
  "url": "https://example.jaidka.dev",
  "description": "A short sentence about what you'll find."
}
```

Add this object to the array, with commas between entries. No HTML changes are needed. Keep descriptions brief. An empty array shows a placeholder; a failed request or invalid data shows a readable error.

## Design and checks

`styles.css` reuses the slate, warm white, and yellow palette from `../portfolio-resume-generator/portfolio`, plus its Inter and JetBrains Mono font files. Fonts are served locally from `assets/fonts/`, with their SIL Open Font License notices alongside them. The existing favicon is retained.

The layout uses two columns on desktop and one at 640px and below, with normal document scrolling. Cards are native links, with visible keyboard focus, a skip link, and reduced-motion support. JavaScript-disabled visitors can open the raw project list.

To review changes locally:

- Check a wide desktop viewport and narrow mobile viewports (including 320px).
- Tab through the skip link and every card; press Enter to follow a link.
- Enable reduced motion and verify that hover motion and transitions stop.
- Check long titles/domains, omitted descriptions, and additional entries.
- Block the `links.json` request to check the error message.

Serve the repository as static files when publishing. There is no deployment or DNS configuration in this project.

## Verification for this redesign

JavaScript syntax, JSON parsing, referenced asset paths, and Git whitespace checks passed. All text colors exceed a 4.5:1 contrast ratio on the page, card, and hover surfaces. Ad hoc rendering checks with a lightweight DOM shim verified the original destinations and ordering, all five current entries, optional descriptions, additional entries, literal text rendering, and empty/error states. The local HTTP preview returned successfully.

Desktop/mobile visual review, real keyboard interaction, and browser reduced-motion checks remain unverified: native browser access was unavailable and the temporary browser-testing installation was declined. The checks above are not a substitute for viewing the page in a real browser. No deployment or DNS changes were made.
