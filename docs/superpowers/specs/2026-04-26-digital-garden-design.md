# Digital Garden Portfolio Design

**Date:** 2026-04-26
**Topic:** Homepage Redesign - Personalizing the Portfolio

## Goal
Transform the portfolio homepage from a formal, case-study structure (Security, Web, Labs) into a "Digital Garden"—a personal, living notebook where ongoing experiments and published knowledge are displayed together. The aesthetic remains Swiss Brutalist (Space Grotesk, #0066FF accent) but applied to a more organic content structure.

## Core Sections

### 1. The Hero: "The Greeting"
*   **Removal:** The background video and large marketing headers ("Ik regel security...").
*   **Addition:** A typography-focused, direct personal greeting.
*   **Content:** "Hi, I'm Bart. I'm an Information Security Officer, I build clean websites, and I analyze data. This is my digital garden where I share what I'm actively working on."

### 2. The Spotlight: "Currently Exploring"
*   **Structure:** A dedicated section immediately below the hero.
*   **Content Focus:** Highlights the most active/complex area—currently the Trading/Data Labs.
*   **Visuals:** A minimalist, card-based layout featuring 1-2 active lab experiments (e.g., "Turtle Soup Strategy") with a clear "Status: Active Research" tag to indicate ongoing work.

### 3. The Stream: "Recent Notes & Projects"
*   **Structure:** Replaces the three rigid silos with a unified, chronological list or grid of work.
*   **Implementation:** A single stream of items combining Security analyses (ISO 27001), Web development projects, and smaller Lab updates.
*   **Data Structure:** An array of objects in `Home.tsx` (e.g., `{ date: "Apr 2026", title: "Cyber Resilience Act Impact", category: "Security", link: "/security/cra" }`) mapped to styled list items or cards.

## Animation & Vibe
*   **Framer Motion:** Utilize existing stagger variants (`tagContainer`, `fadeUpItem`, etc. from `lib/motion.ts`) to animate the stream items into view smoothly on scroll.
*   **Aesthetic:** Maintain the "Brutalist Precision" theme (clean lines, high contrast, #0066FF accent).