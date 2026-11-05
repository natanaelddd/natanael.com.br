#!/usr/bin/env node
// Gerador do blog de natanael.com.br — sem dependências.
// Lê content/artigos/*.md e gera:
//   artigos/<slug>/index.html   (página do artigo, com SEO/OG/JSON-LD)
//   artigos/index.json          (índice dos artigos)
//   blog.html                   (listagem entre os marcadores ARTIGOS:START/END)
//   sitemap.xml e feed.xml
// Uso: node tools/blog/build.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const CONFIG = JSON.parse(fs.readFileSync(path.join(ROOT, "tools/blog/config.json"), "utf8"));
const SITE = CONFIG.siteUrl.replace(/\/$/, "");
const CONTENT_DIR = path.join(ROOT, "content/artigos");
const OUT_DIR = path.join(ROOT, "artigos");

// ---------- utilidades ----------
const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
const dataBR = (iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} de ${MESES[m - 1]} de ${y}`;
};

function parseFrontmatter(raw, file) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error(`${file}: frontmatter ausente`);
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if (v.startsWith("[") && v.endsWith("]")) {
      v = v.slice(1, -1).split(",").map((t) => t.trim().replace(/^["']|["']$/g, "")).filter(Boolean);
    } else {
      v = v.replace(/^["']|["']$/g, "");
    }
    meta[kv[1]] = v;
  }
  for (const k of ["title", "description", "date", "slug"]) {
    if (!meta[k]) throw new Error(`${file}: campo obrigatório "${k}" ausente`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.date)) throw new Error(`${file}: date deve ser AAAA-MM-DD`);
  if (!/^[a-z0-9-]+$/.test(meta.slug)) throw new Error(`${file}: slug só aceita a-z, 0-9 e hífen`);
  meta.tags = Array.isArray(meta.tags) ? meta.tags : meta.tags ? [meta.tags] : [];
  return { meta, body: m[2] };
}

// ---------- markdown mínimo ----------
function inline(s) {
  const codes = [];
  s = s.replace(/`([^`]+)`/g, (_, c) => `\u0000${codes.push(esc(c)) - 1}\u0000`);
  s = esc(s);
  s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, '<img src="$2" alt="$1" loading="lazy">');
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, href) => {
    const ext = /^https?:\/\//.test(href);
    return `<a href="${href}"${ext ? ' target="_blank" rel="noopener noreferrer"' : ""}>${t}</a>`;
  });
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/(^|[^*])\*([^*\s][^*]*)\*/g, "$1<em>$2</em>");
  s = s.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${codes[i]}</code>`);
  return s;
}

function markdown(md) {
  const lines = md.replace(/\r/g, "").split("\n");
  const out = [];
  let i = 0;
  const toc = [];
  while (i < lines.length) {
    const line = lines[i];
    if (/^```/.test(line)) {
      const lang = line.slice(3).trim();
      const buf = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) buf.push(lines[i++]);
      i++;
      out.push(`<pre><code${lang ? ` class="lang-${esc(lang)}"` : ""}>${esc(buf.join("\n"))}</code></pre>`);
      continue;
    }
    const h = line.match(/^(#{2,4})\s+(.*)$/);
    if (h) {
      const lvl = h[1].length;
      const id = h[2].toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      if (lvl === 2) toc.push({ id, text: h[2] });
      out.push(`<h${lvl} id="${id}">${inline(h[2])}</h${lvl}>`);
      i++;
      continue;
    }
    if (/^>\s?/.test(line)) {
      const buf = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) buf.push(lines[i++].replace(/^>\s?/, ""));
      out.push(`<blockquote><p>${inline(buf.join(" "))}</p></blockquote>`);
      continue;
    }
    if (/^\s*[-*]\s+/.test(line)) {
      const buf = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) buf.push(`<li>${inline(lines[i++].replace(/^\s*[-*]\s+/, ""))}</li>`);
      out.push(`<ul>${buf.join("")}</ul>`);
      continue;
    }
    if (/^\s*\d+\.\s+/.test(line)) {
      const buf = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) buf.push(`<li>${inline(lines[i++].replace(/^\s*\d+\.\s+/, ""))}</li>`);
      out.push(`<ol>${buf.join("")}</ol>`);
      continue;
    }
    if (/^---+\s*$/.test(line)) { out.push("<hr>"); i++; continue; }
    if (!line.trim()) { i++; continue; }
    const buf = [];
    while (i < lines.length && lines[i].trim() && !/^(#{2,4}\s|```|>|\s*[-*]\s+|\s*\d+\.\s+|---+\s*$)/.test(lines[i])) buf.push(lines[i++]);
    out.push(`<p>${inline(buf.join(" "))}</p>`);
  }
  return { html: out.join("\n"), toc };
}

