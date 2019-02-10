function backKey() {
    if (menuShown) {
        closeMenu();
    } else {
        Native.finishApp();
    }
}