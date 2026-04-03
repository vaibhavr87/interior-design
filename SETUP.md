# Interior Design — Nano Banana Setup

## Installation

1. Install the Gemini CLI:
   ```
   npm install -g @google/gemini-cli
   ```

2. Install the Nano Banana extension:
   ```
   gemini extensions install https://github.com/gemini-cli-extensions/nanobanana
   ```

3. Set your API key (get one at https://aistudio.google.com):
   ```
   cp .env.example .env
   # Edit .env and add your NANOBANANA_API_KEY
   export NANOBANANA_API_KEY=your_key_here
   ```

   Or run the setup script:
   ```
   npm run setup
   ```

## Usage

Launch the Gemini CLI and use the nano banana commands:

| Command       | Description                                      |
|---------------|--------------------------------------------------|
| `/generate`   | Generate room visualizations from text prompts   |
| `/edit`       | Modify an existing room photo with instructions  |
| `/pattern`    | Create seamless material/texture swatches        |
| `/diagram`    | Generate floor plans and furniture layouts       |
| `/story`      | Create multi-panel mood boards                   |
| `/restore`    | Enhance or repair old reference photos           |
| `/nanobanana` | Open-ended natural language image requests       |

All commands support `--preview` to display results immediately.

## Prompt Library

Ready-to-use prompts are in the `prompts/` directory:

- `prompts/living-room.md` — Room visualization examples
- `prompts/materials-and-textures.md` — Seamless material swatches
- `prompts/floor-plans.md` — Floor plans and mood boards
