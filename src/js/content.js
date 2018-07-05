import conohawp from './conohawp';

const replace = function(url) {
    // store image_url into localStorace
    localStorage.setItem("wp_image_url",url);

    // replace wallpaper
    const bg = document.querySelector(".bg-all");
    bg.setAttribute('style', "background-image: url(" + url + ") !important");
}

// Enable page action button and add event handler 
chrome.runtime.sendMessage({}, function(response) {});

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    replace(msg.url);
});

// Add inline CSS clearing original background image
var s = document.createElement ("style");
var rule = document.createTextNode('.bg-all { background-image: none !important; }');
s.media = 'screen';
s.type = 'text/css';
s.appendChild(rule);
document.documentElement.appendChild(s);

// Restore wallpapre after DOM loaded
document.addEventListener("DOMContentLoaded", function(e) {
    const url = localStorage.getItem("wp_image_url");
    if(url != null) {
	replace(url)
    }
});

