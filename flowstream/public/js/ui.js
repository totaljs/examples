COMPONENT('exec', function(self, config) {

	var regparent = /\?\d/;

	self.readonly();
	self.blind();
	self.make = function() {

		var scope = null;

		var scopepath = function(el, val) {
			if (!scope)
				scope = el.scope();
			return val == null ? scope : scope ? scope.makepath ? scope.makepath(val) : val.replace(/\?/g, el.scope().path) : val;
		};

		var fn = function(plus) {
			return function(e) {

				var el = $(this);
				var attr = el.attrd('exec' + plus);
				var path = el.attrd('path' + plus);
				var href = el.attrd('href' + plus);
				var def = el.attrd('def' + plus);
				var reset = el.attrd('reset' + plus);

				scope = null;

				var prevent = el.attrd('prevent' + plus);

				if (prevent === 'true' || prevent === '1') {
					e.preventDefault();
					e.stopPropagation();
				}

				if (attr) {
					if (attr.indexOf('?') !== -1) {
						var tmp = scopepath(el);
						if (tmp) {
							var isparent = regparent.test(attr);
							attr = tmp.makepath ? tmp.makepath(attr) : attr.replace(/\?/g, tmp.path);
							if (isparent && attr.indexOf('/') !== -1)
								M.scope(attr.split('/')[0]);
							else
								M.scope(tmp.path);
						}
					}
					EXEC(attr, el, e);
				}

				href && NAV.redirect(href);

				if (def) {
					if (def.indexOf('?') !== -1)
						def = scopepath(el, def);
					DEFAULT(def);
				}

				if (reset) {
					if (reset.indexOf('?') !== -1)
						reset = scopepath(el, reset);
					RESET(reset);
				}

				if (path) {
					var val = el.attrd('value');
					if (val) {
						if (path.indexOf('?') !== -1)
							path = scopepath(el, path);
						var v = GET(path);
						SET(path, new Function('value', 'return ' + val)(v), true);
					}
				}
			};
		};

		self.event('dblclick', config.selector2 || '.exec2', fn('2'));
		self.event('click', config.selector || '.exec', fn(''));
	};
});

