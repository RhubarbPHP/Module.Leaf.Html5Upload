<?php

namespace Rhubarb\Leaf\Controls\Html5Upload;
use Rhubarb\Leaf\Controls\Common\FileUpload\SimpleFileUpload;
use Rhubarb\Leaf\Controls\Common\FileUpload\SimpleFileUploadExample;
use Rhubarb\Leaf\Controls\Html5Upload\Html5FileUploadView;
use Rhubarb\Leaf\Leaves\Leaf;


class Html5FileUpload extends SimpleFileUpload
{

    /**
     * @var Html5FileUploadModel
     */
    protected $model;

    /**
     * Returns the name of the standard view used for this leaf.
     *
     * @return string
     */
    protected function getViewClass()
    {
        return Html5FileUploadView::class;
    }

    protected function createModel()
    {
        return new Html5FileUploadModel();
    }

    protected function onModelCreated()
    {
        parent::onModelCreated();

        $this->model->fileUploadedEvent->attachHandler(function(...$file){
            $this->fileUploadedEvent->raise(...$file);
        });
    }

    public function setDisplayType($displayType)
     {
         $this->model->displayType = $displayType;
     }
}