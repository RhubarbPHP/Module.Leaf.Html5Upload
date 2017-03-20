<?php

namespace Rhubarb\Leaf\Controls\Html5Upload\Examples\SingleUpload;

use Rhubarb\Leaf\Controls\Common\FileUpload\UploadedFileDetails;
use Rhubarb\Leaf\Controls\Html5Upload\Html5FileUpload;
use Rhubarb\Leaf\Views\View;

class SingleUploadExampleView extends View
{
    protected function createSubLeaves()
    {
        parent::createSubLeaves();

        $this->registerSubLeaf(
            $upload = new Html5FileUpload("TestUpload")
        );

        $upload->setAllowMultipleUploads(false);
    }

    public function getDeploymentPackage()
    {
        $package = parent::getDeploymentPackage();
        $package->resourcesToDeploy[] =  __DIR__.'/styles.css';

        return $package;
    }

    protected function printViewContent()
    {
        print $this->leaves["TestUpload"];
    }
}