// ---------- templates ----------
const header = (prefix, active = "blog") => `
    <header class="site-header sticky-header">
        <div class="container header-container">
            <a href="${prefix}index.html#hero" class="logo-link">
                <img src="${prefix}img/logo_preto.png" alt="Natanael.com.br" class="site-logo">
            </a>
            <nav class="main-nav">
                <ul class="nav-list" id="navList">
                    <li class="nav-item"><a href="${prefix}index.html#hero" class="nav-link">Início</a></li>
                    <li class="nav-item"><a href="${prefix}index.html#sobre" class="nav-link">Sobre</a></li>
                    <li class="nav-item"><a href="${prefix}index.html#videos" class="nav-link">Vídeos</a></li>
                    <li class="nav-item"><a href="${prefix}index.html#websites" class="nav-link">Websites</a></li>
                    <li class="nav-item"><a href="${prefix}blog.html" class="nav-link${active === "blog" ? " active" : ""}">Blog</a></li>
                </ul>
            </nav>
            <a href="${CONFIG.ctaUrl}" class="cta-button" target="_blank" rel="noopener noreferrer">${esc(CONFIG.ctaLabel)}</a>
            <button class="mobile-menu-toggle" aria-label="Abrir menu" aria-expanded="false" aria-controls="navList">
                <span></span><span></span><span></span>
            </button>
        </div>
    </header>`;

