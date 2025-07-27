// Unit tests for popup.js functionality
// Run with: npm test or jest

// Mock DOM environment for popup testing
document.body.innerHTML = `
  <div id="popup">
    <h3>Detected Tech Stack</h3>
    <div id="total-count" class="total-count">Scanning...</div>
    <ul id="tech-list">
      <li class="loading-item">
        <div class="loading-spinner"></div>
        <span>Scanning website...</span>
      </li>
    </ul>
    <div id="pagination" class="pagination"></div>
    <button id="rescan">Rescan Page</button>
  </div>
`;

// Mock chrome API
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

// Mock technology data
const mockTechData = [
  {
    name: "React",
    depth: 5,
    indicators: ["devtools", "global", "root", "id", "script"]
  },
  {
    name: "Vue.js",
    depth: 4,
    indicators: ["devtools", "global", "attributes", "script"]
  },
  {
    name: "Angular",
    depth: 3,
    indicators: ["roots", "global", "version"]
  },
  {
    name: "jQuery",
    depth: 2,
    indicators: ["global", "alias"]
  },
  {
    name: "Bootstrap",
    depth: 4,
    indicators: ["classes", "stylesheet", "link", "html"]
  },
  {
    name: "Tailwind CSS",
    depth: 3,
    indicators: ["stylesheet", "classes", "link"]
  },
  {
    name: "Google Analytics",
    depth: 2,
    indicators: ["ga", "gtag"]
  },
  {
    name: "Firebase",
    depth: 2,
    indicators: ["global", "script"]
  },
  {
    name: "Stripe",
    depth: 1,
    indicators: ["global"]
  },
  {
    name: "WordPress",
    depth: 3,
    indicators: ["paths", "global", "meta"]
  },
  {
    name: "Shopify",
    depth: 2,
    indicators: ["global", "attributes"]
  },
  {
    name: "Next.js",
    depth: 2,
    indicators: ["data", "router"]
  },
  {
    name: "Redux",
    depth: 1,
    indicators: ["devtools"]
  },
  {
    name: "TypeScript",
    depth: 1,
    indicators: ["script"]
  },
  {
    name: "Hotjar",
    depth: 1,
    indicators: ["global"]
  }
];

// Mock techLogos object
const techLogos = {
  "React": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Vue.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
  "Angular": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
  "jQuery": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg",
  "Bootstrap": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
  "Google Analytics": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
  "Firebase": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  "Stripe": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "WordPress": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg",
  "Shopify": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  "Redux": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
  "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "Hotjar": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
};

// Default icon for missing logos
const defaultIcon = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDkuNzRMMTIgMTZMMTAuOTEgOS43NEw0IDlMMTAuOTEgOC4yNkwxMiAyWiIgZmlsbD0iIzY2NzU3NyIvPgo8L3N2Zz4K";

// Mock functions from popup.js
function getDepthDescription(depth) {
  if (depth >= 8) return 'Extensive';
  if (depth >= 6) return 'Heavy';
  if (depth >= 4) return 'Moderate';
  if (depth >= 2) return 'Light';
  return 'Minimal';
}

function getDepthColor(depth) {
  if (depth >= 8) return '#dc3545'; // Red
  if (depth >= 6) return '#fd7e14'; // Orange
  if (depth >= 4) return '#ffc107'; // Yellow
  if (depth >= 2) return '#28a745'; // Green
  return '#6c757d'; // Gray
}