COMPONENT('dashboard', 'delay:200;axisX:12;axisY:144;padding:10;serviceinterval:5000', function(self, config, cls) {

	var cls2 = '.' + cls;
	var cache = {};
	var data = [];
	var services = [];
	var events = {};
	var skip = false;
	var drag = {};
	var movable = {};
	var serviceid;
	var pixel;
	var $D = $(document);
	var $W = $(W);

	self.make = function() {

		self.aclass(cls);
		self.on('resize', events.resize);
		$W.on('resize', events.resize);

		$D.on('mousedown touchstart', cls2 + '-title,' + cls2 + '-resize-button', events.ondown);
		$D.on('dragstart', '[draggable]', drag.handler);
		$D.on('touchstart', '[draggable]', drag.handler);

		self.event('mousedown touchstart', cls2 + '-control', function(e) {

			e.preventDefault();
			e.stopPropagation();

			var el = $(this);
			var name = el.attrd('name');
			var id = el.closest(cls2 + '-item').attrd('id');
			var tmp = cache[id];
			if (name === 'settings')
				tmp.meta.settings && tmp.meta.settings.call(tmp, tmp.config, tmp.element);
			else if (name === 'remove')
				self.wdestroy(id, true);
		});

		self.event('dragenter dragover dragexit drop dragleave', function(e) {
			switch (e.type) {
				case 'drop':
					drag.drop(e);
					break;
			}
			e.preventDefault();
		});

		serviceid = setInterval(events.service, config.serviceinterval);
	};

	drag.touchmove = function(e) {
		var evt = e.touches[0];
		drag.lastX = evt.pageX;
		drag.lastY = evt.pageY;
	};

	drag.touchend = function(e) {

		e.target = document.elementFromPoint(drag.lastX, drag.lastY);
		drag.unbind();

		if (e.target !== self.dom) {
			var parent = e.target.parentNode;
			var is = false;
			while (true) {

				if (parent === self.dom) {
					is = true;
					e.target = parent;
					break;
				}

				parent = parent.parentNode;
				if (!parent || parent.tagName === 'BODY' || parent.tagName === 'HTML')
					break;
			}
			if (!is)
				return;
		}

		if (e.target) {
			var pos = self.op.position();
			e.pageX = drag.lastX;
			e.pageY = drag.lastY;
			e.offsetX = e.pageX - pos.left;
			e.offsetY = e.pageY - pos.top;
			self.change(true);
			drag.drop(e);
		}
	};

	drag.bind = function() {
		$D.on('touchmove', drag.touchmove);
		$D.on('touchend', drag.touchend);
	};

	drag.unbind = function() {
		$D.off('touchmove', drag.touchmove);
		$D.off('touchend', drag.touchend);
	};

	drag.handler = function(e) {

		if (HIDDEN(self.element))
			return;

		drag.el = $(e.target);
		e.touches && drag.bind();
		var dt = e.originalEvent.dataTransfer;
		dt && dt.setData('text', '1');
	};

	drag.drop = function(e) {
		var meta = {};
		meta.pageX = e.pageX;
		meta.pageY = e.pageY;
		meta.offsetX = e.offsetX;
		meta.offsetY = e.offsetY;
		meta.el = drag.el;
		meta.target = $(e.target);
		meta.x = (meta.offsetX / pixel) >> 0;
		meta.y = (meta.offsetY / pixel) >> 0;
		meta.d = WIDTH();
		config.ondrop && self.EXEC(config.ondrop, meta, self);
		self.change(true);
	};

	events.service = function() {
		for (var i = 0; i < services.length; i++) {
			var tmp = services[i];
			if (tmp.$service)
				tmp.$service++;
			else
				tmp.$service = 1;
			tmp.meta.service && tmp.meta.service.call(tmp, tmp.$service, tmp.element);
		}
	};

	events.resize = function() {
		self.resize2();
	};

	events.bind = function(is) {

		if (events.is === is)
			return;

		var el = $D;
		if (is) {
			el.on('mouseup touchend', events.onup);
			el.on('mousemove touchmove', events.onmove);
		} else {
			el.off('mouseup touchend', events.onup);
			el.off('mousemove touchmove', events.onmove);
		}

		events.is = is;
	};

	events.ondown = function(e) {

		var el = $(this);
		movable.type = el.hclass(cls + '-title') ? 1 : 2;
		el = el.closest(cls2 + '-item');
		movable.id = el.attrd('id');

		var tmp = cache[movable.id];

		if (movable.type === 2) {
			if (!tmp.meta.actions.resize)
				return;
		} else {
			if (!tmp.meta.actions.move)
				return;
		}

		movable.istouch = e.type === 'touchstart';

		if (movable.istouch) {
			e = e.touches[0];
		} else {
			e.stopPropagation();
			e.preventDefault();
		}

		movable.is = true;
		movable.el = el;
		movable.ticks = Date.now();
		movable.pageX = e.pageX;
		movable.pageY = e.pageY;
		movable.changed = false;
		movable.x = movable.type === 1 ? tmp.offset.x : tmp.offset.width;
		movable.y = movable.type === 1 ? tmp.offset.y : tmp.offset.height;
		events.bind(true);
		el.aclass(cls + '-selected');
	};

	events.onup = function() {
		movable.el.rclass(cls + '-selected');
		movable.is = false;
		events.bind();
		self.resize_container();
		movable.changed && self.modified();
	};

	events.onmove = function(e) {

		if (!movable.is)
			return;

		if (movable.istouch)
			e = e.touches[0];

		var obj = cache[movable.id];
		var diffX = e.pageX - movable.pageX;
		var diffY = e.pageY - movable.pageY;

		movable.changed = true;

		diffX = diffX / pixel >> 0;
		diffY = diffY / pixel >> 0;

		// RESIZE
		if (movable.type === 2) {

			diffX = movable.x + diffX;
			diffY = movable.y + diffY;

			if (diffX <= 0)
				diffX = 1;

			if (diffY <= 0)
				diffY = 1;

			var tmp = diffX + obj.offset.x;
			if (tmp >= config.axisX) {
				tmp = tmp - (tmp - config.axisX) - obj.offset.x;
				diffX = tmp;
			}

			tmp = diffY + obj.offset.y;
			if (tmp >= config.axisY) {
				tmp = tmp - (tmp - config.axisY) - obj.offset.y;
				diffY = tmp;
			}

			obj.offset.width = diffX;
			obj.offset.height = diffY;

			self.woffset(movable.id);
			return;
		}

		diffX = movable.x + diffX;
		diffY = movable.y + diffY;

		if (diffX < 0)
			diffX = 0;

		if (diffY < 0)
			diffY = 0;

		var maxX = diffX + obj.offset.width;
		var maxY = diffY + obj.offset.height;

		if (maxX > config.axisX)
			diffX = config.axisX - obj.offset.width;

		if (maxY > config.axisY)
			diffY = config.axisY - obj.offset.height;

		obj.offset.x = diffX;
		obj.offset.y = diffY;

		self.woffset(movable.id);
	};

	self.destroy = function() {
		$D.off('dragstart', '[draggable]', drag.handler);
		$D.off('touchstart', '[draggable]', drag.handler);
		$D.off('mousedown touchstart', cls2 + '-title,' + cls2 + '-resize-button', events.down);
		$W.off('resize', events.resize);
		events.bind();
		clearInterval(serviceid);
		self.change(true);
	};

	self.resize_container = function() {
		var keys = Object.keys(cache);
		var max = 0;
		for (var i = 0; i < keys.length; i++) {
			var item = cache[keys[i]];
			var y = (+item.container.css('top').replace('px', '')) + (+item.container.css('height').replace('px', ''));
			max = Math.max(y, max);
		}

		var h = config.parent ? self.parent(config.parent).height() : 0;
		max += 20;
		self.css('height', max < h ? h : max);
	};

	self.resize_pixel = function() {
		var width = self.element.width() - (config.padding * 2);
		pixel = (width / config.axisX).floor(3);
	};

	self.resize = function() {
		self.resize_pixel();
		var keys = Object.keys(cache);
		for (var i = 0; i < keys.length; i++)
			self.woffset(keys[i]);
		self.resize_container();
	};

	self.resize2 = function() {
		setTimeout2(self.ID + 'resize', self.resize, 500);
	};

	self.wsize = function(d, offset) {

		var tmp = offset[d];
		if (!tmp) {
			if (d === 'xs')
				d = 'sm';
			tmp = offset[d];
			if (!tmp) {
				d = 'md';
				tmp = offset[d];
				if (!tmp) {
					d = 'lg';
					tmp = offset[d];
				}
			}
		}

		if (!tmp)
			tmp = { x: 0, y: 0, width: 3, height: 3 };

		return tmp;
	};

	self.modified = function() {
		skip = true;
		self.change(true);
		self.update(true);
	};

	self.wdestroy = function(id, bind) {
		var obj = cache[id];
		if (obj) {
			delete cache[id];
			var el = obj.container;
			obj.meta.destroy && obj.meta.destroy.call(obj, obj.element);
			el.find('*').off();
			el.off();
			el.remove();
			var index;
			if (bind) {
				var model = self.get();
				index = model.indexOf(obj.meta);
				if (index !== -1) {
					model.splice(index, 1);
					self.modified();
				}
			}
			index = services.indexOf(obj);
			if (index !== -1)
				services.splice(index, 1);
			index = data.indexOf(obj);
			if (index !== -1)
				data.splice(index, 1);
		}
	};

	var resizewidget = function(obj) {
		obj.meta.resize && obj.meta.resize.call(obj, obj.width, obj.height, obj.element, obj.display);
		!config.noemitresize && obj.element.EXEC('resize');
	};

	self.woffset = function(id, init) {
		var d = WIDTH();
		var obj = cache[id];
		var tmp = self.wsize(d, obj.meta.offset);
		obj.offset = tmp;
		var x = tmp.x * pixel + config.padding;
		var y = tmp.y * pixel + config.padding;
		var w = tmp.width * pixel;
		var h = tmp.height * pixel;
		var classes = [];

		classes.push('d_col' + tmp.width);
		classes.push('d_row' + tmp.height);
		classes.push('d_' + tmp.width + 'x' + tmp.height);

		if (tmp.width === 1 && tmp.height > 1)
			classes.push('d_vertical');

		if (tmp.width > 1 && tmp.height === 1)
			classes.push('d_horizontal');

		if (tmp.width === tmp.height)
			classes.push('d_square');

		var fs = ((((Math.min(tmp.width, tmp.height) / 12) * 100) * pixel).floor(3) / 80);
		obj.container.css({ left: x, top: y, width: w, height: h, 'font-size': fs + 'px' });

		var body = obj.container.find('> ' + cls2 + '-body').rclass2('d_').aclass(classes.join(' '));
		var title = body.find('> ' + cls2 + '-title').height() || 0;
		var prevw = obj.width;
		var prevh = obj.height;

		obj.height = h - title - config.padding * 2;
		obj.width = obj.element.width();
		obj.display = d;
		obj.element.css({ height: obj.height });

		if (init || prevw !== obj.width || prevh !== obj.height)
			setTimeout2(self.ID + 'resizeitem', resizewidget, 200, null, obj);
	};

	self.send = function(type, body) {
		for (var i = 0; i < data.length; i++)
			data[i].meta.data(type, body, data[i].element);
	};

	self.wupd = function(id) {
		var obj = cache[id];
		var meta = obj.meta;
		var el = obj.container;
		el.tclass(cls + '-header', meta.header !== false);
		el.tclass(cls + '-canremove', meta.actions.remove !== false);
		el.tclass(cls + '-canresize', meta.actions.resize !== false);
		el.tclass(cls + '-cansettings', meta.actions.settings !== false);
		self.woffset(id);
	};

	var winit = function(el) {
		el.rclass('invisible');
	};

	self.wadd = function(obj) {

		if (!obj.html)
			obj.html = '&nbsp;';

		var classname = [cls + '-item'];

		if (obj.actions.resize !== false)
			classname.push(cls + '-canresize');

		if (obj.actions.remove !== false)
			classname.push(cls + '-canremove');

		if (obj.actions.settings !== false)
			classname.push(cls + '-cansettings');

		if (obj.header !== false)
			classname.push(cls + '-header');

		classname.push('d-' + obj.component);

		var isdom = obj.html && typeof(obj.html) !== 'string';
		var el = $(('<div class="{1} invisible" data-id="{2}"><div class="{0}-body" style="margin:{5}px"><div class="{0}-title">{4}</div><figure>{3}</figure><span class="{0}-resize-button"></span></div></div>').format(cls, classname.join(' '), obj.id, isdom ? '' : obj.html, '<span class="fa fa-trash-o ui-dashboard-control" data-name="remove"></span><span class="fa fa-cog ui-dashboard-control" data-name="settings"></span>' + obj.title, config.padding));
		self.dom.appendChild(el[0]);
		var tmp = cache[obj.id] = {};
		tmp.container = el;
		tmp.element = el.find('figure');
		isdom && tmp.element[0].appendChild(obj.html);
		tmp.config = tmp.options = obj.config;
		tmp.template = obj.template;
		tmp.meta = obj;
		tmp.main = self;
		self.woffset(obj.id, true);
		tmp.meta.make && tmp.meta.make.call(tmp, tmp.meta, tmp.element);
		el[0].$dashboard = tmp;

		if (!isdom && obj.html)
			obj.html.COMPILABLE() && COMPILE();

		tmp.meta.service && services.push(tmp);
		tmp.meta.data && data.push(tmp);
		setTimeout(winit, obj.delay || config.delay, el);
	};

	self.setter = function(value) {

		if (skip) {
			skip = false;
			return;
		}

		if (!value)
			value = EMPTYARRAY;

		self.resize_pixel();
		services = [];
		data = [];

		var keys = Object.keys(cache);
		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			if (!value.findItem('id', key)) {
				self.wdestroy(key);
				delete cache[key];
			}
		}
		for (var i = 0; i < value.length; i++) {
			var obj = value[i];
			var item = cache[obj.id];
			if (item) {
				if (item.meta === obj) {
					self.wupd(obj.id);
					obj.service && services.push(item);
					obj.data && data.push(item);
					continue;
				} else
					self.wdestroy(obj.id);
			}
			self.wadd(obj);
		}

		self.resize_container();
	};

});

