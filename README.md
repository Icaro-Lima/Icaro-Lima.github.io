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
- `styles.css`: layout, colors, responsive behavior.
- `script.js`: content arrays and rendering for Projects, Posts, and Photos.
- `assets/`: images used by cards and placeholders.
- `.github/workflows/deploy.yml`: GitHub Pages deployment workflow.
- `CNAME`: custom domain (`icarodlima.com`).

## How to update website content

### 1) Add or edit projects

Edit the `projectItems` array in `script.js`. Each project card uses:

```js
{
  image: "assets/project-x.svg",
  title: "Project title",
  startDate: "2026",
  description: "Small description",
  link: "https://project-link"
}
```

- Add a new object to create a new card.
- Put your project image in `assets/` and reference it in `image`.
- If needed, set `link: ""` to hide the project link button.

### 2) Add or edit posts

Edit the `postItems` array in `script.js`. Each post uses:

```js
{
  date: "2026-03-08",
  markdown: `## Post title

Your markdown content here.`
}
```

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

Open `index.html` in your browser.

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
