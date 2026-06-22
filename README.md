# Burra Vigneswara Reddy — DFIR Portfolio

A single-page, cybersecurity / SOC-themed portfolio site built for **Digital Forensics &
Incident Response (DFIR)** roles. Dark terminal aesthetic, animated boot sequence, MITRE
ATT&CK-flavored project ("case file") cards, no build step, no frameworks.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page structure and content |
| `styles.css` | All styling (SOC/terminal theme, responsive) |
| `script.js`  | Typing effect, terminal boot sequence, counters, scroll reveal, mobile nav |
| `assets/resume.pdf` | **(add this yourself)** — the "Download Résumé" button links here |

## Run it locally

It's plain HTML/CSS/JS — just open `index.html` in a browser. Or serve it:

```bash
cd "claude code"
python3 -m http.server 8000
# then open http://localhost:8000
```

## Add your résumé PDF

The hero has a **Download Résumé** button pointing at `assets/resume.pdf`.

```bash
mkdir -p assets
cp /path/to/your/resume.pdf assets/resume.pdf
```

If you don't want the button, delete this line in `index.html`:

```html
<a href="assets/resume.pdf" class="btn btn--ghost" download>Download Résumé</a>
```

## Deploy (pick one — all free)

**GitHub Pages**
```bash
git init && git add . && git commit -m "DFIR portfolio"
gh repo create dfir-portfolio --public --source=. --push
# Repo → Settings → Pages → Branch: main /(root) → Save
```
Live at `https://burravigneswarareddy.github.io/dfir-portfolio/`.

**Netlify / Vercel** — drag-and-drop this folder at app.netlify.com/drop, or
`vercel` in this directory. No config needed.

## Customize

- **Colors / theme:** edit the CSS variables at the top of `styles.css` (`--acc`, `--acc-2`, `--bg`).
- **Rotating job titles:** the `roles` array in `script.js`.
- **Terminal boot text:** the `lines` array in `script.js`.
- **Projects:** the `.case` blocks in `index.html` (CASE-001 … CASE-004). Add a live demo /
  GitHub / writeup link to each by wrapping the title in an `<a>` once your repos are public.

## Suggested next steps to stand out for DFIR roles

1. Publish the BEC and ransomware lab **writeups** (markdown on GitHub) and link each case card to them — recruiters want to read your analysis, not just a description.
2. Add a redacted sample **incident report PDF** to `assets/` and link it from a case.
3. Point the GitHub link at pinned repos for the actual labs/tools.
