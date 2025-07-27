let lastDetected = [];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "detectedTech") {
    lastDetected = message.detected;
    console.log('Background received detected tech:', lastDetected);
  } else if (message.type === "getLastDetected") {
    sendResponse({ detected: lastDetected });
  }
});

chrome.runtime.onInstalled.addListener(() => {
  console.log("Tech Stack Detector installed.");
});