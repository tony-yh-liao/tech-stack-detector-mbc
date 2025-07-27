# Tech Stack Detector Chrome Extension

A Chrome extension that detects frameworks, libraries, and technologies used on websites. The extension provides detailed analysis with depth indicators, groups technologies by domain, and offers a paginated interface for easy browsing.

## Features

- **Comprehensive Technology Detection**: Detects 40+ popular web technologies
- **Depth Analysis**: Shows how extensively each technology is used on the website
- **Visual Indicators**: Color-coded depth bars and descriptive labels
- **Technology Logos**: Visual icons for each detected technology
- **Grouped Display**: Technologies organized by domain (Frontend Frameworks, CSS Frameworks, etc.)
- **Pagination**: Handles large numbers of detected technologies efficiently
- **Loading States**: Visual feedback during scanning
- **Accurate Detection**: Multiple validation methods to reduce false positives

## Detected Technologies

### Frontend Frameworks
- React, Vue.js, Angular, Next.js, Nuxt.js, Svelte, Alpine.js, Ember.js, Backbone.js, Knockout.js, Meteor

### CSS Frameworks
- Tailwind CSS, Bootstrap, Foundation CSS, Bulma CSS, Material-UI, Ant Design

### Libraries & Utilities
- jQuery, Lodash, Moment.js, Axios, Socket.io, TypeScript, Redux, MobX, Zustand

### Data & APIs
- GraphQL, Apollo Client, React Query, SWR

### Styling & Animation
- Styled Components, Emotion, Framer Motion

### Build Tools
- Vite, Webpack, Rollup, Parcel

### Code Quality
- ESLint, Prettier

### Testing
- Jest, Cypress, Storybook

### Analytics & Monitoring
- Google Analytics, Google Tag Manager, Hotjar, Mixpanel, Segment, Sentry, LogRocket, FullStory, Amplitude, PostHog, Plausible Analytics, Fathom Analytics

### Infrastructure & Hosting
- Cloudflare, AWS (CloudFront/S3), Vercel, Netlify

### Backend & Services
- Firebase

### Payment Processing
- Stripe, PayPal

### E-commerce
- Shopify, WooCommerce, Magento, BigCommerce

### Content Management
- WordPress, Drupal, Joomla, Ghost, Contentful, Sanity, Strapi, Prismic

### Website Builders
- Wix, Squarespace, Webflow

### Marketing & Communication
- HubSpot, Mailchimp, Intercom, Drift, Optimizely

### Data Visualization
- Chart.js, D3.js, Three.js

## Installation

### For Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tech-detector-final
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Load the extension in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked" and select the project directory

4. **Test the extension**
   - Click the extension icon in your browser toolbar
   - Visit any website and click "Rescan Page" to detect technologies

### For Production

1. **Build the extension**
   ```bash
   npm run build
   ```

2. **Load the extension in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked" and select the project directory

## Testing

The project includes comprehensive unit tests for all major functionality.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test files
npm run test:content    # Content script tests
npm run test:popup      # Popup tests
```

### Test Coverage

The test suite covers:

- **Content Script (`content.js`)**
  - Technology detection accuracy
  - Multiple validation methods
  - Edge cases and error handling
  - Performance with large datasets

- **Popup Script (`popup.js`)**
  - UI updates and rendering
  - Technology grouping and pagination
  - Depth analysis and visual indicators
  - Logo loading and error handling

- **Background Script (`background.js`)**
  - Message handling between scripts
  - State management
  - Error handling and edge cases

### Test Structure

```
tests/
├── content.test.js      # Content script tests
├── popup.test.js        # Popup functionality tests
├── background.test.js    # Background script tests
└── setup.js            # Jest configuration and mocks
```

## Development

### Project Structure

```
tech-detector-final/
├── manifest.json        # Extension manifest
├── content.js          # Content script for detection
├── popup.js            # Popup UI logic
├── popup.html          # Popup HTML structure
├── styles.css          # Popup styling
├── background.js       # Background service worker
├── package.json        # Dependencies and scripts
├── tests/              # Test files
│   ├── content.test.js
│   ├── popup.test.js
│   ├── background.test.js
│   └── setup.js
└── README.md           # This file
```

### Key Components

#### Content Script (`content.js`)
- Performs technology detection on web pages
- Uses multiple validation methods for accuracy
- Returns depth analysis for each detected technology
- Handles edge cases and error scenarios

#### Popup Script (`popup.js`)
- Manages popup UI and user interactions
- Groups technologies by domain
- Implements pagination for large datasets
- Handles logo loading and error fallbacks

#### Background Script (`background.js`)
- Manages communication between content and popup scripts
- Maintains state of detected technologies
- Handles message routing and error handling

### Adding New Technologies

To add a new technology for detection:

1. **Add detection logic in `content.js`**
   ```javascript
   {
     name: "New Technology",
     test: () => {
       const indicators = [];
       
       // Strong indicators
       if (window.newTech) indicators.push('global');
       if (document.querySelector('[data-newtech]')) indicators.push('attributes');
       
       // Script validation
       const scripts = Array.from(document.querySelectorAll('script')).filter(s => 
         s.src && s.src.includes('newtech')
       );
       if (scripts.length > 0) indicators.push('script');
       
       return {
         detected: indicators.length >= 2,
         depth: indicators.length,
         indicators: indicators
       };
     }
   }
   ```

2. **Add logo in `popup.js`**
   ```javascript
   const techLogos = {
     // ... existing logos
     "New Technology": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/newtech/newtech-original.svg"
   };
   ```

3. **Add to appropriate group in `popup.js`**
   ```javascript
   const techGroups = {
     "Appropriate Group": ["Existing Tech", "New Technology"]
   };
   ```

4. **Write tests in `tests/content.test.js`**
   ```javascript
   test('New Technology detection should work correctly', () => {
     // Test implementation
   });
   ```

## Performance

The extension is optimized for performance:

- **Efficient Detection**: Uses targeted selectors and validation
- **Lazy Loading**: Logos load on demand with fallbacks
- **Pagination**: Handles large datasets without UI lag
- **Memory Management**: Proper cleanup and state management

## Browser Compatibility

- Chrome 88+
- Edge 88+ (Chromium-based)
- Other Chromium-based browsers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## Testing Guidelines

### Writing Tests

- **Test all edge cases**: null values, undefined, malformed data
- **Test performance**: Large datasets, rapid updates
- **Test error handling**: Network failures, missing elements
- **Test user interactions**: Button clicks, pagination, rescan

### Test Coverage

- **Unit tests**: Individual functions and components
- **Integration tests**: Script communication and data flow
- **Performance tests**: Large datasets and rapid operations
- **Error handling tests**: Edge cases and failure scenarios

### Running Tests

```bash
# Quick test run
npm test

# Detailed coverage report
npm run test:coverage

# Watch mode for development
npm run test:watch
```

## Troubleshooting

### Common Issues

1. **Extension not detecting technologies**
   - Check browser console for errors
   - Ensure the extension has proper permissions
   - Try refreshing the page and rescanning

2. **Tests failing**
   - Run `npm install` to ensure dependencies are installed
   - Check that Jest is properly configured
   - Verify test environment setup

3. **Performance issues**
   - Check for memory leaks in content script
   - Verify pagination is working correctly
   - Monitor network requests for logo loading

### Debug Mode

Enable debug logging by adding to `content.js`:
```javascript
console.log('Debug: Technology detection running');
```

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions:
- Create an issue on GitHub
- Check the troubleshooting section
- Review the test suite for examples

---

**Note**: This extension is designed for educational and development purposes. Always respect website terms of service and privacy policies when using technology detection tools. 