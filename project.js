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

function getProjectFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const projects = window.projectItems || [];
  return projects.find((project) => project.slug === slug) || null;
}

function renderNotFound(root) {
  root.innerHTML = `
    <article class="post-card">
      <h2>Project not found</h2>
      <p>The requested project does not exist.</p>
    </article>
  `;
}

function renderProject(root, project, markdown) {
  const endDateMarkup = project.endDate
    ? `<p class="project-meta-item"><strong>End date:</strong> ${project.endDate}</p>`
    : "";

  root.innerHTML = `
    <article class="project-detail-card">
      <img class="project-hero ${project.imageFit === "contain" ? "fit-contain" : ""}" src="${project.image}" alt="${project.title}" />
      <div class="project-detail-body">
        <h1 class="project-detail-title">${project.title}</h1>
        <p class="project-meta-item"><strong>Start date:</strong> ${project.startDate}</p>
        ${endDateMarkup}
        <section class="project-markdown">${renderMarkdown(markdown)}</section>
      </div>
    </article>
  `;
}

async function loadProjectDescription(file) {
  const response = await fetch(file, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Unable to load project description file: ${file}`);
  }
  return response.text();
}

async function initProjectPage() {
  const root = document.getElementById("project-root");
  const project = getProjectFromQuery();

  if (!project) {
    renderNotFound(root);
    return;
  }

  try {
    const markdown = await loadProjectDescription(project.detailsFile);
    renderProject(root, project, markdown);
    document.title = `${project.title} | Ícaro D. Lima`;
  } catch (error) {
    const fallback = "## Description unavailable\n\nThis project description could not be loaded right now.";
    renderProject(root, project, fallback);
    document.title = `${project.title} | Ícaro D. Lima`;
  }
}

initProjectPage();
