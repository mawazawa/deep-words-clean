/**
 * Base API Service
 * Provides core functionality for all API services with consistent error handling and logging
 */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiError, ApiServiceConfig } from './types/api-types';

export class ApiService {
  protected client: AxiosInstance;
  protected serviceName: string;
  protected config: ApiServiceConfig;

  constructor(serviceName: string, config: ApiServiceConfig) {
    this.serviceName = serviceName;
    this.config = config;

    // Create axios instance with service configuration
    this.client = axios.create({
      baseURL: config.baseUrl,
      timeout: config.defaultTimeout || 15000,
      headers: {
        'Content-Type': 'application/json',
        ...(config.apiKey && { Authorization: `Bearer ${config.apiKey}` }),
        ...config.defaultHeaders,
      },
    });

    // Add request interceptor for logging
    this.client.interceptors.request.use((request) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(`🔷 [${this.serviceName}] API Request:`, {
          url: request.url,
          method: request.method,
          // Omit sensitive headers like Authorization
          headers: { ...request.headers, Authorization: '[REDACTED]' },
          // Omit sensitive data
          data: this.sanitizeLogData(request.data),
        });
      }
      return request;
    });

    // Add response interceptor for logging
    this.client.interceptors.response.use(
      (response) => {
        if (process.env.NODE_ENV === 'development') {
          console.log(`✅ [${this.serviceName}] API Response:`, {
            status: response.status,
            statusText: response.statusText,
            data: this.sanitizeLogData(response.data),
          });
        }
        return response;
      },
      (error: AxiosError) => {
        if (process.env.NODE_ENV === 'development') {
          console.error(`❌ [${this.serviceName}] API Error:`, {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data ? this.sanitizeLogData(error.response.data) : undefined,
          });
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Sanitize sensitive data before logging
   */
  private sanitizeLogData(data: any): any {
    if (!data) return data;

    // Create a copy to avoid modifying the original
    const sanitized = { ...data };

    // Redact common sensitive fields
    const sensitiveFields = ['apiKey', 'password', 'token', 'secret', 'Authorization'];
    sensitiveFields.forEach((field) => {
      if (sanitized[field]) {
        sanitized[field] = '[REDACTED]';
      }
    });

    return sanitized;
  }

  /**
   * Standardized error handler
   */
  protected handleError(error: unknown): ApiError {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<any>;

      return {
        code: axiosError.code || `${this.serviceName}_ERROR`,
        message: axiosError.response?.data?.error || axiosError.message || 'Unknown API error',
        details: axiosError.response?.data,
      };
    }

    if (error instanceof Error) {
      return {
        code: `${this.serviceName}_ERROR`,
        message: error.message,
        details: error.stack,
      };
    }

    return {
      code: `${this.serviceName}_UNKNOWN_ERROR`,
      message: 'An unexpected error occurred',
      details: String(error),
    };
  }

  /**
   * Perform GET request with standardized response format
   */
  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.client.get(url, config);
      return {
        data: response.data,
        status: response.status,
        success: true,
      };
    } catch (error) {
      const apiError = this.handleError(error);
      return {
        error: apiError,
        status: axios.isAxiosError(error) ? error.response?.status || 500 : 500,
        success: false,
      };
    }
  }

  /**
   * Perform POST request with standardized response format
   */
  protected async post<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.client.post(url, data, config);
      return {
        data: response.data,
        status: response.status,
        success: true,
      };
    } catch (error) {
      const apiError = this.handleError(error);
      return {
        error: apiError,
        status: axios.isAxiosError(error) ? error.response?.status || 500 : 500,
        success: false,
      };
    }
  }
}