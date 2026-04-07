# Portfolio Website Plan - GitHub Pages (Static)

## Project Overview
[new content to replace with]
A minimal, clean portfolio website built with **React + TypeScript + plain HTML/CSS** to showcase web development projects with email/social links, featuring dark mode as default. Deployed directly to GitHub Pages.

**Owner:** Luke
**GitHub:** github.com/ltv0
**LinkedIn:** linkedin.com/in/ltv0
**Email:** ltv0@example.com
**Custom Domain:** ltv0.me

---

## Tech Stack

###  React + TypeScript + Plain HTML/CSS (Recommended)
- **React 18+**: Component organization with TypeScript
- **TypeScript**: Type-safe JavaScript with better developer experience
- **Vite**: Optional dev server for hot reload
- **Plain HTML/CSS**: All styling in vanilla CSS files
- **GitHub Pages**: Free static hosting (after build)
- **Optional**: Custom domain via Namecheap
- **Custom Domain**: `ltv0.me` (configured at Namecheap)
- **Best for**: Component organization, type safety, better IDE support

---

## Hosting: GitHub Pages

### Why GitHub Pages for Your Portfolio?

- **Free**: Completely free hosting
- **Integrated**: Built into GitHub, no extra account needed
- **Automatic HTTPS**: Free SSL certificate
- **CI/CD**: Automatic deployments on push to branch
- **Custom Domain**: Supports custom domains (with Namecheap)
- **Perfect for Portfolios**: Static sites are ideal for portfolios
- **Simple Setup**: Just push HTML/CSS/JS files and enable Pages
- **Industry Standard**: Most developer portfolios use GitHub Pages

### Setup Steps

1. **Create Repository on GitHub**
   - Create a new repository (public or private)
   - Name it `ltv0.github.io` for user site or `ltv0-portfolio` for project site

2. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Select source branch (main or master)
   - Choose folder (root)
   - Click Save

3. **Add Your Files**
   - For Vanilla: Place `index.html` in the root
   - For React: Place `index.html` and `dist/` folder in root
   - Add CSS files in `/css` folder
   - Add JS files in `/js` folder
   - Add images in `/images` folder

4. **Deploy**
   - Push files to GitHub
   - For React: Run `npm run build` first, then push
   - GitHub Pages will serve them automatically at `https://ltv0.github.io`

### Configuration Files

**GitHub Actions Workflow (Optional - for auto-deploy)**:
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

**Required Files (Vanilla)**:
- `index.html` - Main entry point
- `css/style.css` - Main stylesheet
- `js/theme.ts` - Theme toggle (TypeScript)
- `js/main.ts` - Main functionality (TypeScript)
- `README.md` - Required for GitHub Pages

**Required Files (React)**:
- `index.html` - Main entry point
- `dist/` - Built React app (output from `npm run build`)
- `README.md` - Required for GitHub Pages

### Important Notes
- GitHub Pages only serves static files (HTML, CSS, JS, images)
- No build step required for vanilla HTML/CSS/JS
- Push directly to main branch for automatic deployment
- Base URL configuration not needed for root-level repositories
- For React: Run `npm run build` before pushing to GitHub Pages
- React builds output to `dist/` folder which GitHub Pages can serve
- **React with plain HTML/CSS/JS**: React components render to DOM elements, but all styling and interactivity uses vanilla CSS/JS

### Troubleshooting Common Issues
- **404 errors**: Check that files are committed to the correct branch
- **Custom domain not working**: Verify DNS records at Namecheap
- **403 errors**: Ensure repository is public or you have proper permissions

### Custom Domain Setup (ltv0.me)
1. **Add Domain to GitHub Pages**
   - Go to repository Settings → Pages
   - Under "Custom domain", enter `ltv0.me`
   - Click "Save"

2. **Configure DNS at Namecheap**
   - Add an **A record** pointing `ltv0.me` to GitHub Pages IP addresses
   - Add a **CNAME record** for `www.ltv0.me` pointing to `ltv0.github.io`
   - Wait for DNS propagation (up to 48 hours)

