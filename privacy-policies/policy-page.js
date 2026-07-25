function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function parseInlineMarkdown(text) {
  return text
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
}

function renderMarkdown(markdown) {
  const lines = markdown.split("\n");
  const chunks = [];
  let inList = false;
  let listTag = "ul";

  const closeList = () => {
    if (inList) {
      chunks.push(`</${listTag}>`);
      inList = false;
    }
  };

  lines.forEach((rawLine) => {
    const line = escapeHtml(rawLine.trim());

    if (!line) {
      closeList();
      return;
    }

    if (/^#{1,4}\s/.test(line)) {
      closeList();
      const level = Math.min((line.match(/^#+/) || [""])[0].length, 4);
      const content = parseInlineMarkdown(line.replace(/^#{1,4}\s+/, ""));
      chunks.push(`<h${level}>${content}</h${level}>`);
      return;
    }

    if (/^[-*]\s+/.test(line)) {
      if (!inList || listTag !== "ul") {
        closeList();
        listTag = "ul";
        chunks.push("<ul>");
        inList = true;
      }
      chunks.push(`<li>${parseInlineMarkdown(line.replace(/^[-*]\s+/, ""))}</li>`);
      return;
    }

    if (/^\d+\.\s+/.test(line)) {
      if (!inList || listTag !== "ol") {
        closeList();
        listTag = "ol";
        chunks.push("<ol>");
        inList = true;
      }
      chunks.push(`<li>${parseInlineMarkdown(line.replace(/^\d+\.\s+/, ""))}</li>`);
      return;
    }

    closeList();
    chunks.push(`<p>${parseInlineMarkdown(line)}</p>`);
  });

  closeList();
  return chunks.join("\n");
}

function getPolicySlug() {
  const pathParts = window.location.pathname.split("/").filter(Boolean);
  return pathParts[pathParts.length - 1] || "";
}

async function loadPolicyMarkdown(slug) {
  const response = await fetch(`../${encodeURIComponent(slug)}.md`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Unable to load privacy policy file: ${slug}.md`);
  }
  return response.text();
}

async function renderPolicy() {
  const root = document.getElementById("policy-root");
  const slug = getPolicySlug();

  try {
    const markdown = await loadPolicyMarkdown(slug);
    root.innerHTML = renderMarkdown(markdown);
  } catch (error) {
    root.innerHTML = `
      <h1>Política de Privacidade</h1>
      <p>Esta política de privacidade não pôde ser carregada agora.</p>
    `;
  }
}

renderPolicy();
