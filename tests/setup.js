// Jest setup file for tech detector extension tests

// Mock window object globally
global.window = {
  __REACT_DEVTOOLS_GLOBAL_HOOK__: {},
  __VUE_DEVTOOLS_GLOBAL_HOOK__: {},
  __REDUX_DEVTOOLS_EXTENSION__: {},
  __NEXT_DATA__: { props: {} },
  __cfRLUnblockHandlers: [],
  __APOLLO_CLIENT__: {},
  __SVELTE__: {},
  React: {
    createElement: () => {},
    Component: class {},
    Fragment: {}
  },
  Vue: {
    createApp: () => {},
    component: () => {}
  },
  angular: {
    module: () => {},
    component: () => {}
  },
  jQuery: {
    fn: { jquery: '3.6.0' }
  },
  $: null, // Will be set to jQuery
  getAllAngularRootElements: () => [],
  ga: () => {},
  gtag: () => {},
  dataLayer: [],
  hj: () => {},
  firebase: {
    initializeApp: () => {},
    auth: () => {},
    firestore: () => {}
  },
  Stripe: () => {},
  Shopify: {},
  wp: {},
  Sentry: {},
  LogRocket: {},
  FS: {},
  amplitude: {},
  posthog: {},
  optimizely: {},
  mixpanel: {},
  analytics: {},
  wix: {},
  Webflow: {},
  Intercom: {},
  drift: {},
  moment: {},
  _: {},
  axios: {},
  io: {},
  Chart: {},
  d3: {},
  THREE: {},
  Alpine: {},
  $nuxt: {},
  Meteor: {},
  Ember: {},
  Backbone: {},
  ko: {},
  mobx: {},
  document: null // Will be set later
};

// Set jQuery alias
window.$ = window.jQuery;

// Ensure window properties are accessible in the global scope
Object.keys(window).forEach(key => {
  global[key] = window[key];
});

// Mock chrome API globally
global.chrome = {
  tabs: {
    query: jest.fn().mockResolvedValue([{ id: 1 }])
  },
  scripting: {
    executeScript: jest.fn().mockResolvedValue([])
  },
  runtime: {
    sendMessage: jest.fn().mockResolvedValue({ detected: [] }),
    onMessage: {
      addListener: jest.fn()
    }
  }
};

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn()
};

// Mock performance API
global.performance = {
  now: jest.fn(() => Date.now())
};

// Mock setTimeout and setInterval
global.setTimeout = jest.fn((callback, delay) => {
  return setTimeout(callback, delay);
});

global.setInterval = jest.fn((callback, delay) => {
  return setInterval(callback, delay);
});

// Mock clearTimeout and clearInterval
global.clearTimeout = jest.fn((id) => {
  return clearTimeout(id);
});

global.clearInterval = jest.fn((id) => {
  return clearInterval(id);
});

// Mock fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
    text: () => Promise.resolve('')
  })
);

// Mock XMLHttpRequest
global.XMLHttpRequest = jest.fn(() => ({
  open: jest.fn(),
  send: jest.fn(),
  setRequestHeader: jest.fn(),
  readyState: 4,
  status: 200,
  responseText: '',
  onreadystatechange: null
}));

// Mock localStorage
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};

// Mock sessionStorage
global.sessionStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};

// Mock matchMedia
global.matchMedia = jest.fn(() => ({
  matches: false,
  addListener: jest.fn(),
  removeListener: jest.fn()
}));

// Mock ResizeObserver
global.ResizeObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
}));

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
}));

// Mock MutationObserver
global.MutationObserver = jest.fn(() => ({
  observe: jest.fn(),
  disconnect: jest.fn()
}));

// Mock requestAnimationFrame
global.requestAnimationFrame = jest.fn((callback) => {
  return setTimeout(callback, 16);
});

// Mock cancelAnimationFrame
global.cancelAnimationFrame = jest.fn((id) => {
  return clearTimeout(id);
});

// Mock URL and URLSearchParams
global.URL = jest.fn(() => ({
  href: '',
  origin: '',
  protocol: '',
  host: '',
  hostname: '',
  port: '',
  pathname: '',
  search: '',
  hash: '',
  searchParams: new URLSearchParams()
}));

global.URLSearchParams = jest.fn(() => ({
  get: jest.fn(),
  getAll: jest.fn(),
  has: jest.fn(),
  set: jest.fn(),
  append: jest.fn(),
  delete: jest.fn(),
  toString: jest.fn(() => '')
}));

// Mock crypto API
global.crypto = {
  getRandomValues: jest.fn((array) => {
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
    return array;
  }),
  subtle: {
    digest: jest.fn(),
    generateKey: jest.fn(),
    sign: jest.fn(),
    verify: jest.fn()
  }
};

// Mock WebSocket
global.WebSocket = jest.fn(() => ({
  readyState: 0,
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3,
  send: jest.fn(),
  close: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn()
}));

