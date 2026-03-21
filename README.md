<div align="center">

  <h1>🌍 Travel Website</h1>
  <p>A modern travel booking and discovery platform built with Next.js, TypeScript, and Tailwind CSS</p>

  <div>
    <img src="https://img.shields.io/badge/-Typescript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
  </div>

</div>

## 🚀 Features

### Core Pages
- **Home** - Landing page with hero section, featured destinations, and travel guides
- **Tours** - Browse and explore available tours with filtering options
- **Listing Details** - Detailed view of accommodations and experiences with image galleries
- **About** - Information about the platform and team
- **Contact** - Contact page with form and information

### UI Components
- Responsive navigation with mobile menu support
- Hero sections with stunning imagery
- Property/stay cards with ratings, pricing, and booking options
- Gallery sliders for showcasing images
- Date picker with calendar functionality
- Feature sections highlighting key benefits
- Footer with links and social media

### Technical Features
- TypeScript for type safety
- Tailwind CSS for styling
- Radix UI primitives for accessible components
- Shadcn/ui component library
- React hooks for state management
- Responsive design for all screen sizes

## ⚙️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Shadcn/ui, Radix UI
- **Icons**: Lucide React

## 📁 Project Structure

```
├── app/                    # Next.js app router pages
│   ├── about/             # About page
│   ├── contact/          # Contact page
│   ├── listing/[slug]/   # Listing detail pages
│   └── tours/            # Tours listing page
├── components/           # React components
│   ├── ui/              # Shadcn/ui components
│   └── *.tsx            # Custom components
├── public/              # Static assets
├── data/                # JSON data and types
└── lib/                 # Utility functions
```

## 🏃 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/MadMax-5000/travel-website.git
cd travel-website

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the project.

### Build for Production

```bash
npm run build
npm start
```

## 📝 License

This project is open source and available under the MIT License.

---

Built with ❤️ for travelers everywhere
