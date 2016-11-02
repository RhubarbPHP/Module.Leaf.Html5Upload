var bridge = function (presenterPath) {
    window.rhubarb.viewBridgeClasses.SimpleFileUploadViewBridge.apply(this, arguments);
};

bridge.prototype = new window.rhubarb.viewBridgeClasses.SimpleFileUploadViewBridge();
bridge.prototype.constructor = bridge;

bridge.prototype.onStateLoaded = function () {
    if (!this.model.MaxFileSize) {
        this.model.MaxFileSize = 5 * 1024 * 1024;
    }
};

bridge.prototype.supportsHtml5Uploads = function () {
    var xhr = new XMLHttpRequest();

    return !(!xhr.upload || !window.File || !window.FileList || !window.FileReader);
};

bridge.prototype.attachEvents = function () {
    if (this.supportsHtml5Uploads()) {
        this.createUploadProgressIndicatorContainer();

        var self = this;
        this.viewNode.addEventListener("change", function () {
            self.onFilesSelected(this.files);
        }, false);
    }
};

/**
 * Should create the container used for appending upload progress indicators.
 */
bridge.prototype.createUploadProgressIndicatorContainer = function () {
    this.uploadProgressIndicatorContainer = document.createElement("div");
    this.uploadProgressIndicatorContainer.className = "upload-progress-container";

    this.viewNode.parentNode.insertBefore(this.uploadProgressIndicatorContainer, this.viewNode);
};

bridge.prototype.onFilesSelected = function (files) {
    for (var i = 0; i < files.length; i++) {
        this.uploadFile(files.item(i));
    }
};

bridge.prototype.uploadFile = function (file) {
    // Initialisation of variables for upload speed calculation:
    var displaySpeed = "calculating";
    var amountLoadedSoFarOld = 0;
    var timeOld = Date.now();

    return this.sendFileAsServerEvent(
        "fileUploaded",
        file,
        function (e) {
            var currentTime = Date.now();
            if ((currentTime - timeOld) > 333) {
                var amountLoadedSoFarNew = e.loaded;
                var differenceInAmountUploaded = amountLoadedSoFarNew - amountLoadedSoFarOld;
                var timeNew = currentTime;
                var differenceInTime = timeNew - timeOld;

                var speed = differenceInAmountUploaded / (differenceInTime);

                // Ensures the upload speed is displayed as a number between 1 and 1000 with correct units
                var units = 0;
                while (1 > speed || 999 < speed) {
                    if (1 > speed) {
                        units--;
                    } else {
                        units++;
                    }
                    speed /= 1000;
                }
                var displayUnits;
                switch (units) {
                    case -1:
                        displayUnits = " b/s";
                        break;
                    case 0:
                        displayUnits = " Kb/s";
                        break;
                    case 1:
                        displayUnits = " Mb/s";
                        break;
                    case 2:
                        displayUnits = " Gb/s";
                        break;
                }
                displaySpeed = parseFloat(speed).toPrecision(3) + displayUnits;

                // Updates for the next cycle
                timeOld = timeNew;
                amountLoadedSoFarOld = amountLoadedSoFarNew;
            }

            var progress = {
                "name": file.name,
                "position": e.loaded,
                "length": e.total,
                "percentage": parseInt(( e.loaded / e.total ) * 100),
                "speed": displaySpeed
            };

            if (!file.uploadProgressDom) {
                file.uploadProgressDom = this.createUploadProgressIndicator();
                this.attachUploadProgressIndicator(file.uploadProgressDom);
            }

            this.updateUploadProgressIndicator(file.uploadProgressDom, progress);
        }.bind(this),
        function (response) {
            if (file.uploadProgressDom) {
                this.onUploadComplete(file.uploadProgressDom);
            }

            this.raiseClientEvent("UploadComplete", file, response);
        }.bind(this)
    );
};

/**
 * Called to create the DOM for a progress indicator.
 */
bridge.prototype.createUploadProgressIndicator = function () {
    var self = this;
    var upiDom = document.createElement("div");
    upiDom.className = "upload-progress";

    var upiGauge = document.createElement("div");
    upiGauge.className = "_gauge";

    var upiNeedle = document.createElement("div");
    upiNeedle.className = "_needle";

    var upiLabel = document.createElement("label");

    var cancel = document.createElement("a");
    cancel.className = "c-button c-button--neg c-button--small cancel";
    cancel.innerHTML = "Cancel Upload";
    cancel.onclick = function () {
        var confirmAbort = confirm("Are you sure you want to cancel the upload?");
        if (confirmAbort) {
            self.request.abort();
            upiDom.style.display = "none";
            self.viewNode.style.display = "block";
        }
    };

    upiGauge.appendChild(upiNeedle);

    upiDom.appendChild(upiGauge);
    upiDom.appendChild(upiLabel);
    upiDom.appendChild(cancel);

    // Put the sub elements on the parent as direct children for faster access later.
    upiDom.upiNeedle = upiNeedle;
    upiDom.upiLabel = upiLabel;
    upiDom.cancel = cancel;
    return upiDom;
};

bridge.prototype.attachUploadProgressIndicator = function (progressIndicator) {
    this.uploadProgressIndicatorContainer.appendChild(progressIndicator);
};

/**
 * Updates the DOM for a progress indicator to reflect the progress passed to it.
 *
 * @param progressIndicator the DOM node created in createUploadProgressIndicator
 * @param progressDetails An object containing name, length, position and percentage properties
 */
bridge.prototype.updateUploadProgressIndicator = function (progressIndicator, progressDetails) {
    progressIndicator.upiNeedle.style.width = progressDetails.percentage + "%";
    progressIndicator.upiLabel.innerHTML = this.getLabelHtml(progressDetails);
    this.viewNode.style.display = "none";
};

bridge.prototype.getLabelHtml = function (progressDetails) {
    if (this.model.displayType == "") {
        return "";
    } else if (this.model.displayType == "percentage") {
        return "progress: " + progressDetails.percentage + "%";
    } else if (this.model.displayType == "filename") {
        return "uploading " + progressDetails.name + " now";
    } else {
        return "speed: " + progressDetails.speed;
    }
};

/**
 * Called when an upload is complete. Provides an opportunity to remove a progress indicator.
 *
 * @param progressIndicator
 */
bridge.prototype.onUploadComplete = function (progressIndicator) {
    this.addClass(progressIndicator, "-is-complete");
    this.removeClass(progressIndicator.upiNeedle, "_needle");
    this.removeClass(progressIndicator.cancel, "cancel");
    progressIndicator.cancel.style.display = "none";
    progressIndicator.upiLabel.innerHTML = "Complete";
    var self = this;
    setTimeout(function () {
        progressIndicator.parentNode.removeChild(progressIndicator);
        self.viewNode.style.display = "block";
    }, 1500);
};

bridge.prototype.addClass = function (nodes, className) {
    if (!nodes.length) {
        nodes = [nodes];
    }

    for (var n = 0, m = nodes.length; n < m; n++) {
        var node = nodes[n];

        if ((" " + node.className + " ").indexOf(" " + className + " ") == -1) {
            node.className += " " + className;
        }
    }
};

bridge.prototype.removeClass = function (nodes, className) {
    if (!nodes.length) {
        nodes = [nodes];
    }

    for (var n = 0, m = nodes.length; n < m; n++) {
        var node = nodes[n];
        node.className = node.className.replace(className, '').trim();
    }
};

window.rhubarb.viewBridgeClasses.Html5FileUploadViewBridge = bridge;
