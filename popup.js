document.addEventListener("DOMContentLoaded", function() { // execute when page loaded
    textarea.addEventListener('change', function() {
        var textsave = document.getElementById('textarea').value;
        var textsave = JSON.stringify(textsave);
        localStorage.setItem("textsave", textsave); // set value to storage key - textsave
        window.close(); // window close first to reload 
    });
});

function gettext() {
    let gettextarea = localStorage.getItem("textsave"); // get from local stroage
    let parsetext = JSON.parse(gettextarea);
    var textarea = document.getElementById('textarea');
    textarea.value = parsetext; //put back to text area
}
gettext();
// execute function if link is match 
document.addEventListener("DOMContentLoaded", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => { //get current tab url
        var tab = tabs[0];
        var url = new URL(tab.url);
        var domain = url.hostname; //match with hostname 
        var textarea = document.getElementById('textarea').value;
        if (textarea != '' && textarea.indexOf(domain) != -1) { // empty or match the name
            edit_econtent(); //execute function
            edit_product();
        } else {
            console.log("URL not match");
        }
    });
});
contentzone_statepersistant(); //make the button state persistant
product_statepersistant();

//set for content script listen to the event and change in the text box 
document.addEventListener("DOMContentLoaded", function() {
    textarea.addEventListener('change', function() {
        var textsave = document.getElementById('textarea').value;
        var savedtext = JSON.stringify(textsave);
        chrome.storage.local.set({
            savedtext: savedtext
        }, function() {
            chrome.tabs.executeScript({
                file: "content.js"
            });
        });
    });
});

//for edit econtent zone 
function edit_econtent() {
    var checkbox_econtentzone = document.querySelector('input[id="switch2"]'); //get the check box, the specific id 
    checkbox_econtentzone.addEventListener('change', function() { //listen checkbox change event
        if (checkbox_econtentzone.checked == true) { //is checked
            const contentzone_btnEnable = true; // declare the btn is true is mean enable
            chrome.storage.local.set({ contentzone_btnEnable }); // set to the storage
            chrome.tabs.query({ currentWindow: true, active: true }, tabs => { // get all the active tabs and send a msg to activetabs 
                tabs.forEach(tab =>
                    chrome.tabs.sendMessage(tab.id, { contentzone_btnEnable }) // send to background page
                );
            });
        } else {
            const contentzone_btnEnable = false; // declare the btn is true is mean disable
            chrome.storage.local.set({ contentzone_btnEnable }); // set to the storage
            chrome.tabs.query({ currentWindow: true, active: true }, tabs => { // get all the active tabs and send a msg to activetabs 
                tabs.forEach(tab =>
                    chrome.tabs.sendMessage(tab.id, { contentzone_btnEnable }) // send to background page
                );
            });
        }
    });
}

//after listen above, make the state persistant
function contentzone_statepersistant() {
    chrome.storage.local.get(['contentzone_btnEnable'], function(items_zone) {
        var zonecheckbox = document.querySelector('input[id="switch2"]');
        if (items_zone.contentzone_btnEnable == true) {
            if (!zonecheckbox.checked) {
                zonecheckbox.click();
            }
        }
    });
}
// for edit product button 
function edit_product() { //listen to the pop up
    var checkbox = document.querySelector('input[type=checkbox]'); //get the check box
    checkbox.addEventListener('change', function() { //listen checkbox change event, either check or uncheck
        if (checkbox.checked == true) { //is checked
            const btnEnable = true; // declare the btn is true is mean enable
            chrome.storage.local.set({ btnEnable }); // set to the storage
            chrome.tabs.query({ currentWindow: true, active: true }, tabs => { // get all the active tabs and send a msg to activetabs 
                tabs.forEach(tab =>
                    chrome.tabs.sendMessage(tab.id, { btnEnable }) // send to background page
                );
            });
        } else {
            const btnEnable = false; // declare the btn is true is mean disable
            chrome.storage.local.set({ btnEnable }); // set to the storage
            chrome.tabs.query({ currentWindow: true, active: true }, tabs => { // get all the active tabs and send a msg to activetabs 
                tabs.forEach(tab =>
                    chrome.tabs.sendMessage(tab.id, { btnEnable }) // send to background page
                );
            });
        }
    });
}

function product_statepersistant() {
    //after listen above, make the state persistant
    chrome.storage.local.get(['btnEnable'], function(items) {
        // console.log('Settings retrieved', items);
        var checkbox = document.querySelector('input[type=checkbox]'); //maybe change to check the list
        if (items.btnEnable == true) {
            if (!checkbox.checked) {
                checkbox.click();
            }
        }
    });
}