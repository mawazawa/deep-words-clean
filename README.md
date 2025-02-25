# Deep Wordsmith

![Deep Wordsmith](public/words-logo.svg)

A premium neural-enhanced linguistic exploration platform that transcends conventional reference tools by integrating multi-modal AI to create a seamless bridge between language conception and expression.

## Vision

Deep Wordsmith transforms language exploration from a utilitarian reference task to an inspirational creative process. It offers professionals contextually-aware semantic landscapes visualized through sophisticated glassmorphic design.

## Features

- **AI-Powered Language Understanding**: Contextual word exploration using Perplexity and Anthropic Claude ✅
- **Creative Word Suggestions**: Divergent thinking powered by Grok AI ✅
- **Visual Mnemonics**: Enhance word retention with AI-generated visual representations via Replicate Flux ✅
- **Semantic Clustering**: Visualize relationships between words and concepts (coming soon)
- **Glassmorphic UI**: VisionOS-inspired interface for a premium user experience ✅
- **Dark/Light Mode**: Automatic and manual theme switching ✅
- **Robust Error Handling**: Comprehensive error boundaries and fallbacks ✅
- **Optimized Performance**: Strategic caching with SWR ✅

## Tech Stack

- **Frontend**: Next.js 15 with App Router, React 19
- **Styling**: Tailwind CSS with custom glassmorphic design system
- **UI Components**: Custom components with Radix UI primitives
- **State Management**: SWR for data fetching and caching
- **Type Safety**: TypeScript throughout the codebase
- **AI Integration**:
  - Replicate API with Flux model for image generation
  - Perplexity API for contextual language understanding
  - Grok API for creative word suggestions
  - Anthropic Claude for advanced linguistic analysis

## Architecture

The project follows a modular architecture with:

1. **API Service Layer**: Standardized services for each AI provider
2. **Caching Strategy**: Optimized data fetching with SWR
3. **Error Handling**: Comprehensive boundaries and fallbacks
4. **UI Components**: Reusable, accessible components

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/deep-wordsmith.git
   cd deep-wordsmith
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```
   Edit `.env.local` to add your API tokens.

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### GitHub Setup

We've included a helper script to set up your GitHub repository:

```bash
./scripts/setup-github.sh
```

This script will:
- Initialize a Git repository if needed
- Create a `.gitignore` file
- Create a GitHub repository
- Push your code to GitHub

### Vercel Deployment

To deploy to Vercel:

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Log in to Vercel:
   ```bash
   vercel login
   ```

3. Deploy your project:
   ```bash
   vercel
   ```

4. For production deployment:
   ```bash
   vercel --prod
   ```

Make sure to set up your environment variables in the Vercel dashboard.

## API Integration

### Replicate for Image Generation

The application uses Replicate's Flux model for generating visual mnemonics with:

- Comprehensive error handling with fallback images
- Automatic prompt enhancement for better results
- Progressive image loading
- Client-side caching for performance

### Perplexity for Contextual Understanding

Provides semantic understanding with:

- Contextual word search
- Related terms exploration
- Usage examples

### Grok for Creative Suggestions

Offers creative word suggestions with:

- Synonyms and antonyms
- Related concepts
- Creative alternatives

### Anthropic Claude for Linguistic Analysis

Provides deep linguistic analysis with:

- Etymology and historical context
- Semantic analysis
- Common collocations and usage patterns
- Related concepts and semantic associations

## Environment Variables

The following environment variables are required:

```
# Replicate (for image generation)
REPLICATE_API_TOKEN=your_token_here
REPLICATE_FLUX_MODEL=black-forest-labs/flux-1.1-pro

# Perplexity (for contextual understanding)
PERPLEXITY_API_KEY=your_key_here
PERPLEXITY_API_URL=https://api.perplexity.ai

# Grok (for creative suggestions)
GROK_API_KEY=your_key_here
GROK_API_URL=https://api.grok.ai

# Anthropic (for linguistic analysis)
ANTHROPIC_API_KEY=your_key_here
ANTHROPIC_API_URL=https://api.anthropic.com
ANTHROPIC_MODEL=claude-3-7-sonnet
```

## Project Structure

```
deep-wordsmith/
├── public/             # Static assets
│   └── fallback/       # Fallback images
├── scripts/            # Utility scripts
├── src/                # Source code
│   ├── app/            # Next.js app router
│   │   ├── api/        # API routes
│   │   └── page.tsx    # Main application page
│   ├── components/     # React components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   └── styles/         # Global styles
├── .env.local.example  # Example environment variables
├── package.json        # Project dependencies
└── README.md           # Project documentation
```

## Roadmap to World-Class Status

1. **Core Experience Enhancements**
   - Add semantic clustering visualization
   - Implement user authentication and history
   - Create export functionality to common platforms

2. **Technical Improvements**
   - Add comprehensive caching strategy
   - Implement server-side streaming for AI responses
   - Add client-side result persistence

3. **Visual & UX Refinements**
   - Add subtle animations for transitions
   - Enhance mobile experience
   - Add keyboard shortcuts for power users

4. **Quality & Performance**
   - Set up comprehensive testing suite
   - Add telemetry for performance monitoring
   - Optimize bundle size and loading performance

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [SWR](https://swr.vercel.app/)
- [Replicate](https://replicate.com/)
- [Perplexity AI](https://www.perplexity.ai/)
- [Anthropic Claude](https://www.anthropic.com/)
