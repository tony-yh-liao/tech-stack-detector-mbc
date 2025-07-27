// Technology logo mapping
const techLogos = {
  // Frontend Frameworks
  "React": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Vue.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
  "Angular": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  "Nuxt.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg",
  "Svelte": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg",
  "Alpine.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "Ember.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ember/ember-original-wordmark.svg",
  "Backbone.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "Knockout.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "Meteor": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/meteor/meteor-original.svg",
  
  // Libraries
  "jQuery": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg",
  "Lodash": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "Moment.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "Axios": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "Socket.io": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  
  // CSS Frameworks
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
  "Bootstrap": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  "Foundation CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "Bulma CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "Material-UI": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
  "Ant Design": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  
  // Data Visualization
  "Chart.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "D3.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "Three.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  
  // Backend & Services
  "Firebase": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  
  // Payment
  "Stripe": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "PayPal": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  
  // Analytics
  "Google Analytics": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
  "Google Tag Manager": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
  "Hotjar": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "Mixpanel": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "Segment": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  
  // Infrastructure
  "Cloudflare": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
  "AWS (CloudFront/S3)": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
  
  // E-commerce
  "Shopify": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "WooCommerce": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg",
  "Magento": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  "BigCommerce": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  
  // CMS
  "WordPress": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg",
  "Drupal": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  "Joomla": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  "Ghost": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  
  // Website Builders
  "Wix": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "Squarespace": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "Webflow": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  
  // Marketing & Communication
  "HubSpot": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "Mailchimp": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "Intercom": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "Drift": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "Optimizely": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",

  // NEW TECHNOLOGIES - 20 more popular ones

  // Development Tools
  "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "Redux": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
  "MobX": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "Zustand": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "GraphQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  "Apollo Client": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  
  // Styling Libraries
  "Styled Components": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Emotion": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  
  // Animation & Motion
  "Framer Motion": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  
  // Data Fetching
  "React Query": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "SWR": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  
  // Build Tools
  "Vite": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
  "Webpack": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg",
  "Rollup": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "Parcel": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  
  // Code Quality
  "ESLint": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg",
  "Prettier": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  
  // Testing
  "Jest": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
  "Cypress": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cypress/cypress-plain.svg",
  
  // Development Tools
  "Storybook": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/storybook/storybook-original.svg",
  
  // Error Monitoring
  "Sentry": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "LogRocket": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  
  // User Analytics
  "FullStory": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "Amplitude": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "PostHog": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "Plausible Analytics": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "Fathom Analytics": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  
  // Hosting & Deployment
  "Vercel": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
  "Netlify": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg",
  
  // Headless CMS
  "Contentful": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "Sanity": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "Strapi": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "Prismic": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
};

// Default fallback icon (gear icon)
const defaultIcon = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDE1QzEzLjY1NjkgMTUgMTUgMTMuNjU2OSAxNSAxMkMxNSAxMC4zNDMxIDEzLjY1NjkgOSAxMiA5QzEwLjM0MzEgOSA5IDEwLjM0MzEgOSAxMkM5IDEzLjY1NjkgMTAuMzQzMSAxNSAxMiAxNVoiIGZpbGw9IiM2NjY2NjYiLz4KPHBhdGggZD0iTTE5LjQzIDExLjA5QzE5LjQ3IDExLjA0IDE5LjUgMTAuOTkgMTkuNTMgMTAuOTRMMjEuNTQgOC4wNEMyMS43MyA3Ljc5IDIxLjY2IDcuNDMgMjEuMzYgNy4zNUwxOS4xMSA2LjY5QzE4Ljk2IDYuMzUgMTguNzcgNi4wNCAxOC41NCA1Ljc3TDE4LjgxIDMuNDVDMTguODUgMy4xNSAxOC42MSAyLjkgMTguMzEgMi45SDE1LjY5QzE1LjM5IDIuOSAxNS4xNSAzLjE1IDE1LjE5IDMuNDVMMTUuNDYgNS43N0MxNS4yMyA2LjA0IDE1LjA0IDYuMzUgMTQuODkgNi42OUwxMi42NCA3LjM1QzEyLjM0IDcuNDMgMTIuMjcgNy43OSAxMi40NiA4LjA0TDE0LjQ3IDEwLjk0QzE0LjUgMTAuOTkgMTQuNTMgMTEuMDQgMTQuNTcgMTEuMDlMMTIuNDYgMTMuOTZDMTIuMjcgMTQuMjEgMTIuMzQgMTQuNTcgMTIuNjQgMTQuNjVMMTQuODkgMTUuMzFDMTUuMDQgMTUuNjUgMTUuMjMgMTUuOTYgMTUuNDYgMTYuMjNMMTUuMTkgMTguNTVDMTUuMTUgMTguODUgMTUuMzkgMTkuMSAxNS42OSAxOS4xSDE4LjMxQzE4LjYxIDE5LjEgMTguODUgMTguODUgMTguODEgMTguNTVMMTguNTQgMTYuMjNDMTguNzcgMTUuOTYgMTguOTYgMTUuNjUgMTkuMTEgMTUuMzFMMjEuMzYgMTQuNjVDMjEuNjYgMTQuNTcgMjEuNzMgMTQuMjEgMjEuNTQgMTMuOTZMMTkuNDMgMTEuMDlaIiBmaWxsPSIjNjY2NjY2Ii8+Cjwvc3ZnPgo=";

