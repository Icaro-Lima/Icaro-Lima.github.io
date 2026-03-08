# Icaro-Lima.github.io

Personal website for **Ícaro D. Lima** hosted on GitHub Pages (`icarodlima.com`).

<img src="./profile_picture.jpg" width="200em" alt="Ícaro D. Lima profile picture" />

[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Icaro-Lima)
[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/icaro-lima/)
[![LeetCode](https://img.shields.io/badge/LeetCode-000000?style=for-the-badge&logo=LeetCode&logoColor=#d16c06)](https://leetcode.com/u/IcaroDLima/)
[![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?style=for-the-badge&logo=YouTube&logoColor=white)](https://www.youtube.com/@icarodlima)
[![Instagram](https://img.shields.io/badge/Instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white)](https://www.instagram.com/icarodlima/)
[![Thingiverse](https://img.shields.io/badge/Thingiverse-248BFB?style=for-the-badge&logo=thingiverse&logoColor=white)](https://www.thingiverse.com/icarodlima)

## Project structure

- `index.html`: page structure + profile/social links.
- `project.html`: dedicated project detail page.
- `styles.css`: layout, colors, responsive behavior.
- `projects-data.js`: project cards metadata shared by home/detail pages.
- `script.js`: rendering for home tabs (Projects, Posts, Photos).
- `project.js`: rendering logic for the dedicated project page.
- `posts/`: markdown files used by the Posts tab.
- `projects/`: markdown files used by project detail pages.
- `assets/`: images used by cards and placeholders.
- `.github/workflows/deploy.yml`: GitHub Pages deployment workflow.
- `CNAME`: custom domain (`icarodlima.com`).

## How to update website content

### 1) Add or edit projects

Edit the `projectItems` array in `projects-data.js`. Each project card uses:

```js
{
  slug: "project-slug",
  image: "assets/project-x.svg",
  title: "Project title",
  startDate: "January, 2026",
  endDate: "March, 2026", // optional
  description: "Small description",
  detailsFile: "projects/project-slug.md"
}
```

- Add a new object to create a new card.
- Put your project image in `assets/` and reference it in `image`.
- Create the extended markdown description file in `projects/`.
- Each project card is clickable and opens `project.html?slug=...`.

### 2) Add or edit posts

Edit the `postItems` array in `script.js`. Each post uses:

```js
{
  date: "2026-03-08",
  file: "posts/post-file-name.md"
}
```

Then create or edit the markdown file in `posts/`.

Supported markdown:

- Headings (`##`)
- Bullet and numbered lists
- Inline code (`` `code` ``)
- Links (`[label](https://url)`)
- Bold/italic

### 3) Add or edit photos

Edit the `photoItems` array in `script.js`. Each photo card uses:

```js
{
  image: "assets/photo-x.jpg",
  date: "2026-03-08",
  description: "Small caption"
}
```

- Add the image to `assets/`.
- Add a new object to `photoItems`.

### 4) Update profile/social links

- Profile picture: replace `profile_picture.jpg`.
- Name and bio: update text in `index.html`.
- Social links: update `<nav class="social-links">` in `index.html`.

## Local preview

Run a local web server and open it in your browser:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy (GitHub Pages)

Deployment is automatic through `.github/workflows/deploy.yml` on every push to `main`.

### Required repository settings

1. Open repository settings.
2. Go to **Pages**.
3. Set **Source** to **GitHub Actions**.

### Publish updates

```bash
git add .
git commit -m "Update website content"
git push origin main
```

After push, check the **Actions** tab for deployment status.
