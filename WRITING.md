# How to publish an essay, poem or note

(Explainers of papers have their own guide: see `EXPLAINERS.md`.)

Everything you write lives in the `_posts` folder as a plain text file (Markdown).
GitHub turns it into a page automatically, styled like the rest of the site, and adds it to the
**Out of the Box** page. No code, no tools: you can do it all on github.com, even from a phone.

## 1. Create the file

On github.com, open this repository → the `_posts` folder → **Add file → Create new file**.

Name it with the date first, then a short name with hyphens:

```
2026-12-05-what-is-an-observation.md
```

## 2. Paste this at the top and fill it in

```
---
layout: post
title: "What is an observation?"
kind: Essay
summary: "One line that appears in the list on the Out of the Box page."
---
```

- `kind` can be anything you like: Essay, Blog, Poem, Note, Photograph…
- Optional extras (add a line for each if you want them):
  - `image: /img/your-photo.jpg` and `caption: "Text under the photo"` to show a picture at the top
  - `math: true` if the piece contains equations, written like `$E = mc^2$` or on their own line as `$$ ... $$`

## 3. Write below the second `---`

Write normally. A blank line starts a new paragraph. A few extras:

| You type | You get |
|---|---|
| `## A heading` | a section heading |
| `*italic*` and `**bold**` | *italic* and **bold** |
| `> a quotation` | an indented quotation |
| `[link text](https://...)` | a link |
| `![description](/img/photo.jpg)` | an image (upload the photo to the `img` folder first) |
| `- item` | a bullet list |

For a poem, keep the line breaks by wrapping it like this:

```
<div class="poem">
first line
second line
third line
</div>
```

## 4. Publish

Click **Commit changes**. After a minute or two the piece is live at
`relativist1.github.io/writing/2026/what-is-an-observation/` and listed on the Out of the Box page, newest first.

To fix something later, open the file, click the pencil icon, edit, and commit again.

## Dates

The date in the file name is the publication date. A file dated in the future stays hidden until that day arrives.

## Not ready yet?

Put unfinished pieces in the `_drafts` folder instead. They are kept in the repository but not published.
When it is ready, move it to `_posts` (rename the file to start with the date).
