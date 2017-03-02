<?php

namespace Rhubarb\Leaf\Controls\Html5Upload\Examples\SingleUploadWithPersistence;

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

        // If your model has events you want to listen to you should attach the handlers here
        // e.g.
        // $model->selectedUserChangedEvent->attachListener(function(){ ... });

        return $model;
    }
}