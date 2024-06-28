/* eslint-disable */

function detectDevice() {
  if (
    navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0
  ) {
    document.body.classList.add("ios_device");
    };
    if (isTouchDevice()) {
        document.body.classList.add("touch");
    } else {
        document.body.classList.add("web");
    }
}

function isTouchDevice() {
    return "ontouchstart" in document.documentElement;
};

export default {
    created() {
        detectDevice();
    }

}