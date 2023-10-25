// ==UserScript==
// @name         Algozenith Record/Capture Bypass
// @namespace    www.learning.algozenith.com
// @version      1.0.1
// @description  Algozenith Record/Capture Bypass to make notes and learn stuff offline. Don't use this for wrong purposes.
// @author       surajgaud
// @match        https://www.learning.algozenith.com/*
// @license      MPL-2.0
// @grant        none
// ==/UserScript==

/* jshint esversion:6 */

// Press ALT+C

(function () {
  'use strict';
  const button = document.createElement("button");
  button.id = "toggle-button";
  button.style.position = "fixed";
  button.style.bottom = "20px";
  button.style.right = "20px";
  button.style.borderRadius = "10px";
  button.style.backgroundColor = "#000011";
  button.style.zIndex = "9999"; // Set the highest z-index
  button.style.fontFamily = "Poppins"; // Set the font-family to Poppins
  button.textContent = "Activate";
  button.style.color = "white";
  button.style.padding = "5px 10px";
  button.style.marginRight = "3px";

  // Create the image element (icon) for the "Activate" state
  const iconActivate = document.createElement("img");
  iconActivate.setAttribute("width", "25");
  iconActivate.setAttribute("height", "25");
  iconActivate.style.margin = "0px 3px";
  iconActivate.src = "https://img.icons8.com/external-kmg-design-flat-kmg-design/32/external-shield-cyber-security-kmg-design-flat-kmg-design-1.png";
  iconActivate.alt = "external-shield-cyber-security-kmg-design-flat-kmg-design-1";

  // Create the image element (icon) for the "Deactivate" state
  const iconDeactivate = document.createElement("img");
  iconDeactivate.setAttribute("width", "25");
  iconDeactivate.setAttribute("height", "25");
  iconDeactivate.style.margin = "0px 3px";
  iconDeactivate.src = "https://img.icons8.com/external-anggara-flat-anggara-putra/32/external-shield-interface-anggara-flat-anggara-putra.png";
  iconDeactivate.alt = "external-shield-interface-anggara-flat-anggara-putra";


  const fakeVideo = document.createElement('video');
  let isCapturing = false;

  function getDisplayMedia(success, error) {
    if (navigator.mediaDevices.getDisplayMedia) navigator.mediaDevices.getDisplayMedia().then(success).catch(error);
    else navigator.getDisplayMedia().then(success).catch(error);
  }
  function updateButtonContent(can) {
    const button = document.getElementById("toggle-button");
    if (can) {
      button.textContent = "Deactivate";
      button.insertBefore(iconDeactivate, button.firstChild); // Add the "Deactivate" icon
    } else {
      button.textContent = "Activate";
      button.insertBefore(iconActivate, button.firstChild); // Add the "Activate" icon
    }
  }
  // Function to toggle capture
  function toggleCapture() {
    const button = document.getElementById("toggle-button");
    if (isCapturing) {
      isCapturing = false;
      updateButtonContent(false);
      fakeVideo.srcObject.getTracks().forEach(track => track.stop());
    } else {
      getDisplayMedia(screen => {
        isCapturing = true;
        updateButtonContent(true);
        fakeVideo.srcObject = screen;
      });
    }
  }
  button.addEventListener("click", function () {
    if (isCapturing) {
      updateButtonContent(true);
    } else {
      updateButtonContent(false);
    }
  });

  // Append the initial "Activate" icon to the button
  button.insertBefore(iconActivate, button.firstChild);

  // Append the button to the document body
  document.body.appendChild(button);
  button.addEventListener('click', toggleCapture);

})();
