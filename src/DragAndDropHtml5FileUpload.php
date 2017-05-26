<?php

namespace Rhubarb\Leaf\Controls\Html5Upload;

use Rhubarb\Leaf\Leaves\Leaf;

class DragAndDropHtml5FileUpload extends Html5FileUpload
{
    /**
    * @var DragAndDropHtml5FileUploadModel
    */
    protected $model;
    
    protected function getViewClass()
    {
        return DragAndDropHtml5FileUploadView::class;
    }
    
    protected function createModel()
    {
        $model = new DragAndDropHtml5FileUploadModel();

        // If your model has events you want to listen to you should attach the handlers here
        // e.g.
        // $model->selectedUserChangedEvent->attachListener(function(){ ... });

        return $model;
    }
}