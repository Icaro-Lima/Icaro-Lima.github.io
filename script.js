const projectItems = [
  {
    image: "assets/verilog-playground.gif",
    title: "Verilog Playground",
    startDate: "2018",
    description:
      "In 2018, I built an FPGA board simulator that modernized COA classes at my college, removing physical board-access bottlenecks and cutting build time from 3+ minutes to about 7 seconds for faster iteration.",
    link: "https://verilog-playground.github.io",
    imageFit: "contain",
  },
  {
    image: "assets/project-1.svg",
    title: "Portfolio API",
    startDate: "2024",
    description: "A REST API for project and article management with JWT auth and OpenAPI docs.",
    link: "https://github.com/Icaro-Lima",
  },
  {
    image: "assets/project-2.svg",
    title: "Design System Kit",
    startDate: "2023",
    description: "Reusable UI components and tokens for consistent, accessible web interfaces.",
    link: "https://github.com/Icaro-Lima",
  },
  {
    image: "assets/project-3.svg",
    title: "CLI Productivity Tools",
    startDate: "2022",
    description: "A set of CLI utilities for automating repetitive engineering workflows.",
    link: "https://github.com/Icaro-Lima",
  },
  {
    image: "assets/project-4.svg",
    title: "Video Automation",
    startDate: "2023",
    description: "Batch utilities for preparing and publishing YouTube content efficiently.",
    link: "https://github.com/Icaro-Lima",
  },
  {
    image: "assets/project-5.svg",
    title: "Interview Prep Dashboard",
    startDate: "2025",
    description: "Progress tracker and daily problem planner for coding interviews.",
    link: "https://leetcode.com/u/IcaroDLima",
  },
  {
    image: "assets/project-6.svg",
    title: "Photo Journal",
    startDate: "2024",
    description: "A lightweight media gallery optimized for responsive viewing and quick updates.",
    link: "https://www.instagram.com/icarodlima",
  },
];

const postItems = [
  {
    date: "2026-03-08",
    markdown: `## Shipping Clean Frontend Code\n\nA workflow that works for me:\n\n- Start with semantic HTML and real content before styling\n- Keep components small and purpose-driven\n- Write tests for high-risk behavior, not every line\n\nReadability is a feature.`,
  },
  {
    date: "2026-03-07",
    markdown: `## My LeetCode Routine\n\nI focus on consistency over intensity:\n\n1. Solve 1-2 problems daily\n2. Review old mistakes weekly\n3. Re-implement top patterns from memory\n\nSmall steps compound.`,
  },
  {
    date: "2026-03-06",
    markdown: `## Useful Dev Links\n\n- GitHub profile: [github.com/Icaro-Lima](https://github.com/Icaro-Lima)\n- LinkedIn: [linkedin.com/in/icaro-lima](https://www.linkedin.com/in/icaro-lima)\n- LeetCode: [leetcode.com/u/IcaroDLima](https://leetcode.com/u/IcaroDLima)\n- Thingiverse: [thingiverse.com/icarodlima](https://www.thingiverse.com/icarodlima)\n- YouTube: [youtube.com/@icarodlima](https://www.youtube.com/@icarodlima)`
  },
];

const photoItems = [
  {
    image: "assets/photo-1.svg",
    date: "2026-02-14",
    description: "Evening city walk and ambient lights.",
  },
  {
    image: "assets/photo-2.svg",
    date: "2026-02-03",
    description: "Morning coffee and a clean desk setup.",
  },
  {
    image: "assets/photo-3.svg",
    date: "2026-01-27",
    description: "Weekend trail with a wide sunset horizon.",
  },
  {
    image: "assets/photo-4.svg",
    date: "2026-01-18",
    description: "A candid black-and-white street portrait.",
  },
  {
    image: "assets/photo-5.svg",
    date: "2025-12-30",
    description: "Architecture detail from a downtown building.",
  },
  {
    image: "assets/photo-6.svg",
    date: "2025-12-22",
    description: "Night skyline shot from a rooftop.",
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

function createCard({ image, title, startDate, description, link, imageFit }) {
  const imageClass = imageFit === "contain" ? "card-image fit-contain" : "card-image";
  return `
    <article class="card">
      <img class="${imageClass}" src="${image}" alt="${title}" />
      <div class="card-body">
        <p class="card-date">Started: ${startDate}</p>
        <h3 class="card-title">${title}</h3>
        <p class="card-description">${description}</p>
        ${link ? `<a class="card-link" href="${link}" target="_blank" rel="noreferrer">Open Project -></a>` : ""}
      </div>
    </article>
  `;
}

function createPhotoCard({ image, date, description }, index) {
  return `
    <article class="card">
      <img class="card-image" src="${image}" alt="Photo ${index + 1}" />
      <div class="card-body">
        <p class="card-date">${date}</p>
        <p class="card-description">${description}</p>
      </div>
    </article>
  `;
}

function createPostCard({ date, markdown }) {
  return `
    <article class="post-card">
      <p class="post-date">${date}</p>
      ${renderMarkdown(markdown)}
    </article>
  `;
}

function renderContent() {
  const projectsGrid = document.getElementById("projects-grid");
  const postsList = document.getElementById("posts-list");
  const photosGrid = document.getElementById("photos-grid");

  projectsGrid.innerHTML = projectItems.map(createCard).join("");
  postsList.innerHTML = postItems.map(createPostCard).join("");
  photosGrid.innerHTML = photoItems.map(createPhotoCard).join("");
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
