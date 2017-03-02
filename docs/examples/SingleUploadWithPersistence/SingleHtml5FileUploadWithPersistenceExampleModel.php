<?php

namespace Rhubarb\Leaf\Controls\Html5Upload\Examples\SingleUploadWithPersistence;

use Rhubarb\Leaf\Leaves\LeafModel;

class SingleHtml5FileUploadWithPersistenceExampleModel extends LeafModel
{
    protected $Example = "fileabc.txt";

    public function __construct()
    {
        parent::__construct();
    }
}