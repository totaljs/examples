framework.resize('/img/small/', 100, 100, {}, '/img/');
framework.resize('/img/grayscale/', null, null, { grayscale: true }, '/img/');
framework.resize('/img/filters/', null, null, { blur: true, sepia: true, flip: true, flop: true }, '/img/');
framework.resize('/img/50percent/', '50%', null, {}, '/img/');
framework.resize('/img/medium/', '70%', null, {}, '/img/', ['.png']);
