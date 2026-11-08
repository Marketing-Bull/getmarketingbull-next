# Dad Days — activity picker

A personal, phone-first picker for kids (built for two 8-year-olds) around ZIP 33418
(Palm Beach Gardens, FL). Not part of the marketing site build; nothing here is served by Next.js.

- `activities.json` — the 40 places/experiences: address, drive time from 33418, cost tier,
  kid blurb, dad note, tip, YouTube video id. Edit this to add or change places.
- `img/<id>.jpg` — one 16:9 picture per activity (YouTube thumbnail of the linked video, resized).
- `template.html` — the app. `build.py` inlines the JSON into `index.html`.
- `index.html` — the built app. Open it directly in a browser, or publish it as a claude.ai Artifact
  (the published copy uses the Artifact `db` capability so picks sync between devices; opened as a
  plain file it falls back to localStorage).

Modes: **Kids** (one card at a time, YES / maybe / nope, spin for today), **Dad** (what everyone
said yes to, each kid's list, Dad's own wish list that turns into memories when checked off,
quick filters, kids' names), **All** (every activity with filters).

```
python3 build.py
```
