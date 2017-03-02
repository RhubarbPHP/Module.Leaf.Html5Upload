<?php

namespace Rhubarb\Leaf\Controls\Html5Upload\Examples\SingleUploadWithPersistence;

use Rhubarb\Leaf\Controls\Common\Buttons\Button;
use Rhubarb\Leaf\Controls\Common\Checkbox\Checkbox;
use Rhubarb\Leaf\Controls\Common\FileUpload\UploadedFileDetails;
use Rhubarb\Leaf\Controls\Common\Text\TextBox;
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
            $upload = new SingleHtml5FileUploadWithPersistence("example"),
            $initialValue = new TextBox("initialValue"),
            new Checkbox("simulateError"),
            new Button("setValue", "Set", function(){
                $this->model->example = $this->model->initialValue;
            })
        );

        $initialValue->setPlaceholderText("Initial Value");

        $upload->fileUploadedEvent->attachHandler(function(UploadedFileDetails $file){
            return $this->model->fileUploadedEvent->raise($file);
        });
    }

    protected function printViewContent()
    {
        print $this->leaves["example"];
        print $this->leaves["simulateError"]." Simulate error";
        print $this->leaves["initialValue"];
        print $this->leaves["setValue"];
    }
}