3. **Verify SSL Certificate**
   - GitHub Pages will automatically provision SSL for custom domains
   - Verify the site loads securely at `https://ltv0.me`

---

## File Structure

### React + TypeScript + Plain HTML/CSS Structure
```
website-portfolio/
├── index.html              # Main entry point (serves React app)
├── dist/                   # Built app (output from npm run build)
│   ├── index.html
│   ├── assets/
│   │   ├── index-*.css
│   │   └── index-*.js
│   └── favicon.ico
├── public/                 # Static assets
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── App.tsx            # Main React component (renders to DOM)
│   ├── main.tsx           # Entry point
│   ├── index.css          # Global styles (plain CSS)
│   ├── components/        # Reusable React components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   └── data/              # JSON data files
│       └── projects.json
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration (TypeScript)
├── tsconfig.json          # TypeScript configuration
├── .gitignore
└── README.md

---

## Component Architecture

### React Component Architecture (Plain HTML/CSS)
```
┌─────────────────────────────────────────────────────────────┐
│                        App.tsx                                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │    Header   │  │   Hero      │  │   Projects          │  │
│  │  - Logo     │  │  - Bio      │  │  - ProjectList      │  │
│  │  - Nav      │  │  - CTA      │  │  - ProjectCard      │  │
│  │  - Theme    │  └─────────────┘  └─────────────────────┘  │
│  │    Toggle   │                                            │
│  └─────────────┘                                            │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   About     │  │   Contact   │  │    Footer          │  │
│  │  - Bio      │  │  - Email    │  │  - Copyright        │  │
│  │  - Skills   │  │  - Socials  │  │  - Credits          │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

**Note**: React components render to DOM elements, but all styling and interactivity uses vanilla CSS files.

---

## Pages/Sections

### 1. Header
- Logo/Name (Luke)
- Navigation links (About, Projects, Contact)
- **Theme toggle button** (light/dark mode)

### 2. Hero Section
- Introduction
- Brief bio
- Call-to-action button (View Projects)

### 3. Projects Section
- Grid of 3 project cards
- Each card includes:
  - Project title
  - Brief description
  - Tech stack used
  - Links to live demo and code

### 4. Skills Section
- **Categorize skills by area**:
  - **Frontend**: HTML5, CSS3, JavaScript (ES6+), TypeScript, React, Tailwind CSS
  - **Backend**: Node.js, Express, Python, REST APIs, GraphQL
  - **Database**: MongoDB, PostgreSQL, MySQL, Redis
  - **Tools**: Git, GitHub, VS Code, npm/yarn, Docker (optional)
  - **Testing**: Jest, React Testing Library, Cypress
  - **DevOps**: GitHub Actions, CI/CD, AWS basics
  - **Soft Skills**: Problem-solving, teamwork, communication
- **Include proficiency levels**:
  - Beginner / Intermediate / Advanced
  - Or use a simple icon system (🟢 / 🟡 / 🔴)
- **Add "Learning In Progress" section** to show growth mindset

### 5. About/Bio Section
- **Professional summary** (3-4 sentences): Who you are, what you do, what you're passionate about
- **Education**: Degree, university, relevant coursework
- **Certifications**: AWS, Google, Microsoft, etc.
- **Personal interests**: Hobbies, side projects, open source contributions
- **Availability statement**: "Open to full-time opportunities" or "Freelance available"
- **Example bio**:
  ```
  Hi, I'm Luke! I'm a passionate software developer specializing in 
  building web applications with React and TypeScript. I love solving 
  complex problems and creating intuitive user experiences. Currently 
  looking for junior developer opportunities in the Denver area.
  ```

### 6. Contact Section
- Email link
- Social media links (GitHub, LinkedIn, Twitter, etc.)

### 7. Footer
- Copyright
- Simple credits

