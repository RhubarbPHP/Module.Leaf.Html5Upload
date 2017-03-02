<?php

namespace Rhubarb\Leaf\Controls\Html5Upload\Examples\SingleUploadWithPersistence;

use Rhubarb\Leaf\Controls\Html5Upload\SingleHtml5FileUploadWithPersistence;
use Rhubarb\Leaf\Views\View;

class SingleHtml5FileUploadWithPersistenceExampleView extends View
{
    /**
    * @var SingleHtml5FileUploadWithPersistenceExampleModel
    */
    protected $model;

    protected function createSubLeaves()
    {
        parent::createSubLeaves();

        $this->registerSubLeaf(
            new SingleHtml5FileUploadWithPersistence("Example")
        );
    }

    protected function printViewContent()
    {
        print $this->leaves["Example"];
    }
}