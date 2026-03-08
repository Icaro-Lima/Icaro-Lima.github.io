const postItems = [
  {
    date: "2026-03-08",
    file: "posts/shipping-clean-frontend-code.md",
    placeholder: true,
  },
  {
    date: "2026-03-07",
    file: "posts/my-leetcode-routine.md",
    placeholder: true,
  },
  {
    date: "2026-03-06",
    file: "posts/useful-dev-links.md",
    placeholder: true,
  },
];

const photoItems = [
  {
    image: "assets/photo-1.svg",
    date: "2026-02-14",
    description: "Evening city walk and ambient lights.",
    placeholder: true,
  },
  {
    image: "assets/photo-2.svg",
    date: "2026-02-03",
    description: "Morning coffee and a clean desk setup.",
    placeholder: true,
  },
  {
    image: "assets/photo-3.svg",
    date: "2026-01-27",
    description: "Weekend trail with a wide sunset horizon.",
    placeholder: true,
  },
  {
    image: "assets/photo-4.svg",
    date: "2026-01-18",
    description: "A candid black-and-white street portrait.",
    placeholder: true,
  },
  {
    image: "assets/photo-5.svg",
    date: "2025-12-30",
    description: "Architecture detail from a downtown building.",
    placeholder: true,
  },
  {
    image: "assets/photo-6.svg",
    date: "2025-12-22",
    description: "Night skyline shot from a rooftop.",
    placeholder: true,
  },
];

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

function createCard({ slug, image, title, startDate, description, imageFit, placeholder }) {
  const imageClass = imageFit === "contain" ? "card-image fit-contain" : "card-image";
  const placeholderBadge = placeholder ? `<span class="content-tag">Placeholder</span>` : "";
  return `
    <a class="card-anchor" href="project.html?slug=${encodeURIComponent(slug)}" aria-label="Open project ${title}">
      <article class="card">
        <img class="${imageClass}" src="${image}" alt="${title}" />
        <div class="card-body">
          <p class="card-date">Started: ${startDate}</p>
          ${placeholderBadge}
          <h3 class="card-title">${title}</h3>
          <p class="card-description">${description}</p>
        </div>
      </article>
    </a>
  `;
}

function createPhotoCard({ image, date, description, placeholder }, index) {
  const placeholderBadge = placeholder ? `<span class="content-tag">Placeholder</span>` : "";
  return `
    <article class="card">
      <img class="card-image" src="${image}" alt="Photo ${index + 1}" />
      <div class="card-body">
        <p class="card-date">${date}</p>
        ${placeholderBadge}
        <p class="card-description">${description}</p>
      </div>
    </article>
  `;
}

function createPostCard({ date, markdown, placeholder }) {
  const placeholderBadge = placeholder ? `<span class="content-tag">Placeholder</span>` : "";
  return `
    <article class="post-card">
      <p class="post-date">${date}</p>
      ${placeholderBadge}
      ${renderMarkdown(markdown)}
    </article>
  `;
}

async function loadPostMarkdown(file) {
  const response = await fetch(file, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Unable to load post file: ${file}`);
  }
  return response.text();
}

async function renderPosts(postsList) {
  const postCards = await Promise.all(
    postItems.map(async (post) => {
      try {
        const markdown = await loadPostMarkdown(post.file);
        return createPostCard({ ...post, markdown });
      } catch (error) {
        const fallback = "## Post unavailable\n\nThis post could not be loaded right now.";
        return createPostCard({ ...post, markdown: fallback });
      }
    })
  );

  postsList.innerHTML = postCards.join("");
}

async function renderContent() {
  const projectsGrid = document.getElementById("projects-grid");
  const postsList = document.getElementById("posts-list");
  const photosGrid = document.getElementById("photos-grid");

  projectsGrid.innerHTML = (window.projectItems || []).map(createCard).join("");
  photosGrid.innerHTML = photoItems.map(createPhotoCard).join("");
  await renderPosts(postsList);
}

function setupTabs() {
  const tabs = Array.from(document.querySelectorAll(".tab"));
  const panels = Array.from(document.querySelectorAll(".panel"));

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((otherTab) => {
        otherTab.classList.remove("active");
        otherTab.setAttribute("aria-selected", "false");
      });

      panels.forEach((panel) => {
        panel.classList.remove("active");
        panel.hidden = true;
      });

      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      const activePanel = document.getElementById(tab.dataset.tab);
      activePanel.classList.add("active");
      activePanel.hidden = false;
    });
  });
}

renderContent();
setupTabs();