---

## Design System (Minimal)

### Color Palette

**Light Mode**:
- Background: `#ffffff` / `#f5f5f5`
- Text: `#1a1a1a` / `#333333`
- Cards: `#ffffff` / `#fafafa`
- Accent: `#007bff` (blue) or `#00b894` (teal)

**Dark Mode (Default)**:
- Background: `#121212` / `#1e1e1e`
- Text: `#e0e0e0` / `#b0b0b0`
- Cards: `#1e1e1e` / `#2d2d2d`
- Accent: `#4fc3f7` (light blue) or `#00e676` (light teal)

### CSS Variables

```css
:root {
  /* Light mode */
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --text-primary: #1a1a1a;
  --text-secondary: #666666;
  --card-bg: #ffffff;
  --card-border: #e0e0e0;
  --accent: #007bff;
  --accent-hover: #0056b3;
  --border: #e0e0e0;
}

[data-theme="dark"] {
  /* Dark mode */
  --bg-primary: #121212;
  --bg-secondary: #1e1e1e;
  --text-primary: #e0e0e0;
  --text-secondary: #b0b0b0;
  --card-bg: #1e1e1e;
  --card-border: #333333;
  --accent: #4fc3f7;
  --accent-hover: #81d4fa;
  --border: #333333;
}
```

### Typography
- Clean sans-serif font (Inter, Roboto, or system fonts)
- Good line height for readability
- Responsive font sizes

### Spacing
- Generous whitespace
- Consistent padding/margins
- Mobile-first responsive design

### Dark Mode Features
- Theme toggle in header
- Smooth transitions between themes
- System preference detection (`prefers-color-scheme`)
- Local storage to remember user preference

---

## Development Steps

### React + TypeScript + Plain HTML/CSS Development
1. **Initialize React Project with TypeScript**
     ```bash
     npm create vite@latest . -- --template react-ts
     npm install
     ```

2. **Create React Components**
     - `Header.tsx` - Navigation and theme toggle
     - `Hero.tsx` - Introduction section
     - `Projects.tsx` - Project grid
     - `About.tsx` - About section
     - `Contact.tsx` - Contact information
     - `Footer.tsx` - Footer content

3. **Create Plain CSS Styles**
     - Define CSS variables for theming
     - Create responsive layout
     - Implement dark mode with CSS variables
     - **All styles in plain CSS files** (no CSS modules)

4. **Create TypeScript Functionality**
     - Theme toggle logic with types
     - Smooth scrolling with type-safe event handlers
     - Mobile menu (if needed)
     - **All interactivity in vanilla TypeScript** (no React hooks for DOM manipulation)

5. **Add Content**
     - Populate components with actual content
     - Customize colors and fonts
     - Add project screenshots

6. **Test & Refine**
     - Run `npm run dev` for local development
     - Test on different devices
     - Test theme switching
     - Optimize images and performance

7. **Build for Production**
     ```bash
     npm run build
     ```

8. **Deploy to GitHub Pages**
     - Copy `dist/` folder contents to repository root
     - Create GitHub repository
     - Push files to repository
     - Enable GitHub Pages in settings
     - Verify deployment

---

## HTML Structure Example (Vanilla)

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Luke - Web Developer Portfolio</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <header class="header">
    <nav class="nav">
      <a href="#" class="logo">Luke</a>
      <ul class="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <button class="theme-toggle" id="themeToggle">
        <svg>...</svg>
      </button>
    </nav>
  </header>

  <main>
    <section id="hero" class="hero">
      <h1>Hello, I'm Luke</h1>
      <p>Web Developer</p>
      <a href="#projects" class="cta-button">View My Projects</a>
    </section>

    <section id="projects" class="projects">
      <h2>Projects</h2>
      <div class="project-grid">
        <!-- Project cards -->
      </div>
    </section>

    <section id="about" class="about">
      <h2>About Me</h2>
      <p>Bio and skills...</p>
    </section>

    <section id="contact" class="contact">
      <h2>Contact</h2>
      <a href="mailto:ltv0@example.com">Email</a>
      <div class="social-links">
        <!-- Social icons -->
      </div>
    </section>
  </main>

  <footer class="footer">
    <p>&copy; 2024 Luke. All rights reserved.</p>
  </footer>

  <script src="js/theme.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