COMPONENT('flow', 'width:6000;height:6000;grid:25;paddingX:6;curvedlines:0;horizontal:0;steplines:0;animationradius:6', function(self, config, cls) {

	// config.infopath {String}, output: { zoom: Number, selected: Object }
	// config.undopath {String}, output: {Object Array}
	// config.redopath {String}, output: {Object Array}

	var D = '__';
	var drag = {};

	self.readonly();
	self.meta = {};
	self.el = {};     // elements
	self.op = {};     // operations
	self.cache = {};  // cache
	self.paused = {};
	self.animations = {};
	self.animations_token = 0;
	self.info = { zoom: 100 };
	self.undo = [];
	self.redo = [];

	self.make = function() {
		self.aclass(cls);

		self.html('<svg width="{width}" height="{height}" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="jflowgrid" width="{grid}" height="{grid}" patternunits="userSpaceOnUse"><path d="M {grid} 0 L 0 0 0 {grid}" fill="none" class="ui-flow-grid" shape-rendering="crispEdges" /></pattern></defs><rect width="100%" height="100%" fill="url(#jflowgrid)" shape-rendering="crispEdges" /><g class="lines"></g><g class="anim"></g></svg>'.arg(config));
		self.el.svg = self.find('svg');
		self.el.anim = self.el.svg.find('g.anim');
		self.el.lines = self.el.svg.find('g.lines');
		self.template = Tangular.compile('<div class="component invisible{{ if inputs && inputs.length }} hasinputs{{ fi }}{{ if outputs && outputs.length }} hasoutputs{{ fi }} f-{{ component }}" data-id="{{ id }}" style="top:{{ y }}px;left:{{ x }}px"><div class="area">{{ if inputs && inputs.length }}<div class="inputs">{{ foreach m in inputs }}<div class="input" data-index="{{ if m.id }}{{ m.id }}{{ else }}{{ $index }}{{ fi }}"><i class="fa component-io"></i></div>{{ end }}</div>{{ fi }}<div class="content">{{ html | raw }}</div>{{ if outputs && outputs.length }}<div class="outputs">{{ foreach m in outputs }}<div class="output" data-index="{{ if m.id }}{{ m.id }}{{ else }}{{ $index }}{{ fi }}"><i class="fa component-io"></i><span>{{ if m.name }}{{ m.name | raw }}{{ else }}{{ m | raw }}{{ fi }}</span></div>{{ end }}</div>{{ fi }}</div></div>');
		self.aclass(cls + '-' + (config.horizontal ? 'h' : 'v'));

		drag.touchmove = function(e) {
			var evt = e.touches[0];
			drag.lastX = evt.pageX;
			drag.lastY = evt.pageY;
		};

		drag.touchend = function(e) {
			e.target = document.elementFromPoint(drag.lastX, drag.lastY);

			if (e.target && e.target.tagName !== 'SVG')
				e.target = $(e.target).closest('svg')[0];

			drag.unbind();

			if (e.target) {
				var pos = self.op.position();
				e.pageX = drag.lastX;
				e.pageY = drag.lastY;
				e.offsetX = e.pageX - pos.left;
				e.offsetY = e.pageY - pos.top;
				drag.drop(e);
			}
		};

		drag.bind = function() {
			$(document).on('touchmove', drag.touchmove).on('touchend', drag.touchend);
		};

		drag.unbind = function() {
			$(document).off('touchmove', drag.touchmove).off('touchend', drag.touchend);
		};

		drag.handler = function(e) {

			if (HIDDEN(self.element))
				return;

			drag.el = $(e.target);
			e.touches && drag.bind();
			var dt = e.originalEvent.dataTransfer;
			dt && dt.setData('text', '1');
		};

		drag.drop = function(e) {
			var meta = {};
			meta.pageX = e.pageX;
			meta.pageY = e.pageY;
			meta.offsetX = e.offsetX;
			meta.offsetY = e.offsetY;
			meta.el = drag.el;
			meta.target = $(e.target);
			config.ondrop && self.EXEC(config.ondrop, meta, self);
		};

		$(document).on('dragstart', '[draggable]', drag.handler).on('touchstart', '[draggable]', drag.handler);

		self.el.svg.on('dragenter dragover dragexit drop dragleave', function(e) {
			switch (e.type) {
				case 'drop':
					drag.drop(e);
					break;
			}
			e.preventDefault();
		});
	};

	self.destroy = function() {
		$(document).off('dragstart', drag.handler);
	};

	self.getOffset = function() {
		return self.element.offset();
	};

	self.setter = function(value, path, type) {

		if (type === 2 || !value)
			return;

		var keys = Object.keys(value);
		var onmake = config.onmake ? GET(self.makepath(config.onmake)) : null;
		var ondone = config.ondone ? GET(self.makepath(config.ondone)) : null;
		var onremove = config.onremove ? GET(self.makepath(config.onremove)) : null;
		var prev = self.cache;
		var ischanged = false;
		var tmp;
		var el;
		var recompile = false;

		self.cache = {};
		self.paused = {};
		self.animations_token = Date.now();
		self.animations = {};

		for (var i = 0; i < keys.length; i++) {

			var key = keys[i];

			if (key === 'paused') {
				self.paused = value[key];
				continue;
			}

			var com = value[key];
			var checksum = self.helpers.checksum(com);

			// com.id = key
			// com.outputs = ['0 output', '1 output', '2 output'] or [{ id: 'X', name: 'Output X' }]
			// com.inputs = ['0 input', '1 input', '2 input'] or [{ id: 'X', name: 'Input X' }]
			// com.connections = { 0: { ID: COMPONENT_ID, index: 'INDEX' } };
			// com.x
			// com.y
			// com.actions = { select: true, move: true, disabled: false, remove: true, connet: true };

			// Delegates
			// com.onmake = function(el, com)
			// com.ondone = function(el, com)
			// com.onmove = function(el, com)
			// com.onremove = function(el, com)
			// com.onconnect = function(meta)
			// com.ondisconnect = function(meta)

			// done && done(el, com);
			// make && make(el, com);

			var tmp = prev[key];
			var rebuild = true;

			com.id = key;

			if (tmp) {
				if (tmp.checksum === checksum)
					rebuild = false;
				delete prev[key];
				el = tmp.el;
			}

			if (rebuild) {
				tmp && tmp.el.aclass('removed').attrd('id', 'removed');
				var html = self.template(com);

				if (!recompile && html && html.COMPILABLE())
					recompile = true;

				html = $(html);
				self.append(html);
				el = self.find('.component[data-id="{id}"]'.arg(com));
				com.onmake && com.onmake(el, com);
				onmake && onmake(el, com);
				com.element = html.find('.content').eq(0);
				if (!ischanged && com.connections && Object.keys(com.connections).length)
					ischanged = true;
				if (type === 1)
					self.op.undo({ type: 'component', id: com.id, instance: com });
			}

			if (!com.connections)
				com.connections = {};

			self.cache[key] = { id: key, instance: com, el: el, checksum: checksum, actions: com.actions || {}};
		}

		// Remove unused components
		keys = Object.keys(prev);
		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			tmp = prev[key];
			tmp.instance.onremove && tmp.instance.onremove(tmp.el, tmp.instance);
			onremove && onremove(tmp.el, tmp.instance);
			self.el.lines.find('.from' + D + key + ', .to' + D + key).aclass('connection removed hidden');
			tmp.el.remove();
		}

		keys = Object.keys(self.cache);
		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			tmp = self.cache[key];
			tmp.instance.ondone && tmp.instance.ondone(tmp.el, tmp.instance);
			ondone && ondone(tmp.el, tmp.instance);
		}

		// ischanged && self.el.lines.find('path').rclass().aclass('connection removed hidden');
		ischanged && self.el.lines.find('path').aclass('removed');

		setTimeout(function() {
			for (var i = 0; i < keys.length; i++) {
				var key = keys[i];
				tmp = self.cache[key];
				tmp.el.rclass('invisible');
				ischanged && tmp.instance.connections && self.reconnect(tmp);
			}
			self.find('.removed').remove();
		}, 300);

		self.undo = [];
		self.redo = [];
		self.op.undo();
		self.op.redo();
		self.op.refreshinfo();

		COMPILE();
	};

	self.reconnect = function(m) {
		var indexes = Object.keys(m.instance.connections);
		for (var i = 0; i < indexes.length; i++) {
			var index = indexes[i];
			var output = m.el.find('.output[data-index="{0}"]'.format(index));
			var inputs = m.instance.connections[index];
			var problem = false;
			for (var j = 0; j < inputs.length; j++) {
				var com = inputs[j];
				var el = self.find('.component[data-id="{0}"]'.format(com.id));
				var input = el.find('.input[data-index="{0}"]'.format(com.index));
				if (!self.el.connect(output, input, true)) {
					inputs[j] = null;
					problem = true;
				}
			}
			if (problem) {
				index = 0;
				while (true) {
					var item = inputs[index];
					if (item === undefined)
						break;
					if (item === null)
						inputs.splice(index, 1);
					else
						index++;
				}
			}
		}
	};

	self.selected = function(callback) {

		var output = {};
		var arr;
		var tmp;
		var el;

		output.components = [];
		output.connections = [];

		arr = self.find('.component-selected');
		for (var i = 0; i < arr.length; i++) {
			el = arr[i];
			tmp = self.cache[el.getAttribute('data-id')];
			tmp && output.components.push(tmp);
		}

		arr = self.find('.connection-selected');
		for (var i = 0; i < arr.length; i++) {

			el = arr[i];
			var cls = el.getAttribute('class').split(' ');
			for (var j = 0; j < cls.length; j++) {
				var c = cls[j];
				if (c.substring(0, 4 + D.length) === 'conn' + D) {
					var a = c.split(D);
					var tmp = {};
					tmp.output = self.cache[a[1]].instance;
					tmp.input = self.cache[a[2]].instance;
					tmp.fromid = a[1];
					tmp.toid = a[2];
					tmp.fromindex = a[3];
					tmp.toindex = a[4];
					output.connections.push(tmp);
				}
			}
		}

		callback && callback(output);
		return output;
	};
});