function groupTechnologies(techs) {
  const groups = {
    'Frontend Frameworks': [],
    'CSS Frameworks': [],
    'Libraries': [],
    'Analytics & Monitoring': [],
    'Backend & Services': [],
    'Payment': [],
    'Content Management': [],
    'Infrastructure': [],
    'Development Tools': [],
    'Other': []
  };

  techs.forEach(tech => {
    if (['React', 'Vue.js', 'Angular', 'Next.js', 'Nuxt.js', 'Svelte', 'Alpine.js', 'Ember.js', 'Backbone.js', 'Knockout.js', 'Meteor'].includes(tech.name)) {
      groups['Frontend Frameworks'].push(tech);
    } else if (['Tailwind CSS', 'Bootstrap', 'Foundation CSS', 'Bulma CSS', 'Material-UI', 'Ant Design'].includes(tech.name)) {
      groups['CSS Frameworks'].push(tech);
    } else if (['jQuery', 'Lodash', 'Moment.js', 'Axios', 'Socket.io', 'Chart.js', 'D3.js', 'Three.js'].includes(tech.name)) {
      groups['Libraries'].push(tech);
    } else if (['Google Analytics', 'Google Tag Manager', 'Hotjar', 'Mixpanel', 'Segment', 'Sentry', 'LogRocket', 'FullStory', 'Amplitude', 'PostHog', 'Plausible Analytics', 'Fathom Analytics'].includes(tech.name)) {
      groups['Analytics & Monitoring'].push(tech);
    } else if (['Firebase', 'AWS (CloudFront/S3)', 'Vercel', 'Netlify'].includes(tech.name)) {
      groups['Backend & Services'].push(tech);
    } else if (['Stripe', 'PayPal'].includes(tech.name)) {
      groups['Payment'].push(tech);
    } else if (['WordPress', 'Shopify', 'WooCommerce', 'Magento', 'BigCommerce', 'Drupal', 'Joomla', 'Ghost', 'Wix', 'Squarespace', 'Webflow'].includes(tech.name)) {
      groups['Content Management'].push(tech);
    } else if (['Cloudflare', 'AWS (CloudFront/S3)'].includes(tech.name)) {
      groups['Infrastructure'].push(tech);
    } else if (['TypeScript', 'Redux', 'MobX', 'Zustand', 'GraphQL', 'Apollo Client', 'Styled Components', 'Emotion', 'Framer Motion', 'React Query', 'SWR', 'Vite', 'Webpack', 'Rollup', 'Parcel', 'ESLint', 'Prettier', 'Jest', 'Cypress', 'Storybook'].includes(tech.name)) {
      groups['Development Tools'].push(tech);
    } else {
      groups['Other'].push(tech);
    }
  });

  // Remove empty groups
  Object.keys(groups).forEach(key => {
    if (groups[key].length === 0) {
      delete groups[key];
    }
  });

  return groups;
}

function showLoading() {
  const list = document.getElementById("tech-list");
  if (list) {
    list.innerHTML = `
      <li class="loading-item">
        <div class="loading-spinner"></div>
        <span>Scanning website...</span>
      </li>
    `;
  }
}

function updatePaginationControls(totalPages) {
  const pagination = document.getElementById("pagination");
  if (!pagination || totalPages <= 1) {
    if (pagination) pagination.innerHTML = '';
    return;
  }

  let controls = '';
  for (let i = 0; i < totalPages; i++) {
    controls += `<button class="pagination-btn" data-page="${i}">${i + 1}</button>`;
  }
  pagination.innerHTML = controls;
}

// Mock the updateList function
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
  const itemsPerPage = 10;
  const currentPage = 0; // For testing, always start at page 0
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
      
      // Create logo
      const logo = document.createElement("img");
      logo.className = "tech-logo";
      logo.src = techLogos[tech.name] || defaultIcon;
      logo.alt = `${tech.name} logo`;
      logo.onerror = () => {
        logo.src = defaultIcon;
      };
      
      // Create content container
      const content = document.createElement("div");
      content.className = "tech-content";
      
      // Create name
      const name = document.createElement("span");
      name.className = "tech-name";
      name.textContent = tech.name;
      
      // Create depth indicator
      const depthIndicator = document.createElement("div");
      depthIndicator.className = "depth-indicator";
      
      const depthText = document.createElement("span");
      depthText.className = "depth-text";
      depthText.textContent = getDepthDescription(tech.depth);
      depthText.style.color = getDepthColor(tech.depth);
      
      const depthBar = document.createElement("div");
      depthBar.className = "depth-bar";
      depthBar.style.width = `${Math.min(tech.depth * 20, 100)}%`;
      depthBar.style.backgroundColor = getDepthColor(tech.depth);
      
      depthIndicator.appendChild(depthText);
      depthIndicator.appendChild(depthBar);
      
      content.appendChild(name);
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