```

## React Component Example (Plain HTML/CSS)

```tsx
// src/App.tsx
import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

type Theme = 'dark' | 'light'

function App() {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    const saved = localStorage.getItem('theme-preference') as Theme | null
    if (saved) {
      setTheme(saved)
      document.documentElement.setAttribute('data-theme', saved)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark' as Theme
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme-preference', newTheme)
  }

  return (
    <div data-theme={theme} className={`app ${theme}`}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <Projects />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
```

**Note**: React components render to DOM elements, but all styling and interactivity uses vanilla CSS files.

---

## TypeScript Functionality (Vanilla)

### Theme Toggle (theme.ts)

```javascript
// theme.js - Theme toggle logic

const themeToggle = document.getElementById('themeToggle')
const html = document.documentElement
const STORAGE_KEY = 'theme-preference'

// Check for saved preference or system preference
function getPreferredTheme() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) return saved
  
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}

// Toggle theme
function toggleTheme() {
  const current = html.getAttribute('data-theme')
  const next = current === 'dark' ? 'light' : 'dark'
  html.setAttribute('data-theme', next)
  localStorage.setItem(STORAGE_KEY, next)
}

// Initialize
themeToggle.addEventListener('click', toggleTheme)
html.setAttribute('data-theme', getPreferredTheme())
```

### Main JavaScript (main.js)

```javascript
// main.js - Main functionality

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute('href'))
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  })
})

// Add any additional interactivity here
```

---

## Data Structure Example

```html
<!-- Projects can be hardcoded in HTML or loaded from JSON -->

<!-- Option 1: Hardcoded in HTML -->
<div class="project-card">
  <img src="images/project1.jpg" alt="Project 1">
  <h3>Project Title</h3>
  <p>Description of the project...</p>
  <div class="tech-stack">
    <span>HTML</span>
    <span>CSS</span>
    <span>JavaScript</span>
  </div>
  <div class="project-links">
    <a href="https://example.com" target="_blank">Live Demo</a>
    <a href="https://github.com/ltv0/project1" target="_blank">Code</a>
  </div>
</div>

