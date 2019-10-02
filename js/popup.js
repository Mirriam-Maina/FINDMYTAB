document.addEventListener('DOMContentLoaded', ()=>{
    const onclick = () => {
        const tabToSearch = document.getElementById('tab').value;
        chrome.windows.getAll({populate:true},(windows) => {
            windows.forEach((window)=>{
              const allTabs = window.tabs;
              if(!allTabs.includes(tabToSearch)){
                document.getElementById('error').classList.remove('error');
                document.getElementById('error').classList.add('show');
              }
              window.tabs.forEach((tab)=>{
                if(tab.url.includes(tabToSearch+".com") || tab.url.includes(tabToSearch)){
                  chrome.tabs.move(tab.id,{'index': -1});
                 chrome.tabs.highlight({'tabs':tab.id});
                }
              });
            });
          });
    }

    const closeTabs = () => {
      const tabToClose = document.getElementById('tab').value;
      chrome.windows.getAll({populate:true},(windows) => {
        windows.forEach((window)=>{
          const allTabs = window.tabs;
          if(!allTabs.includes(tabToClose)){
            document.getElementById('error').classList.remove('error');
            document.getElementById('error').classList.add('show');
          }
         allTabs.forEach((tab)=>{
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