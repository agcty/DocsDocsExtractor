const the_tab_id = "";
let submitted = false;

function startExtraction(tab) {
  //   // Set icon
  chrome.browserAction.setIcon({
    path: "icons/logo.png",
    tabId: tab.id,
  });

  //   // Pass variable & execute script
  //   chrome.tabs.executeScript({
  //     code: 'var extension_status = "' + status + '"',
  //   });
  chrome.tabs.executeScript({ file: "extract.js" });
  // Set the tab id
  the_tab_id = tab.id;
}

function my_listener(tabId, changeInfo, tab) {
  // If updated tab matches this one
  if (
    changeInfo.status == "complete" &&
    tabId == the_tab_id &&
    status == "on"
  ) {
    alert("here");
    // startExtraction(tab);
  }
}

chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.executeScript({ file: "extract.js" });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (
    tab.url.includes("docsdocs.net") &&
    changeInfo.url === undefined &&
    tab.status === "complete"
  ) {
    submitted = true;
    chrome.tabs.executeScript(tabId, { file: "extract.js" });
  }
});
