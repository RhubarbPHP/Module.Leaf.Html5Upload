<?php

namespace Rhubarb\Leaf\Controls\Html5Upload;

class SingleHtml5FileUploadWithPersistenceView extends Html5FileUploadView
{
    protected function getViewBridgeName()
    {
        return "SingleHtml5FileUploadWithPersistenceViewBridge";
    }

    public function getDeploymentPackage()
    {
        $package = parent::getDeploymentPackage();
        $package->resourcesToDeploy[] = __DIR__."/SingleHtml5FileUploadWithPersistenceViewBridge.js";

        return $package;
    }
}