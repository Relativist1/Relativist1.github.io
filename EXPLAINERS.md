# How to publish an explainer

An explainer tells the story behind one paper in plain language. Explainers live in the `_explainers`
folder as Markdown files and appear automatically on the **Explainers** page and in the list at the
bottom of **My Research**. They are kept separate from the essays in Out of the Box.

## 1. Create the file

On github.com: open `_explainers` → **Add file → Create new file**. Give it a short name with hyphens, no date:

```
hotspot-echoes.md
```

The page will be live at `relativist1.github.io/explainers/hotspot-echoes/` (a good link to put under a reel).

## 2. Paste this at the top and fill it in

```
---
title: "The title of the explainer"
standfirst: "One line under the title"
summary: "One line that appears in the lists"
topic: "Spacetime"
date: 2026-12-05
image: /img/your-figure.jpg
image_alt: "What the figure shows, for screen readers and search engines"
caption: "Text under the figure"
paper_url: "https://doi.org/..."
paper_label: "Read the paper"
paper_venue: "Journal, volume, page (year)"
reel: "https://www.instagram.com/reel/..."
---
```

- `topic` is the small label in the lists: Spacetime, The gas, The telescope or Time, matching the questions on My Research.
- Leave out any line you do not need (for example `reel` until the reel is out).
- Newest explainers (by `date`) are listed first.

## 3. Write below the second `---`

Same Markdown as the essays (see `WRITING.md`): `## Heading`, `*italic*`, `**bold**`, `- list item`, `[link](https://...)`.
A good shape is: an opening paragraph, then `## The question`, `## How we went about it`, `## What we found`, `## A personal note`.

Upload figures to the `img` folder first. Click **Commit changes**; the page is live a minute or two later.

## Lengths that matter for search engines and AI tools

| Field | Limit | Used for |
|---|---|---|
| `title` | about 60 characters | page title, link previews |
| `description` | 160 characters | the snippet under the link in Google, link previews (cut at 160 automatically) |
| `summary` | 300 characters | the text on the explainer cards and in `llms.txt` |
| `thumbnail` | 16:9 image, about 1600×900 px | the card picture and the link preview (falls back to `image`) |

## For citations

Add these so the page links properly to the paper:

```
paper_title: "Full title of the paper"
paper_doi: "10.xxxx/xxxxx"          # leave out if there is no DOI yet
paper_cite: "Authors (year). Title. Journal volume, page."
```

Each explainer then ends with a "How to cite" box (with BibTeX), and search engines see that the page is about that paper.
