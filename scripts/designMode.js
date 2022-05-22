let designModeEnabled = false;
let designModeButton = document.getElementById("design-mode");
function toggleDesignMode() {
    designModeEnabled = !designModeEnabled;
    if (designModeEnabled) {
        document.designMode = "on";
        designModeButton.innerHTML = '<strong>Disable Design Mode</strong>';
    }
    else { document.designMode = "off"; designModeButton.innerHTML = '<strong>Enable Design Mode</strong>' };
}