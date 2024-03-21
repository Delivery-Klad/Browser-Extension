var observer=null;
var sub_path = "/feed/subscriptions";
var watch_path = "/watch";


function print(content) {
    console.log("[Extension]: " + content);
}

function info(content) {
    console.log(content);
}

function init() {
    print("init");
    chrome.storage.local.get(null, function(value) {
        observer = new MutationObserver(remove_shorts_block);
        observer.observe(document.getElementById("content"), {childList:true, subtree:true});
    });
}

function remove_shorts_block(mutations, local_observer) {
    var skip = true;
    //var correct_mutation = null;
    for (var mutation of mutations) {
        if (mutation.target.id == "contents") {
            skip = false;
            //correct_mutation = mutation;
            break;
        }
    }
    if (skip == true) { return; }
    print("remover called");
    //info(correct_mutation);
    if (window.location.pathname == sub_path) {
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
        print("Shorts removed from subscriptions page");
    }
    else if (window.location.pathname.includes("/@") === true) {
        var elements = document.querySelectorAll("#tabsContent yt-tab-group-shape yt-tab-shape");
        if (elements.length <= 1) { return; }
        elements.forEach(element => {
            var objects = element.querySelectorAll(".yt-tab-shape-wiz__tab");
            if (objects.length == 0) { return; }
            if (objects[0].textContent.includes("Shorts") === true) {
                element.remove();
                return;
            }
        });
        print("Shorts removed from channel page");
    }
    else {
        print(window.location.pathname);
    }
}

init();
