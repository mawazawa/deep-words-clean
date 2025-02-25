'use client';

import { useState, useCallback } from 'react';
import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import { SWR_CONFIG } from '@/lib/swr-config';
import { ApiResponse } from '@/lib/api/types/api-types';

/**
 * Type for the fetcherFn to ensure it returns a Promise with ApiResponse<T>
 */
type ApiFetcherFn<T> = (...args: any[]) => Promise<ApiResponse<T>>;

/**
 * Type for direct data updates
 */
interface MutateOptions<T> {
  data?: T;
  error?: Error;
  revalidate?: boolean;
}

/**
 * Custom hook for API calls using SWR
 * Provides consistent error handling, loading states, and caching
 */
export function useApi<T>(
  key: string | null,
  fetcherFn: ApiFetcherFn<T>,
  config?: SWRConfiguration
) {
  // Track if the operation is in manual update process (e.g. during form submission)
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use SWR for data fetching with configuration
  const {
    data: apiResponse,
    error: swrError,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<ApiResponse<T>>(
    key,
    fetcherFn,
    {
      ...SWR_CONFIG, // Global defaults
      ...config,     // Component-specific overrides
    }
  );

  // Extract API data and errors
  const data = apiResponse?.data;
  const error = swrError || apiResponse?.error;

  // Create a clean isLoading state that includes both SWR loading and manual submitting
  const isApiLoading = isLoading || isSubmitting;

  // Helper for manual mutations with loading state
  const updateData = useCallback(
    async (fn: () => Promise<ApiResponse<T>>, options?: MutateOptions<T>) => {
      try {
        setIsSubmitting(true);

        // If optimistic update data provided, update immediately
        if (options?.data || options?.error) {
          await mutate({
            data: options.data,
            error: options.error,
            status: options.error ? 400 : 200,
            success: !options.error,
          } as ApiResponse<T>, { revalidate: false });
        }

        // Call the update function
        const result = await fn();

        // Update the cache with the result
        await mutate(result, { revalidate: options?.revalidate ?? false });

        return result;
      } catch (err) {
        // Create an error response
        const errorResponse: ApiResponse<T> = {
          data: undefined,
          error: {
            code: 'UNHANDLED_ERROR',
            message: err instanceof Error ? err.message : String(err),
          },
          status: 500,
          success: false,
        };

        // Update the cache with the error
        await mutate(errorResponse, { revalidate: false });

        return errorResponse;
      } finally {
        setIsSubmitting(false);
      }
    },
    [mutate]
  );

  // Create a function to reset the cache and force a fresh fetch
  const refresh = useCallback(() => {
    return mutate(undefined, { revalidate: true });
  }, [mutate]);

  return {
    data,
    error,
    apiResponse,
    isLoading: isApiLoading,
    isValidating,
    isSubmitting,
    mutate,
    updateData,
    refresh,
  };
}

/**
 * Specialized hook for image generation
 */
export function useImageGeneration(
  word: string | null,
  config?: SWRConfiguration
) {
  const [generateImage, setGenerateImage] = useState<boolean>(false);

  // Only fetch if explicitly triggered
  const key = generateImage && word ? `image-gen-${word}` : null;

  const api = useApi(
    key,
    async () => {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: word }),
      });

      const data = await response.json();
      return {
        data,
        status: response.status,
        success: response.ok,
        error: !response.ok ? { code: 'API_ERROR', message: data.message || 'Failed to generate image' } : undefined,
      };
    },
    config
  );

  const generate = useCallback(() => {
    setGenerateImage(true);
  }, []);

  return {
    ...api,
    generate,
  };
}