function articlePage(a, prev, next) {
  const url = `${SITE}/artigos/${a.slug}/`;
  const cover = a.cover ? `${SITE}/${a.cover}` : `${SITE}/img/logo_natanael.png`;
  const ld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    dateModified: a.updated || a.date,
    image: cover,
    url,
    inLanguage: "pt-BR",
    keywords: a.tags.join(", "),
    author: { "@type": "Person", name: CONFIG.author, url: SITE },
    publisher: { "@type": "Person", name: CONFIG.author },
  };
  const tags = a.tags.map((t) => `<span class="artigo-tag">${esc(t)}</span>`).join("");
  const toc = a.toc.length > 2
    ? `<nav class="artigo-toc" aria-label="Neste artigo"><strong>Neste artigo</strong><ol>${a.toc.map((t) => `<li><a href="#${t.id}">${esc(t.text)}</a></li>`).join("")}</ol></nav>`
    : "";
  const repoBox = a.repo
    ? `<a class="artigo-repo" href="${esc(a.repo)}" target="_blank" rel="noopener noreferrer"><span class="artigo-repo-label">Repositório</span><span class="artigo-repo-url">${esc(a.repo.replace(/^https?:\/\//, ""))}</span><span class="artigo-repo-arrow">→</span></a>`
    : "";
  const navLinks = [
    prev ? `<a class="artigo-nav-prev" href="../${prev.slug}/"><span>← Anterior</span>${esc(prev.title)}</a>` : "<span></span>",
    next ? `<a class="artigo-nav-next" href="../${next.slug}/"><span>Próximo →</span>${esc(next.title)}</a>` : "<span></span>",
  ].join("");

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(a.title)} | ${esc(CONFIG.siteName)}</title>
    <meta name="description" content="${esc(a.description)}">
    <meta name="keywords" content="${esc(a.tags.join(", "))}">
    <meta name="author" content="${esc(CONFIG.author)}">
    <link rel="canonical" href="${url}">
    <meta property="og:type" content="article">
    <meta property="og:locale" content="pt_BR">
    <meta property="og:title" content="${esc(a.title)}">
    <meta property="og:description" content="${esc(a.description)}">
    <meta property="og:url" content="${url}">
    <meta property="og:image" content="${cover}">
    <meta property="article:published_time" content="${a.date}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${esc(a.title)}">
    <meta name="twitter:description" content="${esc(a.description)}">
    <meta name="twitter:image" content="${cover}">
    <link rel="alternate" type="application/rss+xml" title="${esc(CONFIG.siteName)} — Artigos" href="${SITE}/feed.xml">
    <link rel="stylesheet" href="../../css/reset.css">
    <link rel="stylesheet" href="../../css/style.css">
    <link rel="stylesheet" href="../../css/nav-details.css">
    <link rel="stylesheet" href="../../css/artigo.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
    <script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body class="artigo-body">${header("../../")}

    <main class="artigo-main">
        <article class="artigo">
            <header class="artigo-header">
                <a class="artigo-voltar" href="../../blog.html">← Todos os artigos</a>
                <div class="artigo-tags">${tags}</div>
                <h1 class="artigo-titulo">${esc(a.title)}</h1>
                <p class="artigo-resumo">${esc(a.description)}</p>
                <div class="artigo-meta">
                    <span>Por ${esc(CONFIG.author)}</span>
                    <span>·</span>
                    <time datetime="${a.date}">${dataBR(a.date)}</time>
                    <span>·</span>
                    <span>${a.readingTime} min de leitura</span>
                </div>
            </header>
            ${a.cover ? `<figure class="artigo-capa"><img src="../../${a.cover}" alt="${esc(a.title)}" width="1200" height="630"></figure>` : ""}
            ${repoBox}
            ${toc}
            <div class="artigo-conteudo">
${a.html}
            </div>
            <aside class="artigo-autor">
                <img src="../../img/logo_natanael_black.png" alt="" class="artigo-autor-logo">
                <div>
                    <strong>${esc(CONFIG.author)}</strong>
                    <p>${esc(CONFIG.authorBio)}</p>
                    <p class="artigo-autor-links">
                        <a href="${CONFIG.instagram}" target="_blank" rel="noopener noreferrer">Instagram</a>
                        <a href="${CONFIG.ctaUrl}" target="_blank" rel="noopener noreferrer">${esc(CONFIG.ctaLabel)}</a>
                        <a href="${CONFIG.whatsapp}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                    </p>
                </div>
            </aside>
            <nav class="artigo-nav">${navLinks}</nav>
        </article>
    </main>

    <footer class="site-footer">
        <div class="container footer-container">
            <p>© ${new Date().getFullYear()} ${esc(CONFIG.author)}. Todos os direitos reservados.</p>
        </div>
    </footer>
    <script src="../../js/main.js"></script>
