// Performance monitoring utilities for Novel Vercel

export const performance = {
  // Track page load performance
  trackPageLoad: (pageName: string): any => {
    if (typeof window !== 'undefined') {
      const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = window.performance.getEntriesByType('paint');
      
      const metrics = {
        page: pageName,
        timestamp: new Date().toISOString(),
        // Navigation timing
        domContentLoaded: navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart,
        loadComplete: navigation?.loadEventEnd - navigation?.loadEventStart,
        // Paint timing
        firstPaint: paint.find((p: any) => p.name === 'first-paint')?.startTime,
        firstContentfulPaint: paint.find((p: any) => p.name === 'first-contentful-paint')?.startTime,
        // Resource timing
        totalResources: window.performance.getEntriesByType('resource').length,
        // Memory usage (if available)
        memory: (window.performance as any).memory ? {
          used: (window.performance as any).memory.usedJSHeapSize,
          total: (window.performance as any).memory.totalJSHeapSize,
          limit: (window.performance as any).memory.jsHeapSizeLimit
        } : null
      };

      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Performance Metrics:', metrics);
      }

      return metrics;
    }
  },

  // Track component render performance
  trackComponentRender: (componentName: string, renderTime: number) => {
    if (typeof window !== 'undefined') {
      const metric = {
        component: componentName,
        renderTime,
        timestamp: new Date().toISOString()
      };

      if (process.env.NODE_ENV === 'development') {
        console.log('Component Render:', metric);
      }

      return metric;
    }
  },

  // Track image load performance
  trackImageLoad: (imageSrc: string, loadTime: number) => {
    if (typeof window !== 'undefined') {
      const metric = {
        image: imageSrc,
        loadTime,
        timestamp: new Date().toISOString()
      };

      if (process.env.NODE_ENV === 'development') {
        console.log('Image Load:', metric);
      }

      return metric;
    }
  },

  // Track API call performance
  trackApiCall: (endpoint: string, duration: number, status: number) => {
    if (typeof window !== 'undefined') {
      const metric = {
        endpoint,
        duration,
        status,
        timestamp: new Date().toISOString()
      };

      if (process.env.NODE_ENV === 'development') {
        console.log('API Call:', metric);
      }

      return metric;
    }
  },

  // Get current performance score
  getPerformanceScore: (): number => {
    if (typeof window !== 'undefined') {
      const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = window.performance.getEntriesByType('paint');
      
      const fcp = paint.find((p: any) => p.name === 'first-contentful-paint')?.startTime || 0;
      const lcp = paint.find((p: any) => p.name === 'largest-contentful-paint')?.startTime || 0;
      
      // Simple scoring algorithm
      let score = 100;
      
      if (fcp > 2000) score -= 20;
      if (fcp > 4000) score -= 30;
      
      if (lcp > 4000) score -= 20;
      if (lcp > 6000) score -= 30;
      
      return Math.max(0, score);
    }
    return 0;
  }
}; 