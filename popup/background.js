chrome.commands.onCommand.addListener((command) => {
    if (command === 'transpose-up') {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'transpose', offset: 1 }, () => {});
      });
    } else if (command === 'transpose-down') {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'transpose', steps });
    });
  }
});
  