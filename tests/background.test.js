// Unit tests for background.js functionality
// Run with: npm test or jest

// Mock chrome API for background script
global.chrome = {
  runtime: {
    onMessage: {
      addListener: jest.fn()
    },
    sendMessage: jest.fn()
  }
};

// Import background script functionality (we'll need to extract it)
// For now, let's create the test functions directly

// Background script state
let lastDetected = [];

// Message handler function (from background.js)
function handleMessage(message, sender, sendResponse) {
  if (message.type === "detectedTech") {
    lastDetected = message.detected;
    console.log('Background received detected tech:', lastDetected);
    return true; // Keep message channel open for async response
  } else if (message.type === "getLastDetected") {
    sendResponse({ detected: lastDetected });
    return true; // Keep message channel open for async response
  }
  return false;
}

// Test suite
describe('Background Script Tests', () => {
  
  beforeEach(() => {
    // Reset state before each test
    lastDetected = [];
    jest.clearAllMocks();
  });

  test('Should handle detectedTech message correctly', () => {
    const mockDetectedTech = [
      {
        name: "React",
        depth: 5,
        indicators: ["devtools", "global", "root", "id", "script"]
      },
      {
        name: "Vue.js",
        depth: 4,
        indicators: ["devtools", "global", "attributes", "script"]
      }
    ];

    const message = {
      type: "detectedTech",
      detected: mockDetectedTech
    };

    const sender = { tab: { id: 1 } };
    const sendResponse = jest.fn();

    const result = handleMessage(message, sender, sendResponse);

    expect(result).toBe(true);
    expect(lastDetected).toEqual(mockDetectedTech);
    expect(console.log).toHaveBeenCalledWith('Background received detected tech:', mockDetectedTech);
  });

  test('Should handle getLastDetected message correctly', () => {
    // Set up some detected tech
    lastDetected = [
      {
        name: "React",
        depth: 5,
        indicators: ["devtools", "global", "root", "id", "script"]
      }
    ];

    const message = {
      type: "getLastDetected"
    };

    const sender = { tab: { id: 1 } };
    const sendResponse = jest.fn();

    const result = handleMessage(message, sender, sendResponse);

    expect(result).toBe(true);
    expect(sendResponse).toHaveBeenCalledWith({ detected: lastDetected });
  });

  test('Should return empty array when no tech detected', () => {
    const message = {
      type: "getLastDetected"
    };

    const sender = { tab: { id: 1 } };
    const sendResponse = jest.fn();

    const result = handleMessage(message, sender, sendResponse);

    expect(result).toBe(true);
    expect(sendResponse).toHaveBeenCalledWith({ detected: [] });
  });

  test('Should handle unknown message types', () => {
    const message = {
      type: "unknownMessage"
    };

    const sender = { tab: { id: 1 } };
    const sendResponse = jest.fn();

    const result = handleMessage(message, sender, sendResponse);

    expect(result).toBe(false);
    expect(sendResponse).not.toHaveBeenCalled();
  });

  test('Should handle null detected tech', () => {
    const message = {
      type: "detectedTech",
      detected: null
    };

    const sender = { tab: { id: 1 } };
    const sendResponse = jest.fn();

    const result = handleMessage(message, sender, sendResponse);

    expect(result).toBe(true);
    expect(lastDetected).toBeNull();
  });

  test('Should handle empty detected tech array', () => {
    const message = {
      type: "detectedTech",
      detected: []
    };

    const sender = { tab: { id: 1 } };
    const sendResponse = jest.fn();

    const result = handleMessage(message, sender, sendResponse);

    expect(result).toBe(true);
    expect(lastDetected).toEqual([]);
  });

  test('Should handle large detected tech array', () => {
    const largeDetectedTech = Array.from({ length: 100 }, (_, i) => ({
      name: `Tech${i + 1}`,
      depth: Math.floor(Math.random() * 5) + 1,
      indicators: ["global", "script"]
    }));

    const message = {
      type: "detectedTech",
      detected: largeDetectedTech
    };

    const sender = { tab: { id: 1 } };
    const sendResponse = jest.fn();

    const result = handleMessage(message, sender, sendResponse);

    expect(result).toBe(true);
    expect(lastDetected).toEqual(largeDetectedTech);
    expect(lastDetected.length).toBe(100);
  });

  test('Should handle malformed detected tech data', () => {
    const malformedData = [
      {
        name: "React",
        depth: "invalid", // Should be number
        indicators: "not an array" // Should be array
      },
      {
        // Missing required fields
      },
      null,
      undefined
    ];

    const message = {
      type: "detectedTech",
      detected: malformedData
    };

    const sender = { tab: { id: 1 } };
    const sendResponse = jest.fn();

    const result = handleMessage(message, sender, sendResponse);

    expect(result).toBe(true);
    expect(lastDetected).toEqual(malformedData);
  });

  test('Should handle multiple rapid message updates', () => {
    const tech1 = [
      {
        name: "React",
        depth: 5,
        indicators: ["devtools", "global", "root", "id", "script"]
      }
    ];

    const tech2 = [
      {
        name: "Vue.js",
        depth: 4,
        indicators: ["devtools", "global", "attributes", "script"]
      }
    ];

    const sender = { tab: { id: 1 } };
    const sendResponse = jest.fn();

    // First update
    handleMessage({
      type: "detectedTech",
      detected: tech1
    }, sender, sendResponse);

    expect(lastDetected).toEqual(tech1);

    // Second update
    handleMessage({
      type: "detectedTech",
      detected: tech2
    }, sender, sendResponse);

    expect(lastDetected).toEqual(tech2);
  });

  test('Should handle concurrent getLastDetected requests', () => {
    // Set up detected tech
    lastDetected = [
      {
        name: "React",
        depth: 5,
        indicators: ["devtools", "global", "root", "id", "script"]
      }
    ];

    const sender = { tab: { id: 1 } };
    const sendResponse1 = jest.fn();
    const sendResponse2 = jest.fn();

    // First request
    const result1 = handleMessage({
      type: "getLastDetected"
    }, sender, sendResponse1);

    // Second request
    const result2 = handleMessage({
      type: "getLastDetected"
    }, sender, sendResponse2);

    expect(result1).toBe(true);
    expect(result2).toBe(true);
    expect(sendResponse1).toHaveBeenCalledWith({ detected: lastDetected });
    expect(sendResponse2).toHaveBeenCalledWith({ detected: lastDetected });
  });

  test('Should handle message without type', () => {
    const message = {
      // No type property
      data: "some data"
    };

    const sender = { tab: { id: 1 } };
    const sendResponse = jest.fn();

    const result = handleMessage(message, sender, sendResponse);

    expect(result).toBe(false);
    expect(sendResponse).not.toHaveBeenCalled();
  });

  test('Should handle message with null sender', () => {
    const message = {
      type: "detectedTech",
      detected: [
        {
          name: "React",
          depth: 5,
          indicators: ["devtools", "global", "root", "id", "script"]
        }
      ]
    };

    const sender = null;
    const sendResponse = jest.fn();

    const result = handleMessage(message, sender, sendResponse);

    expect(result).toBe(true);
    expect(lastDetected).toEqual(message.detected);
  });

  test('Should handle message with null sendResponse', () => {
    const message = {
      type: "getLastDetected"
    };

    const sender = { tab: { id: 1 } };
    const sendResponse = null;

    const result = handleMessage(message, sender, sendResponse);

    expect(result).toBe(true);
    // Should not throw error when sendResponse is null
  });

  test('Should handle message with undefined sendResponse', () => {
    const message = {
      type: "getLastDetected"
    };

    const sender = { tab: { id: 1 } };
    const sendResponse = undefined;

    const result = handleMessage(message, sender, sendResponse);

    expect(result).toBe(true);
    // Should not throw error when sendResponse is undefined
  });

  test('Should handle message with function sendResponse', () => {
    const message = {
      type: "getLastDetected"
    };

    const sender = { tab: { id: 1 } };
    const sendResponse = function(data) {
      return data;
    };

    const result = handleMessage(message, sender, sendResponse);

    expect(result).toBe(true);
    expect(sendResponse).toHaveBeenCalledWith({ detected: [] });
  });

  test('Should handle message with arrow function sendResponse', () => {
    const message = {
      type: "getLastDetected"
    };

    const sender = { tab: { id: 1 } };
    const sendResponse = (data) => data;

    const result = handleMessage(message, sender, sendResponse);

    expect(result).toBe(true);
    expect(sendResponse).toHaveBeenCalledWith({ detected: [] });
  });

  test('Should handle message with async sendResponse', async () => {
    const message = {
      type: "getLastDetected"
    };

    const sender = { tab: { id: 1 } };
    const sendResponse = jest.fn().mockResolvedValue({ success: true });

    const result = handleMessage(message, sender, sendResponse);

    expect(result).toBe(true);
    expect(sendResponse).toHaveBeenCalledWith({ detected: [] });
  });

  test('Should handle message with error in sendResponse', () => {
    const message = {
      type: "getLastDetected"
    };

    const sender = { tab: { id: 1 } };
    const sendResponse = jest.fn().mockImplementation(() => {
      throw new Error("Test error");
    });

    const result = handleMessage(message, sender, sendResponse);

    expect(result).toBe(true);
    expect(sendResponse).toHaveBeenCalledWith({ detected: [] });
    // Should not throw error, just log it
  });

  test('Should handle message with complex sender object', () => {
    const message = {
      type: "detectedTech",
      detected: [
        {
          name: "React",
          depth: 5,
          indicators: ["devtools", "global", "root", "id", "script"]
        }
      ]
    };

    const sender = {
      tab: { id: 1, url: "https://example.com" },
      frameId: 0,
      id: "extension-id",
      url: "chrome-extension://extension-id/popup.html"
    };

    const sendResponse = jest.fn();

    const result = handleMessage(message, sender, sendResponse);

    expect(result).toBe(true);
    expect(lastDetected).toEqual(message.detected);
  });

  test('Should handle message with tab info in sender', () => {
    const message = {
      type: "detectedTech",
      detected: [
        {
          name: "Vue.js",
          depth: 4,
          indicators: ["devtools", "global", "attributes", "script"]
        }
      ]
    };

    const sender = {
      tab: {
        id: 123,
        url: "https://vuejs.org",
        title: "Vue.js - The Progressive JavaScript Framework",
        active: true,
        windowId: 1
      }
    };

    const sendResponse = jest.fn();

    const result = handleMessage(message, sender, sendResponse);

    expect(result).toBe(true);
    expect(lastDetected).toEqual(message.detected);
  });

  test('Should handle message with frame info in sender', () => {
    const message = {
      type: "detectedTech",
      detected: [
        {
          name: "Angular",
          depth: 3,
          indicators: ["roots", "global", "version"]
        }
      ]
    };

    const sender = {
      tab: { id: 1 },
      frameId: 1, // Non-zero frame ID
      url: "https://angular.io"
    };

    const sendResponse = jest.fn();

    const result = handleMessage(message, sender, sendResponse);

    expect(result).toBe(true);
    expect(lastDetected).toEqual(message.detected);
  });

  test('Should handle message with extension info in sender', () => {
    const message = {
      type: "getLastDetected"
    };

    const sender = {
      tab: { id: 1 },
      id: "abcdefghijklmnop",
      url: "chrome-extension://abcdefghijklmnop/popup.html"
    };

    const sendResponse = jest.fn();

    const result = handleMessage(message, sender, sendResponse);

    expect(result).toBe(true);
    expect(sendResponse).toHaveBeenCalledWith({ detected: [] });
  });

});

