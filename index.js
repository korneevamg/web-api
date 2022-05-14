/**
 * Local Notifications
 */

var $status = document.getElementById('status');

if ('Notification' in window) {
    $status.innerText = Notification.permission;
    if (Notification.permission === "granted") {
        document.getElementById("requestPermissionInfo").style.visibility = "hidden";
        document.getElementById("requestLocalNotificationPermission").classList.toggle("inverted");
        document.getElementById("testLocalNotification").classList.toggle("inverted");
    }
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
        await navigator.share(shareResult)
        shareResult.textContent = 'Web API Showcase shared successfully'
    } catch (err) {
        shareResult.textContent = err
    }
};

// Want to receive shared information? It is possible for installed apps with Web Share Target: https://web.dev/web-share-target/