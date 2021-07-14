chrome.storage.local.get('savedtext', function(items) {
    var gettextarea = items.savedtext;
    var textarea = JSON.parse(gettextarea);
    var currenturl = window.location.hostname;
    if (textarea.indexOf(currenturl) != -1) {
        chrome.storage.local.get('contentzone_btnEnable', (response) => {
            if (response.contentzone_btnEnable == false) {
                disable_etcontentzonebutton();
            }
        });
        chrome.runtime.onMessage.addListener(request => {
            if (request.contentzone_btnEnable == false) {
                disable_etcontentzonebutton();
            }
        });
        chrome.storage.local.get('contentzone_btnEnable', (response) => {
            if (response.contentzone_btnEnable == true) {
                enable_etcontentzonebutton();
            }
        });
        chrome.runtime.onMessage.addListener(request => {
            if (request.contentzone_btnEnable == true) {
                var geteditbutton_contentzone = document.getElementsByClassName("etcontentzone_editbutton"); //get the button and count if less than one than add
                var count = geteditbutton_contentzone.length;
                if (count < 1) {
                    enable_etcontentzonebutton();

                }
            }
        });
        //edit produtct
        chrome.storage.local.get('btnEnable', (response) => {
            if (response.btnEnable == false) {
                disable_editproduct();
            }
        });
        chrome.runtime.onMessage.addListener(request => {
            if (request.btnEnable == false) {
                disable_editproduct();
            }
        });

        chrome.storage.local.get('btnEnable', (response) => {
            if (response.btnEnable == true) {
                editproduct();
            }
        });
        chrome.runtime.onMessage.addListener(request => {
            if (request.btnEnable == true) {
                var geteditbutton_product = document.getElementsByClassName("edit-button");
                var count = geteditbutton_product.length; //
                if (count < 1) {
                    editproduct();
                }
            }
        });
        //edit button -marketing campaign 
        chrome.storage.local.get('marketing_campaigns_btnEnable', (response) => {
            if (response.marketing_campaigns_btnEnable == false) {
                disable_edit_marketing_campaigns();
            }
        });
        chrome.runtime.onMessage.addListener(request => {
            if (request.marketing_campaigns_btnEnable == false) {
                disable_edit_marketing_campaigns();
            }
        });

        chrome.storage.local.get('marketing_campaigns_btnEnable', (response) => {
            if (response.marketing_campaigns_btnEnable == true) {
                edit_marketing_campaigns();
            }
        });
        chrome.runtime.onMessage.addListener(request => {
            if (request.marketing_campaigns_btnEnable == true) {
                var geteditbutton_marketing_campaigns = document.getElementsByClassName("campaigns_edit-button");
                var count = geteditbutton_marketing_campaigns.length; //
                if (count < 1) {
                    edit_marketing_campaigns();
                }

            }
        });

    }

});

//function for enable marketing campaigns 
function edit_marketing_campaigns() {
    var assests_image_array = [];
    var assets_ids = [];
    var assets_images = document.getElementsByTagName("img");
    for (var k = 0; k < assets_images.length; k++) {
        if (assets_images[k].hasAttribute("src")) {
            if (assets_images[k].getAttribute("src").includes("/assets/marketing/")) {
                assests_image_array.push(assets_images[k].getAttribute("src"));

            }
        }
    }
    for (var q = 0; q < assests_image_array.length; q++) {
        var assets_id = assests_image_array[q].substring(assests_image_array[q].lastIndexOf("/") + 1, assests_image_array[q].lastIndexOf("."));
        assets_ids.push(assets_id);
    }

    var uniqueid = [...new Set(assets_ids)];
    for (var z = 0; z < uniqueid.length; z++) {
        for (var t = 0; t < assets_images.length; t++) {
            if (assets_images[t].hasAttribute("src")) {
                if (assets_images[t].getAttribute("src").includes(uniqueid[z] + '.')) { //inclde the id and '.' e.g 60.
                    assets_images[t].closest("a").outerHTML += '<button class="campaigns_edit-button" style="display: inline-block;background: #d21db5;color: rgba(255, 255, 255, 255);font-size:22px;font-weight:bold;padding:2px 4px;text decoration:none;width: 40px;height: 40px;line-height: 40x;border-radius: 50%;text-align: center;border: solid 2px rgba(255, 255, 255, 0.47);transition: .4s;position:absolute;top:0px;left:0;right:0px;margin:50px;font-family: Arial;" onclick="window.open(\'/_cpanel/adw/view?id=' + uniqueid[z] + "')\">E</button>";
                }

            }
        }
    }
}
// function for disable - marketing campaigns //
function disable_edit_marketing_campaigns() {
    var alleditbutton = document.getElementsByClassName("campaigns_edit-button");
    while (alleditbutton.length > 0) {
        alleditbutton[0].parentNode.removeChild(alleditbutton[0]);
    }
}
// function for enable - econtent_button
function enable_etcontentzonebutton() {
    var contentzones = [];
    var spancontenzones = document.querySelectorAll("span[data-etcontentzone]");
    for (var p = 0; p < spancontenzones.length; p++) {
        contentzones.push(spancontenzones[p]);
    }
    var zone_id_array = [];
    for (var p = 0; p < contentzones.length; p++) {
        var zoneid = contentzones[p].getAttribute("data-etcontentzone"); //show the value of attribute data in the data-etcontentzone
        zone_id_array.push(zoneid);
        contentzones[p].innerHTML += '<button class="etcontentzone_editbutton" style=" display: inline-block; background: #d21db5;color: rgba(255, 255, 255, 255);font-size:22px;font-weight:bold;padding:2px 4px;text decoration:none;width: 40px;height: 40px;line-height: 40x;border-radius: 50%;text-align: center;border: solid 2px rgba(255, 255, 255, 0.47);z-index:1;transition: .4s;font-family: Arial;" onclick="window.open(\'/_cpanel/contentzones/view?id=' + zone_id_array[p] + '\')">E</button>';
    }
}