// Designer: Helpers
EXTENSION('flow:helpers', function(self, config) {

	var D = '__';

	self.helpers = {};

	self.helpers.checksum = function(obj) {
		var checksum = (obj.outputs ? obj.outputs.length : 0) + ',' + (obj.inputs ? obj.inputs.length : 0) + ',' + (obj.html || '');
		return HASH(checksum, true);
	};

	self.helpers.connect = function(x1, y1, x4, y4, index) {

		var y = (y4 - y1) / ((index || 0) + 2);
		var x2 = x1;
		var y2 = y1 + y;
		var x3 = x4;
		var y3 = y1 + y;
		var s = ' ';
		var padding = 15;

		if (config.curvedlines)
			return self.helpers.diagonal(x1, y1, x4, y4);

		var builder = [];

		builder.push('M' + (x1 >> 0) + s + (y1 >> 0));

		if (config.horizontal) {

			x2 += padding;
			builder.push('L' + (x2 >> 0) + s + (y1 >> 0));

			y4 -= padding;
			builder.push('L' + (x4 >> 0) + s + (y4 >> 0));
			y4 += padding;

		} else if (config.steplines) {
			if ((x1 !== x4 || y1 !== y4)) {
				builder.push('L' + (x2 >> 0) + s + (y2 >> 0));
				builder.push('L' + (x3 >> 0) + s + (y3 >> 0));
			}
		}

		builder.push('L' + (x4 >> 0) + s + (y4 >> 0));
		return builder.join(s);
	};

	self.helpers.move1 = function(x1, y1, conn) {
		var pos = conn.attrd('offset').split(',');
		conn.attr('d', self.helpers.connect(x1, y1, +pos[2], +pos[3], +conn.attrd('fromindex')));
		conn.attrd('offset', x1 + ',' + y1 + ',' + pos[2] + ',' + pos[3]);
	};

	self.helpers.checkconnected = function(meta) {
		meta.el.tclass('connected', Object.keys(meta.instance.connections).length > 0);
	};

	self.helpers.checkconnectedoutput = function(id, index) {
		var is = !!self.el.lines.find('.from' + D + id + D + index).length;
		self.find('.component[data-id="{0}"]'.format(id)).find('.output[data-index="{0}"]'.format(index)).tclass('connected', is);
	};

	self.helpers.checkconnectedinput = function(id, index) {
		var is = !!self.el.lines.find('.to' + D + id + D + index).length;
		self.find('.component[data-id="{0}"]'.format(id)).find('.input[data-index="{0}"]'.format(index)).tclass('connected', is);
	};

	self.helpers.move2 = function(x4, y4, conn) {
		var pos = conn.attrd('offset').split(',');
		conn.attr('d', self.helpers.connect(+pos[0], +pos[1], x4, y4, +conn.attrd('fromindex')));
		conn.attrd('offset', pos[0] + ',' + pos[1] + ',' + x4 + ',' + y4);
	};

	self.helpers.isconnected = function(output, input) {

		var co = output.closest('.component');
		var ci = input.closest('.component');
		var coid = self.cache[co.attrd('id')];
		var ciid = self.cache[ci.attrd('id')];

		if (coid.actions.disabled || coid.actions.connect === false || ciid.actions.disabled || ciid.actions.connect === false)
			return true;

		var el = $('.conn' + D + co.attrd('id') + D + ci.attrd('id') + D + output.attrd('index') + D + input.attrd('index'));
		return el.length > 0;
	};

	self.helpers.position = function(el, isout) {

		var component = el.closest('.component');
		var pos = el.offset();
		var mainoffset = el.closest('.ui-flow').offset();

		var x = (pos.left - mainoffset.left) + 12;
		var y = (pos.top - mainoffset.top) + 10;

		if (isout && config.horizontal) {
			var zoom = self.info.zoom / 100;
			x += (component.width() * zoom) - 13;
		}

		var id = component.attrd('id');
		var indexid = el.attrd('index');

		/*
		var index = -1;
		var tmp = self.cache[id].instance;

		if (isout) {
			index = tmp.outputs.indexOf(indexid);
			if (index === -1)
				index = tmp.outputs.findIndex('id', indexid);
		} else {
			index = tmp.inputs.indexOf(indexid);
			if (index === -1)
				index = tmp.inputs.findIndex('id', indexid);
		}*/

		return { x: x >> 0, y: y >> 0, id: id, index: indexid };
	};

	self.helpers.parseconnection = function(line) {
		var arr = line.attr('class').split(' ');
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].substring(0, 4 + D.length) === 'conn' + D) {
				var info = arr[i].split(D);
				var obj = {};
				obj.fromid = info[1];
				obj.toid = info[2];
				obj.fromindex = info[3];
				obj.toindex = info[4];
				return obj;
			}
		}
	};

	self.helpers.diagonal = function(x1, y1, x4, y4) {
		if (config.horizontal)
			return 'M' + x1 + ',' + y1 + 'C' + ((x1 + x4) / 2) + ',' + y1 + ' ' + x4 + ',' + ((y1 + y4) / 2) + ' ' + x4 + ',' + y4;
		else
			return 'M' + x1 + ',' + y1 + 'C' + x1 +  ',' + ((y1 + y4) / 2) + ' ' + x4 + ',' + ((y1 + y4) / 2) + ' ' + x4 + ',' + y4;
	};

});

