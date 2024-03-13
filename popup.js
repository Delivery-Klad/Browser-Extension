const button = document.getElementById("test-button");
console.log(button);
button.addEventListener("click",() => {
    chrome.tabs.query({active: true}, (tabs) => {
        const tab = tabs[0];
        if (tab) {
            alert(tab.id)
        } else {
            alert("There are no active tabs")
        }
    })
})