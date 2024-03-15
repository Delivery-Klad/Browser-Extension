var observer=null;

function print(string) {
    console.log("[Extension]: " + string);
}

function init() {
    chrome.storage.local.get(null, function(value) {
        if (observer === null) {
            observer = new MutationObserver(remove_shorts_block);
            observer.observe(document.getElementById("content"), {childList:true, subtree:true});
        }
        else {
            observer = null;
            observer.disconnect();
        }
        document.body.classList.add("shorts-blocker");
    });
}

function remove_shorts_block() {
    print("remover called");
    var elements = document.querySelectorAll("#dismissible.ytd-rich-shelf-renderer, #dismissible.ytd-shelf-renderer");
    if (elements.length <= 1) { return; }
    elements.forEach(element => {
        var objects = element.querySelectorAll("#dismissible #details");
        if (objects.length == 0) { return; }

        objects.forEach(href => {
            var a_tag = href.querySelector("a");
            if (a_tag === null) { return; }
            if (a_tag.href.includes("shorts") === false) { return; }
        });

        element.remove();
    });
    print("Shorts removed from subscriptions");
}

print("init");
init();