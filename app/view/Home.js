'use strict';

View.Home = function () {

    var me = new View.Abstract();

    me.init = function () {

    };

    me.render = function () {
        me.html = '';
        me.html += '<h1 class="main-title">Welcome</h1>';
        me.html += '<p>This software is created for SM503 project. </p>';
        me.html += '<p>Main url of the source code <a href="https://github.com/ahmetsametyuzlu/sm503" target="_blank">https://github.com/ahmetsametyuzlu/sm503</a></p>';
        me.html += '<h4>Assumptions</h4>';
        me.html += '<ul>';
        me.html += '    <li>Namespaces will be defined in app/NameSpace.js file. They will be used as namespaces.</li>';
        me.html += '    <li>The state of software will not be tracked with url bar. </li>';
        me.html += '    <li>User will be using software with a up to date browser. >= IE10, Google Chrome, Firefox, Safari, Opera. Executables for each operating system and mobile platforms can also be generated. </li>';
        me.html += '    <li>Folder structure, <br> <img src="asset/img/structure.png" width="300"></li>';
        me.html += '</ul>';

        me.clear();

        me.page.html(me.html);
    };

    return me;

}