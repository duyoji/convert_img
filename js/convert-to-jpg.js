'use strict';
(function () {
    var input = document.getElementById('uploadFile');
    var converted = document.getElementById('convert-img');
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var reader = new FileReader();

    function dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], {type:mimeString});
    }

    function onImageLoaded (event) {
        var image = event.path[0];
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0);

        // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
        var imageQuality = 0.8; // 0~1
        var dataURL = canvas.toDataURL('image/jpeg', imageQuality);
        var blob = dataURItoBlob(dataURL);
        var fd = new FormData(document.forms[0]);
        converted.src = dataURL;
        fd.append("canvasImage", blob);
        console.log(fd, document.forms[0]);
        window._fd = fd;

        // fixed width size with keeping image ratio.
        var baseWidth = 300;
        var ratio = baseWidth / image.width;
        converted.width = baseWidth;
        converted.height = parseInt(image.height * ratio, 10);
    }

    reader.onload = function (event) {
        var image = new Image();
        image.onload = onImageLoaded;
        image.src = event.target.result;
    };

    input.addEventListener('change', function (event) {
        var file = event.target.files[0];
        reader.readAsDataURL(file);
    });
})();
