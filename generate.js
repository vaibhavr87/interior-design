#!/usr/bin/env node
/**
 * Nano Banana image generation script for interior design concepts.
 * Run: NANOBANANA_API_KEY=your_key node generate.js
 */

const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');
const path = require('path');

const apiKey = process.env.NANOBANANA_API_KEY;
if (!apiKey) {
  console.error('Error: NANOBANANA_API_KEY is not set.');
  console.error('Run: NANOBANANA_API_KEY=your_key node generate.js');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });
const OUTPUT_DIR = path.join(__dirname, 'output');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);

const concepts = [
  {
    name: 'concept1_forest_adventure',
    prompt: `Kids shared bedroom for two boys (age 5 and newborn). White walls, beige textured carpet, recessed ceiling lights, one window with white curtains. Wooden bunk bed against the main wall (5-year-old top bunk with guardrails, toddler/crib space underneath), white adjustable sit-stand desk repurposed as kids art and study desk with pegboard wall organizer above holding art supplies and small toys, large forest adventure wall mural with illustrated trees and woodland animals in navy blue and forest green on the accent wall, cozy reading nook by the window with a floor cushion and low bookshelf, warm wooden furniture tones, navy and forest green color palette. Photorealistic interior design render.`,
  },
  {
    name: 'concept2_space_explorer',
    prompt: `Kids shared bedroom for two boys (age 5 and newborn). White walls, beige textured carpet, recessed ceiling lights, one window with white curtains. White and grey metal bunk bed with integrated ladder storage drawers, white crib positioned near the window wall, white sit-stand desk as kids study and drawing table with floating rocket-shaped wall shelves above, dark navy accent wall with illustrated planets, moons and star constellation decals, glow-in-the-dark stars on ceiling, soft warm yellow star-shaped night lights, grey and yellow color accents throughout. Photorealistic interior design render.`,
  },
  {
    name: 'concept3_scandinavian',
    prompt: `Kids shared bedroom for two boys (age 5 and newborn). White walls, beige textured carpet, recessed ceiling lights, one window with white curtains. Natural pine bunk bed with stair-drawers for built-in storage (older child on top bunk), white crib near the window, white sit-stand desk as kids study table with a low KALLAX-style shelving unit beside it for toy storage, large colorful world map wall print above the desk, pegboard with colorful hooks, primary color accents of red blue and yellow on a clean white background. Scandinavian minimalist style. Photorealistic interior design render.`,
  },
];

async function generateImage(concept) {
  console.log(`\nGenerating: ${concept.name}...`);
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-preview-image-generation',
      contents: [{ role: 'user', parts: [{ text: concept.prompt }] }],
      config: { responseModalities: ['TEXT', 'IMAGE'] },
    });

    for (const part of (response.candidates?.[0]?.content?.parts ?? [])) {
      if (part.inlineData?.data) {
        const filePath = path.join(OUTPUT_DIR, `${concept.name}.png`);
        fs.writeFileSync(filePath, Buffer.from(part.inlineData.data, 'base64'));
        console.log(`  Saved: ${filePath}`);
        return;
      }
    }
    console.log(`  No image returned for ${concept.name}.`);
  } catch (err) {
    console.error(`  Failed: ${err.message}`);
  }
}

(async () => {
  console.log('Generating interior design concepts...');
  for (const concept of concepts) {
    await generateImage(concept);
  }
  console.log('\nDone. Check the output/ directory.');
})();
