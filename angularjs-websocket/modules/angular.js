// MIT License
// Copyright Peter Širka <petersirka@gmail.com>
// Version 1.01

exports.name = 'angular.js';
exports.version = '1.01';
exports.options = { 'angular-version': '1.3.15', 'angular-i18n-version': '1.3.15' };

var fs = require('fs');
var EXTENSION_JS = '.js';
var REPOSITORY_ANGULAR = '$angular';
var REPOSITORY_ANGULAR_LOCALE = '$angular-locale';
var REPOSITORY_ANGULAR_COMMON = '$angular-common';
var REPOSITORY_ANGULAR_CONTROLLER = '$angular-controller';
var REPOSITORY_ANGULAR_OTHER = '$angular-other';

exports.install = function() {

    var options = framework.version >= 1900 ? arguments[0] : arguments[1];

    Utils.extend(exports.options, options, true);

    /*
        Include: Angular.js CDN into the head
        @version {String}
        @name {String or String Array} :: optional, example: route or resource
        return {String}
    */
    framework.helpers.ng = function(name) {
        var self = this;

        var length = arguments.length;
        if (length > 1) {
            for (var i = 0; i < length; i++)
                framework.helpers.ng.call(self, arguments[i]);
            return '';
        }

        if (name instanceof Array) {
            length = name.length;
            for (var i = 0; i < length; i++)
                framework.helpers.ng.call(self, name[i]);
            return '';
        }

        var isCommon = name[0] === '~';

        if (isCommon)
            name = name.substring(1);

        if (name === undefined)
            name = 'angular';

        if (name === 'core' || name === '' || name === 'base' || name === 'main')
            name = 'angular';

        if (name !== 'angular' && name.indexOf('angular-') === -1)
            name = 'angular-' + name;

        var output = self.repository[REPOSITORY_ANGULAR] || '';
        var script = $script_create((isCommon ? '/common/' + name + '.min.js' : '//cdnjs.cloudflare.com/ajax/libs/angular.js/' + exports.options['angular-version'] + '/' + name + '.min.js'));

        if (name === 'angular')
            output = script + output;
        else
            output += script;

        self.repository[REPOSITORY_ANGULAR] = output;
        return '';
    };


    framework.helpers.ngCommon = function(name) {

        var self = this;
        var length = arguments.length;

        if (length > 1) {
            for (var i = 0; i < length; i++)
                framework.helpers.call(self, arguments[i]);
            return '';
        }

        if (name instanceof Array) {
            length = name.length;
            for (var i = 0; i < length; i++)
                framework.helpers.ngCommon.call(self, name[i]);
            return '';
        }

        var output = self.repository[REPOSITORY_ANGULAR_COMMON] || '';

        if (name.lastIndexOf(EXTENSION_JS) === -1)
            name += EXTENSION_JS;

        var script = $script_create('/common/' + name);
        output += script;

        self.repository[REPOSITORY_ANGULAR_COMMON] = output;
        return '';
    };

    framework.helpers.ngLocale = function(name) {

        var self = this;
        var length = arguments.length;

        if (length > 2) {
            for (var i = 1; i < length; i++)
                framework.helpers.ngLocale.call(self, arguments[i]);
            return '';
        }

        if (name instanceof Array) {
            length = name.length;
            for (var i = 0; i < length; i++)
                framework.helpers.ngLocale.call(self, name[i]);
            return '';
        }

        var output = self.repository[REPOSITORY_ANGULAR_LOCALE] || '';
        var isLocal = name[0] === '~';
        var extension = '';

        if (isLocal)
            name = name.substring(1);

        if (name.indexOf('angular-locale_') !== -1)
            name = name.replace('angular-locale_', '');

        if (name.lastIndexOf(EXTENSION_JS) === -1)
            extension = EXTENSION_JS;

        output += $script_create(isLocal ? '/i18n/angular-locale_' + name + extension : '//cdnjs.cloudflare.com/ajax/libs/angular.js/' + exports.options['angular-i18n-version'] + '/i18n/angular-locale_' + name + extension);
        self.repository[REPOSITORY_ANGULAR_LOCALE] = output;

        return '';
    };

    /*
        Include: Controller into the head
        @name {String or String Array}
        return {String}
    */
    framework.helpers.ngController = function(name) {

        var self = this;

        var length = arguments.length;
        if (length > 1) {
            for (var i = 0; i < length; i++)
                framework.helpers.ngController.call(self, arguments[i]);
            return '';
        }

        if (name instanceof Array) {
            length = name.length;
            for (var i = 0; i < length; i++)
                framework.helpers.ngController.call(self, name[i]);
            return '';
        }

        if (name.lastIndexOf(EXTENSION_JS) === -1)
            name += EXTENSION_JS;

        var output = self.repository[REPOSITORY_ANGULAR_CONTROLLER] || '';
        var isLocal = name[0] === '~';

        if (isLocal)
            name = name.substring(1);

        output += $script_create('/controllers/' + name);

        self.repository[REPOSITORY_ANGULAR_CONTROLLER] = output;

        return '';
    };

    /*
        Include: Content from file into the body
        @name {String}
        return {String}
    */
    framework.helpers.ngTemplate = function(name, id) {

        var self = this;

        if (id === undefined)
            id = name;

        if (name.lastIndexOf('.html') === -1)
            name += '.html';

        if (name[0] === '~')
            name = name.substring(1);
        else if (name[1] !== '/')
            name = '/templates/' + name;

        var key = 'ng-' + name;
        var tmp = framework.temporary.views[key];

        if (tmp === undefined) {
            var filename = utils.combine(self.config['directory-public-virtual'], name);

            if (fs.existsSync(filename))
                tmp = fs.readFileSync(filename).toString('utf8');
            else
                tmp = '';

            if (!self.isDebug)
                framework.temporary.views[key] = tmp;
        }

        return '<script type="text/ng-template" id="' + id + '">' + tmp + '</script>';
    };

    /*
        Include: Directive into the head
        @name {String}
        return {String}
    */
    framework.helpers.ngDirective = function(name) {

        var self = this;

        var length = arguments.length;
        if (length > 1) {
            for (var i = 0; i < length; i++)
                framework.helpers.ngDirective.call(self, arguments[i]);
            return '';
        }

        if (name instanceof Array) {
            length = name.length;
            for (var i = 0; i < length; i++)
                framework.helpers.ngDirective.call(self, name[i]);
            return '';
        }

        if (name.lastIndexOf(EXTENSION_JS) === -1)
            name += EXTENSION_JS;

        var output = self.repository[REPOSITORY_ANGULAR_OTHER] || '';
        var isLocal = name[0] === '~';

        if (isLocal)
            name = name.substring(1);

        output += $script_create('/directives/' + name);
        self.repository[REPOSITORY_ANGULAR_OTHER] = output;
        return '';
    };

    /*
        Include: CSS into the head
        @name {String}
        return {String}
    */
    framework.helpers.ngStyle = function(name) {

        var self = this;
        var length = arguments.length;

        if (length > 1) {
            for (var i = 0; i < length; i++)
                framework.helpers.ngStyle.call(self, arguments[i]);
            return '';
        }

        if (name instanceof Array) {
            length = name.length;
            for (var i = 0; i < length; i++)
                framework.helpers.ngStyle.call(self, name[i]);
            return '';
        }

        if (name.lastIndexOf('.css') === -1)
            name += '.css';

        self.head(name);
        return '';
    };

    /*
        Include: Service into the head
        @name {String}
        return {String}
    */
    framework.helpers.ngService = function(name) {

        var self = this;

        var length = arguments.length;
        if (length > 1) {
            for (var i = 0; i < length; i++)
                framework.helpers.ngService.call(self, arguments[i]);
            return '';
        }

        if (name instanceof Array) {
            length = name.length;
            for (var i = 0; i < length; i++)
                framework.helpers.ngService.call(self, name[i]);
            return '';
        }

        if (name.lastIndexOf(EXTENSION_JS) === -1)
            name += EXTENSION_JS;

        var output = self.repository[REPOSITORY_ANGULAR_OTHER] || '';
        var isLocal = name[0] === '~';

        if (isLocal)
            name = name.substring(1);

        output += $script_create('/services/' + name);
        self.repository[REPOSITORY_ANGULAR_OTHER] = output;

        return '';
    };

    /*
        Include: Filter into the head
        @name {String}
        return {String}
    */
    framework.helpers.ngFilter = function(name) {

        var self = this;

        var length = arguments.length;
        if (length > 1) {
            for (var i = 0; i < length; i++)
                framework.helpers.ngFilter.call(self, arguments[i]);
            return '';
        }

        if (name instanceof Array) {
            length = name.length;
            for (var i = 0; i < length; i++)
                framework.helpers.ngFilter.call(self, name[i]);
            return '';
        }

        if (name.lastIndexOf(EXTENSION_JS) === -1)
            name += EXTENSION_JS;

        var output = self.repository[REPOSITORY_ANGULAR_OTHER] || '';
        var isLocal = name[0] === '~';

        if (isLocal)
            name = name.substring(1);

        output += $script_create('/filters/' + name);
        self.repository[REPOSITORY_ANGULAR_OTHER] = output;

        return '';
    };

    /*
        Include: Resource into the head
        @name {String}
        return {String}
    */
    framework.helpers.ngResource = function(name) {

        var self = this;

        var length = arguments.length;
        if (length > 1) {
            for (var i = 0; i < length; i++)
                framework.helpers.ngResource.call(self, arguments[i]);
            return '';
        }

        if (name instanceof Array) {
            length = name.length;
            for (var i = 0; i < length; i++)
                framework.helpers.ngResource.call(self, name[i]);
            return '';
        }

        if (name.lastIndexOf(EXTENSION_JS) === -1)
            name += EXTENSION_JS;

        var output = self.repository[REPOSITORY_ANGULAR_OTHER] || '';
        var isLocal = name[0] === '~';

        if (isLocal)
            name = name.substring(1);

        output += $script_create('/resources/' + name);
        self.repository[REPOSITORY_ANGULAR_OTHER] = output;

        return '';
    };

    framework.helpers.ngInclude = function(name) {
        var self = this;

        if (name.lastIndexOf(EXTENSION_JS) === -1)
            name += EXTENSION_JS;

        return $script_create(name);
    };

    framework.on('controller-render-head', event_render_head);
};

exports.uninstall = function() {
    delete framework.helpers.ng;
    delete framework.helpers.ngInclude;
    delete framework.helpers.ngResource;
    delete framework.helpers.ngFilter;
    delete framework.helpers.ngService;
    delete framework.helpers.ngDirective;
    delete framework.helpers.ngTemplate;
    delete framework.helpers.ngController;
    delete framework.helpers.ngLocale;
    delete framework.helpers.ngCommon;
    framework.removeListener('controller-render-head', event_render_head);
};

function event_render_head(controller) {
    var self = controller;
    var angularBeg = (self.repository[REPOSITORY_ANGULAR] || '') + (self.repository[REPOSITORY_ANGULAR_COMMON] || '') + (self.repository[REPOSITORY_ANGULAR_LOCALE] || '');
    var angularEnd = (angularBeg.length > 0 ? $script_create('/app.js') : '') + (self.repository[REPOSITORY_ANGULAR_OTHER] || '') + (self.repository[REPOSITORY_ANGULAR_CONTROLLER] || '');
    self.repository['$head'] += angularBeg + angularEnd;
}

function $script_create(url) {
    return '<script type="text/javascript" src="' + url + '"></script>';
}
