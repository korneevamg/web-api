/**
 * Page Visibility
 */
// Set the name of the hidden property and the change event for visibility
var hidden, visibilityChange;
var visibilityChangeEnabled = false;
var visibilityToggle = document.getElementById("page-visibility-button");

function toggleVisibilityChange() {
    visibilityChangeEnabled = !visibilityChangeEnabled;
    if (visibilityChangeEnabled) {
        visibilityToggle.innerHTML = '<strong>Disable Page Visibility</strong>';
    } else visibilityToggle.innerHTML = '<strong>Enable Page Visibility</strong>';
}

if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
    hidden = "hidden";
    visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
}

var videoElement = document.getElementById("videoElement");

// If the page is hidden, pause the video;
function handleVisibilityChange() {
    if (document[hidden]) {
        // https://developers.google.com/youtube/iframe_api_reference
        videoElement.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');

    } else if (visibilityChangeEnabled) {
        videoElement.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }
}

// Warn if the browser doesn't support addEventListener or the Page Visibility API
if (typeof document.addEventListener === "undefined" || hidden === undefined) {
    console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
} else {
    // Handle page visibility change
    document.addEventListener(visibilityChange, handleVisibilityChange, false);
}