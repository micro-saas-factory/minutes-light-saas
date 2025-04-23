# Minutes Lite

> Meeting Transcripts to Actionable Summaries

Minutes Lite is a lightweight Next.js application that transforms your meeting transcripts (plain-text or VTT files) into concise summaries, key decisions, and action items with the click of a button. Drag & drop your transcript—or paste your text—and let our AI-powered summarizer handle the rest. Copy your summary in Markdown or save it for later.

---

## Table of Contents

- [Features](#features)  
- [Demo](#demo)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Configuration](#configuration)  
- [Project Structure](#project-structure)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Features

- 📄 **File Upload & Drag-and-Drop**  
  Supports `.txt` and `.vtt` transcripts (max 5 MB).  
- ✂️ **Paste Text**  
  Paste your transcript directly into a rich textarea.  
- 🧠 **AI-Powered Summaries**  
  Instant TL;DR, decision list, and action-item breakdown.  
- 📋 **Copy as Markdown**  
  One-click export to Markdown for GitHub, Notion, etc.  
- 💾 **Save to Supabase**  
  Persist your summaries (stubbed placeholder for integration).  
- 🔔 **Custom Toast UI**  
  Beautiful, accessible notifications via [Sonner](https://github.com/sonner-toast/sonner).  
- ❤️ **Built with ❤️ for Developers**  
  Modern Next.js 13 App Router, Tailwind CSS, Framer Motion, Shadcn/UI.  

---

## Demo

![TL;DR Summary Screenshot](./public/demo-summary.png)

---

## Installation

```bash
# Clone the repository
git clone https://github.com/your-username/minutes-lite.git
cd minutes-lite

# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Run in development mode
npm run dev
# or
yarn dev
# or
pnpm dev

# Open http://localhost:3000 in your browser
```

---

## Usage

1. **Landing Page**  
   - Click “Get Started” or use the navigation to access the Summarizer.  
   - The header and navigation are integrated into the hero section for a clean look.

2. **Upload / Paste Transcript**  
   - **Upload File**: Drag & drop a `.txt` or `.vtt` file (≤ 5 MB).  
   - **Paste Text**: Switch to “Paste Text” and enter your transcript manually.  

3. **Generate Summary**  
   - Click **Generate Summary**.  
   - While processing, a spinner indicates progress.  

4. **View Results**  
   - **TL;DR**: A concise summary block.  
   - **Key Decisions**: Bullet-list of decisions.  
   - **Action Items**: Tabular list with “Responsible”, “Task”, and “Due Date”.

5. **Post-Processing**  
   - **Copy Markdown**: Exports the entire summary in Markdown format.  
   - **Save to Supabase**: (Placeholder) Persists the summary in your database.  

6. **Delete / Replace File**  
   - Click the ✖️ icon in the upload panel to clear the current file.  
   - A confirmation toast with “Cancel” and “Delete” options will appear.

---

## Configuration

### Environment Variables

No external APIs are required out-of-the-box. If you integrate with Supabase, add:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

### Theming & Toasts

- **ThemeProvider**: Automatically switches between light/dark modes.  
- **Sonner Toaster**: Customizable styles in `src/app/layout.jsx`.

```js
<Toaster
  position="top-right"
  toastOptions={{
    style: {
      backgroundColor: 'rgba(255,255,255,0.98)',
      boxShadow: '0 8px 32px -8px rgba(0,0,0,0.2)',
      borderRadius: '32px',
      padding: '12px 16px',
      fontSize: '1rem',
      fontWeight: '500',
    }
  }}
  richColors
/>
```

---

## Project Structure

```text
├── public/                # Static assets (images, icons)
│   └── images/
│       └── minutes.png    # Logo used across header & pages
├── src/
│   ├── app/
│   │   ├── layout.jsx     # Root layout & Toaster config
│   │   ├── page.jsx       # Landing (Hero) page
│   │   └── summarizer/
│   │       └── page.jsx   # Summarizer page & logic
│   ├── components/        # Reusable UI & form components
│   ├── components/ui/     # Shadcn-style design system
│   └── lib/
│       └── utils.js       # Utility helpers (e.g., `cn`)
├── .gitignore
├── package.json
├── postcss.config.mjs
└── README.md              # You are here
```

---

## Contributing

1. Fork the repo & create your branch:  
   ```bash
   git checkout -b feature/my-new-feature
   ```
2. Make your changes & add tests if applicable.  
3. Commit & push:  
   ```bash
   git commit -m "feat: add awesome feature"
   git push origin feature/my-new-feature
   ```
4. Open a Pull Request. We’ll review and merge!

Please adhere to the existing code style (Tailwind + Shadcn/UI patterns).

---

## License

This project is MIT-licensed. See the [LICENSE](LICENSE) file for details.  

---

> Made with ❤️ for developers by developers.  
