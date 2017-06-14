<?php

namespace Rhubarb\Leaf\Controls\Html5Upload\Examples\SingleUploadWithPersistence;

use Rhubarb\Leaf\Controls\Common\FileUpload\Exceptions\FileUploadedException;
use Rhubarb\Leaf\Controls\Common\FileUpload\UploadedFileDetails;
use Rhubarb\Leaf\Leaves\Leaf;

class SingleHtml5FileUploadWithPersistenceExample extends Leaf
{
    /**
    * @var SingleHtml5FileUploadWithPersistenceExampleModel
    */
    protected $model;
    
    protected function getViewClass()
    {
        return SingleHtml5FileUploadWithPersistenceExampleView::class;
    }
    
    protected function createModel()
    {
        $model = new SingleHtml5FileUploadWithPersistenceExampleModel();
        $model->fileUploadedEvent->attachHandler(function(UploadedFileDetails $file){
            if ($this->model->simulateError){
                throw new FileUploadedException("Error simulated", []);
            }
            return $file->originalFilename;
        });

        return $model;
    }
}