# Moreland E-Portfolio (100% Self-Hosted, China-Safe Static Website)

This modular, multi-page static website loads **zero** external fonts, scripts, or CDNs, and embeds your PowerPoint presentation as a PDF via self-hosted PDF.js so every slide hyperlink stays clickable behind China's Great Firewall.

## Folder Structure

```text
moreland-eportfolio/
├── index.html                      # Home page
├── literacy.html                   # Literacy
├── clinical-practice.html          # Clinical Practice
├── intasc-standards.html           # InTASC Standards
├── modules/
│   └── module-1.html ... module-6.html
├── med/
│   ├── index.html                  # Master's of Education Degrees (embeds PDF.js viewer)
│   └── ... (6 M.Ed. specialization pages)
├── css/
│   └── styles.css                  # All theme, navigation, and PDF viewer styles
├── js/
│   └── site.js                     # Shared site title and responsive "More" navigation bar
├── files/
│   └── med-slides.pdf              # <-- Place your exported PDF here
├── pdfjs/                          # <-- Unzip Mozilla PDF.js (build/ and web/) here
└── images/                         # Store portfolio photos here
```

## Quick Setup for Your PDF Presentation

1. Put your exported PDF inside `files/` and name it **`med-slides.pdf`**.
2. Download the latest prebuilt **`pdfjs-*-dist.zip`** from Mozilla's PDF.js GitHub Releases page and unzip its `build/` and `web/` folders into **`pdfjs/`** (so `pdfjs/web/viewer.html` exists).
3. Upload the entire folder to GitHub (use **GitHub Desktop** since `pdfjs/` contains more than 100 files, exceeding GitHub's browser drag-and-drop limit).
