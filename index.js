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

function persistentNotification() {
    if (!('Notification' in window) || !('ServiceWorkerRegistration' in window)) {
        alert('Persistent Notification API not supported!');
        return;
    }

    try {
        navigator.serviceWorker.getRegistration()
            .then((reg) => reg.showNotification("Hi there - persistent!"))
            .catch((err) => alert('Service Worker registration error: ' + err));
    } catch (err) {
        alert('Notification API error: ' + err);
    }
}