// universal module definition: https://github.com/umdjs/umd/blob/master/returnExports.js#L41
(function (root, factory) {
    if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
  }
}(this, function () {
    var emojis = {{data}},
        test = /(<a href="[^"]*)?\:[a-z0-9_\-\+]+\:/g;

    function emoji(someString, url, size, attrs) {
        return someString.replace(test, function (match, urlMatch) {
            if (urlMatch || emojis.indexOf(match) === -1) {
                return match;
            } else {
                var result = '';
                var name = String(match).slice(1, -1);
                if (!attrs) {
                    attrs = {};
                }
                attrs['class'] = 'emoji';
                attrs.alt = match;
                attrs.title = match;
                attrs.draggable = 'true';
                attrs.ondragstart = "event.dataTransfer.setData('Text', '" + match + "');";
                if (size && size >= 0) {
                    attrs.height = size;
                }
                attrs.src = url + '/' + encodeURIComponent(name) + '.png';
                
                for (var key in attrs) {
                    if (attrs.hasOwnProperty(key)) {
                        result += key + '="' + attrs[key] + '" ';
                    }
                }
                return '<img ' + result + '/>'
            }
        });
    };

    emoji.list = emojis;

    return emoji;
}));
