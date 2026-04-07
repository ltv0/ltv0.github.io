# Portfolio Website Development Plan

## Goal
Turn this project into a fully developed portfolio website that showcases your work, highlights your skills, and makes it easy for visitors and recruiters to contact you.

## Current state
- Static landing page with a canvas background and two project links
- Uses Vite, TypeScript, and `@chenglou/pretext`
- Minimal styling and no portfolio sections yet

## Recommended final site structure
1. **Hero / Homepage**
   - Full-screen introduction
   - Name, title, short tagline
   - Primary call-to-action (view projects, contact)
   - Current canvas background as an animated hero effect
2. **About**
   - Short personal summary
   - Key strengths and technology focus
   - Education or background bullet points
3. **Projects**
   - Featured project cards with title, description, tech stack, and links
   - At least 3–5 projects, including the current Devpost/hackathon work
   - Optional filters: Web, Games, Tools, etc.
4. **Skills / Tools**
   - Front-end, back-end, languages, frameworks, tooling
   - Use icons or a styled skill grid
5. **Experience / Timeline**
   - Internship, job roles, open-source contributions, event/hackathon achievements
   - Keep it concise and easy to scan
6. **Contact**
   - Email and social links
   - Optional contact form or copyable email button
7. **Footer**
   - Copyright, GitHub, LinkedIn, GitHub Pages / hosting info

## Technical plan
### Option A: Keep it simple and static
- Continue using plain HTML/CSS/TypeScript + Vite
- Expand `index.html` into a single-page structure
- Add sections and internal navigation anchors
- Add `styles.css` for layout, responsiveness, and theme
- Keep the current canvas animation in place as a visual brand element

### Option B: Add React-style structure with components
- Keep Vite + TypeScript
- Add a lightweight component structure in `src/`
- Use plain TS modules and DOM rendering if you want minimal overhead
- Build reusable UI modules for hero, projects, about, contact

### Recommended file structure
```
/  
├── index.html
├── plan.md
├── README.md
├── package.json
├── tsconfig.json
├── vite.config.ts
├── src/
│   ├── main.ts
│   ├── background.ts
│   ├── canvas.ts
│   ├── sections.ts      # build page sections and render DOM
│   ├── projects.ts      # project data and helpers
│   ├── styles.css       # global site styles
│   └── utils.ts         # helpers for DOM elements, theme toggles
└── public/
    ├── images/          # project screenshots, icons
    └── favicon.ico
```

## UX and design
- Use a dark theme with a bold accent color similar to the current site
- Keep typography clean and legible: monospace can stay, but add a second neutral font for body copy
- Make navigation sticky or fixed at top
- Add smooth scroll for anchor links
- Prioritize mobile responsiveness: stacked sections, readable buttons, simple menus
- Use the canvas background as a hero enhancement, not the main content

## Content plan
- **Profile summary**: "Software developer with web and game experience, building polished user experiences and interactive projects."
- **Project details**:
  - Title
  - Brief description
  - Role / contribution
  - Tech stack
  - Link to live demo or repo
- **Skills**: JavaScript, TypeScript, Vite, HTML, CSS, Canvas, Git, GitHub Pages
- **Contact**: GitHub profile, LinkedIn, email, optional custom domain `ltv0.me`

## Deployment plan
1. Build locally with `npm run build`
2. Deploy using GitHub Pages or GitHub Actions
3. Optionally configure a custom domain with CNAME
4. Verify site loads at `https://ltv0.github.io/<repo>` or custom domain

## Milestones
1. **MVP**: Add hero, about, projects, contact, responsive styling
2. **Content polish**: Add project descriptions, experience details, links
3. **UX polish**: Add navigation, smooth scroll, accessible focus states
4. **Deploy**: Build and publish to GitHub Pages
5. **Iterate**: Add more projects, improve visuals, add animations

## Next steps
1. Create or update the HTML structure with portfolio sections
2. Add CSS for layout, typography, and responsiveness
3. Add content for projects, bio, and contact info
4. Keep the canvas animation and integrate it as a hero background
5. Deploy and test on GitHub Pages

## Notes
- Keep the page lightweight and fast
- Avoid too much friction for visitors; make links easy to find
- Use this project as both a portfolio showcase and a demonstration of your front-end skills
