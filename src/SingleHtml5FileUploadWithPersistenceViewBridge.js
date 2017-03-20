window.rhubarb.vb.create("SingleHtml5FileUploadWithPersistenceViewBridge", function(parent){
  return {
    updateDom: function(){

      parent.updateDom.call(this);

      if (this.model.value){
        this.originalFileInput.style.display = 'none';
        this.label.innerText = this.model.value;
        this.label.style.display = 'inline';
        this.button.style.display = 'block';
      } else {
        this.originalFileInput.style.display = 'inline';
        this.label.innerText = this.model.value;
        this.label.style.display = 'none';
        this.button.style.display = 'none';
      }
    },
    onUploadFailed: function (response) {
        this.viewNode.classList.add("has-failed");
    },
    onUploadComplete: function(fileProgressDom, serverResponse){
        this.model.value = serverResponse;
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