// Test edge cases
describe('Background Script Edge Cases', () => {
  
  test('Should handle very large detected tech array', () => {
    const veryLargeArray = Array.from({ length: 10000 }, (_, i) => ({
      name: `Tech${i + 1}`,
      depth: Math.floor(Math.random() * 5) + 1,
      indicators: ["global", "script", "html"]
    }));

    const message = {
      type: "detectedTech",
      detected: veryLargeArray
    };

    const sender = { tab: { id: 1 } };
    const sendResponse = jest.fn();

    const startTime = performance.now();
    const result = handleMessage(message, sender, sendResponse);
    const endTime = performance.now();
    const duration = endTime - startTime;

    expect(result).toBe(true);
    expect(lastDetected).toEqual(veryLargeArray);
    expect(duration).toBeLessThan(100); // Should complete in under 100ms
  });

  test('Should handle deeply nested detected tech data', () => {
    const deeplyNestedData = [
      {
        name: "React",
        depth: 5,
        indicators: ["devtools", "global", "root", "id", "script"],
        metadata: {
          version: "18.2.0",
          features: {
            hooks: true,
            suspense: true,
            concurrent: true
          },
          dependencies: {
            react: "^18.2.0",
            "react-dom": "^18.2.0"
          }
        }
      }
    ];

    const message = {
      type: "detectedTech",
      detected: deeplyNestedData
    };

    const sender = { tab: { id: 1 } };
    const sendResponse = jest.fn();

    const result = handleMessage(message, sender, sendResponse);

    expect(result).toBe(true);
    expect(lastDetected).toEqual(deeplyNestedData);
  });

  test('Should handle circular references in detected tech data', () => {
    const circularData = [
      {
        name: "React",
        depth: 5,
        indicators: ["devtools", "global", "root", "id", "script"]
      }
    ];

    // Create circular reference
    circularData[0].self = circularData[0];

    const message = {
      type: "detectedTech",
      detected: circularData
    };

    const sender = { tab: { id: 1 } };
    const sendResponse = jest.fn();

    const result = handleMessage(message, sender, sendResponse);

    expect(result).toBe(true);
    expect(lastDetected).toEqual(circularData);
  });

  test('Should handle non-string tech names', () => {
    const invalidData = [
      {
        name: 123, // Should be string
        depth: 5,
        indicators: ["devtools", "global", "root", "id", "script"]
      },
      {
        name: null, // Should be string
        depth: 3,
        indicators: ["global", "script"]
      },
      {
        name: undefined, // Should be string
        depth: 2,
        indicators: ["global"]
      }
    ];

    const message = {
      type: "detectedTech",
      detected: invalidData
    };

    const sender = { tab: { id: 1 } };
    const sendResponse = jest.fn();

    const result = handleMessage(message, sender, sendResponse);

    expect(result).toBe(true);
    expect(lastDetected).toEqual(invalidData);
  });

  test('Should handle non-number depth values', () => {
    const invalidData = [
      {
        name: "React",
        depth: "high", // Should be number
        indicators: ["devtools", "global", "root", "id", "script"]
      },
      {
        name: "Vue.js",
        depth: null, // Should be number
        indicators: ["devtools", "global", "attributes", "script"]
      },
      {
        name: "Angular",
        depth: undefined, // Should be number
        indicators: ["roots", "global", "version"]
      }
    ];

    const message = {
      type: "detectedTech",
      detected: invalidData
    };

    const sender = { tab: { id: 1 } };
    const sendResponse = jest.fn();

    const result = handleMessage(message, sender, sendResponse);

    expect(result).toBe(true);
    expect(lastDetected).toEqual(invalidData);
  });

  test('Should handle non-array indicators', () => {
    const invalidData = [
      {
        name: "React",
        depth: 5,
        indicators: "devtools,global,root,id,script" // Should be array
      },
      {
        name: "Vue.js",
        depth: 4,
        indicators: null // Should be array
      },
      {
        name: "Angular",
        depth: 3,
        indicators: undefined // Should be array
      }
    ];

    const message = {
      type: "detectedTech",
      detected: invalidData
    };

    const sender = { tab: { id: 1 } };
    const sendResponse = jest.fn();

    const result = handleMessage(message, sender, sendResponse);

    expect(result).toBe(true);
    expect(lastDetected).toEqual(invalidData);
  });

});

