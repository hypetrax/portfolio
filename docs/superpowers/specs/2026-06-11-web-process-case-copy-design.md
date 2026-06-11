# Web Process Case Copy Design

## Goal

Translate the technical website-building process into concrete, personal actions on the `/web` portfolio page, using the Badminton Hardenberg workflow as the clearest example.

## Content Approach

Use a personal-reflective tone with case-based proof. The page should show that the same method is used for each website, while each project starts from a different situation.

## Page Design

Add a process block inside each existing case study, placed after the challenge and solution text and before the result list.

Each block is titled `Van uitgangspunt naar realisatie` and contains short steps:

- Startpunt: what existed before the project.
- Structuur: how the content and routes were clarified.
- Ontwerp en bouw: how the interface and implementation were created.
- Validatie: what was checked before or around launch.

## Case Notes

Badminton Hardenberg uses the workflow from `badminton.md`: research the audience and content structure, define the sitemap and style, build modular sections with SEO/performance in mind, and validate mobile usability, speed, and findability.

Landhuis did not have an old website. The starting point was Google visibility and reviews. The new site should be described as a website built from that public trust signal and local service positioning.

Fluitman Auto's keeps its current story: an existing slow, hard-to-maintain, weak mobile website rebuilt into a faster React site with clearer occasion presentation.

## Scope

Modify only the `/web` page source and shared styling needed for the new process block. Do not edit generated `dist/` assets or archived snapshots.

## Verification

Run `npm run lint` and `npm run build`. For this text/layout change, browser verification is useful if the commands pass and a dev server can be started.
