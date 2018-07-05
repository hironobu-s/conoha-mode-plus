import conohawp from './conohawp';

// clear image_url on localStorace
const clear = function() {
    console.log("clear");
    localStorage.removeItem("wp_image_type");
    const bg = document.querySelector(".bg-all");
    bg.setAttribute('style', "background-image: url(https://manage.conoha.jp/Content/Images/ConoHa/ConoHaMode/bg_conoha.jpg); opacity: 1;");
}

const replace = function(type) {
    // store image_url into localStorace
    localStorage.setItem("wp_image_type", type);

    // replace wallpaper
    const width = window.parent.screen.width;
    const url = conohawp.image_url(type, width);
    const bg = document.querySelector(".bg-all");
    bg.setAttribute('style', "background-image: url(" + url + "); opacity: 1;");
}

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if(msg.action == "replace") {
	replace(msg.type);
    } else if(msg.action == "clear") {
	clear();
    }
});

// Add inline CSS clearing original background image
const url = localStorage.getItem("wp_image_type");
if(url != null) {
    var s = document.createElement ("style");
    var rule = document.createTextNode('.bg-all { opacity: 0; }');
    s.media = 'screen';
    s.type = 'text/css';
    s.appendChild(rule);
    document.documentElement.appendChild(s);
}

// content.js is loaded before rendering DOM(see manifest.js and run_at parameter)
// You should handle DOMContentLoaded event.
document.addEventListener("DOMContentLoaded", function(e) {
    // this variable represents whether conoha-mode is enabled
    let conoha_mode_enable = false
    for(const link of document.getElementsByTagName("link")) {
    	if(link.getAttribute("href").indexOf("conoHaMode") > 0) {
	    conoha_mode_enable = true
	    break
	}
    }
    if(conoha_mode_enable) {
	conoha_mode_enable = true
    }

    // skip if conoha-mode is disabled
    if(!conoha_mode_enable) {
	return
    }
    
    // Enable page action button and add event handler 
    chrome.runtime.sendMessage({});
    
    // Restore wallpapre that has been setted by conoha-mode-plus
    const type = localStorage.getItem("wp_image_type");
    if(type != null) {
	replace(type)
    }
});

