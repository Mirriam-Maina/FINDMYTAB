chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
    alert(request);
    chrome.tabs.update(sender.tab.id, {selected: true});
})