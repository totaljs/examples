F.resize('/img/small/', 100, 100, {}, '/img/');
F.resize('/img/grayscale/', null, null, { cache: false, grayscale: true }, '/img/');
F.resize('/img/filters/', null, null, { blur: true, sepia: true, flip: true, flop: true }, '/img/');
F.resize('/img/50percent/', '50%', null, {}, '/img/');
F.resize('/img/medium/', '70%', null, {}, '/img/', ['.png']);