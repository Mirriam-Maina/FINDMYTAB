document.addEventListener('DOMContentLoaded', ()=>{
    const onclick = () => {
        const tabToSearch = document.getElementById('tab').value;
        chrome.windows.getAll({populate:true},(windows) => {
            windows.forEach((window)=>{
              window.tabs.forEach((tab)=>{
                if(tab.url.includes(tabToSearch+".com") || tab.url.includes(tabToSearch)){
                  chrome.tabs.move(tab.id,{'index': -1});
                 chrome.tabs.update(tab.id, {highlighted: true});
                }
              });
            });
          });
    }

    const closeTabs = () => {
      const tabToClose = document.getElementById('tab').value;
      chrome.windows.getAll({populate:true},(windows) => {
        windows.forEach((window)=>{
         window.tabs.forEach((tab)=>{
            if(tab.url.includes(tabToClose+".com") || tab.url.includes(tabToClose)){
              chrome.tabs.remove(tab.id)
            }
          });
        });
      });
    }

    document.getElementById('search-button').addEventListener('click', onclick);
    document.getElementById('tab').addEventListener('keypress', (e)=>{
      const key = e.which || e.keyCdode;
      if(key === 13){
        onclick();
      }
    })
    document.getElementById('close-button').addEventListener('click', closeTabs);
})