window.rhubarb.vb.create("SingleHtml5FileUploadWithPersistenceViewBridge", function(parent){
  return {
    updateDom: function(){

      parent.updateDom.call(this);

      if (this.model.value){
        this.originalFileInput.style.display = 'none';
        this.label.innerHTML = '<a href="' + this.model.value + '" target="_new">' + this.extractFileName(this.model.value) + '</a>'
        this.label.style.display = 'inline';
        this.button.style.display = 'block';
      } else {
        this.originalFileInput.style.display = 'inline';
        this.label.innerText = "";
        this.label.style.display = 'none';
        this.button.style.display = 'none';
      }

      if (this.uploading){
        this.originalFileInput.style.display = 'none';
      }
    },
    extractFileName: function(filePath) {
        var parts = filePath.split(/\//);

        return parts[parts.length-1];
    },
    onUploadStarted: function(file){
        this.uploading = true;
        this.updateDom();
    },
    onUploadFailed: function (response) {
        this.viewNode.classList.add("has-failed");
        this.uploading = false;
        this.updateDom();
    },
    onUploadComplete: function(fileProgressDom, serverResponse){
        this.model.value = serverResponse;
        this.uploading = false;
        this.updateDom();
    },
    onReady: function(){
      parent.onReady.call(this);

      this.label = document.createElement("span");
      this.label.style = 'display: none;';

      this.button = document.createElement("button");
      this.button.innerHTML = "<p>Change</p>";
      this.button.style = 'display: none;';
      this.button.addEventListener('click', function(event){
          this.model.value = '';
          this.updateDom();

          event.preventDefault();
          return false;
      }.bind(this));

      this.viewNode.insertBefore(this.button, this.originalFileInput);
      this.viewNode.insertBefore(this.label, this.button);

      this.updateDom();
    }
  };
}, window.rhubarb.viewBridgeClasses["Html5FileUploadViewBridge"]);
