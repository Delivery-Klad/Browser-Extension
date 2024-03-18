const button = document.getElementById("test-button");
button.addEventListener("click",() => {
    chrome.tabs.query({active: true}, (tabs) => {  // need "scripting", "activeTab" manifest permissions
        const tab = tabs[0];
        if (tab) {
            chrome.scripting.executeScript(
                {
                    target:{tabId: tab.id, allFrames: true},
                    func:test1
                },
                test2
            )
        } else {
            alert("There are no active tabs")
        }
    })
})

function test1() {
    console.log("test 1");
    return true;
}

function test2() {
    console.log("test 2");
    return true;
}