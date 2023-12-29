let saveBtn = document.querySelector("#savebtn");
let saveTab = document.querySelector("#savetab");
let message = document.querySelector("#message");
let delBtn = document.querySelector("#delbtn");
let linkDisplay = document.querySelector(".savedlinks");
let savedLinks = [];
let inputEl = document.querySelector("#input-el")

//load saved links from local storage and render it immediately the user activates the extension
if (localStorage.getItem("myLinks")) {
    savedLinks = JSON.parse(localStorage.getItem("myLinks"));
    render(savedLinks);
};

//what happens when the save link button is clicked
saveBtn.addEventListener("click", function () {
    console.log("Save Link Button was Clicked!");
    //clear the error message if it was there before
    message.innerHTML = '';
    //check if the recently inputted value is in the array or if the input was empty
    if (inputEl.value === "" || inputEl.value === " ") {
        message.innerHTML = "<p class='error'>An input is required!</p>";
    } else {
        if (inputEl.value.includes("https://")) {
            if (savedLinks.includes(inputEl.value)) {
                message.innerHTML = "<p class='error'>The link was already saved!</p>";
                inputEl.value = " ";
            } else {
                savedLinks.push(inputEl.value);
                //save the array to local storage so as to get the previously saved files
                localStorage.setItem("myLinks", JSON.stringify(savedLinks));
                render(savedLinks);
                inputEl.value = " ";
            }
        } else {
            message.innerHTML = "<p class='error'>Please input a valid Url!</p>"
        }
    }
});

//the function renders any array on the page
function render(links) {
    let text = ''
    for (let i = 0; i < links.length; i++) {
        text += `<a target='_blank' href="${links[i]}"><p>${links[i]}</p></a>`;
    };
    console.log(text)
    linkDisplay.innerHTML = text;
};

//what happens when the save tab button is clicked
saveTab.addEventListener("dblclick", function () {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        let activeTab = tabs[0].url;
        if (savedLinks.includes(activeTab)) {
            message.innerHTML = "<p class='error'>The link was already saved!</p>";
        } else {
            savedLinks.push(activeTab);
            localStorage.setItem("myLinks", JSON.stringify(savedLinks));
            render(savedLinks);
        } 
    })
});

//what happens when the delete all button is clicked
delBtn.addEventListener("click", function () {
    localStorage.clear();
    savedLinks = [];
    render(savedLinks);
});
