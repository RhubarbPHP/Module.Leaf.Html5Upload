<?php

namespace Rhubarb\Leaf\Controls\Html5Upload;

use Rhubarb\Leaf\Leaves\LeafDeploymentPackage;
use Rhubarb\Leaf\Views\View;

class DragAndDropHtml5FileUploadView extends Html5FileUploadView
{
    /**
    * @var DragAndDropHtml5FileUploadModel
    */
    protected $model;

    protected function getViewBridgeName()
    {
        return "DragAndDropHtml5FileUploadViewBridge";
    }

    public function getDeploymentPackage()
    {
        $package = parent::getDeploymentPackage();
        $package->resourcesToDeploy[] = __DIR__.'/DragAndDropHtml5FileUploadViewBridge.js';

        return $package;
    }
}