// Technology groups by domain
const techGroups = {
  "Frontend Frameworks": ["React", "Vue.js", "Angular", "Next.js", "Nuxt.js", "Svelte", "Alpine.js", "Ember.js", "Backbone.js", "Knockout.js", "Meteor"],
  "CSS Frameworks": ["Tailwind CSS", "Bootstrap", "Foundation CSS", "Bulma CSS", "Material-UI", "Ant Design"],
  "Libraries & Utilities": ["jQuery", "Lodash", "Moment.js", "Axios", "Socket.io", "TypeScript", "Redux", "MobX", "Zustand"],
  "Data & APIs": ["GraphQL", "Apollo Client", "React Query", "SWR"],
  "Styling & Animation": ["Styled Components", "Emotion", "Framer Motion"],
  "Build Tools": ["Vite", "Webpack", "Rollup", "Parcel"],
  "Code Quality": ["ESLint", "Prettier"],
  "Testing": ["Jest", "Cypress", "Storybook"],
  "Analytics & Monitoring": ["Google Analytics", "Google Tag Manager", "Hotjar", "Mixpanel", "Segment", "Sentry", "LogRocket", "FullStory", "Amplitude", "PostHog", "Plausible Analytics", "Fathom Analytics"],
  "Infrastructure & Hosting": ["Cloudflare", "AWS (CloudFront/S3)", "Vercel", "Netlify"],
  "Backend & Services": ["Firebase"],
  "Payment Processing": ["Stripe", "PayPal"],
  "E-commerce": ["Shopify", "WooCommerce", "Magento", "BigCommerce"],
  "Content Management": ["WordPress", "Drupal", "Joomla", "Ghost", "Contentful", "Sanity", "Strapi", "Prismic"],
  "Website Builders": ["Wix", "Squarespace", "Webflow"],
  "Marketing & Communication": ["HubSpot", "Mailchimp", "Intercom", "Drift", "Optimizely"],
  "Data Visualization": ["Chart.js", "D3.js", "Three.js"]
};

// Pagination state
let currentPage = 0;
const itemsPerPage = 10;

// Get depth level description
function getDepthDescription(depth) {
  if (depth >= 5) return "Extensive";
  if (depth >= 4) return "Heavy";
  if (depth >= 3) return "Moderate";
  if (depth >= 2) return "Light";
  return "Minimal";
}

// Get depth color
function getDepthColor(depth) {
  if (depth >= 5) return "#dc3545"; // Red for extensive
  if (depth >= 4) return "#fd7e14"; // Orange for heavy
  if (depth >= 3) return "#ffc107"; // Yellow for moderate
  if (depth >= 2) return "#28a745"; // Green for light
  return "#6c757d"; // Gray for minimal
}

// Group technologies by domain
function groupTechnologies(techs) {
  const groups = {};
  
  techs.forEach(tech => {
    let groupName = "Other";
    
    for (const [group, technologies] of Object.entries(techGroups)) {
      if (technologies.includes(tech.name)) {
        groupName = group;
        break;
      }
    }
    
    if (!groups[groupName]) {
      groups[groupName] = [];
    }
    groups[groupName].push(tech);
  });
  
  return groups;
}

// Show loading state
function showLoading() {
  const list = document.getElementById("tech-list");
  list.innerHTML = `
    <li class="loading-item">
      <div class="loading-spinner"></div>
      <span>Scanning website...</span>
    </li>
  `;
}