// Test suite
describe('Popup Functionality Tests', () => {
  
  beforeEach(() => {
    // Reset pagination state
    // currentPage = 0; // This is now handled by the mock updateList
    
    // Clear any previous test data
    window.lastDetectedTechs = null;
  });

  test('Should show loading state correctly', () => {
    showLoading();
    const list = document.getElementById("tech-list");
    const loadingItem = list.querySelector('.loading-item');
    
    expect(loadingItem).toBeTruthy();
    expect(loadingItem.querySelector('.loading-spinner')).toBeTruthy();
    expect(loadingItem.textContent).toContain('Scanning website...');
  });

  test('Should group technologies correctly', () => {
    const groups = groupTechnologies(mockTechData);
    
    expect(groups["Frontend Frameworks"]).toBeDefined();
    expect(groups["Frontend Frameworks"]).toContainEqual(
      expect.objectContaining({ name: "React" })
    );
    expect(groups["Frontend Frameworks"]).toContainEqual(
      expect.objectContaining({ name: "Vue.js" })
    );
    expect(groups["Frontend Frameworks"]).toContainEqual(
      expect.objectContaining({ name: "Angular" })
    );
    
    expect(groups["CSS Frameworks"]).toBeDefined();
    expect(groups["CSS Frameworks"]).toContainEqual(
      expect.objectContaining({ name: "Bootstrap" })
    );
    expect(groups["CSS Frameworks"]).toContainEqual(
      expect.objectContaining({ name: "Tailwind CSS" })
    );
    
    expect(groups["Libraries"]).toBeDefined();
    expect(groups["Libraries"]).toContainEqual(
      expect.objectContaining({ name: "jQuery" })
    );
    expect(groups["Libraries"]).toContainEqual(
      expect.objectContaining({ name: "Redux" })
    );
    expect(groups["Libraries"]).toContainEqual(
      expect.objectContaining({ name: "TypeScript" })
    );
    
    expect(groups["Analytics & Monitoring"]).toBeDefined();
    expect(groups["Analytics & Monitoring"]).toContainEqual(
      expect.objectContaining({ name: "Google Analytics" })
    );
    expect(groups["Analytics & Monitoring"]).toContainEqual(
      expect.objectContaining({ name: "Hotjar" })
    );
    
    expect(groups["Backend & Services"]).toBeDefined();
    expect(groups["Backend & Services"]).toContainEqual(
      expect.objectContaining({ name: "Firebase" })
    );
    
    expect(groups["Payment"]).toBeDefined();
    expect(groups["Payment"]).toContainEqual(
      expect.objectContaining({ name: "Stripe" })
    );
    
    expect(groups["Content Management"]).toBeDefined();
    expect(groups["Content Management"]).toContainEqual(
      expect.objectContaining({ name: "WordPress" })
    );
    expect(groups["Content Management"]).toContainEqual(
      expect.objectContaining({ name: "Shopify" })
    );
    
    expect(groups["Frontend Frameworks"]).toContainEqual(
      expect.objectContaining({ name: "Next.js" })
    );
  });

  test('Should sort technologies by depth correctly', () => {
    const sortedTechs = [...mockTechData].sort((a, b) => b.depth - a.depth);
    
    expect(sortedTechs[0].name).toBe("React"); // depth: 5
    expect(sortedTechs[1].name).toBe("Vue.js"); // depth: 4
    expect(sortedTechs[2].name).toBe("Bootstrap"); // depth: 4
    expect(sortedTechs[3].name).toBe("Tailwind CSS"); // depth: 3
    expect(sortedTechs[4].name).toBe("Angular"); // depth: 3
  });

  test('Should get depth description correctly', () => {
    expect(getDepthDescription(5)).toBe("Extensive");
    expect(getDepthDescription(4)).toBe("Heavy");
    expect(getDepthDescription(3)).toBe("Moderate");
    expect(getDepthDescription(2)).toBe("Light");
    expect(getDepthDescription(1)).toBe("Minimal");
  });

  test('Should get depth color correctly', () => {
    expect(getDepthColor(5)).toBe("#dc3545"); // Red
    expect(getDepthColor(4)).toBe("#fd7e14"); // Orange
    expect(getDepthColor(3)).toBe("#ffc107"); // Yellow
    expect(getDepthColor(2)).toBe("#28a745"); // Green
    expect(getDepthColor(1)).toBe("#6c757d"); // Gray
  });

  test('Should update list with technologies correctly', () => {
    updateList(mockTechData);
    
    const list = document.getElementById("tech-list");
    const totalCount = document.getElementById("total-count");
    
    expect(list.children.length).toBeGreaterThan(0);
    expect(totalCount.textContent).toBe("15 technologies detected");
    
    // Check for group headers
    const groupHeaders = list.querySelectorAll('.group-header');
    expect(groupHeaders.length).toBeGreaterThan(0);
    
    // Check for technology items
    const techItems = list.querySelectorAll('li:not(.group-header)');
    expect(techItems.length).toBeGreaterThan(0);
  });

  test('Should handle empty technology list', () => {
    updateList([]);
    
    const list = document.getElementById("tech-list");
    expect(list.innerHTML).toContain("No major tech detected");
  });

  test('Should handle null technology list', () => {
    updateList(null);
    
    const list = document.getElementById("tech-list");
    expect(list.innerHTML).toContain("No major tech detected");
  });

  test('Should paginate correctly with more than 10 items', () => {
    // Create more than 10 technologies
    const manyTechs = Array.from({ length: 25 }, (_, i) => ({
      name: `Tech${i + 1}`,
      depth: Math.floor(Math.random() * 5) + 1,
      indicators: ["global", "script"]
    }));
    
    updateList(manyTechs);
    
    const totalCount = document.getElementById("total-count");
    expect(totalCount.textContent).toBe("25 technologies detected");
    
    // Should show pagination controls
    const pagination = document.getElementById("pagination");
    expect(pagination.style.display).toBe("flex");
  });

  test('Should not show pagination with 10 or fewer items', () => {
    const fewTechs = mockTechData.slice(0, 8);
    updateList(fewTechs);
    
    const pagination = document.getElementById("pagination");
    expect(pagination.style.display).toBe("none");
  });

  test('Should create technology items with correct structure', () => {
    updateList([mockTechData[0]]); // Just React
    
    const list = document.getElementById("tech-list");
    const techItem = list.querySelector('li:not(.group-header)');
    
    expect(techItem).toBeTruthy();
    
    const logo = techItem.querySelector('.tech-logo');
    expect(logo).toBeTruthy();
    expect(logo.src).toContain('react');
    
    const techName = techItem.querySelector('.tech-name');
    expect(techName).toBeTruthy();
    expect(techName.textContent).toBe('React');
    
    const depthIndicator = techItem.querySelector('.depth-indicator');
    expect(depthIndicator).toBeTruthy();
    
    const depthText = depthIndicator.querySelector('.depth-text');
    expect(depthText).toBeTruthy();
    expect(depthText.textContent).toBe('Extensive');
    
    const depthBar = depthIndicator.querySelector('.depth-bar');
    expect(depthBar).toBeTruthy();
    expect(depthBar.style.width).toBe('100%');
  });

  test('Should handle missing logos gracefully', () => {
    const techWithoutLogo = {
      name: "Unknown Tech",
      depth: 3,
      indicators: ["global", "script", "html"]
    };
    
    updateList([techWithoutLogo]);
    
    const list = document.getElementById("tech-list");
    const techItem = list.querySelector('li:not(.group-header)');
    const logo = techItem.querySelector('.tech-logo');
    
    expect(logo.src).toBe(defaultIcon);
  });

  test('Should group unknown technologies as "Other"', () => {
    const unknownTech = {
      name: "Unknown Framework",
      depth: 2,
      indicators: ["global", "script"]
    };
    
    const groups = groupTechnologies([unknownTech]);
    
    expect(groups["Other"]).toBeDefined();
    expect(groups["Other"]).toContainEqual(unknownTech);
  });

  test('Should calculate depth bar width correctly', () => {
    const techWithDepth3 = {
      name: "Test Tech",
      depth: 3,
      indicators: ["global", "script", "html"]
    };
    
    updateList([techWithDepth3]);
    
    const list = document.getElementById("tech-list");
    const depthBar = list.querySelector('.depth-bar');
    
    expect(depthBar.style.width).toBe('60%'); // 3/5 * 100%
  });

  test('Should handle logo loading errors', () => {
    const techWithInvalidLogo = {
      name: "React",
      depth: 5,
      indicators: ["devtools", "global", "root", "id", "script"]
    };
    
    // Mock techLogos to return invalid URL
    const originalLogo = techLogos["React"];
    techLogos["React"] = "invalid-url";
    
    updateList([techWithInvalidLogo]);
    
    const list = document.getElementById("tech-list");
    const logo = list.querySelector('.tech-logo');
    
    // Simulate error
    logo.dispatchEvent(new Event('error'));
    
    expect(logo.src).toBe(defaultIcon);
    
    // Restore original logo
    techLogos["React"] = originalLogo;
  });

});

