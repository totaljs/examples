// Merging files
MERGE('merge.js', '/js/a.js', '/js/b.js', 'http://www.totaljs.com/inject.js');
MERGE('together.html', 'a.html', ['b.html', 'c.html'], '~' + PATH.root('d.html'));