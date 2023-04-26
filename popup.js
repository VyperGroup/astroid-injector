document.addEventListener('DOMContentLoaded', function() {
    var status = document.getElementById('status');
  
    // Set default value
    status.textContent = 'Injected: No';
  
    // Add event listener to inject button
    document.getElementById('inject').addEventListener('click', function() {
      var url = document.getElementById('url').value;
      if (url) {
        if (url.endsWith('/')) {
            localStorage.setItem('injected_url', url + "worksheets/search.html");
            status.textContent = 'Injected: Yes';
            chrome.runtime.sendMessage({status: 'yes'});
          } else {
            localStorage.setItem('injected_url', url + "/worksheets/search.html");
            status.textContent = 'Injected: Yes';
            chrome.runtime.sendMessage({status: 'yes'});
          }
      }
    });
  
    // Add event listener to remove button

    document.getElementById("uninject").addEventListener("click", function () {
        localStorage.removeItem("injected_url");
        status.innerText = "Injected: No";
        chrome.runtime.sendMessage({status: 'no'});
      });
  
    // Check if injected URL is set
    if (localStorage.getItem('injected_url')) {
      status.textContent = 'Injected: Yes';
    }
  });
  