import conohawp from './conohawp';

// clear image_url on localStorace
const clear = function() {
    console.log("clear");
    localStorage.removeItem("wp_image_url");
    const bg = document.querySelector(".bg-all");
    bg.setAttribute('style', "background-image: url(https://manage.conoha.jp/Content/Images/ConoHa/ConoHaMode/bg_conoha.jpg); opacity: 1;");
}

const replace = function(url) {
    // store image_url into localStorace
    localStorage.setItem("wp_image_url",url);

    // replace wallpaper
    const bg = document.querySelector(".bg-all");
    bg.setAttribute('style', "background-image: url(" + url + "); opacity: 1;");
}

// Enable page action button and add event handler 
chrome.runtime.sendMessage({}, function(response) {});

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if(msg.action == "replace") {
	replace(msg.url);
    } else if(msg.action == "clear") {
	clear();
    }
});

// Add inline CSS clearing original background image
const url = localStorage.getItem("wp_image_url");
if(url != null) {
    var s = document.createElement ("style");
    var rule = document.createTextNode('.bg-all { opacity: 0; }');
    s.media = 'screen';
    s.type = 'text/css';
    s.appendChild(rule);
    document.documentElement.appendChild(s);
}

// Restore wallpapre after DOM loaded
document.addEventListener("DOMContentLoaded", function(e) {
    const url = localStorage.getItem("wp_image_url");
    if(url != null) {
	replace(url)
    }
});