// Update pagination controls
function updatePaginationControls(totalPages) {
  const paginationContainer = document.getElementById("pagination");
  if (!paginationContainer) return;
  
  if (totalPages <= 1) {
    paginationContainer.style.display = "none";
    return;
  }
  
  paginationContainer.style.display = "flex";
  paginationContainer.innerHTML = "";
  
  // Previous button
  if (currentPage > 0) {
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "←";
    prevBtn.className = "pagination-btn";
    prevBtn.onclick = () => {
      currentPage--;
      updateList(window.lastDetectedTechs);
    };
    paginationContainer.appendChild(prevBtn);
  }
  
  // Page numbers
  for (let i = 0; i < totalPages; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.textContent = i + 1;
    pageBtn.className = `pagination-btn ${i === currentPage ? 'active' : ''}`;
    pageBtn.onclick = () => {
      currentPage = i;
      updateList(window.lastDetectedTechs);
    };
    paginationContainer.appendChild(pageBtn);
  }
  
  // Next button
  if (currentPage < totalPages - 1) {
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "→";
    nextBtn.className = "pagination-btn";
    nextBtn.onclick = () => {
      currentPage++;
      updateList(window.lastDetectedTechs);
    };
    paginationContainer.appendChild(nextBtn);
  }
}

function updateList(techs) {
  if (!techs) return;
  
  window.lastDetectedTechs = techs;
  const list = document.getElementById("tech-list");
  list.innerHTML = "";
  
  if (techs.length === 0) {
    list.innerHTML = "<li>No major tech detected.</li>";
    return;
  }
  
  // Sort by depth (descending)
  const sortedTechs = [...techs].sort((a, b) => b.depth - a.depth);
  
  // Group technologies
  const groupedTechs = groupTechnologies(sortedTechs);
  
  // Calculate pagination
  const allTechs = Object.entries(groupedTechs).flatMap(([groupName, techs]) => 
    techs.map(tech => ({ ...tech, groupName }))
  );
  
  const totalPages = Math.ceil(allTechs.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTechs = allTechs.slice(startIndex, endIndex);
  
  // Group current page techs
  const currentGrouped = {};
  currentTechs.forEach(tech => {
    if (!currentGrouped[tech.groupName]) {
      currentGrouped[tech.groupName] = [];
    }
    currentGrouped[tech.groupName].push(tech);
  });
  
  // Render grouped technologies
  Object.entries(currentGrouped).forEach(([groupName, groupTechs]) => {
    // Group header
    const groupHeader = document.createElement("li");
    groupHeader.className = "group-header";
    groupHeader.innerHTML = `<h4>${groupName}</h4>`;
    list.appendChild(groupHeader);
    
    // Group technologies
    groupTechs.forEach(tech => {
      const li = document.createElement("li");
      
      // Create logo image
      const logo = document.createElement("img");
      logo.src = techLogos[tech.name] || defaultIcon;
      logo.alt = `${tech.name} logo`;
      logo.className = "tech-logo";
      logo.onerror = function() {
        this.src = defaultIcon;
      };
      
      // Create main content container
      const content = document.createElement("div");
      content.className = "tech-content";
      
      // Create text span
      const text = document.createElement("span");
      text.textContent = tech.name;
      text.className = "tech-name";
      
      // Create depth indicator
      const depthIndicator = document.createElement("div");
      depthIndicator.className = "depth-indicator";
      
      const depthText = document.createElement("span");
      depthText.textContent = getDepthDescription(tech.depth);
      depthText.className = "depth-text";
      depthText.style.color = getDepthColor(tech.depth);
      
      const depthBar = document.createElement("div");
      depthBar.className = "depth-bar";
      depthBar.style.backgroundColor = getDepthColor(tech.depth);
      depthBar.style.width = `${(tech.depth / 5) * 100}%`;
      
      depthIndicator.appendChild(depthText);
      depthIndicator.appendChild(depthBar);
      
      // Append elements
      content.appendChild(text);
      content.appendChild(depthIndicator);
      
      li.appendChild(logo);
      li.appendChild(content);
      list.appendChild(li);
    });
  });
  
  // Update pagination controls
  updatePaginationControls(totalPages);
  
  // Show total count
  const totalCount = document.getElementById("total-count");
  if (totalCount) {
    totalCount.textContent = `${allTechs.length} technologies detected`;
  }
}

// Scan current page
async function scanPage() {
  try {
    showLoading();
    
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // First, try to get results from background script
    const response = await chrome.runtime.sendMessage({ type: "getLastDetected" });
    if (response && response.detected) {
      updateList(response.detected);
    }
    
    // Then execute content script to get fresh results
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"]
    });
    
    // Wait a bit for the content script to send its message
    setTimeout(() => {
      chrome.runtime.sendMessage({ type: "getLastDetected" }, (response) => {
        if (response && response.detected) {
          currentPage = 0; // Reset to first page
          updateList(response.detected);
        }
      });
    }, 100);
    
  } catch (error) {
    console.error('Error scanning page:', error);
    document.getElementById("tech-list").innerHTML = "<li>Error scanning page</li>";
  }
}

document.getElementById("rescan").addEventListener("click", scanPage);

// Listen for messages from content script
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "detectedTech") {
    currentPage = 0; // Reset to first page
    updateList(msg.detected);
  }
});

// Trigger scan when popup opens
scanPage();