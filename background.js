chrome.tabs.onCreated.addListener(function(tab) {
    if (localStorage.getItem("injected_url")) {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tab.id === tabs[0].id) {
          chrome.tabs.update(tab.id, {url: chrome.extension.getURL("newtab.html")});
        }
      });
    }
  });
  
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.status === "yes") {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs[0].url === chrome.extension.getURL("newtab.html")) {
          chrome.tabs.executeScript(tabs[0].id, {code: 'document.getElementById("iframe").src = "' + localStorage.getItem("injected_url") + '";'});
        }
      });
    }
  });
  