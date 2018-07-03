import conohawp from './conohawp';

const replace = function(url) {
    // store image_url into localStorace
    localStorage.setItem("wp_image_url",url);

    // replace wallpaper
    const bg = document.querySelector(".bg-all");
    bg.style.backgroundImage = "url(" + url + ")";
}

// Enable page action button and add event handler 
chrome.runtime.sendMessage({}, function(response) {});

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    replace(msg.url);
});

// Restore wallpapre
const url = localStorage.getItem("wp_image_url");
if(url != null) {
    replace(url)
}

