# 🌴 HH Goa 2026 – Builder Identity Generator & PFP Studio

An interactive web application built for **Hacker House Goa 2026**. This tool enables hackers, developers, and creators to design personalized event badges, customize social media profile frames (PFP), and instantly share their builder identity on X (Twitter) using `#FrameInGoa`.

---

## ✨ Features

- 📸 **Instant Multi-Format Photo Upload**: Upload your profile picture in `PNG`, `JPG`, `WEBP`, or iPhone `HEIC` formats.
- ⚡ **Seamless HEIC Processing**: Silent background conversion for iPhone HEIC images with instant 0ms preview feedback.
- 📷 **Live Device Camera Integration**: Capture profile pictures directly using laptop or mobile webcams with a live preview modal.
- 🖼️ **Interactive PFP Frame Studio**: Fine-tune your profile image with zoom, scale, and pan controls to fit perfectly within the HH Goa 2026 frame.
- 🆔 **Builder ID Customization**:
  - **Builder Classes**: Choose preset classes like *Terminal Wizard*, *Solana Degen*, *Full Stack Phantom*, *AI Overlord*, *Rust Evangelist*, or enter a custom class.
  - **Tech Stack & Bio**: Showcase your top tools and skills.
- ⬇️ **High-Resolution HD Export**: Render high-density (2000x2000) PNG graphics using HTML5 Canvas.
- 🚀 **One-Click X (Twitter) Sharing**: Automatically generate X post text with pre-filled hashtags (`#FrameInGoa`, `#HHGoa2026`) and direct image download.
- 📱 **Mobile & Desktop Optimized**: Fully responsive layout designed with a sleek dark-green theme (`#03502E`, `#023D23`, `#FFE600`).

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Utilities**: `heic-to` (Background HEIC Image Conversion), `canvas-confetti` (Celebration Effects)

---

## 📁 Project Structure

```text
HH goa/
├── public/                 # Static assets (frames, logos, overlays)
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── BackButton.tsx
│   │   ├── CameraModal.tsx        # Live webcam capture modal
│   │   ├── IdentityFormatCard.tsx # Badge preview selection card
│   │   ├── LivePreview.tsx        # Canvas badge & PFP renderer
│   │   ├── PfpFrameEditor.tsx     # Frame controls (zoom, pan, upload)
│   │   └── StepIndicator.tsx
│   ├── pages/              # Route views
│   │   ├── HomePage.tsx           # Landing page
│   │   ├── IdentityStudioPage.tsx # Format selection page
│   │   ├── BuilderIdCreatorPage.tsx # Builder ID card creator
│   │   ├── PfpCreatorPage.tsx     # PFP badge creator
│   │   └── SharePage.tsx          # Download & X sharing page
│   ├── utils/              # Helper utilities
│   │   ├── defaultData.ts         # Initial builder state
│   │   ├── imageUtils.ts          # Downscaling & background HEIC processing
│   │   └── shareHelpers.ts        # Canvas export & X sharing functions
│   ├── App.tsx             # Application router & routes
│   └── main.tsx            # Entry point
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vercel.json             # Vercel SPA routing configuration
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) and `npm` installed.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Hacker-From-Asgaurd/diamondgoa.git
   cd diamondgoa
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

---

## 📦 Building for Production

To create an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 🌐 Deployment

This project is pre-configured for one-click deployment on [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).

### Deploying to Vercel
The repository includes a `vercel.json` file configured for SPA route rewrites:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```
Simply connect your GitHub repository to Vercel and it will build and deploy automatically.

---

## 🤝 Community & Hashtags

When sharing your generated badge, tag your posts with:
- `#FrameInGoa`
- `#HHGoa2026`
- `#HackerHouseGoa`

---

## 📜 License

Created for **Hacker House Goa 2026**. Open source for community builders.
