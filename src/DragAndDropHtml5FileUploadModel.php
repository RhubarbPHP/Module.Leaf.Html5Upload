<?php

namespace Rhubarb\Leaf\Controls\Html5Upload;

use Rhubarb\Leaf\Leaves\LeafModel;

class DragAndDropHtml5FileUploadModel extends Html5FileUploadModel
{
    // Define public properties for your module
    // e.g.
    //
    // /**
    //  * The selected user
    //  *
    //  * @var string 
    //  */
    // public $selectedUser;
    //
    // Also you can should define any events you need to raise
    // e.g.
    //
    // /**
    //  * Raised when the selected user changes.
    //  *
    //  * @var Rhubarb\Crown\Events\Event 
    //  */
    // public $selectedUserChangedEvent;

    public function __construct()
    {
        parent::__construct();
        
        // Here you should initialise any event handlers to a new Event object
        // e.g.
        // $this->selectedUserChangedEvent = new Event();
        //
        // You can also non scalar properties to initial values.
    }
}