const injectScript = jsPath => {
  const temp = document.createElement('script');
  temp.setAttribute('type', 'text/javascript');
  temp.src = chrome.extension.getURL(jsPath);
  temp.onload = () => {
    temp.parentNode.removeChild(temp);
  };
  document.head.appendChild(temp);
};

injectScript('js/injectScript.js');
