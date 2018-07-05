import conohawp from './conohawp';

const build_li_node = function(type) {
    const thumb_url = conohawp.thumb_url(type);
    
    const img = document.createElement("img");
    img.setAttribute("src", thumb_url);

    const anchor = document.createElement("a");
    anchor.setAttribute("data-wpurl", type)
    anchor.appendChild(img)
    anchor.addEventListener("click", function() {
	// replace wallpaper
	chrome.tabs.query({active: true, currentWindow: true}, tabs => {
	    chrome.tabs.sendMessage(tabs[0].id, { "action": "replace", "type": type });
	});
    });
    
    const li = document.createElement("li");
    li.appendChild(anchor);
    
    return li
}

const ul = document.querySelector("#backgrounds");
for(const type of conohawp.types()) {
    ul.appendChild(build_li_node(type));
}

const a = document.querySelector("#reset a")
a.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
	chrome.tabs.sendMessage(tabs[0].id, { "action": "clear" });
    });
});

