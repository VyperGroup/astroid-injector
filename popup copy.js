function injectUrl() {
    var url = document.getElementById("url").value;
    if (url === "") {
      document.getElementById("status").textContent = "Injected: No";
      localStorage.removeItem("injected_url");
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {status: "no"});
      });
    } else {
      localStorage.setItem("injected_url", url);
      document.getElementById("status").textContent = "Injected: Yes";
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {status: "yes"});
      });
    }
  }
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.url) {
      var iframe = document.createElement("iframe");
      iframe.src = message.url;
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      document.body.appendChild(iframe);
    }
    if (message.status) {
      var status = document.getElementById("status");
      if (message.status === "yes") {
        status.textContent = "Injected: Yes";
        status.style.color = "green";
      } else {
        status.textContent = "Injected: No";
        status.style.color = "red";
      }
    }
  });
  