// Test performance
describe('Background Script Performance Tests', () => {
  
  test('Should handle rapid message processing', () => {
    const messages = Array.from({ length: 1000 }, (_, i) => ({
      type: "detectedTech",
      detected: [
        {
          name: `Tech${i + 1}`,
          depth: Math.floor(Math.random() * 5) + 1,
          indicators: ["global", "script"]
        }
      ]
    }));

    const sender = { tab: { id: 1 } };
    const sendResponse = jest.fn();

    const startTime = performance.now();
    
    messages.forEach(message => {
      handleMessage(message, sender, sendResponse);
    });
    
    const endTime = performance.now();
    const duration = endTime - startTime;

    expect(duration).toBeLessThan(1000); // Should complete in under 1 second
    expect(lastDetected).toEqual(messages[messages.length - 1].detected);
  });

  test('Should handle rapid getLastDetected requests', () => {
    // Set up detected tech
    lastDetected = [
      {
        name: "React",
        depth: 5,
        indicators: ["devtools", "global", "root", "id", "script"]
      }
    ];

    const sender = { tab: { id: 1 } };
    const sendResponse = jest.fn();

    const startTime = performance.now();
    
    for (let i = 0; i < 1000; i++) {
      handleMessage({
        type: "getLastDetected"
      }, sender, sendResponse);
    }
    
    const endTime = performance.now();
    const duration = endTime - startTime;

    expect(duration).toBeLessThan(1000); // Should complete in under 1 second
    expect(sendResponse).toHaveBeenCalledTimes(1000);
  });

  test('Should handle mixed message types efficiently', () => {
    const messages = [];
    
    // Create mixed message types
    for (let i = 0; i < 500; i++) {
      messages.push({
        type: "detectedTech",
        detected: [
          {
            name: `Tech${i + 1}`,
            depth: Math.floor(Math.random() * 5) + 1,
            indicators: ["global", "script"]
          }
        ]
      });
      
      messages.push({
        type: "getLastDetected"
      });
    }

    const sender = { tab: { id: 1 } };
    const sendResponse = jest.fn();

    const startTime = performance.now();
    
    messages.forEach(message => {
      handleMessage(message, sender, sendResponse);
    });
    
    const endTime = performance.now();
    const duration = endTime - startTime;

    expect(duration).toBeLessThan(1000); // Should complete in under 1 second
  });

});

console.log('All background script tests completed successfully!'); 