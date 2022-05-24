/**
 * Local Notifications
 */

var $status = document.getElementById('notification-status');

if ('Notification' in window) {
    $status.innerText = Notification.permission;
    if (Notification.permission === "granted") {
        $status.innerText = 'granted';
        document.getElementById("requestPermissionInfo").style.visibility = "hidden";
        document.getElementById("requestLocalNotificationPermission").classList.toggle("inverted");
        document.getElementById("testLocalNotification").classList.toggle("inverted")
    }
} else {
    document.getElementById("local-notifications").style.display = "none";
}

// Won't work local in Safari: https://stackoverflow.com/questions/42019261/notifications-disabled-on-file-system-in-safari
function requestPermission() {
    if (!('Notification' in window)) {
        alert('Notification API not supported!');
        return;
    }

    Notification.requestPermission(function (result) {
        $status.innerText = result;

        if (result === "granted") {
            document.getElementById("requestPermissionInfo").style.visibility = "hidden";
            document.getElementById("requestLocalNotificationPermission").classList.toggle("inverted");
            document.getElementById("testLocalNotification").classList.toggle("inverted");
        }
    });
}

// Won't work local in Chrome: https://stackoverflow.com/questions/53288572/local-javascript-website-file-confuses-notification-permissions-on-chrome
function nonPersistentNotification() {
    if (!('Notification' in window)) {
        alert('Notification API not supported!');
        return;
    }

    try {
        var notification = new Notification("Hi there - non-persistent!");
    } catch (err) {
        alert('Notification API error: ' + err);
    }
}

// load some image to trigger "resource" fetch events
var image1 = new Image();
image1.src = "https://www.w3.org/Icons/w3c_main.png";

/** Resource Timing API*/
// https://developer.mozilla.org/en-US/docs/Web/API/Resource_Timing_API/Using_the_Resource_Timing_API
// Gimme more! https://developer.mozilla.org/en-US/docs/Web/API/Navigation_timing_API
function calculateLoadTimes() {

    var o = document.getElementById("performance-output");
    o.innerHTML = '';

    // Check performance support
    if (performance === undefined) {
        document.getElementById("performance").style.display = "none";
        return;
    }

    // Get a list of "resource" performance entries
    var resources = performance.getEntriesByType("resource");
    if (resources === undefined || resources.length <= 0) {
        console.log("= Calculate Load Times: there are NO `resource` performance records");
        return;
    }

    for (var i = 0; i < resources.length; i++) {
        o.innerHTML += "Calculating loading time for " + resources[i].name + " <br><br>";

        // Redirect time
        var t = resources[i].redirectEnd - resources[i].redirectStart;
        o.innerHTML += "... Redirect time = " + t + " <br>";

        // DNS time
        t = resources[i].domainLookupEnd - resources[i].domainLookupStart;
        o.innerHTML += "... DNS lookup time = " + t + " <br>";

        // TCP handshake time
        t = resources[i].connectEnd - resources[i].connectStart;
        o.innerHTML += "... TCP time = " + t + " <br>";

        // Secure connection time
        t = (resources[i].secureConnectionStart > 0) ? (resources[i].connectEnd - resources[i].secureConnectionStart) : "0";
        o.innerHTML += "... Secure connection time = " + t + " <br>";

        // Response time
        t = resources[i].responseEnd - resources[i].responseStart;
        o.innerHTML += "... Response time = " + t + " <br>";

        // Fetch until response end
        t = (resources[i].fetchStart > 0) ? (resources[i].responseEnd - resources[i].fetchStart) : "0";
        o.innerHTML += "... Fetch until response end time = " + t + " <br>";

        // Request start until response end
        t = (resources[i].requestStart > 0) ? (resources[i].responseEnd - resources[i].requestStart) : "0";
        o.innerHTML += "... Request start until response end time = " + t + " <br>";

        // Start until response end
        t = (resources[i].startTime > 0) ? (resources[i].responseEnd - resources[i].startTime) : "0";
        o.innerHTML += "... Start until response end time = " + t + " <br><br>";
    }
}

/** Web Share API */
//https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API
if (!'navigator' in window || !navigator['share']) { //We can also test for support using navigator.canShare():
    document.getElementsByClassName("footer__share-api")[0].style.display = "none";
}

// Share must be triggered by "user activation"
async function share() {
    const shareData = {
        title: 'Web API Showcase',
        text: 'Check out this Web API Showcase by @BrowserPerson',
        url: 'https://web-api.browser-person.com'
    }

    const shareResult = document.getElementById('shareResult');
    try {
        await navigator.share(shareData)
        shareResult.textContent = 'Web API Showcase shared successfully'
    } catch (err) {
        shareResult.textContent = err
    }
};// Want to receive shared information? It is possible for installed apps with Web Share Target: https://web.dev/web-share-target/

var o = document.getElementById("layout-shift-output");
o.innerHTML = '';
// Safari does not support 'getEntries'
// https://web.dev/fixing-layout-instability/
new Promise(resolve => {
    new PerformanceObserver(list => {
        resolve(list.getEntries().filter(entry => !entry.hadRecentInput));
    }).observe({ type: "layout-shift", buffered: true });
}).then((result) => o.innerHTML = 'Cumulative Layout Shift of ' + result[0].value + ' at ' + result[0].startTime);

/**
 * PointerEvent.pressure
 */
var pointerOutput = document.getElementById("pointer-pressure");
var buttonToMeasure = document.getElementById("pressure-button");
buttonToMeasure.addEventListener('pointerdown', function (e) {
    pointerOutput.innerHTML = '';
    if ((typeof (e.targetTouches) != 'undefined') && (e.targetTouches.length > 0) && (typeof (e.targetTouches[0].force) != 'undefined')) {
        pointerOutput.innerHTML += 'force: ' + e.targetTouches[0].force + ' ';
    } if (typeof (e.webkitForce) != 'undefined') {
        pointerOutput.innerHTML += 'webkitForce: ' + e.webkitForce + ' ';
    } if (typeof (e.pressure) != 'undefined') {
        pointerOutput.innerHTML += 'pressure: ' + e.pressure + ' ';
    }
    pointerOutput.innerHTML += '<br>';
}, false);