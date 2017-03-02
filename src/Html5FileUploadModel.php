<?php
/**
 * Copyright (c) 2016 RhubarbPHP.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

namespace Rhubarb\Leaf\Controls\Html5Upload;

use Rhubarb\Crown\Events\Event;
use Rhubarb\Leaf\Controls\Common\FileUpload\SimpleFileUploadModel;

class Html5FileUploadModel extends SimpleFileUploadModel
{
    /**
     * Raised when the view bridge pushes us a file.
     *
     * @var Event
     */
    public $fileUploadedEvent;
    
    public $progressLabelType = null;

    public $allowMultipleUploads = true;

    /**
     * @var Html5FileUploadIndicators
     */
    public $indicators = null;

    public function __construct()
    {
        parent::__construct();

        $this->indicators = new Html5FileUploadIndicators();
        $this->fileUploadedEvent = new Event();
    }

    protected function getExposableModelProperties()
    {
        $list = parent::getExposableModelProperties();
        $list[] = "allowMultipleUploads";
        $list[] = "indicators";

        return $list;
    }
}