// function for disable - econtent_button
function disable_etcontentzonebutton() {
    var disable_etcontentzonebutton = document.getElementsByClassName("etcontentzone_editbutton");
    while (disable_etcontentzonebutton.length > 0) {
        disable_etcontentzonebutton[0].parentNode.removeChild(disable_etcontentzonebutton[0]);
    }
}
// function for enable edit-product button//
function editproduct() {
    var srcValues = [];
    var skus = [];
    var images = document.getElementsByTagName("img");
    for (var i = 0; i < images.length; i++) {
        if (images[i].hasAttribute("src")) {
            if (images[i].getAttribute("src").includes("assets/thumb")) {
                srcValues.push(images[i].getAttribute("src"));
            }
            if (images[i].getAttribute("src").includes("assets/alt")) {
                srcValues.push(images[i].getAttribute("src"));
            }
            if (images[i].getAttribute("src").includes("assets/thumbL")) {
                srcValues.push(images[i].getAttribute("src"));
            }
            if (images[i].getAttribute("src").includes("assets/full")) {
                srcValues.push(images[i].getAttribute("src"));
            }
        }
        if (images[i].hasAttribute("data-src")) {
            if (images[i].getAttribute("data-src").includes("/assets/thumb/")) {
                srcValues.push(images[i].getAttribute("data-src"));
            }
        }
    }
    for (var x = 0; x < srcValues.length; x++) {
        var sku = srcValues[x].substring(srcValues[x].lastIndexOf("/") + 1, srcValues[x].lastIndexOf("."));
        skus.push(sku);
    }
    var uniqueSkus = [...new Set(skus)];
    for (var i = 0; i < uniqueSkus.length; i++) {
        for (var j = 0; j < images.length; j++) {
            if (images[j].hasAttribute("data-src")) {
                if (images[j].getAttribute("data-src").includes(uniqueSkus[i])) {
                    images[j].closest("a").outerHTML += '<button class="edit-button" style="display: inline-block;background: #d21db5;color: rgba(255, 255, 255, 255);font-size:22px;font-weight:bold;padding:2px 4px;text decoration:none;width: 40px;height: 40px;line-height: 40x;border-radius: 50%;text-align: center;border: solid 2px rgba(255, 255, 255, 0.47);transition: .4s;position:absolute;top:0px;left:0;right:0px;margin:50px;font-family: Arial;" onclick="window.open(\'/_cpanel/products/view?sku=' + uniqueSkus[i] + "')\">E</button>";
                }
            } else {
                if (images[j].getAttribute("src").includes(uniqueSkus[i])) {
                    if (images[j].getAttribute("src").includes("/assets/thumbL/")) {
                        images[j].closest("a").outerHTML += '<button class="edit-button" style="display: inline-block;background: #d21db5;color: rgba(255, 255, 255, 255);font-size:22px;font-weight:bold;padding:2px 4px;text decoration:none;width: 40px;height: 40px;line-height: 40x;border-radius: 50%;text-align: center;border: solid 2px rgba(255, 255, 255, 0.47);transition: .4s;position:absolute;top:0px;left:0;right:0px;margin:50px;font-family: Arial;" onclick="window.open(\'/_cpanel/products/view?sku=' + uniqueSkus[i] + "')\">E</button>";
                    }
                    if (images[j].getAttribute("src").includes("/assets/thumb/")) {
                        images[j].closest("a").outerHTML += '<button class="edit-button" style="display: inline-block;background: #d21db5;color: rgba(255, 255, 255, 255);font-size:22px;font-weight:bold;padding:2px 4px;text decoration:none;width: 40px;height: 40px;line-height: 40x;border-radius: 50%;text-align: center;border: solid 2px rgba(255, 255, 255, 0.47);transition: .4s;position:absolute;top:0px;left:0;right:0px;margin:50px;font-family: Arial;" onclick="window.open(\'/_cpanel/products/view?sku=' + uniqueSkus[i] + "')\">E</button>";
                    }
                    if (images[j].getAttribute("src").includes("/assets/alt")) {
                        images[j].closest("a").outerHTML += '<button class="edit-button" style="display: inline-block;background: #d21db5;color: rgba(255, 255, 255, 255);font-size:22px;font-weight:bold;padding:2px 4px;text decoration:none;width: 40px;height: 40px;line-height: 40x;border-radius: 50%;text-align: center;border: solid 2px rgba(255, 255, 255, 0.47);transition: .4s;position:absolute;top:0px;left:0;right:0px;margin:50px;font-family: Arial;" onclick="window.open(\'/_cpanel/products/view?sku=' + uniqueSkus[i] + "')\">E</button>";
                    }
                }
            }
        }
    }
}
// function for disable - edit button//
function disable_editproduct() {
    var alleditbutton = document.getElementsByClassName("edit-button");
    while (alleditbutton.length > 0) {
        alleditbutton[0].parentNode.removeChild(alleditbutton[0]);
    }
}
