<?php

namespace Rhubarb\Leaf\Controls\Html5Upload;

class Html5FileUploadIndicators
{
    public $uploadSpeed = true;
    public $timeRemaining = true;
    public $overallProgress = true;
    public $currentFileName = true;

    public function __construct(
        $uploadSpeed = true,
        $timeRemaining = true,
        $overallProgress = true,
        $currentFileName = true)
    {
        $this->uploadSpeed = $uploadSpeed;
        $this->timeRemaining = $timeRemaining;
        $this->overallProgress = $overallProgress;
        $this->currentFileName = $currentFileName;
    }
}