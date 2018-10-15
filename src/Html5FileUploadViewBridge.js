
window.rhubarb.vb.create("Html5FileUploadViewBridge", function(parent){
    return {
        attachEvents: function () {
            parent.attachEvents.call(this);
            if (this.supportsHtml5Uploads()) {

                this.originalFileInput = this.viewNode.querySelector("input[type=file]");

                // An array of files to upload.
                this.filesToUpload = [];
                this.activeUploadIndex = -1;

                this.createUploadProgressIndicatorContainer();

                var self = this;
                this.originalFileInput.addEventListener("change", function () {
                    self.onFilesSelected(this.files);
                    self.originalFileInput.value = '';
                }, false);
            }
        },
        createUploadProgressIndicatorContainer: function () {
            this.uploadProgressIndicatorContainer = document.createElement("div");
            this.uploadProgressIndicatorContainer.className = "c-file-upload-container u-padding--heavy";

            this.originalFileInput.parentNode.insertBefore(
                this.uploadProgressIndicatorContainer,
                this.originalFileInput);
        },
        updateDom: function(){
            if (this.uploading){
                var activeUpload = this.filesToUpload[this.activeUploadIndex];

                if (!this.uploadProgressIndicator){
                    this.uploadProgressIndicator = this.createUploadProgressIndicator();
                    this.uploadProgressIndicatorContainer.appendChild(this.uploadProgressIndicator);
                }

                this.updateUploadProgressIndicator(this.uploadProgressIndicator, activeUpload.progress);
                this.uploadProgressIndicator.style.display = 'block';
                this.originalFileInput.style.display = 'none';
            } else {

                if (this.uploadProgressIndicator) {
                    this.uploadProgressIndicator.parentNode.removeChild(this.uploadProgressIndicator);
                    this.uploadProgressIndicator = false;
                }

                this.originalFileInput.style.display = 'block';
            }
        },
        updateUploadProgressIndicator: function (progressIndicator, progressDetails) {
            progressIndicator.needle.style.width = progressDetails.percentage + "%";
            progressIndicator.label.innerHTML = progressDetails.name;
            progressIndicator.speed.innerHTML =
                (progressDetails.speed) ?
                    this.formatSpeed(progressDetails.speed) :
                    '';
            progressIndicator.remaining.innerHTML =
                (progressDetails.remaining) ?
                    this.formatRemaining(progressDetails.remaining) + ' remaining' :
                    '';
            progressIndicator.overall.innerHTML = (this.activeUploadIndex + 1) + ' of ' + this.filesToUpload.length;
        },
        onFilesSelected: function (files) {
            for (var i = 0; i < files.length; i++) {
                this.filesToUpload.push(files[i]);
            }

            this.uploadNextFile();
        },
        onUploadStarted: function (file) {

        },
        onUploadFailed: function (response) {
            // There isn't any appropriate default behaviour for this so we don't provide any.
            // AS it's an HTML 5 upload the user could have scrolled this control out of view
            // so a JS alert would be inappropriate.
        },
        onUploadComplete: function (response) {
            if (this.uploadProgressIndicator) {
                this.uploadProgressIndicator.classList.add("-is-complete");
                this.uploadProgressIndicator.cancel.style.display = "none";
                this.uploadProgressIndicator.label.innerHTML = "Upload complete";
                var self = this;
                setTimeout(function () {
                    self.updateDom();
                }, 1500);
            }
        },
        clearQueue: function(){
            this.activeUploadIndex = -1;
            this.filesToUpload = [];
        },
        createUploadProgressIndicator: function () {
            var self = this;
            var upiDom = document.createElement("div");
            upiDom.className = "c-file-upload upload-progress";

            var upiGauge = document.createElement("div");
            upiGauge.className = "c-file-upload__progress _gauge";

            var upiNeedle = document.createElement("div");
            upiNeedle.className = "c-file-upload__progress-bar _needle";

            var upiLabel = document.createElement("span");
            upiLabel.className = "c-file-upload__label";

            var upiSpeed = document.createElement("span");
            upiSpeed.className = "c-file-upload__speed";

            var upiOverall = document.createElement("span");
            upiOverall.className = "c-file-upload__overall";

            var upiRemaining = document.createElement("span");
            upiRemaining.className = "c-file-upload__remaining";

            var cancel = document.createElement("button");
            cancel.className = "c-file-upload__button";
            cancel.innerHTML = "Cancel Upload";
            cancel.onclick = function () {
                var confirmAbort = confirm("Are you sure you want to cancel the upload?");
                if (confirmAbort) {
                    self.uploading = false;
                    self.request.abort();
                    self.clearQueue();
                    self.updateDom();

                    self.raiseClientEvent("UploadCancelled")
                }
            };


            if (this.model.indicators.currentFileName) {
                upiDom.appendChild(upiLabel);
            }

            if (this.model.indicators.uploadSpeed) {
                upiDom.appendChild(upiSpeed);
            }

            upiGauge.appendChild(upiNeedle);

            upiDom.appendChild(upiGauge);

            if (this.model.indicators.timeRemaining) {
                upiDom.appendChild(upiRemaining);
            }

            if (this.model.indicators.overallProgress && this.model.allowMultipleUploads) {
                upiDom.appendChild(upiOverall);
            }

            upiDom.appendChild(cancel);


            // Put the sub elements on the parent as direct children for faster access later.
            upiDom.needle = upiNeedle;
            upiDom.speed = upiSpeed;
            upiDom.overall = upiOverall;
            upiDom.label = upiLabel;
            upiDom.remaining = upiRemaining;
            upiDom.cancel = cancel;
            return upiDom;
        },
        supportsHtml5Uploads: function () {
            var xhr = new XMLHttpRequest();

            return !(!xhr.upload || !window.File || !window.FileList || !window.FileReader);
        },
        uploadNextFile: function() {
            this.uploading = false;

            this.activeUploadIndex++;

            if (this.activeUploadIndex >= this.filesToUpload.length){
                this.clearQueue();
            } else {
                this.uploadFile(this.filesToUpload[this.activeUploadIndex]);
            }

            this.updateDom();
        },
        calculateSpeed: function(previousBytesUploaded, previousTime, currentBytesUploaded) {
            var currentTime = Date.now();

            if ((currentTime - previousTime) > 333) {
                var recentBytes = currentBytesUploaded - previousBytesUploaded;
                var seconds = currentTime - previousTime;

                var speed = recentBytes / (seconds);

                return speed * 1000;
            }

            return false;
        },
        formatRemaining: function(seconds){
            var levels = [
                [Math.floor(seconds / 31536000), 'years'],
                [Math.floor((seconds % 31536000) / 86400), 'days'],
                [Math.floor(((seconds % 31536000) % 86400) / 3600), 'hours'],
                [Math.floor((((seconds % 31536000) % 86400) % 3600) / 60), 'minutes'],
                [(((seconds % 31536000) % 86400) % 3600) % 60, 'seconds'],
            ];
            var returntext = '';

            for (var i = 0, max = levels.length; i < max; i++) {
                if ( levels[i][0] === 0 ) {
                    continue;
                }
                returntext += ' ' + levels[i][0] + ' ' + (levels[i][0] === 1 ? levels[i][1].substr(0, levels[i][1].length-1): levels[i][1]);
            };
            return returntext.trim();
        },
        formatSpeed: function(speed){
            if (!speed){
                return false;
            }

            // Ensures the upload speed is displayed as a number between 1 and 1000 with correct units
            var units = 0;
            while (speed > 1000) {
                speed /= 1000;
                units++;
            }

            var displayUnits;

            switch (units) {
                case 0:
                    displayUnits = "b/s";
                    speed = parseInt(speed);
                    break;
                case 1:
                    displayUnits = "Kb/s";
                    speed = parseInt(speed);
                    break;
                case 2:
                    displayUnits = "Mb/s";
                    speed = parseFloat(speed).toPrecision(3);
                    break;
                case 3:
                    displayUnits = "Gb/s";
                    speed = parseFloat(speed).toPrecision(3);
                    break;
            }

            return speed + displayUnits;
        },
        calculateSecondsRemaining: function(speed, bytesToGo) {
            if (!speed){
                return false;
            }

            return Math.round(bytesToGo / speed);
        },
        uploadFile: function (file) {
            // Initialisation of variables for upload speed calculation:
            var displaySpeed = false;
            var totalUploaded = 0;
            var previousTime = Date.now();
            var lastSpeed = false;

            this.uploading = true;

            // Put a progress structure onto the file upload itself.
            file.progress = {
                "name": file.name,
                "position": 0,
                "length": file.length,
                "percentage": 0,
                "speed": false,
                "remaining": false
            };

            this.onUploadStarted(file);
            this.raiseClientEvent("UploadStarted", file);

            this.request = this.sendFileAsServerEvent(
                "fileUploaded",
                file,
                function (e) {
                    var speed = this.calculateSpeed(totalUploaded, previousTime, e.loaded);

                    if (speed){
                        // Updates for the next cycle
                        previousTime = Date.now();
                        totalUploaded = e.loaded;
                        lastSpeed = speed;
                    } else {
                        speed = lastSpeed;
                    }

                    // Update progress structure on the file upload itself.
                    file.progress = {
                        "name": file.name,
                        "position": e.loaded,
                        "length": e.total,
                        "percentage": parseInt(( e.loaded / e.total ) * 100),
                        "speed": speed,
                        "remaining": this.calculateSecondsRemaining(speed, e.total - e.loaded)
                    };

                    this.raiseClientEvent("ProgressReported", file, file.progress);

                    this.updateDom();
                }.bind(this),
                // On complete
                function (response) {
                    if (file) {
                        this.raiseClientEvent("UploadCompleted", file, response);
                        this.onUploadComplete(file, response);
                    }

                    this.uploadNextFile();
                    this.raiseClientEvent("UploadComplete", file, response);
                }.bind(this),
                // On failure
                function (response) {
                    this.onUploadFailed(file, response);
                    this.uploadNextFile();
                    this.raiseClientEvent("UploadFailed", file, response);
                }.bind(this)
            );

            return this.request;
        },
        setAcceptedFileTypes: function (filters) {
            this.originalFileInput.setAttribute('accept', filters.join(','));
        }
    };
}, window.rhubarb.viewBridgeClasses.SimpleFileUploadViewBridge);