<!-- Option 2: Load from JSON (optional) -->
<script>
const projects = [
  {
    id: 1,
    title: "E-commerce Website",
    description: "A full-featured online store. . .",
    techStack: ["HTML", "CSS", "JavaScript"],
    demoUrl: "https://example.com",
    codeUrl: "https://github.com/ltv0/ecommerce",
    image: "/images/project1.jpg"
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "A minimal, clean portfolio. . .",
    techStack: ["HTML", "CSS", "JavaScript"],
    demoUrl: "https://ltv0.github.io",
    codeUrl: "https://github.com/ltv0/portfolio",
    image: "/images/portfolio.jpg"
  },
  {
    id: 3,
    title: "Blog Platform",
    description: "A modern blogging platform. . .",
    techStack: ["HTML", "CSS", "JavaScript"],
    demoUrl: "https://example.com",
    codeUrl: "https://github.com/lukek/blog",
    image: "/images/blog.jpg"
  },
  {
    id: 4,
    title: "Weather Report",
    description: "A simple weather app showcased on Devpost.",
    techStack: ["HTML", "CSS", "JavaScript"],
    demoUrl: "https://devpost.com/software/weather-report-2aew5f",
    codeUrl: "",
    image: "/images/weather-report.jpg"
  },
  {
    id: 5,
    title: "Blaster Hack — Commandline Game",
    description: "A command-line game hosted on ltv0.me.",
    techStack: ["TypeScript", "Node.js"],
    demoUrl: "http://ltv0.me/blaster-hack-commandline-game/",
    codeUrl: "",
    image: "/images/blaster-commandline.jpg"
  }
];
</script>
```

## React Projects Data Example

```jsx
// src/data/projects.json
export const projects = [
  {
    id: 1,
    title: "E-commerce Website",
    description: "A full-featured online store built with React.",
    techStack: ["React", "CSS", "JavaScript"],
    demoUrl: "https://example.com",
    codeUrl: "https://github.com/ltv0/ecommerce",
    image: "/images/project1.jpg"
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "A minimal, clean portfolio built with React.",
    techStack: ["React", "CSS", "JavaScript"],
    demoUrl: "https://ltv0.github.io",
    codeUrl: "https://github.com/ltv0/portfolio",
    image: "/images/portfolio.jpg"
  },
  {
    id: 3,
    title: "Blog Platform",
    description: "A modern blogging platform built with React.",
    techStack: ["React", "CSS", "JavaScript"],
    demoUrl: "https://example.com",
    codeUrl: "https://github.com/lukek/blog",
    image: "/images/blog.jpg"
  }
  ,
  {
    id: 4,
    title: "Weather Report",
    description: "A simple weather app showcased on Devpost.",
    techStack: ["React", "TypeScript"],
    demoUrl: "https://devpost.com/software/weather-report-2aew5f",
    codeUrl: "",
    image: "/images/weather-report.jpg"
  },
  {
    id: 5,
    title: "Blaster Hack — Commandline Game",
    description: "A command-line game hosted on ltv0.me.",
    techStack: ["TypeScript", "Node.js"],
    demoUrl: "http://ltv0.me/blaster-hack-commandline-game/",
    codeUrl: "",
    image: "/images/blaster-commandline.jpg"
  }
]
```

---

## Deployment Checklist

### Vanilla HTML/CSS/JS
- [ ] Create GitHub repository
- [ ] Create `index.html` with semantic structure
- [ ] Create `css/style.css` with responsive styles
- [ ] Create `js/main.js` with functionality
- [ ] Add `images/` folder with assets
- [ ] Push files to GitHub
- [ ] Enable GitHub Pages in repository settings
- [ ] Verify Pages is accessible at `https://ltv0.github.io`
- [ ] **Set up custom domain `ltv0.me` in Pages settings**
- [ ] **Configure DNS at Namecheap for `ltv0.me`**
- [ ] **Verify SSL certificate for `https://ltv0.me`**
- [ ] (Optional) Create GitHub Actions workflow for auto-deploy


### React + Plain HTML/CSS/JS
- [ ] Create React project with Vite
- [ ] Create all components (Header, Hero, Projects, About, Contact, Footer)
- [ ] Create `package.json` with dependencies
- [ ] Create `vite.config.js` configuration
- [ ] Create `.gitignore` file
- [ ] Run `npm run dev` for local development
- [ ] Test all components and functionality
- [ ] Create plain CSS styles (no CSS modules)
- [ ] Create plain JavaScript (no React hooks for DOM manipulation)
- [ ] Run `npm run build` to create production build
- [ ] Copy `dist/` folder contents to GitHub repository root
- [ ] Push files to GitHub
- [x] Enable GitHub Pages in repository settings
- [x] Verify Pages is accessible at `https://ltv0.github.io`
- [x] **Set up custom domain `ltv0.me` in Pages settings**
- [x] **Configure DNS at Namecheap for `ltv0.me`**
- [ ] **Verify SSL certificate for `https://ltv0.me`**
- [ ] (Optional) Create GitHub Actions workflow for auto-deploy

---


## Questions to Consider

### Hosting Questions
- **GitHub Pages**: Best for portfolios, integrated with GitHub, free
- **Recommendation**: Use GitHub Pages exclusively for simplicity and integration

### Dark Mode Questions
- Dark mode should be the default
- Should light mode be available via toggle?
- Any specific color preferences for dark mode?

