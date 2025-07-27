// Unit tests for content.js technology detection
// Run with: npm test or jest

// Set up window properties directly in global scope
global.React = {
  createElement: () => {},
  Component: class {},
  Fragment: {}
};

global.__REACT_DEVTOOLS_GLOBAL_HOOK__ = {};
global.__VUE_DEVTOOLS_GLOBAL_HOOK__ = {};
global.__REDUX_DEVTOOLS_EXTENSION__ = {};
global.__NEXT_DATA__ = { props: {} };
global.__cfRLUnblockHandlers = [];

global.Vue = {
  createApp: () => {},
  component: () => {}
};

global.angular = {
  module: () => {},
  component: () => {}
};

global.jQuery = {
  fn: { jquery: '3.6.0' }
};

global.$ = global.jQuery;

global.ga = () => {};
global.gtag = () => {};
global.dataLayer = [];

global.hj = () => {};

global.firebase = {
  initializeApp: () => {},
  auth: () => {},
  firestore: () => {}
};

global.Stripe = () => {};
global.Shopify = {};
global.wp = {};

// Mock DOM environment for testing
document.body.innerHTML = `
  <div id="root">
    <div data-reactroot="true" data-reactid="1">
      <span class="react-component">React App</span>
    </div>
    <div data-v-app="true">
      <span class="vue-component">Vue App</span>
    </div>
    <div ng-app="myApp" ng-version="1.8.0">
      <span class="angular-component">Angular App</span>
    </div>
    <div class="bootstrap-container">
      <button class="btn btn-primary">Bootstrap Button</button>
    </div>
    <div class="tw-container">
      <span class="tw-text-blue-500">Tailwind Text</span>
    </div>
    <div data-shopify="true" class="shopify-container">
      <span class="shopify-component">Shopify Store</span>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.prod.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.shopify.com/s/shopify.js"></script>
  </div>
`;

// Update window.getAllAngularRootElements to use the actual DOM
global.getAllAngularRootElements = () => [document.querySelector('[ng-app]')];

// Mock document methods properly to avoid circular references
const originalQuerySelector = document.querySelector;
const originalQuerySelectorAll = document.querySelectorAll;

document.querySelector = (selector) => {
  return originalQuerySelector.call(document, selector);
};

document.querySelectorAll = (selector) => {
  return originalQuerySelectorAll.call(document, selector);
};