EXTENSION('flow:operations', function(self, config) {

	var D = '__';

	// Internal method
	var removeconnections = function(next, removed) {

		var connections = next.instance.connections;
		var keys = Object.keys(connections);
		var meta = {};
		var onremove = function(conn) {

			var is = conn.id === removed.id;
			if (is) {
				meta.output = next.instance;
				meta.input = removed.instance;
				meta.fromid = next.id;
				meta.toid = removed.id;
				meta.toindex = conn.index;
				next.instance.ondisconnect && next.instance.ondisconnect.call(next.instance, meta);
				removed.instance.ondisconnect && removed.instance.ondisconnect.call(removed.instance, meta);
				config.ondisconnect && self.EXEC(config.ondisconnect, meta);
			}

			return is;
		};

		for (var i = 0; i < keys.length; i++) {
			var index = keys[i];
			var conn = connections[index];
			meta.fromindex = index;
			connections[index] = conn = conn.remove(onremove);
			if (conn.length === 0) {
				delete connections[index];
				self.helpers.checkconnectedoutput(next.id, index);
			}
		}

		self.helpers.checkconnected(next);
	};

	self.op.unselect = function(type) {
		var cls = 'connection-selected';
		if (type == null || type === 'connections') {
			self.el.lines.find('.' + cls).rclass(cls);
			self.el.lines.find('.highlight').rclass('highlight');
		}

		cls = 'component-selected';

		if (type == null || type === 'component')
			self.find('.' + cls).rclass(cls);

		if (self.info.selected) {
			self.info.selected = null;
			self.op.refreshinfo();
		}

	};

	self.op.modified = function() {
		self.change(true);
		self.update(true, 2);
	};

	self.op.clean = function() {

		var model = self.get();
		var keys = Object.keys(model);
		var subkeys;

		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];

			if (key === 'paused') {
				var count = 0;
				subkeys = Object.keys(model.paused);
				for (var j = 0; j < subkeys.length; j++) {
					var subkey = subkeys[j];
					var tmp = subkey.split(D);
					if (!model[tmp[1]] || !model[tmp[1]].connections || !model[tmp[1]].connections[tmp[2]])
						delete model.paused[subkey];
					else
						count++;
				}
				if (!count)
					delete model.paused;
				continue;
			}

			// check connections
			var com = model[key];
			subkeys = Object.keys(com.connections);
			for (var j = 0; j < subkeys.length; j++) {

				var subkey = subkeys[j];
				var tmp = model[key].connections[subkey];
				var index = 0;

				while (true) {
					var conn = tmp[index];
					if (conn == null)
						break;

					if (!model[conn.id] || !model[conn.id].inputs) {
						tmp.splice(index, 1);
						continue;
					}

					index++;
				}

				if (!tmp.length)
					delete model[key].connections;
			}
		}
	};

	self.op.remove = function(id, noundo) {

		var tmp = self.cache[id];
		if (tmp == null || tmp.actions.remove === false)
			return false;

		tmp.instance.onremove && tmp.instance.onremove(tmp.el, tmp.instance);
		config.onremove && self.EXEC(config.onremove, tmp.el, tmp.instance);

		delete self.cache[id];
		delete self.get()[id];

		self.el.lines.find('.from' + D + id).remove();
		self.el.lines.find('.to' + D + id).remove();

		// browse all components and find dependencies to this component
		var keys = Object.keys(self.cache);
		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			removeconnections(self.cache[key], tmp);
		}

		var connections = tmp.instance.connections;
		keys = Object.keys(connections);

		for (var i = 0; i < keys.length; i++) {
			var index = keys[i];
			var conns = connections[index];
			for (var j = 0; j < conns.length; j++) {
				var conn = conns[j];
				self.helpers.checkconnectedinput(conn.id, conn.index);
			}
		}

		if (!noundo)
			self.op.undo({ type: 'remove', id: id, instance: tmp.instance });

		self.find('.component[data-id="{0}"]'.format(id)).remove();
		self.op.modified();
		return true;
	};

	self.op.select = function(id) {

		var com = self.cache[id];
		if (com == null)
			return false;

		var cls = 'component-selected';
		self.find('.' + cls).rclass(cls);
		self.find('.component[data-id="{0}"]'.format(id)).aclass(cls);

		var connections = self.el.lines.find('.from{0},.to{0}'.format(D + id)).aclass('highlight');
		var parent = self.el.lines[0];

		for (var i = 0; i < connections.length; i++) {
			var dom = connections[i];
			parent.removeChild(dom);
			parent.appendChild(dom);
		}

		self.info.selected = com.instance;
		self.op.refreshinfo();
		return true;
	};

	self.op.modify = function(instance, type) {
		if (!instance.changes)
			instance.changes = {};
		instance.changes[type] = 1;
	};

	self.op.disconnect = function(fromid, toid, fromindex, toindex, noundo) {

		if (typeof(fromid) === 'object') {
			var meta = fromid;
			toid = meta.toid;
			fromindex = meta.fromindex;
			toindex = meta.toindex;
			fromid = meta.fromid;
		}

		var a = self.cache[fromid];
		var b = self.cache[toid];

		if (!a || !b)
			return false;

		var ac = a.instance;

		self.op.modify(a.instance, 'disconnect');
		self.op.modify(b.instance, 'disconnect');

		toindex += '';
		fromindex += '';

		var conn = ac.connections[fromindex].findItem(function(conn) {
			return conn.id === toid && conn.index === toindex;
		});

		if (!conn || conn.disabled)
			return false;

		ac.connections[fromindex].splice(ac.connections[fromindex].indexOf(conn), 1);

		if (!ac.connections[fromindex].length)
			delete ac.connections[fromindex];

		if (!noundo)
			self.op.undo({ type: 'disconnect', fromid: fromid, toid: toid, fromindex: fromindex, toindex: toindex });

		self.el.lines.find('.conn{0}{1}{2}{3}'.format(D + fromid, D + toid, D + fromindex, D + toindex)).remove();
		self.op.modified();
		self.helpers.checkconnected(a);
		self.helpers.checkconnectedoutput(fromid, fromindex);
		self.helpers.checkconnectedinput(toid, toindex);
		return true;
	};

	self.op.reposition = function() {

		var dzoom = self.info.zoom / 100;
		var dzoomoffset = ((100 - self.info.zoom) / 10) + (self.info.zoom > 100 ? 1 : -1);

		var zoom = function(val) {
			return Math.ceil(val / dzoom) - dzoomoffset;
		};

		self.el.lines.find('.connection').each(function() {

			var path = $(this);
			var meta = self.helpers.parseconnection(path);

			if (!meta)
				return;

			var output = self.find('.component[data-id="{0}"]'.format(meta.fromid)).find('.output[data-index="{0}"]'.format(meta.fromindex));
			var input = self.find('.component[data-id="{0}"]'.format(meta.toid)).find('.input[data-index="{0}"]'.format(meta.toindex));
			var a = self.helpers.position(output, true);
			var b = self.helpers.position(input);

			// I don't know why :-D
			b.x -= config.paddingX;

			if (dzoom !== 1) {
				b.x = zoom(b.x);
				b.y = zoom(b.y);
				a.x = zoom(a.x);
				a.y = zoom(a.y);
			}

			path.attrd('offset', a.x + ',' + a.y + ',' + b.x + ',' + b.y);
			path.attrd('fromindex', a.index);
			path.attrd('toindex', b.index);
			path.attr('d', self.helpers.connect(a.x, a.y, b.x, b.y, a.index));
		});
	};

	self.op.position = function() {
		var obj = {};
		var scroll = self.closest('.ui-scrollbar-area')[0];

		if (scroll) {
			obj.scrollTop = scroll.scrollTop;
			obj.scrollLeft = scroll.scrollLeft;
		}

		var offset = self.el.svg.offset();
		obj.left = offset.left;
		obj.top = offset.top;
		return obj;
	};

	self.op.refreshinfo = function() {
		config.infopath && self.SEEX(config.infopath, self.info);
	};

	self.op.undo = function(value) {
		if (value) {
			self.undo.push(value);
			if (self.undo.length > 50)
				self.undo.shift();
		}
		config.undopath && self.SEEX(config.undopath, self.undo);
	};

	self.op.redo = function(value) {
		if (value) {
			self.redo.push(value);
			if (self.redo.length > 50)
				self.redo.shift();
		}
		config.redopath && self.SEEX(config.redopath, self.redo);
	};

	self.op.resize = function() {
		setTimeout2(self.ID + 'reposition', self.op.reposition, 300);
	};

	self.on('resize + resize2', self.op.resize);
});

