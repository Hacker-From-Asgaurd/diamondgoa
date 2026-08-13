# 🌴 HH Goa 2026 --- Builder Identity Studio

> **Create your builder identity. Frame your profile. Share your
> build.**

HH Goa 2026 --- Builder Identity Studio is an interactive web experience
created for **Hacker House Goa 2026**. It lets builders turn a profile
photo and a few details into a personalized **Builder ID** and **PFP
frame**, then export and share the result.

**Live Demo:** https://diamondgoa.vercel.app/\
**Repository:** https://github.com/Hacker-From-Asgaurd/diamondgoa

------------------------------------------------------------------------

## 🎯 What is this?

Hackathon and builder communities are full of talented people, but their
online identities are often disconnected from the event experience.

This project creates a simple identity layer for HH Goa:

**Upload / Capture Photo → Build Your Identity → Customize → Generate →
Share**

The goal is not to make another generic profile-card generator. It is to
give participants a recognizable visual identity they can actually use
during and after the event.

------------------------------------------------------------------------

## ✨ Key Features

### 📸 Flexible Photo Input

-   Upload `PNG`, `JPG`, `WEBP`, and iPhone `HEIC` images.
-   Capture a profile photo directly through the device camera.
-   Handle image preparation in the browser before rendering.

### 🆔 Builder ID Creator

Create a personalized builder identity with: - Builder name / identity
details - Builder class - Tech stack - Short bio - Custom identity
information

Preset builder classes include: - Terminal Wizard - Solana Degen - Full
Stack Phantom - AI Overlord - Rust Evangelist - Custom class

### 🖼️ PFP Frame Studio

Fine-tune your profile image using: - Zoom - Scale - Pan / positioning -
Live preview

### 🎨 High-Resolution Export

Generated graphics are rendered through **HTML5 Canvas** and exported as
high-resolution PNG images at a 2000 × 2000 canvas size.

### 🚀 Sharing

The final identity can be downloaded and prepared for sharing on X with:
`#FrameInGoa` · `#HHGoa2026` · `#HackerHouseGoa`

### 📱 Responsive Experience

The interface is designed for desktop and mobile screens while keeping
the HH Goa visual identity consistent.

------------------------------------------------------------------------

## 🧭 User Flow

``` text
Landing Page
     ↓
Create Identity
     ↓
Choose Format
   ↙     ↘
Builder ID   PFP
 Creator    Creator
   ↘     ↙
 Live Preview
     ↓
Download / Share on X
```

------------------------------------------------------------------------

## 🛠️ Tech Stack

  Layer              Technology
  ------------------ -------------------
  Frontend           React 18
  Language           TypeScript
  Build Tool         Vite 6
  Routing            React Router v7
  Styling            Tailwind CSS v3
  Icons              Lucide React
  Image Processing   `heic-to`
  Rendering          HTML5 Canvas
  Effects            `canvas-confetti`
  Deployment         Vercel

------------------------------------------------------------------------

## 🏗️ Project Structure

``` text
diamondgoa/
├── public/                 # Static assets, frames, logos and overlays
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── BackButton.tsx
│   │   ├── CameraModal.tsx
│   │   ├── IdentityFormatCard.tsx
│   │   ├── LivePreview.tsx
│   │   ├── PfpFrameEditor.tsx
│   │   └── StepIndicator.tsx
│   ├── pages/              # Route-level views
│   │   ├── HomePage.tsx
│   │   ├── IdentityStudioPage.tsx
│   │   ├── BuilderIdCreatorPage.tsx
│   │   ├── PfpCreatorPage.tsx
│   │   └── SharePage.tsx
│   ├── utils/              # Helper utilities
│   │   ├── defaultData.ts
│   │   ├── imageUtils.ts
│   │   └── shareHelpers.ts
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vercel.json
└── vite.config.ts
```

------------------------------------------------------------------------

## ⚙️ Getting Started

### Prerequisites

-   **Node.js 18+**
-   **npm**

### Installation

``` bash
git clone https://github.com/Hacker-From-Asgaurd/diamondgoa.git
cd diamondgoa
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

------------------------------------------------------------------------

## 📦 Production Build

``` bash
npm run build
npm run preview
```

------------------------------------------------------------------------

## 🌐 Deployment

The project includes `vercel.json` for SPA route handling and is
deployed on Vercel.

**Live Demo:** https://diamondgoa.vercel.app/

------------------------------------------------------------------------

## 🔧 Technical Highlights

### Browser-side image processing

Uploaded images are prepared in the browser, including HEIC conversion,
before entering the identity creation flow.

### Canvas-based rendering

HTML5 Canvas controls: - Image positioning - Scaling - Frame overlays -
Final export resolution

### Interactive image positioning

Users can control the position and scale of their profile image instead
of being forced into a fixed crop.

### Reusable React architecture

Major UI pieces are separated into reusable components and route-level
pages to keep the identity creation flow maintainable.

------------------------------------------------------------------------

## 🎨 Design System

The visual system uses a dark Goa-inspired palette:

``` text
Primary Green: #03502E
Dark Green:    #023D23
Accent Yellow: #FFE600
```

The interface is intentionally event-focused rather than looking like a
generic AI dashboard.

------------------------------------------------------------------------

## 🚀 Future Improvements

-   Save and restore generated identities
-   More event-specific identity formats
-   Additional frame and builder-class variations
-   Better social sharing previews
-   QR-based identity/profile pages
-   Optional public builder directory
-   Analytics for identity creation and sharing
-   Additional export formats

------------------------------------------------------------------------

## 🤝 Built for the Community

Built for **Hacker House Goa 2026** around a simple idea:

> **Builders should have an identity that feels as memorable as what
> they build.**

When sharing your generated identity:

**#FrameInGoa · #HHGoa2026 · #HackerHouseGoa**

------------------------------------------------------------------------

## 📄 License

Created for Hacker House Goa 2026.

Open source for community builders.
