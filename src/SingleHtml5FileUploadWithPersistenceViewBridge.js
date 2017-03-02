window.rhubarb.vb.create("SingleHtml5FileUploadWithPersistenceViewBridge", function(parent){
  return {
    updateDom: function(){
      if (this.model.value){
        this.viewNode.style.display = 'none';
        this.label.innerText = this.model.value;
        this.label.style.display = 'inline';
        this.button.style.display = 'block';
      } else {
        this.viewNode.style.display = 'inline';
        this.label.innerText = this.model.value;
        this.label.style.display = 'none';
        this.button.style.display = 'none';
      }
    }
    ,
    onReady: function(){
      parent.onReady.call(this);

      this.label = document.createElement("span");
      this.label.style = 'display: none;';

      this.button = document.createElement("button");
      this.button.innerHTML = "<p>Change</p>";
      this.button.style = 'display: none;';
      this.button.addEventListener('click', function(){
          this.model.value = '';
          this.updateDom();
      }.bind(this));

      this.viewNode.parentNode.insertBefore(this.button, this.viewNode);
      this.viewNode.parentNode.insertBefore(this.label, this.button);

      this.updateDom();
    }
  };
}, window.rhubarb.viewBridgeClasses["Html5FileUploadViewBridge"]);