EXTENSION('flow:map', function(self, config) {

	var events = {};
	var drag = {};

	events.move = function(e) {
		var x = (drag.x - e.pageX);
		var y = (drag.y - e.pageY);

		if (drag.target[0]) {
			drag.target[0].scrollTop +=  ((y / 6) / drag.zoom) >> 0;
			drag.target[0].scrollLeft += ((x / 6) / drag.zoom) >> 0;
		}
	};

	events.movetouch = function(e) {
		events.move(e.touches[0]);
	};

	events.up = function() {
		events.unbind();
	};

	events.bind = function() {
		if (!events.is) {
			events.is = true;
			self.element.on('mouseup', events.up);
			self.element.on('mousemove', events.move);
			self.element.on('touchend', events.up);
			self.element.on('touchmove', events.movetouch);
		}
	};

	events.unbind = function() {
		if (events.is) {
			events.is = false;
			self.element.off('mouseup', events.up);
			self.element.off('mousemove', events.move);
			self.element.off('touchend', events.up);
			self.element.off('touchmove', events.movetouch);
		}
	};

	self.event('contextmenu', function(e) {
		events.is && events.up();
		config.contextmenu && self.SEEX(config.contextmenu, e, 'map');
		e.preventDefault();
		e.stopPropagation();
	});

	self.event('mousedown touchstart', function(e) {

		if (events.is) {
			events.up();
			return;
		}

		if (e.button || e.target.tagName !== 'rect')
			return;

		var evt = e.touches ? e.touches[0] : e;
		var et = $(e.target);
		var target = et.closest('.ui-scrollbar-area');

		if (!target[0]) {
			target = et.closest('.ui-viewbox');
			if (!target[0])
				return;
		}

		drag.target = target;
		drag.zoom = self.info.zoom / 100;
		drag.x = evt.pageX;
		drag.y = evt.pageY;

		events.bind();
		e.preventDefault();

		// Unselects all selected components/connections
		self.op.unselect();
	});
});

EXTENSION('flow:components', function(self, config) {

	var D = '__';
	var events = {};
	var drag = {};

	var zoom = function(val) {
		return Math.ceil(val / drag.zoom) - drag.zoomoffset;
	};

	drag.css = {};

	events.move = function(e) {

		var x = (e.pageX - drag.x);
		var y = (e.pageY - drag.y);

		drag.css.left = zoom(drag.posX + x);
		drag.css.top = zoom(drag.posY + y);

		if (!drag.is)
			drag.is = true;

		drag.target.css(drag.css);

		// move all output connections
		for (var i = 0; i < drag.output.length; i++) {
			var conn = $(drag.output[i]);
			var pos = self.helpers.position(conn, true);
			var arr = self.el.lines.find('.from' + D + pos.id + D + pos.index);
			for (var j = 0; j < arr.length; j++)
				self.helpers.move1(zoom(pos.x + drag.zoomoffset), zoom(pos.y), $(arr[j]));
		}

		// move all input connections
		for (var i = 0; i < drag.input.length; i++) {
			var conn = $(drag.input[i]);
			var pos = self.helpers.position(conn);
			var arr = self.el.lines.find('.to' + D + pos.id + D + pos.index);
			for (var j = 0; j < arr.length; j++)
				self.helpers.move2(zoom(pos.x - 6), zoom(pos.y), $(arr[j]));
		}
	};

	events.movetouch = function(e) {
		events.move(e.touches[0]);
	};

	events.up = function() {

		if (drag.is) {
			var data = self.get()[drag.id];
			self.op.undo({ type: 'move', id: drag.id, x: data.x, y: data.y, newx: drag.css.left, newy: drag.css.top });
			data.x = drag.css.left;
			data.y = drag.css.top;
			data.onmove && data.onmove(drag.target, data);
			config.onmove && self.EXEC(config.onmove, drag.target, data);
			self.op.modified();
			self.op.modify(data, 'move');
			// self.el.lines.find('.from{0},.to{0}'.format(D + drag.id)).rclass('highlight');
		}

		events.unbind();
	};

	events.bind = function() {
		if (!events.is) {
			events.is = true;
			self.element.on('mouseup', events.up);
			self.element.on('mousemove', events.move);
			self.element.on('touchend', events.up);
			self.element.on('touchmove', events.movetouch);
		}
	};

	events.unbind = function() {
		if (events.is) {
			events.is = false;
			self.element.off('mouseup', events.up);
			self.element.off('mousemove', events.move);
			self.element.off('touchend', events.up);
			self.element.off('touchmove', events.movetouch);
		}
	};

	self.event('contextmenu', '.area', function(e) {
		events.is && events.up();
		var el = $(this);
		var id = el.closest('.component').attrd('id');
		config.contextmenu && self.SEEX(config.contextmenu, e, 'component', self.cache[id].instance);
		e.preventDefault();
		e.stopPropagation();
	});

	self.event('dblclick', '.area', function() {
		var target = $(this).closest('.component');
		config.dblclick && self.SEEX(config.dblclick, self.cache[target.attrd('id')].instance);
	});

	self.event('mousedown touchstart', '.area', function(e) {

		if (events.is) {
			events.up();
			return;
		}

		e.preventDefault();

		var evt = e.touches ? e.touches[0] : e;
		var target = $(e.target).closest('.component');
		drag.id = target.attrd('id');

		var tmp = self.cache[drag.id];

		self.op.unselect('connections');

		if (tmp.actions.select !== false)
			self.op.select(drag.id);

		if (tmp.actions.move === false)
			return;

		drag.target = target;
		drag.x = evt.pageX;
		drag.y = evt.pageY;
		drag.zoom = self.info.zoom / 100;
		drag.zoomoffset = ((100 - self.info.zoom) / 10) + (self.info.zoom > 100 ? 1 : -1);

		drag.is = false;
		drag.output = target.find('.output');
		drag.input = target.find('.input');

		var pos = target.position();
		drag.posX = pos.left;
		drag.posY = pos.top;

		var dom = target[0];
		var parent = dom.parentNode;
		var children = parent.children;

		if (children[children.length - 1] !== dom)
			parent.appendChild(dom);

		events.bind();
	});

});

