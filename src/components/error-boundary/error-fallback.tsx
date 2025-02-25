import { FallbackProps } from 'react-error-boundary';
import { Button } from '@/components/ui/button';

interface ErrorFallbackProps extends FallbackProps {
  title?: string;
  subtitle?: string;
  showDetails?: boolean;
  className?: string;
}

/**
 * Error Fallback Component
 *
 * A visually polished fallback component shown when an error is caught by an ErrorBoundary
 * Maintains the app's glassmorphic design language while providing helpful error information
 */
export function ErrorFallback({
  error,
  resetErrorBoundary,
  title = 'Something went wrong',
  subtitle = 'We encountered an unexpected error',
  showDetails = process.env.NODE_ENV === 'development',
  className = '',
}: ErrorFallbackProps) {
  // Auto-log errors to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error caught by ErrorBoundary:', error);
  }

  return (
    <div className={`glass-effect p-6 rounded-xl overflow-hidden ${className}`}>
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Error icon */}
        <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path d="M12 7v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 17v.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Error title and message */}
        <div>
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        </div>

        {/* Show error details in dev mode */}
        {showDetails && (
          <div className="w-full bg-muted/40 dark:bg-muted/20 rounded-lg p-3 mt-2 overflow-auto text-left">
            <p className="text-xs font-mono break-all whitespace-pre-wrap">
              {error.name}: {error.message}
              {error.stack && (
                <>
                  <br />
                  <br />
                  {error.stack}
                </>
              )}
            </p>
          </div>
        )}

        {/* Retry button */}
        <div className="mt-4">
          <Button onClick={resetErrorBoundary} variant="default">
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}