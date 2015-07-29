// Merging files
F.merge('merge.js', '/js/a.js', '/js/b.js', 'http://www.totaljs.com/inject.js');
F.merge('together.html', 'a.html', ['b.html', 'c.html'], '~' + F.path.root('d.html'));