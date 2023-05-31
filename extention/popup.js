document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("toggleButton");
   
    

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tabId = tabs[0].id;
  
      chrome.storage.sync.get([tabId.toString()], function (result) {
        const isHighlightingEnabled = result[tabId.toString()] || false;
  
        if (isHighlightingEnabled) {
          toggleButton.textContent = "Disable Highlighting";
        } else {
          toggleButton.textContent = "Enable Highlighting";
        }
      });
    });
  
    toggleButton.addEventListener("click", function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const tabId = tabs[0].id;
  
        chrome.storage.sync.get([tabId.toString()], function (result) {
          const isHighlightingEnabled = result[tabId.toString()] || false;
          const newHighlightingState = !isHighlightingEnabled;
  
          chrome.storage.sync.set({ [tabId.toString()]: newHighlightingState }, function () {
            if (newHighlightingState) {
              toggleButton.textContent = "Disable Highlighting";
            } else {
              toggleButton.textContent = "Enable Highlighting";
            }
  
            chrome.tabs.sendMessage(tabId, { message: "toggleHighlighting", isEnabled: newHighlightingState });
          });
        });
      });
    });
  });
  
  