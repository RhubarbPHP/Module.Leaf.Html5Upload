Html5FileUpload
===========

> This component is part of the "rhubarbphp/module-leaf-html5upload" composer package.

The Html5FileUpload control extends the SimpleFileUpload class to allow use of modern HTML 5 XHR uploading.

If supported the control will present the following elements during upload:

* 'Cancel Upload' button
* Progress bar
* Upload speed indication

## Standard usage

For simple behaviour using the control is identical to using the SimpleFileUpload control and the same
`fileUploadedEvent` is raised. However you should be aware that the event could be raised either during
an XHR request or a normal POST request (if the client doesn't support HTML 5) and so if you are
upgrading from SimpleFileUpload it's likely the overall strategy for your page may need to change.
  
## Additional properties and methods
 
setAllowMultipleUploads(bool)
:   True to enable multiple uploads from a single selection 

setIndicators(Html5FileUploadIndicators)
:   Sets an object of type Html5FileUploadIndicators that has the following four boolean flags
    uploadSpeed, timeRemaining, overallProgress (e.g. 1 of 3), currentFileName.
    These flags control which elements are present during upload in the indication area.

getIndicators()
:   Gets the current Html5FileUploadIndicators flag set.

## Customising Upload Behaviours

The view bridge of the upload emits events at key integration points allowing for some very
individual cases a place to handle these within a parent view bridge.

The client events raised are:

"UploadStarted"
:   Raised when a new file starts uploading. The javascript File object is passed as an argument.

"ProgressReported"
:   Raised when a new upload progress data is available. The javascript File object and a progress
    structure are passed as arguments.

"UploadCompleted"
:   Raised when a file upload completes. The javascript file object is passed as an argument.

"UploadCancelled"
:   Raised when the user clicks "Cancel Upload"

The other approach is to extend the Leaf, View and ViewBridge to change or wrap the existing behaviours
in a new upload control.

## Examples
 
### Out-of-the-box upload 
 
``` demo[examples/SingleUpload/SingleUploadExample.php]
```

### Upload with 'existing file' support

``` demo[examples/SingleUploadWithPersistence/SingleHtml5FileUploadWithPersistenceExample.php]
```