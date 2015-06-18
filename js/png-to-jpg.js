'use strict';
(function () {
    var input = document.getElementById('uploadFile');
    var converted = document.getElementById('convert-img');
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var reader = new FileReader();

    function onImageLoaded (event) {
        var image = event.path[0];
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0);

        // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
        var imageQuality = 0.8; // 0~1
        converted.src = canvas.toDataURL('image/jpeg', imageQuality);

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
