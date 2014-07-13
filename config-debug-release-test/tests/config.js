exports.run = function(framework) {
    var builder = [];

    Object.keys(framework.config).forEach(function(o) {
        var value = framework.config[o];
        builder.push('{0} : {1}'.format(o.padRight(30, ' '), value instanceof Array ? value.join(', ') : value));
    });

    console.log(builder.join('\n'));
    console.log('');
};