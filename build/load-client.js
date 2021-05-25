(function () {
    function fetchFiles(callback) {
        var req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (req.readyState === XMLHttpRequest.DONE) {
                if (req.status === 200) {
                    var files = JSON.parse(req.responseText).files;
                    var cssFile = files['main.css'];
                    var jsFile = files['main.js'];
                    callback(cssFile, jsFile);
                }
            }
        };
        req.open('GET', '/asset-manifest.json');
        req.send();
    }
    function init() {
        var l = document.getElementById('bmbclientloader');
        if (l) {
            var m = l.getAttribute('data-m');
            if (m) {
                window.BMB.renderFixedClient(m);
            }
        }
    }
    fetchFiles(function (cssFile, jsFile) {
        var loadedCount = 0;
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        var script = document.createElement('script');
        function loaded() {
            loadedCount += 1;
            if (loadedCount === 2) {
                init();
            }
        }
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = cssFile;
        link.onload = loaded;
        head.appendChild(link);
        script.src = jsFile;
        script.onload = loaded;
        head.appendChild(script);
    });
})();
