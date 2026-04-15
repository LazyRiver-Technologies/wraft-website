# Wraft - PRD (Product Requirements Document)

## Original Problem Statement
Build a premium landing page for Wraft — an AI chatbot SaaS that provides WhatsApp AI agents for local businesses. The product uses Gemini 2.5 Flash to create RAG agents that answer from uploaded business documents in multiple Indian languages (Kannada, Hindi, Tamil, etc.). The landing page needs to immediately convey what Wraft does, show it's the most affordable option, and include animated product demos, competitor comparison, and pricing.

## User Personas
- **Business Owner (Clinic/Restaurant/School)**: Non-technical, wants to automate WhatsApp customer queries in local languages
- **Website Visitor**: Evaluating Wraft vs competitors, needs to see value proposition quickly

## Core Requirements
- Hero section with animated product flow demo (Upload → Train → Chat)
- Multi-competitor comparison (Chatbase, WATI, AiSensy, Interakt)
- Pricing: Free (₹0/50 msgs), Standard (₹999/2000 msgs), Pro (₹1899/8000 msgs), Business (₹4999/40000 msgs)
- Sign In/Up → Dashboard
- WhatsApp green (#25D366) accent
- Multilingual showcase (10+ Indian languages)

## What's Been Implemented (Dec 2025)
- **Navbar**: Sticky glass-morphism, logo, nav links, Sign In/Up CTAs → /dashboard
- **Hero**: Split layout with animated product flow demo (3 tabs: Upload/Train/Chat), stats bar, compelling copy
- **Social Proof Bar**: Key metrics (Free Setup, 24/7, 10min, ₹0.50, 10+ languages)
- **Language Marquee**: Scrolling Indian language names
- **Features Bento Grid**: 7 feature cards with visual elements (WhatsApp green accent card, language tags)
- **How It Works**: 4 interactive clickable steps with live demos on right side
- **Competitor Comparison**: 5-way table (Wraft vs Chatbase vs WATI vs AiSensy vs Interakt) with highlight banner
- **Pricing**: 4-tier cards with "Most Popular" badge on Standard
- **Testimonials**: 3 cards with images and star ratings
- **CTA Section**: Dark background with CTAs
- **Footer**: Dark footer with link columns, "Made in India", large watermark
- **Dashboard**: Placeholder with stats cards and "Create Agent" button

## Tech Stack
- Frontend: React + Tailwind CSS + framer-motion + react-fast-marquee + shadcn/ui
- Backend: FastAPI + MongoDB (minimal, ready for expansion)
- Fonts: Bricolage Grotesque (headings) + Manrope (body)

## Prioritized Backlog
### P0 (Next)
- Auth system (Sign up/Sign in with JWT or Google OAuth)
- Dashboard: Agent creation flow
- Document upload functionality
- WhatsApp integration setup

### P1
- Analytics dashboard for business owners
- Billing/Stripe integration for pricing plans
- Admin panel

### P2
- Blog/content pages
- Custom domain support
- White-label options
