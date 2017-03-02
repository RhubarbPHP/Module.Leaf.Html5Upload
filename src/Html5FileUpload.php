<?php

namespace Rhubarb\Leaf\Controls\Html5Upload;
use Rhubarb\Crown\Request\Request;
use Rhubarb\Crown\Request\WebRequest;
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

    public function setAllowMultipleUploads($allow)
    {
        $this->model->allowMultipleUploads = $allow;
    }

    public function getIndicators()
    {
        return $this->model->indicators;
    }

    public function setIndicators(Html5FileUploadIndicators $indicators)
    {
        $this->model->indicators = $indicators;
    }

    public function setShowUploadingFileName($show)
    {
        $this->model->showUploadingFileName = $show;
    }

    public function setShowUploadingTimeRemaining($show)
    {
        $this->model->showUploadingTimeRemaining = $show;
    }

    public function setShowUploadingFileCount($show)
    {
        $this->model->showUploadingFileCount = $show;
    }

    protected function onModelCreated()
    {
        parent::onModelCreated();

        $this->model->fileUploadedEvent->attachHandler(function(...$file){
            return $this->parseRequestForFiles(Request::current());
        });
    }

    public function setProgressLabelType($displayType)
    {
        $this->model->progressLabelType = $displayType;
    }
}