EXTENSION('flow:connections', function(self, config) {

	var D = '__';
	var events = {};
	var drag = {};
	var prevselected = null;

	drag.css = {};

	var zoom = function(val) {
		return Math.ceil(val / drag.zoom) - drag.zoomoffset;
	};

	events.move = function(e) {
		var x = (e.pageX - drag.x) + drag.offsetX;
		var y = (e.pageY - drag.y) + drag.offsetY;
		drag.path.attr('d', drag.input ? self.helpers.connect(zoom(x), zoom(y), zoom(drag.pos.x), zoom(drag.pos.y), drag.index) : self.helpers.connect(zoom(drag.pos.x), zoom(drag.pos.y), zoom(x), zoom(y), drag.index));
		if (drag.click)
			drag.click = false;
	};

	events.movetouch = function(e) {
		var evt = e.touches[0];
		drag.lastX = evt.pageX;
		drag.lastY = evt.pageY;
		events.move(evt);
	};

	events.up = function(e) {

		drag.path.remove();
		events.unbind();

		if (drag.click && (Date.now() - drag.ticks) < 150) {
			var icon = drag.target.find('.component-io');
			var clsp = 'fa-times';
			icon.tclass(clsp);

			var key = (drag.input ? 'input' : 'output') + D + drag.pos.id + D + drag.pos.index;
			var model = self.get();

			if (!model.paused)
				model.paused = {};

			if (icon.hclass(clsp))
				model.paused[key] = 1;
			else
				delete model.paused[key];

			self.op.modify(model[drag.pos.id], 'pause');
			setTimeout2(self.ID + 'clean', self.op.clean, 2000);
			self.op.modified();
			return;
		}

		if (drag.lastX != null && drag.lastY != null)
			e.target = document.elementFromPoint(drag.lastX, drag.lastY);

		drag.target.add(drag.targetcomponent).rclass('connecting');

		if (drag.input) {

			// DRAGGED FROM INPUT
			var output = $(e.target).closest('.output');
			if (!output.length)
				return;

			// Checks if the connection is existing
			if (self.helpers.isconnected(output, drag.target))
				return;

			self.el.connect(output, drag.target);

		} else {

			// DRAGGED FROM OUTPUT
			var input = $(e.target).closest('.input');
			if (!input.length)
				return;

			// Checks if the connection is existing
			if (self.helpers.isconnected(drag.target, input))
				return;

			self.el.connect(drag.target, input);
		}
	};

	events.bind = function() {
		if (!events.is) {
			events.is = true;
			self.element.on('mouseup', events.up);
			self.element.on('mousemove', events.move);
			self.element.on('touchend', events.up);
			self.element.on('touchmove', events.movetouch);
		}
	};

	events.unbind = function() {
		if (events.is) {
			events.is = false;
			self.element.off('mouseup', events.up);
			self.element.off('mousemove', events.move);
			self.element.off('touchend', events.up);
			self.element.off('touchmove', events.movetouch);
		}
	};

	self.event('mousedown touchstart', '.output,.input', function(e) {

		if (e.button)
			return;

		e.preventDefault();
		e.stopPropagation();

		if (config.horizontal && !e.target.classList.contains('component-io'))
			return;

		drag.click = true;
		drag.ticks = Date.now();

		var target = $(this);
		var evt = e.touches ? e.touches[0] : e;
		var com = target.closest('.component');
		var tmp = self.cache[com.attrd('id')];

		if (tmp.actions.disabled || tmp.actions.connect === false)
			return;

		var offset = self.getOffset();
		var targetoffset = target.offset();

		drag.input = target.hclass('input');
		drag.target = target;
		drag.index = +target.attrd('index');
		drag.x = evt.pageX;
		drag.y = evt.pageY;
		drag.zoom = self.info.zoom / 100;
		drag.zoomoffset = ((100 - self.info.zoom) / 10) + (self.info.zoom > 100 ? 1 : -1);

		drag.pos = self.helpers.position(target, !drag.input);
		drag.target.add(com).aclass('connecting');
		drag.targetcomponent = com;

		// For touch devices
		drag.lastX = null;
		drag.lastY = null;

		if (drag.input)
			drag.pos.x -= config.paddingX;

		if (evt.offsetX == null || evt.offsetY == null) {
			var off = self.op.position();
			drag.offsetX = drag.x - off.left;
			drag.offsetY = drag.y - off.top;
		} else {
			drag.offsetX = (targetoffset.left - offset.left) + evt.offsetX + (drag.input ? 0 : 5);
			drag.offsetY = (targetoffset.top - offset.top) + evt.offsetY + (drag.input ? 0 : 2);
		}

		if (config.horizontal && !drag.input)
			drag.offsetX = drag.offsetX + (com.width() * drag.zoom) - 10;

		drag.path = self.el.lines.asvg('path');
		drag.path.aclass('connection connection-draft');

		events.bind();
	});

	self.el.connect = function(output, input, init) {

		if (!output[0] || !input[0])
			return false;

		drag.zoom = self.info.zoom / 100;
		drag.zoomoffset = ((100 - self.info.zoom) / 10) - 1;

		var a = self.helpers.position(output, true);
		var b = self.helpers.position(input);

		b.x -= config.paddingX;

		if (drag.zoom !== 1) {
			b.x = zoom(b.x);
			b.y = zoom(b.y);
			a.x = zoom(a.x);
			a.y = zoom(a.y);
		}

		var path = self.el.lines.asvg('path');
		path.aclass('connection from' + D + a.id + ' to' + D + b.id + ' from' + D + a.id + D + a.index + ' to' + D + b.id + D + b.index + ' conn' + D + a.id + D + b.id + D + a.index + D + b.index);
		path.attrd('offset', a.x + ',' + a.y + ',' + b.x + ',' + b.y);
		path.attrd('fromindex', a.index);
		path.attrd('toindex', b.index);
		path.attr('d', self.helpers.connect(a.x, a.y, b.x, b.y, a.index));

		input.add(output).aclass('connected');

		if (init) {
			var kp = 'input' + D + b.id + D + b.index;
			input.find('.component-io').tclass('fa-times', !!self.paused[kp]);
			kp = 'output' + D + a.id + D + a.index;
			output.find('.component-io').tclass('fa-times', !!self.paused[kp]);
		}

		var data = self.get();
		var ac = data[a.id];
		var bc = data[b.id];
		var key = a.index + '';

		if (ac.connections == null)
			ac.connections = {};

		if (ac.connections[key] == null)
			ac.connections[key] = [];

		self.op.modify(ac, 'connect');
		self.op.modify(bc, 'connect');

		var arr = ac.connections[key];
		var bindex = b.index + '';
		var is = true;

		for (var i = 0; i < arr.length; i++) {
			var tmp = arr[i];
			if (tmp.id === b.id && tmp.index === bindex) {
				is = false;
				break;
			}
		}

		if (is)
			ac.connections[key].push({ id: b.id + '', index: bindex });

		output.closest('.component').aclass('connected');

		var meta = {};
		meta.output = ac;
		meta.input = data[b.id];
		meta.fromid = a.id;
		meta.toid = b.id;
		meta.fromindex = a.index;
		meta.toindex = b.index;
		meta.path = path;
		ac.onconnect && ac.onconnect.call(ac, meta);
		bc.onconnect && bc.onconnect.call(bc, meta);
		config.onconnect && self.EXEC(config.onconnect, meta);

		if (!init) {
			self.op.undo({ type: 'connect', fromid: meta.fromid, toid: meta.toid, fromindex: meta.fromindex + '', toindex: meta.toindex + '' });
			self.op.modified();
		}

		return true;
	};

	self.event('contextmenu', '.connection', function(e) {
		events.is && events.up();

		var el = $(this);
		var meta = {};
		var classes = el.attr('class').split(' ');

		for (var i = 0; i < classes.length; i++) {
			var cls = classes[i];
			if (cls.substring(0, 6) === 'conn__') {
				var arr = cls.split('__');
				meta.fromid = arr[1];
				meta.toid = arr[2];
				meta.fromindex = arr[3];
				meta.toindex = arr[4];
				meta.from = self.cache[meta.fromid].instance;
				meta.to = self.cache[meta.toid].instance;
				break;
			}
		}

		meta.fromid && config.contextmenu && self.SEEX(config.contextmenu, e, 'connection', meta);

		e.preventDefault();
		e.stopPropagation();
	});

	self.event('mousedown touchstart', '.connection', function(e) {

		var el = $(this);
		var cls = 'connection-selected';

		self.op.unselect();

		if (el.hclass(cls))
			return;

		prevselected && prevselected.rclass(cls);
		el.aclass(cls);
		prevselected = el;

		var conn = self.helpers.parseconnection(el);
		conn.isconnection = true;
		conn.frominstance = self.cache[conn.fromid].instance;
		conn.toinstance = self.cache[conn.toid].instance;

		self.info.selected = conn;
		self.op.refreshinfo();

		var dom = el[0];
		var parent = el.parent()[0];

		parent.removeChild(dom);
		parent.appendChild(dom);

		e.preventDefault();
		e.stopPropagation();
	});

});

