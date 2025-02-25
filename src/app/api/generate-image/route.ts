import { NextResponse } from 'next/server';
import { AI_CONFIG, ImageGenerationResponse } from '@/lib/ai-config';
import Replicate from 'replicate';

/**
 * API handler for generating images using Replicate's Flux model
 * Includes comprehensive error handling and fallbacks
 */
export async function POST(request: Request) {
  try {
    // Parse request body
    const { prompt } = await request.json();

    // Validate input
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Invalid prompt. Please provide a text prompt.' },
        { status: 400 }
      );
    }

    // Log the request for debugging
    console.log(`📝 Image generation request for prompt: "${prompt}"`);

    // Check if the Replicate API token is available
    const { apiToken, fluxModel, fallback } = AI_CONFIG.replicate;

    if (!apiToken) {
      console.warn('⚠️ No Replicate API token found. Using fallback image.');
      return NextResponse.json(
        createFallbackResponse(prompt, 'No API token configured'),
        { status: 200 }
      );
    }

    // Call Replicate API
    try {
      // Initialize Replicate client
      const replicate = new Replicate({
        auth: apiToken,
      });

      // Prepare the request to Replicate
      const enhancedPrompt = enhancePrompt(prompt);

      console.log(`🤖 Sending request to Replicate for model: ${fluxModel}`);

      // Call Replicate API with Flux model
      const output = await replicate.run(
        fluxModel as `${string}/${string}` | `${string}/${string}:${string}`,
        {
          input: {
            prompt: enhancedPrompt,
            prompt_upsampling: true,
            width: 512,  // Standard size
            height: 512,
            num_inference_steps: 25,
            scheduler: "K_EULER",
            guidance_scale: 7.5,
          },
        }
      );

      // Replicate typically returns a URL or array of URLs
      // Let's handle both cases
      let imageUrl = '';
      if (Array.isArray(output)) {
        imageUrl = output[0];
      } else if (typeof output === 'string') {
        imageUrl = output;
      } else {
        throw new Error('Unexpected response format from Replicate');
      }

      // Return the generated image URL
      const imageResponse: ImageGenerationResponse = {
        url: imageUrl,
        prompt,
        model: fluxModel,
      };

      console.log('✅ Image successfully generated from Replicate');
      return NextResponse.json(imageResponse, { status: 200 });
    } catch (error) {
      // Handle errors from Replicate
      console.error('❌ Error calling Replicate API:', error);
      return NextResponse.json(
        createFallbackResponse(prompt, error instanceof Error ? error.message : String(error)),
        { status: 200 }
      );
    }
  } catch (error) {
    // Handle any other errors
    console.error('❌ Server error in image generation route:', error);
    return NextResponse.json(
      { error: 'Internal server error', fallback: true },
      { status: 500 }
    );
  }
}

/**
 * Creates a fallback response when image generation fails
 */
function createFallbackResponse(prompt: string, errorMessage: string): ImageGenerationResponse {
  const { fallback } = AI_CONFIG.replicate;

  // Select a random fallback image if available
  let fallbackUrl = fallback.placeholderUrl;
  if (fallback.enabled && fallback.localImages.length > 0) {
    const randomIndex = Math.floor(Math.random() * fallback.localImages.length);
    fallbackUrl = fallback.localImages[randomIndex];
  }

  return {
    url: fallbackUrl,
    prompt,
    error: errorMessage,
    fallback: true,
  };
}

/**
 * Enhances the user prompt for better image generation results
 */
function enhancePrompt(basePrompt: string): string {
  // Add styling and quality keywords to improve generation results
  return `${basePrompt}, high quality, detailed, 4k, professional, clear visualization, educational, minimalist style, elegant design`;
}