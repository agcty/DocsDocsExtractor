const the_tab_id = "";
let submitted = false;

chrome.browserAction.onClicked.addListener(function (tab) {
  // reset data first
  chrome.storage.local.set({ questiondata: [] }, function () {
    // then execute script
    chrome.tabs.executeScript({ file: "extract.js" });
    submitted = true;
  });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (
    tab.url.includes("docsdocs.net") &&
    changeInfo.url === undefined &&
    tab.status === "complete" &&
    submitted === true
  ) {
    chrome.tabs.executeScript(tabId, { file: "extract.js" });
  }
});
