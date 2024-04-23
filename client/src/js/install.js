const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Save the event for later use
    window.deferredPrompt = event;
    // Show the install button
    butInstall.classList.toggle('hidden', false);

});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // Get the deferredPrompt from the window
    const promptEvent = window.deferredPrompt;
    // If there is no prompt event, return
    if (!promptEvent) {
        return;
    }

// Trigger the installation prompt
promptEvent.prompt();
// Wait for the user to respond (accept or dismiss the prompt)
// Reset the deferredPrompt
window.deferredPrompt = null;

// Hide the install button

butInstall.classList.toggle('hidden', true);

});


// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // Reset the deferredPrompt when the app is installed
    window.deferredPrompt = null;
});