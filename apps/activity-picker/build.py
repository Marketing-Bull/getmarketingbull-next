#!/usr/bin/env python3
"""Inline activities.json into template.html -> index.html. Run after editing either file."""
import json, pathlib
here = pathlib.Path(__file__).parent
acts = json.load(open(here/"activities.json", encoding="utf-8"))
tpl = (here/"template.html").read_text(encoding="utf-8")
out = tpl.replace("/*__ACTIVITIES__*/[]", json.dumps(acts, ensure_ascii=False, separators=(",",":")))
(here/"index.html").write_text(out, encoding="utf-8")
print(f"wrote index.html with {len(acts)} activities")
