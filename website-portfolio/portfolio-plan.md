# Portfolio Website Plan - React

## Project Overview
A minimal, clean portfolio website built with React to showcase 2-3 projects with email/social links, featuring dark mode.

---

## Tech Stack
- **Framework**: React (Vite - faster and lighter than Create React App)
- **Styling**: CSS Modules or Tailwind CSS (minimal design)
- **Icons**: Lucide React or Heroicons
- **Deployment**: Vercel or Netlify (recommended for React apps)
- **Domain**: Namecheap (can connect to Vercel/Netlify)

---

## Hosting Options for Namecheap Domain

### Option 1: Vercel/Netlify + Namecheap DNS (Recommended)
**Pros**: Free hosting, automatic HTTPS, continuous deployment, professional
**Steps**:
1. Get Vercel/Netlify deployment URL (e.g., `project.vercel.app`)
2. In Namecheap:
   - Go to Domain List → Click domain → Advanced DNS
   - Add CNAME records:
     - `www` → `your-project.vercel.app`
     - `@` → `your-project.vercel.app`
3. In Vercel/Netlify Dashboard:
   - Go to Domain Management → Add custom domain
   - Follow verification steps
4. Wait for DNS propagation (up to 48 hours)

### Option 2: Namecheap EasyWeb (Static Hosting)
**Pros**: Direct Namecheap hosting
**Cons**: Paid plan required, manual file uploads
**Steps**:
1. Purchase EasyWeb hosting plan
2. Upload `dist/` folder via FTP
3. Point domain directly to Namecheap

### Recommendation for Entry-Level Developers
**Use Vercel/Netlify + Namecheap DNS**:
- Free hosting
- Automatic HTTPS
- Continuous deployment from GitHub
- Professional appearance
- Easy to manage

---

## Component Architecture

```
src/
├── components/
│   ├── Header/
│   │   ├── Header.jsx
│   │   └── ThemeToggle.jsx
│   ├── Hero/
│   │   └── Hero.jsx
│   ├── Projects/
│   │   └── Projects.jsx
│   ├── About/
│   │   └── About.jsx
│   ├── Contact/
│   │   └── Contact.jsx
│   ├── Footer/
│   │   └── Footer.jsx
│   └── SocialLinks/
│       └── SocialLinks.jsx
├── context/
│   └── ThemeContext.jsx
├── hooks/
│   └── useTheme.js
├── pages/
│   └── Index.jsx
├── App.jsx
└── main.jsx
```

---

## Pages/Sections

### 1. Header
- Logo/Name
- Navigation links (About, Projects, Contact)
- **Theme toggle button** (light/dark mode)

### 2. Hero Section
- Introduction
- Brief bio
- Call-to-action button (View Projects)

### 3. Projects Section
- Grid of 2-3 project cards
- Each card includes:
  - Project title
  - Brief description
  - Tech stack used
  - Links to live demo and code

### 4. About Section
- Personal bio
- Skills list
- Education/Certifications (optional)

### 5. Contact Section
- Email link
- Social media links (GitHub, LinkedIn, Twitter, etc.)

### 6. Footer
- Copyright
- Simple credits

---

## Design System (Minimal)

### Color Palette

**Light Mode**:
- Background: #ffffff / #f5f5f5
- Text: #1a1a1a / #333333
- Cards: #ffffff / #fafafa
- Accent: #007bff (blue) or #00b894 (teal)

**Dark Mode**:
- Background: #121212 / #1e1e1e
- Text: #e0e0e0 / #b0b0b0
- Cards: #1e1e1e / #2d2d2d
- Accent: #4fc3f7 (light blue) or #00e676 (light teal)

### Typography
- Clean sans-serif font (Inter, Roboto, or system fonts)
- Good line height for readability

### Spacing
- Generous whitespace
- Consistent padding/margins

### Dark Mode Features
- Theme toggle in header
- Smooth transitions between themes
- System preference detection (prefers-color-scheme)
- Local storage to remember user preference

---

## Development Steps

1. **Setup Project**
   - Initialize Vite React project
   - Install dependencies
   - Configure build tools

2. **Create Theme System**
   - Set up ThemeContext for global theme state
   - Create useTheme hook
   - Implement theme toggle component

3. **Create Components**
   - Build each component individually
   - Test components in isolation with both themes

4. **Implement Styling**
   - Apply minimal design principles
   - Ensure responsive design
   - Implement dark mode styles

5. **Add Content**
   - Populate with your actual content
   - Customize colors and fonts

6. **Test & Refine**
   - Test on different devices
   - Test theme switching
   - Optimize performance

7. **Deploy**
   - Push to GitHub
   - Connect Vercel/Netlify account
   - Configure custom domain from Namecheap
   - Update DNS records at Namecheap
   - Deploy and verify

---

## File Structure

```
website-portfolio/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header.jsx
│   │   │   └── ThemeToggle.jsx
│   │   ├── Hero/
│   │   │   └── Hero.jsx
│   │   ├── Projects/
│   │   │   └── Projects.jsx
│   │   ├── About/
│   │   │   └── About.jsx
│   │   ├── Contact/
│   │   │   └── Contact.jsx
│   │   ├── Footer/
│   │   │   └── Footer.jsx
│   │   └── SocialLinks/
│   │       └── SocialLinks.jsx
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── hooks/
│   │   └── useTheme.js
│   ├── pages/
│   │   └── Index.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── utils/
│       └── data.js (for project data)
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## Data Structure Example

```javascript
// src/utils/data.js

export const projects = [
  {
    id: 1,
    title: "Project Name",
    description: "Brief description of what the project does",
    techStack: ["React", "Node.js", "MongoDB"],
    demoUrl: "https://example.com",
    codeUrl: "https://github.com/yourusername/project",
    image: "/project1.jpg"
  },
  // ... more projects
];

export const skills = [
  "React",
  "JavaScript",
  "HTML/CSS",
  // ... more skills
];

export const socialLinks = {
  email: "your.email@example.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  twitter: "https://twitter.com/yourusername"
};
```

### Theme Configuration

```javascript
// src/context/ThemeContext.jsx

const themeConfig = {
  light: {
    background: '#ffffff',
    cardBackground: '#fafafa',
    text: '#1a1a1a',
    secondaryText: '#666666',
    accent: '#007bff',
    border: '#e0e0e0'
  },
  dark: {
    background: '#121212',
    cardBackground: '#1e1e1e',
    text: '#e0e0e0',
    secondaryText: '#b0b0b0',
    accent: '#4fc3f7',
    border: '#333333'
  }
};
```

---

## Component Flow Diagram

```mermaid
graph TD
    A[main.jsx] --> B[App.jsx]
    B --> C[ThemeContext]
    B --> D[Index.jsx]
    D --> E[Header]
    D --> F[Hero]
    D --> G[Projects]
    D --> H[About]
    D --> I[Contact]
    D --> J[Footer]
    E --> K[ThemeToggle]
    K --> C
    C --> L[useTheme Hook]
```

---

## Next Steps

1. Initialize Vite React project
2. Create theme system (Context + Toggle)
3. Create component structure
4. Implement each section
5. Add your content
6. Test and deploy

---

## Questions to Consider

### Dark Mode Questions
- Should dark mode be the default or require toggle?
- Do you want to respect system preference by default?
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
