rhubarb.vb.create('DragAndDropHtml5FileUploadViewBridge', function(parent){
    return {
        onReady: function () {
            parent.onReady.call(this);
            if (this.supportsHtml5Uploads()) {
                // The parent will have created our upload indicator. We now
                // surround that further with the drag and drop zone and hide
                // the original input.

                this.originalFileInput.hidden = true;

                this.setupDragDropContainer();
            }
        },
        onDragLeave: function() {
            this.isDragActive = true;
            this.updateDom();
        },

        onDragOver: function(e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
            this.isDragActive = true;
            this.updateDom();
        },

        onDrop: function(e) {
            e.preventDefault();

            this.isDragActive = false;
            this.updateDom();

            var file;
            if (e.dataTransfer) {
                file = e.dataTransfer.files;
            } else if (e.target) {
                file = e.target.files;
            }

            this.onFilesSelected([file]);
        },
        updateDom: function(){

            if (this.uploading){
                this.dragDropContainer.style.display = 'none';
            } else {
                this.dragDropContainer.style.display = 'block';
            }

            parent.updateDom.call(this);

            this.originalFileInput.style.display = 'none';
        },
        onClick: function () {
            this.open();
        },

        open: function() {
            this.originalFileInput.value = null;
            this.originalFileInput.click();
        },
        setupDragDropContainer: function(){
            this.dragDropContainer = document.createElement('div');
            this.dragDropContainer.className = 'c-dropzone';

            this.dragDropContainer.addEventListener('dragleave', function(e){
                this.onDragLeave(e);
            }.bind(this));

            this.dragDropContainer.addEventListener('dragover', function(e){
                this.onDragOver(e);
            }.bind(this));

            this.dragDropContainer.addEventListener('drop', function(e){
                this.onDrop(e);
            }.bind(this));

            this.dragDropLabelContainer = document.createElement('div');
            this.dragDropLabelContainer.className = 'c-dropzone__text';
            this.dragDropLabelContainer.innerHTML = "<b>Drag and drop your file here</b>";

            this.dragDropContainer.appendChild(this.dragDropLabelContainer);

            this.dragDropIcon = document.createElement('div');
            this.dragDropIcon.className = "c-dropzone__icon";
            this.dragDropIcon.innerHTML = '<div class="c-dropzone__icon--inner"></div>';

            this.dragDropContainer.appendChild(this.dragDropIcon);

            this.dragDropLinkContainer = document.createElement('div');
            this.dragDropLinkContainer.className = "c-dropzone__text";

            this.dragDropLink = document.createElement('a');
            this.dragDropLink.innerHTML = "Or select a file from your computer";
            this.dragDropLink.addEventListener('click', this.onClick.bind(this));

            this.dragDropLinkContainer.appendChild(this.dragDropLink);

            this.dragDropContainer.appendChild(this.dragDropLinkContainer);

            this.originalFileInput.parentNode.insertBefore(
                this.dragDropContainer,
                this.originalFileInput
            );
        }
    }
}, rhubarb.viewBridgeClasses.Html5FileUploadViewBridge);