// Mock EventSource
global.EventSource = jest.fn(() => ({
  readyState: 0,
  CONNECTING: 0,
  OPEN: 1,
  CLOSED: 2,
  close: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn()
}));

// Mock navigator
global.navigator = {
  userAgent: 'Mozilla/5.0 (Test Browser)',
  language: 'en-US',
  languages: ['en-US', 'en'],
  cookieEnabled: true,
  onLine: true,
  geolocation: {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn(),
    clearWatch: jest.fn()
  },
  serviceWorker: {
    register: jest.fn(),
    getRegistration: jest.fn(),
    getRegistrations: jest.fn()
  },
  permissions: {
    query: jest.fn()
  },
  mediaDevices: {
    getUserMedia: jest.fn(),
    enumerateDevices: jest.fn()
  }
};

// Mock screen
global.screen = {
  width: 1920,
  height: 1080,
  availWidth: 1920,
  availHeight: 1040,
  colorDepth: 24,
  pixelDepth: 24
};

// Mock history
global.history = {
  length: 1,
  scrollRestoration: 'auto',
  state: null,
  back: jest.fn(),
  forward: jest.fn(),
  go: jest.fn(),
  pushState: jest.fn(),
  replaceState: jest.fn()
};

// Mock location
global.location = {
  href: 'https://example.com',
  origin: 'https://example.com',
  protocol: 'https:',
  host: 'example.com',
  hostname: 'example.com',
  port: '',
  pathname: '/',
  search: '',
  hash: '',
  assign: jest.fn(),
  reload: jest.fn(),
  replace: jest.fn()
};

// Mock document properties
Object.defineProperty(document, 'readyState', {
  value: 'complete',
  writable: true
});

Object.defineProperty(document, 'hidden', {
  value: false,
  writable: true
});

Object.defineProperty(document, 'visibilityState', {
  value: 'visible',
  writable: true
});

// Mock window properties
Object.defineProperty(window, 'innerWidth', {
  value: 1920,
  writable: true
});

Object.defineProperty(window, 'innerHeight', {
  value: 1080,
  writable: true
});

Object.defineProperty(window, 'outerWidth', {
  value: 1920,
  writable: true
});

Object.defineProperty(window, 'outerHeight', {
  value: 1080,
  writable: true
});

Object.defineProperty(window, 'devicePixelRatio', {
  value: 1,
  writable: true
});

// Mock window methods
window.addEventListener = jest.fn();
window.removeEventListener = jest.fn();
window.dispatchEvent = jest.fn();
window.getComputedStyle = jest.fn(() => ({
  getPropertyValue: jest.fn(() => ''),
  setProperty: jest.fn()
}));

// Mock document methods
document.addEventListener = jest.fn();
document.removeEventListener = jest.fn();
document.dispatchEvent = jest.fn();
document.createElement = jest.fn((tagName) => {
  const element = {
    tagName: tagName.toUpperCase(),
    className: '',
    id: '',
    innerHTML: '',
    textContent: '',
    style: {},
    setAttribute: jest.fn(),
    getAttribute: jest.fn(),
    removeAttribute: jest.fn(),
    appendChild: jest.fn(),
    removeChild: jest.fn(),
    querySelector: jest.fn(),
    querySelectorAll: jest.fn(() => []),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
    focus: jest.fn(),
    blur: jest.fn(),
    click: jest.fn()
  };
  
  // Mock querySelector and querySelectorAll for the created element
  element.querySelector = jest.fn(() => null);
  element.querySelectorAll = jest.fn(() => []);
  
  return element;
});

// Mock Element prototype methods
Element.prototype.setAttribute = jest.fn();
Element.prototype.getAttribute = jest.fn();
Element.prototype.removeAttribute = jest.fn();
Element.prototype.appendChild = jest.fn();
Element.prototype.removeChild = jest.fn();
Element.prototype.querySelector = jest.fn();
Element.prototype.querySelectorAll = jest.fn(() => []);
Element.prototype.addEventListener = jest.fn();
Element.prototype.removeEventListener = jest.fn();
Element.prototype.dispatchEvent = jest.fn();
Element.prototype.focus = jest.fn();
Element.prototype.blur = jest.fn();
Element.prototype.click = jest.fn();

// Mock NodeList prototype
NodeList.prototype.forEach = Array.prototype.forEach;
NodeList.prototype.map = Array.prototype.map;
NodeList.prototype.filter = Array.prototype.filter;
NodeList.prototype.reduce = Array.prototype.reduce;

// Mock HTMLCollection prototype
HTMLCollection.prototype.forEach = Array.prototype.forEach;
HTMLCollection.prototype.map = Array.prototype.map;
HTMLCollection.prototype.filter = Array.prototype.filter;
HTMLCollection.prototype.reduce = Array.prototype.reduce;

console.log('Test setup completed successfully!'); 