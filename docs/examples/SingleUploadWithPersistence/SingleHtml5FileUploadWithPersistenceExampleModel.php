<?php

namespace Rhubarb\Leaf\Controls\Html5Upload\Examples\SingleUploadWithPersistence;

use Rhubarb\Crown\Events\Event;
use Rhubarb\Leaf\Leaves\LeafModel;

class SingleHtml5FileUploadWithPersistenceExampleModel extends LeafModel
{
    public $example = "";

    public $simulateError = false;

    public $initialValue = "";

    /**
     * @var Event
     */
    public $fileUploadedEvent;

    public function __construct()
    {
        parent::__construct();

        $this->fileUploadedEvent = new Event();
    }
}