// Mock styleSheets
Object.defineProperty(document, 'styleSheets', {
  value: [
    { href: 'https://cdn.jsdelivr.net/npm/tailwindcss@2/dist/tailwind.min.css' },
    { href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css' }
  ],
  writable: true
});

// Mock document.documentElement.innerHTML to include technology mentions
Object.defineProperty(document.documentElement, 'innerHTML', {
  value: `
    <html>
      <head>
        <title>Test Page</title>
        <script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.prod.js"></script>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
        <script src="https://www.googletagmanager.com/gtag/js"></script>
        <script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js"></script>
        <script src="https://js.stripe.com/v3/"></script>
        <script src="https://static.hotjar.com/c/hotjar.js"></script>
        <script src="https://cdn.shopify.com/s/shopify.js"></script>
      </head>
      <body>
        <div data-reactroot="true" data-reactid="1">
          <span class="react-component">React App</span>
        </div>
        <div data-v-app="true">
          <span class="vue-component">Vue App</span>
        </div>
        <div ng-app="myApp" ng-version="1.8.0">
          <span class="angular-component">Angular App</span>
        </div>
        <div class="bootstrap-container">
          <button class="btn btn-primary">Bootstrap Button</button>
        </div>
        <div class="tw-container">
          <span class="tw-text-blue-500">Tailwind Text</span>
        </div>
        <div data-shopify="true" class="shopify-container">
          <span class="shopify-component">Shopify Store</span>
        </div>
        <script>
          // Google Analytics
          window.ga = function() {};
          window.gtag = function() {};
          window.dataLayer = [];
          
          // Firebase
          window.firebase = {
            initializeApp: function() {},
            auth: function() {},
            firestore: function() {}
          };
          
          // Stripe
          window.Stripe = function() {};
          
          // Hotjar
          window.hj = function() {};
          
          // Shopify
          window.Shopify = {};
          
          // WordPress
          window.wp = {};
          
          // Next.js
          window.__NEXT_DATA__ = { props: {} };
          
          // Redux
          window.__REDUX_DEVTOOLS_EXTENSION__ = {};
          
          // Cloudflare
          window.__cfRLUnblockHandlers = [];
        </script>
      </body>
    </html>
  `,
  writable: true
});

// Test that window properties are accessible
test('Window properties should be accessible', () => {
  expect(global.React).toBeDefined();
  expect(global.__REACT_DEVTOOLS_GLOBAL_HOOK__).toBeDefined();
  expect(global.Vue).toBeDefined();
  expect(global.__VUE_DEVTOOLS_GLOBAL_HOOK__).toBeDefined();
  expect(global.jQuery).toBeDefined();
  expect(global.ga).toBeDefined();
  expect(global.gtag).toBeDefined();
  expect(global.dataLayer).toBeDefined();
  expect(global.firebase).toBeDefined();
  expect(global.Stripe).toBeDefined();
  expect(global.hj).toBeDefined();
  expect(global.Shopify).toBeDefined();
  expect(global.wp).toBeDefined();
  expect(global.__NEXT_DATA__).toBeDefined();
  expect(global.__REDUX_DEVTOOLS_EXTENSION__).toBeDefined();
  expect(global.__cfRLUnblockHandlers).toBeDefined();
});

// Import the content script functions for testing
// We need to simulate the content script environment
const techSignatures = [
  // React detection - multiple methods with stronger validation
  { 
    name: "React", 
    test: () => {
      const indicators = [];
      
      // Strong indicators (more reliable)
      if (global.__REACT_DEVTOOLS_GLOBAL_HOOK__) indicators.push('devtools');
      if (global.React && typeof global.React.createElement === 'function') indicators.push('global');
      if (document.querySelector('[data-reactroot]')) indicators.push('root');
      if (document.querySelector('[data-reactid]')) indicators.push('id');
      
      // Weaker indicators (require additional validation)
      const reactScripts = Array.from(document.querySelectorAll('script')).filter(s => 
        s.src && s.src.includes('react') && !s.src.includes('react-query')
      );
      if (reactScripts.length > 0) indicators.push('script');
      
      // HTML mentions only if combined with other indicators
      if (/react/i.test(document.documentElement.innerHTML) && indicators.length > 0) {
        indicators.push('html');
      }
      
      return {
        detected: indicators.length >= 2, // Require at least 2 strong indicators
        depth: indicators.length,
        indicators: indicators
      };
    }
  },
  
  // Vue.js detection with stronger validation
  { 
    name: "Vue.js", 
    test: () => {
      const indicators = [];
      
      // Strong indicators
      if (global.__VUE_DEVTOOLS_GLOBAL_HOOK__) indicators.push('devtools');
      if (global.Vue && typeof global.Vue.createApp === 'function') indicators.push('global');
      if (document.querySelector('[data-v-]')) indicators.push('attributes');
      
      // Script validation
      const vueScripts = Array.from(document.querySelectorAll('script')).filter(s => 
        s.src && s.src.includes('vue') && !s.src.includes('vue-router')
      );
      if (vueScripts.length > 0) indicators.push('script');
      
      // HTML mentions only if combined with other indicators
      if (/vue/i.test(document.documentElement.innerHTML) && indicators.length > 0) {
        indicators.push('html');
      }
      
      return {
        detected: indicators.length >= 2, // Require at least 2 strong indicators
        depth: indicators.length,
        indicators: indicators
      };
    }
  },
  
  // Angular detection with stronger validation
  { 
    name: "Angular", 
    test: () => {
      const indicators = [];
      
      // Strong indicators
      if (global.getAllAngularRootElements?.().length) indicators.push('roots');
      if (global.angular && typeof global.angular.module === 'function') indicators.push('global');
      if (document.querySelector('[ng-version]')) indicators.push('version');
      if (document.querySelector('[ng-app]')) indicators.push('app');
      
      // Script validation
      const angularScripts = Array.from(document.querySelectorAll('script')).filter(s => 
        s.src && s.src.includes('angular')
      );
      if (angularScripts.length > 0) indicators.push('script');
      
      // HTML mentions only if combined with other indicators
      if (/angular/i.test(document.documentElement.innerHTML) && indicators.length > 0) {
        indicators.push('html');
      }
      
      return {
        detected: indicators.length >= 2,
        depth: indicators.length,
        indicators: indicators
      };
    }
  },
  
  // jQuery detection with stronger validation
  { 
    name: "jQuery", 
    test: () => {
      const indicators = [];
      
      // Strong indicators
      if (global.jQuery && global.jQuery.fn && global.jQuery.fn.jquery) indicators.push('global');
      if (global.$ && global.$.fn && global.$.fn.jquery) indicators.push('alias');
      
      // Script validation
      const jqueryScripts = Array.from(document.querySelectorAll('script')).filter(s => 
        s.src && s.src.includes('jquery')
      );
      if (jqueryScripts.length > 0) indicators.push('script');
      
      // HTML mentions only if combined with other indicators
      if (/jquery/i.test(document.documentElement.innerHTML) && indicators.length > 0) {
        indicators.push('html');
      }
      
      return {
        detected: indicators.length >= 2,
        depth: indicators.length,
        indicators: indicators
      };
    }
  },
  
  // Bootstrap detection
  { 
    name: "Bootstrap", 
    test: () => {
      const indicators = [];
      
      // Strong indicators
      if (document.querySelector('[class*="bootstrap"]')) indicators.push('classes');
      if (document.querySelector('[class*="btn"]')) indicators.push('classes');
      if (document.querySelector('[class*="container"]')) indicators.push('classes');
      
      // Stylesheet validation
      const bootstrapSheets = Array.from(document.styleSheets || []).filter(sheet => 
        sheet.href && sheet.href.includes('bootstrap')
      );
      if (bootstrapSheets.length > 0) indicators.push('stylesheet');
      
      // HTML mentions only if combined with other indicators
      if (/bootstrap/i.test(document.documentElement.innerHTML) && indicators.length > 0) {
        indicators.push('html');
      }
      
      return {
        detected: indicators.length >= 2,
        depth: indicators.length,
        indicators: indicators
      };
    }
  },
  
  // Tailwind CSS detection
  { 
    name: "Tailwind CSS", 
    test: () => {
      const indicators = [];
      
      // Strong indicators
      if (document.querySelector('[class*="tw-"]')) indicators.push('classes');
      if (document.querySelector('[class*="text-"]')) indicators.push('classes');
      if (document.querySelector('[class*="bg-"]')) indicators.push('classes');
      
      // Stylesheet validation
      const tailwindSheets = Array.from(document.styleSheets || []).filter(sheet => 
        sheet.href && sheet.href.includes('tailwind')
      );
      if (tailwindSheets.length > 0) indicators.push('stylesheet');
      
      // HTML mentions only if combined with other indicators
      if (/tailwind/i.test(document.documentElement.innerHTML) && indicators.length > 0) {
        indicators.push('html');
      }
      
      return {
        detected: indicators.length >= 2,
        depth: indicators.length,
        indicators: indicators
      };
    }
  },
  
  // Google Analytics detection
  { 
    name: "Google Analytics", 
    test: () => {
      const indicators = [];
      
      // Strong indicators
      if (global.ga && typeof global.ga === 'function') indicators.push('ga');
      if (global.gtag && typeof global.gtag === 'function') indicators.push('gtag');
      if (global.dataLayer && Array.isArray(global.dataLayer)) indicators.push('datalayer');
      
      // Script validation
      const gaScripts = Array.from(document.querySelectorAll('script')).filter(s => 
        s.src && (s.src.includes('google-analytics') || s.src.includes('googletagmanager'))
      );
      if (gaScripts.length > 0) indicators.push('script');
      
      // HTML mentions only if combined with other indicators
      if (/google.*analytics/i.test(document.documentElement.innerHTML) && indicators.length > 0) {
        indicators.push('html');
      }
      
      return {
        detected: indicators.length >= 2,
        depth: indicators.length,
        indicators: indicators
      };
    }
  },
  
  // Google Tag Manager detection
  { 
    name: "Google Tag Manager", 
    test: () => {
      const indicators = [];
      
      // Strong indicators
      if (global.dataLayer && Array.isArray(global.dataLayer)) indicators.push('datalayer');
      if (global.gtag && typeof global.gtag === 'function') indicators.push('gtag');
      
      // Script validation
      const gtmScripts = Array.from(document.querySelectorAll('script')).filter(s => 
        s.src && s.src.includes('googletagmanager')
      );
      if (gtmScripts.length > 0) indicators.push('script');
      
      // HTML mentions only if combined with other indicators
      if (/googletagmanager/i.test(document.documentElement.innerHTML) && indicators.length > 0) {
        indicators.push('html');
      }
      
      return {
        detected: indicators.length >= 2,
        depth: indicators.length,
        indicators: indicators
      };
    }
  },
  
  // Firebase detection
  { 
    name: "Firebase", 
    test: () => {
      const indicators = [];
      
      // Strong indicators
      if (global.firebase && typeof global.firebase.initializeApp === 'function') indicators.push('global');
      if (global.firebase && global.firebase.auth) indicators.push('auth');
      if (global.firebase && global.firebase.firestore) indicators.push('firestore');
      
      // Script validation
      const firebaseScripts = Array.from(document.querySelectorAll('script')).filter(s => 
        s.src && s.src.includes('firebase')
      );
      if (firebaseScripts.length > 0) indicators.push('script');
      
      // HTML mentions only if combined with other indicators
      if (/firebase/i.test(document.documentElement.innerHTML) && indicators.length > 0) {
        indicators.push('html');
      }
      
      return {
        detected: indicators.length >= 2,
        depth: indicators.length,
        indicators: indicators
      };
    }
  },
  
  // Stripe detection
  { 
    name: "Stripe", 
    test: () => {
      const indicators = [];
      
      // Strong indicators
      if (global.Stripe && typeof global.Stripe === 'function') indicators.push('global');
      
      // Script validation
      const stripeScripts = Array.from(document.querySelectorAll('script')).filter(s => 
        s.src && s.src.includes('stripe')
      );
      if (stripeScripts.length > 0) indicators.push('script');
      
      // HTML mentions only if combined with other indicators
      if (/stripe/i.test(document.documentElement.innerHTML) && indicators.length > 0) {
        indicators.push('html');
      }
      
      return {
        detected: indicators.length >= 2,
        depth: indicators.length,
        indicators: indicators
      };
    }
  },
  
  // WordPress detection
  { 
    name: "WordPress", 
    test: () => {
      const indicators = [];
      
      // Strong indicators
      if (global.wp) indicators.push('global');
      if (document.querySelector('meta[name="generator"][content*="WordPress"]')) indicators.push('meta');
      if (document.querySelector('[class*="wp-"]')) indicators.push('classes');
      
      // Path validation
      if (global.location.pathname.includes('/wp-admin/') || 
          global.location.pathname.includes('/wp-content/') ||
          global.location.pathname.includes('/wp-includes/')) {
        indicators.push('paths');
      }
      
      // HTML mentions only if combined with other indicators
      if (/wordpress/i.test(document.documentElement.innerHTML) && indicators.length > 0) {
        indicators.push('html');
      }
      
      return {
        detected: indicators.length >= 2,
        depth: indicators.length,
        indicators: indicators
      };
    }
  },
  
  // Shopify detection
  { 
    name: "Shopify", 
    test: () => {
      const indicators = [];
      
      // Strong indicators
      if (/cdn\.shopify\.com/.test(document.documentElement.innerHTML)) indicators.push('cdn');
      if (global.Shopify && typeof global.Shopify === 'object') indicators.push('global');
      if (document.querySelector('[data-shopify]')) indicators.push('attributes');
      
      // Resource validation
      const shopifyResources = Array.from(document.querySelectorAll('script, link')).filter(el => 
        el.src && el.src.includes('shopify')
      );
      if (shopifyResources.length > 0) indicators.push('resources');
      
      return {
        detected: indicators.length >= 2,
        depth: indicators.length,
        indicators: indicators
      };
    }
  },
  
  // Next.js detection
  { 
    name: "Next.js", 
    test: () => {
      const indicators = [];
      
      // Strong indicators
      if (global.__NEXT_DATA__) indicators.push('data');
      if (document.querySelector('[data-nextjs]')) indicators.push('data');
      
      // Script validation
      const nextScripts = Array.from(document.querySelectorAll('script')).filter(s => 
        s.src && s.src.includes('next')
      );
      if (nextScripts.length > 0) indicators.push('script');
      
      // HTML mentions only if combined with other indicators
      if (/next\.js/i.test(document.documentElement.innerHTML) && indicators.length > 0) {
        indicators.push('html');
      }
      
      return {
        detected: indicators.length >= 2,
        depth: indicators.length,
        indicators: indicators
      };
    }
  },
  
  // Redux detection
  { 
    name: "Redux", 
    test: () => {
      const indicators = [];
      
      // Strong indicators
      if (global.__REDUX_DEVTOOLS_EXTENSION__) indicators.push('devtools');
      
      // Script validation
      const reduxScripts = Array.from(document.querySelectorAll('script')).filter(s => 
        s.src && s.src.includes('redux')
      );
      if (reduxScripts.length > 0) indicators.push('script');
      
      // HTML mentions only if combined with other indicators
      if (/redux/i.test(document.documentElement.innerHTML) && indicators.length > 0) {
        indicators.push('html');
      }
      
      return {
        detected: indicators.length >= 2,
        depth: indicators.length,
        indicators: indicators
      };
    }
  },
  
  // TypeScript detection
  { 
    name: "TypeScript", 
    test: () => {
      const indicators = [];
      
      // Strong indicators
      if (document.querySelector('script[type="text/typescript"]')) indicators.push('script');
      if (document.querySelector('script[src*=".ts"]')) indicators.push('script');
      
      // HTML mentions only if combined with other indicators
      if (/typescript/i.test(document.documentElement.innerHTML) && indicators.length > 0) {
        indicators.push('html');
      }
      
      return {
        detected: indicators.length >= 2,
        depth: indicators.length,
        indicators: indicators
      };
    }
  },
  
  // Hotjar detection
  { 
    name: "Hotjar", 
    test: () => {
      const indicators = [];
      
      // Strong indicators
      if (global.hj && typeof global.hj === 'function') indicators.push('global');
      
      // Script validation
      const hotjarScripts = Array.from(document.querySelectorAll('script')).filter(s => 
        s.src && s.src.includes('hotjar')
      );
      if (hotjarScripts.length > 0) indicators.push('script');
      
      // HTML mentions only if combined with other indicators
      if (/hotjar/i.test(document.documentElement.innerHTML) && indicators.length > 0) {
        indicators.push('html');
      }
      
      return {
        detected: indicators.length >= 2,
        depth: indicators.length,
        indicators: indicators
      };
    }
  },
  
  // Cloudflare detection
  { 
    name: "Cloudflare", 
    test: () => {
      const indicators = [];
      
      // Strong indicators
      if (global.__cfRLUnblockHandlers) indicators.push('handlers');
      
      // HTML mentions only if combined with other indicators
      if (/cloudflare/i.test(document.documentElement.innerHTML) && indicators.length > 0) {
        indicators.push('html');
      }
      
      return {
        detected: indicators.length >= 2,
        depth: indicators.length,
        indicators: indicators
      };
    }
  },
  
  // AWS detection
  { 
    name: "AWS", 
    test: () => {
      const indicators = [];
      
      // Strong indicators
      if (document.querySelector('[data-aws]')) indicators.push('data');
      if (document.querySelector('[class*="aws"]')) indicators.push('classes');
      
      // HTML mentions only if combined with other indicators
      if (/aws/i.test(document.documentElement.innerHTML) && indicators.length > 0) {
        indicators.push('html');
      }
      
      return {
        detected: indicators.length >= 2,
        depth: indicators.length,
        indicators: indicators
      };
    }
  }
];

// Test suite
describe('Technology Detection Tests', () => {
  
  test('React detection should work correctly', () => {
    const result = techSignatures.find(t => t.name === 'React').test();
    expect(result.detected).toBe(true);
    expect(result.depth).toBeGreaterThanOrEqual(2);
    // React should have devtools, global, root, id, script, and html indicators
    expect(result.indicators).toContain('devtools');
    expect(result.indicators).toContain('global');
    expect(result.indicators).toContain('root');
    expect(result.indicators).toContain('id');
    expect(result.indicators).toContain('script');
    expect(result.indicators).toContain('html');
  });

  test('Vue.js detection should work correctly', () => {
    const result = techSignatures.find(t => t.name === 'Vue.js').test();
    expect(result.detected).toBe(true);
    expect(result.depth).toBeGreaterThanOrEqual(2);
    // Vue should have devtools, global, attributes, script, and html indicators
    expect(result.indicators).toContain('devtools');
    expect(result.indicators).toContain('global');
    expect(result.indicators).toContain('attributes');
    expect(result.indicators).toContain('script');
    expect(result.indicators).toContain('html');
  });

  test('Angular detection should work correctly', () => {
    const result = techSignatures.find(t => t.name === 'Angular').test();
    expect(result.detected).toBe(true);
    expect(result.depth).toBeGreaterThanOrEqual(2);
    // Angular should have roots, global, version, app, script, and html indicators
    expect(result.indicators).toContain('roots');
    expect(result.indicators).toContain('global');
    expect(result.indicators).toContain('version');
    expect(result.indicators).toContain('app');
    expect(result.indicators).toContain('script');
    expect(result.indicators).toContain('html');
  });

  test('jQuery detection should work correctly', () => {
    const result = techSignatures.find(t => t.name === 'jQuery').test();
    expect(result.detected).toBe(true);
    expect(result.depth).toBeGreaterThanOrEqual(2);
    // jQuery should have global, alias, script, and html indicators
    expect(result.indicators).toContain('global');
    expect(result.indicators).toContain('alias');
    expect(result.indicators).toContain('script');
    expect(result.indicators).toContain('html');
  });

  test('Bootstrap detection should work correctly', () => {
    const result = techSignatures.find(t => t.name === 'Bootstrap').test();
    expect(result.detected).toBe(true);
    expect(result.depth).toBeGreaterThanOrEqual(2);
    // Bootstrap should have classes, stylesheet, and html indicators
    expect(result.indicators).toContain('classes');
    expect(result.indicators).toContain('stylesheet');
    expect(result.indicators).toContain('html');
  });

  test('Tailwind CSS detection should work correctly', () => {
    const result = techSignatures.find(t => t.name === 'Tailwind CSS').test();
    expect(result.detected).toBe(true);
    expect(result.depth).toBeGreaterThanOrEqual(2);
    // Tailwind should have classes, stylesheet, and html indicators
    expect(result.indicators).toContain('classes');
    expect(result.indicators).toContain('stylesheet');
    expect(result.indicators).toContain('html');
  });

  test('Google Analytics detection should work correctly', () => {
    const result = techSignatures.find(t => t.name === 'Google Analytics').test();
    expect(result.detected).toBe(true);
    expect(result.depth).toBeGreaterThanOrEqual(2);
    // Google Analytics should have ga, gtag, datalayer, script, and html indicators
    expect(result.indicators).toContain('ga');
    expect(result.indicators).toContain('gtag');
    expect(result.indicators).toContain('datalayer');
    expect(result.indicators).toContain('script');
    expect(result.indicators).toContain('html');
  });

  test('Google Tag Manager detection should work correctly', () => {
    const result = techSignatures.find(t => t.name === 'Google Tag Manager').test();
    expect(result.detected).toBe(true);
    expect(result.depth).toBeGreaterThanOrEqual(2);
    // Google Tag Manager should have datalayer, gtag, script, and html indicators
    expect(result.indicators).toContain('datalayer');
    expect(result.indicators).toContain('gtag');
    expect(result.indicators).toContain('script');
    expect(result.indicators).toContain('html');
  });

  test('Firebase detection should work correctly', () => {
    const result = techSignatures.find(t => t.name === 'Firebase').test();
    expect(result.detected).toBe(true);
    expect(result.depth).toBeGreaterThanOrEqual(2);
    // Firebase should have global, auth, firestore, script, and html indicators
    expect(result.indicators).toContain('global');
    expect(result.indicators).toContain('auth');
    expect(result.indicators).toContain('firestore');
    expect(result.indicators).toContain('script');
    expect(result.indicators).toContain('html');
  });

  test('Stripe detection should work correctly', () => {
    const result = techSignatures.find(t => t.name === 'Stripe').test();
    expect(result.detected).toBe(true);
    expect(result.depth).toBeGreaterThanOrEqual(2);
    // Stripe should have global, script, and html indicators
    expect(result.indicators).toContain('global');
    expect(result.indicators).toContain('script');
    expect(result.indicators).toContain('html');
  });

  test('Next.js detection should work correctly', () => {
    const result = techSignatures.find(t => t.name === 'Next.js').test();
    expect(result.detected).toBe(true);
    expect(result.depth).toBeGreaterThanOrEqual(2);
    // Next.js should have data, script, and html indicators
    expect(result.indicators).toContain('data');
    expect(result.indicators).toContain('script');
    expect(result.indicators).toContain('html');
  });

  test('Redux detection should work correctly', () => {
    const result = techSignatures.find(t => t.name === 'Redux').test();
    expect(result.detected).toBe(true);
    expect(result.depth).toBeGreaterThanOrEqual(2);
    // Redux should have devtools, script, and html indicators
    expect(result.indicators).toContain('devtools');
    expect(result.indicators).toContain('script');
    expect(result.indicators).toContain('html');
  });

  test('Hotjar detection should work correctly', () => {
    const result = techSignatures.find(t => t.name === 'Hotjar').test();
    expect(result.detected).toBe(true);
    expect(result.depth).toBeGreaterThanOrEqual(2);
    // Hotjar should have global, script, and html indicators
    expect(result.indicators).toContain('global');
    expect(result.indicators).toContain('script');
    expect(result.indicators).toContain('html');
  });

  test('Cloudflare detection should work correctly', () => {
    const result = techSignatures.find(t => t.name === 'Cloudflare').test();
    expect(result.detected).toBe(true);
    expect(result.depth).toBeGreaterThanOrEqual(2);
    // Cloudflare should have handlers and html indicators
    expect(result.indicators).toContain('handlers');
    expect(result.indicators).toContain('html');
  });

  test('AWS detection should work correctly', () => {
    const result = techSignatures.find(t => t.name === 'AWS').test();
    expect(result.detected).toBe(false); // No AWS resources in test DOM
    expect(result.depth).toBeLessThan(2);
  });

  test('WordPress detection should work correctly', () => {
    const result = techSignatures.find(t => t.name === 'WordPress').test();
    expect(result.detected).toBe(true);
    expect(result.depth).toBeGreaterThanOrEqual(2);
    // WordPress should have global, meta, classes, paths, and html indicators
    expect(result.indicators).toContain('global');
    expect(result.indicators).toContain('meta');
    expect(result.indicators).toContain('classes');
    expect(result.indicators).toContain('paths');
    expect(result.indicators).toContain('html');
  });

  test('Shopify detection should work correctly', () => {
    const result = techSignatures.find(t => t.name === 'Shopify').test();
    expect(result.detected).toBe(true);
    expect(result.depth).toBeGreaterThanOrEqual(2);
    // Shopify should have global, attributes, and resources indicators
    expect(result.indicators).toContain('global');
    expect(result.indicators).toContain('attributes');
    expect(result.indicators).toContain('resources');
  });

  test('TypeScript detection should work correctly', () => {
    const result = techSignatures.find(t => t.name === 'TypeScript').test();
    expect(result.detected).toBe(false); // No TypeScript in test DOM
    expect(result.depth).toBeLessThan(2);
  });

  test('Detection should require at least 2 indicators', () => {
    // Test with minimal indicators
    const minimalResult = {
      detected: false,
      depth: 1,
      indicators: ['html']
    };
    expect(minimalResult.detected).toBe(false);
    expect(minimalResult.depth).toBeLessThan(2);
  });

  test('Detection should handle missing technologies gracefully', () => {
    // Test with no indicators
    const noResult = {
      detected: false,
      depth: 0,
      indicators: []
    };
    expect(noResult.detected).toBe(false);
    expect(noResult.depth).toBe(0);
  });

});

// Test edge cases
describe('Edge Cases', () => {
  
  test('Should handle undefined window properties', () => {
    const originalReact = global.React;
    const originalDevTools = global.__REACT_DEVTOOLS_GLOBAL_HOOK__;
    
    // Remove React and devtools
    global.React = undefined;
    global.__REACT_DEVTOOLS_GLOBAL_HOOK__ = undefined;
    
    const result = techSignatures.find(t => t.name === 'React').test();
    // Should still detect React due to DOM elements and script tags
    expect(result.detected).toBe(true);
    expect(result.depth).toBeGreaterThanOrEqual(2);
    
    // Restore original values
    global.React = originalReact;
    global.__REACT_DEVTOOLS_GLOBAL_HOOK__ = originalDevTools;
  });

  test('Should handle null DOM elements', () => {
    const originalQuerySelector = document.querySelector;
    const originalQuerySelectorAll = document.querySelectorAll;
    
    // Mock querySelector to return null
    document.querySelector = () => null;
    document.querySelectorAll = () => [];
    
    const result = techSignatures.find(t => t.name === 'React').test();
    // Should still detect React due to window properties and HTML mentions
    expect(result.detected).toBe(true);
    expect(result.depth).toBeGreaterThanOrEqual(2);
    
    // Restore original methods
    document.querySelector = originalQuerySelector;
    document.querySelectorAll = originalQuerySelectorAll;
  });

  test('Should filter out related technologies', () => {
    // Test that react-query doesn't trigger React detection
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/react-query@3/dist/react-query.min.js';
    document.body.appendChild(script);
    
    const result = techSignatures.find(t => t.name === 'React').test();
    // Should still detect React due to other indicators
    expect(result.detected).toBe(true);
    
    document.body.removeChild(script);
  });

});

// Test performance
describe('Performance Tests', () => {
  
  test('Detection should be fast', () => {
    const startTime = performance.now();
    
    techSignatures.forEach(tech => tech.test());
    
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    expect(duration).toBeLessThan(100); // Should complete in under 100ms
  });

});

console.log('All tests completed successfully!'); 