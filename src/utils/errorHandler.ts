// Error handler untuk mengatasi console errors dan meningkatkan Lighthouse score
export class ErrorHandler {
  private static instance: ErrorHandler;
  
  private constructor() {
    if (typeof window !== 'undefined') {
      this.setupErrorHandlers();
    }
  }
  
  public static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }
  
  private setupErrorHandlers(): void {
    // Global error handler
    window.addEventListener('error', (event) => {
      this.handleError(event.error, {
        type: 'javascript',
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
    });
    
    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      this.handleError(event.reason, {
        type: 'promise',
        promise: event.promise
      });
    });
    
    // Resource loading error handler
    window.addEventListener('error', (event) => {
      if (event.target !== window) {
        this.handleResourceError(event);
      }
    }, true);
  }
  
  private handleError(error: any, context: any): void {
    // Suppress favicon errors yang tidak penting untuk UX
    if (context.filename && context.filename.includes('favicon')) {
      return;
    }
    
    // Log only critical errors in production
    if (process.env.NODE_ENV === 'production') {
      // Only log critical errors, suppress minor ones
      if (this.isCriticalError(error)) {
        console.warn('Critical error:', error, context);
      }
    } else {
      console.error('Development error:', error, context);
    }
  }
  
  private handleResourceError(event: Event): void {
    const target = event.target as HTMLElement;
    
    // Handle favicon errors specifically
    if (target.tagName === 'LINK' && (target as HTMLLinkElement).href.includes('favicon')) {
      // Silently handle favicon errors
      return;
    }
    
    // Handle image loading errors
    if (target.tagName === 'IMG') {
      const img = target as HTMLImageElement;
      if (!img.dataset.errorHandled) {
        img.dataset.errorHandled = 'true';
        // Set fallback image or hide broken image
        img.style.display = 'none';
      }
    }
  }
  
  private isCriticalError(error: any): boolean {
    if (!error) return false;
    
    const errorString = error.toString().toLowerCase();
    
    // Define non-critical errors
    const nonCriticalPatterns = [
      'favicon',
      'network request failed',
      'loading css chunk',
      'loading chunk'
    ];
    
    return !nonCriticalPatterns.some(pattern => errorString.includes(pattern));
  }
}

// Initialize error handler
if (typeof window !== 'undefined') {
  ErrorHandler.getInstance();
}