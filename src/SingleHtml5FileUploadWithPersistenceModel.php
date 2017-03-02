<?php

namespace Rhubarb\Leaf\Controls\Html5Upload;

class SingleHtml5FileUploadWithPersistenceModel extends Html5FileUploadModel
{
    protected function getExposableModelProperties()
    {
        $list = parent::getExposableModelProperties();
        $list[] = "value";

        return $list;
    }
}