</body>
</html>
`;
}

function card(a) {
  const img = a.cover || "img/blog/placeholder_blog_post.png";
  return `                    <article class="blog-card">
                        <a href="artigos/${a.slug}/" class="blog-card-link">
                            <div class="blog-card-image-container">
                                <img src="${img}" alt="${esc(a.title)}" class="blog-card-image" loading="lazy">
                            </div>
                            <div class="blog-card-content">
                                <span class="blog-card-date">${dataBR(a.date)}${a.tags[0] ? ` · ${esc(a.tags[0])}` : ""}</span>
                                <h2 class="blog-card-title">${esc(a.title)}</h2>
                                <p class="blog-card-excerpt">${esc(a.description)}</p>
                                <span class="blog-card-read-more">Ler artigo →</span>
                            </div>
                        </a>
                    </article>`;
}

// ---------- build ----------
const today = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
const todayISO = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

const files = fs.existsSync(CONTENT_DIR) ? fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md")) : [];
const all = files.map((f) => {
  const { meta, body } = parseFrontmatter(fs.readFileSync(path.join(CONTENT_DIR, f), "utf8"), f);
  const { html, toc } = markdown(body);
  const words = body.split(/\s+/).filter(Boolean).length;
  return { ...meta, html, toc, readingTime: Math.max(1, Math.round(words / 200)), draft: meta.draft === "true" };
});

const slugs = new Set();
for (const a of all) {
  if (slugs.has(a.slug)) throw new Error(`slug duplicado: ${a.slug}`);
  slugs.add(a.slug);
}

// Publica só o que não é rascunho e cuja data já chegou (permite agendar artigos).
const posts = all.filter((a) => !a.draft && a.date <= todayISO).sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug)));

fs.mkdirSync(OUT_DIR, { recursive: true });
// remove páginas de artigos que não existem mais (ou ainda não foram publicados)
for (const d of fs.readdirSync(OUT_DIR, { withFileTypes: true })) {
  if (d.isDirectory() && !posts.find((p) => p.slug === d.name)) fs.rmSync(path.join(OUT_DIR, d.name), { recursive: true });
}
posts.forEach((a, i) => {
  const dir = path.join(OUT_DIR, a.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), articlePage(a, posts[i + 1], posts[i - 1]));
});

fs.writeFileSync(
  path.join(OUT_DIR, "index.json"),
  JSON.stringify(posts.map(({ slug, title, description, date, tags, cover, repo }) => ({ slug, title, description, date, tags, cover: cover || null, repo: repo || null, url: `${SITE}/artigos/${slug}/` })), null, 2) + "\n"
);

// blog.html
const blogPath = path.join(ROOT, "blog.html");
let blog = fs.readFileSync(blogPath, "utf8");
const START = "<!-- ARTIGOS:START -->";
const END = "<!-- ARTIGOS:END -->";
if (!blog.includes(START) || !blog.includes(END)) throw new Error("blog.html sem os marcadores ARTIGOS:START/END");
const cards = posts.length ? posts.map(card).join("\n") : '                    <p class="blog-vazio">Os primeiros artigos chegam em breve.</p>';
blog = blog.replace(new RegExp(`${START}[\\s\\S]*?${END}`), `${START}\n${cards}\n                    ${END}`);
fs.writeFileSync(blogPath, blog);

// sitemap.xml
const staticPages = ["", "blog.html", "estudos-de-caso.html", "recursos-para-desenvolvedores/"];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map((p) => `  <url><loc>${SITE}/${p}</loc></url>`).join("\n")}
${posts.map((a) => `  <url><loc>${SITE}/artigos/${a.slug}/</loc><lastmod>${a.updated || a.date}</lastmod></url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), sitemap);

// feed.xml (RSS 2.0)
const rfc822 = (iso) => new Date(`${iso}T09:00:00-03:00`).toUTCString();
const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${esc(CONFIG.siteName)} — Artigos</title>
  <link>${SITE}/blog.html</link>
  <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml"/>
  <description>${esc(CONFIG.feedDescription)}</description>
  <language>pt-BR</language>
${posts.slice(0, 30).map((a) => `  <item>
    <title>${esc(a.title)}</title>
    <link>${SITE}/artigos/${a.slug}/</link>
    <guid>${SITE}/artigos/${a.slug}/</guid>
    <pubDate>${rfc822(a.date)}</pubDate>
    <description>${esc(a.description)}</description>
${a.tags.map((t) => `    <category>${esc(t)}</category>`).join("\n")}
  </item>`).join("\n")}
</channel>
</rss>
`;
fs.writeFileSync(path.join(ROOT, "feed.xml"), feed);

const pending = all.filter((a) => !a.draft && a.date > todayISO);
console.log(`Publicados: ${posts.length} artigo(s). Agendados para datas futuras: ${pending.length}.`);
for (const p of posts.slice(0, 5)) console.log(`  ${p.date}  ${p.slug}`);
