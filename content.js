chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.url) {
      var iframe = document.createElement("iframe");
      iframe.src = message.url;
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      document.body.appendChild(iframe);
    }
  });
  