EXTENSION('flow:commands', function(self, config) {

	var zoom = 1;

	var disconnect = function() {
		var arr = self.el.lines.find('.connection-selected');
		for (var i = 0; i < arr.length; i++) {
			var obj = self.helpers.parseconnection($(arr[i]));
			obj && self.op.disconnect(obj.fromid, obj.toid, obj.fromindex, obj.toindex);
		}
	};

	var remove = function() {
		var arr = self.find('.component-selected');
		for (var i = 0; i < arr.length; i++)
			self.op.remove($(arr[i]).attrd('id'));
	};

	self.command('flow.refresh', self.op.reposition);

	self.command('flow.components.find', function(id) {
		var com = self.cache[id];
		if (com) {
			var pos = com.el.offset();
			var scroll = self.closest('.ui-scrollbar-area');
			if (scroll) {
				var offset = self.element.offset();
				scroll.animate({ scrollLeft: pos.left - 200 - offset.left, scrollTop: pos.top - 150 - offset.top }, 300);
				self.op.unselect();
				self.op.select(id);
			}
		}
	});

	self.command('flow.selected.disconnect', function() {
		disconnect();
		self.op.unselect();
	});

	self.command('flow.selected.remove', function() {
		remove();
		self.op.unselect();
	});

	function translate_path(count, path) {
		var l = path.getTotalLength();
		var t = (l / 100) * count;
		var p = path.getPointAtLength(t);
		return 'translate(' + p.x + ',' + p.y + ')';
	}

	self.command('flow.traffic', function(id, opt) {

		if (!opt)
			opt = { speed: 3, count: 1, delay: 50 };

		if (!opt.limit)
			opt.limit = 20;

		var path = self.el.lines.find('.from__' + id);

		if (opt.count > opt.limit)
			opt.count = opt.limit;

		if (!path.length || (self.animations[id] > opt.limit) || document.hidden)
			return;

		var add = function(next) {

			for (var i = 0; i < path.length; i++) {

				var el = self.el.anim.asvg('circle').aclass('traffic').attr('r', opt.radius || config.animationradius);
				var dom = el[0];

				dom.$path = path[i];
				dom.$count = 0;
				dom.$token = self.animations_token;

				if (self.animations[id])
					self.animations[id]++;
				else
					self.animations[id] = 1;

				(function(self, el, dom, opt) {
					var fn = function() {

						dom.$count += (opt.speed || 3);

						if (document.hidden || !dom.$path || !dom.$path.parentNode || dom.$token !== self.animations_token) {
							el.remove();
							if (self.animations[id])
								self.animations[id]--;
							return;
						}

						if (dom.$count >= 100) {
							if (self.animations[id] > 0)
								self.animations[id]--;
							el.remove();
						} else
							el.attr('transform', translate_path(dom.$count, dom.$path));

						requestAnimationFrame(fn);
					};
					requestAnimationFrame(fn);
				})(self, el, dom, opt);
			}

			next && setTimeout(next, opt.delay || 50);
		};

		if (!opt.count || opt.count === 1) {
			add();
			return;
		}

		var arr = [];
		for (var i = 0; i < opt.count; i++)
			arr.push(add);

		arr.wait(function(fn, next) {
			fn(next);
		});

	});

	self.command('flow.selected.clear', function() {
		disconnect();
		remove();
		self.op.unselect();
	});

	self.command('flow.clean', function() {
		self.op.clean();
	});

	self.command('flow.components.add', function(com) {
		if (!com.id)
			com.id = 'f' + Date.now().toString(36);
		var data = self.get();
		data[com.id] = com;
		self.op.modify(com, 'newbie');
		self.op.modified();
		self.refresh(true);
		self.op.undo({ type: 'component', id: com.id });
	});

	self.command('flow.zoom', function(type) {

		switch (type) {
			case 'in':
				zoom -= 0.05;
				break;
			case 'out':
				zoom += 0.05;
				break;
			case 'reset':
				zoom = 1;
				break;
		}

		if (zoom < 0.3 || zoom > 1.7)
			return;

		self.info.zoom = 100 * zoom;
		self.op.refreshinfo();
		self.element.css('transform', 'scale({0})'.format(zoom));
	});

	self.command('flow.undo', function() {

		var prev = self.undo.pop();
		if (prev == null)
			return;

		self.op.undo();
		self.op.redo(prev);

		if (prev.type === 'disconnect') {
			var output = self.find('.component[data-id="{0}"]'.format(prev.fromid)).find('.output[data-index="{0}"]'.format(prev.fromindex));
			var input = self.find('.component[data-id="{0}"]'.format(prev.toid)).find('.input[data-index="{0}"]'.format(prev.toindex));
			self.el.connect(output, input, true);
			return;
		}

		if (prev.type === 'connect') {
			self.op.disconnect(prev.fromid, prev.toid, prev.fromindex, prev.toindex, true);
			return;
		}

		if (prev.type === 'component') {
			self.op.remove(prev.id, true);
			return;
		}

		if (prev.type === 'move') {
			self.find('.component[data-id="{0}"]'.format(prev.id)).css({ left: prev.x, top: prev.y });
			self.op.reposition();
			return;
		}

		if (prev.type === 'remove') {
			var com = prev.instance;
			com.id = prev.id;
			var data = self.get();
			data[com.id] = com;
			self.op.modified();
			self.update('refresh');
			return;
		}

	});

	self.command('flow.redo', function() {

		var next = self.redo.pop();
		if (next == null)
			return;

		self.op.redo();
		self.op.undo(next);
		self.op.refreshinfo();

		if (next.type === 'disconnect') {
			self.op.disconnect(next.fromid, next.toid, next.fromindex, next.toindex, true);
			return;
		}

		if (next.type === 'connect') {
			var output = self.find('.component[data-id="{0}"]'.format(next.fromid)).find('.output[data-index="{0}"]'.format(next.fromindex));
			var input = self.find('.component[data-id="{0}"]'.format(next.toid)).find('.input[data-index="{0}"]'.format(next.toindex));
			self.el.connect(output, input, true);
			return;
		}

		if (next.type === 'component') {
			var com = next.instance;
			com.id = next.id;
			var data = self.get();
			data[com.id] = com;
			self.op.modified();
			self.refresh(true);
			return;
		}

		if (next.type === 'move') {
			self.find('.component[data-id="{0}"]'.format(next.id)).css({ left: next.newx, top: next.newy });
			self.op.reposition();
			return;
		}

		if (next.type === 'remove') {
			self.op.remove(next.id, true);
			return;
		}

	});

	// Resets editor
	self.command('flow.reset', function() {
		self.refresh();
		self.info.selected = null;
		self.op.refreshinfo();
		self.undo = [];
		self.redo = [];
		self.op.undo();
		self.op.redo();
	});

});

COMPONENT('validation', 'delay:100;flags:visible', function(self, config, cls) {

	var elements = null;
	var def = 'button[name="submit"]';
	var flags = null;
	var tracked = false;
	var reset = 0;
	var old, track;

	self.readonly();

	self.make = function() {
		elements = self.find(config.selector || def);
	};

	self.configure = function(key, value, init) {
		switch (key) {
			case 'selector':
				if (!init)
					elements = self.find(value || def);
				break;
			case 'flags':
				if (value) {
					flags = value.split(',');
					for (var i = 0; i < flags.length; i++)
						flags[i] = '@' + flags[i];
				} else
					flags = null;
				break;
			case 'track':
				track = value.split(',').trim();
				break;
		}
	};

	var settracked = function() {
		tracked = 0;
	};

	self.setter = function(value, path, type) {

		var is = path === self.path || path.length < self.path.length;

		if (reset !== is) {
			reset = is;
			self.tclass(cls + '-modified', !reset);
		}

		if ((type === 1 || type === 2) && track && track.length) {
			for (var i = 0; i < track.length; i++) {
				if (path.indexOf(track[i]) !== -1) {
					tracked = 1;
					return;
				}
			}
			if (tracked === 1) {
				tracked = 2;
				setTimeout(settracked, config.delay * 3);
			}
		}
	};

	var check = function() {
		var path = self.path.replace(/\.\*$/, '');
		var disabled = tracked ? !VALID(path, flags) : DISABLED(path, flags);
		if (!disabled && config.if)
			disabled = !EVALUATE(path, config.if);
		if (disabled !== old) {
			elements.prop('disabled', disabled);
			self.tclass(cls + '-ok', !disabled);
			self.tclass(cls + '-no', disabled);
			old = disabled;
		}
	};

	self.state = function(type, what) {
		if (type === 3 || what === 3)
			tracked = 0;
		setTimeout2(self.ID, check, config.delay);
	};

});