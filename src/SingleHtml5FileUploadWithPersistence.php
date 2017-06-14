<?php

namespace Rhubarb\Leaf\Controls\Html5Upload;

class SingleHtml5FileUploadWithPersistence extends Html5FileUpload
{
    public function __construct($name)
    {
        parent::__construct($name);

        $this->model->allowMultipleUploads = false;
    }

    public function setAllowMultipleUploads($allow)
    {
        throw new \InvalidArgumentException("Multiple uploads are not supported here.");
    }

    protected function getViewClass()
    {
        return SingleHtml5FileUploadWithPersistenceView::class;
    }

    protected function createModel()
    {
        return new SingleHtml5FileUploadWithPersistenceModel();
    }
}