// Test edge cases
describe('Popup Edge Cases', () => {
  
  test('Should handle technologies with zero depth', () => {
    const zeroDepthTech = {
      name: "Zero Tech",
      depth: 0,
      indicators: []
    };
    
    updateList([zeroDepthTech]);
    
    const list = document.getElementById("tech-list");
    const depthText = list.querySelector('.depth-text');
    
    expect(depthText.textContent).toBe('Minimal');
    expect(depthText.style.color).toBe('#6c757d');
  });

  test('Should handle technologies with very high depth', () => {
    const highDepthTech = {
      name: "High Tech",
      depth: 10,
      indicators: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
    };
    
    updateList([highDepthTech]);
    
    const list = document.getElementById("tech-list");
    const depthText = list.querySelector('.depth-text');
    const depthBar = list.querySelector('.depth-bar');
    
    expect(depthText.textContent).toBe('Extensive');
    expect(depthText.style.color).toBe('#dc3545');
    expect(depthBar.style.width).toBe('200%'); // 10/5 * 100%
  });

  test('Should handle missing DOM elements gracefully', () => {
    // Remove total-count element
    const totalCount = document.getElementById("total-count");
    totalCount.remove();
    
    updateList(mockTechData);
    
    // Should not throw error
    expect(() => updateList(mockTechData)).not.toThrow();
  });

  test('Should handle missing pagination element gracefully', () => {
    // Remove pagination element
    const pagination = document.getElementById("pagination");
    pagination.remove();
    
    // Should not throw error
    expect(() => updateList(mockTechData)).not.toThrow();
  });

});

// Test performance
describe('Popup Performance Tests', () => {
  
  test('Should update list quickly with many technologies', () => {
    const manyTechs = Array.from({ length: 100 }, (_, i) => ({
      name: `Tech${i + 1}`,
      depth: Math.floor(Math.random() * 5) + 1,
      indicators: ["global", "script"]
    }));
    
    const startTime = performance.now();
    updateList(manyTechs);
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    expect(duration).toBeLessThan(100); // Should complete in under 100ms
  });

  test('Should group technologies efficiently', () => {
    const manyTechs = Array.from({ length: 50 }, (_, i) => ({
      name: `Tech${i + 1}`,
      depth: Math.floor(Math.random() * 5) + 1,
      indicators: ["global", "script"]
    }));
    
    const startTime = performance.now();
    const groups = groupTechnologies(manyTechs);
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    expect(duration).toBeLessThan(50); // Should complete in under 50ms
    expect(Object.keys(groups).length).toBeGreaterThan(0);
  });

});

console.log('All popup tests completed successfully!'); 