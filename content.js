(() => {
  const techSignatures = [
    // React detection - multiple methods with stronger validation
    { 
      name: "React", 
      test: () => {
        const indicators = [];
        
        // Strong indicators (more reliable)
        if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) indicators.push('devtools');
        if (window.React && typeof window.React.createElement === 'function') indicators.push('global');
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
        if (window.__VUE_DEVTOOLS_GLOBAL_HOOK__) indicators.push('devtools');
        if (window.Vue && typeof window.Vue.createApp === 'function') indicators.push('global');
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
        if (window.getAllAngularRootElements?.().length) indicators.push('roots');
        if (window.angular && typeof window.angular.module === 'function') indicators.push('global');
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
        if (window.jQuery && typeof window.jQuery.fn.jquery !== 'undefined') indicators.push('global');
        if (window.$ && window.$ === window.jQuery) indicators.push('alias');
        
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
    
    // Tailwind CSS detection with stronger validation
    { 
      name: "Tailwind CSS", 
      test: () => {
        const indicators = [];
        
        // Strong indicators
        if (Array.from(document.styleSheets).some(s => s.href && s.href.includes("tailwind"))) indicators.push('stylesheet');
        if (document.querySelector('[class*="tw-"]')) indicators.push('classes');
        if (Array.from(document.querySelectorAll('link')).some(l => l.href && l.href.includes('tailwind'))) indicators.push('link');
        
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
    
    // Bootstrap detection with stronger validation
    { 
      name: "Bootstrap", 
      test: () => {
        const indicators = [];
        
        // Strong indicators
        if (document.querySelector("[class*='bootstrap']")) indicators.push('classes');
        if (document.querySelector("[class*='bs-']")) indicators.push('prefix');
        if (Array.from(document.styleSheets).some(s => s.href && s.href.includes("bootstrap"))) indicators.push('stylesheet');
        if (Array.from(document.querySelectorAll('link')).some(l => l.href && l.href.includes('bootstrap'))) indicators.push('link');
        
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
    
    // Next.js detection with stronger validation
    { 
      name: "Next.js", 
      test: () => {
        const indicators = [];
        
        // Strong indicators
        if (window.__NEXT_DATA__) indicators.push('data');
        if (document.querySelector('[data-nextjs-router-state]')) indicators.push('router');
        
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
    
    // Google Analytics detection with stronger validation
    { 
      name: "Google Analytics", 
      test: () => {
        const indicators = [];
        
        // Strong indicators
        if (window.ga && typeof window.ga === 'function') indicators.push('ga');
        if (window.gtag && typeof window.gtag === 'function') indicators.push('gtag');
        if (/google-analytics\.com/.test(document.documentElement.innerHTML)) indicators.push('domain');
        if (/gtag\(/.test(document.documentElement.innerHTML)) indicators.push('function');
        
        // Script validation
        const gaScripts = Array.from(document.querySelectorAll('script')).filter(s => 
          s.src && s.src.includes('google-analytics')
        );
        if (gaScripts.length > 0) indicators.push('script');
        
        return {
          detected: indicators.length >= 2,
          depth: indicators.length,
          indicators: indicators
        };
      }
    },
    
    // Google Tag Manager detection with stronger validation
    { 
      name: "Google Tag Manager", 
      test: () => {
        const indicators = [];
        
        // Strong indicators
        if (/gtm\.js|googletagmanager\.com/.test(document.documentElement.innerHTML)) indicators.push('domain');
        if (window.dataLayer && Array.isArray(window.dataLayer)) indicators.push('datalayer');
        
        // Script validation
        const gtmScripts = Array.from(document.querySelectorAll('script')).filter(s => 
          s.src && s.src.includes('googletagmanager')
        );
        if (gtmScripts.length > 0) indicators.push('script');
        
        return {
          detected: indicators.length >= 2,
          depth: indicators.length,
          indicators: indicators
        };
      }
    },
    
    // Hotjar detection with stronger validation
    { 
      name: "Hotjar", 
      test: () => {
        const indicators = [];
        
        // Strong indicators
        if (/static\.hotjar\.com/.test(document.documentElement.innerHTML)) indicators.push('domain');
        if (window.hj && typeof window.hj === 'function') indicators.push('global');
        
        // Script validation
        const hjScripts = Array.from(document.querySelectorAll('script')).filter(s => 
          s.src && s.src.includes('hotjar')
        );
        if (hjScripts.length > 0) indicators.push('script');
        
        return {
          detected: indicators.length >= 2,
          depth: indicators.length,
          indicators: indicators
        };
      }
    },
    
    // Cloudflare detection with stronger validation
    { 
      name: "Cloudflare", 
      test: () => {
        const indicators = [];
        
        // Strong indicators
        if (window.__cfRLUnblockHandlers) indicators.push('handlers');
        if (document.querySelector('[data-cfasync]')) indicators.push('attributes');
        
        // Script validation
        const cfScripts = Array.from(document.querySelectorAll('script')).filter(s => 
          s.src && s.src.includes('cloudflare')
        );
        if (cfScripts.length > 0) indicators.push('script');
        
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
    
    // AWS detection with stronger validation
    { 
      name: "AWS (CloudFront/S3)", 
      test: () => {
        const indicators = [];
        
        // Strong indicators
        if (/cloudfront\.net|amazonaws\.com/.test(document.documentElement.innerHTML)) indicators.push('domain');
        
        // Resource validation
        const awsResources = Array.from(document.querySelectorAll('script, link, img')).filter(el => 
          el.src && (el.src.includes('cloudfront.net') || el.src.includes('amazonaws.com'))
        );
        if (awsResources.length > 0) indicators.push('resources');
        
        return {
          detected: indicators.length >= 2,
          depth: indicators.length,
          indicators: indicators
        };
      }
    },
    
    // Shopify detection with stronger validation
    { 
      name: "Shopify", 
      test: () => {
        const indicators = [];
        
        // Strong indicators
        if (/cdn\.shopify\.com/.test(document.documentElement.innerHTML)) indicators.push('cdn');
        if (window.Shopify && typeof window.Shopify === 'object') indicators.push('global');
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
    
    // WordPress detection with stronger validation
    { 
      name: "WordPress", 
      test: () => {
        const indicators = [];
        
        // Strong indicators
        if (/wp-content|wp-includes/.test(document.documentElement.innerHTML)) indicators.push('paths');
        if (window.wp && typeof window.wp === 'object') indicators.push('global');
        if (document.querySelector('[data-wp]')) indicators.push('attributes');
        if (document.querySelector('meta[name="generator"][content*="WordPress"]')) indicators.push('meta');
        
        // Resource validation
        const wpResources = Array.from(document.querySelectorAll('script, link')).filter(el => 
          el.src && el.src.includes('wordpress')
        );
        if (wpResources.length > 0) indicators.push('resources');
        
        return {
          detected: indicators.length >= 2,
          depth: indicators.length,
          indicators: indicators
        };
      }
    },
    
    // Additional technologies with improved validation...
    // (Adding a few more examples with stronger validation)

    // TypeScript detection with stronger validation
    { 
      name: "TypeScript", 
      test: () => {
        const indicators = [];
        
        // Strong indicators
        if (Array.from(document.querySelectorAll('script')).some(s => s.type === 'text/typescript')) indicators.push('type');
        
        // Script validation
        const tsScripts = Array.from(document.querySelectorAll('script')).filter(s => 
          s.src && s.src.includes('typescript')
        );
        if (tsScripts.length > 0) indicators.push('script');
        
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

    // Redux detection with stronger validation
    { 
      name: "Redux", 
      test: () => {
        const indicators = [];
        
        // Strong indicators
        if (window.__REDUX_DEVTOOLS_EXTENSION__) indicators.push('devtools');
        
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

    // Firebase detection with stronger validation
    { 
      name: "Firebase", 
      test: () => {
        const indicators = [];
        
        // Strong indicators
        if (window.firebase && typeof window.firebase.initializeApp === 'function') indicators.push('global');
        
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

    // Stripe detection with stronger validation
    { 
      name: "Stripe", 
      test: () => {
        const indicators = [];
        
        // Strong indicators
        if (window.Stripe && typeof window.Stripe === 'function') indicators.push('global');
        
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
    }
  ];

  const detected = techSignatures
    .map(t => {
      try { 
        const result = t.test();
        return result.detected ? {
          name: t.name,
          depth: result.depth,
          indicators: result.indicators
        } : null;
      } catch (e) { 
        console.log(`Error testing ${t.name}:`, e);
        return null; 
      }
    })
    .filter(t => t !== null);

  console.log('Detected technologies with depth:', detected);
  
  // Send message to both background and popup
  chrome.runtime.sendMessage({ type: "detectedTech", detected });
})();