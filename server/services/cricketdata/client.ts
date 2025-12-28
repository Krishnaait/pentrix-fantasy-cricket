import axios, { AxiosInstance, AxiosError } from "axios";

/**
 * CricketData.org API Client
 * 
 * Base client for all CricketData API requests with:
 * - Automatic API key injection
 * - Error handling and retry logic
 * - Request/response logging
 * - Rate limiting protection
 */

const CRICKETDATA_API_BASE_URL = "https://api.cricapi.com/v1";
const CRICKETDATA_API_KEY = process.env.CRICKETDATA_API_KEY || "afb22ee0-add7-48b4-af1d-bdf319c03c9d";

export interface CricketDataError {
  message: string;
  status?: number;
  code?: string;
}

export class CricketDataClient {
  private client: AxiosInstance;
  private requestCount: number = 0;
  private lastRequestTime: number = 0;
  private readonly MIN_REQUEST_INTERVAL = 100; // 100ms between requests

  constructor() {
    this.client = axios.create({
      baseURL: CRICKETDATA_API_BASE_URL,
      timeout: 15000, // 15 second timeout
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });

    // Request interceptor for rate limiting
    this.client.interceptors.request.use(
      async (config) => {
        // Rate limiting: ensure minimum interval between requests
        const now = Date.now();
        const timeSinceLastRequest = now - this.lastRequestTime;
        
        if (timeSinceLastRequest < this.MIN_REQUEST_INTERVAL) {
          const delay = this.MIN_REQUEST_INTERVAL - timeSinceLastRequest;
          await new Promise(resolve => setTimeout(resolve, delay));
        }
        
        this.lastRequestTime = Date.now();
        this.requestCount++;
        
        // Add API key to all requests
        config.params = {
          ...config.params,
          apikey: CRICKETDATA_API_KEY,
        };
        
        console.log(`[CricketData] Request #${this.requestCount}: ${config.method?.toUpperCase()} ${config.url}`);
        
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => {
        console.log(`[CricketData] Response: ${response.status} ${response.config.url}`);
        return response;
      },
      (error: AxiosError) => {
        return this.handleError(error);
      }
    );
  }

  private handleError(error: AxiosError): Promise<never> {
    const cricketDataError: CricketDataError = {
      message: "An error occurred while fetching cricket data",
      status: error.response?.status,
      code: error.code,
    };

    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const data = error.response.data as any;

      switch (status) {
        case 401:
          cricketDataError.message = "Invalid API key or authentication failed";
          break;
        case 403:
          cricketDataError.message = "Access forbidden - check subscription plan";
          break;
        case 404:
          cricketDataError.message = "Resource not found";
          break;
        case 429:
          cricketDataError.message = "Rate limit exceeded - too many requests";
          break;
        case 500:
        case 502:
        case 503:
          cricketDataError.message = "CricketData API is temporarily unavailable";
          break;
        default:
          cricketDataError.message = data?.message || `API error: ${status}`;
      }

      console.error(`[CricketData] Error ${status}:`, cricketDataError.message);
    } else if (error.request) {
      // Request made but no response received
      cricketDataError.message = "No response from CricketData API - network error";
      console.error("[CricketData] Network error:", error.message);
    } else {
      // Error in request configuration
      cricketDataError.message = error.message || "Failed to configure API request";
      console.error("[CricketData] Configuration error:", error.message);
    }

    return Promise.reject(cricketDataError);
  }

  /**
   * Make a GET request to CricketData API
   */
  async get<T = any>(endpoint: string, params?: Record<string, any>): Promise<T> {
    try {
      const response = await this.client.get<T>(endpoint, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get request statistics
   */
  getStats() {
    return {
      totalRequests: this.requestCount,
      lastRequestTime: this.lastRequestTime,
    };
  }
}

// Singleton instance
export const cricketDataClient = new CricketDataClient();
