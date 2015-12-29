'use strict';

Model.Credit = (function () {

    var Model = {};

    Model.Credit = function () {
        var me = this;

        me.developers = [
            'Ahmet Samet Yüzlü',
            'Övül Cebe'
        ];

        me.plugins = [
            {
                name: 'jQuery',
                url: 'https://jquery.com/',
                usage: 'To ease the pain with interacting UI.'
            },
            {
                name: 'Underscore',
                url: 'http://underscorejs.org//',
                usage: '80+ functions that support both the usual functional suspects: map, filter, invoke, etc...'
            },
            {
                name: 'Bootstrap',
                url: 'https://getbootstrap.com/',
                usage: 'UI Library to have a nice UI which is also compatible with mobile devices. '
            },
            {
                name: 'Font Awesome',
                url: 'https://fortawesome.github.io/Font-Awesome/',
                usage: 'To have some nice icons on our program. '
            },
            {
                name: 'Bootbox',
                url: 'http://bootboxjs.com/',
                usage: 'To use bootstrap model\'s without pain. '
            }
        ];
    };

    var instance;

    return {
        getInstance: function () {
            if (!instance) {
                instance = new Model.Credit();
            }
            return instance;
        }
    };

})();