### Layout Questions
- Should projects be in a grid or list layout?
- Any specific animations or transitions?
- Do you want a blog section in the future?

### Content Questions
- What are the 2-3 project names you want to showcase?
- What's your name and brief bio?
- What skills do you want to highlight?
- What are your social media links?

### React-Specific Questions
- Do you want to use React Router for navigation?
- Should projects be loaded from JSON or hardcoded?
- Do you want to use CSS modules or plain CSS?
- Any specific React hooks you want to use?
- **Important**: Will you use React for component organization only, with plain HTML/CSS/JS for styling and interactivity?

---

## Next Steps

### For Vanilla HTML/CSS/JS
1. Create GitHub repository
2. Create `index.html` with semantic structure
3. Create `css/style.css` with responsive styles and CSS variables
4. Create `js/main.js` with theme toggle and smooth scrolling
5. Add your content and images
6. Push to GitHub and enable Pages
7. Test and refine

### For React + Plain HTML/CSS/JS
1. Create GitHub repository
2. Initialize React project with Vite: `npm create vite@latest . -- --template react`
3. Install dependencies: `npm install`
4. Create all components (Header, Hero, Projects, About, Contact, Footer)
5. Create `package.json` with dependencies
6. Create `vite.config.js` configuration
7. Create `.gitignore` file
8. Run `npm run dev` for local development
9. Test all components and functionality
10. Create plain CSS styles (no CSS modules)
11. Create plain JavaScript (no React hooks for DOM manipulation)
12. Run `npm run build` to create production build
13. Copy `dist/` folder contents to GitHub repository root
14. Push files to GitHub
15. Enable GitHub Pages in repository settings
16. Verify deployment at `https://ltv0.github.io`
17. Test and refine

---

## Additional Resources

### Vanilla HTML/CSS/JS Resources
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS-Tricks](https://css-tricks.com/)
- [JavaScript.info](https://javascript.info/)

### React Resources
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [React Hooks](https://react.dev/reference/react)
### GitHub Pages Resources
- [GitHub Pages Documentation](https://pages.github.com/)
- [GitHub Actions](https://docs.github.com/actions)

### Custom Domain Resources (ltv0.me)
- [Namecheap DNS Management](https://www.namecheap.com/support/knowledgebase/article.aspx/1000)
- [GitHub Pages Custom Domain Setup](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [SSL Certificate for Custom Domains](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site#configuring-your-dns-provider)

---

## Custom Domain Configuration (ltv0.me)

### Overview
Your portfolio will be accessible at **`https://ltv0.me`** (and optionally `https://www.ltv0.me`).

### DNS Configuration at Namecheap

1. **Log in to Namecheap**
   - Go to [namecheap.com](https://www.namecheap.com)
   - Navigate to **Domain List** → Select `ltv0.me` → **Advanced DNS**

2. **Add GitHub Pages DNS Records**
   
   **A Records (for `ltv0.me`):**
   - Add 4 A records pointing to GitHub Pages IP addresses:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   
   **CNAME Record (for `www.ltv0.me`):**
   - Host: `www`
   - Value: `ltv0.github.io`
   - TTL: Automatic

3. **Verify DNS Propagation**
   - Use [dnschecker.org](https://dnschecker.org) to verify records
   - Wait up to 48 hours for full propagation

### GitHub Pages Settings

1. **Go to Repository Settings → Pages**
2. **Under "Custom domain"**: Enter `ltv0.me`
3. **Click "Save"**
4. **GitHub will provision SSL certificate automatically**

### Verification Checklist

- [x] DNS A records configured at Namecheap
- [x] CNAME record for `www.ltv0.me` configured
- [x] Custom domain added in GitHub Pages settings
- [ ] SSL certificate verified (HTTPS works)
- [x] Site accessible at `https://ltv0.me`
- [x] Site accessible at `https://www.ltv0.me`

---
