(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2($elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}



// DECODER

var _File_decoder = _Json_decodePrim(function(value) {
	// NOTE: checks if `File` exists in case this is run on node
	return (typeof File !== 'undefined' && value instanceof File)
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FILE', value);
});


// METADATA

function _File_name(file) { return file.name; }
function _File_mime(file) { return file.type; }
function _File_size(file) { return file.size; }

function _File_lastModified(file)
{
	return $elm$time$Time$millisToPosix(file.lastModified);
}


// DOWNLOAD

var _File_downloadNode;

function _File_getDownloadNode()
{
	return _File_downloadNode || (_File_downloadNode = document.createElement('a'));
}

var _File_download = F3(function(name, mime, content)
{
	return _Scheduler_binding(function(callback)
	{
		var blob = new Blob([content], {type: mime});

		// for IE10+
		if (navigator.msSaveOrOpenBlob)
		{
			navigator.msSaveOrOpenBlob(blob, name);
			return;
		}

		// for HTML5
		var node = _File_getDownloadNode();
		var objectUrl = URL.createObjectURL(blob);
		node.href = objectUrl;
		node.download = name;
		_File_click(node);
		URL.revokeObjectURL(objectUrl);
	});
});

function _File_downloadUrl(href)
{
	return _Scheduler_binding(function(callback)
	{
		var node = _File_getDownloadNode();
		node.href = href;
		node.download = '';
		node.origin === location.origin || (node.target = '_blank');
		_File_click(node);
	});
}


// IE COMPATIBILITY

function _File_makeBytesSafeForInternetExplorer(bytes)
{
	// only needed by IE10 and IE11 to fix https://github.com/elm/file/issues/10
	// all other browsers can just run `new Blob([bytes])` directly with no problem
	//
	return new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.byteLength);
}

function _File_click(node)
{
	// only needed by IE10 and IE11 to fix https://github.com/elm/file/issues/11
	// all other browsers have MouseEvent and do not need this conditional stuff
	//
	if (typeof MouseEvent === 'function')
	{
		node.dispatchEvent(new MouseEvent('click'));
	}
	else
	{
		var event = document.createEvent('MouseEvents');
		event.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		document.body.appendChild(node);
		node.dispatchEvent(event);
		document.body.removeChild(node);
	}
}


// UPLOAD

var _File_node;

function _File_uploadOne(mimes)
{
	return _Scheduler_binding(function(callback)
	{
		_File_node = document.createElement('input');
		_File_node.type = 'file';
		_File_node.accept = A2($elm$core$String$join, ',', mimes);
		_File_node.addEventListener('change', function(event)
		{
			callback(_Scheduler_succeed(event.target.files[0]));
		});
		_File_click(_File_node);
	});
}

function _File_uploadOneOrMore(mimes)
{
	return _Scheduler_binding(function(callback)
	{
		_File_node = document.createElement('input');
		_File_node.type = 'file';
		_File_node.multiple = true;
		_File_node.accept = A2($elm$core$String$join, ',', mimes);
		_File_node.addEventListener('change', function(event)
		{
			var elmFiles = _List_fromArray(event.target.files);
			callback(_Scheduler_succeed(_Utils_Tuple2(elmFiles.a, elmFiles.b)));
		});
		_File_click(_File_node);
	});
}


// CONTENT

function _File_toString(blob)
{
	return _Scheduler_binding(function(callback)
	{
		var reader = new FileReader();
		reader.addEventListener('loadend', function() {
			callback(_Scheduler_succeed(reader.result));
		});
		reader.readAsText(blob);
		return function() { reader.abort(); };
	});
}

function _File_toBytes(blob)
{
	return _Scheduler_binding(function(callback)
	{
		var reader = new FileReader();
		reader.addEventListener('loadend', function() {
			callback(_Scheduler_succeed(new DataView(reader.result)));
		});
		reader.readAsArrayBuffer(blob);
		return function() { reader.abort(); };
	});
}

function _File_toUrl(blob)
{
	return _Scheduler_binding(function(callback)
	{
		var reader = new FileReader();
		reader.addEventListener('loadend', function() {
			callback(_Scheduler_succeed(reader.result));
		});
		reader.readAsDataURL(blob);
		return function() { reader.abort(); };
	});
}




var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$element = _Browser_element;
var $author$project$Main$Fatal = function (a) {
	return {$: 'Fatal', a: a};
};
var $author$project$Main$LoadingZoneAndTime = function (a) {
	return {$: 'LoadingZoneAndTime', a: a};
};
var $author$project$Main$Zone = function (a) {
	return {$: 'Zone', a: a};
};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $author$project$Main$Empty = {$: 'Empty'};
var $author$project$Main$NonEmpty = function (a) {
	return {$: 'NonEmpty', a: a};
};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $author$project$Main$NonEmptyCache = F4(
	function (customFoods, bodyWeightRecords, waistSizeRecords, meals) {
		return {bodyWeightRecords: bodyWeightRecords, customFoods: customFoods, meals: meals, waistSizeRecords: waistSizeRecords};
	});
var $author$project$BodyWeightRecords$BodyWeightRecords = function (a) {
	return {$: 'BodyWeightRecords', a: a};
};
var $author$project$BodyWeightRecords$BodyWeightRecord = F2(
	function (timestamp, bodyWeight) {
		return {bodyWeight: bodyWeight, timestamp: timestamp};
	});
var $author$project$BodyWeight$BodyWeight = function (a) {
	return {$: 'BodyWeight', a: a};
};
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $author$project$BodyWeight$decode = A2($elm$json$Json$Decode$map, $author$project$BodyWeight$BodyWeight, $elm$json$Json$Decode$int);
var $author$project$Timestamp$Timestamp = function (a) {
	return {$: 'Timestamp', a: a};
};
var $author$project$Timestamp$decode = A2($elm$json$Json$Decode$map, $author$project$Timestamp$Timestamp, $elm$json$Json$Decode$int);
var $elm$json$Json$Decode$field = _Json_decodeField;
var $author$project$BodyWeightRecords$decodeOne = A3(
	$elm$json$Json$Decode$map2,
	$author$project$BodyWeightRecords$BodyWeightRecord,
	A2($elm$json$Json$Decode$field, 'timestamp', $author$project$Timestamp$decode),
	A2($elm$json$Json$Decode$field, 'bodyWeight', $author$project$BodyWeight$decode));
var $elm$json$Json$Decode$list = _Json_decodeList;
var $author$project$BodyWeightRecords$decode = A2(
	$elm$json$Json$Decode$map,
	$author$project$BodyWeightRecords$BodyWeightRecords,
	$elm$json$Json$Decode$list($author$project$BodyWeightRecords$decodeOne));
var $author$project$Foods$Foods = function (a) {
	return {$: 'Foods', a: a};
};
var $author$project$EnergyRate$EnergyRate = F2(
	function (a, b) {
		return {$: 'EnergyRate', a: a, b: b};
	});
var $author$project$Energy$Energy = function (a) {
	return {$: 'Energy', a: a};
};
var $author$project$Energy$decode = A2($elm$json$Json$Decode$map, $author$project$Energy$Energy, $elm$json$Json$Decode$int);
var $author$project$FoodMass$FoodMass = function (a) {
	return {$: 'FoodMass', a: a};
};
var $author$project$FoodMass$decode = A2($elm$json$Json$Decode$map, $author$project$FoodMass$FoodMass, $elm$json$Json$Decode$int);
var $author$project$EnergyRate$decode = A3(
	$elm$json$Json$Decode$map2,
	$author$project$EnergyRate$EnergyRate,
	A2($elm$json$Json$Decode$field, 'energy', $author$project$Energy$decode),
	A2($elm$json$Json$Decode$field, 'foodMass', $author$project$FoodMass$decode));
var $author$project$FoodDescription$FoodDescription = function (a) {
	return {$: 'FoodDescription', a: a};
};
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$FoodDescription$decode = A2($elm$json$Json$Decode$map, $author$project$FoodDescription$FoodDescription, $elm$json$Json$Decode$string);
var $author$project$Food$Food = function (a) {
	return {$: 'Food', a: a};
};
var $author$project$Food$make = F2(
	function (description_, energyRate_) {
		return $author$project$Food$Food(
			{description: description_, energyRate: energyRate_});
	});
var $author$project$Food$decode = A3(
	$elm$json$Json$Decode$map2,
	$author$project$Food$make,
	A2($elm$json$Json$Decode$field, 'description', $author$project$FoodDescription$decode),
	A2($elm$json$Json$Decode$field, 'energyRate', $author$project$EnergyRate$decode));
var $author$project$Foods$decode = A2(
	$elm$json$Json$Decode$map,
	$author$project$Foods$Foods,
	$elm$json$Json$Decode$list($author$project$Food$decode));
var $author$project$Meals$Meals = function (a) {
	return {$: 'Meals', a: a};
};
var $author$project$Meal$Meal = function (a) {
	return {$: 'Meal', a: a};
};
var $author$project$Meal$make = F3(
	function (timestamp_, energyRate, foodMass) {
		return $author$project$Meal$Meal(
			{energyRate: energyRate, foodMass: foodMass, timestamp: timestamp_});
	});
var $elm$json$Json$Decode$map3 = _Json_map3;
var $author$project$Meal$decode = A4(
	$elm$json$Json$Decode$map3,
	$author$project$Meal$make,
	A2($elm$json$Json$Decode$field, 'timestamp', $author$project$Timestamp$decode),
	A2($elm$json$Json$Decode$field, 'energyRate', $author$project$EnergyRate$decode),
	A2($elm$json$Json$Decode$field, 'foodMass', $author$project$FoodMass$decode));
var $author$project$Meals$decode = A2(
	$elm$json$Json$Decode$map,
	$author$project$Meals$Meals,
	$elm$json$Json$Decode$list($author$project$Meal$decode));
var $author$project$WaistSizeRecords$WaistSizeRecords = function (a) {
	return {$: 'WaistSizeRecords', a: a};
};
var $author$project$WaistSizeRecords$WaistSizeRecord = F2(
	function (timestamp, waistSize) {
		return {timestamp: timestamp, waistSize: waistSize};
	});
var $author$project$WaistSize$WaistSize = function (a) {
	return {$: 'WaistSize', a: a};
};
var $author$project$WaistSize$decode = A2($elm$json$Json$Decode$map, $author$project$WaistSize$WaistSize, $elm$json$Json$Decode$int);
var $author$project$WaistSizeRecords$decodeWaistSizeRecord = A3(
	$elm$json$Json$Decode$map2,
	$author$project$WaistSizeRecords$WaistSizeRecord,
	A2($elm$json$Json$Decode$field, 'timestamp', $author$project$Timestamp$decode),
	A2($elm$json$Json$Decode$field, 'waistSize', $author$project$WaistSize$decode));
var $author$project$WaistSizeRecords$decode = A2(
	$elm$json$Json$Decode$map,
	$author$project$WaistSizeRecords$WaistSizeRecords,
	$elm$json$Json$Decode$list($author$project$WaistSizeRecords$decodeWaistSizeRecord));
var $elm$json$Json$Decode$map4 = _Json_map4;
var $author$project$Main$decodeNonEmptyCache = A5(
	$elm$json$Json$Decode$map4,
	$author$project$Main$NonEmptyCache,
	A2($elm$json$Json$Decode$field, 'customFoods', $author$project$Foods$decode),
	A2($elm$json$Json$Decode$field, 'bodyWeightRecords', $author$project$BodyWeightRecords$decode),
	A2($elm$json$Json$Decode$field, 'waistSizeRecords', $author$project$WaistSizeRecords$decode),
	A2($elm$json$Json$Decode$field, 'meals', $author$project$Meals$decode));
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
var $elm$json$Json$Decode$fail = _Json_fail;
var $elm$json$Json$Decode$null = _Json_decodeNull;
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $elm$json$Json$Decode$nullable = function (decoder) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
				A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, decoder)
			]));
};
var $author$project$Main$decodeCache = A2(
	$elm$json$Json$Decode$andThen,
	function (maybeStr) {
		if (maybeStr.$ === 'Nothing') {
			return $elm$json$Json$Decode$succeed($author$project$Main$Empty);
		} else {
			var str = maybeStr.a;
			var _v1 = A2($elm$json$Json$Decode$decodeString, $author$project$Main$decodeNonEmptyCache, str);
			if (_v1.$ === 'Err') {
				var err = _v1.a;
				return $elm$json$Json$Decode$fail(
					$elm$json$Json$Decode$errorToString(err));
			} else {
				var cache = _v1.a;
				return $elm$json$Json$Decode$succeed(
					$author$project$Main$NonEmpty(cache));
			}
		}
	},
	$elm$json$Json$Decode$nullable($elm$json$Json$Decode$string));
var $elm$json$Json$Decode$decodeValue = _Json_run;
var $elm$time$Time$Name = function (a) {
	return {$: 'Name', a: a};
};
var $elm$time$Time$Offset = function (a) {
	return {$: 'Offset', a: a};
};
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 'Zone', a: a, b: b};
	});
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$here = _Time_here(_Utils_Tuple0);
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var $elm$time$Time$millisToPosix = $elm$time$Time$Posix;
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $author$project$Main$BadTimestamp = {$: 'BadTimestamp'};
var $author$project$Main$Now = function (a) {
	return {$: 'Now', a: a};
};
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $author$project$Timestamp$epoch = 1650999492 * 1000;
var $author$project$Timestamp$hour = 1;
var $author$project$Timestamp$maxTime = ((24 * $author$project$Timestamp$hour) * 365) * 100;
var $author$project$Timestamp$minTime = 0;
var $elm$time$Time$posixToMillis = function (_v0) {
	var millis = _v0.a;
	return millis;
};
var $elm$core$Basics$round = _Basics_round;
var $author$project$Timestamp$fromPosix = function (posix) {
	var millisPosixEpoch = $elm$time$Time$posixToMillis(posix);
	var millisNewEpoch = millisPosixEpoch - $author$project$Timestamp$epoch;
	var hours = $elm$core$Basics$round(millisNewEpoch / (1000 * 3600));
	return (_Utils_cmp(hours, $author$project$Timestamp$minTime) < 0) ? $elm$core$Result$Err('time is too far in the past') : ((_Utils_cmp(hours, $author$project$Timestamp$maxTime) > 0) ? $elm$core$Result$Err('time is too far in the future') : $elm$core$Result$Ok(
		$author$project$Timestamp$Timestamp(hours)));
};
var $elm$core$Result$map = F2(
	function (func, ra) {
		if (ra.$ === 'Ok') {
			var a = ra.a;
			return $elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return $elm$core$Result$Err(e);
		}
	});
var $elm$core$Result$withDefault = F2(
	function (def, result) {
		if (result.$ === 'Ok') {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var $author$project$Main$posixMsg = A2(
	$elm$core$Basics$composeR,
	$author$project$Timestamp$fromPosix,
	A2(
		$elm$core$Basics$composeR,
		$elm$core$Result$map($author$project$Main$Now),
		$elm$core$Result$withDefault($author$project$Main$BadTimestamp)));
var $author$project$Main$init = function (flags) {
	var _v0 = A2($elm$json$Json$Decode$decodeValue, $author$project$Main$decodeCache, flags);
	if (_v0.$ === 'Err') {
		var err = _v0.a;
		return _Utils_Tuple2(
			$author$project$Main$Fatal(
				$elm$json$Json$Decode$errorToString(err)),
			$elm$core$Platform$Cmd$none);
	} else {
		var cache = _v0.a;
		return _Utils_Tuple2(
			$author$project$Main$LoadingZoneAndTime(cache),
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						A2($elm$core$Task$perform, $author$project$Main$posixMsg, $elm$time$Time$now),
						A2($elm$core$Task$perform, $author$project$Main$Zone, $elm$time$Time$here)
					])));
	}
};
var $elm$time$Time$Every = F2(
	function (a, b) {
		return {$: 'Every', a: a, b: b};
	});
var $elm$time$Time$State = F2(
	function (taggers, processes) {
		return {processes: processes, taggers: taggers};
	});
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$time$Time$init = $elm$core$Task$succeed(
	A2($elm$time$Time$State, $elm$core$Dict$empty, $elm$core$Dict$empty));
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$time$Time$addMySub = F2(
	function (_v0, state) {
		var interval = _v0.a;
		var tagger = _v0.b;
		var _v1 = A2($elm$core$Dict$get, interval, state);
		if (_v1.$ === 'Nothing') {
			return A3(
				$elm$core$Dict$insert,
				interval,
				_List_fromArray(
					[tagger]),
				state);
		} else {
			var taggers = _v1.a;
			return A3(
				$elm$core$Dict$insert,
				interval,
				A2($elm$core$List$cons, tagger, taggers),
				state);
		}
	});
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$time$Time$setInterval = _Time_setInterval;
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$time$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		if (!intervals.b) {
			return $elm$core$Task$succeed(processes);
		} else {
			var interval = intervals.a;
			var rest = intervals.b;
			var spawnTimer = $elm$core$Process$spawn(
				A2(
					$elm$time$Time$setInterval,
					interval,
					A2($elm$core$Platform$sendToSelf, router, interval)));
			var spawnRest = function (id) {
				return A3(
					$elm$time$Time$spawnHelp,
					router,
					rest,
					A3($elm$core$Dict$insert, interval, id, processes));
			};
			return A2($elm$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var $elm$time$Time$onEffects = F3(
	function (router, subs, _v0) {
		var processes = _v0.processes;
		var rightStep = F3(
			function (_v6, id, _v7) {
				var spawns = _v7.a;
				var existing = _v7.b;
				var kills = _v7.c;
				return _Utils_Tuple3(
					spawns,
					existing,
					A2(
						$elm$core$Task$andThen,
						function (_v5) {
							return kills;
						},
						$elm$core$Process$kill(id)));
			});
		var newTaggers = A3($elm$core$List$foldl, $elm$time$Time$addMySub, $elm$core$Dict$empty, subs);
		var leftStep = F3(
			function (interval, taggers, _v4) {
				var spawns = _v4.a;
				var existing = _v4.b;
				var kills = _v4.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, interval, spawns),
					existing,
					kills);
			});
		var bothStep = F4(
			function (interval, taggers, id, _v3) {
				var spawns = _v3.a;
				var existing = _v3.b;
				var kills = _v3.c;
				return _Utils_Tuple3(
					spawns,
					A3($elm$core$Dict$insert, interval, id, existing),
					kills);
			});
		var _v1 = A6(
			$elm$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			processes,
			_Utils_Tuple3(
				_List_Nil,
				$elm$core$Dict$empty,
				$elm$core$Task$succeed(_Utils_Tuple0)));
		var spawnList = _v1.a;
		var existingDict = _v1.b;
		var killTask = _v1.c;
		return A2(
			$elm$core$Task$andThen,
			function (newProcesses) {
				return $elm$core$Task$succeed(
					A2($elm$time$Time$State, newTaggers, newProcesses));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v2) {
					return A3($elm$time$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var $elm$time$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _v0 = A2($elm$core$Dict$get, interval, state.taggers);
		if (_v0.$ === 'Nothing') {
			return $elm$core$Task$succeed(state);
		} else {
			var taggers = _v0.a;
			var tellTaggers = function (time) {
				return $elm$core$Task$sequence(
					A2(
						$elm$core$List$map,
						function (tagger) {
							return A2(
								$elm$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						taggers));
			};
			return A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$succeed(state);
				},
				A2($elm$core$Task$andThen, tellTaggers, $elm$time$Time$now));
		}
	});
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$time$Time$subMap = F2(
	function (f, _v0) {
		var interval = _v0.a;
		var tagger = _v0.b;
		return A2(
			$elm$time$Time$Every,
			interval,
			A2($elm$core$Basics$composeL, f, tagger));
	});
_Platform_effectManagers['Time'] = _Platform_createManager($elm$time$Time$init, $elm$time$Time$onEffects, $elm$time$Time$onSelfMsg, 0, $elm$time$Time$subMap);
var $elm$time$Time$subscription = _Platform_leaf('Time');
var $elm$time$Time$every = F2(
	function (interval, tagger) {
		return $elm$time$Time$subscription(
			A2($elm$time$Time$Every, interval, tagger));
	});
var $author$project$Main$halfHour = (30 * 60) * 1000;
var $author$project$Main$subscriptions = function (_v0) {
	return A2($elm$time$Time$every, $author$project$Main$halfHour, $author$project$Main$posixMsg);
};
var $author$project$Main$LoadingTime = F2(
	function (a, b) {
		return {$: 'LoadingTime', a: a, b: b};
	});
var $author$project$Main$Ok_ = function (a) {
	return {$: 'Ok_', a: a};
};
var $author$project$Main$NoProblems = {$: 'NoProblems'};
var $author$project$Main$Off = {$: 'Off'};
var $author$project$BodyWeightRecords$empty = $author$project$BodyWeightRecords$BodyWeightRecords(_List_Nil);
var $author$project$Foods$empty = $author$project$Foods$Foods(_List_Nil);
var $author$project$Meals$empty = $author$project$Meals$Meals(_List_Nil);
var $author$project$PageNum$PageNum = function (a) {
	return {$: 'PageNum', a: a};
};
var $author$project$PageNum$empty = $author$project$PageNum$PageNum(
	{pageNum: 0, totalPages: 0});
var $author$project$WaistSizeRecords$empty = $author$project$WaistSizeRecords$WaistSizeRecords(_List_Nil);
var $author$project$Main$initModelHelp = F3(
	function (cache, zone, now) {
		return {
			bodyWeightBox: '',
			bodyWeightNotification: $author$project$Main$Off,
			bodyWeightRecords: function () {
				if (cache.$ === 'Empty') {
					return $author$project$BodyWeightRecords$empty;
				} else {
					var bodyWeightRecords = cache.a.bodyWeightRecords;
					return bodyWeightRecords;
				}
			}(),
			bodyWeightsPage: $author$project$PageNum$empty,
			customFoods: function () {
				if (cache.$ === 'Empty') {
					return $author$project$Foods$empty;
				} else {
					var customFoods = cache.a.customFoods;
					return customFoods;
				}
			}(),
			fileUploadStatus: $author$project$Main$NoProblems,
			foodNotification: $author$project$Main$Off,
			foodSearchBox: '',
			foodSearchResultsPage: $author$project$PageNum$empty,
			mealNotification: $author$project$Main$Off,
			mealWeightBox: '',
			meals: function () {
				if (cache.$ === 'Empty') {
					return $author$project$Meals$empty;
				} else {
					var meals = cache.a.meals;
					return meals;
				}
			}(),
			mealsPage: $author$project$PageNum$empty,
			newFoodDescriptionBox: '',
			newFoodEnergyBox: '',
			now: now,
			selectedFood: $elm$core$Maybe$Nothing,
			waistSizeBox: '',
			waistSizeNotification: $author$project$Main$Off,
			waistSizeRecords: function () {
				if (cache.$ === 'Empty') {
					return $author$project$WaistSizeRecords$empty;
				} else {
					var waistSizeRecords = cache.a.waistSizeRecords;
					return waistSizeRecords;
				}
			}(),
			waistSizesPage: $author$project$PageNum$empty,
			zone: zone
		};
	});
var $author$project$Main$updateLoadingTime = F3(
	function (cache, zone, msg) {
		var nothing = _Utils_Tuple2(
			A2($author$project$Main$LoadingTime, cache, zone),
			$elm$core$Platform$Cmd$none);
		switch (msg.$) {
			case 'Now':
				var time = msg.a;
				return _Utils_Tuple2(
					$author$project$Main$Ok_(
						A3($author$project$Main$initModelHelp, cache, zone, time)),
					$elm$core$Platform$Cmd$none);
			case 'FoodSearchBox':
				return nothing;
			case 'BadTimestamp':
				return nothing;
			case 'Zone':
				return nothing;
			case 'FoodSearchResultClick':
				return nothing;
			case 'OneMoreFoodSearchPage':
				return nothing;
			case 'OneLessFoodSearchPage':
				return nothing;
			case 'MealWeightBox':
				return nothing;
			case 'SubmitMeal':
				return nothing;
			case 'NewFoodDescriptionBox':
				return nothing;
			case 'NewFoodEnergyBox':
				return nothing;
			case 'SubmitNewFood':
				return nothing;
			case 'BodyWeightBox':
				return nothing;
			case 'SubmitBodyWeight':
				return nothing;
			case 'WaistSizeBox':
				return nothing;
			case 'SubmitWaistSize':
				return nothing;
			case 'OneMoreBodyWeightPage':
				return nothing;
			case 'OneLessBodyWeightPage':
				return nothing;
			case 'OneMoreWaistSizePage':
				return nothing;
			case 'OneLessWaistSizePage':
				return nothing;
			case 'OneMoreMealsPage':
				return nothing;
			case 'OneLessMealsPage':
				return nothing;
			case 'DownloadData':
				return nothing;
			case 'UploadData':
				return nothing;
			case 'SelectedFile':
				return nothing;
			default:
				return nothing;
		}
	});
var $author$project$Main$LoadingZone = F2(
	function (a, b) {
		return {$: 'LoadingZone', a: a, b: b};
	});
var $author$project$Main$updateLoadingZone = F3(
	function (cache, timestamp, msg) {
		var nothing = _Utils_Tuple2(
			A2($author$project$Main$LoadingZone, cache, timestamp),
			$elm$core$Platform$Cmd$none);
		switch (msg.$) {
			case 'Zone':
				var zone = msg.a;
				return _Utils_Tuple2(
					$author$project$Main$Ok_(
						A3($author$project$Main$initModelHelp, cache, zone, timestamp)),
					$elm$core$Platform$Cmd$none);
			case 'FoodSearchBox':
				return nothing;
			case 'BadTimestamp':
				return nothing;
			case 'Now':
				return nothing;
			case 'FoodSearchResultClick':
				return nothing;
			case 'OneMoreFoodSearchPage':
				return nothing;
			case 'OneLessFoodSearchPage':
				return nothing;
			case 'MealWeightBox':
				return nothing;
			case 'SubmitMeal':
				return nothing;
			case 'NewFoodDescriptionBox':
				return nothing;
			case 'NewFoodEnergyBox':
				return nothing;
			case 'SubmitNewFood':
				return nothing;
			case 'BodyWeightBox':
				return nothing;
			case 'SubmitBodyWeight':
				return nothing;
			case 'WaistSizeBox':
				return nothing;
			case 'SubmitWaistSize':
				return nothing;
			case 'OneMoreBodyWeightPage':
				return nothing;
			case 'OneLessBodyWeightPage':
				return nothing;
			case 'OneMoreWaistSizePage':
				return nothing;
			case 'OneLessWaistSizePage':
				return nothing;
			case 'OneMoreMealsPage':
				return nothing;
			case 'OneLessMealsPage':
				return nothing;
			case 'DownloadData':
				return nothing;
			case 'UploadData':
				return nothing;
			case 'SelectedFile':
				return nothing;
			default:
				return nothing;
		}
	});
var $author$project$Main$updateLoadingZoneAndTime = F2(
	function (cache, msg) {
		var nothing = _Utils_Tuple2(
			$author$project$Main$LoadingZoneAndTime(cache),
			$elm$core$Platform$Cmd$none);
		switch (msg.$) {
			case 'Now':
				var time = msg.a;
				return _Utils_Tuple2(
					A2($author$project$Main$LoadingZone, cache, time),
					$elm$core$Platform$Cmd$none);
			case 'Zone':
				var zone = msg.a;
				return _Utils_Tuple2(
					A2($author$project$Main$LoadingTime, cache, zone),
					$elm$core$Platform$Cmd$none);
			case 'FoodSearchBox':
				return nothing;
			case 'BadTimestamp':
				return nothing;
			case 'FoodSearchResultClick':
				return nothing;
			case 'OneMoreFoodSearchPage':
				return nothing;
			case 'OneLessFoodSearchPage':
				return nothing;
			case 'MealWeightBox':
				return nothing;
			case 'SubmitMeal':
				return nothing;
			case 'NewFoodDescriptionBox':
				return nothing;
			case 'NewFoodEnergyBox':
				return nothing;
			case 'SubmitNewFood':
				return nothing;
			case 'BodyWeightBox':
				return nothing;
			case 'SubmitBodyWeight':
				return nothing;
			case 'WaistSizeBox':
				return nothing;
			case 'SubmitWaistSize':
				return nothing;
			case 'OneMoreBodyWeightPage':
				return nothing;
			case 'OneLessBodyWeightPage':
				return nothing;
			case 'OneMoreWaistSizePage':
				return nothing;
			case 'OneLessWaistSizePage':
				return nothing;
			case 'OneMoreMealsPage':
				return nothing;
			case 'OneLessMealsPage':
				return nothing;
			case 'DownloadData':
				return nothing;
			case 'UploadData':
				return nothing;
			case 'SelectedFile':
				return nothing;
			default:
				return nothing;
		}
	});
var $author$project$Main$BadFile = {$: 'BadFile'};
var $author$project$Main$FileLoaded = function (a) {
	return {$: 'FileLoaded', a: a};
};
var $author$project$Main$On = {$: 'On'};
var $author$project$Main$SelectedFile = function (a) {
	return {$: 'SelectedFile', a: a};
};
var $elm$json$Json$Encode$int = _Json_wrap;
var $author$project$BodyWeight$encode = function (_v0) {
	var b = _v0.a;
	return $elm$json$Json$Encode$int(b);
};
var $author$project$Timestamp$encode = function (_v0) {
	var t = _v0.a;
	return $elm$json$Json$Encode$int(t);
};
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var $author$project$BodyWeightRecords$encodeOne = function (_v0) {
	var timestamp = _v0.timestamp;
	var bodyWeight = _v0.bodyWeight;
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'timestamp',
				$author$project$Timestamp$encode(timestamp)),
				_Utils_Tuple2(
				'bodyWeight',
				$author$project$BodyWeight$encode(bodyWeight))
			]));
};
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(_Utils_Tuple0),
				entries));
	});
var $author$project$BodyWeightRecords$encode = function (_v0) {
	var records = _v0.a;
	return A2($elm$json$Json$Encode$list, $author$project$BodyWeightRecords$encodeOne, records);
};
var $author$project$Energy$encode = function (_v0) {
	var energy = _v0.a;
	return $elm$json$Json$Encode$int(energy);
};
var $author$project$FoodMass$encode = function (_v0) {
	var f = _v0.a;
	return $elm$json$Json$Encode$int(f);
};
var $author$project$EnergyRate$encode = function (_v0) {
	var energy_ = _v0.a;
	var foodMass = _v0.b;
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'energy',
				$author$project$Energy$encode(energy_)),
				_Utils_Tuple2(
				'foodMass',
				$author$project$FoodMass$encode(foodMass))
			]));
};
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$FoodDescription$encode = function (_v0) {
	var f = _v0.a;
	return $elm$json$Json$Encode$string(f);
};
var $author$project$Food$encode = function (_v0) {
	var food = _v0.a;
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'description',
				$author$project$FoodDescription$encode(food.description)),
				_Utils_Tuple2(
				'energyRate',
				$author$project$EnergyRate$encode(food.energyRate))
			]));
};
var $author$project$Foods$encode = function (_v0) {
	var foods = _v0.a;
	return A2($elm$json$Json$Encode$list, $author$project$Food$encode, foods);
};
var $author$project$Meal$encode = function (_v0) {
	var meal = _v0.a;
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'timestamp',
				$author$project$Timestamp$encode(meal.timestamp)),
				_Utils_Tuple2(
				'energyRate',
				$author$project$EnergyRate$encode(meal.energyRate)),
				_Utils_Tuple2(
				'foodMass',
				$author$project$FoodMass$encode(meal.foodMass))
			]));
};
var $author$project$Meals$encode = function (_v0) {
	var meals = _v0.a;
	return A2($elm$json$Json$Encode$list, $author$project$Meal$encode, meals);
};
var $author$project$WaistSize$encode = function (_v0) {
	var w = _v0.a;
	return $elm$json$Json$Encode$int(w);
};
var $author$project$WaistSizeRecords$encodeOne = function (_v0) {
	var timestamp = _v0.timestamp;
	var waistSize = _v0.waistSize;
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'timestamp',
				$author$project$Timestamp$encode(timestamp)),
				_Utils_Tuple2(
				'waistSize',
				$author$project$WaistSize$encode(waistSize))
			]));
};
var $author$project$WaistSizeRecords$encode = function (_v0) {
	var records = _v0.a;
	return A2($elm$json$Json$Encode$list, $author$project$WaistSizeRecords$encodeOne, records);
};
var $author$project$Main$encodeCache = function (_v0) {
	var customFoods = _v0.customFoods;
	var bodyWeightRecords = _v0.bodyWeightRecords;
	var waistSizeRecords = _v0.waistSizeRecords;
	var meals = _v0.meals;
	return A2(
		$elm$json$Json$Encode$encode,
		0,
		$elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'customFoods',
					$author$project$Foods$encode(customFoods)),
					_Utils_Tuple2(
					'bodyWeightRecords',
					$author$project$BodyWeightRecords$encode(bodyWeightRecords)),
					_Utils_Tuple2(
					'waistSizeRecords',
					$author$project$WaistSizeRecords$encode(waistSizeRecords)),
					_Utils_Tuple2(
					'meals',
					$author$project$Meals$encode(meals))
				])));
};
var $author$project$Main$toLocalStorage = _Platform_outgoingPort('toLocalStorage', $elm$json$Json$Encode$string);
var $author$project$Main$dumpCache = A2($elm$core$Basics$composeR, $author$project$Main$encodeCache, $author$project$Main$toLocalStorage);
var $elm$file$File$Select$file = F2(
	function (mimes, toMsg) {
		return A2(
			$elm$core$Task$perform,
			toMsg,
			_File_uploadOne(mimes));
	});
var $author$project$PageNum$first = function (n) {
	return (n < 0) ? $elm$core$Result$Err('can\'t have negative page numbers') : $elm$core$Result$Ok(
		$author$project$PageNum$PageNum(
			{pageNum: 0, totalPages: n}));
};
var $author$project$Energy$builtIns = A2(
	$elm$core$List$map,
	$author$project$Energy$Energy,
	_List_fromArray(
		[468, 436, 538, 158, 242, 209, 172, 181, 310, 435, 58, 88, 68, 238, 23, 149, 120, 170, 146, 153, 130, 144, 120, 614, 614, 197, 30, 41, 15, 16, 884, 458, 598, 566, 599, 574, 604, 601, 465, 579, 607, 548, 15, 70, 210, 210, 841, 426, 158, 46, 22, 46, 48, 47, 46, 100, 172, 93, 112, 134, 243, 52, 51, 47, 72, 46, 43, 72, 60, 60, 58, 47, 65, 41, 40, 42, 64, 62, 50, 46, 47, 44, 66, 66, 66, 51, 51, 51, 39, 37, 41, 68, 68, 42, 56, 56, 241, 48, 62, 63, 60, 267, 159, 331, 74, 53, 74, 53, 74, 53, 53, 74, 160, 114, 126, 67, 46, 60, 60, 35, 45, 38, 44, 41, 19, 41, 48, 45, 21, 37, 43, 40, 18, 20, 427, 160, 160, 475, 123, 314, 258, 326, 476, 383, 468, 359, 46, 309, 468, 253, 468, 468, 209, 205, 233, 264, 451, 250, 255, 250, 250, 250, 250, 261, 255, 250, 250, 255, 243, 268, 105, 115, 104, 94, 413, 41, 68, 519, 86, 70, 156, 68, 197, 92, 78, 151, 89, 66, 68, 65, 109, 83, 69, 62, 67, 91, 172, 277, 376, 52, 62, 122, 139, 122, 227, 199, 265, 224, 279, 227, 199, 265, 23, 81, 77, 82, 407, 450, 119, 221, 108, 68, 65, 63, 90, 116, 30, 68, 161, 138, 184, 162, 136, 141, 101, 164, 183, 188, 184, 136, 188, 139, 205, 26, 24, 27, 29, 258, 211, 157, 60, 57, 63, 137, 139, 138, 133, 136, 172, 115, 189, 126, 101, 133, 59, 142, 138, 137, 135, 178, 136, 145, 121, 120, 145, 115, 116, 142, 83, 221, 216, 289, 216, 6, 50, 13, 147, 129, 82, 111, 118, 145, 66, 146, 124, 124, 102, 142, 117, 410, 189, 174, 59, 34, 70, 223, 66, 194, 260, 190, 328, 332, 267, 233, 120, 150, 137, 321, 184, 235, 184, 231, 252, 236, 251, 251, 164, 248, 268, 248, 184, 235, 184, 184, 235, 184, 83, 82, 79, 90, 219, 100, 106, 110, 215, 51, 233, 115, 94, 150, 98, 129, 181, 48, 69, 368, 187, 184, 156, 163, 186, 118, 183, 149, 125, 120, 114, 114, 110, 96, 69, 184, 235, 184, 184, 81, 81, 81, 449, 541, 7, 257, 225, 153, 129, 127, 191, 228, 299, 130, 128, 150, 137, 129, 127, 125, 147, 138, 125, 251, 251, 251, 155, 251, 131, 127, 125, 146, 125, 127, 127, 128, 125, 148, 125, 130, 115, 115, 143, 134, 133, 149, 144, 131, 147, 130, 129, 148, 141, 131, 219, 166, 167, 159, 150, 329, 397, 397, 269, 293, 467, 293, 125, 251, 236, 251, 115, 113, 43, 192, 58, 29, 46, 27, 47, 22, 25, 53, 34, 53, 31, 53, 67, 45, 65, 43, 417, 40, 80, 261, 46, 103, 145, 108, 188, 363, 224, 370, 374, 370, 324, 343, 362, 142, 41, 55, 279, 94, 165, 46, 157, 181, 160, 177, 180, 178, 134, 178, 180, 131, 199, 64, 43, 38, 165, 150, 165, 150, 186, 175, 379, 69, 88, 484, 115, 99, 317, 51, 57, 37, 181, 341, 77, 298, 295, 281, 204, 204, 281, 38, 99, 150, 231, 89, 333, 337, 659, 177, 192, 274, 272, 299, 272, 299, 239, 263, 297, 259, 285, 270, 297, 344, 274, 301, 250, 275, 273, 300, 299, 408, 448, 253, 297, 283, 311, 382, 287, 315, 364, 248, 273, 245, 269, 280, 311, 270, 296, 259, 285, 265, 207, 228, 291, 268, 295, 277, 305, 393, 299, 296, 269, 296, 236, 260, 326, 275, 279, 306, 302, 262, 288, 262, 288, 266, 292, 250, 275, 302, 397, 273, 300, 207, 227, 222, 244, 248, 273, 259, 285, 272, 299, 258, 284, 188, 207, 304, 334, 239, 263, 256, 282, 274, 263, 289, 207, 228, 301, 285, 313, 270, 262, 303, 267, 293, 270, 296, 238, 262, 297, 238, 262, 254, 248, 272, 279, 274, 301, 302, 246, 122, 201, 342, 412, 453, 431, 410, 342, 342, 314, 333, 333, 344, 314, 376, 376, 348, 255, 253, 371, 291, 385, 372, 418, 55, 31, 45, 23, 62, 109, 106, 69, 46, 22, 268, 119, 69, 44, 50, 58, 63, 50, 28, 26, 35, 72, 54, 61, 58, 35, 46, 53, 50, 28, 34, 406, 119, 170, 67, 67, 45, 63, 42, 43, 92, 112, 92, 186, 203, 11, 83, 112, 83, 99, 188, 192, 205, 189, 242, 214, 235, 208, 212, 207, 242, 216, 180, 236, 211, 214, 209, 209, 234, 246, 277, 240, 218, 250, 242, 533, 373, 717, 499, 717, 731, 731, 499, 717, 731, 459, 465, 40, 40, 56, 62, 391, 539, 109, 104, 159, 73, 41, 113, 116, 44, 100, 46, 37, 71, 46, 37, 14, 13, 26, 40, 45, 52, 49, 26, 25, 55, 45, 31, 51, 38, 16, 16, 542, 131, 110, 74, 291, 282, 276, 187, 264, 401, 389, 425, 410, 436, 426, 429, 415, 389, 327, 356, 308, 387, 345, 390, 336, 404, 426, 370, 414, 411, 389, 413, 425, 410, 391, 330, 379, 345, 438, 128, 252, 391, 367, 274, 209, 333, 257, 412, 409, 371, 324, 367, 328, 464, 414, 283, 403, 353, 262, 216, 218, 247, 242, 217, 354, 362, 290, 284, 267, 51, 388, 342, 59, 146, 394, 155, 884, 61, 34, 98, 417, 216, 291, 491, 470, 432, 387, 382, 412, 34, 0, 0, 166, 540, 189, 160, 236, 194, 253, 253, 198, 160, 40, 32, 55, 59, 38, 65, 29, 32, 26, 21, 44, 50, 47, 25, 42, 48, 45, 23, 43, 79, 61, 68, 65, 43, 55, 62, 58, 37, 90, 41, 208, 176, 299, 609, 574, 558, 580, 578, 574, 583, 28, 256, 268, 191, 173, 154, 168, 179, 150, 219, 189, 211, 229, 186, 231, 201, 219, 246, 199, 246, 150, 49, 26, 45, 52, 49, 26, 38, 44, 41, 19, 40, 25, 68, 14, 61, 37, 39, 31, 14, 333, 386, 386, 375, 378, 380, 376, 381, 376, 370, 378, 376, 372, 412, 403, 370, 375, 375, 345, 410, 383, 380, 383, 323, 317, 207, 386, 374, 364, 374, 357, 381, 380, 390, 368, 413, 384, 353, 336, 338, 379, 367, 311, 364, 327, 259, 375, 389, 357, 387, 395, 378, 376, 375, 369, 350, 380, 381, 422, 354, 318, 395, 381, 371, 405, 363, 381, 375, 367, 358, 366, 377, 354, 425, 389, 397, 401, 385, 389, 404, 380, 374, 376, 387, 372, 391, 422, 350, 389, 328, 397, 402, 380, 361, 390, 378, 384, 401, 409, 394, 394, 324, 373, 344, 397, 417, 398, 397, 422, 412, 374, 379, 372, 346, 344, 5, 5, 471, 389, 415, 471, 487, 487, 390, 429, 365, 403, 365, 409, 412, 408, 480, 418, 451, 536, 480, 508, 487, 389, 408, 342, 455, 471, 412, 531, 417, 423, 76, 352, 405, 64, 357, 357, 383, 389, 400, 384, 391, 422, 355, 64, 372, 383, 366, 380, 333, 373, 383, 395, 62, 128, 85, 44, 19, 66, 360, 426, 160, 143, 176, 560, 560, 432, 276, 264, 364, 281, 327, 330, 285, 331, 333, 281, 327, 330, 323, 364, 366, 327, 367, 369, 323, 364, 366, 285, 254, 303, 258, 306, 309, 254, 303, 305, 305, 285, 331, 333, 289, 334, 336, 285, 331, 333, 160, 120, 204, 290, 176, 290, 201, 295, 290, 417, 307, 307, 366, 126, 240, 376, 353, 371, 334, 300, 408, 157, 316, 398, 394, 384, 265, 389, 356, 413, 327, 358, 282, 373, 313, 298, 141, 298, 280, 368, 271, 368, 421, 370, 396, 421, 356, 351, 148, 393, 127, 179, 374, 80, 72, 82, 84, 98, 72, 84, 84, 72, 82, 71, 76, 81, 364, 307, 358, 274, 261, 270, 297, 298, 183, 297, 300, 297, 299, 253, 296, 293, 294, 300, 297, 298, 321, 209, 374, 73, 333, 63, 165, 63, 78, 119, 68, 245, 296, 360, 268, 534, 271, 265, 252, 276, 270, 257, 281, 231, 322, 313, 292, 133, 51, 122, 84, 100, 170, 119, 212, 175, 144, 205, 175, 175, 144, 204, 174, 192, 161, 207, 176, 218, 271, 249, 242, 211, 176, 176, 202, 178, 206, 176, 175, 144, 206, 176, 181, 149, 90, 167, 106, 115, 126, 206, 172, 203, 206, 168, 172, 190, 154, 204, 168, 211, 288, 246, 240, 212, 168, 169, 200, 171, 203, 168, 206, 172, 203, 168, 186, 155, 136, 215, 320, 281, 281, 281, 291, 264, 277, 269, 280, 251, 226, 243, 212, 231, 216, 235, 300, 252, 240, 150, 171, 108, 126, 105, 106, 277, 218, 185, 214, 168, 226, 182, 259, 183, 219, 183, 227, 182, 218, 185, 227, 182, 211, 167, 166, 189, 74, 74, 74, 307, 307, 298, 304, 307, 270, 181, 186, 75, 146, 139, 140, 136, 157, 136, 148, 120, 136, 135, 162, 141, 148, 124, 118, 123, 131, 119, 119, 111, 117, 95, 112, 6, 7, 49, 36, 174, 60, 262, 131, 83, 210, 62, 103, 140, 121, 199, 182, 104, 91, 64, 62, 23, 108, 75, 24, 41, 49, 61, 41, 174, 204, 34, 62, 48, 23, 228, 230, 145, 110, 187, 115, 128, 145, 145, 235, 147, 102, 168, 41, 41, 39, 50, 46, 29, 54, 29, 70, 46, 80, 85, 75, 80, 118, 71, 65, 76, 53, 33, 48, 71, 173, 156, 144, 135, 172, 163, 112, 120, 120, 127, 126, 149, 129, 151, 133, 131, 145, 127, 129, 146, 129, 132, 125, 126, 132, 127, 128, 125, 123, 129, 123, 124, 146, 131, 134, 151, 131, 133, 142, 130, 132, 150, 130, 129, 150, 128, 131, 159, 165, 177, 287, 175, 77, 232, 200, 450, 74, 50, 78, 188, 155, 155, 271, 271, 240, 262, 283, 270, 226, 193, 243, 226, 191, 193, 231, 178, 240, 192, 230, 293, 276, 271, 293, 217, 192, 192, 217, 232, 190, 243, 192, 226, 193, 243, 192, 227, 175, 257, 264, 257, 252, 259, 322, 292, 288, 322, 250, 265, 257, 265, 247, 129, 137, 114, 109, 164, 196, 164, 165, 203, 165, 251, 164, 251, 164, 180, 211, 180, 179, 216, 179, 164, 196, 164, 216, 179, 158, 196, 158, 138, 146, 130, 298, 220, 185, 164, 164, 163, 200, 157, 201, 224, 234, 245, 66, 98, 98, 167, 454, 210, 196, 146, 196, 210, 163, 7, 298, 286, 219, 205, 102, 123, 118, 112, 107, 157, 97, 106, 84, 80, 118, 97, 123, 42, 232, 256, 252, 246, 282, 200, 200, 207, 194, 427, 189, 384, 231, 30, 400, 350, 478, 388, 49, 67, 57, 57, 65, 65, 59, 59, 72, 72, 81, 81, 72, 72, 49, 57, 51, 63, 72, 63, 48, 56, 50, 63, 73, 63, 48, 56, 50, 63, 73, 63, 35, 43, 37, 49, 58, 50, 65, 73, 67, 79, 88, 80, 67, 67, 64, 64, 64, 76, 57, 83, 269, 153, 552, 538, 480, 528, 553, 539, 545, 511, 510, 346, 102, 74, 83, 131, 43, 117, 134, 44, 419, 246, 23, 246, 56, 61, 61, 61, 35, 70, 117, 135, 106, 108, 193, 150, 226, 135, 86, 192, 171, 200, 85, 63, 70, 66, 45, 64, 71, 67, 44, 95, 82, 89, 85, 65, 53, 92, 194, 187, 229, 194, 201, 215, 200, 250, 128, 89, 228, 407, 493, 481, 317, 357, 31, 230, 833, 37, 18, 354, 456, 112, 91, 106, 118, 87, 173, 140, 165, 182, 137, 188, 151, 176, 203, 148, 118, 290, 85, 108, 87, 191, 279, 180, 72, 134, 68, 1, 0, 381, 351, 310, 372, 136, 136, 71, 150, 71, 251, 71, 529, 431, 482, 136, 431, 529, 6, 360, 64, 64, 52, 54, 52, 54, 27, 27, 19, 20, 19, 20, 33, 50, 51, 43, 44, 43, 44, 27, 27, 40, 19, 32, 20, 33, 39, 19, 31, 20, 33, 43, 43, 55, 30, 42, 32, 44, 54, 30, 41, 32, 43, 1, 0, 1, 26, 71, 35, 1, 0, 0, 1, 38, 39, 14, 16, 26, 5, 16, 9, 9, 352, 3, 351, 457, 16, 465, 26, 3, 353, 509, 16, 429, 26, 379, 16, 3, 23, 38, 440, 14, 435, 15, 460, 44, 14, 16, 26, 5, 16, 213, 404, 329, 57, 37, 44, 41, 19, 54, 61, 57, 34, 54, 61, 57, 36, 32, 33, 53, 52, 35, 492, 430, 492, 514, 417, 514, 446, 509, 450, 433, 492, 431, 366, 405, 345, 345, 401, 405, 464, 503, 464, 433, 405, 464, 492, 425, 489, 451, 450, 433, 451, 464, 436, 433, 450, 440, 497, 451, 507, 460, 417, 348, 348, 378, 435, 348, 348, 416, 474, 465, 464, 365, 431, 460, 417, 421, 421, 421, 435, 417, 337, 430, 464, 450, 398, 398, 365, 449, 450, 457, 450, 473, 478, 417, 523, 475, 450, 401, 398, 391, 348, 514, 461, 483, 514, 451, 515, 523, 502, 526, 531, 378, 392, 492, 483, 497, 423, 455, 441, 489, 562, 501, 371, 336, 68, 44, 543, 536, 535, 539, 549, 250, 217, 393, 446, 900, 214, 254, 41, 65, 283, 88, 84, 91, 88, 67, 84, 91, 88, 66, 118, 72, 61, 65, 57, 102, 109, 106, 86, 98, 104, 101, 81, 86, 115, 305, 304, 179, 284, 330, 164, 164, 208, 200, 250, 251, 251, 250, 127, 126, 257, 133, 257, 133, 83, 108, 292, 236, 167, 268, 71, 71, 58, 412, 147, 143, 884, 111, 205, 226, 137, 187, 197, 51, 51, 35, 132, 102, 83, 190, 147, 82, 185, 82, 223, 143, 491, 430, 510, 477, 426, 510, 510, 510, 444, 443, 489, 489, 489, 418, 503, 412, 455, 366, 412, 453, 453, 395, 395, 446, 482, 455, 418, 416, 429, 418, 398, 393, 416, 494, 477, 479, 494, 482, 437, 384, 441, 441, 441, 444, 443, 465, 521, 441, 441, 441, 416, 443, 308, 46, 50, 45, 54, 19, 46, 159, 81, 218, 105, 201, 217, 350, 41, 64, 64, 51, 122, 122, 108, 105, 105, 90, 81, 81, 66, 116, 116, 104, 94, 94, 81, 64, 64, 51, 276, 334, 236, 260, 360, 173, 131, 131, 59, 130, 340, 195, 343, 131, 141, 165, 51, 430, 107, 160, 110, 223, 183, 169, 198, 173, 183, 223, 57, 32, 157, 254, 253, 215, 161, 131, 215, 172, 233, 161, 131, 406, 329, 289, 261, 330, 308, 269, 295, 414, 421, 396, 465, 227, 503, 274, 53, 33, 117, 66, 44, 15, 15, 290, 93, 95, 86, 85, 86, 38, 118, 71, 45, 403, 374, 371, 30, 78, 49, 141, 282, 379, 193, 299, 250, 202, 145, 394, 590, 354, 394, 394, 197, 430, 191, 433, 112, 210, 184, 272, 282, 299, 301, 298, 297, 298, 294, 299, 301, 297, 290, 290, 288, 288, 287, 286, 290, 290, 289, 426, 426, 427, 434, 431, 431, 417, 413, 363, 368, 390, 421, 416, 212, 223, 218, 245, 189, 223, 245, 336, 200, 151, 336, 200, 132, 358, 124, 195, 113, 163, 77, 79, 75, 492, 140, 298, 287, 231, 139, 305, 300, 233, 312, 311, 175, 27, 124, 184, 184, 191, 188, 180, 149, 171, 191, 143, 186, 186, 155, 209, 209, 213, 206, 182, 199, 215, 177, 186, 186, 154, 186, 186, 155, 209, 202, 176, 194, 212, 199, 199, 169, 198, 198, 168, 199, 199, 169, 189, 189, 160, 171, 185, 185, 153, 165, 165, 128, 172, 172, 138, 171, 171, 137, 171, 171, 138, 192, 192, 196, 189, 162, 181, 199, 157, 173, 173, 141, 171, 171, 134, 163, 163, 127, 164, 164, 127, 165, 165, 128, 269, 277, 253, 269, 298, 172, 212, 163, 155, 172, 172, 257, 174, 95, 48, 128, 137, 117, 131, 115, 100, 87, 99, 99, 95, 59, 86, 106, 52, 131, 140, 120, 134, 118, 103, 90, 283, 257, 240, 295, 272, 228, 301, 228, 253, 291, 286, 324, 263, 282, 250, 147, 198, 52, 99, 99, 52, 184, 184, 143, 143, 175, 143, 188, 180, 149, 171, 191, 184, 184, 191, 154, 143, 351, 351, 321, 322, 88, 113, 96, 162, 155, 90, 27, 50, 27, 40, 25, 96, 288, 320, 285, 335, 332, 38, 30, 129, 109, 139, 117, 149, 125, 147, 124, 167, 142, 189, 161, 142, 43, 46, 47, 46, 44, 62, 62, 15, 43, 58, 45, 49, 5, 5, 5, 4, 5, 2, 4, 4, 1, 4, 5, 37, 549, 161, 165, 161, 161, 509, 750, 160, 62, 31, 75, 249, 74, 344, 141, 131, 131, 134, 135, 39, 104, 111, 103, 105, 217, 112, 92, 107, 200, 100, 344, 255, 238, 255, 234, 251, 238, 255, 224, 172, 35, 67, 46, 277, 277, 16, 147, 115, 80, 265, 160, 140, 155, 166, 137, 90, 209, 179, 201, 219, 176, 222, 191, 210, 237, 188, 166, 290, 219, 109, 117, 160, 141, 137, 173, 174, 87, 118, 111, 127, 124, 106, 534, 884, 62, 136, 113, 92, 108, 119, 88, 173, 141, 166, 183, 138, 189, 152, 177, 204, 149, 204, 70, 169, 88, 37, 0, 10, 249, 373, 366, 305, 301, 312, 303, 311, 308, 295, 297, 301, 303, 287, 285, 291, 288, 289, 293, 276, 281, 282, 288, 305, 301, 312, 303, 311, 308, 295, 297, 301, 303, 246, 247, 248, 250, 246, 254, 236, 244, 242, 250, 173, 180, 167, 183, 166, 187, 162, 177, 169, 183, 281, 279, 286, 282, 284, 286, 271, 275, 277, 282, 188, 198, 244, 251, 181, 187, 176, 190, 174, 194, 170, 184, 176, 190, 297, 224, 226, 224, 228, 223, 230, 218, 224, 222, 228, 223, 224, 222, 226, 221, 229, 217, 222, 222, 226, 331, 331, 292, 292, 127, 305, 235, 292, 115, 127, 233, 127, 235, 212, 211, 238, 79, 419, 132, 222, 275, 162, 340, 400, 275, 269, 272, 162, 261, 173, 272, 310, 183, 239, 269, 306, 180, 236, 256, 219, 215, 349, 216, 153, 218, 214, 216, 217, 350, 257, 119, 232, 188, 214, 381, 342, 340, 214, 92, 66, 67, 59, 74, 63, 75, 81, 59, 74, 60, 75, 81, 127, 66, 287, 154, 145, 105, 30, 122, 66, 66, 59, 73, 60, 74, 80, 58, 73, 59, 74, 80, 131, 127, 142, 147, 139, 143, 204, 127, 131, 160, 159, 127, 73, 83, 53, 60, 56, 79, 60, 330, 173, 54, 60, 48, 61, 63, 59, 64, 4, 380, 218, 25, 2, 27, 2, 386, 41, 2, 347, 29, 46, 50, 51, 47, 10, 39, 54, 53, 31, 1, 39, 33, 2, 46, 19, 45, 50, 62, 365, 298, 44, 51, 322, 90, 44, 64, 240, 140, 126, 235, 150, 53, 52, 147, 235, 137, 124, 230, 50, 65, 63, 50, 52, 63, 77, 53, 75, 58, 352, 62, 41, 129, 61, 535, 396, 462, 410, 448, 482, 460, 398, 436, 475, 383, 435, 161, 124, 166, 475, 349, 377, 132, 71, 349, 349, 350, 339, 343, 351, 351, 82, 660, 148, 149, 39, 113, 60, 56, 20, 22, 61, 102, 251, 249, 295, 421, 421, 876, 188, 231, 60, 84, 66, 20, 153, 96, 178, 133, 144, 142, 69, 142, 142, 153, 305, 223, 304, 186, 187, 248, 242, 250, 247, 303, 161, 430, 430, 500, 386, 483, 489, 21, 60, 62, 62, 166, 37, 37, 39, 39, 41, 36, 42, 69, 285, 53, 53, 53, 57, 45, 48, 48, 140, 42, 122, 144, 50, 62, 49, 40, 46, 43, 21, 41, 47, 44, 22, 97, 32, 69, 51, 58, 55, 32, 46, 53, 50, 28, 45, 31, 98, 85, 92, 89, 68, 88, 97, 92, 66, 118, 102, 108, 105, 84, 95, 101, 98, 78, 81, 22, 329, 44, 54, 41, 19, 54, 34, 55, 34, 85, 327, 331, 327, 364, 367, 364, 331, 303, 306, 303, 331, 334, 331, 71, 71, 58, 124, 124, 106, 107, 107, 88, 84, 84, 65, 121, 121, 110, 100, 100, 88, 71, 71, 58, 108, 108, 97, 272, 194, 260, 247, 234, 260, 145, 155, 48, 280, 68, 89, 82, 396, 435, 167, 217, 124, 94, 187, 142, 207, 124, 116, 93, 139, 118, 133, 145, 115, 193, 161, 185, 203, 159, 207, 173, 195, 222, 170, 145, 91, 219, 114, 525, 521, 255, 192, 212, 151, 138, 143, 315, 135, 119, 114, 273, 117, 342, 127, 125, 142, 230, 205, 160, 166, 143, 153, 155, 150, 147, 125, 233, 222, 216, 191, 216, 131, 97, 200, 200, 192, 117, 271, 271, 209, 188, 188, 178, 60, 293, 293, 125, 127, 106, 106, 195, 132, 132, 117, 149, 149, 139, 325, 254, 263, 288, 285, 299, 288, 289, 288, 285, 246, 285, 283, 282, 289, 288, 287, 394, 56, 164, 272, 157, 628, 157, 164, 227, 199, 265, 224, 279, 227, 490, 262, 249, 158, 217, 59, 250, 220, 529, 88, 304, 474, 267, 464, 169, 207, 473, 482, 36, 89, 87, 209, 48, 503, 71, 39, 82, 90, 84, 96, 54, 105, 62, 70, 64, 76, 31, 85, 91, 80, 92, 78, 90, 103, 192, 12, 58, 119, 258, 260, 105, 296, 329, 358, 331, 299, 323, 229, 353, 224, 227, 215, 218, 196, 200, 189, 193, 354, 317, 270, 264, 87, 85, 243, 213, 221, 243, 221, 216, 249, 282, 187, 180, 207, 242, 1, 0, 30, 33, 2, 21, 397, 418, 390, 892, 66, 65, 71, 65, 62, 66, 67, 66, 66, 64, 67, 66, 67, 67, 66, 64, 64, 65, 99, 65, 66, 66, 67, 73, 66, 66, 65, 65, 65, 65, 66, 66, 66, 67, 66, 66, 65, 65, 66, 66, 66, 67, 66, 66, 65, 65, 66, 66, 66, 67, 66, 66, 65, 65, 66, 66, 64, 66, 67, 66, 66, 65, 65, 65, 66, 65, 71, 65, 66, 67, 66, 66, 66, 67, 67, 66, 66, 66, 67, 73, 65, 65, 65, 66, 65, 71, 65, 66, 67, 66, 66, 66, 67, 67, 66, 66, 66, 67, 73, 65, 65, 65, 66, 65, 71, 65, 66, 67, 66, 66, 66, 67, 67, 66, 66, 66, 67, 73, 65, 65, 65, 66, 65, 71, 65, 62, 117, 67, 66, 66, 64, 67, 66, 67, 67, 66, 65, 66, 66, 67, 73, 66, 65, 65, 65, 65, 66, 65, 71, 66, 67, 66, 66, 64, 67, 66, 67, 66, 99, 66, 66, 67, 73, 66, 65, 65, 65, 66, 65, 66, 66, 99, 99, 87, 25, 67, 88, 128, 24, 70, 47, 102, 240, 322, 125, 62, 278, 151, 121, 212, 162, 219, 222, 219, 268, 265, 268, 265, 266, 151, 121, 38, 274, 111, 61, 41, 19, 61, 38, 57, 36, 35, 201, 52, 101, 101, 168, 154, 178, 157, 173, 176, 185, 135, 185, 176, 126, 194, 157, 15, 460, 518, 518, 58, 342, 349, 349, 307, 51, 27, 342, 71, 218, 221, 175, 129, 401, 313, 313, 214, 241, 141, 129, 125, 124, 183, 106, 100, 103, 97, 122, 117, 219, 132, 136, 129, 120, 292, 94, 281, 313, 313, 214, 90, 358, 358, 233, 265, 265, 196, 274, 274, 202, 53, 902, 117, 204, 139, 206, 97, 185, 124, 206, 130, 186, 200, 140, 146, 69, 88, 61, 217, 22, 17, 22, 344, 29, 648, 196, 25, 46, 21, 110, 117, 64, 165, 165, 165, 115, 13, 25, 43, 14, 14, 19, 20, 51, 88, 68, 48, 78, 375, 71, 240, 236, 236, 227, 223, 243, 239, 174, 180, 174, 58, 112, 92, 164, 122, 164, 122, 103, 25, 21, 25, 315, 30, 114, 327, 47, 287, 201, 129, 226, 327, 121, 121, 129, 130, 138, 121, 52, 58, 243, 186, 175, 158, 152, 125, 95, 89, 185, 142, 218, 88, 88, 60, 107, 84, 86, 59, 151, 106, 225, 189, 66, 522, 492, 529, 515, 447, 467, 456, 443, 716, 64, 82, 131, 222, 177, 184, 212, 209, 144, 147, 164, 110, 82, 151, 178, 130, 217, 158, 144, 245, 213, 200, 215, 211, 204, 201, 198, 132, 134, 155, 115, 123, 158, 158, 221, 160, 82, 147, 60, 60, 59, 61, 271, 265, 239, 156, 294, 255, 306, 265, 219, 189, 200, 156, 70, 51, 64, 319, 60, 60, 222, 206, 160, 153, 134, 579, 717, 533, 533, 717, 346, 533, 346, 122, 87, 406, 246, 318, 342, 375, 201, 189, 97, 60, 64, 238, 361, 680, 250, 158, 282, 90, 7, 133, 200, 196, 157, 196, 160, 173, 145, 178, 166, 133, 202, 324, 204, 469, 295, 252, 235, 184, 184, 334, 257, 201, 156, 149, 201, 106, 219, 108, 197, 185, 240, 111, 143, 390, 40, 50, 322, 234, 268, 426, 48, 235, 413, 535, 526, 511, 456, 315, 124, 150, 148, 150, 148, 119, 97, 112, 92, 51, 43, 50, 35, 43, 60, 321, 362, 362, 367, 496, 32, 32, 40, 76, 134, 78, 92, 134, 34, 70, 34, 43, 50, 60, 43, 61, 64, 372, 50, 60, 118, 140, 118, 65, 34, 61, 50, 186, 198, 428, 83, 391, 399, 74, 47, 52, 172, 75, 605, 578, 606, 607, 605, 610, 610, 615, 16, 580, 27, 34, 36, 34, 234, 61, 290, 75, 66, 152, 133, 311, 209, 139, 325, 227, 236, 223, 269, 272, 250, 259, 223, 231, 223, 230, 223, 223, 230, 243, 234, 375, 177, 309, 363, 391, 398, 375, 255, 270, 364, 370, 302, 362, 215, 362, 357, 302, 177, 148, 227, 184, 244, 244, 117, 147, 491, 407, 155, 39, 65, 26, 51, 26, 53, 65, 40, 34, 75, 56, 55, 47, 28, 22, 51, 59, 55, 27, 38, 22, 281, 92, 171, 86, 171, 61, 38, 52, 41, 19, 52, 29, 41, 19, 27, 311, 343, 223, 209, 208, 253, 236, 211, 211, 39, 29, 37, 29, 209, 74, 67, 76, 68, 521, 137, 131, 148, 436, 398, 456, 490, 415, 346, 416, 363, 386, 415, 412, 386, 387, 426, 426, 138, 61, 61, 138, 138, 101, 90, 141, 105, 64, 52, 57, 105, 38, 88, 57, 353, 405, 385, 359, 380, 411, 448, 353, 392, 433, 392, 396, 352, 396, 388, 358, 448, 352, 605, 556, 568, 58, 58, 46, 246, 81, 43, 399, 402, 394, 76, 128, 76, 76, 64, 122, 110, 110, 80, 117, 117, 100, 118, 118, 102, 118, 118, 102, 128, 109, 111, 111, 92, 88, 88, 68, 145, 69, 69, 56, 103, 103, 85, 103, 103, 85, 126, 126, 115, 105, 105, 93, 76, 76, 64, 379, 130, 100, 192, 147, 212, 130, 79, 99, 168, 222, 311, 163, 164, 163, 774, 59, 59, 35, 51, 29, 47, 164, 884, 278, 116, 116, 145, 128, 165, 346, 159, 499, 153, 69, 12, 47, 72, 47, 40, 63, 32, 50, 40, 220, 99, 262, 21, 45, 48, 49, 148, 42, 47, 42, 45, 46, 54, 37, 47, 47, 43, 174, 29, 84, 196, 245, 51, 79, 129, 94, 63, 74, 161, 117, 195, 195, 51, 82, 102, 154, 159, 146, 154, 165, 267, 142, 168, 124, 97, 134, 367, 372, 368, 374, 265, 165, 270, 279, 267, 202, 231, 215, 215, 279, 303, 233, 262, 262, 238, 271, 352, 297, 232, 254, 232, 338, 357, 248, 230, 250, 224, 321, 371, 57, 57, 52, 295, 43, 36, 91, 51, 67, 97, 140, 153, 189, 164, 176, 212, 156, 168, 204, 151, 164, 200, 154, 152, 165, 201, 144, 157, 194, 166, 202, 140, 153, 190, 117, 123, 102, 123, 115, 123, 136, 175, 115, 129, 167, 110, 124, 163, 101, 115, 155, 147, 104, 121, 135, 173, 113, 127, 166, 117, 157, 109, 122, 161, 109, 143, 157, 179, 128, 148, 159, 172, 207, 151, 164, 200, 146, 159, 196, 135, 148, 185, 149, 148, 160, 197, 140, 153, 190, 162, 198, 135, 148, 185, 97, 111, 150, 118, 132, 170, 110, 124, 163, 106, 120, 159, 99, 117, 130, 169, 109, 122, 161, 113, 152, 104, 118, 157, 167, 147, 115, 244, 265, 271, 389, 343, 305, 393, 333, 332, 430, 338, 558, 409, 77, 179, 202, 89, 66, 67, 65, 49, 77, 47, 53, 41, 239, 42, 42, 65, 65, 65, 51, 526, 522, 486, 597, 497, 432, 363, 363, 317, 320, 317, 337, 341, 337, 339, 342, 339, 359, 363, 359, 529, 384, 353, 357, 353, 380, 384, 380, 512, 598, 624, 650, 520, 591, 884, 257, 587, 318, 519, 584, 587, 587, 572, 599, 599, 522, 567, 542, 43, 60, 42, 51, 57, 45, 262, 57, 42, 44, 41, 43, 44, 42, 57, 64, 68, 46, 85, 85, 63, 78, 57, 99, 79, 50, 50, 50, 64, 691, 637, 690, 691, 697, 144, 32, 27, 22, 34, 22, 20, 22, 20, 26, 228, 504, 378, 504, 48, 57, 35, 44, 38, 50, 139, 118, 133, 145, 115, 193, 161, 185, 203, 159, 207, 173, 195, 222, 170, 222, 114, 366, 70, 191, 574, 238, 88, 319, 12, 12, 210, 91, 508, 484, 501, 237, 534, 316, 316, 241, 237, 205, 316, 316, 277, 269, 237, 310, 249, 288, 308, 280, 258, 286, 232, 379, 316, 260, 282, 228, 260, 408, 324, 290, 353, 289, 390, 298, 225, 210, 172, 316, 316, 267, 283, 268, 268, 316, 383, 394, 289, 390, 316, 295, 234, 224, 292, 290, 266, 407, 407, 197, 316, 254, 236, 243, 243, 290, 251, 222, 263, 296, 354, 352, 191, 204, 240, 265, 229, 281, 260, 207, 278, 324, 141, 111, 200, 156, 219, 236, 111, 28, 151, 126, 673, 328, 81, 53, 96, 54, 60, 48, 313, 50, 50, 196, 142, 163, 187, 166, 185, 191, 187, 137, 187, 191, 142, 209, 572, 579, 576, 581, 457, 345, 225, 227, 220, 240, 233, 233, 239, 246, 274, 278, 303, 233, 244, 253, 276, 271, 276, 244, 259, 269, 265, 263, 267, 280, 280, 282, 321, 271, 268, 274, 282, 282, 287, 331, 259, 254, 296, 227, 222, 230, 225, 245, 260, 263, 266, 266, 271, 302, 250, 254, 247, 260, 263, 274, 264, 266, 238, 245, 259, 240, 242, 245, 265, 272, 302, 290, 273, 254, 257, 250, 279, 279, 286, 283, 289, 256, 531, 40, 137, 144, 141, 122, 509, 54, 46, 72, 74, 71, 57, 447, 120, 42, 337, 54, 54, 83, 234, 207, 271, 230, 284, 234, 164, 192, 206, 384, 438, 438, 453, 538, 385, 427, 428, 397, 407, 538, 538, 421, 536, 516, 422, 496, 536, 538, 421, 496, 603, 656, 498, 523, 530, 530, 435, 526, 435, 432, 486, 526, 482, 437, 486, 526, 265, 399, 79, 79, 24, 157, 153, 162, 133, 216, 173, 234, 162, 105, 132, 105, 326, 148, 139, 117, 146, 124, 123, 144, 111, 89, 189, 468, 541, 468, 541, 207, 92, 211, 211, 164, 281, 281, 246, 240, 240, 197, 305, 305, 271, 211, 211, 164, 211, 211, 164, 280, 280, 170, 211, 211, 164, 143, 98, 236, 148, 185, 410, 189, 246, 246, 207, 246, 246, 207, 290, 290, 228, 165, 165, 157, 329, 234, 223, 325, 267, 267, 233, 123, 544, 621, 239, 239, 171, 271, 271, 216, 264, 264, 202, 306, 325, 276, 239, 239, 171, 239, 239, 171, 112, 109, 55, 95, 57, 271, 305, 271, 211, 211, 164, 211, 211, 164, 468, 333, 295, 182, 140, 236, 140, 233, 126, 133, 126, 125, 128, 126, 145, 132, 143, 128, 343, 343, 224, 394, 394, 206, 154, 193, 142, 296, 154, 114, 116, 74, 198, 356, 532, 467, 469, 487, 487, 482, 559, 487, 532, 469, 467, 469, 482, 487, 502, 542, 559, 505, 543, 502, 487, 487, 487, 532, 487, 487, 537, 90, 74, 72, 74, 85, 194, 170, 175, 113, 89, 142, 94, 102, 111, 111, 157, 112, 108, 178, 108, 81, 140, 85, 95, 105, 105, 168, 106, 150, 198, 198, 214, 50, 62, 38, 517, 517, 522, 236, 236, 236, 236, 187, 236, 164, 125, 93, 93, 124, 152, 142, 159, 130, 141, 93, 124, 152, 142, 159, 130, 141, 125, 93, 125, 125, 122, 116, 130, 125, 125, 122, 116, 130, 93, 125, 94, 94, 60, 224, 224, 312, 164, 196, 158, 224, 289, 164, 259, 259, 180, 241, 220, 220, 241, 217, 217, 272, 295, 189, 221, 272, 295, 218, 217, 248, 195, 183, 213, 195, 171, 113, 116, 116, 148, 103, 89, 81, 113, 113, 145, 100, 137, 119, 77, 106, 106, 138, 94, 125, 125, 125, 122, 116, 130, 93, 125, 125, 122, 116, 130, 93, 125, 167, 168, 166, 205, 167, 172, 177, 181, 48, 52, 396, 370, 380, 375, 397, 384, 384, 463, 467, 467, 448, 463, 388, 393, 381, 453, 389, 382, 384, 381, 441, 435, 345, 339, 345, 371, 365, 340, 339, 350, 345, 339, 297, 336, 326, 337, 345, 371, 365, 345, 340, 339, 350, 350, 345, 71, 240, 69, 100, 155, 142, 112, 74, 142, 74, 130, 104, 68, 130, 68, 108, 130, 130, 212, 334, 263, 174, 124, 146, 299, 315, 574, 567, 574, 56, 51, 166, 256, 232, 158, 226, 256, 269, 325, 294, 328, 308, 316, 318, 347, 345, 373, 356, 299, 366, 386, 140, 140, 120, 63, 248, 205, 205, 172, 254, 23, 16, 33, 299, 390, 393, 200, 433, 195, 52, 52, 65, 184, 168, 138, 116, 149, 143, 172, 159, 136, 98, 99, 77, 123, 190, 175, 148, 97, 27, 193, 164, 239, 197, 255, 193, 163, 28, 542, 495, 515, 497, 521, 90, 99, 89, 177, 108, 130, 285, 71, 76, 392, 396, 80, 404, 80, 389, 390, 80, 153, 151, 110, 311, 47, 107, 329, 136, 34, 290, 298, 173, 162, 261, 137, 269, 112, 138, 120, 122, 138, 140, 136, 133, 122, 119, 119, 104, 111, 111, 97, 118, 114, 114, 100, 118, 104, 156, 156, 144, 127, 127, 113, 112, 109, 98, 119, 119, 104, 114, 114, 101, 119, 119, 104, 123, 123, 109, 127, 127, 113, 113, 113, 100, 105, 105, 92, 105, 105, 94, 140, 140, 130, 105, 105, 94, 267, 129, 143, 81, 81, 130, 69, 87, 174, 174, 178, 173, 179, 166, 139, 112, 112, 79, 199, 129, 148, 96, 146, 142, 151, 129, 123, 123, 106, 114, 114, 98, 123, 114, 117, 101, 123, 106, 166, 166, 152, 133, 133, 117, 115, 115, 98, 123, 123, 106, 117, 117, 102, 150, 150, 115, 123, 123, 106, 128, 128, 111, 133, 133, 116, 116, 116, 101, 107, 107, 91, 107, 107, 95, 146, 146, 134, 106, 106, 94, 122, 122, 100, 415, 323, 224, 122, 244, 346, 324, 220, 239, 190, 181, 212, 143, 209, 264, 111, 277, 318, 279, 263, 315, 272, 287, 309, 239, 293, 263, 263, 263, 269, 276, 259, 272, 452, 372, 400, 321, 379, 452, 273, 269, 269, 279, 293, 279, 279, 279, 255, 255, 255, 273, 269, 269, 474, 15, 231, 89, 60, 353, 68, 159, 355, 132, 141, 268, 63, 37, 491, 884, 430, 594, 107, 160, 325, 378, 172, 378, 145, 149, 202, 146, 172, 145, 141, 107, 102, 246, 254, 192, 212, 59, 183, 164, 177, 189, 160, 137, 227, 197, 219, 236, 194, 238, 209, 226, 253, 207, 189, 397, 127, 117, 160, 38, 29, 17, 29, 29, 88, 750, 84, 85, 389, 149, 295, 96, 94, 236, 185, 185, 208, 208, 406, 185, 271, 39, 338, 225, 152, 250, 151, 142, 134, 243, 113, 120, 396, 177, 318, 371, 298, 234, 325, 131, 127, 128, 127, 145, 137, 115, 85, 178, 134, 211, 115, 137, 374, 366, 231, 229, 262, 227, 93, 152, 122, 208, 165, 227, 152, 157, 122, 91, 338, 60, 62, 44, 44, 247, 146, 95, 190, 217, 201, 151, 45, 45, 42, 42, 73, 72, 206, 35, 63, 41, 298, 54, 41, 516, 293, 443, 102, 884, 631, 87, 227, 193, 164, 239, 197, 255, 193, 163, 53, 134, 116, 120, 110, 118, 109, 125, 144, 56, 884, 103, 136, 142, 130, 133, 140, 134, 146, 123, 116, 91, 117, 114, 230, 426, 117, 69, 122, 123, 123, 124, 62, 64, 61, 279, 198, 198, 82, 61, 61, 36, 120, 220, 174, 151, 111, 91, 106, 117, 87, 100, 170, 138, 162, 179, 136, 308, 197, 149, 185, 212, 147, 212, 253, 91, 487, 176, 98, 87, 115, 152, 492, 405, 237, 225, 66, 28, 11, 389, 399, 409, 374, 412, 502, 428, 140, 128, 24, 66, 66, 44, 73, 52, 42, 42, 2, 42, 2, 42, 42, 2, 41, 1, 2, 42, 2, 20, 51, 0, 49, 0, 40, 0, 34, 0, 42, 41, 1, 2, 41, 0, 390, 176, 156, 160, 222, 182, 218, 184, 189, 200, 222, 185, 221, 200, 188, 206, 139, 80, 117, 150, 140, 360, 366, 110, 24, 58, 28, 67, 53, 112, 151, 74, 208, 136, 198, 59, 87, 385, 43, 63, 30, 47, 28, 47, 614, 469, 53, 57, 61, 151, 150, 270, 884, 33, 217, 208, 113, 45, 40, 85, 82, 69, 65, 59, 56, 24, 51, 49, 253, 116, 113, 68, 206, 163, 114, 114, 185, 101, 82, 104, 330, 129, 164, 345, 158, 297, 81, 126, 30, 53, 42, 48, 45, 23, 27, 86, 37, 23, 49, 56, 53, 27, 52, 59, 55, 34, 23, 77, 68, 61, 71, 167, 117, 164, 26, 32, 26, 380, 8, 8, 0, 30, 50, 359, 26, 24, 28, 84, 91, 83, 122, 39, 78, 143, 113, 106, 199, 156, 231, 348, 93, 92, 183, 172, 31, 248, 252, 232, 183, 309, 232, 95, 202, 197, 198, 184, 235, 184, 90, 120, 212, 114, 105, 196, 256, 179, 263, 136, 198, 114, 94, 114, 212, 223, 146, 194, 298, 108, 110, 143, 139, 154, 271, 93, 92, 35, 32, 389, 261, 38, 52, 61, 69, 63, 71, 50, 85, 274, 248, 294, 213, 271, 206, 112, 84, 209, 234, 213, 237, 269, 161, 240, 195, 176, 163, 159, 253, 346, 186, 204, 157, 145, 136, 116, 383, 99, 77, 162, 234, 162, 173, 132, 74, 384, 365, 51, 0, 349, 8, 360, 51, 0, 336, 385, 380, 375, 389, 385, 492, 559, 21, 17, 47, 32, 38, 35, 13, 43, 51, 47, 21, 40, 46, 43, 21, 19, 258, 884, 582, 567, 575, 582, 97, 93, 92, 127, 103, 100, 92, 93, 95, 142, 119, 107, 103, 99, 170, 250, 250, 193, 184, 154, 167, 67, 264, 271, 225, 529, 259, 259, 305, 162, 193, 192, 259, 192, 292, 239, 240, 239, 191, 239, 192, 109, 126, 126, 123, 117, 131, 95, 122, 122, 119, 113, 127, 90, 109, 109, 106, 100, 114, 76, 178, 123, 123, 91, 94, 56, 76, 74, 58, 60, 57, 124, 132, 180, 210, 182, 252, 211, 267, 210, 181, 265, 105, 502, 553, 547, 126, 662, 166, 170, 178, 180, 162, 166, 170, 174, 255, 204, 246, 203, 229, 247, 204, 214, 243, 205, 226, 11, 476, 511, 219, 403, 595, 152, 158, 157, 215, 215, 436, 186, 256, 197, 239, 331, 106, 254, 43, 53, 141, 270, 284, 284, 268, 279, 287, 287, 498, 68, 141, 211, 50, 1, 1, 0, 1, 1, 1, 0, 1, 45, 38, 0, 1, 1, 0, 27, 4, 0, 2, 31, 1, 2, 31, 1, 1, 30, 0, 2, 31, 1, 3, 31, 1, 2, 30, 401, 1, 315, 4, 27, 0, 231, 112, 126, 89, 89, 327, 57, 379, 132, 195, 362, 145, 125, 139, 151, 121, 198, 166, 190, 207, 164, 212, 178, 199, 226, 175, 151, 121, 354, 489, 541, 446, 388, 91, 91, 123, 119, 22, 22, 28, 56, 56, 56, 92, 22, 17, 22, 69, 58, 47, 177, 101, 33, 58, 33, 58, 38, 33, 28, 33, 39, 25, 50, 38, 38, 22, 18, 50, 18, 109, 317, 282, 277, 228, 299, 321, 245, 216, 350, 539, 254, 322, 448, 147, 91, 192, 236, 151, 191, 134, 89, 187, 120, 470, 519, 416, 519, 519, 472, 438, 411, 411, 489, 262, 218, 306, 310, 501, 600, 452, 473, 452, 168, 89, 46, 200, 181, 194, 206, 178, 240, 210, 232, 249, 208, 250, 223, 238, 265, 221, 206, 251, 177, 511, 128, 209, 115, 233, 168, 139, 124, 147, 221, 220, 243, 220, 235, 216, 192, 246, 108, 74, 150, 78, 80, 108, 108, 196, 110, 105, 90, 198, 90, 167, 138, 220, 176, 237, 167, 341, 109, 200, 137, 222, 206, 368, 253, 128, 124, 204, 263, 307, 229, 234, 199, 199, 230, 233, 229, 225, 188, 147, 195, 150, 125, 128, 112, 96, 139, 111, 111, 111, 203, 185, 202, 167, 206, 144, 203, 144, 200, 201, 146, 166, 183, 151, 200, 173, 169, 139, 169, 139, 192, 165, 208, 162, 158, 161, 236, 106, 106, 54, 56, 52, 60, 294, 182, 161, 202, 139, 221, 41, 19, 41, 19, 42, 20, 51, 29, 53, 43, 28, 238, 304, 348, 351, 305, 301, 336, 270, 235, 168, 228, 230, 306, 345, 230, 241, 252, 215, 291, 370, 246, 251, 42, 42, 139, 68, 69, 66, 92, 86, 265, 531, 172, 143, 215, 215, 174, 215, 215, 174, 238, 238, 216, 254, 209, 209, 181, 159, 159, 181, 238, 238, 181, 169, 96, 98, 203, 283, 239, 82, 79, 152, 189, 161, 124, 122, 229, 229, 194, 81, 171, 229, 229, 174, 232, 77, 77, 77, 56, 53, 59, 29, 4, 4, 46, 50, 53, 48, 32, 67, 32, 67, 57, 32, 66, 55, 5, 53, 495, 84, 102, 197, 430, 191, 146, 309, 30, 47, 50, 886, 53, 88, 61, 82, 39, 39, 85, 38, 40, 50, 53, 56, 125, 186, 234, 316, 69, 52, 308, 42, 95, 67, 177, 107, 224, 32, 167, 30, 290, 140, 72, 71, 147, 140, 133, 129, 127, 126, 396, 190, 225, 150, 190, 187, 190, 190, 126, 230, 217, 21, 231, 89, 60, 90, 93, 59, 84, 59, 75, 309, 434, 476, 320, 369, 266, 257, 304, 350, 296, 263, 263, 369, 423, 309, 339, 289, 361, 417, 288, 277, 329, 257, 884, 654, 612, 292, 432, 78, 0, 18, 22, 5, 5, 0, 0, 1, 0, 0, 49, 36, 11, 30, 30, 125, 164, 494, 216, 264, 268, 49, 478, 884, 382, 108, 353, 318, 224, 224, 231, 89, 60, 83, 59, 59, 123, 181, 187, 210, 168, 210, 187, 138, 279, 285, 270, 272, 296, 304, 243, 240, 140, 137, 117, 132, 144, 114, 192, 161, 184, 202, 158, 206, 172, 194, 221, 169, 221, 113, 402, 60, 60, 47, 226, 216, 235, 268, 157, 68, 49, 160, 49, 6, 6, 134, 85, 83, 82, 36, 58, 37, 26, 32, 191, 191, 191, 77, 188, 123, 301, 116, 134, 325, 185, 88, 103, 88, 50, 380, 359, 415, 220, 84, 73, 95, 105, 73, 95, 105, 73, 78, 83, 61, 111, 106, 97, 160, 63, 63, 73, 89, 63, 64, 72, 73, 89, 63, 66, 83, 56, 94, 61, 98, 98, 92, 77, 87, 61, 130, 267, 96, 102, 23, 34, 426]));
var $author$project$FoodMass$hundredGrams = $author$project$FoodMass$FoodMass(100);
var $author$project$EnergyRate$builtIns = A2(
	$elm$core$List$map,
	function (e) {
		return A2($author$project$EnergyRate$EnergyRate, e, $author$project$FoodMass$hundredGrams);
	},
	$author$project$Energy$builtIns);
var $elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			$elm$core$String$join,
			after,
			A2($elm$core$String$split, before, string));
	});
var $author$project$FoodDescription$builtIns = A2(
	$elm$core$List$map,
	$author$project$FoodDescription$FoodDescription,
	A2(
		$elm$core$List$map,
		A2($elm$core$String$replace, ' NFS', ' not further specified'),
		A2(
			$elm$core$List$map,
			A2($elm$core$String$replace, 'NS as to', 'not specified as to'),
			_List_fromArray(
				['100 GRAND Bar', '3 MUSKETEERS Bar', '3 Musketeers Truffle Crisp Bar', 'Abalone, cooked, NS as to cooking method', 'Abalone, floured or breaded, fried', 'Abalone, steamed or poached', 'Adobo, with noodles', 'Adobo, with rice', 'Agave liquid sweetener', 'Air filled fritter or fried puff, without syrup, Puerto Rican style', 'Alcoholic malt beverage', 'Alcoholic malt beverage, higher alcohol, sweetened', 'Alcoholic malt beverage, sweetened', 'Alexander', 'Alfalfa sprouts, raw', 'Alfredo sauce', 'Alfredo sauce with added vegetables', 'Alfredo sauce with meat', 'Alfredo sauce with meat and added vegetables', 'Alfredo sauce with poultry', 'Alfredo sauce with poultry and added vegetables', 'Alfredo sauce with seafood', 'Alfredo sauce with seafood and added vegetables', 'Almond butter', 'Almond butter, lower sodium', 'Almond chicken', 'Almond milk, sweetened', 'Almond milk, sweetened, chocolate', 'Almond milk, unsweetened', 'Almond milk, unsweetened, chocolate', 'Almond oil', 'Almond paste', 'Almonds, NFS', 'Almonds, chocolate covered', 'Almonds, flavored', 'Almonds, honey roasted', 'Almonds, lightly salted', 'Almonds, salted', 'Almonds, sugar-coated', 'Almonds, unroasted', 'Almonds, unsalted', 'Almonds, yogurt-covered', 'Aloe vera juice drink', 'Ambrosia', 'Anchovy, canned', 'Anchovy, cooked, NS as to cooking method', 'Animal fat or drippings', 'Anisette toast', 'Antipasto with ham, fish, cheese, vegetables', 'Apple cider', 'Apple juice beverage, 40-50% juice, light', 'Apple juice, 100%', 'Apple juice, 100%, with calcium added', 'Apple juice, baby food', 'Apple juice, with added calcium, baby food', 'Apple pie filling', 'Apple salad with dressing', 'Apple yogurt dessert, baby food, strained', 'Apple, baked', 'Apple, candied', 'Apple, dried', 'Apple, raw', 'Apple-banana juice, baby food', 'Apple-cherry juice, baby food', 'Apple-fruit juice blend, baby food', 'Apple-grape juice, baby food', 'Apple-peach juice, baby food', 'Apple-prune juice, baby food', 'Apple-raspberry, baby food, NS as to strained or junior', 'Apple-raspberry, baby food, junior', 'Apple-raspberry, baby food, strained', 'Apple-sweet potato juice, baby food', 'Apples and chicken, baby food, strained', 'Apples and pears, baby food, NS as to strained or junior', 'Apples and pears, baby food, junior', 'Apples and pears, baby food, strained', 'Apples and sweet potatoes, baby food, strained', 'Apples with ham, baby food, strained', 'Apples, baby food, toddler', 'Applesauce and apricots, baby food, NS as to strained or junior', 'Applesauce and apricots, baby food, junior', 'Applesauce and apricots, baby food, strained', 'Applesauce with bananas, baby food, NS as to strained or junior', 'Applesauce with bananas, baby food, junior', 'Applesauce with bananas, baby food, strained', 'Applesauce with cherries, baby food, NS as to strained or junior', 'Applesauce with cherries, baby food, junior', 'Applesauce with cherries, baby food, strained', 'Applesauce, baby food, NS as to strained or junior', 'Applesauce, baby food, junior', 'Applesauce, baby food, strained', 'Applesauce, flavored', 'Applesauce, regular', 'Applesauce, unsweetened', 'Apricot nectar', 'Apricot, canned', 'Apricot, dried', 'Apricot, raw', 'Apricots, baby food, NS as to strained or junior', 'Apricots, baby food, junior', 'Apricots, baby food, strained', 'Arepa Dominicana', 'Armadillo, cooked', 'Artichoke dip', 'Artichoke, canned, cooked, fat added', 'Artichoke, canned, cooked, no added fat', 'Artichoke, fresh, cooked, fat added', 'Artichoke, fresh, cooked, no added fat', 'Artichoke, frozen, cooked, fat added', 'Artichoke, frozen, cooked, no added fat', 'Artichoke, raw', 'Artichokes, NS as to form, cooked', 'Artichokes, stuffed', 'Asian chicken or turkey garden salad with crispy noodles, chicken and/or turkey, lettuce, fruit, nuts, crispy noodles, no dressing', 'Asian chicken or turkey garden salad, chicken and/or turkey, lettuce, fruit, nuts, no dressing', 'Asian stir fry vegetables, cooked, fat added', 'Asian stir fry vegetables, cooked, no added fat', 'Asparagus soup, cream of, NS as to made with milk or water', 'Asparagus soup, cream of, prepared with milk', 'Asparagus soup, cream of, prepared with water', 'Asparagus, NS as to form, cooked', 'Asparagus, canned, cooked with butter or margarine', 'Asparagus, canned, cooked with oil', 'Asparagus, canned, cooked, fat added, NS as to fat type', 'Asparagus, canned, cooked, no added fat', 'Asparagus, fresh, cooked with butter or margarine', 'Asparagus, fresh, cooked with oil', 'Asparagus, fresh, cooked, fat added, NS as to fat type', 'Asparagus, fresh, cooked, no added fat', 'Asparagus, frozen, cooked with butter or margarine', 'Asparagus, frozen, cooked with oil', 'Asparagus, frozen, cooked, fat added, NS as to fat type', 'Asparagus, frozen, cooked, no added fat', 'Asparagus, raw', 'Avocado dressing', 'Avocado, for use on a sandwich', 'Avocado, raw', 'Baby Ruth', 'Bacardi cocktail', 'Bacon and cheese sandwich, with spread', 'Bacon and egg sandwich', 'Bacon and tomato dressing', 'Bacon bits', 'Bacon on biscuit', 'Bacon or side pork, fresh, cooked', 'Bacon sandwich, with spread', 'Bacon soup, cream of, prepared with water', 'Bacon strip, meatless', 'Bacon, NS as to type of meat, cooked', 'Bacon, NS as to type of meat, reduced sodium, cooked', 'Bacon, for use on a sandwich', 'Bacon, for use with vegetables', 'Bacon, lettuce, and tomato sandwich with spread', 'Bacon, lettuce, and tomato submarine sandwich, with spread', 'Bacon, lettuce, tomato, and cheese submarine sandwich, with spread', 'Bagel', 'Bagel chips', 'Bagel, multigrain', 'Bagel, multigrain, with raisins', 'Bagel, oat bran', 'Bagel, pumpernickel', 'Bagel, wheat', 'Bagel, wheat bran', 'Bagel, wheat, with fruit and nuts', 'Bagel, wheat, with raisins', 'Bagel, whole grain white', 'Bagel, whole wheat', 'Bagel, whole wheat, with raisins', 'Bagel, with fruit other than raisins', 'Bagel, with raisins', 'Baked beans', 'Baked beans from fast food / restaurant', 'Baked beans, reduced sodium', 'Baked beans, vegetarian', 'Baklava', 'Bamboo shoots, cooked', 'Banana apple dessert, baby food, strained', 'Banana chips', 'Banana juice with lowfat yogurt, baby food', 'Banana nectar', 'Banana pudding', 'Banana pudding, baby food, strained', 'Banana split', 'Banana with mixed berries, baby food, strained', 'Banana yogurt dessert, baby food, strained', 'Banana, fried', 'Banana, raw', 'Bananas and pineapple, baby food, NS as to strained or junior', 'Bananas and pineapple, baby food, junior', 'Bananas and pineapple, baby food, strained', 'Bananas and strawberry, baby food, junior', 'Bananas with apples and pears, baby food, strained', 'Bananas with orange, baby food, strained', 'Bananas, baby food, NS as to strained or junior', 'Bananas, baby food, junior', 'Bananas, baby food, strained', 'Barbecue sauce', 'Barfi or Burfi, Indian dessert', 'Barley cereal, baby food, dry, instant', 'Barley soup, home recipe, canned, or ready-to-serve', 'Barley soup, sweet, with or without nuts, Asian Style', 'Barley, NS as to fat', 'Barley, fat added', 'Barley, no added fat', 'Barracuda, baked or broiled, fat added', 'Barracuda, baked or broiled, no added fat', 'Barracuda, coated, baked or broiled, fat added', 'Barracuda, coated, baked or broiled, no added fat', 'Barracuda, coated, fried', 'Barracuda, cooked, NS as to cooking method', 'Barracuda, steamed or poached', 'Basbousa', 'Basil, raw', 'Bean and ham soup, canned, reduced sodium, prepared with water or ready-to-serve', 'Bean and ham soup, chunky style, canned or ready-to-serve', 'Bean and ham soup, home recipe', 'Bean cake', 'Bean chips', 'Bean dip, made with refried beans', 'Bean paste, sweetened', 'Bean salad, yellow and/or green string beans', 'Bean soup, NFS', 'Bean soup, home recipe', 'Bean soup, mixed beans, home recipe, canned or ready-to-serve', 'Bean soup, with macaroni, home recipe, canned, or ready-to-serve', 'Bean sprouts, cooked', 'Bean sprouts, raw', 'Bean with bacon or ham soup, canned or ready-to-serve', 'Beans and brown rice', 'Beans and franks', 'Beans and rice, from fast food / restaurant', 'Beans and rice, with meat', 'Beans and rice, with tomatoes', 'Beans and tomatoes, fat added', 'Beans and tomatoes, no added fat', 'Beans and white rice', 'Beans with meat, NS as to type', 'Beans, NFS', 'Beans, from canned, NS as to type, fat added', 'Beans, from canned, NS as to type, no added fat', 'Beans, from dried, NS as to type, fat added', 'Beans, from dried, NS as to type, no added fat', 'Beans, from fast food / restaurant, NS as to type', 'Beans, green string, baby food, NS as to strained or junior', 'Beans, green string, baby food, junior', 'Beans, green string, baby food, strained', 'Beans, green string, baby food, toddler', 'Bear, cooked', 'Beaver, cooked', 'Beef and broccoli', 'Beef and egg noodles, baby food, NS as to strained or junior', 'Beef and egg noodles, baby food, junior', 'Beef and egg noodles, baby food, strained', 'Beef and macaroni with cheese sauce', 'Beef and noodles with cream or white sauce', 'Beef and noodles with gravy', 'Beef and noodles with meat sauce and cheese, diet frozen meal', 'Beef and noodles with mushroom sauce', 'Beef and noodles with soy-based sauce', 'Beef and noodles with tomato-based sauce', 'Beef and noodles, no sauce', 'Beef and potatoes with cheese sauce', 'Beef and potatoes with cream sauce, white sauce or mushroom sauce', 'Beef and potatoes, no sauce', 'Beef and rice soup, Puerto Rican style', 'Beef and rice with cheese sauce', 'Beef and rice with cream sauce', 'Beef and rice with gravy', 'Beef and rice with mushroom sauce', 'Beef and rice with soy-based sauce', 'Beef and rice with tomato-based sauce', 'Beef and rice, no sauce', 'Beef and vegetables excluding carrots, broccoli, and dark-green leafy; no potatoes, gravy', 'Beef and vegetables excluding carrots, broccoli, and dark-green leafy; no potatoes, no sauce', 'Beef and vegetables excluding carrots, broccoli, and dark-green leafy; no potatoes, soy-based sauce', 'Beef and vegetables including carrots, broccoli, and/or dark-green leafy; no potatoes, gravy', 'Beef and vegetables including carrots, broccoli, and/or dark-green leafy; no potatoes, no sauce', 'Beef and vegetables including carrots, broccoli, and/or dark-green leafy; no potatoes, soy-based sauce', 'Beef and vegetables, Hawaiian style', 'Beef barbecue submarine sandwich, on bun', 'Beef brisket, cooked, NS as to fat eaten', 'Beef brisket, cooked, lean and fat eaten', 'Beef brisket, cooked, lean only eaten', 'Beef broth, less or reduced sodium, canned or ready-to-serve', 'Beef broth, with tomato, home recipe', 'Beef broth, without tomato, home recipe', 'Beef burgundy', 'Beef chow mein or chop suey with noodles', 'Beef chow mein or chop suey, no noodles', 'Beef curry', 'Beef curry with rice', 'Beef dinner, NFS, frozen meal', 'Beef dumpling soup, home recipe, canned or ready-to-serve', 'Beef egg foo yung', 'Beef enchilada dinner, NFS, frozen meal', 'Beef enchilada, chili gravy, rice, refried beans, frozen meal', 'Beef goulash', 'Beef goulash with noodles', 'Beef goulash with potatoes', 'Beef jerky', 'Beef liver, braised', 'Beef liver, fried', 'Beef noodle soup, Puerto Rican style', 'Beef noodle soup, canned or ready-to-serve', 'Beef noodle soup, home recipe', 'Beef pot pie', 'Beef rice soup, home recipe, canned or ready-to-serve', 'Beef rolls, stuffed with vegetables or meat mixture, tomato-based sauce', 'Beef salad', 'Beef sandwich, NFS', 'Beef sausage', 'Beef sausage with cheese', 'Beef sausage, reduced fat', 'Beef sausage, reduced sodium', 'Beef shish kabob with vegetables, excluding potatoes', 'Beef short ribs, boneless, with barbecue sauce, potatoes, vegetable, frozen meal', 'Beef sloppy joe, no bun', 'Beef steak with onions, Puerto Rican style', 'Beef steak, NS as to cooking method, NS as to fat eaten', 'Beef steak, NS as to cooking method, lean and fat eaten', 'Beef steak, NS as to cooking method, lean only eaten', 'Beef steak, battered, fried, NS as to fat eaten', 'Beef steak, battered, fried, lean and fat eaten', 'Beef steak, battered, fried, lean only eaten', 'Beef steak, braised, NS as to fat eaten', 'Beef steak, braised, lean and fat eaten', 'Beef steak, braised, lean only eaten', 'Beef steak, breaded or floured, baked or fried, NS as to fat eaten', 'Beef steak, breaded or floured, baked or fried, lean and fat eaten', 'Beef steak, breaded or floured, baked or fried, lean only eaten', 'Beef steak, broiled or baked, NS as to fat eaten', 'Beef steak, broiled or baked, lean and fat eaten', 'Beef steak, broiled or baked, lean only eaten', 'Beef steak, fried, NS as to fat eaten', 'Beef steak, fried, lean and fat eaten', 'Beef steak, fried, lean only eaten', 'Beef stew with potatoes and vegetables excluding carrots, broccoli, and dark-green leafy; gravy', 'Beef stew with potatoes and vegetables excluding carrots, broccoli, and dark-green leafy; tomato-based sauce', 'Beef stew with potatoes and vegetables including carrots, broccoli, and/or dark-green leafy; gravy', 'Beef stew with potatoes and vegetables including carrots, broccoli, and/or dark-green leafy; tomato-based sauce', 'Beef stew with potatoes, Puerto Rican style', 'Beef stew with potatoes, gravy', 'Beef stew with potatoes, tomato-based sauce', 'Beef stew with potatoes, tomato-based sauce, Mexican style', 'Beef stew with vegetables excluding potatoes, Puerto Rican style', 'Beef stew, baby food, toddler', 'Beef stew, meat with gravy, no potatoes, Puerto Rican style', 'Beef stew, no potatoes, tomato-based sauce, Mexican style', 'Beef stew, no potatoes, tomato-based sauce, with chili peppers, Mexican style', 'Beef stroganoff', 'Beef stroganoff soup, chunky style, home recipe, canned or ready-to-serve', 'Beef stroganoff with noodles', 'Beef taco filling: beef, cheese, tomato, taco sauce', 'Beef vegetable soup with potato, pasta, or rice, chunky style, canned, or ready-to-serve', 'Beef vegetable soup, home recipe, Mexican style', 'Beef wellington', 'Beef with barbecue sauce', 'Beef with cream or white sauce', 'Beef with gravy', 'Beef with mushroom sauce', 'Beef with soy-based sauce', 'Beef with spaetzle or rice, vegetable, frozen meal', 'Beef with sweet and sour sauce', 'Beef with tomato-based sauce', 'Beef with vegetable, diet frozen meal', 'Beef with vegetables excluding carrots, broccoli, and dark-green leafy; no potatoes, mushroom sauce', 'Beef with vegetables excluding carrots, broccoli, and dark-green leafy; no potatoes, tomato-based sauce', 'Beef with vegetables including carrots, broccoli, and/or dark-green leafy; no potatoes, mushroom sauce', 'Beef with vegetables including carrots, broccoli, and/or dark-green leafy; no potatoes, tomato-based sauce', 'Beef with vegetables, baby food, strained', 'Beef with vegetables, baby food, toddler', 'Beef, NS as to cut, cooked, NS as to fat eaten', 'Beef, NS as to cut, cooked, lean and fat eaten', 'Beef, NS as to cut, cooked, lean only eaten', 'Beef, NS as to cut, fried, NS to fat eaten', 'Beef, baby food, NS as to strained or junior', 'Beef, baby food, junior', 'Beef, baby food, strained', 'Beef, bacon, cooked', 'Beef, bacon, reduced sodium, cooked', 'Beef, broth, bouillon, or consomme', 'Beef, cow head, cooked', 'Beef, dried, chipped, cooked in fat', 'Beef, dried, chipped, uncooked', 'Beef, dumplings, and vegetables excluding carrots, broccoli, and dark-green leafy; gravy', 'Beef, dumplings, and vegetables including carrots, broccoli, and/or dark-green leafy; gravy', 'Beef, for use with vegetables', 'Beef, ground, with egg and onion', 'Beef, neck bones, cooked', 'Beef, noodles, and vegetables excluding carrots, broccoli, and dark-green leafy; gravy', 'Beef, noodles, and vegetables excluding carrots, broccoli, and dark-green leafy; mushroom sauce', 'Beef, noodles, and vegetables excluding carrots, broccoli, and dark-green leafy; no sauce', 'Beef, noodles, and vegetables excluding carrots, broccoli, and dark-green leafy; soy-based sauce', 'Beef, noodles, and vegetables excluding carrots, broccoli, and dark-green leafy; tomato-based sauce', 'Beef, noodles, and vegetables including carrots, broccoli, and/or dark-green leafy; gravy', 'Beef, noodles, and vegetables including carrots, broccoli, and/or dark-green leafy; mushroom sauce', 'Beef, noodles, and vegetables including carrots, broccoli, and/or dark-green leafy; no sauce', 'Beef, noodles, and vegetables including carrots, broccoli, and/or dark-green leafy; soy-based sauce', 'Beef, noodles, and vegetables including carrots, broccoli, and/or dark-green leafy; tomato-based sauce', 'Beef, oxtails, cooked', 'Beef, pickled', 'Beef, pot roast, braised or boiled, NS as to fat eaten', 'Beef, pot roast, braised or boiled, lean and fat eaten', 'Beef, pot roast, braised or boiled, lean only eaten', 'Beef, potatoes, and vegetables excluding carrots, broccoli, and dark-green leafy; cheese sauce', 'Beef, potatoes, and vegetables excluding carrots, broccoli, and dark-green leafy; cream sauce, white sauce, or mushroom sauce', 'Beef, potatoes, and vegetables excluding carrots, broccoli, and dark-green leafy; gravy', 'Beef, potatoes, and vegetables excluding carrots, broccoli, and dark-green leafy; soy-based sauce', 'Beef, potatoes, and vegetables excluding carrots, broccoli, and dark-green leafy; tomato-based sauce', 'Beef, potatoes, and vegetables including carrots, broccoli, and/or dark-green leafy; cheese sauce', 'Beef, potatoes, and vegetables including carrots, broccoli, and/or dark-green leafy; cream sauce, white sauce, or mushroom sauce', 'Beef, potatoes, and vegetables including carrots, broccoli, and/or dark-green leafy; gravy', 'Beef, potatoes, and vegetables including carrots, broccoli, and/or dark-green leafy; no sauce', 'Beef, potatoes, and vegetables including carrots, broccoli, and/or dark-green leafy; soy-based sauce', 'Beef, potatoes, and vegetables including carrots, broccoli, and/or dark-green leafy; tomato-based sauce', 'Beef, potatoes, and vegetables, excluding carrots, broccoli, and dark-green leafy; no sauce', 'Beef, prepackaged or deli, luncheon meat', 'Beef, prepackaged or deli, luncheon meat, reduced sodium', 'Beef, rice, and vegetables excluding carrots, broccoli, and dark-green leafy; cheese sauce', 'Beef, rice, and vegetables excluding carrots, broccoli, and dark-green leafy; gravy', 'Beef, rice, and vegetables excluding carrots, broccoli, and dark-green leafy; mushroom sauce', 'Beef, rice, and vegetables excluding carrots, broccoli, and dark-green leafy; no sauce', 'Beef, rice, and vegetables excluding carrots, broccoli, and dark-green leafy; soy-based sauce', 'Beef, rice, and vegetables excluding carrots, broccoli, and/or dark-green leafy; tomato-based sauce', 'Beef, rice, and vegetables including carrots, broccoli, and/or dark-green leafy; cheese sauce', 'Beef, rice, and vegetables including carrots, broccoli, and/or dark-green leafy; gravy', 'Beef, rice, and vegetables including carrots, broccoli, and/or dark-green leafy; mushroom sauce', 'Beef, rice, and vegetables including carrots, broccoli, and/or dark-green leafy; no sauce', 'Beef, rice, and vegetables including carrots, broccoli, and/or dark-green leafy; soy-based sauce', 'Beef, rice, and vegetables including carrots, broccoli, and/or dark-green leafy; tomato-based sauce', 'Beef, roast, canned', 'Beef, roast, hash', 'Beef, roast, roasted, NS as to fat eaten', 'Beef, roast, roasted, lean and fat eaten', 'Beef, roast, roasted, lean only eaten', 'Beef, sandwich steak, flaked, formed, thinly sliced', 'Beef, shortribs, barbecued, with sauce, NS as to fat eaten', 'Beef, shortribs, barbecued, with sauce, lean and fat eaten', 'Beef, shortribs, barbecued, with sauce, lean only eaten', 'Beef, shortribs, cooked, NS as to fat eaten', 'Beef, shortribs, cooked, lean and fat eaten', 'Beef, shortribs, cooked, lean only eaten', 'Beef, sliced, with gravy, potatoes, vegetable, frozen meal', 'Beef, stew meat, cooked, NS as to fat eaten', 'Beef, stew meat, cooked, lean and fat eaten', 'Beef, stew meat, cooked, lean only eaten', 'Beef, tofu, and vegetables excluding carrots, broccoli,  and dark-green leafy; no potatoes, soy-based sauce', 'Beef, tofu, and vegetables including carrots, broccoli, and/or dark-green leafy; no potatoes, soy-based sauce', 'Beer', 'Beer cheese soup, made with milk', 'Beer, higher alcohol', 'Beer, light', 'Beer, light, higher alcohol', 'Beer, low carb', 'Beet greens, cooked', 'Beet greens, raw', 'Beet juice', 'Beets, NS as to form, cooked', 'Beets, baby food, strained', 'Beets, canned, cooked, fat added', 'Beets, canned, cooked, no added fat', 'Beets, canned, reduced sodium, cooked', 'Beets, fresh, cooked, fat added', 'Beets, fresh, cooked, no added fat', 'Beets, pickled', 'Beets, raw', 'Beignet', 'Berries, NFS', 'Bibimbap, Korean', 'Big Mac (McDonalds)', 'Bird\'s nest soup', 'Biryani with chicken', 'Biryani with meat', 'Biryani with vegetables', 'Biscayne codfish, Puerto Rican style', 'Biscuit with fruit', 'Biscuit with gravy', 'Biscuit, NFS', 'Biscuit, cheese', 'Biscuit, from fast food / restaurant', 'Biscuit, from refrigerated dough', 'Biscuit, home recipe', 'Biscuit, wheat', 'Bison, cooked', 'Bitter melon, cooked', 'Bitter melon, horseradish, jute, or radish leaves, cooked', 'Black Russian', 'Black bean salad', 'Black bean sauce', 'Black bean soup, home recipe, canned or ready-to-serve', 'Black beans and brown rice', 'Black beans and rice, from fast food / restaurant', 'Black beans and white rice', 'Black beans with meat', 'Black beans, NFS', 'Black beans, from canned, fat added', 'Black beans, from canned, no added fat', 'Black beans, from canned, reduced sodium', 'Black beans, from dried, fat added', 'Black beans, from dried, no added fat', 'Black beans, from fast food / restaurant', 'Blackberries, frozen', 'Blackberries, raw', 'Blackberry juice, 100%', 'Blackeyed peas, NFS', 'Blackeyed peas, from canned', 'Blackeyed peas, from dried', 'Blackeyed peas, from frozen', 'Blintz, cheese-filled', 'Blintz, fruit-filled', 'Blood sausage', 'Bloody Mary', 'Bluberries, canned', 'Blue or roquefort cheese dressing', 'Blue or roquefort cheese dressing, fat free', 'Blue or roquefort cheese dressing, light', 'Blueberries, dried', 'Blueberries, frozen', 'Blueberries, raw', 'Blueberry juice', 'Blueberry pie filling', 'Blueberry syrup', 'Blueberry yogurt dessert, baby food, strained', 'Bologna and cheese sandwich, with spread', 'Bologna sandwich, with spread', 'Bologna, NFS', 'Bologna, made from any kind of meat, reduced fat', 'Bologna, made from any kind of meat, reduced fat and reduced sodium', 'Bologna, made from any kind of meat, reduced sodium', 'Borscht', 'Bouillabaisse', 'Brains, cooked', 'Brandy', 'Brandy and cola', 'Bratwurst', 'Bratwurst, with cheese', 'Brazil nuts', 'Bread stuffing', 'Bread stuffing made with egg', 'Bread, Boston Brown', 'Bread, Cuban', 'Bread, Cuban, toasted', 'Bread, French or Vienna', 'Bread, French or Vienna, toasted', 'Bread, French or Vienna, whole wheat', 'Bread, French or Vienna, whole wheat, toasted', 'Bread, Irish soda', 'Bread, Italian, Grecian, Armenian', 'Bread, Italian, Grecian, Armenian, toasted', 'Bread, NS as to major flour', 'Bread, NS as to major flour, toasted', 'Bread, Spanish coffee', 'Bread, barley', 'Bread, barley, toasted', 'Bread, black', 'Bread, black, toasted', 'Bread, caressed, Puerto Rican style', 'Bread, caressed, toasted, Puerto Rican style', 'Bread, chappatti or roti, wheat', 'Bread, cheese', 'Bread, cheese, toasted', 'Bread, cinnamon', 'Bread, cinnamon, toasted', 'Bread, cornmeal and molasses', 'Bread, cornmeal and molasses, toasted', 'Bread, dough, fried', 'Bread, egg, Challah', 'Bread, egg, Challah, toasted', 'Bread, fruit', 'Bread, gluten free', 'Bread, gluten free, toasted', 'Bread, high protein', 'Bread, high protein, toasted', 'Bread, lard, Puerto Rican style', 'Bread, lard, toasted, Puerto Rican style', 'Bread, made from home recipe or purchased at a bakery, NS as to major flour', 'Bread, made from home recipe or purchased at a bakery, toasted, NS as to major flour', 'Bread, marble rye and pumpernickel', 'Bread, marble rye and pumpernickel, toasted', 'Bread, multigrain', 'Bread, multigrain, reduced calorie and/or high fiber', 'Bread, multigrain, reduced calorie and/or high fiber, toasted', 'Bread, multigrain, toasted', 'Bread, multigrain, with raisins', 'Bread, multigrain, with raisins, toasted', 'Bread, native, water, Puerto Rican style', 'Bread, native, water, toasted, Puerto Rican style', 'Bread, nut', 'Bread, oat bran', 'Bread, oat bran, toasted', 'Bread, oatmeal', 'Bread, oatmeal, toasted', 'Bread, onion', 'Bread, onion, toasted', 'Bread, paratha, wheat', 'Bread, pita', 'Bread, pita with fruit', 'Bread, pita with fruit, toasted', 'Bread, pita, toasted', 'Bread, pita, wheat or cracked wheat', 'Bread, pita, wheat or cracked wheat, toasted', 'Bread, pita, whole wheat', 'Bread, pita, whole wheat, toasted', 'Bread, potato', 'Bread, potato, toasted', 'Bread, pumpernickel', 'Bread, pumpernickel, toasted', 'Bread, pumpkin', 'Bread, puri, wheat', 'Bread, raisin', 'Bread, raisin, toasted', 'Bread, reduced calorie and/or high fiber, white or NFS', 'Bread, reduced calorie and/or high fiber, white or NFS, toasted', 'Bread, reduced calorie and/or high fiber, white or NFS, with fruit and/or nuts', 'Bread, reduced calorie and/or high fiber, white or NFS, with fruit and/or nuts, toasted', 'Bread, rice', 'Bread, rice, toasted', 'Bread, rye', 'Bread, rye, toasted', 'Bread, sour dough', 'Bread, sour dough, toasted', 'Bread, soy', 'Bread, soy, toasted', 'Bread, sprouted wheat', 'Bread, sprouted wheat, toasted', 'Bread, sunflower meal', 'Bread, sunflower meal, toasted', 'Bread, sweet potato', 'Bread, sweet potato, toasted', 'Bread, vegetable', 'Bread, vegetable, toasted', 'Bread, wheat or cracked wheat', 'Bread, wheat or cracked wheat, made from home recipe or purchased at bakery', 'Bread, wheat or cracked wheat, made from home recipe or purchased at bakery, toasted', 'Bread, wheat or cracked wheat, reduced calorie and/or high fiber', 'Bread, wheat or cracked wheat, reduced calorie and/or high fiber, toasted', 'Bread, wheat or cracked wheat, toasted', 'Bread, wheat or cracked wheat, with raisins', 'Bread, wheat or cracked wheat, with raisins, toasted', 'Bread, white', 'Bread, white with whole wheat swirl', 'Bread, white with whole wheat swirl, toasted', 'Bread, white, low sodium or no salt', 'Bread, white, low sodium or no salt, toasted', 'Bread, white, made from home recipe or purchased at a bakery', 'Bread, white, made from home recipe or purchased at a bakery, toasted', 'Bread, white, special formula, added fiber', 'Bread, white, special formula, added fiber, toasted', 'Bread, white, toasted', 'Bread, whole grain white', 'Bread, whole grain white, toasted', 'Bread, whole wheat', 'Bread, whole wheat, made from home recipe or purchased at bakery', 'Bread, whole wheat, made from home recipe or purchased at bakery, toasted', 'Bread, whole wheat, toasted', 'Bread, whole wheat, with raisins', 'Bread, whole wheat, with raisins, toasted', 'Bread, zucchini', 'Breaded brains, Puerto Rican style', 'Breadfruit, cooked', 'Breading or batter as ingredient in food', 'Breadsticks, NFS', 'Breadsticks, hard, NFS', 'Breadsticks, hard, gluten free', 'Breadsticks, hard, reduced sodium', 'Breadsticks, hard, whole wheat', 'Breadsticks, soft, NFS', 'Breadsticks, soft, from fast food / restaurant', 'Breadsticks, soft, from frozen', 'Breadsticks, soft, stuffed with melted cheese', 'Breadsticks, soft, topped with melted cheese', 'Breadsticks, soft, with parmesan cheese, from fast food / restaurant', 'Breadsticks, soft, with parmesan cheese, from frozen', 'Breakfast bar, NFS', 'Breakfast bar, cereal crust with fruit filling, lowfat', 'Breakfast bar, date, with yogurt coating', 'Breakfast link, pattie, or slice, meatless', 'Breakfast meat as ingredient in omelet', 'Breakfast pastry, NFS', 'Breakfast pizza with egg', 'Breakfast tart', 'Breakfast tart, lowfat', 'Brioche', 'Broccoflower, cooked', 'Broccoflower, raw', 'Broccoli and cauliflower, cooked, fat added', 'Broccoli and cauliflower, cooked, no added fat', 'Broccoli and chicken, baby food, strained', 'Broccoli casserole with noodles', 'Broccoli casserole with rice', 'Broccoli cheese soup, prepared with milk, home recipe, canned, or ready-to-serve', 'Broccoli raab, cooked', 'Broccoli raab, raw', 'Broccoli salad with cauliflower, cheese, bacon bits, and dressing', 'Broccoli slaw salad ', 'Broccoli soup, prepared with milk, home recipe, canned or ready-to-serve', 'Broccoli soup, prepared with water, home recipe, canned, or ready-to-serve', 'Broccoli, Chinese, cooked', 'Broccoli, NS as to form, cooked', 'Broccoli, carrots and cheese, baby food, junior', 'Broccoli, cauliflower and carrots, cooked, fat added', 'Broccoli, cauliflower and carrots, cooked, no added fat', 'Broccoli, chinese, raw', 'Broccoli, cooked, as ingredient', 'Broccoli, cooked, from restaurant', 'Broccoli, fresh, cooked with butter or margarine', 'Broccoli, fresh, cooked with oil', 'Broccoli, fresh, cooked, fat added, NS as to fat type', 'Broccoli, fresh, cooked, no added fat', 'Broccoli, frozen, cooked with butter or margarine', 'Broccoli, frozen, cooked with oil', 'Broccoli, frozen, cooked, fat added, NS as to fat type', 'Broccoli, frozen, cooked, no added fat', 'Broccoli, raw', 'Brown rice cereal, baby food, dry, instant', 'Brunswick stew', 'Bruschetta', 'Brussels sprouts, NS as to form, cooked', 'Brussels sprouts, fresh, cooked, fat added', 'Brussels sprouts, fresh, cooked, no added fat', 'Brussels sprouts, frozen, cooked, fat added', 'Brussels sprouts, frozen, cooked, no added fat', 'Brussels sprouts, raw', 'Buckwheat groats, NS as to fat', 'Buckwheat groats, fat added', 'Buckwheat groats, no added fat', 'Buffalo chicken submarine sandwich', 'Buffalo chicken submarine sandwich with cheese', 'Buffalo sauce', 'Bulgur, NS as to fat', 'Bulgur, fat added', 'Bulgur, no added fat', 'Burdock, cooked', 'Burrito with beans and rice, meatless', 'Burrito with beans, meatless', 'Burrito with beans, meatless, from fast food', 'Burrito with beans, rice, and sour cream, meatless', 'Burrito with chicken', 'Burrito with chicken and beans', 'Burrito with chicken and sour cream', 'Burrito with chicken, beans, and rice', 'Burrito with chicken, beans, and sour cream', 'Burrito with chicken, beans, rice, and sour cream', 'Burrito with meat', 'Burrito with meat and beans', 'Burrito with meat and beans, from fast food', 'Burrito with meat and sour cream', 'Burrito with meat, beans, and rice', 'Burrito with meat, beans, and sour cream', 'Burrito with meat, beans, and sour cream, from fast food', 'Burrito with meat, beans, rice, and sour cream', 'Burrito, taco, or quesadilla with egg', 'Burrito, taco, or quesadilla with egg and breakfast meat', 'Burrito, taco, or quesadilla with egg and breakfast meat, from fast food', 'Burrito, taco, or quesadilla with egg and potato', 'Burrito, taco, or quesadilla with egg, beans, and breakfast meat', 'Burrito, taco, or quesadilla with egg, potato, and breakfast meat', 'Burrito, taco, or quesadilla with egg, potato, and breakfast meat, from fast food', 'Butter replacement, liquid', 'Butter replacement, powder', 'Butter, NFS', 'Butter, light', 'Butter, stick', 'Butter, tub', 'Butter-oil blend, NFS', 'Butter-oil blend, light', 'Butter-oil blend, stick', 'Butter-oil blend, tub', 'Butterfinger', 'Butterfinger Crisp', 'Buttermilk, fat free (skim)', 'Buttermilk, low fat (1%)', 'Buttermilk, reduced fat (2%)', 'Buttermilk, whole', 'Butterscotch hard candy', 'Butterscotch morsels', 'Cabbage salad or coleslaw with apples and/or raisins, with dressing', 'Cabbage salad or coleslaw with pineapple, with dressing', 'Cabbage salad or coleslaw, from fast food / restaurant', 'Cabbage salad or coleslaw, made with Italian dressing', 'Cabbage salad or coleslaw, made with any type of fat free dressing', 'Cabbage salad or coleslaw, made with coleslaw dressing', 'Cabbage salad or coleslaw, made with creamy dressing', 'Cabbage salad or coleslaw, made with light Italian dressing', 'Cabbage salad or coleslaw, made with light coleslaw dressing', 'Cabbage salad or coleslaw, made with light creamy dressing', 'Cabbage soup, home recipe, canned or ready-to-serve', 'Cabbage with ham hocks', 'Cabbage with meat soup, home recipe, canned or ready-to-serve', 'Cabbage, Chinese, cooked, fat added', 'Cabbage, Chinese, cooked, no added fat', 'Cabbage, Chinese, raw', 'Cabbage, cooked, as ingredient', 'Cabbage, fresh, pickled, Japanese style', 'Cabbage, green, cooked with butter or margarine', 'Cabbage, green, cooked with oil', 'Cabbage, green, cooked, fat added, NS as to fat type', 'Cabbage, green, cooked, no added fat', 'Cabbage, green, raw', 'Cabbage, red, cooked', 'Cabbage, red, pickled', 'Cabbage, red, raw', 'Cabbage, savoy, cooked', 'Cactus, cooked, fat added', 'Cactus, cooked, no added fat', 'Cactus, raw', 'Caesar dressing', 'Caesar dressing, fat free', 'Caesar dressing, light', 'Caesar salad, with romaine, no dressing', 'Cake batter, raw, chocolate', 'Cake batter, raw, not chocolate', 'Cake made with glutinous rice', 'Cake made with glutinous rice and dried beans', 'Cake or cupcake, Black Forest', 'Cake or cupcake, German chocolate, with icing or filling', 'Cake or cupcake, NS as to type', 'Cake or cupcake, applesauce, with icing or filling', 'Cake or cupcake, applesauce, without icing or filling', 'Cake or cupcake, banana, with icing or filling', 'Cake or cupcake, banana, without icing or filling', 'Cake or cupcake, carrot, with icing or filling', 'Cake or cupcake, carrot, without icing or filling', 'Cake or cupcake, chocolate, devil\'s food or fudge, with icing or filling', 'Cake or cupcake, chocolate, devil\'s food or fudge, without icing or filling', 'Cake or cupcake, coconut, with icing or filling', 'Cake or cupcake, gingerbread', 'Cake or cupcake, lemon, with icing or filling', 'Cake or cupcake, lemon, without icing or filling', 'Cake or cupcake, marble, with icing or filling', 'Cake or cupcake, marble, without icing or filling', 'Cake or cupcake, nut, with icing or filling', 'Cake or cupcake, nut, without icing or filling', 'Cake or cupcake, oatmeal', 'Cake or cupcake, peanut butter', 'Cake or cupcake, pumpkin, with icing or filling', 'Cake or cupcake, pumpkin, without icing or filling', 'Cake or cupcake, raisin-nut', 'Cake or cupcake, spice, with icing or filling', 'Cake or cupcake, spice, without icing or filling', 'Cake or cupcake, white, with icing or filling', 'Cake or cupcake, white, without icing or filling', 'Cake or cupcake, yellow, with icing or filling', 'Cake or cupcake, yellow, without icing or filling', 'Cake or cupcake, zucchini', 'Cake or pancake made with rice flour and/or dried beans', 'Cake, Boston cream pie', 'Cake, Dobos Torte', 'Cake, Quezadilla, El Salvadorian style', 'Cake, Ravani', 'Cake, angel food, with fruit and icing or filling', 'Cake, angel food, with icing or filling', 'Cake, angel food, without icing or filling', 'Cake, carrot, diet', 'Cake, chocolate, with icing, diet', 'Cake, cream, without icing or topping', 'Cake, fruit cake, light or dark, holiday type cake', 'Cake, jelly roll', 'Cake, pineapple, upside down', 'Cake, pound, Puerto Rican style', 'Cake, pound, chocolate', 'Cake, pound, reduced fat, cholesterol free', 'Cake, pound, with icing or filling', 'Cake, pound, without icing or filling', 'Cake, rice flour, without icing or filling', 'Cake, shortcake, biscuit type, with fruit', 'Cake, shortcake, biscuit type, with whipped cream and fruit', 'Cake, shortcake, sponge type, with fruit', 'Cake, shortcake, sponge type, with whipped cream and fruit', 'Cake, shortcake, with whipped topping and fruit, diet', 'Cake, sponge, chocolate', 'Cake, sponge, with icing or filling', 'Cake, sponge, without icing or filling', 'Cake, torte', 'Cake, tres leche', 'Calabaza, cooked', 'Calzone, with cheese, meatless', 'Calzone, with meat and cheese', 'Canadian Club and soda', 'Canadian bacon, cooked', 'Candy, NFS', 'Cannelloni, cheese- and spinach-filled, no sauce', 'Canola oil', 'Cantaloupe nectar', 'Cantaloupe, raw', 'Cape Cod', 'Caramel candy, chocolate covered', 'Caramel dip, light', 'Caramel dip, regular', 'Caramel with nuts and cereal, chocolate covered', 'Caramel with nuts, chocolate covered', 'Caramel, all flavors, sugar free', 'Caramel, chocolate-flavored roll', 'Caramel, flavor other than chocolate', 'Caramel, with nuts', 'Carbonated water, sweetened', 'Carbonated water, sweetened, with low-calorie or no-calorie sweetener', 'Carbonated water, unsweetened', 'Caribou, cooked', 'Carob chips', 'Carp, baked or broiled, fat added', 'Carp, baked or broiled, no added fat', 'Carp, coated, baked or broiled, fat added', 'Carp, coated, baked or broiled, no added fat', 'Carp, coated, fried', 'Carp, cooked, NS as to cooking method', 'Carp, smoked', 'Carp, steamed or poached', 'Carrot juice, 100%', 'Carrot soup, cream of, prepared with milk, home recipe, canned or ready-to-serve', 'Carrot with rice soup, cream of, prepared with milk, home recipe, canned or ready-to-serve', 'Carrots and beef, baby food, strained', 'Carrots and peas, baby food, strained', 'Carrots, NS as to form, cooked', 'Carrots, baby food, NS as to strained or junior', 'Carrots, baby food, junior', 'Carrots, baby food, strained', 'Carrots, baby food, toddler', 'Carrots, canned, cooked with butter or margarine', 'Carrots, canned, cooked with oil', 'Carrots, canned, cooked, fat added, NS as to fat type', 'Carrots, canned, cooked, no added fat', 'Carrots, canned, reduced sodium, cooked with butter or margarine', 'Carrots, canned, reduced sodium, cooked with oil', 'Carrots, canned, reduced sodium, cooked, fat added, NS as to fat type', 'Carrots, canned, reduced sodium, cooked, no added fat', 'Carrots, cooked, as ingredient', 'Carrots, cooked, from restaurant', 'Carrots, fresh, cooked with butter or margarine', 'Carrots, fresh, cooked with oil', 'Carrots, fresh, cooked, fat added, NS as to fat type', 'Carrots, fresh, cooked, no added fat', 'Carrots, frozen, cooked with butter or margarine', 'Carrots, frozen, cooked with oil', 'Carrots, frozen, cooked, fat added, NS as to fat type', 'Carrots, frozen, cooked, no added fat', 'Carrots, glazed, cooked', 'Carrots, raw', 'Carrots, raw, salad', 'Carrots, raw, salad with apples', 'Casabe, cassava bread', 'Cashew butter', 'Cashews, NFS', 'Cashews, honey roasted', 'Cashews, lightly salted', 'Cashews, salted', 'Cashews, unroasted', 'Cashews, unsalted', 'Cassaba melon, raw', 'Cassava Pasteles, Puerto Rican style', 'Cassava fritter stuffed with crab meat, Puerto Rican style', 'Cassava, cooked', 'Catfish, baked or broiled, made with butter', 'Catfish, baked or broiled, made with cooking spray', 'Catfish, baked or broiled, made with margarine', 'Catfish, baked or broiled, made with oil', 'Catfish, baked or broiled, no added fat', 'Catfish, coated, baked or broiled, made with butter', 'Catfish, coated, baked or broiled, made with cooking spray', 'Catfish, coated, baked or broiled, made with margarine', 'Catfish, coated, baked or broiled, made with oil', 'Catfish, coated, baked or broiled, no added fat', 'Catfish, coated, fried, made with butter', 'Catfish, coated, fried, made with cooking spray', 'Catfish, coated, fried, made with margarine', 'Catfish, coated, fried, made with oil', 'Catfish, coated, fried, no added fat', 'Catfish, cooked, NS as to cooking method', 'Catfish, steamed or poached', 'Cauliflower, NS as to form, cooked', 'Cauliflower, cooked, as ingredient', 'Cauliflower, fresh, cooked with butter or margarine', 'Cauliflower, fresh, cooked with oil', 'Cauliflower, fresh, cooked, fat added, NS as to fat type', 'Cauliflower, fresh, cooked, no added fat', 'Cauliflower, frozen, cooked with butter or margarine', 'Cauliflower, frozen, cooked with oil', 'Cauliflower, frozen, cooked, fat added, NS as to fat type', 'Cauliflower, frozen, cooked, no added fat', 'Cauliflower, pickled', 'Cauliflower, raw', 'Celeriac, cooked', 'Celery juice', 'Celery soup, cream of, prepared with milk, home recipe, canned or ready-to-serve', 'Celery soup, cream of, prepared with water, home recipe, canned or ready-to-serve', 'Celery, cooked', 'Celery, pickled', 'Celery, raw', 'Cereal (Barbara\'s Puffins)', 'Cereal (General Mills 25% Less Sugar Cinnamon Toast Crunch)', 'Cereal (General Mills Cheerios Apple Cinnamon)', 'Cereal (General Mills Cheerios Banana Nut)', 'Cereal (General Mills Cheerios Berry Burst)', 'Cereal (General Mills Cheerios Chocolate)', 'Cereal (General Mills Cheerios Frosted)', 'Cereal (General Mills Cheerios Fruity)', 'Cereal (General Mills Cheerios Honey Nut)', 'Cereal (General Mills Cheerios Multigrain)', 'Cereal (General Mills Cheerios Oat Cluster Crunch)', 'Cereal (General Mills Cheerios Protein)', 'Cereal (General Mills Cheerios)', 'Cereal (General Mills Chex Chocolate)', 'Cereal (General Mills Chex Cinnamon)', 'Cereal (General Mills Chex Corn)', 'Cereal (General Mills Chex Honey Nut)', 'Cereal (General Mills Chex Rice)', 'Cereal (General Mills Chex Wheat)', 'Cereal (General Mills Cinnamon Toast Crunch)', 'Cereal (General Mills Cocoa Puffs)', 'Cereal (General Mills Cookie Crisp)', 'Cereal (General Mills Count Chocula)', 'Cereal (General Mills Fiber One Honey Clusters)', 'Cereal (General Mills Fiber One Raisin Bran Clusters)', 'Cereal (General Mills Fiber One)', 'Cereal (General Mills Frankenberry)', 'Cereal (General Mills Golden Grahams)', 'Cereal (General Mills Honey Kix)', 'Cereal (General Mills Honey Nut Clusters)', 'Cereal (General Mills Kix)', 'Cereal (General Mills Lucky Charms Chocolate)', 'Cereal (General Mills Lucky Charms)', 'Cereal (General Mills Oatmeal Crisp with Almonds)', 'Cereal (General Mills Raisin Nut Bran)', 'Cereal (General Mills Reese\'s Puffs)', 'Cereal (General Mills Trix)', 'Cereal (General Mills Wheaties)', 'Cereal (Kashi 7 Whole Grain Puffs)', 'Cereal (Kashi Autumn Wheat)', 'Cereal (Kashi GOLEAN Crunch Honey Almond Flax)', 'Cereal (Kashi GOLEAN Crunch)', 'Cereal (Kashi GOLEAN)', 'Cereal (Kashi Heart to Heart Honey Toasted Oat)', 'Cereal (Kellogg\'s All-Bran Complete Wheat Flakes)', 'Cereal (Kellogg\'s All-Bran)', 'Cereal (Kellogg\'s Apple Jacks)', 'Cereal (Kellogg\'s Cocoa Krispies)', 'Cereal (Kellogg\'s Corn Flakes)', 'Cereal (Kellogg\'s Corn Pops)', 'Cereal (Kellogg\'s Cracklin\' Oat Bran)', 'Cereal (Kellogg\'s Crispix)', 'Cereal (Kellogg\'s Froot Loops Marshmallow)', 'Cereal (Kellogg\'s Froot Loops)', 'Cereal (Kellogg\'s Frosted Flakes)', 'Cereal (Kellogg\'s Frosted Mini-Wheats)', 'Cereal (Kellogg\'s Honey Smacks)', 'Cereal (Kellogg\'s Krave)', 'Cereal (Kellogg\'s Low Fat Granola)', 'Cereal (Kellogg\'s Raisin Bran Crunch)', 'Cereal (Kellogg\'s Raisin Bran)', 'Cereal (Kellogg\'s Rice Krispies Treats Cereal)', 'Cereal (Kellogg\'s Rice Krispies)', 'Cereal (Kellogg\'s Smart Start Strong)', 'Cereal (Kellogg\'s Smorz)', 'Cereal (Kellogg\'s Special K Blueberry)', 'Cereal (Kellogg\'s Special K Chocolatey Delight)', 'Cereal (Kellogg\'s Special K Cinnamon Pecan)', 'Cereal (Kellogg\'s Special K Fruit & Yogurt)', 'Cereal (Kellogg\'s Special K Red Berries)', 'Cereal (Kellogg\'s Special K Vanilla Almond)', 'Cereal (Kellogg\'s Special K)', 'Cereal (Malt-O-Meal Blueberry Muffin Tops)', 'Cereal (Malt-O-Meal Cinnamon Toasters)', 'Cereal (Malt-O-Meal Coco-Roos)', 'Cereal (Malt-O-Meal Cocoa Dyno-Bites)', 'Cereal (Malt-O-Meal Colossal Crunch)', 'Cereal (Malt-O-Meal Corn Bursts)', 'Cereal (Malt-O-Meal Frosted Flakes)', 'Cereal (Malt-O-Meal Fruity Dyno-Bites)', 'Cereal (Malt-O-Meal Golden Puffs)', 'Cereal (Malt-O-Meal Honey Graham Squares)', 'Cereal (Malt-O-Meal Honey Nut Toasty O\'s)', 'Cereal (Malt-O-Meal Marshmallow Mateys)', 'Cereal (Malt-O-Meal Toasted Oat Cereal)', 'Cereal (Malt-O-Meal Tootie Fruities)', 'Cereal (Nature Valley Granola)', 'Cereal (Nature\'s Path Organic Flax Plus)', 'Cereal (Post Alpha-Bits)', 'Cereal (Post Bran Flakes)', 'Cereal (Post Cocoa Pebbles)', 'Cereal (Post Fruity Pebbles)', 'Cereal (Post Golden Crisp)', 'Cereal (Post Grape-Nuts)', 'Cereal (Post Great Grains Banana Nut Crunch)', 'Cereal (Post Great Grains Raisins, Dates, and Pecans)', 'Cereal (Post Great Grains, Cranberry Almond Crunch)', 'Cereal (Post Honey Bunches of Oats Honey Roasted)', 'Cereal (Post Honey Bunches of Oats with Almonds)', 'Cereal (Post Honey Bunches of Oats with Vanilla Bunches)', 'Cereal (Post Honeycomb)', 'Cereal (Post Raisin Bran)', 'Cereal (Post Shredded Wheat Honey Nut)', 'Cereal (Post Shredded Wheat)', 'Cereal (Quaker Cap\'n Crunch\'s Crunchberries)', 'Cereal (Quaker Cap\'n Crunch\'s Peanut Butter Crunch)', 'Cereal (Quaker Cap\'n Crunch)', 'Cereal (Quaker Christmas Crunch)', 'Cereal (Quaker Granola with Oats, Honey, and Raisins)', 'Cereal (Quaker Honey Graham Oh\'s)', 'Cereal (Quaker Life)', 'Cereal (Quaker Oatmeal Squares)', 'Cereal (Quaker Toasted Oat Bran)', 'Cereal (Uncle Sam)', 'Cereal bar with fruit filling, baby food', 'Cereal beverage', 'Cereal beverage with beet roots, from powdered instant', 'Cereal or Granola bar, NFS', 'Cereal or granola bar (General Mills Fiber One Chewy Bar)', 'Cereal or granola bar (General Mills Nature Valley Chewy Trail Mix)', 'Cereal or granola bar (General Mills Nature Valley Crunchy Granola Bar)', 'Cereal or granola bar (General Mills Nature Valley Sweet and Salty Granola Bar)', 'Cereal or granola bar (KIND Fruit and Nut Bar)', 'Cereal or granola bar (Kashi Chewy)', 'Cereal or granola bar (Kashi Crunchy)', 'Cereal or granola bar (Kellogg\'s Nutri-Grain Cereal Bar)', 'Cereal or granola bar (Kellogg\'s Nutri-Grain Fruit and Nut Bar)', 'Cereal or granola bar (Kellogg\'s Nutri-Grain Yogurt Bar)', 'Cereal or granola bar (Kellogg\'s Special K bar)', 'Cereal or granola bar (Quaker Chewy 25% Less Sugar Granola Bar)', 'Cereal or granola bar (Quaker Chewy 90 Calorie Granola Bar)', 'Cereal or granola bar (Quaker Chewy Dipps Granola Bar)', 'Cereal or granola bar (Quaker Chewy Granola Bar)', 'Cereal or granola bar (Quaker Granola Bites)', 'Cereal or granola bar with nuts, chocolate coated', 'Cereal or granola bar, chocolate coated, NFS', 'Cereal or granola bar, coated with non-chocolate coating', 'Cereal or granola bar, fruit and nut', 'Cereal or granola bar, high fiber, coated with non-chocolate yogurt coating', 'Cereal or granola bar, lowfat, NFS', 'Cereal or granola bar, nonfat', 'Cereal or granola bar, oats, nuts, coated with non-chocolate coating', 'Cereal or granola bar, peanuts , oats, sugar, wheat germ', 'Cereal or granola bar, reduced sugar, NFS', 'Cereal or granola bar, with coconut, chocolate coated', 'Cereal or granola bar, with rice cereal', 'Cereal or granola bar, with yogurt coating (General Mills Nature Valley Chewy Granola Bar)', 'Cereal, baby food, jarred, NFS', 'Cereal, bran flakes', 'Cereal, chocolate flavored, frosted, puffed corn', 'Cereal, cooked, NFS', 'Cereal, corn flakes', 'Cereal, corn puffs', 'Cereal, crispy rice', 'Cereal, frosted corn flakes', 'Cereal, frosted oat cereal with marshmallows', 'Cereal, frosted rice', 'Cereal, fruit rings', 'Cereal, granola', 'Cereal, muesli', 'Cereal, nestum', 'Cereal, oat, NFS', 'Cereal, puffed rice', 'Cereal, puffed wheat, plain', 'Cereal, puffed wheat, sweetened', 'Cereal, raisin bran', 'Cereal, ready-to-eat, NFS', 'Cereal, rice flakes', 'Cereal, toasted oat', 'Ceviche', 'Champagne punch', 'Channa Saag', 'Chard, cooked', 'Chard, raw', 'Cheddar cheese soup, home recipe, canned or ready-to-serve', 'Cheese as ingredient in sandwiches', 'Cheese ball', 'Cheese dip', 'Cheese dip with chili pepper', 'Cheese enchilada, frozen meal', 'Cheese flavored corn snacks', 'Cheese flavored corn snacks (Cheetos)', 'Cheese flavored corn snacks, reduced fat', 'Cheese fondue', 'Cheese pastry puffs', 'Cheese quiche, meatless', 'Cheese sandwich, American cheese, on wheat bread, no spread', 'Cheese sandwich, American cheese, on wheat bread, with butter', 'Cheese sandwich, American cheese, on wheat bread, with mayonnaise', 'Cheese sandwich, American cheese, on white bread, no spread', 'Cheese sandwich, American cheese, on white bread, with butter', 'Cheese sandwich, American cheese, on white bread, with mayonnaise', 'Cheese sandwich, American cheese, on whole wheat bread, no spread', 'Cheese sandwich, American cheese, on whole wheat bread, with butter', 'Cheese sandwich, American cheese, on whole wheat bread, with mayonnaise', 'Cheese sandwich, Cheddar cheese, on wheat bread, no spread', 'Cheese sandwich, Cheddar cheese, on wheat bread, with butter', 'Cheese sandwich, Cheddar cheese, on wheat bread, with mayonnaise', 'Cheese sandwich, Cheddar cheese, on white bread, no spread', 'Cheese sandwich, Cheddar cheese, on white bread, with butter', 'Cheese sandwich, Cheddar cheese, on white bread, with mayonnaise', 'Cheese sandwich, Cheddar cheese, on whole wheat bread, no spread', 'Cheese sandwich, Cheddar cheese, on whole wheat bread, with butter', 'Cheese sandwich, Cheddar cheese, on whole wheat bread, with mayonnaise', 'Cheese sandwich, NFS', 'Cheese sandwich, reduced fat American cheese, on wheat bread, no spread', 'Cheese sandwich, reduced fat American cheese, on wheat bread, with butter', 'Cheese sandwich, reduced fat American cheese, on white bread, no spread', 'Cheese sandwich, reduced fat American cheese, on white bread, with butter', 'Cheese sandwich, reduced fat American cheese, on white bread, with mayonnaise', 'Cheese sandwich, reduced fat American cheese, on whole wheat bread, no spread', 'Cheese sandwich, reduced fat American cheese, on whole wheat bread, with butter', 'Cheese sandwich, reduced fat American cheese, on whole wheat bread, with mayonnaise', 'Cheese sandwich, reduced fat American cheese,, on wheat bread, with mayonnaise', 'Cheese sandwich, reduced fat Cheddar cheese, on wheat bread, no spread', 'Cheese sandwich, reduced fat Cheddar cheese, on wheat bread, with butter', 'Cheese sandwich, reduced fat Cheddar cheese, on wheat bread, with mayonnaise', 'Cheese sandwich, reduced fat Cheddar cheese, on white bread, no spread', 'Cheese sandwich, reduced fat Cheddar cheese, on white bread, with butter', 'Cheese sandwich, reduced fat Cheddar cheese, on white bread, with mayonnaise', 'Cheese sandwich, reduced fat Cheddar cheese, on whole wheat bread, no spread', 'Cheese sandwich, reduced fat Cheddar cheese, on whole wheat bread, with butter', 'Cheese sandwich, reduced fat Cheddar cheese, on whole wheat bread, with mayonnaise', 'Cheese sauce', 'Cheese sauce, for use with vegetables', 'Cheese souffle', 'Cheese spread, American or Cheddar cheese base', 'Cheese spread, American or Cheddar cheese base, reduced fat', 'Cheese spread, Swiss cheese base', 'Cheese spread, cream cheese, light', 'Cheese spread, cream cheese, regular', 'Cheese spread, pressurized can', 'Cheese turnover, Puerto Rican style', 'Cheese,  with wine', 'Cheese, American', 'Cheese, American and Swiss blends', 'Cheese, American, nonfat or fat free', 'Cheese, American, reduced fat', 'Cheese, American, reduced sodium', 'Cheese, Blue or Roquefort', 'Cheese, Brick', 'Cheese, Brie', 'Cheese, Camembert', 'Cheese, Cheddar', 'Cheese, Cheddar, nonfat or fat free', 'Cheese, Cheddar, reduced fat', 'Cheese, Cheddar, reduced sodium', 'Cheese, Colby', 'Cheese, Colby Jack', 'Cheese, Feta', 'Cheese, Fontina', 'Cheese, Gouda or Edam', 'Cheese, Gruyere', 'Cheese, Limburger', 'Cheese, Mexican blend', 'Cheese, Mexican blend, reduced fat', 'Cheese, Monterey', 'Cheese, Monterey, reduced fat', 'Cheese, Mozzarella, NFS', 'Cheese, Mozzarella, nonfat or fat free', 'Cheese, Mozzarella, part skim', 'Cheese, Mozzarella, reduced sodium', 'Cheese, Muenster', 'Cheese, Muenster, reduced fat', 'Cheese, NFS', 'Cheese, Parmesan, dry grated', 'Cheese, Parmesan, dry grated, fat free', 'Cheese, Parmesan, dry grated, reduced fat', 'Cheese, Parmesan, hard', 'Cheese, Port du Salut', 'Cheese, Provolone', 'Cheese, Ricotta', 'Cheese, Swiss', 'Cheese, Swiss, nonfat or fat free', 'Cheese, Swiss, reduced fat', 'Cheese, Swiss, reduced sodium', 'Cheese, cottage cheese, with gelatin dessert', 'Cheese, cottage cheese, with gelatin dessert and fruit', 'Cheese, cottage cheese, with gelatin dessert and vegetables', 'Cheese, cottage, NFS', 'Cheese, cottage, creamed, large or small curd', 'Cheese, cottage, dry curd', 'Cheese, cottage, low fat', 'Cheese, cottage, lowfat, lactose reduced', 'Cheese, cottage, lowfat, low sodium', 'Cheese, cottage, lowfat, with fruit', 'Cheese, cottage, salted, dry curd', 'Cheese, cottage, with fruit', 'Cheese, cottage, with vegetables', 'Cheese, goat', 'Cheese, processed cheese food', 'Cheese, processed, with vegetables', 'Cheese, provolone, reduced fat', 'Cheeseburger (Burger King)', 'Cheeseburger (McDonalds)', 'Cheeseburger slider', 'Cheeseburger slider, from fast food', 'Cheeseburger submarine sandwich with lettuce, tomato and spread', 'Cheeseburger, NFS', 'Cheeseburger, from fast food, 1 large patty', 'Cheeseburger, from fast food, 1 medium patty', 'Cheeseburger, from fast food, 1 small patty', 'Cheeseburger, from school cafeteria', 'Cheeseburger, on wheat bun, 1 large patty', 'Cheeseburger, on wheat bun, 1 medium patty', 'Cheeseburger, on wheat bun, 1 small patty', 'Cheeseburger, on white bun, 1 large patty', 'Cheeseburger, on white bun, 1 medium patty', 'Cheeseburger, on white bun, 1 small patty', 'Cheesecake', 'Cheesecake with fruit', 'Cheesecake, chocolate', 'Cherries, canned', 'Cherries, dried', 'Cherries, frozen', 'Cherries, maraschino', 'Cherries, raw', 'Cherry cobbler, baby food, junior', 'Cherry pie filling', 'Cherry vanilla pudding, baby food, strained', 'Chestnuts', 'Chewing gum, NFS', 'Chewing gum, regular', 'Chewing gum, sugar free', 'Chia seeds', 'Chicken \"wings\" with hot sauce, from fast food / restaurant', 'Chicken \"wings\" with hot sauce, from other sources', 'Chicken \"wings\" with hot sauce, from precooked', 'Chicken \"wings\" with other sauces or seasoning, from fast food / restaurant', 'Chicken \"wings\" with other sauces or seasoning, from other sources', 'Chicken \"wings\" with other sauces or seasoning, from precooked', 'Chicken \"wings\", boneless, with hot sauce, from fast food / restaurant', 'Chicken \"wings\", boneless, with hot sauce, from other sources', 'Chicken \"wings\", plain, from fast food / restaurant', 'Chicken \"wings\", plain, from other sources', 'Chicken \"wings\", plain, from precooked', 'Chicken and noodles with vegetable, dessert, frozen meal', 'Chicken and rice dinner, baby food, strained', 'Chicken and vegetable entree with noodles and cream sauce, frozen meal', 'Chicken and vegetable entree with noodles, diet frozen meal', 'Chicken and vegetable entree with noodles, frozen meal', 'Chicken and vegetable entree with rice, diet frozen meal', 'Chicken and vegetables au gratin with rice, diet frozen entree', 'Chicken barbecue sandwich', 'Chicken breast, NS as to cooking method, skin eaten', 'Chicken breast, NS as to cooking method, skin not eaten', 'Chicken breast, baked or broiled, skin eaten, from fast food / restaurant', 'Chicken breast, baked or broiled, skin eaten, from pre-cooked', 'Chicken breast, baked or broiled, skin not eaten, from fast food / restaurant', 'Chicken breast, baked or broiled, skin not eaten, from pre-cooked', 'Chicken breast, baked, broiled, or roasted with marinade, skin eaten, from raw', 'Chicken breast, baked, broiled, or roasted with marinade, skin not eaten, from raw', 'Chicken breast, baked, broiled, or roasted, skin eaten, from raw', 'Chicken breast, baked, broiled, or roasted, skin not eaten, from raw', 'Chicken breast, baked, coated, skin / coating eaten', 'Chicken breast, baked, coated, skin / coating not eaten', 'Chicken breast, fried, coated, prepared skinless, coating eaten, from raw', 'Chicken breast, fried, coated, skin / coating eaten, from fast food / restaurant', 'Chicken breast, fried, coated, skin / coating eaten, from pre-cooked', 'Chicken breast, fried, coated, skin / coating eaten, from raw', 'Chicken breast, fried, coated, skin / coating not eaten, from fast food / restaurant', 'Chicken breast, fried, coated, skin / coating not eaten, from pre-cooked', 'Chicken breast, fried, coated, skin / coating not eaten, from raw', 'Chicken breast, grilled with sauce, skin eaten', 'Chicken breast, grilled with sauce, skin not eaten', 'Chicken breast, grilled without sauce, skin eaten', 'Chicken breast, grilled without sauce, skin not eaten', 'Chicken breast, rotisserie, skin eaten', 'Chicken breast, rotisserie, skin not eaten', 'Chicken breast, sauteed, skin eaten', 'Chicken breast, sauteed, skin not eaten', 'Chicken breast, stewed, skin eaten', 'Chicken breast, stewed, skin not eaten', 'Chicken chow mein with rice, diet frozen meal', 'Chicken cornbread', 'Chicken curry', 'Chicken curry with rice', 'Chicken dinner, NFS, frozen meal', 'Chicken drumstick, NS as to cooking method, skin eaten', 'Chicken drumstick, NS as to cooking method, skin not eaten', 'Chicken drumstick, baked or broiled, skin eaten, from fast food / restaurant', 'Chicken drumstick, baked or broiled, skin eaten, from pre-cooked', 'Chicken drumstick, baked or broiled, skin not eaten, from fast food / restaurant', 'Chicken drumstick, baked or broiled, skin not eaten, from pre-cooked', 'Chicken drumstick, baked, broiled, or roasted, skin eaten, from raw', 'Chicken drumstick, baked, broiled, or roasted, skin not eaten, from raw', 'Chicken drumstick, baked, coated, skin / coating eaten', 'Chicken drumstick, baked, coated, skin / coating not eaten', 'Chicken drumstick, fried, coated, prepared skinless, coating eaten, from raw', 'Chicken drumstick, fried, coated, skin / coating eaten, from fast food / restaurant', 'Chicken drumstick, fried, coated, skin / coating eaten, from pre-cooked', 'Chicken drumstick, fried, coated, skin / coating eaten, from raw', 'Chicken drumstick, fried, coated, skin / coating not eaten, from fast food / restaurant', 'Chicken drumstick, fried, coated, skin / coating not eaten, from pre-cooked', 'Chicken drumstick, fried, coated, skin / coating not eaten, from raw', 'Chicken drumstick, grilled with sauce, skin eaten', 'Chicken drumstick, grilled with sauce, skin not eaten', 'Chicken drumstick, grilled without sauce, skin eaten', 'Chicken drumstick, grilled without sauce, skin not eaten', 'Chicken drumstick, rotisserie, skin eaten', 'Chicken drumstick, rotisserie, skin not eaten', 'Chicken drumstick, sauteed, skin eaten', 'Chicken drumstick, sauteed, skin not eaten', 'Chicken drumstick, stewed, skin eaten', 'Chicken drumstick, stewed, skin not eaten', 'Chicken egg foo yung', 'Chicken feet', 'Chicken fillet biscuit, from fast food', 'Chicken fillet sandwich, NFS', 'Chicken fillet sandwich, NS as to fried or grilled, from fast food', 'Chicken fillet sandwich, fried, from fast food', 'Chicken fillet sandwich, fried, from fast food, with cheese', 'Chicken fillet sandwich, fried, on wheat bun', 'Chicken fillet sandwich, fried, on wheat bun, with cheese', 'Chicken fillet sandwich, fried, on white bun', 'Chicken fillet sandwich, fried, on white bun; with cheese', 'Chicken fillet sandwich, from school cafeteria', 'Chicken fillet sandwich, grilled, from fast food', 'Chicken fillet sandwich, grilled, from fast food, with cheese', 'Chicken fillet sandwich, grilled, on wheat bun', 'Chicken fillet sandwich, grilled, on wheat bun, with cheese', 'Chicken fillet sandwich, grilled, on white bun', 'Chicken fillet sandwich, grilled, on white bun, with cheese', 'Chicken fillet wrap sandwich, fried, from fast food', 'Chicken fillet wrap sandwich, grilled, from fast food', 'Chicken fillet, breaded', 'Chicken fillet, grilled', 'Chicken fricassee, Puerto Rican style', 'Chicken in butter sauce with potatoes and vegetable, diet frozen meal', 'Chicken in cream sauce with noodles and vegetable, frozen meal', 'Chicken in mushroom sauce, white and wild rice, vegetable, frozen meal', 'Chicken in soy-based sauce, rice and vegetables, frozen meal', 'Chicken kiev', 'Chicken leg, drumstick and thigh, NS as to cooking method, skin eaten', 'Chicken leg, drumstick and thigh, NS as to cooking method, skin not eaten', 'Chicken leg, drumstick and thigh, baked or broiled, skin eaten', 'Chicken leg, drumstick and thigh, baked or broiled, skin not eaten', 'Chicken leg, drumstick and thigh, baked, coated, skin / coating eaten', 'Chicken leg, drumstick and thigh, baked, coated, skin / coating not eaten', 'Chicken leg, drumstick and thigh, fried, coated, skin / coating eaten', 'Chicken leg, drumstick and thigh, fried, coated, skin / coating not eaten', 'Chicken leg, drumstick and thigh, grilled with sauce, skin eaten', 'Chicken leg, drumstick and thigh, grilled with sauce, skin not eaten', 'Chicken leg, drumstick and thigh, grilled without sauce, skin eaten', 'Chicken leg, drumstick and thigh, grilled without sauce, skin not eaten', 'Chicken leg, drumstick and thigh, rotisserie, skin eaten', 'Chicken leg, drumstick and thigh, rotisserie, skin not eaten', 'Chicken leg, drumstick and thigh, sauteed, skin eaten', 'Chicken leg, drumstick and thigh, sauteed, skin not eaten', 'Chicken leg, drumstick and thigh, stewed, skin eaten', 'Chicken leg, drumstick and thigh, stewed, skin not eaten', 'Chicken liver, braised', 'Chicken liver, fried', 'Chicken noodle dinner, baby food, NS as to strained or junior', 'Chicken noodle dinner, baby food, junior', 'Chicken noodle dinner, baby food, strained', 'Chicken nuggets, NFS', 'Chicken nuggets, from fast food', 'Chicken nuggets, from frozen', 'Chicken nuggets, from other sources', 'Chicken nuggets, from restaurant', 'Chicken nuggets, from school lunch', 'Chicken or turkey a la king with vegetables excluding carrorts, broccoli, and dark-green leafy; no potatoes, cream, white, or soup-based sauce', 'Chicken or turkey a la king with vegetables including carrots, broccoli, and/or dark-green leafy; no potatoes, cream, white, or soup-based sauce', 'Chicken or turkey and corn hominy soup,  home recipe, Mexican style', 'Chicken or turkey and noodles with cheese sauce', 'Chicken or turkey and noodles with cream or white sauce', 'Chicken or turkey and noodles with gravy', 'Chicken or turkey and noodles with mushroom sauce', 'Chicken or turkey and noodles with soy-based sauce', 'Chicken or turkey and noodles with tomato-based sauce', 'Chicken or turkey and noodles, no sauce', 'Chicken or turkey and potatoes with gravy', 'Chicken or turkey and rice with cream sauce', 'Chicken or turkey and rice with mushroom sauce', 'Chicken or turkey and rice with soy-based sauce', 'Chicken or turkey and rice with tomato-based sauce', 'Chicken or turkey and rice, no sauce', 'Chicken or turkey and vegetables excluding carrots, broccoli, and dark-green leafy; no potatoes, cheese sauce', 'Chicken or turkey and vegetables excluding carrots, broccoli, and dark-green leafy; no potatoes, gravy', 'Chicken or turkey and vegetables excluding carrots, broccoli, and dark-green leafy; no potatoes, no sauce', 'Chicken or turkey and vegetables excluding carrots, broccoli, and dark-green leafy; no potatoes, soy-based sauce', 'Chicken or turkey and vegetables excluding carrots, broccoli, and dark-green leafy; no potatoes, tomato-based sauce', 'Chicken or turkey and vegetables including carrots, broccoli, and/or dark-green leafy; no potatoes, cheese sauce', 'Chicken or turkey and vegetables including carrots, broccoli, and/or dark-green leafy; no potatoes, gravy', 'Chicken or turkey and vegetables including carrots, broccoli, and/or dark-green leafy; no potatoes, no sauce', 'Chicken or turkey and vegetables including carrots, broccoli, and/or dark-green leafy; no potatoes, soy-based sauce', 'Chicken or turkey and vegetables including carrots, broccoli, and/or dark-green leafy; no potatoes, tomato-based sauce', 'Chicken or turkey broth, bouillon, or consomme', 'Chicken or turkey broth, less or reduced sodium, canned or ready-to-serve', 'Chicken or turkey broth, with tomato, home recipe', 'Chicken or turkey broth, without tomato, home recipe', 'Chicken or turkey cacciatore', 'Chicken or turkey caesar garden salad, chicken and/or turkey, lettuce, tomato, cheese, no dressing', 'Chicken or turkey cake, patty, or croquette', 'Chicken or turkey chow mein or chop suey with noodles', 'Chicken or turkey chow mein or chop suey, no noodles', 'Chicken or turkey cordon bleu', 'Chicken or turkey corn soup with noodles, home recipe', 'Chicken or turkey creole, without rice', 'Chicken or turkey divan', 'Chicken or turkey fricassee', 'Chicken or turkey fricassee, no sauce, no potatoes, Puerto Rican style', 'Chicken or turkey fricassee, with sauce, no potatoes, potatoes reported separately, Puerto Rican style', 'Chicken or turkey garden salad with bacon and cheese, chicken and/or turkey, bacon, cheese, lettuce and/or greens, tomato and/or carrots, other vegetables, no dressing', 'Chicken or turkey garden salad with cheese, chicken and/or turkey, cheese, lettuce and/or greens, tomato and/or carrots, other vegetables, no dressing', 'Chicken or turkey garden salad, chicken and/or turkey, other vegetables excluding tomato and carrots, no dressing', 'Chicken or turkey garden salad, chicken and/or turkey, tomato and/or carrots, other vegetables, no dressing', 'Chicken or turkey gumbo soup, home recipe, canned or ready-to-serve', 'Chicken or turkey hash', 'Chicken or turkey mushroom soup, cream of, prepared with milk', 'Chicken or turkey noodle soup, canned or ready-to-serve', 'Chicken or turkey noodle soup, chunky style, canned or ready-to-serve', 'Chicken or turkey noodle soup, cream of, home recipe, canned, or ready-to-serve', 'Chicken or turkey noodle soup, home recipe', 'Chicken or turkey noodle soup, reduced sodium, canned or ready-to-serve', 'Chicken or turkey parmigiana', 'Chicken or turkey pot pie', 'Chicken or turkey rice soup, canned, or ready-to-serve', 'Chicken or turkey rice soup, home recipe', 'Chicken or turkey rice soup, reduced sodium, canned, prepared with milk', 'Chicken or turkey rice soup, reduced sodium, canned, prepared with water or ready-to-serve', 'Chicken or turkey salad with egg', 'Chicken or turkey salad with nuts and/or fruits', 'Chicken or turkey salad, made with Italian dressing', 'Chicken or turkey salad, made with any type of fat free dressing', 'Chicken or turkey salad, made with creamy dressing', 'Chicken or turkey salad, made with light Italian dressing', 'Chicken or turkey salad, made with light creamy dressing', 'Chicken or turkey salad, made with light mayonnaise', 'Chicken or turkey salad, made with light mayonnaise-type salad dressing', 'Chicken or turkey salad, made with mayonnaise', 'Chicken or turkey salad, made with mayonnaise-type salad dressing', 'Chicken or turkey shish kabob with vegetables, excluding potatoes', 'Chicken or turkey souffle', 'Chicken or turkey soup with dumplings and potatoes, home recipe, canned, or ready-to-serve', 'Chicken or turkey soup with dumplings, home recipe, canned or ready-to-serve', 'Chicken or turkey soup with vegetables and fruit, Asian Style', 'Chicken or turkey soup with vegetables, broccoli, carrots, celery, potatoes and onions, Asian style', 'Chicken or turkey soup, cream of, NS as to prepared with milk or water', 'Chicken or turkey soup, cream of, canned, reduced sodium, NS as to made with milk or water', 'Chicken or turkey soup, cream of, canned, reduced sodium, made with milk', 'Chicken or turkey soup, cream of, canned, reduced sodium, made with water', 'Chicken or turkey soup, cream of, prepared with milk', 'Chicken or turkey soup, cream of, prepared with water', 'Chicken or turkey stew with potatoes and vegetables excluding carrots, broccoli, and dark-green leafy; gravy', 'Chicken or turkey stew with potatoes and vegetables excluding carrots, broccoli, and dark-green leafy; tomato- based sauce', 'Chicken or turkey stew with potatoes and vegetables including carrots, broccoli, and/or dark-green leafy; gravy', 'Chicken or turkey stew with potatoes and vegetables including carrots, broccoli, and/or dark-green leafy; tomato-based sauce', 'Chicken or turkey tetrazzini', 'Chicken or turkey vegetable soup with noodles, stew type, chunky style, canned or ready-to-serve', 'Chicken or turkey vegetable soup with potato and cheese, chunky style, canned or ready-to-serve', 'Chicken or turkey vegetable soup with rice, home recipe, Mexican style', 'Chicken or turkey vegetable soup with rice, stew type, chunky style', 'Chicken or turkey vegetable soup, canned, prepared with water or ready-to-serve', 'Chicken or turkey vegetable soup, home recipe', 'Chicken or turkey vegetable soup, stew type', 'Chicken or turkey with cheese sauce', 'Chicken or turkey with cream sauce', 'Chicken or turkey with dumplings', 'Chicken or turkey with mushroom sauce', 'Chicken or turkey with stuffing', 'Chicken or turkey with teriyaki', 'Chicken or turkey, breaded, fried, caesar garden salad, chicken and/or turkey, lettuce, tomatoes, cheese, no dressing', 'Chicken or turkey, breaded, fried, garden salad with bacon and cheese, chicken and/or turkey, bacon, cheese, lettuce and/or greens, tomato and/or carrots, other vegetables, no dressing', 'Chicken or turkey, breaded, fried, garden salad with cheese, chicken and/or turkey, cheese, lettuce and/or greens, tomato and/or carrots, other vegetables, no dressing', 'Chicken or turkey, dumplings, and vegetables excluding carrots, broccoli, and dark green leafy; gravy', 'Chicken or turkey, dumplings, and vegetables including carrots, broccoli, and/or dark green leafy; gravy', 'Chicken or turkey, noodles, and vegetables excluding carrots, broccoli, and dark-green leafy; cheese sauce', 'Chicken or turkey, noodles, and vegetables excluding carrots, broccoli, and dark-green leafy; gravy', 'Chicken or turkey, noodles, and vegetables excluding carrots, broccoli, and dark-green leafy; no sauce', 'Chicken or turkey, noodles, and vegetables excluding carrots, broccoli, and dark-green leafy; tomato-based sauce', 'Chicken or turkey, noodles, and vegetables excluding carrots, broccoli, and/or dark-green leafy; cream sauce, white sauce, or mushroom sauce', 'Chicken or turkey, noodles, and vegetables including carrots, broccoli, and/or dark-green leafy; cheese sauce', 'Chicken or turkey, noodles, and vegetables including carrots, broccoli, and/or dark-green leafy; cream sauce, white sauce, or mushroom sauce', 'Chicken or turkey, noodles, and vegetables including carrots, broccoli, and/or dark-green leafy; gravy', 'Chicken or turkey, noodles, and vegetables including carrots, broccoli, and/or dark-green leafy; no sauce', 'Chicken or turkey, noodles, and vegetables including carrots, broccoli, and/or dark-green leafy; tomato-based sauce', 'Chicken or turkey, potatoes, and vegetables excluding carrots, broccoli, and dark-green leafy; cheese sauce', 'Chicken or turkey, potatoes, and vegetables excluding carrots, broccoli, and dark-green leafy; cream sauce, white sauce, or mushroom sauce', 'Chicken or turkey, potatoes, and vegetables excluding carrots, broccoli, and dark-green leafy; gravy', 'Chicken or turkey, potatoes, and vegetables excluding carrots, broccoli, and dark-green leafy; no sauce', 'Chicken or turkey, potatoes, and vegetables excluding carrots, broccoli, and dark-green leafy; tomato-based sauce', 'Chicken or turkey, potatoes, and vegetables including carrots, broccoli, and/or dark-green leafy; cheese sauce', 'Chicken or turkey, potatoes, and vegetables including carrots, broccoli, and/or dark-green leafy; cream sauce, white sauce, or mushroom sauce', 'Chicken or turkey, potatoes, and vegetables including carrots, broccoli, and/or dark-green leafy; gravy', 'Chicken or turkey, potatoes, and vegetables including carrots, broccoli, and/or dark-green leafy; no sauce', 'Chicken or turkey, potatoes, and vegetables including carrots, broccoli, and/or dark-green leafy; tomato-based sauce', 'Chicken or turkey, potatoes, corn, and cheese, with gravy', 'Chicken or turkey, rice, and vegetables excluding carrots, broccoli, and dark-green leafy; cheese sauce', 'Chicken or turkey, rice, and vegetables excluding carrots, broccoli, and dark-green leafy; cream sauce, white sauce, or mushroom sauce', 'Chicken or turkey, rice, and vegetables excluding carrots, broccoli, and dark-green leafy; gravy', 'Chicken or turkey, rice, and vegetables excluding carrots, broccoli, and dark-green leafy; no sauce', 'Chicken or turkey, rice, and vegetables excluding carrots, broccoli, and dark-green leafy; soy-based sauce', 'Chicken or turkey, rice, and vegetables excluding carrots, broccoli, and dark-green leafy; tomato-based sauce', 'Chicken or turkey, rice, and vegetables including carrots, broccoli, and/or dark-green leafy; cheese sauce', 'Chicken or turkey, rice, and vegetables including carrots, broccoli, and/or dark-green leafy; cream sauce, white sauce, or mushroom sauce', 'Chicken or turkey, rice, and vegetables including carrots, broccoli, and/or dark-green leafy; gravy', 'Chicken or turkey, rice, and vegetables including carrots, broccoli, and/or dark-green leafy; no sauce', 'Chicken or turkey, rice, and vegetables including carrots, broccoli, and/or dark-green leafy; soy-based sauce', 'Chicken or turkey, rice, and vegetables including carrots, broccoli, and/or dark-green leafy; tomato-based sauce', 'Chicken or turkey, rice, corn, and cheese, with gravy', 'Chicken or turkey, stuffing, and vegetables excluding carrots, broccoli, and dark-green leafy; gravy', 'Chicken or turkey, stuffing, and vegetables including carrots, broccoli, and/or dark-green leafy; gravy', 'Chicken or turkey, stuffing, and vegetables including carrots, broccoli, and/or dark-green leafy; no sauce', 'Chicken or turkey,stuffing, and vegetables excluding carrots, broccoli, and dark green leafy; no sauce', 'Chicken patty or nuggets, boneless, breaded, with pasta and tomato sauce, fruit, dessert, frozen meal', 'Chicken patty, breaded', 'Chicken patty, or nuggets, boneless, breaded, potatoes, vegetable, frozen meal', 'Chicken rice soup, Puerto Rican style', 'Chicken salad or chicken spread sandwich', 'Chicken salad spread', 'Chicken skin', 'Chicken soup with noodles and potatoes, Puerto Rican style', 'Chicken soup, baby food', 'Chicken stew, baby food, toddler', 'Chicken stick, baby food', 'Chicken submarine sandwich, with cheese, lettuce, tomato and spread', 'Chicken submarine sandwich, with lettuce, tomato and spread', 'Chicken tenders or strips, NFS', 'Chicken tenders or strips, breaded, from fast food', 'Chicken tenders or strips, breaded, from frozen', 'Chicken tenders or strips, breaded, from other sources', 'Chicken tenders or strips, breaded, from restaurant', 'Chicken tenders or strips, breaded, from school lunch', 'Chicken thigh, NS as to cooking method, skin eaten', 'Chicken thigh, NS as to cooking method, skin not eaten', 'Chicken thigh, baked or broiled, skin eaten, from fast food / restaurant', 'Chicken thigh, baked or broiled, skin eaten, from pre-cooked', 'Chicken thigh, baked or broiled, skin not eaten, from fast food / restaurant', 'Chicken thigh, baked or broiled, skin not eaten, from pre-cooked', 'Chicken thigh, baked, broiled, or roasted, skin eaten, from raw', 'Chicken thigh, baked, broiled, or roasted, skin not eaten, from raw', 'Chicken thigh, baked, coated, skin / coating eaten', 'Chicken thigh, baked, coated, skin / coating not eaten', 'Chicken thigh, fried, coated, prepared skinless, coating eaten, from raw', 'Chicken thigh, fried, coated, skin / coating eaten, from fast food', 'Chicken thigh, fried, coated, skin / coating eaten, from pre-cooked', 'Chicken thigh, fried, coated, skin / coating eaten, from raw', 'Chicken thigh, fried, coated, skin / coating eaten, from restaurant', 'Chicken thigh, fried, coated, skin / coating not eaten, from fast food', 'Chicken thigh, fried, coated, skin / coating not eaten, from pre-cooked', 'Chicken thigh, fried, coated, skin / coating not eaten, from raw', 'Chicken thigh, fried, coated, skin / coating not eaten, from restaurant', 'Chicken thigh, grilled with sauce, skin eaten', 'Chicken thigh, grilled with sauce, skin not eaten', 'Chicken thigh, grilled without sauce, skin eaten', 'Chicken thigh, grilled without sauce, skin not eaten', 'Chicken thigh, rotisserie, skin eaten', 'Chicken thigh, rotisserie, skin not eaten', 'Chicken thigh, sauteed, skin eaten', 'Chicken thigh, sauteed, skin not eaten', 'Chicken thigh, stewed, skin eaten', 'Chicken thigh, stewed, skin not eaten', 'Chicken wing, NS as to cooking method', 'Chicken wing, baked or broiled, from fast food / restaurant', 'Chicken wing, baked or broiled, from pre-cooked', 'Chicken wing, baked, broiled, or roasted, from raw', 'Chicken wing, baked, coated', 'Chicken wing, fried, coated, from fast food', 'Chicken wing, fried, coated, from pre-cooked', 'Chicken wing, fried, coated, from raw', 'Chicken wing, fried, coated, from restaurant', 'Chicken wing, grilled with sauce', 'Chicken wing, grilled without sauce', 'Chicken wing, rotisserie', 'Chicken wing, sauteed', 'Chicken wing, stewed', 'Chicken with gravy', 'Chicken with mole sauce', 'Chicken with noodles and cheese sauce, diet frozen meal', 'Chicken with rice and vegetable, diet frozen meal', 'Chicken, NS as to part and cooking method, NS as to skin eaten', 'Chicken, NS as to part and cooking method, skin eaten', 'Chicken, NS as to part and cooking method, skin not eaten', 'Chicken, NS as to part, baked, broiled, or roasted, NS as to skin eaten', 'Chicken, NS as to part, baked, broiled, or roasted, skin eaten', 'Chicken, NS as to part, baked, broiled, or roasted, skin not eaten', 'Chicken, NS as to part, baked, coated, skin / coating eaten', 'Chicken, NS as to part, baked, coated, skin / coating not eaten', 'Chicken, NS as to part, fried, coated, skin / coating eaten', 'Chicken, NS as to part, fried, coated, skin / coating not eaten', 'Chicken, NS as to part, grilled with sauce, NS as to skin eaten', 'Chicken, NS as to part, grilled with sauce, skin eaten', 'Chicken, NS as to part, grilled with sauce, skin not eaten', 'Chicken, NS as to part, grilled without sauce, NS as to skin eaten', 'Chicken, NS as to part, grilled without sauce, skin eaten', 'Chicken, NS as to part, grilled without sauce, skin not eaten', 'Chicken, NS as to part, rotisserie, NS as to skin eaten', 'Chicken, NS as to part, rotisserie, skin eaten', 'Chicken, NS as to part, rotisserie, skin not eaten', 'Chicken, NS as to part, sauteed, skin eaten', 'Chicken, NS as to part, sauteed, skin not eaten', 'Chicken, NS as to part, stewed, NS as to skin eaten', 'Chicken, NS as to part, stewed, skin eaten', 'Chicken, NS as to part, stewed, skin not eaten', 'Chicken, baby food, NS as to strained or junior', 'Chicken, baby food, junior', 'Chicken, baby food, strained', 'Chicken, back', 'Chicken, bacon, and tomato club sandwich, with lettuce and spread', 'Chicken, canned, meat only', 'Chicken, chicken roll, roasted', 'Chicken, for use with vegetables', 'Chicken, fried, with potatoes, vegetable, dessert, frozen meal', 'Chicken, fried, with potatoes, vegetable, dessert, frozen meal, large meat portion', 'Chicken, fried, with potatoes, vegetable, frozen meal', 'Chicken, ground', 'Chicken, meatless, NFS', 'Chicken, meatless, breaded, fried', 'Chicken, neck or ribs', 'Chicken, noodles, and vegetables, baby food, toddler', 'Chicken, prepackaged or deli, luncheon meat', 'Chicken, prepackaged or deli, luncheon meat, reduced sodium', 'Chicken, shredded or pulled, with barbecue sauce', 'Chicken, tail', 'Chickpeas, NFS', 'Chickpeas, from canned, fat added', 'Chickpeas, from canned, no added fat', 'Chickpeas, from canned, reduced sodium', 'Chickpeas, from dried, fat added', 'Chickpeas, from dried, no added fat', 'Chicory beverage', 'Chilaquiles, tortilla casserole with salsa and cheese, no egg', 'Chilaquiles, tortilla casserole with salsa, cheese, and egg', 'Chiles rellenos, cheese-filled', 'Chiles rellenos, filled with meat and cheese', 'Chili con carne with beans', 'Chili con carne with beans and cheese', 'Chili con carne with beans and macaroni', 'Chili con carne with beans and rice', 'Chili con carne with beans, canned', 'Chili con carne with beans, from restaurant', 'Chili con carne with beans, home recipe', 'Chili con carne with beans, made with pork', 'Chili con carne with chicken or turkey and beans', 'Chili con carne with venison/deer and beans', 'Chili con carne without beans', 'Chili con carne, NS as to beans', 'Chili con carne, NS as to beans, with cheese', 'Chili with beans, without meat', 'Chiliburger, with or without cheese, on bun', 'Chimichanga with chicken ', 'Chimichanga with chicken and sour cream', 'Chimichanga with meat', 'Chimichanga with meat and sour cream', 'Chimichanga, meatless', 'Chimichanga, meatless, with sour cream', 'Chinese pancake', 'Chipotle dip, light', 'Chipotle dip, regular', 'Chipotle dip, yogurt based', 'Chips, rice', 'Chitterlings, cooked', 'Chives, raw', 'Chocolate beverage powder, dry mix, not reconstituted ', 'Chocolate beverage powder, light, dry mix, not reconstituted', 'Chocolate candy with fondant and caramel', 'Chocolate dip', 'Chocolate milk drink', 'Chocolate milk, NFS', 'Chocolate milk, made from dry mix with fat free milk', 'Chocolate milk, made from dry mix with fat free milk (Nesquik)', 'Chocolate milk, made from dry mix with low fat milk', 'Chocolate milk, made from dry mix with low fat milk (Nesquik)', 'Chocolate milk, made from dry mix with non-dairy milk', 'Chocolate milk, made from dry mix with non-dairy milk (Nesquik)', 'Chocolate milk, made from dry mix with reduced fat milk', 'Chocolate milk, made from dry mix with reduced fat milk (Nesquik)', 'Chocolate milk, made from dry mix with whole milk', 'Chocolate milk, made from dry mix with whole milk (Nesquik)', 'Chocolate milk, made from dry mix, NS as to type of milk', 'Chocolate milk, made from dry mix, NS as to type of milk (Nesquik)', 'Chocolate milk, made from light syrup with fat free milk', 'Chocolate milk, made from light syrup with low fat milk', 'Chocolate milk, made from light syrup with non-dairy milk', 'Chocolate milk, made from light syrup with reduced fat milk', 'Chocolate milk, made from light syrup with whole milk', 'Chocolate milk, made from light syrup, NS as to type of milk', 'Chocolate milk, made from no sugar added dry mix with fat free milk  (Nesquik)', 'Chocolate milk, made from no sugar added dry mix with low fat milk (Nesquik)', 'Chocolate milk, made from no sugar added dry mix with non-dairy milk (Nesquik)', 'Chocolate milk, made from no sugar added dry mix with reduced fat milk (Nesquik)', 'Chocolate milk, made from no sugar added dry mix with whole milk (Nesquik)', 'Chocolate milk, made from no sugar added dry mix, NS as to type of milk (Nesquik)', 'Chocolate milk, made from reduced sugar mix with fat free milk', 'Chocolate milk, made from reduced sugar mix with low fat milk', 'Chocolate milk, made from reduced sugar mix with non-dairy milk', 'Chocolate milk, made from reduced sugar mix with reduced fat milk', 'Chocolate milk, made from reduced sugar mix with whole milk', 'Chocolate milk, made from reduced sugar mix, NS as to type of milk', 'Chocolate milk, made from sugar free syrup with fat free milk', 'Chocolate milk, made from sugar free syrup with low fat milk', 'Chocolate milk, made from sugar free syrup with non-dairy milk', 'Chocolate milk, made from sugar free syrup with reduced fat milk', 'Chocolate milk, made from sugar free syrup with whole milk', 'Chocolate milk, made from sugar free syrup, NS as to type of milk ', 'Chocolate milk, made from syrup with fat free milk', 'Chocolate milk, made from syrup with low fat milk', 'Chocolate milk, made from syrup with non-dairy milk', 'Chocolate milk, made from syrup with reduced fat milk', 'Chocolate milk, made from syrup with whole milk', 'Chocolate milk, made from syrup, NS as to type of milk', 'Chocolate milk, ready to drink, fat free', 'Chocolate milk, ready to drink, fat free (Nesquik)', 'Chocolate milk, ready to drink, low fat', 'Chocolate milk, ready to drink, low fat (Nesquik)', 'Chocolate milk, ready to drink, low fat, no sugar added (Nesquik)', 'Chocolate milk, ready to drink, reduced fat', 'Chocolate milk, ready to drink, reduced sugar, NS as to milk', 'Chocolate milk, ready to drink, whole', 'Chocolate syrup', 'Chocolate syrup, light', 'Chocolate, milk, with nuts, not almond or peanuts', 'Chocolate, milk, with peanuts', 'Chocolate, semi-sweet morsel', 'Chocolate, sweet or dark', 'Chocolate, sweet or dark, with almonds', 'Chocolate, white', 'Chocolate, white, with almonds', 'Chocolate, white, with cereal', 'Chocolate-flavored sprinkles', 'Chorizo', 'Chow fun noodles with meat and vegetables', 'Chow fun noodles with vegetables, meatless', 'Chow mein or chop suey, NS as to type of meat, no noodles', 'Chow mein or chop suey, NS as to type of meat, with noodles', 'Chow mein or chop suey, meatless, no noodles', 'Chow mein or chop suey, meatless, with noodles', 'Chow mein or chop suey, various types of meat, with noodles', 'Christophine, cooked', 'Churros', 'Chutney', 'Cilantro, raw', 'Clam cake or patty', 'Clam chowder, Manhattan', 'Clam chowder, NS as to Manhattan or New England style', 'Clam chowder, New England, NS as to prepared with water or milk', 'Clam chowder, New England, prepared with milk', 'Clam chowder, New England, prepared with water', 'Clam chowder, New England, reduced sodium, canned or ready-to-serve', 'Clams Casino', 'Clams, baked or broiled, fat added', 'Clams, baked or broiled, no added fat', 'Clams, canned', 'Clams, coated, baked or broiled, fat added', 'Clams, coated, baked or broiled, no added fat', 'Clams, coated, fried', 'Clams, cooked, NS as to cooking method', 'Clams, raw', 'Clams, smoked, in oil', 'Clams, steamed or boiled', 'Clams, stuffed', 'Classic mixed vegetables, NS as to form, cooked', 'Classic mixed vegetables, canned, cooked with butter or margarine', 'Classic mixed vegetables, canned, cooked with oil', 'Classic mixed vegetables, canned, cooked, fat added, NS as to fat type', 'Classic mixed vegetables, canned, cooked, no added fat', 'Classic mixed vegetables, canned, reduced sodium, cooked with butter or margarine', 'Classic mixed vegetables, canned, reduced sodium, cooked with oil', 'Classic mixed vegetables, canned, reduced sodium, cooked, fat added, NS as to fat type', 'Classic mixed vegetables, canned, reduced sodium, cooked, no added fat', 'Classic mixed vegetables, cooked, from restaurant', 'Classic mixed vegetables, frozen, cooked with butter or margarine', 'Classic mixed vegetables, frozen, cooked with oil', 'Classic mixed vegetables, frozen, cooked, fat added, NS as to fat type', 'Classic mixed vegetables, frozen, cooked, no added fat', 'Clementine, raw', 'Cobb salad, no dressing', 'Cobbler, apple', 'Cobbler, apricot', 'Cobbler, berry', 'Cobbler, cherry', 'Cobbler, peach', 'Cobbler, pear', 'Cobbler, plum', 'Cobbler, rhubarb', 'Cocktail sauce', 'Cocktail, NFS', 'Cocoa powder, not reconstituted', 'Coconut candy, Puerto Rican style', 'Coconut candy, chocolate covered', 'Coconut candy, no chocolate covering', 'Coconut cream cake, Puerto Rican style', 'Coconut cream, canned, sweetened', 'Coconut milk', 'Coconut milk, used in cooking', 'Coconut oil', 'Coconut water, sweetened', 'Coconut water, unsweetened', 'Coconut, fresh', 'Coconut, packaged', 'Cod, baked or broiled, made with butter', 'Cod, baked or broiled, made with cooking spray', 'Cod, baked or broiled, made with margarine', 'Cod, baked or broiled, made with oil', 'Cod, baked or broiled, no added fat', 'Cod, coated, baked or broiled, made with butter', 'Cod, coated, baked or broiled, made with cooking spray', 'Cod, coated, baked or broiled, made with margarine', 'Cod, coated, baked or broiled, made with oil', 'Cod, coated, baked or broiled, no added fat', 'Cod, coated, fried, made with butter', 'Cod, coated, fried, made with cooking spray', 'Cod, coated, fried, made with margarine', 'Cod, coated, fried, made with oil', 'Cod, coated, fried, no added fat', 'Cod, cooked, NS as to cooking method', 'Cod, dried, salted', 'Cod, dried, salted, salt removed in water', 'Cod, smoked', 'Cod, steamed or poached', 'Codfish ball or cake', 'Codfish fritter, Puerto Rican style', 'Codfish salad, Puerto Rican style, Serenata', 'Codfish soup with noodles, Puerto Rican style', 'Codfish with starchy vegetables, Puerto Rican style', 'Codfish, rice, and vegetable soup, Puerto Rican style', 'Coffee and chicory, brewed', 'Coffee and chicory, brewed, decaffeinated', 'Coffee cake, crumb or quick-bread type', 'Coffee cake, crumb or quick-bread type, cheese-filled', 'Coffee cake, crumb or quick-bread type, with fruit', 'Coffee cake, yeast type', 'Coffee creamer, NFS', 'Coffee creamer, liquid', 'Coffee creamer, liquid, fat free', 'Coffee creamer, liquid, fat free, flavored', 'Coffee creamer, liquid, fat free, sugar free, flavored', 'Coffee creamer, liquid, flavored', 'Coffee creamer, liquid, sugar free, flavored', 'Coffee creamer, powder', 'Coffee creamer, powder, fat free', 'Coffee creamer, powder, flavored', 'Coffee creamer, soy, liquid', 'Coffee creamer,powder, fat free, flavored', 'Coffee creamer,powder, sugar free, flavored', 'Coffee substitute', 'Coffee substitute, dry powder', 'Coffee, Cafe Mocha ', 'Coffee, Cafe Mocha, decaffeinated', 'Coffee, Cafe Mocha, decaffeinated, nonfat', 'Coffee, Cafe Mocha, decaffeinated, with non-dairy milk', 'Coffee, Cafe Mocha, nonfat', 'Coffee, Cafe Mocha, with non-dairy milk', 'Coffee, Cappuccino', 'Coffee, Cappuccino, decaffeinated', 'Coffee, Cappuccino, decaffeinated, nonfat', 'Coffee, Cappuccino, decaffeinated, with non-dairy milk', 'Coffee, Cappuccino, nonfat', 'Coffee, Cappuccino, with non-dairy milk', 'Coffee, Cuban', 'Coffee, Iced Cafe Mocha', 'Coffee, Iced Cafe Mocha, decaffeinated', 'Coffee, Iced Cafe Mocha, decaffeinated, nonfat', 'Coffee, Iced Cafe Mocha, decaffeinated, with non-dairy milk', 'Coffee, Iced Cafe Mocha, nonfat', 'Coffee, Iced Cafe Mocha, with non-dairy milk', 'Coffee, Iced Latte', 'Coffee, Iced Latte, decaffeinated', 'Coffee, Iced Latte, decaffeinated, flavored', 'Coffee, Iced Latte, decaffeinated, nonfat', 'Coffee, Iced Latte, decaffeinated, nonfat, flavored', 'Coffee, Iced Latte, decaffeinated, with non-dairy milk', 'Coffee, Iced Latte, decaffeinated, with non-dairy milk, flavored', 'Coffee, Iced Latte, flavored', 'Coffee, Iced Latte, nonfat', 'Coffee, Iced Latte, nonfat, flavored', 'Coffee, Iced Latte, with non-dairy milk', 'Coffee, Iced Latte, with non-dairy milk, flavored', 'Coffee, Latte', 'Coffee, Latte, decaffeinated', 'Coffee, Latte, decaffeinated, flavored', 'Coffee, Latte, decaffeinated, nonfat', 'Coffee, Latte, decaffeinated, nonfat, flavored', 'Coffee, Latte, decaffeinated, with non-dairy milk', 'Coffee, Latte, decaffeinated, with non-dairy milk, flavored', 'Coffee, Latte, flavored', 'Coffee, Latte, nonfat', 'Coffee, Latte, nonfat, flavored', 'Coffee, Latte, with non-dairy milk', 'Coffee, Latte, with non-dairy milk, flavored', 'Coffee, NS as to brewed or instant', 'Coffee, NS as to brewed or instant, decaffeinated', 'Coffee, NS as to type', 'Coffee, Turkish', 'Coffee, bottled/canned', 'Coffee, bottled/canned, light', 'Coffee, brewed', 'Coffee, brewed, blend of regular and decaffeinated ', 'Coffee, brewed, decaffeinated', 'Coffee, brewed, flavored', 'Coffee, cafe con leche', 'Coffee, cafe con leche, decaffeinated ', 'Coffee, decaffeinated, pre-lightened', 'Coffee, decaffeinated, pre-lightened and pre-sweetened with low calorie sweetener', 'Coffee, decaffeinated, pre-lightened and pre-sweetened with sugar', 'Coffee, decaffeinated, pre-sweetened with low calorie sweetener', 'Coffee, decaffeinated, pre-sweetened with sugar', 'Coffee, espresso', 'Coffee, espresso, decaffeinated', 'Coffee, instant, 50% less caffeine, not reconstituted', 'Coffee, instant, 50% less caffeine, reconstituted ', 'Coffee, instant, decaffeinated, not reconstituted ', 'Coffee, instant, decaffeinated, pre-lightened and pre-sweetened with low calorie sweetener, not reconstituted', 'Coffee, instant, decaffeinated, pre-lightened and pre-sweetened with low calorie sweetener, reconstituted ', 'Coffee, instant, decaffeinated, pre-lightened and pre-sweetened with sugar, not reconstituted', 'Coffee, instant, decaffeinated, pre-lightened and pre-sweetened with sugar, reconsitituted ', 'Coffee, instant, decaffeinated, reconstituted', 'Coffee, instant, not reconstituted ', 'Coffee, instant, pre-lightened and pre-sweetened with low calorie sweetener, not reconstituted', 'Coffee, instant, pre-lightened and pre-sweetened with low calorie sweetener, reconstituted', 'Coffee, instant, pre-lightened and pre-sweetened with sugar, not reconstituted', 'Coffee, instant, pre-lightened and pre-sweetened with sugar, reconstituted', 'Coffee, instant, pre-sweetened with sugar, not reconstituted', 'Coffee, instant, pre-sweetened with sugar, reconstituted ', 'Coffee, instant, reconstituted', 'Coffee, macchiato ', 'Coffee, macchiato, sweetened', 'Coffee, mocha, instant, decaffeinated, pre-lightened and pre-sweetend with low calorie sweetener, not reconstituted', 'Coffee, mocha, instant, decaffeinated, pre-lightened and pre-sweetened with low calorie sweetener, reconstituted', 'Coffee, mocha, instant, pre-lightened and pre-sweetened with low calorie sweetener, not reconstituted', 'Coffee, mocha, instant, pre-lightened and pre-sweetened with low calorie sweetener, reconstituted', 'Coffee, mocha, instant, pre-lightened and pre-sweetened with sugar, not reconstituted', 'Coffee, mocha, instant, pre-lightened and pre-sweetened with sugar, reconstituted ', 'Coffee, pre-lightened', 'Coffee, pre-lightened and pre-sweetened with low calorie sweetener', 'Coffee, pre-lightened and pre-sweetened with sugar', 'Coffee, pre-sweetened with low calorie sweetener', 'Coffee, pre-sweetened with sugar', 'Cold cut sumarine sandwich, with cheese, lettuce, tomato and spread', 'Coleslaw dressing', 'Coleslaw dressing, light', 'Collards, NS as to form, cooked', 'Collards, canned, cooked with butter or margarine', 'Collards, canned, cooked with oil', 'Collards, canned, cooked, fat added, NS as to fat type', 'Collards, canned, cooked, no added fat', 'Collards, fresh, cooked with butter or margarine', 'Collards, fresh, cooked with oil', 'Collards, fresh, cooked, fat added, NS as to fat type', 'Collards, fresh, cooked, no added fat', 'Collards, frozen, cooked with butter or margarine', 'Collards, frozen, cooked with oil', 'Collards, frozen, cooked, fat added, NS as to fat type', 'Collards, frozen, cooked, no added fat', 'Collards, raw', 'Congee', 'Congee, with meat, poultry, and/or seafood', 'Congee, with meat, poultry, and/or seafood, and vegetables', 'Congee, with vegetables', 'Cookie bar, with chocolate, nuts, and graham crackers', 'Cookie, Lebkuchen', 'Cookie, NFS', 'Cookie, Pfeffernusse', 'Cookie, Pizzelle', 'Cookie, almond', 'Cookie, animal', 'Cookie, animal, with frosting or icing', 'Cookie, applesauce', 'Cookie, baby food', 'Cookie, bar, with chocolate', 'Cookie, batter or dough, raw', 'Cookie, biscotti', 'Cookie, brownie, NS as to icing', 'Cookie, brownie, fat free, NS as to icing', 'Cookie, brownie, reduced fat, NS as to icing', 'Cookie, brownie, with icing or filling', 'Cookie, brownie, without icing', 'Cookie, butter or sugar ', 'Cookie, butter or sugar, with chocolate icing or filling', 'Cookie, butter or sugar, with fruit and/or nuts', 'Cookie, butter or sugar, with icing or filling other than chocolate', 'Cookie, butterscotch, brownie', 'Cookie, chocolate and vanilla sandwich', 'Cookie, chocolate chip', 'Cookie, chocolate chip sandwich', 'Cookie, chocolate chip, made from home recipe or purchased at a bakery', 'Cookie, chocolate chip, reduced fat', 'Cookie, chocolate chip, sugar free', 'Cookie, chocolate or fudge', 'Cookie, chocolate or fudge, reduced fat', 'Cookie, chocolate sandwich', 'Cookie, chocolate sandwich, reduced fat', 'Cookie, chocolate wafer', 'Cookie, chocolate, made with oatmeal and coconut, no bake', 'Cookie, chocolate, made with rice cereal', 'Cookie, chocolate, sandwich, with extra filling', 'Cookie, chocolate, with chocolate filling or coating, fat free', 'Cookie, chocolate, with icing or coating', 'Cookie, coconut', 'Cookie, cone shell, ice cream type, wafer or cake', 'Cookie, fig bar', 'Cookie, fig bar, fat free', 'Cookie, fortune', 'Cookie, fruit, baby food', 'Cookie, fruit-filled bar', 'Cookie, fruit-filled bar, fat free', 'Cookie, gingersnaps', 'Cookie, gluten free', 'Cookie, graham cracker with chocolate and marshmallow', 'Cookie, granola', 'Cookie, ladyfinger', 'Cookie, lemon bar', 'Cookie, macaroon', 'Cookie, marshmallow and peanut butter, with oat cereal, no bake', 'Cookie, marshmallow pie, chocolate covered', 'Cookie, marshmallow, chocolate-covered', 'Cookie, marshmallow, with coconut', 'Cookie, marshmallow, with rice cereal and chocolate chips', 'Cookie, marshmallow, with rice cereal, no bake', 'Cookie, meringue', 'Cookie, molasses', 'Cookie, multigrain, high fiber', 'Cookie, oatmeal', 'Cookie, oatmeal sandwich, with creme filling', 'Cookie, oatmeal sandwich, with peanut butter and jelly filling', 'Cookie, oatmeal, reduced fat, NS as to raisins', 'Cookie, oatmeal, sugar free', 'Cookie, oatmeal, with chocolate and peanut butter, no bake', 'Cookie, oatmeal, with chocolate chips', 'Cookie, oatmeal, with raisins', 'Cookie, peanut butter', 'Cookie, peanut butter sandwich', 'Cookie, peanut butter with rice cereal, no bake', 'Cookie, peanut butter, sugar free', 'Cookie, peanut butter, with chocolate', 'Cookie, pumpkin', 'Cookie, raisin', 'Cookie, raisin sandwich, cream-filled', 'Cookie, rice, baby', 'Cookie, rugelach', 'Cookie, rum ball, no bake', 'Cookie, sandwich, sugar free', 'Cookie, sandwich-type, not chocolate or vanilla', 'Cookie, shortbread', 'Cookie, shortbread, reduced fat', 'Cookie, shortbread, with icing or filling ', 'Cookie, sugar or plain, sugar free', 'Cookie, sugar wafer', 'Cookie, sugar wafer, chocolate-covered', 'Cookie, sugar wafer, sugar free', 'Cookie, tea, Japanese', 'Cookie, teething, baby', 'Cookie, toffee bar', 'Cookie, vanilla sandwich', 'Cookie, vanilla sandwich, extra filling', 'Cookie, vanilla sandwich, reduced fat', 'Cookie, vanilla wafer', 'Cookie, vanilla wafer, reduced fat', 'Cookie, vanilla with caramel, coconut, and chocolate coating', 'Cookie, with peanut butter filling, chocolate-coated', 'Cookies, Puerto Rican style', 'Cordial or liqueur', 'Cordial or liqueur, coffee flavored', 'Corn and sweet potatoes, baby food, strained', 'Corn beverage', 'Corn chips, flavored', 'Corn chips, flavored (Fritos)', 'Corn chips, plain', 'Corn chips, plain (Fritos)', 'Corn chips, reduced sodium', 'Corn dog, frankfurter or hot dog with cornbread coating', 'Corn flour patty or tart, fried', 'Corn fritter', 'Corn nuts', 'Corn oil', 'Corn pone, baked', 'Corn pone, fried', 'Corn soup, cream of, prepared with milk', 'Corn soup, cream of, prepared with water', 'Corn syrup', 'Corn, NS as to form, cooked', 'Corn, canned, cooked with butter or margarine', 'Corn, canned, cooked with oil', 'Corn, canned, cooked, fat added, NS as to fat type', 'Corn, canned, cooked, no added fat', 'Corn, canned, reduced sodium, cooked with butter or margarine', 'Corn, canned, reduced sodium, cooked with oil', 'Corn, canned, reduced sodium, cooked, fat added, NS as to fat type', 'Corn, canned, reduced sodium, cooked, no added fat', 'Corn, cooked, from restaurant', 'Corn, creamed', 'Corn, creamed, baby food, NS as to strained or junior', 'Corn, creamed, baby food, junior', 'Corn, creamed, baby food, strained', 'Corn, fresh, cooked with butter or margarine', 'Corn, fresh, cooked with oil', 'Corn, fresh, cooked, fat added, NS as to fat type', 'Corn, fresh, cooked, no added fat', 'Corn, frozen, cooked with butter or margarine', 'Corn, frozen, cooked with oil', 'Corn, frozen, cooked, fat added, NS as to fat type', 'Corn, frozen, cooked, no added fat', 'Corn, raw', 'Corn, scalloped or pudding', 'Cornbread muffin, stick, round', 'Cornbread muffin, stick, round, made from home recipe', 'Cornbread stuffing', 'Cornbread, made from home recipe', 'Cornbread, prepared from mix', 'Corned beef hash', 'Corned beef patty', 'Corned beef sandwich', 'Corned beef with tomato sauce and onion, Puerto Rican style', 'Corned beef, canned, ready-to-eat', 'Corned beef, cooked, NS as to fat eaten', 'Corned beef, cooked, lean and fat eaten', 'Corned beef, cooked, lean only eaten', 'Corned beef, potatoes, and vegetables excluding carrots, broccoli, and dark-green leafy; no sauce', 'Corned beef, potatoes, and vegetables including carrots, broccoli, and/or dark-green leafy; no sauce', 'Cornish game hen, cooked, skin eaten', 'Cornish game hen, cooked, skin not eaten', 'Cornish game hen, roasted, skin eaten', 'Cornish game hen, roasted, skin not eaten', 'Cornmeal beverage', 'Cornmeal beverage with chocolate milk', 'Cornmeal coconut dessert, Puerto Rican style', 'Cornmeal dressing with chicken or turkey and vegetables', 'Cornmeal dumpling', 'Cornmeal fritter, Puerto Rican style', 'Cornmeal mush, NS as to fat', 'Cornmeal mush, fat added', 'Cornmeal mush, no added fat', 'Cornmeal stick, Puerto Rican style', 'Cornmeal, Puerto Rican Style', 'Cottage cheese, farmer\'s', 'Cottonseed oil', 'Couscous, plain, cooked', 'Crab cake', 'Crab cake sandwich', 'Crab imperial', 'Crab salad', 'Crab salad made with imitation crab', 'Crab soup, NS as to tomato-base or cream style', 'Crab soup, cream of, prepared with milk', 'Crab soup, tomato-base', 'Crab, baked or broiled, fat added', 'Crab, baked or broiled, no added fat', 'Crab, canned', 'Crab, coated, baked or broiled, fat added', 'Crab, coated, baked or broiled, no added fat', 'Crab, cooked, NS as to cooking method', 'Crab, deviled', 'Crab, hard shell, steamed', 'Crab, soft shell, coated, fried', 'Crabs in tomato-based sauce, Puerto Rican style', 'Cracker chips', 'Crackers, Cuban', 'Crackers, NFS', 'Crackers, baby food', 'Crackers, breakfast biscuit', 'Crackers, butter (Ritz)', 'Crackers, butter, flavored', 'Crackers, butter, plain', 'Crackers, butter, reduced fat', 'Crackers, butter, reduced sodium', 'Crackers, cheese', 'Crackers, cheese (Cheez-It)', 'Crackers, cheese (Goldfish)', 'Crackers, cheese, reduced fat', 'Crackers, cheese, reduced sodium', 'Crackers, cheese, whole grain', 'Crackers, corn', 'Crackers, crispbread', 'Crackers, flatbread', 'Crackers, gluten free, flavored', 'Crackers, gluten free, plain', 'Crackers, matzo', 'Crackers, matzo, reduced sodium', 'Crackers, milk', 'Crackers, multigrain', 'Crackers, oatmeal', 'Crackers, oyster', 'Crackers, rice', 'Crackers, rice and nuts', 'Crackers, saltine', 'Crackers, saltine, multigrain', 'Crackers, saltine, reduced fat', 'Crackers, saltine, reduced sodium', 'Crackers, sandwich', 'Crackers, sandwich, cheese filled', 'Crackers, sandwich, cheese filled (Ritz)', 'Crackers, sandwich, peanut butter filled', 'Crackers, sandwich, peanut butter filled (Ritz)', 'Crackers, sandwich, reduced fat, peanut butter filled', 'Crackers, water', 'Crackers, wheat', 'Crackers, wheat, flavored (Wheat Thins)', 'Crackers, wheat, plain (Wheat Thins)', 'Crackers, wheat, reduced fat', 'Crackers, wheat, reduced sodium', 'Crackers, whole grain, sandwich, peanut butter filled', 'Crackers, wonton', 'Crackers, woven wheat', 'Crackers, woven wheat, flavored (Triscuit)', 'Crackers, woven wheat, plain (Triscuit)', 'Crackers, woven wheat, reduced fat', 'Crackers, woven wheat, reduced sodium', 'Cranberries, dried', 'Cranberries, raw', 'Cranberry juice blend, 100% juice', 'Cranberry juice blend, 100% juice, with calcium added', 'Cranberry juice drink, with high vitamin C', 'Cranberry juice drink, with high vitamin C, light', 'Cranberry juice, 100%, not a blend', 'Cranberry sauce', 'Crayfish, boiled or steamed', 'Crayfish, coated, fried', 'Cream cheese spread, fat free', 'Cream cheese, light', 'Cream cheese, regular, flavored', 'Cream cheese, regular, plain', 'Cream of rye', 'Cream of wheat, NS as to regular, quick, or instant, NS as to fat', 'Cream of wheat, NS as to regular, quick, or instant, fat added', 'Cream of wheat, NS as to regular, quick, or instant, no added fat', 'Cream of wheat, instant, made with milk, NS as to fat', 'Cream of wheat, instant, made with milk, fat added', 'Cream of wheat, instant, made with milk, no added fat', 'Cream of wheat, instant, made with non-dairy milk, NS as to fat', 'Cream of wheat, instant, made with non-dairy milk, fat added', 'Cream of wheat, instant, made with non-dairy milk, no added fat', 'Cream of wheat, instant, made with water, NS as to fat', 'Cream of wheat, instant, made with water, fat added', 'Cream of wheat, instant, made with water, no added fat', 'Cream of wheat, regular or quick, made with milk, NS as to fat', 'Cream of wheat, regular or quick, made with milk, fat added', 'Cream of wheat, regular or quick, made with milk, no added fat', 'Cream of wheat, regular or quick, made with non-dairy milk, NS as to fat', 'Cream of wheat, regular or quick, made with non-dairy milk, fat added', 'Cream of wheat, regular or quick, made with non-dairy milk, no added fat', 'Cream of wheat, regular or quick, made with water, NS as to fat', 'Cream of wheat, regular or quick, made with water, fat added', 'Cream of wheat, regular or quick, made with water, no added fat', 'Cream puff, eclair, custard or cream filled, NS as to icing', 'Cream puff, eclair, custard or cream filled, iced', 'Cream puff, eclair, custard or cream filled, iced, reduced fat', 'Cream puff, eclair, custard or cream filled, not iced', 'Cream puff, no filling or icing', 'Cream sauce, for use with vegetables', 'Cream, NS as to light, heavy, or half and half', 'Cream, half and half', 'Cream, half and half, fat free', 'Cream, half and half, flavored', 'Cream, heavy', 'Cream, light', 'Cream, whipped', 'Creamed chipped or dried beef', 'Creamed christophine, Puerto Rican style', 'Creamsicle', 'Creamsicle, light', 'Creamy dressing', 'Creamy dressing, fat free', 'Creamy dressing, light', 'Creme brulee', 'Crepe, NFS', 'Crepe, NS as to filling', 'Crepe, chocolate filled', 'Crepe, filled with meat, poultry, or seafood, no sauce', 'Crepe, filled with meat, poultry, or seafood, with sauce', 'Crepe, fruit filled', 'Crepe, plain', 'Cress, cooked', 'Cress, raw', 'Crisp, apple, apple dessert', 'Crisp, blueberry', 'Crisp, cherry', 'Crisp, peach', 'Croaker, baked or broiled, fat added', 'Croaker, baked or broiled, no added fat', 'Croaker, coated, baked or broiled, fat added', 'Croaker, coated, baked or broiled, no added fat', 'Croaker, coated, fried', 'Croaker, cooked, NS as to cooking method', 'Croaker, steamed or poached', 'Croissant', 'Croissant sandwich with bacon and egg', 'Croissant sandwich with bacon, egg, and cheese', 'Croissant sandwich with ham, egg, and cheese', 'Croissant sandwich with sausage and egg', 'Croissant sandwich with sausage, egg, and cheese', 'Croissant sandwich, filled with broccoli and cheese', 'Croissant sandwich, filled with ham and cheese', 'Croissant, cheese', 'Croissant, chocolate', 'Croissant, fruit', 'Croutons', 'Crumpet', 'Crunchy snacks, corn based, baby food', 'Cuban sandwich, with spread', 'Cucumber and vegetable namasu', 'Cucumber salad made with cucumber and vinegar', 'Cucumber salad, made with Italian dressing', 'Cucumber salad, made with sour cream dressing', 'Cucumber, cooked', 'Cucumber, for use on a sandwich', 'Cucumber, raw', 'Currants, dried', 'Curry sauce', 'Custard', 'Custard pudding, baby food, flavor other than chocolate, junior', 'Custard pudding, baby food, flavor other than chocolate, strained', 'Custard pudding, flavor other than chocolate, baby food, NS as to strained or junior', 'Daikon radish, cooked', 'Daiquiri', 'Dandelion greens, cooked', 'Dandelion greens, raw', 'Danish pastry, plain or spice', 'Danish pastry, with cheese', 'Danish pastry, with fruit', 'Dark green vegetables as ingredient in omelet', 'Dark-green leafy vegetable soup with meat, Asian style', 'Dark-green leafy vegetable soup, meatless, Asian style', 'Dasheen, cooked', 'Date', 'Date candy', 'Deer chop, cooked', 'Deer sausage', 'Dessert dip', 'Dessert pizza', 'Dessert sauce', 'Dietetic or low calorie candy, NFS', 'Dietetic or low calorie candy, chocolate covered', 'Dietetic or low calorie gumdrops', 'Dietetic or low calorie hard candy', 'Dietetic or low calorie mints', 'Dill dip, light', 'Dill dip, regular', 'Dill dip, yogurt based', 'Dip, NFS', 'Dirty rice', 'Dosa (Indian), plain', 'Dosa (Indian), with filling', 'Double cheeseburger (Burger King)', 'Double cheeseburger (McDonalds)', 'Double cheeseburger, from fast food, 2 large patties', 'Double cheeseburger, from fast food, 2 medium patties', 'Double cheeseburger, from fast food, 2 small patties', 'Double cheeseburger, on wheat bun, 2 large patties', 'Double cheeseburger, on wheat bun, 2 medium patties', 'Double cheeseburger, on wheat bun, 2 small patties', 'Double cheeseburger, on white bun, 2 large patties', 'Double cheeseburger, on white bun, 2 medium patties', 'Double cheeseburger, on white bun, 2 small patties', 'Double hamburger, from fast food, 2 large patties', 'Double hamburger, from fast food, 2 medium patties', 'Double hamburger, from fast food, 2 small patties', 'Double hamburger, on wheat bun, 2 large patties', 'Double hamburger, on wheat bun, 2 medium patties', 'Double hamburger, on wheat bun, 2 small patties', 'Double hamburger, on white bun, 2 large patties', 'Double hamburger, on white bun, 2 medium patties', 'Double hamburger, on white bun, 2 small patties', 'Doughnut holes', 'Doughnut, NFS', 'Doughnut, cake type, chocolate icing', 'Doughnut, cake type, plain', 'Doughnut, cake type, powdered sugar', 'Doughnut, cake type, with icing', 'Doughnut, chocolate', 'Doughnut, chocolate, with chocolate icing', 'Doughnut, custard-filled', 'Doughnut, custard-filled, with icing', 'Doughnut, jelly', 'Doughnut, yeast type', 'Doughnut, yeast type, with chocolate icing', 'Dove, cooked, NS as to cooking method', 'Dove, fried', 'Dressing with chicken or turkey and vegetables', 'Dressing with meat and vegetables', 'Dressing with oysters', 'Duck egg, cooked', 'Duck sauce', 'Duck, cooked, skin eaten', 'Duck, cooked, skin not eaten', 'Duck, pressed, Chinese', 'Duck, roasted, skin eaten', 'Duck, roasted, skin not eaten', 'Dukboki or Tteokbokki, Korean', 'Dumpling, meat-filled', 'Dumpling, plain', 'Dumpling, potato- or cheese-filled', 'Dumpling, steamed, filled with meat, poultry, or seafood', 'Dumpling, vegetable', 'Dutch apple dessert, baby food, NS as to strained or junior', 'Dutch apple dessert, baby food, junior', 'Dutch apple dessert, baby food, strained', 'Easter egg, candy coated chocolate', 'Edamame, cooked', 'Eel, cooked, NS as to cooking method', 'Eel, smoked', 'Eel, steamed or poached', 'Egg Salad, made with any type of fat free dressing', 'Egg and bacon on biscuit', 'Egg and cheese on biscuit', 'Egg and ham on biscuit', 'Egg and sausage on biscuit', 'Egg and steak on biscuit', 'Egg casserole with bread, cheese, milk and meat', 'Egg drop soup', 'Egg foo yung, NFS', 'Egg omelet or scrambled egg, NS as to fat', 'Egg omelet or scrambled egg, NS as to fat type', 'Egg omelet or scrambled egg, from fast food / restaurant', 'Egg omelet or scrambled egg, made with animal fat or meat drippings', 'Egg omelet or scrambled egg, made with butter', 'Egg omelet or scrambled egg, made with cooking spray', 'Egg omelet or scrambled egg, made with margarine', 'Egg omelet or scrambled egg, made with oil', 'Egg omelet or scrambled egg, no added fat', 'Egg omelet or scrambled egg, with cheese and dark-green vegetables, NS as to fat', 'Egg omelet or scrambled egg, with cheese and dark-green vegetables, fat added', 'Egg omelet or scrambled egg, with cheese and dark-green vegetables, no added fat', 'Egg omelet or scrambled egg, with cheese and meat, NS as to fat', 'Egg omelet or scrambled egg, with cheese and meat, NS as to fat type', 'Egg omelet or scrambled egg, with cheese and meat, made with animal fat or meat drippings', 'Egg omelet or scrambled egg, with cheese and meat, made with butter', 'Egg omelet or scrambled egg, with cheese and meat, made with cooking spray', 'Egg omelet or scrambled egg, with cheese and meat, made with margarine', 'Egg omelet or scrambled egg, with cheese and meat, made with oil', 'Egg omelet or scrambled egg, with cheese and meat, no added fat', 'Egg omelet or scrambled egg, with cheese and tomatoes, NS as to fat', 'Egg omelet or scrambled egg, with cheese and tomatoes, fat added', 'Egg omelet or scrambled egg, with cheese and tomatoes, no added fat', 'Egg omelet or scrambled egg, with cheese and vegetables other than dark green and/or tomatoes, NS as to fat', 'Egg omelet or scrambled egg, with cheese and vegetables other than dark green and/or tomatoes, fat added', 'Egg omelet or scrambled egg, with cheese and vegetables other than dark green and/or tomatoes, no added fat', 'Egg omelet or scrambled egg, with cheese, made with animal fat or meat drippings', 'Egg omelet or scrambled egg, with cheese, made with butter', 'Egg omelet or scrambled egg, with cheese, made with cooking spray', 'Egg omelet or scrambled egg, with cheese, made with margarine', 'Egg omelet or scrambled egg, with cheese, made with oil', 'Egg omelet or scrambled egg, with cheese, meat, and dark-green vegetables, NS as to fat', 'Egg omelet or scrambled egg, with cheese, meat, and dark-green vegetables, fat added', 'Egg omelet or scrambled egg, with cheese, meat, and dark-green vegetables, no added fat', 'Egg omelet or scrambled egg, with cheese, meat, and tomatoes, NS as to fat', 'Egg omelet or scrambled egg, with cheese, meat, and tomatoes, fat added', 'Egg omelet or scrambled egg, with cheese, meat, and tomatoes, no added fat', 'Egg omelet or scrambled egg, with cheese, meat, and vegetables other than dark-green and/or tomatoes, NS as to fat', 'Egg omelet or scrambled egg, with cheese, meat, and vegetables other than dark-green and/or tomatoes, fat added', 'Egg omelet or scrambled egg, with cheese, meat, and vegetables other than dark-green and/or tomatoes, no added fat', 'Egg omelet or scrambled egg, with cheese, meat, tomatoes, and dark-green vegetables, NS as to fat', 'Egg omelet or scrambled egg, with cheese, meat, tomatoes, and dark-green vegetables, fat added', 'Egg omelet or scrambled egg, with cheese, meat, tomatoes, and dark-green vegetables, no added fat', 'Egg omelet or scrambled egg, with cheese, no added fat', 'Egg omelet or scrambled egg, with cheese, tomatoes, and dark-green vegetables, NS as to fat', 'Egg omelet or scrambled egg, with cheese, tomatoes, and dark-green vegetables, fat added', 'Egg omelet or scrambled egg, with cheese, tomatoes, and dark-green vegetables, no added fat', 'Egg omelet or scrambled egg, with dark-green vegetables, NS as to fat', 'Egg omelet or scrambled egg, with dark-green vegetables, fat added', 'Egg omelet or scrambled egg, with dark-green vegetables, no added fat', 'Egg omelet or scrambled egg, with meat and dark-green vegetables, NS as to fat', 'Egg omelet or scrambled egg, with meat and dark-green vegetables, fat added', 'Egg omelet or scrambled egg, with meat and dark-green vegetables, no added fat', 'Egg omelet or scrambled egg, with meat and tomatoes, NS as to fat', 'Egg omelet or scrambled egg, with meat and tomatoes, fat added', 'Egg omelet or scrambled egg, with meat and tomatoes, no added fat', 'Egg omelet or scrambled egg, with meat and vegetables other than dark-green and/or tomatoes, NS as to fat', 'Egg omelet or scrambled egg, with meat and vegetables other than dark-green and/or tomatoes, fat added', 'Egg omelet or scrambled egg, with meat and vegetables other than dark-green and/or tomatoes, no added fat', 'Egg omelet or scrambled egg, with meat, NS as to fat', 'Egg omelet or scrambled egg, with meat, NS as to fat type', 'Egg omelet or scrambled egg, with meat, made with animal fat or meat drippings', 'Egg omelet or scrambled egg, with meat, made with butter', 'Egg omelet or scrambled egg, with meat, made with cooking spray', 'Egg omelet or scrambled egg, with meat, made with margarine', 'Egg omelet or scrambled egg, with meat, made with oil', 'Egg omelet or scrambled egg, with meat, no added fat', 'Egg omelet or scrambled egg, with meat, tomatoes, and dark-green vegetables, NS as to fat', 'Egg omelet or scrambled egg, with meat, tomatoes, and dark-green vegetables, fat added', 'Egg omelet or scrambled egg, with meat, tomatoes, and dark-green vegetables, no added fat', 'Egg omelet or scrambled egg, with potatoes and/or onions, NS as to fat', 'Egg omelet or scrambled egg, with potatoes and/or onions, fat added', 'Egg omelet or scrambled egg, with potatoes and/or onions, no added fat', 'Egg omelet or scrambled egg, with tomatoes and dark-green vegetables, NS as to fat', 'Egg omelet or scrambled egg, with tomatoes and dark-green vegetables, fat added', 'Egg omelet or scrambled egg, with tomatoes and dark-green vegetables, no fat added', 'Egg omelet or scrambled egg, with tomatoes, NS as to fat', 'Egg omelet or scrambled egg, with tomatoes, fat added', 'Egg omelet or scrambled egg, with tomatoes, no added fat', 'Egg omelet or scrambled egg, with vegetables other than dark green and/or tomatoes, NS as to fat', 'Egg omelet or scrambled egg, with vegetables other than dark green and/or tomatoes, fat added', 'Egg omelet or scrambled egg, with vegetables other than dark green and/or tomatoes, no added fat', 'Egg roll, meatless', 'Egg roll, with beef and/or pork', 'Egg roll, with chicken or turkey', 'Egg roll, with shrimp', 'Egg salad sandwich', 'Egg salad, made with Italian dressing', 'Egg salad, made with creamy dressing', 'Egg salad, made with light Italian dressing', 'Egg salad, made with light creamy dressing', 'Egg salad, made with light mayonnaise', 'Egg salad, made with light mayonnaise-type salad dressing', 'Egg salad, made with mayonnaise', 'Egg salad, made with mayonnaise-type salad dressing', 'Egg substitute, omelet, scrambled, or fried, fat added', 'Egg substitute, omelet, scrambled, or fried, no added fat', 'Egg substitute, omelet, scrambled, or fried, with cheese', 'Egg substitute, omelet, scrambled, or fried, with cheese and meat', 'Egg substitute, omelet, scrambled, or fried, with cheese and vegetables', 'Egg substitute, omelet, scrambled, or fried, with cheese, meat, and vegetables', 'Egg substitute, omelet, scrambled, or fried, with meat', 'Egg substitute, omelet, scrambled, or fried, with meat and vegetables', 'Egg substitute, omelet, scrambled, or fried, with vegetables', 'Egg white omelet, scrambled, or fried, NS as to fat', 'Egg white omelet, scrambled, or fried, NS as to fat type', 'Egg white omelet, scrambled, or fried, made with butter', 'Egg white omelet, scrambled, or fried, made with cooking spray', 'Egg white omelet, scrambled, or fried, made with margarine', 'Egg white omelet, scrambled, or fried, made with oil', 'Egg white omelet, scrambled, or fried, no added fat', 'Egg white, omelet, scrambled, or fried, with cheese', 'Egg white, omelet, scrambled, or fried, with cheese and meat', 'Egg white, omelet, scrambled, or fried, with cheese and vegetables', 'Egg white, omelet, scrambled, or fried, with cheese, meat, and vegetables', 'Egg white, omelet, scrambled, or fried, with meat', 'Egg white, omelet, scrambled, or fried, with meat and vegetables', 'Egg white, omelet, scrambled, or fried, with vegetables', 'Egg, Benedict', 'Egg, cheese and bacon on bagel', 'Egg, cheese and ham on bagel', 'Egg, cheese and sausage on bagel', 'Egg, cheese, and bacon griddle cake sandwich', 'Egg, cheese, and bacon on English muffin', 'Egg, cheese, and bacon on biscuit', 'Egg, cheese, and ham on English muffin', 'Egg, cheese, and ham on biscuit', 'Egg, cheese, and sausage griddle cake sandwich', 'Egg, cheese, and sausage on English muffin', 'Egg, cheese, and sausage on biscuit', 'Egg, cheese, and sausage on bun', 'Egg, cheese, and steak on bagel', 'Egg, cheese, ham, and bacon on bun', 'Egg, creamed', 'Egg, deviled', 'Egg, white only, raw', 'Egg, white, cooked, NS as to fat', 'Egg, white, cooked, fat added', 'Egg, white, cooked, no added fat', 'Egg, whole, baked, NS as to fat', 'Egg, whole, baked, fat added', 'Egg, whole, baked, no added fat', 'Egg, whole, boiled or poached ', 'Egg, whole, cooked, NS as to cooking method', 'Egg, whole, fried no added fat', 'Egg, whole, fried with animal fat or meat drippings', 'Egg, whole, fried with butter', 'Egg, whole, fried with cooking spray', 'Egg, whole, fried with margarine', 'Egg, whole, fried with oil', 'Egg, whole, fried, NS as to fat', 'Egg, whole, fried, NS as to fat type', 'Egg, whole, fried, from fast food / restaurant', 'Egg, whole, pickled', 'Egg, whole, raw', 'Egg, yolk only, cooked, NS as to fat', 'Egg, yolk only, cooked, fat added', 'Egg, yolk only, cooked, no added fat', 'Egg, yolk only, raw', 'Eggnog', 'Eggnog, alcoholic', 'Eggplant and meat casserole', 'Eggplant dip', 'Eggplant parmesan casserole, regular', 'Eggplant with cheese and tomato sauce', 'Eggplant, cooked, as ingredient', 'Eggplant, cooked, fat added', 'Eggplant, cooked, no added fat', 'Eggplant, pickled', 'Eggplant, raw', 'Eggs a la Malaguena, Puerto Rican style', 'Empanada,  Mexican turnover, pumpkin', 'Empanada, Mexican turnover, filled with cheese and vegetables', 'Empanada, Mexican turnover, filled with chicken and vegetables', 'Empanada, Mexican turnover, filled with meat and vegetables', 'Empanada, Mexican turnover, fruit-filled', 'Enchilada sauce, green', 'Enchilada sauce, red', 'Enchilada with beans, green-chile or enchilada sauce', 'Enchilada with beans, meatless, red-chile or enchilada sauce', 'Enchilada with chicken and beans, green-chile or enchilada sauce', 'Enchilada with chicken and beans, red-chile or enchilada sauce', 'Enchilada with chicken, green-chile or enchilada sauce', 'Enchilada with chicken, red-chile or enchilada sauce', 'Enchilada with meat and beans, green-chile or enchilada sauce', 'Enchilada with meat and beans, red-chile or enchilada sauce', 'Enchilada with meat, green-chile or enchilada sauce', 'Enchilada with meat, red-chile or enchilada sauce', 'Enchilada, just cheese, meatless, no beans, green-chile or enchilada sauce', 'Enchilada, just cheese, meatless, no beans, red-chile or enchilada sauce', 'Enchilada, no sauce', 'Energy Drink', 'Energy drink (Full Throttle)', 'Energy drink (Monster)', 'Energy drink (Mountain Dew AMP)', 'Energy drink (NOS)', 'Energy drink (No Fear Motherload)', 'Energy drink (No Fear)', 'Energy drink (Ocean Spray Cran-Energy Juice Drink)', 'Energy drink (Red Bull)', 'Energy drink (Rockstar)', 'Energy drink (SoBe Energize Energy Juice Drink)', 'Energy drink (Vault)', 'Energy drink (XS Gold Plus)', 'Energy drink (XS)', 'Energy drink, low calorie (Monster)', 'Energy drink, sugar free', 'Energy drink, sugar free (Monster)', 'Energy drink, sugar free (Mountain Dew AMP)', 'Energy drink, sugar free (No Fear)', 'Energy drink, sugar free (Rockstar)', 'Energy drink, sugar free (Vault)', 'Energy drink, sugar-free (NOS)', 'Energy drink, sugar-free (Red Bull)', 'Escarole, cooked', 'Espresso coffee beans, chocolate-covered', 'Fajita with chicken and vegetables', 'Fajita with meat and vegetables', 'Fajita with vegetables', 'Fajita-style beef sandwich with cheese, on pita bread, with lettuce and tomato', 'Falafel', 'Fat back, cooked', 'Fava beans, cooked', 'Fennel bulb, cooked', 'Fennel bulb, raw', 'Fig, canned', 'Fig, dried', 'Fig, raw', 'Finger Foods, Puffs, baby food', 'Firni, Indian pudding', 'Fish and noodles with mushroom sauce', 'Fish and rice with cream sauce', 'Fish and rice with mushroom sauce', 'Fish and rice with tomato-based sauce', 'Fish and vegetable soup, no potatoes, Mexican style', 'Fish and vegetables excluding  carrots, broccoli, and dark-green leafy; no potatoes, soy-based sauce', 'Fish and vegetables excluding carrots, broccoli, and dark- green leafy; no potatoes, tomato-based sauce', 'Fish and vegetables including carrots, broccoli, and/or dark-green leafy; no potatoes, soy-based sauce', 'Fish and vegetables including carrots, broccoli, and/or dark-green leafy; no potatoes, tomato-based sauce', 'Fish cake or patty, NS as to fish', 'Fish chowder', 'Fish curry', 'Fish curry with rice', 'Fish fillet, fried as ingredient in sandwiches', 'Fish in lemon-butter sauce with starch item, vegetable, frozen meal', 'Fish moochim', 'Fish sandwich, NFS', 'Fish sandwich, fried, from fast food', 'Fish sandwich, fried, from fast food, with cheese', 'Fish sandwich, fried, on wheat bun', 'Fish sandwich, fried, on wheat bun, with cheese', 'Fish sandwich, fried, on white bun', 'Fish sandwich, fried, on white bun, with cheese', 'Fish sandwich, from school cafeteria', 'Fish sandwich, grilled', 'Fish sauce', 'Fish shish kabob with vegetables, excluding potatoes', 'Fish soup with potatoes, Mexican style', 'Fish stick, patty or nugget from fast food', 'Fish stick, patty or nugget from restaurant, home, or other place', 'Fish stock, home recipe', 'Fish timbale or mousse', 'Fish with cream or white sauce, not tuna or lobster', 'Fish with tomato-based sauce', 'Fish wrap sandwich', 'Fish, NS as to type, baked or broiled, made with butter', 'Fish, NS as to type, baked or broiled, made with cooking spray', 'Fish, NS as to type, baked or broiled, made with margarine', 'Fish, NS as to type, baked or broiled, made with oil', 'Fish, NS as to type, baked or broiled, no added fat', 'Fish, NS as to type, canned', 'Fish, NS as to type, coated, baked or broiled, made with butter', 'Fish, NS as to type, coated, baked or broiled, made with cooking spray', 'Fish, NS as to type, coated, baked or broiled, made with margarine', 'Fish, NS as to type, coated, baked or broiled, made with oil', 'Fish, NS as to type, coated, baked or broiled, no added fat', 'Fish, NS as to type, coated, fried, made with butter', 'Fish, NS as to type, coated, fried, made with cooking spray', 'Fish, NS as to type, coated, fried, made with margarine', 'Fish, NS as to type, coated, fried, made with oil', 'Fish, NS as to type, coated, fried, no added fat', 'Fish, NS as to type, cooked, NS as to cooking method', 'Fish, NS as to type, dried', 'Fish, NS as to type, from fast food', 'Fish, NS as to type, raw', 'Fish, NS as to type, smoked', 'Fish, NS as to type, steamed', 'Fish, noodles, and vegetables excluding carrots, broccoli, and dark-green leafy; cheese sauce', 'Fish, noodles, and vegetables including carrots, broccoli, and/or dark green leafy; cheese sauce', 'Fish, tofu, and vegetables, tempura', 'Flan', 'Flavored pasta', 'Flavored rice and pasta mixture', 'Flavored rice and pasta mixture, reduced sodium', 'Flavored rice mixture', 'Flavored rice mixture with cheese', 'Flavored rice, brown and wild', 'Flax seeds', 'Flaxseed oil', 'Flounder with chopped broccoli, diet frozen meal', 'Flounder with crab stuffing', 'Flounder, baked or broiled, made with butter', 'Flounder, baked or broiled, made with cooking spray', 'Flounder, baked or broiled, made with margarine', 'Flounder, baked or broiled, made with oil', 'Flounder, baked or broiled, no added fat', 'Flounder, coated, baked or broiled, made with butter', 'Flounder, coated, baked or broiled, made with cooking spray', 'Flounder, coated, baked or broiled, made with margarine', 'Flounder, coated, baked or broiled, made with oil', 'Flounder, coated, baked or broiled, no added fat', 'Flounder, coated, fried, made with butter', 'Flounder, coated, fried, made with cooking spray', 'Flounder, coated, fried, made with margarine', 'Flounder, coated, fried, made with oil', 'Flounder, coated, fried, no added fat', 'Flounder, cooked, NS as to cooking method', 'Flounder, raw', 'Flounder, smoked', 'Flounder, steamed or poached', 'Flowers or blossoms of sesbania, squash, or lily, cooked', 'Fluid replacement, 5% glucose in water', 'Fluid replacement, electrolyte solution', 'Focaccia, Italian flatbread, plain', 'Fondant', 'Fondant, chocolate covered', 'Frankfurter or hot dog sandwich, NFS, plain, on multigrain bread', 'Frankfurter or hot dog sandwich, NFS, plain, on multigrain bun', 'Frankfurter or hot dog sandwich, NFS, plain, on wheat bread', 'Frankfurter or hot dog sandwich, NFS, plain, on wheat bun', 'Frankfurter or hot dog sandwich, NFS, plain, on white bread', 'Frankfurter or hot dog sandwich, NFS, plain, on white bun', 'Frankfurter or hot dog sandwich, NFS, plain, on whole grain white bread', 'Frankfurter or hot dog sandwich, NFS, plain, on whole grain white bun', 'Frankfurter or hot dog sandwich, NFS, plain, on whole wheat bread', 'Frankfurter or hot dog sandwich, NFS, plain, on whole wheat bun', 'Frankfurter or hot dog sandwich, beef and pork, plain, on multigrain bread', 'Frankfurter or hot dog sandwich, beef and pork, plain, on multigrain bun', 'Frankfurter or hot dog sandwich, beef and pork, plain, on wheat bread', 'Frankfurter or hot dog sandwich, beef and pork, plain, on wheat bun', 'Frankfurter or hot dog sandwich, beef and pork, plain, on white bread', 'Frankfurter or hot dog sandwich, beef and pork, plain, on white bun', 'Frankfurter or hot dog sandwich, beef and pork, plain, on whole grain white bread', 'Frankfurter or hot dog sandwich, beef and pork, plain, on whole grain white bun', 'Frankfurter or hot dog sandwich, beef and pork, plain, on whole wheat bread', 'Frankfurter or hot dog sandwich, beef and pork, plain, on whole wheat bun', 'Frankfurter or hot dog sandwich, beef, plain, on multigrain bread', 'Frankfurter or hot dog sandwich, beef, plain, on multigrain bun', 'Frankfurter or hot dog sandwich, beef, plain, on wheat bread', 'Frankfurter or hot dog sandwich, beef, plain, on wheat bun', 'Frankfurter or hot dog sandwich, beef, plain, on white bread', 'Frankfurter or hot dog sandwich, beef, plain, on white bun', 'Frankfurter or hot dog sandwich, beef, plain, on whole grain white bread', 'Frankfurter or hot dog sandwich, beef, plain, on whole grain white bun', 'Frankfurter or hot dog sandwich, beef, plain, on whole wheat bread', 'Frankfurter or hot dog sandwich, beef, plain, on whole wheat bun', 'Frankfurter or hot dog sandwich, chicken and/or turkey, plain, on multigrain bread', 'Frankfurter or hot dog sandwich, chicken and/or turkey, plain, on multigrain bun', 'Frankfurter or hot dog sandwich, chicken and/or turkey, plain, on wheat bread', 'Frankfurter or hot dog sandwich, chicken and/or turkey, plain, on wheat bun', 'Frankfurter or hot dog sandwich, chicken and/or turkey, plain, on white bread', 'Frankfurter or hot dog sandwich, chicken and/or turkey, plain, on white bun', 'Frankfurter or hot dog sandwich, chicken and/or turkey, plain, on whole grain white bread', 'Frankfurter or hot dog sandwich, chicken and/or turkey, plain, on whole grain white bun', 'Frankfurter or hot dog sandwich, chicken and/or turkey, plain, on whole wheat bread', 'Frankfurter or hot dog sandwich, chicken and/or turkey, plain, on whole wheat bun', 'Frankfurter or hot dog sandwich, fat free, plain, on multigrain bread', 'Frankfurter or hot dog sandwich, fat free, plain, on multigrain bun', 'Frankfurter or hot dog sandwich, fat free, plain, on wheat bread', 'Frankfurter or hot dog sandwich, fat free, plain, on wheat bun', 'Frankfurter or hot dog sandwich, fat free, plain, on white bread', 'Frankfurter or hot dog sandwich, fat free, plain, on white bun', 'Frankfurter or hot dog sandwich, fat free, plain, on whole grain white bread', 'Frankfurter or hot dog sandwich, fat free, plain, on whole grain white bun', 'Frankfurter or hot dog sandwich, fat free, plain, on whole wheat bread', 'Frankfurter or hot dog sandwich, fat free, plain, on whole wheat bun', 'Frankfurter or hot dog sandwich, meat and poultry, plain, on multigrain bread', 'Frankfurter or hot dog sandwich, meat and poultry, plain, on multigrain bun', 'Frankfurter or hot dog sandwich, meat and poultry, plain, on wheat bread', 'Frankfurter or hot dog sandwich, meat and poultry, plain, on wheat bun', 'Frankfurter or hot dog sandwich, meat and poultry, plain, on white bread', 'Frankfurter or hot dog sandwich, meat and poultry, plain, on white bun', 'Frankfurter or hot dog sandwich, meat and poultry, plain, on whole grain white bread', 'Frankfurter or hot dog sandwich, meat and poultry, plain, on whole grain white bun', 'Frankfurter or hot dog sandwich, meat and poultry, plain, on whole wheat bread', 'Frankfurter or hot dog sandwich, meat and poultry, plain, on whole wheat bun', 'Frankfurter or hot dog sandwich, meatless, on bread, with meatless chili', 'Frankfurter or hot dog sandwich, meatless, on bun, with meatless chili', 'Frankfurter or hot dog sandwich, meatless, plain, on bread', 'Frankfurter or hot dog sandwich, meatless, plain, on bun', 'Frankfurter or hot dog sandwich, reduced fat or light, plain, on multigrain bread', 'Frankfurter or hot dog sandwich, reduced fat or light, plain, on multigrain bun', 'Frankfurter or hot dog sandwich, reduced fat or light, plain, on wheat bread', 'Frankfurter or hot dog sandwich, reduced fat or light, plain, on wheat bun', 'Frankfurter or hot dog sandwich, reduced fat or light, plain, on white bread', 'Frankfurter or hot dog sandwich, reduced fat or light, plain, on white bun', 'Frankfurter or hot dog sandwich, reduced fat or light, plain, on whole grain white bread', 'Frankfurter or hot dog sandwich, reduced fat or light, plain, on whole grain white bun', 'Frankfurter or hot dog sandwich, reduced fat or light, plain, on whole wheat bread', 'Frankfurter or hot dog sandwich, reduced fat or light, plain, on whole wheat bun', 'Frankfurter or hot dog sandwich, reduced sodium', 'Frankfurter or hot dog sandwich, with chili, on multigrain bread', 'Frankfurter or hot dog sandwich, with chili, on multigrain bun', 'Frankfurter or hot dog sandwich, with chili, on wheat bread', 'Frankfurter or hot dog sandwich, with chili, on wheat bun', 'Frankfurter or hot dog sandwich, with chili, on white bread', 'Frankfurter or hot dog sandwich, with chili, on white bun', 'Frankfurter or hot dog sandwich, with chili, on whole grain white bread', 'Frankfurter or hot dog sandwich, with chili, on whole grain white bun', 'Frankfurter or hot dog sandwich, with chili, on whole wheat bread', 'Frankfurter or hot dog sandwich, with chili, on whole wheat bun', 'Frankfurter or hot dog sandwich, with meatless chili, on multigrain bread', 'Frankfurter or hot dog sandwich, with meatless chili, on multigrain bun', 'Frankfurter or hot dog sandwich, with meatless chili, on wheat bread', 'Frankfurter or hot dog sandwich, with meatless chili, on wheat bun', 'Frankfurter or hot dog sandwich, with meatless chili, on white bread', 'Frankfurter or hot dog sandwich, with meatless chili, on white bun', 'Frankfurter or hot dog sandwich, with meatless chili, on whole grain white bread', 'Frankfurter or hot dog sandwich, with meatless chili, on whole grain white bun', 'Frankfurter or hot dog sandwich, with meatless chili, on whole wheat bread', 'Frankfurter or hot dog sandwich, with meatless chili, on whole wheat bun', 'Frankfurter or hot dog, NFS', 'Frankfurter or hot dog, beef', 'Frankfurter or hot dog, beef and pork', 'Frankfurter or hot dog, beef and pork, reduced fat or light', 'Frankfurter or hot dog, beef, reduced fat or light', 'Frankfurter or hot dog, cheese-filled', 'Frankfurter or hot dog, chicken', 'Frankfurter or hot dog, meat and poultry', 'Frankfurter or hot dog, meat and poultry, fat free', 'Frankfurter or hot dog, meat and poultry, reduced fat or light', 'Frankfurter or hot dog, meatless', 'Frankfurter or hot dog, reduced fat or light, NFS', 'Frankfurter or hot dog, turkey', 'Frankfurter or hot dog, with chili, no bun', 'Frankfurters or hot dogs and sauerkraut', 'Frankfurters or hot dogs with tomato-based sauce', 'Freezer pop', 'French or Catalina dressing', 'French or Catalina dressing, fat free', 'French or Catalina dressing, light', 'French toast sticks, NFS', 'French toast sticks, from school, NFS', 'French toast sticks, plain', 'French toast sticks, plain, from fast food / restaurant', 'French toast sticks, plain, from frozen', 'French toast sticks, whole grain', 'French toast, NFS', 'French toast, from school, NFS', 'French toast, gluten free', 'French toast, gluten free, from frozen', 'French toast, plain', 'French toast, plain, from fast food / restaurant', 'French toast, plain, from frozen', 'French toast, plain, reduced fat', 'French toast, whole grain', 'French toast, whole grain, from fast food / restaurant', 'French toast, whole grain, from frozen', 'French toast, whole grain, reduced fat', 'Fried bread, Puerto Rican style', 'Fried broccoli', 'Fried cauliflower', 'Fried chicken chunks, Puerto Rican style', 'Fried eggplant', 'Fried fish with sauce, Puerto Rican style', 'Fried green beans', 'Fried green tomatoes', 'Fried mushrooms', 'Fried okra', 'Fried onion rings', 'Fried pork chunks, Puerto Rican style', 'Fried rice, Puerto Rican style', 'Fried seafood sandwich', 'Fried stuffed potatoes, Puerto Rican style', 'Fried summer squash, yellow or green', 'Fritter, apple', 'Fritter, banana', 'Fritter, berry', 'Frog legs, NS as to cooking method', 'Frog legs, steamed', 'Frozen coffee drink', 'Frozen coffee drink, decaffeinated ', 'Frozen coffee drink, decaffeinated, nonfat', 'Frozen coffee drink, decaffeinated, nonfat, with whipped cream ', 'Frozen coffee drink, decaffeinated, with non-dairy milk', 'Frozen coffee drink, decaffeinated, with non-dairy milk and whipped cream', 'Frozen coffee drink, decaffeinated, with whipped cream ', 'Frozen coffee drink, nonfat', 'Frozen coffee drink, nonfat, with whipped cream', 'Frozen coffee drink, with non-dairy milk', 'Frozen coffee drink, with non-dairy milk and whipped cream', 'Frozen coffee drink, with whipped cream', 'Frozen daiquiri', 'Frozen daiquiri mix, from frozen concentrate, reconstituted', 'Frozen daiquiri mix, frozen concentrate, not reconstituted', 'Frozen dessert, non-dairy', 'Frozen dinner, NFS', 'Frozen fruit juice bar', 'Frozen fruit juice bar, no sugar added', 'Frozen margarita', 'Frozen mocha coffee drink', 'Frozen mocha coffee drink, decaffeinated', 'Frozen mocha coffee drink, decaffeinated, nonfat', 'Frozen mocha coffee drink, decaffeinated, nonfat, with whipped cream ', 'Frozen mocha coffee drink, decaffeinated, with non-dairy milk', 'Frozen mocha coffee drink, decaffeinated, with non-dairy milk and whipped cream', 'Frozen mocha coffee drink, decaffeinated, with whipped cream', 'Frozen mocha coffee drink, nonfat', 'Frozen mocha coffee drink, nonfat, with whipped cream', 'Frozen mocha coffee drink, with non-dairy milk', 'Frozen mocha coffee drink, with non-dairy milk and whipped cream', 'Frozen mocha coffee drink, with whipped cream ', 'Frozen yogurt bar, chocolate', 'Frozen yogurt bar, vanilla', 'Frozen yogurt cone, chocolate', 'Frozen yogurt cone, chocolate, waffle cone', 'Frozen yogurt cone, vanilla', 'Frozen yogurt cone, vanilla, waffle cone', 'Frozen yogurt sandwich', 'Frozen yogurt, NFS', 'Frozen yogurt, chocolate', 'Frozen yogurt, soft serve, chocolate', 'Frozen yogurt, soft serve, vanilla', 'Frozen yogurt, vanilla', 'Fruit Supreme dessert, baby food', 'Fruit and vegetable smoothie, added protein', 'Fruit and vegetable smoothie, bottled', 'Fruit and vegetable smoothie, no dairy', 'Fruit and vegetable smoothie, non-dairy', 'Fruit and vegetable smoothie, non-dairy, added protein', 'Fruit and vegetable smoothie, with dairy', 'Fruit bar, with added vitamin C, baby food, toddler', 'Fruit butter, all flavors', 'Fruit cocktail, canned, NFS', 'Fruit cocktail, canned, in syrup', 'Fruit cocktail, canned, juice pack', 'Fruit dessert, baby food, NS as to strained or junior', 'Fruit dessert, baby food, junior', 'Fruit dessert, baby food, strained', 'Fruit flavored drink', 'Fruit flavored drink, diet', 'Fruit flavored drink, powdered, not reconstituted', 'Fruit flavored drink, powdered, not reconstituted, diet', 'Fruit flavored drink, powdered, reconstituted', 'Fruit flavored drink, powdered, reconstituted, diet', 'Fruit flavored drink, with high vitamin C', 'Fruit flavored drink, with high vitamin C, diet', 'Fruit flavored drink, with high vitamin C, powdered, not reconstituted', 'Fruit flavored drink, with high vitamin C, powdered, reconstituted', 'Fruit flavored drink, with high vitamin C, powdered, reconstituted, diet', 'Fruit flavored snack, baby food', 'Fruit juice and water drink, with high vitamin C and added calcium, baby food', 'Fruit juice beverage, 40-50% juice, citrus', 'Fruit juice blend, 100% juice', 'Fruit juice blend, citrus, 100% juice', 'Fruit juice blend, citrus, 100% juice, with calcium added', 'Fruit juice drink', 'Fruit juice drink (Capri Sun)', 'Fruit juice drink (Sunny D)', 'Fruit juice drink, added calcium (Sunny D)', 'Fruit juice drink, citrus, carbonated', 'Fruit juice drink, diet', 'Fruit juice drink, light', 'Fruit juice drink, noncitrus, carbonated', 'Fruit juice drink, reduced sugar (Sunny D)', 'Fruit juice drink, with high vitamin C', 'Fruit juice drink, with high vitamin C, light', 'Fruit juice drink, with high vitamin C, plus added calcium', 'Fruit juice, NFS', 'Fruit juice, acai blend', 'Fruit leather and fruit snacks candy', 'Fruit mixture, dried', 'Fruit mixture, frozen', 'Fruit nectar, NFS', 'Fruit peel, candied', 'Fruit punch, alcoholic', 'Fruit punch, made with fruit juice and soda', 'Fruit punch, made with soda, fruit juice, and sherbet or ice cream', 'Fruit salad, excluding citrus fruits, with marshmallows', 'Fruit salad, excluding citrus fruits, with nondairy whipped topping', 'Fruit salad, excluding citrus fruits, with pudding', 'Fruit salad, excluding citrus fruits, with salad dressing or mayonnaise', 'Fruit salad, excluding citrus fruits, with whipped cream', 'Fruit salad, fresh or raw,  excluding citrus fruits, no dressing', 'Fruit salad, fresh or raw, including citrus fruits, no dressing', 'Fruit salad, including citrus fruit, with whipped cream', 'Fruit salad, including citrus fruits, with marshmallows', 'Fruit salad, including citrus fruits, with nondairy whipped topping', 'Fruit salad, including citrus fruits, with pudding', 'Fruit salad, including citrus fruits, with salad dressing or mayonnaise', 'Fruit smoothie juice drink, no dairy', 'Fruit smoothie juice drink, with dairy', 'Fruit smoothie, NFS', 'Fruit smoothie, bottled', 'Fruit smoothie, light', 'Fruit smoothie, with whole fruit and dairy', 'Fruit smoothie, with whole fruit and dairy, added protein', 'Fruit smoothie, with whole fruit, no dairy', 'Fruit smoothie, with whole fruit, no dairy, added protein', 'Fruit smoothie, with whole fruit, non-dairy', 'Fruit snacks candy, with high vitamin C', 'Fruit, NFS', 'Fruit, baby food, NFS', 'Fruit, chocolate covered', 'Fruit, pickled', 'Fry sauce', 'Fudge, brown sugar, penuche', 'Fudge, caramel and nut, chocolate-coated candy', 'Fudge, chocolate', 'Fudge, chocolate, chocolate-coated', 'Fudge, chocolate, chocolate-coated, with nuts', 'Fudge, chocolate, with nuts', 'Fudge, divinity', 'Fudge, peanut butter', 'Fudge, peanut butter, with nuts', 'Fudge, vanilla', 'Fudge, vanilla, with nuts', 'Fudgesicle', 'Fudgesicle, light', 'Fufu', 'Fun Fruits Creme Supremes', 'Funnel cake with sugar', 'Funnel cake with sugar and fruit', 'Fuzzy Navel', 'Garbanzo bean or chickpea soup, home recipe, canned or ready-to-serve', 'Garlic bread, NFS', 'Garlic bread, from fast food / restaurant', 'Garlic bread, from frozen', 'Garlic bread, with melted cheese, from fast food / restaurant', 'Garlic bread, with melted cheese, from frozen', 'Garlic bread, with parmesan cheese, from fast food / restaurant', 'Garlic bread, with parmesan cheese, from frozen', 'Garlic egg soup, Puerto Rican style', 'Garlic sauce', 'Garlic, cooked', 'Garlic, raw', 'Gazpacho', 'Gefilte fish', 'Gelatin dessert', 'Gelatin dessert with fruit', 'Gelatin dessert, sugar free', 'Gelatin dessert, sugar free, with fruit', 'Gelatin salad with vegetables', 'Gelatin shot, alcoholic', 'Gelato, chocolate', 'Gelato, vanilla', 'General Tso chicken', 'Gerber Finger Foods, Puffs, baby food', 'Gerber Graduates Finger Snacks Cereal, baby food', 'Ghee, clarified butter', 'Gimlet', 'Gin', 'Gin Rickey', 'Gin and Tonic', 'Gin fizz', 'Ginger root, pickled', 'Gizzard, cooked', 'Glug', 'Gnocchi, cheese', 'Gnocchi, potato', 'Goat head, cooked', 'Goat ribs, cooked', 'Goat\'s milk, whole', 'Goat, baked', 'Goat, boiled', 'Goat, fried', 'Golden Cadillac', 'Goose egg, cooked', 'Goose, wild, roasted', 'Gordita, sope, or chalupa with beans', 'Gordita, sope, or chalupa with beans and sour cream', 'Gordita, sope, or chalupa with chicken', 'Gordita, sope, or chalupa with chicken and sour cream', 'Gordita, sope, or chalupa with meat', 'Gordita, sope, or chalupa with meat and sour cream', 'Gordita/sope shell, plain, no filling', 'Goulash, NFS', 'Graham crackers', 'Graham crackers (Teddy Grahams)', 'Graham crackers, chocolate covered', 'Graham crackers, reduced fat', 'Graham crackers, sandwich, with filling', 'Granola, homemade', 'Grape juice drink, light', 'Grape juice, 100%', 'Grape juice, 100%, with calcium added', 'Grape juice, baby food', 'Grape leaves stuffed with rice', 'Grapefruit juice, 100%, NS as to form', 'Grapefruit juice, 100%, canned, bottled or in a carton', 'Grapefruit juice, 100%, freshly squeezed', 'Grapefruit juice, 100%, with calcium added', 'Grapefruit juice,100%, frozen, reconstituted', 'Grapefruit, canned', 'Grapefruit, raw', 'Grapes, raw', 'Grasshopper', 'Gravy, NFS', 'Gravy, beef', 'Gravy, beef, fat free', 'Gravy, for use with vegetables', 'Gravy, made with soy sauce', 'Gravy, poultry', 'Gravy, poultry, fat free', 'Gravy, vegetarian', 'Greek Salad, no dressing', 'Green banana, cooked in salt water', 'Green banana, fried', 'Green bean casserole', 'Green beans and potatoes, baby food, strained', 'Green beans, NS as to form, cooked', 'Green beans, canned, cooked with butter or margarine', 'Green beans, canned, cooked with oil', 'Green beans, canned, cooked, fat added, NS as to fat type', 'Green beans, canned, cooked, no added fat', 'Green beans, canned, reduced sodium, cooked with butter or margarine', 'Green beans, canned, reduced sodium, cooked with oil', 'Green beans, canned, reduced sodium, cooked, fat added, NS as to fat type', 'Green beans, canned, reduced sodium, cooked, no added fat', 'Green beans, cooked, Szechuan-style', 'Green beans, cooked, as ingredient', 'Green beans, cooked, from restaurant', 'Green beans, fresh, cooked with butter or margarine', 'Green beans, fresh, cooked with oil', 'Green beans, fresh, cooked, fat added, NS as to fat type', 'Green beans, fresh, cooked, no added fat', 'Green beans, frozen, cooked with butter or margarine', 'Green beans, frozen, cooked with oil', 'Green beans, frozen, cooked, fat added, NS as to fat type', 'Green beans, frozen, cooked, no added fat', 'Green beans, pickled', 'Green beans, raw', 'Green peas, NS as to form, cooked', 'Green peas, canned, cooked with butter or margarine', 'Green peas, canned, cooked with oil', 'Green peas, canned, cooked, fat added, NS as to fat type', 'Green peas, canned, cooked, no added fat', 'Green peas, canned, reduced sodium, cooked with butter or margarine', 'Green peas, canned, reduced sodium, cooked with oil', 'Green peas, canned, reduced sodium, cooked, fat added, NS as to fat type', 'Green peas, canned, reduced sodium, cooked, no added fat', 'Green peas, cooked, from restaurant', 'Green peas, fresh, cooked with butter or margarine', 'Green peas, fresh, cooked with oil', 'Green peas, fresh, cooked, fat added, NS as to fat type', 'Green peas, fresh, cooked, no added fat', 'Green peas, frozen, cooked with butter or margarine', 'Green peas, frozen, cooked with oil', 'Green peas, frozen, cooked, fat added, NS as to fat type', 'Green peas, frozen, cooked, no added fat', 'Green peas, raw', 'Green pepper, cooked, as ingredient', 'Green plantain with cracklings, Puerto Rican style', 'Greens with ham or pork', 'Greens, NS as to form, cooked', 'Greens, canned, cooked, fat added', 'Greens, canned, cooked, no added fat', 'Greens, fresh, cooked, fat added', 'Greens, fresh, cooked, no added fat', 'Greens, frozen, cooked, fat added', 'Greens, frozen, cooked, no added fat', 'Greyhound', 'Grilled cheese sandwich, American cheese, on wheat bread', 'Grilled cheese sandwich, American cheese, on white bread', 'Grilled cheese sandwich, American cheese, on whole wheat bread', 'Grilled cheese sandwich, Cheddar cheese, on wheat bread', 'Grilled cheese sandwich, Cheddar cheese, on white bread', 'Grilled cheese sandwich, Cheddar cheese, on whole wheat bread', 'Grilled cheese sandwich, NFS', 'Grilled cheese sandwich, reduced fat American cheese, on wheat bread', 'Grilled cheese sandwich, reduced fat American cheese, on white bread', 'Grilled cheese sandwich, reduced fat American cheese, on whole wheat bread', 'Grilled cheese sandwich, reduced fat Cheddar cheese, on wheat bread', 'Grilled cheese sandwich, reduced fat Cheddar cheese, on white bread', 'Grilled cheese sandwich, reduced fat Cheddar cheese, on whole wheat bread', 'Grits, NS as to regular, quick, or instant, NS as to fat', 'Grits, NS as to regular, quick, or instant, fat added', 'Grits, NS as to regular, quick, or instant, no added fat', 'Grits, instant, made with milk, NS as to fat', 'Grits, instant, made with milk, fat added', 'Grits, instant, made with milk, no added fat', 'Grits, instant, made with non-dairy milk, NS as to fat', 'Grits, instant, made with non-dairy milk, fat added', 'Grits, instant, made with non-dairy milk, no added fat', 'Grits, instant, made with water, NS as to fat', 'Grits, instant, made with water, fat added', 'Grits, instant, made with water, no added fat', 'Grits, regular or quick, made with milk, NS as to fat', 'Grits, regular or quick, made with milk, fat added', 'Grits, regular or quick, made with milk, no added fat', 'Grits, regular or quick, made with non-dairy milk, NS as to fat', 'Grits, regular or quick, made with non-dairy milk, fat added', 'Grits, regular or quick, made with non-dairy milk, no added fat', 'Grits, regular or quick, made with water, NS as to fat', 'Grits, regular or quick, made with water, fat added', 'Grits, regular or quick, made with water, no added fat', 'Grits, with cheese, NS as to fat', 'Grits, with cheese, fat added', 'Grits, with cheese, no added fat', 'Ground beef patty, cooked', 'Ground beef with tomato sauce and taco seasonings on a cornbread crust', 'Ground beef, cooked', 'Ground beef, raw', 'Ground hog, cooked', 'Ground meat, NFS', 'Guacamole with tomatoes', 'Guacamole, NFS', 'Guava nectar', 'Guava paste', 'Guava, raw', 'Gumbo with rice', 'Gumbo, no rice', 'Gumdrops', 'Gumdrops, chocolate covered', 'Gyro sandwich (pita bread, beef, lamb, onion, condiments), with tomato and spread', 'Haddock cake or patty', 'Haddock, baked or broiled, fat added', 'Haddock, baked or broiled, no added fat', 'Haddock, coated, baked or broiled, fat added', 'Haddock, coated, baked or broiled, no added fat', 'Haddock, coated, fried', 'Haddock, cooked, NS as to cooking method', 'Haddock, smoked', 'Haddock, steamed or poached', 'Halibut, baked or broiled, made with butter', 'Halibut, baked or broiled, made with cooking spray', 'Halibut, baked or broiled, made with margarine', 'Halibut, baked or broiled, made with oil', 'Halibut, baked or broiled, no added fat', 'Halibut, coated, baked or broiled, made with butter', 'Halibut, coated, baked or broiled, made with cooking spray', 'Halibut, coated, baked or broiled, made with margarine', 'Halibut, coated, baked or broiled, made with oil', 'Halibut, coated, baked or broiled, no added fat', 'Halibut, coated, fried, made with butter', 'Halibut, coated, fried, made with cooking spray', 'Halibut, coated, fried, made with margarine', 'Halibut, coated, fried, made with oil', 'Halibut, coated, fried, no added fat', 'Halibut, cooked, NS as to cooking method', 'Halibut, raw', 'Halibut, smoked', 'Halibut, steamed or poached', 'Halvah, chocolate covered', 'Halvah, plain', 'Ham and cheese on English muffin', 'Ham and cheese sandwich, on bun, with lettuce and spread', 'Ham and cheese sandwich, with lettuce and spread', 'Ham and cheese submarine sandwich, with lettuce, tomato and spread', 'Ham and noodles with cream or white sauce', 'Ham and noodles, no sauce', 'Ham and pork, canned luncheon meat, chopped, minced, pressed, spiced', 'Ham and rice with mushroom sauce', 'Ham and vegetables excluding carrots, broccoli, and dark-green leafy; no potatoes, no sauce', 'Ham and vegetables including carrots broccoli, and/or dark- green leafy; no potatoes, no sauce', 'Ham croquette', 'Ham luncheon meat, loaf type', 'Ham on biscuit', 'Ham or pork and potatoes with cheese sauce', 'Ham or pork and potatoes with gravy', 'Ham or pork and rice, no sauce', 'Ham or pork salad', 'Ham or pork with barbecue sauce', 'Ham or pork with gravy', 'Ham or pork with mushroom sauce', 'Ham or pork with stuffing', 'Ham or pork with tomato-based sauce', 'Ham or pork, noodles and vegetables excluding carrots, broccoli, and dark-green leafy; cheese sauce', 'Ham or pork, noodles and vegetables excluding carrots, broccoli, and dark-green leafy; no sauce', 'Ham or pork, noodles, and vegetables including carrots, broccoli, and/or dark-green leafy; no sauce', 'Ham or pork, noodles, and vegetables including carrots, broccoli, and/or dark-green leafy; tomato-based sauce', 'Ham pot pie', 'Ham salad sandwich', 'Ham salad spread', 'Ham sandwich with lettuce and spread', 'Ham sandwich, with spread', 'Ham stroganoff', 'Ham, baby food, strained', 'Ham, breaded or floured, fried, NS as to fat eaten', 'Ham, breaded or floured, fried, lean and fat eaten', 'Ham, breaded or floured, fried, lean only eaten', 'Ham, for use with vegetables', 'Ham, fresh, cooked, NS as to fat eaten', 'Ham, fresh, cooked, lean and fat eaten', 'Ham, fresh, cooked, lean only eaten', 'Ham, fried, NS as to fat eaten', 'Ham, fried, lean and fat eaten', 'Ham, fried, lean only eaten', 'Ham, noodle, and vegetable soup, Puerto Rican style', 'Ham, pork and chicken, canned luncheon meat, chopped, minced, pressed, spiced, reduced fat and reduced sodium', 'Ham, pork, and chicken, canned luncheon meat, chopped, minced, pressed, spiced, reduced sodium', 'Ham, potatoes, and vegetables excluding carrots, broccoli, and dark-green leafy; no sauce', 'Ham, potatoes, and vegetables including carrots, broccoli, and/or dark-green leafy; no sauce', 'Ham, prepackaged or deli, luncheon meat', 'Ham, prepackaged or deli, luncheon meat, reduced sodium', 'Ham, prosciutto', 'Ham, smoked or cured, canned, NS as to fat eaten', 'Ham, smoked or cured, canned, lean and fat eaten', 'Ham, smoked or cured, canned, lean only eaten', 'Ham, smoked or cured, cooked, NS as to fat eaten', 'Ham, smoked or cured, cooked, lean and fat eaten', 'Ham, smoked or cured, cooked, lean only eaten', 'Ham, smoked or cured, ground patty', 'Hamburger (Burger King)', 'Hamburger (McDonalds)', 'Hamburger slider', 'Hamburger slider, from fast food', 'Hamburger wrap sandwich, from fast food', 'Hamburger, NFS', 'Hamburger, from fast food, 1 large patty', 'Hamburger, from fast food, 1 medium patty', 'Hamburger, from fast food, 1 small patty', 'Hamburger, from school cafeteria', 'Hamburger, on wheat bun, 1 large patty', 'Hamburger, on wheat bun, 1 medium patty', 'Hamburger, on wheat bun, 1 small patty', 'Hamburger, on white bun, 1 large patty', 'Hamburger, on white bun, 1 medium patty', 'Hamburger, on white bun, 1 small patty', 'Hard candy', 'Hard cider', 'Hash, NS as to type of meat', 'Haupia', 'Hayacas, Puerto Rican style', 'Hazelnuts', 'Head cheese', 'Heart, cooked', 'Herring, baked or broiled, fat added', 'Herring, baked or broiled, no added fat', 'Herring, coated, baked or broiled, fat added', 'Herring, coated, baked or broiled, no added fat', 'Herring, coated, fried', 'Herring, cooked, NS as to cooking method', 'Herring, dried, salted', 'Herring, pickled', 'Herring, pickled, in cream sauce', 'Herring, raw', 'Herring, smoked, kippered', 'High ball', 'Hog maws, cooked', 'Hoisin sauce', 'Hollandaise sauce', 'Hominy, cooked', 'Honey', 'Honey butter', 'Honey mustard dip', 'Honey mustard dressing', 'Honey mustard dressing, fat free', 'Honey mustard dressing, light', 'Honey-combed hard candy with peanut butter', 'Honey-combed hard candy with peanut butter, chocolate covered', 'Honeydew melon, raw', 'Horchata beverage, made with milk', 'Horchata beverage, made with water', 'Hors d\'oeuvres, with spread', 'Horseradish', 'Horseradish sauce', 'Hot Thai sauce', 'Hot and sour soup', 'Hot chocolate / Cocoa, made with dry mix and fat free milk', 'Hot chocolate / Cocoa, made with dry mix and low fat milk', 'Hot chocolate / Cocoa, made with dry mix and non-dairy milk', 'Hot chocolate / Cocoa, made with dry mix and reduced fat milk', 'Hot chocolate / Cocoa, made with dry mix and water', 'Hot chocolate / Cocoa, made with dry mix and whole milk', 'Hot chocolate / Cocoa, made with no sugar added dry mix and fat free milk', 'Hot chocolate / Cocoa, made with no sugar added dry mix and low fat milk', 'Hot chocolate / Cocoa, made with no sugar added dry mix and non-dairy milk', 'Hot chocolate / Cocoa, made with no sugar added dry mix and reduced fat milk', 'Hot chocolate / Cocoa, made with no sugar added dry mix and water', 'Hot chocolate / Cocoa, made with no sugar added dry mix and whole milk', 'Hot chocolate / Cocoa, ready to drink', 'Hot chocolate / Cocoa, ready to drink, made with non-dairy milk', 'Hot chocolate / Cocoa, ready to drink, made with non-dairy milk and whipped cream', 'Hot chocolate / Cocoa, ready to drink, made with nonfat milk', 'Hot chocolate / Cocoa, ready to drink, made with nonfat milk and whipped cream', 'Hot chocolate / Cocoa, ready to drink, with whipped cream', 'Hot ham and cheese sandwich, on bun', 'Hot pepper sauce', 'Hot peppers, cooked', 'Huevos rancheros', 'Hummus, flavored', 'Hummus, plain', 'Hunan beef', 'Hush puppy', 'Ice cream bar, chocolate', 'Ice cream bar, vanilla', 'Ice cream bar, vanilla, chocolate coated', 'Ice cream cake', 'Ice cream candy bar', 'Ice cream cone, NFS', 'Ice cream cone, chocolate, prepackaged', 'Ice cream cone, scooped, chocolate', 'Ice cream cone, scooped, chocolate, waffle cone', 'Ice cream cone, scooped, vanilla', 'Ice cream cone, scooped, vanilla, waffle cone', 'Ice cream cone, soft serve, chocolate', 'Ice cream cone, soft serve, chocolate, waffle cone', 'Ice cream cone, soft serve, vanilla', 'Ice cream cone, soft serve, vanilla, waffle cone', 'Ice cream cone, vanilla, prepackaged', 'Ice cream cookie sandwich', 'Ice cream sandwich, chocolate', 'Ice cream sandwich, vanilla', 'Ice cream soda, chocolate', 'Ice cream soda, flavors other than chocolate', 'Ice cream sundae, NFS', 'Ice cream sundae, caramel topping', 'Ice cream sundae, fruit topping', 'Ice cream sundae, hot fudge topping', 'Ice cream, NFS', 'Ice cream, chocolate', 'Ice cream, chocolate, with additional ingredients', 'Ice cream, fried', 'Ice cream, soft serve, chocolate', 'Ice cream, soft serve, vanilla', 'Ice cream, vanilla', 'Ice cream, vanilla, with additional ingredients', 'Iced Coffee, brewed', 'Iced Coffee, brewed, decaffeinated', 'Iced Coffee, pre-lightened and pre-sweetened ', 'Iced Tea / Lemonade juice drink', 'Iced Tea / Lemonade juice drink, diet', 'Iced Tea / Lemonade juice drink, light', 'Icing, chocolate', 'Icing, white', 'Imitation cheese', 'Industrial oil as ingredient in food', 'Infant formula, NFS', 'Infant formula, NS as to form (Enfamil A.R.)', 'Infant formula, NS as to form (Enfamil EnfaCare)', 'Infant formula, NS as to form (Enfamil Enfagrow Toddler Transitions Gentlease)', 'Infant formula, NS as to form (Enfamil Enfagrow Toddler Transitions Soy)', 'Infant formula, NS as to form (Enfamil Enfagrow Toddler Transitions)', 'Infant formula, NS as to form (Enfamil Gentlease)', 'Infant formula, NS as to form (Enfamil Infant)', 'Infant formula, NS as to form (Enfamil Newborn)', 'Infant formula, NS as to form (Enfamil Nutramigen)', 'Infant formula, NS as to form (Enfamil Pregestimil)', 'Infant formula, NS as to form (Enfamil ProSobee)', 'Infant formula, NS as to form (Gerber Good Start Gentle)', 'Infant formula, NS as to form (Gerber Good Start Protect)', 'Infant formula, NS as to form (Gerber Good Start Soy)', 'Infant formula, NS as to form (Gerber Graduates Gentle)', 'Infant formula, NS as to form (Gerber Graduates Protect)', 'Infant formula, NS as to form (Gerber Graduates Soy)', 'Infant formula, NS as to form (PediaSure)', 'Infant formula, NS as to form (PurAmino)', 'Infant formula, NS as to form (Similac Advance Organic)', 'Infant formula, NS as to form (Similac Advance)', 'Infant formula, NS as to form (Similac Expert Care Alimentum)', 'Infant formula, NS as to form (Similac Expert Care NeoSure)', 'Infant formula, NS as to form (Similac Expert Care for Diarrhea)', 'Infant formula, NS as to form (Similac Go and Grow)', 'Infant formula, NS as to form (Similac Isomil Soy)', 'Infant formula, NS as to form (Similac Sensitive)', 'Infant formula, NS as to form (Similac for Spit-Up)', 'Infant formula, NS as to form (Store Brand Soy)', 'Infant formula, NS as to form (Store Brand)', 'Infant formula, liquid concentrate, made with baby water (Enfamil Infant)', 'Infant formula, liquid concentrate, made with baby water (Enfamil ProSobee)', 'Infant formula, liquid concentrate, made with baby water (Gerber Good Start Gentle)', 'Infant formula, liquid concentrate, made with baby water (Gerber Good Start Soy)', 'Infant formula, liquid concentrate, made with baby water (Similac Advance)', 'Infant formula, liquid concentrate, made with baby water (Similac Isomil Soy)', 'Infant formula, liquid concentrate, made with baby water (Similac Sensitive)', 'Infant formula, liquid concentrate, made with baby water (Store Brand)', 'Infant formula, liquid concentrate, made with plain bottled water (Enfamil Infant)', 'Infant formula, liquid concentrate, made with plain bottled water (Enfamil ProSobee)', 'Infant formula, liquid concentrate, made with plain bottled water (Gerber Good Start Gentle)', 'Infant formula, liquid concentrate, made with plain bottled water (Gerber Good Start Soy)', 'Infant formula, liquid concentrate, made with plain bottled water (Similac Advance)', 'Infant formula, liquid concentrate, made with plain bottled water (Similac Isomil Soy)', 'Infant formula, liquid concentrate, made with plain bottled water (Similac Sensitive)', 'Infant formula, liquid concentrate, made with plain bottled water (Store Brand)', 'Infant formula, liquid concentrate, made with tap water (Enfamil Infant)', 'Infant formula, liquid concentrate, made with tap water (Enfamil ProSobee)', 'Infant formula, liquid concentrate, made with tap water (Gerber Good Start Gentle)', 'Infant formula, liquid concentrate, made with tap water (Gerber Good Start Soy)', 'Infant formula, liquid concentrate, made with tap water (Similac Advance)', 'Infant formula, liquid concentrate, made with tap water (Similac Isomil Soy)', 'Infant formula, liquid concentrate, made with tap water (Similac Sensitive)', 'Infant formula, liquid concentrate, made with tap water (Store Brand)', 'Infant formula, liquid concentrate, made with water, NFS (Enfamil Infant)', 'Infant formula, liquid concentrate, made with water, NFS (Enfamil Nutramigen)', 'Infant formula, liquid concentrate, made with water, NFS (Enfamil ProSobee)', 'Infant formula, liquid concentrate, made with water, NFS (Gerber Good Start Gentle)', 'Infant formula, liquid concentrate, made with water, NFS (Gerber Good Start Soy)', 'Infant formula, liquid concentrate, made with water, NFS (Similac Advance)', 'Infant formula, liquid concentrate, made with water, NFS (Similac Isomil Soy)', 'Infant formula, liquid concentrate, made with water, NFS (Similac Sensitive)', 'Infant formula, liquid concentrate, made with water, NFS (Store Brand Soy)', 'Infant formula, liquid concentrate, made with water, NFS (Store Brand)', 'Infant formula, powder, made with baby water (Enfamil A.R.)', 'Infant formula, powder, made with baby water (Enfamil EnfaCare)', 'Infant formula, powder, made with baby water (Enfamil Enfagrow Toddler Transitions Gentlease)', 'Infant formula, powder, made with baby water (Enfamil Enfagrow Toddler Transitions)', 'Infant formula, powder, made with baby water (Enfamil Gentlease)', 'Infant formula, powder, made with baby water (Enfamil Infant)', 'Infant formula, powder, made with baby water (Enfamil Newborn)', 'Infant formula, powder, made with baby water (Enfamil ProSobee)', 'Infant formula, powder, made with baby water (Gerber Good Start Gentle)', 'Infant formula, powder, made with baby water (Gerber Good Start Protect)', 'Infant formula, powder, made with baby water (Gerber Good Start Soy)', 'Infant formula, powder, made with baby water (Similac Advance Organic)', 'Infant formula, powder, made with baby water (Similac Advance)', 'Infant formula, powder, made with baby water (Similac Expert Care Alimentum)', 'Infant formula, powder, made with baby water (Similac Expert Care NeoSure)', 'Infant formula, powder, made with baby water (Similac Isomil Soy)', 'Infant formula, powder, made with baby water (Similac Sensitive)', 'Infant formula, powder, made with baby water (Store Brand Soy)', 'Infant formula, powder, made with baby water (Store Brand)', 'Infant formula, powder, made with plain bottled water (Enfamil A.R.)', 'Infant formula, powder, made with plain bottled water (Enfamil EnfaCare)', 'Infant formula, powder, made with plain bottled water (Enfamil Enfagrow Toddler Transitions Gentlease)', 'Infant formula, powder, made with plain bottled water (Enfamil Enfagrow Toddler Transitions)', 'Infant formula, powder, made with plain bottled water (Enfamil Gentlease)', 'Infant formula, powder, made with plain bottled water (Enfamil Infant)', 'Infant formula, powder, made with plain bottled water (Enfamil Newborn)', 'Infant formula, powder, made with plain bottled water (Enfamil ProSobee)', 'Infant formula, powder, made with plain bottled water (Gerber Good Start Gentle)', 'Infant formula, powder, made with plain bottled water (Gerber Good Start Protect)', 'Infant formula, powder, made with plain bottled water (Gerber Good Start Soy)', 'Infant formula, powder, made with plain bottled water (Similac Advance Organic)', 'Infant formula, powder, made with plain bottled water (Similac Advance)', 'Infant formula, powder, made with plain bottled water (Similac Expert Care Alimentum)', 'Infant formula, powder, made with plain bottled water (Similac Expert Care NeoSure)', 'Infant formula, powder, made with plain bottled water (Similac Isomil Soy)', 'Infant formula, powder, made with plain bottled water (Similac Sensitive)', 'Infant formula, powder, made with plain bottled water (Store Brand Soy)', 'Infant formula, powder, made with plain bottled water (Store Brand)', 'Infant formula, powder, made with tap water (Enfamil A.R.)', 'Infant formula, powder, made with tap water (Enfamil EnfaCare)', 'Infant formula, powder, made with tap water (Enfamil Enfagrow Toddler Transitions Gentlease)', 'Infant formula, powder, made with tap water (Enfamil Enfagrow Toddler Transitions)', 'Infant formula, powder, made with tap water (Enfamil Gentlease)', 'Infant formula, powder, made with tap water (Enfamil Infant)', 'Infant formula, powder, made with tap water (Enfamil Newborn)', 'Infant formula, powder, made with tap water (Enfamil ProSobee)', 'Infant formula, powder, made with tap water (Gerber Good Start Gentle)', 'Infant formula, powder, made with tap water (Gerber Good Start Protect)', 'Infant formula, powder, made with tap water (Gerber Good Start Soy)', 'Infant formula, powder, made with tap water (Similac Advance Organic)', 'Infant formula, powder, made with tap water (Similac Advance)', 'Infant formula, powder, made with tap water (Similac Expert Care Alimentum)', 'Infant formula, powder, made with tap water (Similac Expert Care NeoSure)', 'Infant formula, powder, made with tap water (Similac Isomil Soy)', 'Infant formula, powder, made with tap water (Similac Sensitive)', 'Infant formula, powder, made with tap water (Store Brand Soy)', 'Infant formula, powder, made with tap water (Store Brand)', 'Infant formula, powder, made with water, NFS (Enfamil A.R.)', 'Infant formula, powder, made with water, NFS (Enfamil EnfaCare)', 'Infant formula, powder, made with water, NFS (Enfamil Enfagrow Toddler Transitions Gentlease)', 'Infant formula, powder, made with water, NFS (Enfamil Enfagrow Toddler Transitions Soy)', 'Infant formula, powder, made with water, NFS (Enfamil Enfragrow Toddler Transitions)', 'Infant formula, powder, made with water, NFS (Enfamil Gentlease)', 'Infant formula, powder, made with water, NFS (Enfamil Infant)', 'Infant formula, powder, made with water, NFS (Enfamil Newborn)', 'Infant formula, powder, made with water, NFS (Enfamil Nutramigen)', 'Infant formula, powder, made with water, NFS (Enfamil Pregestimil)', 'Infant formula, powder, made with water, NFS (Enfamil ProSobee)', 'Infant formula, powder, made with water, NFS (Gerber Good Start Gentle)', 'Infant formula, powder, made with water, NFS (Gerber Good Start Protect)', 'Infant formula, powder, made with water, NFS (Gerber Good Start Soy)', 'Infant formula, powder, made with water, NFS (PurAmino)', 'Infant formula, powder, made with water, NFS (Similac Advance Organic)', 'Infant formula, powder, made with water, NFS (Similac Advance)', 'Infant formula, powder, made with water, NFS (Similac Expert Care Alimentum)', 'Infant formula, powder, made with water, NFS (Similac Expert Care NeoSure)', 'Infant formula, powder, made with water, NFS (Similac Go and Grow)', 'Infant formula, powder, made with water, NFS (Similac Isomil Soy)', 'Infant formula, powder, made with water, NFS (Similac Sensitive)', 'Infant formula, powder, made with water, NFS (Similac for Spit-Up)', 'Infant formula, powder, made with water, NFS (Store Brand Soy)', 'Infant formula, powder, made with water, NFS (Store Brand)', 'Infant formula, ready-to-feed (Enfamil A.R.)', 'Infant formula, ready-to-feed (Enfamil EnfaCare)', 'Infant formula, ready-to-feed (Enfamil Enfragrow Toddler Transitions)', 'Infant formula, ready-to-feed (Enfamil Gentlease)', 'Infant formula, ready-to-feed (Enfamil Infant)', 'Infant formula, ready-to-feed (Enfamil Newborn)', 'Infant formula, ready-to-feed (Enfamil Nutramigen)', 'Infant formula, ready-to-feed (Enfamil Pregestimil)', 'Infant formula, ready-to-feed (Enfamil ProSobee)', 'Infant formula, ready-to-feed (Gerber Good Start Gentle)', 'Infant formula, ready-to-feed (Gerber Good Start Soy)', 'Infant formula, ready-to-feed (PediaSure)', 'Infant formula, ready-to-feed (Similac Advance Organic)', 'Infant formula, ready-to-feed (Similac Advance)', 'Infant formula, ready-to-feed (Similac Expert Care Alimentum)', 'Infant formula, ready-to-feed (Similac Expert Care NeoSure)', 'Infant formula, ready-to-feed (Similac Expert Care for Diarrhea)', 'Infant formula, ready-to-feed (Similac Isomil Soy)', 'Infant formula, ready-to-feed (Similac Sensitive)', 'Infant formula, ready-to-feed (Similac for Spit-Up)', 'Infant formula, ready-to-feed (Store Brand)', 'Infant formula, ready-to-feed (Store brand Soy)', 'Infant formula, ready-to-feed, low iron (Enfamil Premature 20 Cal)', 'Infant formula, ready-to-feed, with iron (Enfamil Premature 20 Cal)', 'Infant formula, with fiber, NS as to form (PediaSure Fiber)', 'Infant formula, with fiber, ready-to-feed (PediaSure Fiber)', 'Injera, Ethiopian bread', 'Instant soup, noodle', 'Instant soup, noodle with egg, shrimp or chicken', 'Irish Coffee', 'Italian Ice', 'Italian Ice, no sugar added', 'Italian Wedding Soup', 'Italian dressing, fat free', 'Italian dressing, light', 'Italian dressing, made with vinegar and oil', 'Italian sausage', 'Jagerbomb', 'Jai, Monk\'s Food', 'Jam, preserve, all flavors', 'Jam, preserve, marmalade, reduced sugar, all flavors', 'Jam, preserve, marmalade, sugar free, all flavors', 'Jam, preserve, marmalade, sweetened with fruit juice concentrates, all flavors', 'Jambalaya with meat and rice', 'Jelly sandwich, reduced sugar jelly, on wheat bread', 'Jelly sandwich, reduced sugar jelly, on white bread', 'Jelly sandwich, reduced sugar jelly, on whole wheat bread', 'Jelly sandwich, regular jelly, NFS', 'Jelly sandwich, regular jelly, on wheat bread', 'Jelly sandwich, regular jelly, on white bread', 'Jelly sandwich, regular jelly, on whole wheat bread', 'Jelly, all flavors', 'Jelly, reduced sugar, all flavors', 'Jelly, sugar free, all flavors', 'Jicama, raw', 'Johnnycake', 'Julienne salad, meat, cheese, eggs, vegetables, no dressing', 'Kale, NS as to form, cooked', 'Kale, canned, cooked, fat added', 'Kale, canned, cooked, no added fat', 'Kale, fresh, cooked, fat added', 'Kale, fresh, cooked, no added fat', 'Kale, frozen, cooked, fat added', 'Kale, frozen, cooked, no added fat', 'Kale, raw', 'Kamikaze', 'Kefir, NS as to fat content', 'Ketchup', 'Ketchup, reduced sodium', 'Kibby, Puerto Rican style', 'Kidney beans and brown rice', 'Kidney beans and rice, from fast food / restaurant', 'Kidney beans and white rice', 'Kidney beans with meat', 'Kidney beans, NFS', 'Kidney beans, from canned, fat added', 'Kidney beans, from canned, no added fat', 'Kidney beans, from canned, reduced sodium', 'Kidney beans, from dried, fat added', 'Kidney beans, from dried, no added fat', 'Kidney beans, from fast food / restaurant', 'Kidney, cooked', 'Kimchi', 'Kishke, stuffed derma', 'Kit Kat', 'Kit Kat White', 'Kiwi fruit, raw', 'Knish, cheese', 'Knish, meat', 'Knish, potato', 'Knockwurst', 'Kohlrabi, cooked', 'Kohlrabi, raw', 'Korean dressing or marinade', 'Kumquat, raw', 'Kung Pao beef', 'Kung Pao pork', 'Kung Pao shrimp', 'Kung pao chicken', 'Ladoo, round ball, Asian-Indian dessert', 'Lamb chop, NS as to cut, cooked, NS as to fat eaten', 'Lamb chop, NS as to cut, cooked, lean and fat eaten', 'Lamb chop, NS as to cut, cooked, lean only eaten', 'Lamb hocks, cooked', 'Lamb or mutton and noodles with gravy', 'Lamb or mutton and potatoes with gravy', 'Lamb or mutton and potatoes with tomato-based sauce', 'Lamb or mutton goulash', 'Lamb or mutton loaf', 'Lamb or mutton stew with potatoes and vegetables excluding carrots, broccoli, and dark-green leafy; gravy', 'Lamb or mutton stew with potatoes and vegetables excluding carrots, broccoli, and dark-green leafy; tomato-based sauce', 'Lamb or mutton stew with potatoes and vegetables including carrots, broccoli, and/or dark-green leafy; gravy', 'Lamb or mutton stew with potatoes and vegetables including carrots, broccoli, and/or dark-green leafy; tomato-based sauce', 'Lamb or mutton stew with vegetables excluding carrots, broccoli, and dark-green leafy; no potatoes, gravy', 'Lamb or mutton stew with vegetables including carrots, broccoli, and/or dark-green leafy; no potatoes, gravy', 'Lamb or mutton with gravy', 'Lamb or mutton, rice, and vegetables  including carrots, broccoli, and/or dark-green leafy; gravy', 'Lamb or mutton, rice, and vegetables excluding carrots, broccoli, and dark-green leafy; gravy', 'Lamb or mutton, rice, and vegetables including carrots, broccoli, and/or dark-green leafy; tomato-based sauce', 'Lamb shish kabob with vegetables, excluding potatoes', 'Lamb, NS as to cut, cooked', 'Lamb, baby food, strained', 'Lamb, ground or patty, cooked', 'Lamb, loin chop, cooked, NS as to fat eaten', 'Lamb, loin chop, cooked, lean and fat eaten', 'Lamb, loin chop, cooked, lean only eaten', 'Lamb, pasta, and vegetable soup, Puerto Rican style', 'Lamb, ribs, cooked, NS as to fat eaten', 'Lamb, ribs, cooked, lean and fat eaten', 'Lamb, ribs, cooked, lean only eaten', 'Lamb, roast, cooked, NS as to fat eaten', 'Lamb, roast, cooked, lean and fat eaten', 'Lamb, roast, cooked, lean only eaten', 'Lamb, shoulder chop, cooked, NS as to fat eaten', 'Lamb, shoulder chop, cooked, lean and fat eaten', 'Lamb, shoulder chop, cooked, lean only eaten', 'Lambsquarter, cooked', 'Lard', 'Lasagna with cheese and meat sauce, diet frozen meal', 'Lasagna with chicken or turkey', 'Lasagna with meat', 'Lasagna with meat and spinach', 'Lasagna with meat, canned', 'Lasagna with meat, from restaurant', 'Lasagna with meat, frozen', 'Lasagna with meat, home recipe', 'Lasagna, meatless', 'Lasagna, meatless, with vegetables', 'Lasagna, with chicken or turkey, and spinach', 'Lau lau', 'Layer dip', 'Leek soup, cream of, prepared with milk', 'Leek, cooked', 'Leek, raw', 'Lefse (Norwegian)', 'Lemon juice, 100%, NS as to form', 'Lemon juice, 100%, canned or bottled', 'Lemon juice, 100%, freshly squeezed', 'Lemon pie filling', 'Lemon, raw', 'Lemon-butter sauce', 'Lemonade, frozen concentrate, not reconstituted', 'Lemonade, fruit flavored drink', 'Lemonade, fruit juice drink', 'Lemonade, fruit juice drink, light', 'Lentil curry', 'Lentil curry with rice', 'Lentil soup, home recipe, canned, or ready-to-serve', 'Lentils, NFS', 'Lentils, from canned', 'Lentils, from dried, fat added', 'Lentils, from dried, no added fat', 'Lettuce, Boston, raw', 'Lettuce, arugula, raw', 'Lettuce, cooked', 'Lettuce, for use on a sandwich', 'Lettuce, raw', 'Lettuce, salad with assorted vegetables excluding tomatoes and carrots, no dressing', 'Lettuce, salad with assorted vegetables including tomatoes and/or carrots, no dressing', 'Lettuce, salad with avocado, tomato, and/or carrots, with or without other vegetables, no dressing', 'Lettuce, salad with cheese, tomato and/or carrots, with or without other vegetables, no dressing', 'Lettuce, salad with egg, cheese, tomato, and/or carrots, with or without other vegetables, no dressing', 'Lettuce, salad with egg, tomato, and/or carrots, with or without other vegetables, no dressing', 'Lettuce, wilted, with bacon dressing', 'Licorice', 'Licuado or Batido', 'Light ice cream bar, chocolate', 'Light ice cream bar, vanilla', 'Light ice cream bar, vanilla, chocolate coated', 'Light ice cream cone, chocolate, prepackaged', 'Light ice cream cone, vanilla, prepackaged', 'Light ice cream sandwich, chocolate', 'Light ice cream sandwich, vanilla', 'Light ice cream, NFS', 'Light ice cream, chocolate', 'Light ice cream, vanilla', 'Lima bean soup, home recipe, canned or ready-to-serve', 'Lima beans and corn, cooked, fat added', 'Lima beans and corn, cooked, no added fat', 'Lima beans, NFS', 'Lima beans, from canned', 'Lima beans, from dried', 'Lima beans, from frozen, fat added', 'Lima beans, from frozen, no added fat', 'Lime juice, 100%, NS as to form', 'Lime juice, 100%, canned or bottled', 'Lime juice, 100%, freshly squeezed', 'Lime souffle', 'Lime, raw', 'Linguini with vegetables and seafood in white wine sauce, diet frozen meal', 'Liqueur with cream', 'Liquid from stewed kidney beans, Puerto Rican style', 'Liver dumpling', 'Liver paste or pate, chicken', 'Liver, beef or calves, and onions', 'Livers, chicken, chopped, with eggs and onion', 'Liverwurst', 'Lo mein, NFS', 'Lo mein, meatless', 'Lo mein, with beef', 'Lo mein, with chicken', 'Lo mein, with pork', 'Lo mein, with shrimp', 'Lobster bisque', 'Lobster gumbo', 'Lobster newburg', 'Lobster salad', 'Lobster with bread stuffing, baked', 'Lobster with butter sauce', 'Lobster with sauce, Puerto Rican style', 'Lobster, baked or broiled, fat added', 'Lobster, baked or broiled, no added fat', 'Lobster, canned', 'Lobster, coated, baked or broiled, fat added', 'Lobster, coated, baked or broiled, no added fat', 'Lobster, coated, fried', 'Lobster, cooked, NS as to cooking method', 'Lobster, steamed or boiled', 'Lomi salmon', 'Long Island iced tea', 'Long rice noodles, made from mung beans, cooked', 'Lotus root, cooked', 'Luffa, cooked', 'Luncheon meat sandwich, NFS, with spread', 'Luncheon meat, NFS', 'Luncheon meat, loaf type', 'Luncheon slice, meatless-beef, chicken, salami or turkey', 'Lychee', 'M&M\'s Almond Chocolate Candies', 'M&M\'s Milk Chocolate Candies', 'M&M\'s Peanut Butter Chocolate Candies', 'M&M\'s Peanut Chocolate Candies', 'M&M\'s Pretzel Chocolate Candies', 'MARS Almond Bar', 'MILKY WAY Bar', 'MILKY WAY MIDNIGHT Bar', 'Macadamia nuts', 'Macaroni and cheese, baby food, strained', 'Macaroni and cheese, baby food, toddler', 'Macaroni and cheese, diet frozen meal', 'Macaroni or noodles with cheese', 'Macaroni or noodles with cheese and chicken or turkey', 'Macaroni or noodles with cheese and egg', 'Macaroni or noodles with cheese and frankfurters or hot dogs', 'Macaroni or noodles with cheese and meat', 'Macaroni or noodles with cheese and meat, prepared from Hamburger Helper mix ', 'Macaroni or noodles with cheese and tomato', 'Macaroni or noodles with cheese and tuna', 'Macaroni or noodles with cheese, Easy Mac type', 'Macaroni or noodles with cheese, canned', 'Macaroni or noodles with cheese, from restaurant', 'Macaroni or noodles with cheese, made from packaged mix', 'Macaroni or noodles with cheese, made from reduced fat packaged mix', 'Macaroni or noodles with cheese, whole grain', 'Macaroni or noodles, creamed, with cheese', 'Macaroni or noodles, creamed, with cheese and tuna', 'Macaroni or pasta salad with cheese', 'Macaroni or pasta salad with chicken', 'Macaroni or pasta salad with crab meat', 'Macaroni or pasta salad with egg', 'Macaroni or pasta salad with meat', 'Macaroni or pasta salad with shrimp', 'Macaroni or pasta salad with tuna', 'Macaroni or pasta salad with tuna and egg', 'Macaroni or pasta salad, made with Italian dressing', 'Macaroni or pasta salad, made with any type of fat free dressing', 'Macaroni or pasta salad, made with creamy dressing', 'Macaroni or pasta salad, made with light Italian dressing', 'Macaroni or pasta salad, made with light creamy dressing', 'Macaroni or pasta salad, made with light mayonnaise', 'Macaroni or pasta salad, made with light mayonnaise-type salad dressing', 'Macaroni or pasta salad, made with mayonnaise', 'Macaroni or pasta salad, made with mayonnaise-type salad dressing', 'Macaroni with beef and tomato sauce, baby food, toddler', 'Macaroni with tuna, Puerto Rican style', 'Macaroni with vegetables, baby food, strained', 'Macaroni, tomatoes, and beef, baby food, NS as to strained or junior', 'Macaroni, tomatoes, and beef, baby food, junior', 'Macaroni, tomatoes, and beef, baby food, strained', 'Mackerel cake or patty', 'Mackerel, baked or broiled, fat added', 'Mackerel, baked or broiled, no added fat', 'Mackerel, canned', 'Mackerel, coated, baked or broiled, fat added', 'Mackerel, coated, baked or broiled, no added fat', 'Mackerel, coated, fried', 'Mackerel, cooked, NS as to cooking method', 'Mackerel, pickled', 'Mackerel, raw', 'Mackerel, smoked', 'Mai Tai', 'Mango dessert, baby food', 'Mango nectar', 'Mango, canned', 'Mango, dried', 'Mango, frozen', 'Mango, raw', 'Manhattan', 'Manicotti, cheese-filled, no sauce', 'Manicotti, cheese-filled, with meat sauce', 'Manicotti, cheese-filled, with tomato sauce, meatless', 'Manicotti, vegetable- and cheese-filled, with tomato sauce, meatless', 'Margarine, NFS', 'Margarine, stick', 'Margarine, tub', 'Margarine-oil blend, NFS', 'Margarine-oil blend, stick', 'Margarine-oil blend, stick, light', 'Margarine-oil blend, tub', 'Margarine-oil blend, tub, light', 'Margarita', 'Margarita mix, nonalcoholic', 'Marie biscuit', 'Marmalade, all flavors', 'Marshmallow', 'Marshmallow, candy-coated', 'Marshmallow, chocolate covered', 'Martini', 'Martini, flavored', 'Masa harina, cooked', 'Matzo ball soup', 'Mayonnaise, fat free', 'Mayonnaise, light', 'Mayonnaise, reduced fat,  with olive oil', 'Mayonnaise, regular', 'Mayonnaise-type salad dressing', 'Mayonnaise-type salad dressing, light', 'McDouble (McDonalds)', 'Meat and corn hominy soup, home recipe, Mexican style', 'Meat broth, Puerto Rican style', 'Meat loaf dinner, NFS, frozen meal', 'Meat loaf made with beef', 'Meat loaf made with beef and pork', 'Meat loaf made with beef and pork, with tomato-based sauce', 'Meat loaf made with beef, veal and pork', 'Meat loaf made with beef, with tomato-based sauce', 'Meat loaf made with chicken or turkey', 'Meat loaf made with chicken or turkey, with tomato-based sauce', 'Meat loaf made with ham', 'Meat loaf made with venison/deer', 'Meat loaf with potatoes, vegetable, frozen meal', 'Meat loaf, NS as to type of meat', 'Meat loaf, Puerto Rican style', 'Meat pie, NFS', 'Meat pie, Puerto Rican style', 'Meat sandwich, NFS', 'Meat spread or potted meat sandwich', 'Meat spread or potted meat, NFS', 'Meat stick, baby food', 'Meat sticks, baby food, NS as to type of meat', 'Meat substitute, cereal- and vegetable protein-based, fried', 'Meat turnover, Puerto Rican style', 'Meat with barbecue sauce, NS as to type of meat', 'Meat with gravy, NS as to type of meat,', 'Meat with tomato-based sauce', 'Meat, NFS', 'Meat, baby food, NS as to type, NS as to strained or junior', 'Meatball and spaghetti sauce submarine sandwich', 'Meatball soup, home recipe, Mexican style', 'Meatball, meatless', 'Meatballs, NS as to type of meat, with sauce', 'Meatballs, Puerto Rican style', 'Meatballs, Swedish, in gravy, with noodles, diet frozen meal', 'Meatballs, with breading, NS as to type of meat, with gravy', 'Melba toast', 'Menudo soup, canned, prepared with water or ready-to-serve', 'Menudo soup, home recipe', 'Meringues', 'Mexican casserole made with ground beef, beans, tomato sauce, cheese, taco seasonings, and corn chips', 'Mexican casserole made with ground beef, tomato sauce, cheese, taco seasonings, and corn chips', 'Mexican chocolate, tablet', 'Mexican style chicken broth soup stock', 'Midnight sandwich, with spread', 'Milk \'n Cereal bar', 'Milk chocolate candy, plain', 'Milk chocolate candy, with almonds', 'Milk chocolate candy, with cereal', 'Milk chocolate candy, with fruit and nuts', 'Milk dessert or milk candy, Puerto Rican style', 'Milk shake with malt', 'Milk shake, bottled, chocolate', 'Milk shake, bottled, flavors other than chocolate', 'Milk shake, fast food, chocolate', 'Milk shake, fast food, flavors other than chocolate', 'Milk shake, home recipe, chocolate', 'Milk shake, home recipe, chocolate, light', 'Milk shake, home recipe, flavors other than chocolate', 'Milk shake, home recipe, flavors other than chocolate, light', 'Milk, NFS', 'Milk, acidophilus, low fat (1%)', 'Milk, acidophilus, reduced fat (2%)', 'Milk, calcium fortified, fat free (skim)', 'Milk, calcium fortified, low fat (1%)', 'Milk, calcium fortified, whole', 'Milk, condensed, sweetened', 'Milk, dry, not reconstituted, NS as to fat content ', 'Milk, dry, not reconstituted, fat free (skim)', 'Milk, dry, not reconstituted, low fat (1%)', 'Milk, dry, not reconstituted, whole', 'Milk, dry, reconstituted, NS as to fat content', 'Milk, dry, reconstituted, fat free (skim)', 'Milk, dry, reconstituted, low fat (1%)', 'Milk, dry, reconstituted, whole', 'Milk, evaporated, NS as to fat content ', 'Milk, evaporated, fat free (skim)', 'Milk, evaporated, reduced fat (2%)', 'Milk, evaporated, whole ', 'Milk, fat free (skim)', 'Milk, human', 'Milk, lactose free, fat free (skim)', 'Milk, lactose free, low fat (1%)', 'Milk, lactose free, reduced fat (2%)', 'Milk, lactose free, whole', 'Milk, low fat (1%)', 'Milk, low sodium, whole', 'Milk, malted', 'Milk, malted, dry mix, not reconstituted', 'Milk, reduced fat (2%)', 'Milk, whole', 'Millet, NS as to fat', 'Millet, fat added', 'Millet, no added fat', 'Mimosa', 'Minestrone soup, canned, prepared with water, or ready-to-serve', 'Minestrone soup, home recipe', 'Minestrone soup, reduced sodium, canned or ready-to-serve', 'Mint julep', 'Miso', 'Miso sauce', 'Mixed cereal with applesauce and bananas, baby food, jarred', 'Mixed cereal with bananas, baby food, dry, instant', 'Mixed cereal, baby food, dry, instant', 'Mixed fruit juice with lowfat yogurt, baby food', 'Mixed fruit juice, not citrus, baby food', 'Mixed fruit juice, not citrus, with added calcium, baby food', 'Mixed fruit tart filled with custard or cream cheese', 'Mixed fruit yogurt dessert, baby food, strained', 'Mixed nuts, NFS', 'Mixed nuts, honey roasted', 'Mixed nuts, unroasted', 'Mixed nuts, with peanuts, lightly salted', 'Mixed nuts, with peanuts, salted', 'Mixed nuts, with peanuts, unsalted', 'Mixed nuts, without peanuts, salted', 'Mixed nuts, without peanuts, unsalted', 'Mixed salad greens, raw', 'Mixed seeds', 'Mixed vegetable juice', 'Mixed vegetables, garden vegetables, baby food, NS as to strained or junior', 'Mixed vegetables, garden vegetables, baby food, junior', 'Mixed vegetables, garden vegetables, baby food, strained', 'Mock chicken legs, cooked', 'Mojito', 'Molasses', 'Mole sauce', 'Moo Goo Gai Pan', 'Moo Shu pork, without Chinese pancake', 'Moose, cooked', 'Mortadella', 'Mousse', 'Mozzarella cheese, tomato, and basil, with oil and vinegar dressing', 'Mozzarella sticks, breaded, baked, or fried', 'Muffin, English', 'Muffin, English, cheese', 'Muffin, English, multigrain', 'Muffin, English, oat bran', 'Muffin, English, oat bran, with raisins', 'Muffin, English, pumpernickel', 'Muffin, English, rye', 'Muffin, English, wheat bran', 'Muffin, English, wheat bran, with raisins', 'Muffin, English, wheat or cracked wheat', 'Muffin, English, wheat or cracked wheat, with raisins', 'Muffin, English, whole grain white', 'Muffin, English, whole wheat', 'Muffin, English, whole wheat, with raisins', 'Muffin, English, with fruit other than raisins', 'Muffin, English, with raisins', 'Muffin, NFS', 'Muffin, bran with fruit, lowfat', 'Muffin, carrot', 'Muffin, cheese', 'Muffin, chocolate', 'Muffin, chocolate chip', 'Muffin, fruit ', 'Muffin, fruit, low fat', 'Muffin, oat bran', 'Muffin, oatmeal', 'Muffin, plain', 'Muffin, pumpkin', 'Muffin, wheat', 'Muffin, wheat bran', 'Muffin, whole grain', 'Muffin, whole wheat', 'Muffin, zucchini', 'Mullet, baked or broiled, fat added', 'Mullet, baked or broiled, no added fat', 'Mullet, coated, baked or broiled, fat added', 'Mullet, coated, baked or broiled, no added fat', 'Mullet, coated, fried', 'Mullet, cooked, NS as to cooking method', 'Mullet, raw', 'Mullet, steamed or poached', 'Multigrain chips (Sun Chips)', 'Multigrain, whole grain cereal, baby food, dry, instant', 'Mung beans, cooked', 'Mushroom soup, NFS', 'Mushroom soup, cream of, NS as to made with milk or water', 'Mushroom soup, cream of, canned, reduced sodium, NS as to made with milk or water', 'Mushroom soup, cream of, canned, reduced sodium, prepared with milk', 'Mushroom soup, cream of, canned, reduced sodium, prepared with water', 'Mushroom soup, cream of, low sodium, prepared with water', 'Mushroom soup, cream of, prepared with milk', 'Mushroom soup, cream of, prepared with water', 'Mushroom soup, with meat broth, prepared with water', 'Mushroom with chicken soup, cream of, prepared with milk', 'Mushroom, Asian, cooked, from dried', 'Mushrooms, NS as to form, cooked', 'Mushrooms, canned, cooked', 'Mushrooms, cooked, as ingredient', 'Mushrooms, for use on a sandwich', 'Mushrooms, fresh, cooked with butter or margarine', 'Mushrooms, fresh, cooked with oil', 'Mushrooms, fresh, cooked, fat added, NS as to fat type', 'Mushrooms, fresh, cooked, no added fat', 'Mushrooms, pickled', 'Mushrooms, raw', 'Mushrooms, stuffed', 'Mussels with tomato-based sauce', 'Mussels, cooked, NS as to cooking method', 'Mussels, raw', 'Mussels, steamed or poached', 'Mustard', 'Mustard cabbage, cooked', 'Mustard greens, NS as to form, cooked', 'Mustard greens, canned, cooked, fat added', 'Mustard greens, canned, cooked, no added fat', 'Mustard greens, fresh, cooked, fat added', 'Mustard greens, fresh, cooked, no added fat', 'Mustard greens, frozen, cooked, fat added', 'Mustard greens, frozen, cooked, no added fat', 'Mustard greens, raw', 'Naan, Indian flatbread', 'Nachos with cheese', 'Nachos with cheese and sour cream', 'Nachos with chicken and cheese', 'Nachos with chicken, cheese, and sour cream', 'Nachos with chili', 'Nachos with meat and cheese', 'Nachos with meat, cheese, and sour cream', 'Natto', 'Nectarine, raw', 'Non-dairy milk, NFS', 'Nonalcoholic malt beverage', 'Noodle and potato soup, Puerto Rican style', 'Noodle pudding', 'Noodle soup with vegetables, Asian style', 'Noodle soup, NFS', 'Noodle soup, with fish ball, shrimp, and dark green leafy vegetable', 'Noodles with vegetables in tomato-based sauce, diet frozen meal', 'Noodles, chow mein', 'Noodles, cooked', 'Noodles, vegetable, cooked', 'Noodles, whole grain, cooked', 'Nougat, chocolate covered', 'Nougat, plain', 'Nougat, with caramel, chocolate covered', 'Nut roll, fudge or nougat, caramel and nuts', 'Nutrition bar (Balance Original Bar)', 'Nutrition bar (Clif Bar)', 'Nutrition bar (Clif Kids Organic Zbar)', 'Nutrition bar (PowerBar)', 'Nutrition bar (Slim Fast Original Meal Bar)', 'Nutrition bar (Snickers Marathon Protein Bar)', 'Nutrition bar (South Beach Living High Protein Bar)', 'Nutrition bar (South Beach Living Meal Bar)', 'Nutrition bar (Tiger\'s Milk)', 'Nutrition bar (Zone Perfect Classic Crunch)', 'Nutrition bar or meal replacement bar, NFS', 'Nutritional drink or shake, high protein, light, ready-to-drink, NFS', 'Nutritional drink or shake, high protein, ready-to-drink (Slim Fast)', 'Nutritional drink or shake, high protein, ready-to-drink, NFS', 'Nutritional drink or shake, liquid, soy-based', 'Nutritional drink or shake, ready-to-drink (Boost Plus)', 'Nutritional drink or shake, ready-to-drink (Boost)', 'Nutritional drink or shake, ready-to-drink (Carnation Instant Breakfast)', 'Nutritional drink or shake, ready-to-drink (Ensure Plus)', 'Nutritional drink or shake, ready-to-drink (Ensure)', 'Nutritional drink or shake, ready-to-drink (Kellogg\'s Special K Protein)', 'Nutritional drink or shake, ready-to-drink (Muscle Milk)', 'Nutritional drink or shake, ready-to-drink (Slim Fast)', 'Nutritional drink or shake, ready-to-drink, NFS', 'Nutritional drink or shake, ready-to-drink, light (Muscle Milk)', 'Nutritional drink or shake, ready-to-drink, sugar free (Glucerna)', 'Nutritional drink or shake, ready-to-drink, sugar free (Slim Fast)', 'Nutritional powder mix (Carnation Instant Breakfast)', 'Nutritional powder mix (EAS Soy Protein Powder)', 'Nutritional powder mix (EAS Whey Protein Powder)', 'Nutritional powder mix (Isopure)', 'Nutritional powder mix (Kellogg\'s Special K20 Protein Water)', 'Nutritional powder mix (Muscle Milk)', 'Nutritional powder mix (Slim Fast)', 'Nutritional powder mix, NFS', 'Nutritional powder mix, high protein (Herbalife)', 'Nutritional powder mix, high protein (Slim Fast)', 'Nutritional powder mix, high protein, NFS', 'Nutritional powder mix, light (Muscle Milk)', 'Nutritional powder mix, protein, NFS', 'Nutritional powder mix, protein, light, NFS', 'Nutritional powder mix, protein, soy based, NFS', 'Nutritional powder mix, sugar free (Carnation Instant Breakfast)', 'Nutritional powder mix, sugar free (Slim Fast)', 'Nutritional powder mix, whey based, NFS', 'Nuts, NFS', 'Nuts, carob-coated', 'Nuts, chocolate covered, not almonds or peanuts', 'Oat bran cereal, cooked, NS as to fat', 'Oat bran cereal, cooked, fat added', 'Oat bran cereal, cooked, no added fat', 'Oat bran, uncooked', 'Oatmeal beverage with milk', 'Oatmeal beverage with water', 'Oatmeal cereal with bananas, baby food, dry, instant', 'Oatmeal cereal with fruit, baby food, dry, instant, toddler', 'Oatmeal cereal, baby food, dry, instant', 'Oatmeal with applesauce and bananas, baby food, jarred', 'Oatmeal,  instant, plain, made with milk, fat added', 'Oatmeal, NS as to regular, quick, or instant, NS as to fat', 'Oatmeal, NS as to regular, quick, or instant, fat added', 'Oatmeal, NS as to regular, quick, or instant, no added fat', 'Oatmeal, from fast food, fruit flavored', 'Oatmeal, from fast food, maple flavored', 'Oatmeal, from fast food, other flavors', 'Oatmeal, from fast food, plain', 'Oatmeal, instant, fruit flavored, NS as to fat', 'Oatmeal, instant, fruit flavored, fat added', 'Oatmeal, instant, fruit flavored, no added fat', 'Oatmeal, instant, maple flavored, NS as to fat', 'Oatmeal, instant, maple flavored, fat added', 'Oatmeal, instant, maple flavored, no added fat', 'Oatmeal, instant, other flavors, NS as to fat', 'Oatmeal, instant, other flavors, fat added', 'Oatmeal, instant, other flavors, no added fat', 'Oatmeal, instant, plain, made with milk, NS as to fat', 'Oatmeal, instant, plain, made with milk, no added fat', 'Oatmeal, instant, plain, made with non-dairy milk, NS as to fat', 'Oatmeal, instant, plain, made with non-dairy milk, fat added', 'Oatmeal, instant, plain, made with non-dairy milk, no added fat', 'Oatmeal, instant, plain, made with water, NS as to fat', 'Oatmeal, instant, plain, made with water, fat added', 'Oatmeal, instant, plain, made with water, no added fat', 'Oatmeal, made with milk and sugar, Puerto Rican style', 'Oatmeal, multigrain, NS as to fat', 'Oatmeal, multigrain, fat added', 'Oatmeal, multigrain, no added fat', 'Oatmeal, reduced sugar, flavored, NS as to fat', 'Oatmeal, reduced sugar, flavored, fat added', 'Oatmeal, reduced sugar, flavored, no added fat', 'Oatmeal, reduced sugar, plain, NS as to fat', 'Oatmeal, reduced sugar, plain, fat added', 'Oatmeal, reduced sugar, plain, no added fat', 'Oatmeal, regular or quick, made with milk, NS as to fat', 'Oatmeal, regular or quick, made with milk, fat added', 'Oatmeal, regular or quick, made with milk, no added fat', 'Oatmeal, regular or quick, made with non-dairy milk, NS as to fat', 'Oatmeal, regular or quick, made with non-dairy milk, fat added', 'Oatmeal, regular or quick, made with non-dairy milk, no added fat', 'Oatmeal, regular or quick, made with water, NS as to fat', 'Oatmeal, regular or quick, made with water, fat added', 'Oatmeal, regular or quick, made with water, no added fat', 'Oats, raw', 'Ocean perch, baked or broiled, fat added', 'Ocean perch, baked or broiled, no added fat', 'Ocean perch, coated, baked or broiled, fat added', 'Ocean perch, coated, baked or broiled, no added fat', 'Ocean perch, coated, fried', 'Ocean perch, cooked, NS as to cooking method', 'Ocean perch, raw', 'Ocean perch, steamed or poached', 'Octopus salad, Puerto Rican style', 'Octopus, cooked, NS as to cooking method', 'Octopus, dried', 'Octopus, dried, boiled', 'Octopus, smoked', 'Octopus, steamed', 'Oil or table fat, NFS', 'Okra, NS as to form, cooked', 'Okra, fresh, cooked, fat added', 'Okra, fresh, cooked, no added fat', 'Okra, frozen, cooked, fat added', 'Okra, frozen, cooked, no added fat', 'Okra, pickled', 'Old fashioned', 'Olive oil', 'Olive tapenade', 'Olives, NFS', 'Olives, black', 'Olives, green', 'Olives, stuffed', 'Onion dip, light', 'Onion dip, regular', 'Onion dip, yogurt based', 'Onion flavored rings', 'Onion soup, French', 'Onion soup, cream of, prepared with milk', 'Onion soup, made from dry mix', 'Onions, cooked, as ingredient', 'Onions, cooked, fat added', 'Onions, cooked, no added fat', 'Onions, for use on a sandwich', 'Onions, green, cooked', 'Onions, green, raw', 'Onions, pearl, cooked', 'Onions, raw', 'Opossum, cooked', 'Orange Blossom', 'Orange chicken', 'Orange juice beverage, 40-50% juice, light', 'Orange juice, 100%,  freshly squeezed', 'Orange juice, 100%, NFS', 'Orange juice, 100%, canned, bottled or in a carton', 'Orange juice, 100%, frozen, not reconstituted', 'Orange juice, 100%, frozen, reconstituted', 'Orange juice, 100%, with calcium added, canned, bottled or in a carton', 'Orange juice, 100%, with calcium added, frozen, reconstituted', 'Orange juice, baby food', 'Orange, canned, NFS', 'Orange, canned, in syrup', 'Orange, canned, juice pack', 'Orange, raw', 'Orange-apple-banana juice, baby food', 'Orange-carrot juice, baby food', 'Ostrich, cooked', 'Other vegetables as ingredient in omelet', 'Oxtail soup', 'Oyster fritter', 'Oyster pie', 'Oyster sauce', 'Oyster stew', 'Oysters Rockefeller', 'Oysters, baked or broiled, fat added', 'Oysters, baked or broiled, no added fat', 'Oysters, canned', 'Oysters, coated, baked or broiled, fat added', 'Oysters, coated, baked or broiled, no added fat', 'Oysters, coated, fried', 'Oysters, cooked, NS as to cooking method', 'Oysters, raw', 'Oysters, smoked', 'Oysters, steamed', 'Pad Thai with chicken', 'Pad Thai with meat', 'Pad Thai with seafood', 'Pad Thai, NFS', 'Pad Thai, meatless', 'Paella with meat, Valenciana style', 'Paella with seafood', 'Paella, NFS', 'Pakora', 'Palak Paneer', 'Palm hearts, cooked', 'Pan Dulce, no topping', 'Pan Dulce, with fruit, no frosting', 'Pan Dulce, with raisins and icing', 'Pan Dulce, with sugar topping', 'Pancake syrup', 'Pancake syrup, light', 'Pancakes and sausage, frozen meal', 'Pancakes, NFS', 'Pancakes, buckwheat', 'Pancakes, cornmeal', 'Pancakes, from school, NFS', 'Pancakes, gluten free', 'Pancakes, gluten free, from frozen', 'Pancakes, plain', 'Pancakes, plain, from fast food / restaurant', 'Pancakes, plain, from frozen', 'Pancakes, plain, reduced fat', 'Pancakes, plain, reduced fat, from fozen', 'Pancakes, pumpkin', 'Pancakes, whole grain', 'Pancakes, whole grain and nuts, from fast food / restaurant', 'Pancakes, whole grain, from fast food / restaurant', 'Pancakes, whole grain, from frozen', 'Pancakes, whole grain, reduced fat', 'Pancakes, whole grain, reduced fat, from frozen', 'Pancakes, with chocolate', 'Pancakes, with chocolate, from fast food / restaurant', 'Pancakes, with chocolate, from frozen', 'Pancakes, with fruit', 'Pancakes, with fruit, from fast food / restaurant', 'Pancakes, with fruit, from frozen', 'Pannetone', 'Papad, grilled or broiled', 'Papaya juice, 100%', 'Papaya nectar', 'Papaya, canned', 'Papaya, dried', 'Papaya, raw', 'Parsley, raw', 'Parsnips, cooked', 'Passion fruit juice, 100%', 'Passion fruit nectar', 'Passion fruit, raw', 'Pasta with cream sauce and added vegetables, from home recipe', 'Pasta with cream sauce and added vegetables, ready-to-heat', 'Pasta with cream sauce and added vegetables, restaurant', 'Pasta with cream sauce and meat, home recipe', 'Pasta with cream sauce and meat, ready-to-heat', 'Pasta with cream sauce and meat, restaurant', 'Pasta with cream sauce and poultry, home recipe', 'Pasta with cream sauce and poultry, ready-to-heat', 'Pasta with cream sauce and poultry, restaurant', 'Pasta with cream sauce and seafood, home recipe', 'Pasta with cream sauce and seafood, ready-to-heat', 'Pasta with cream sauce and seafood, restaurant', 'Pasta with cream sauce, home recipe', 'Pasta with cream sauce, meat, and added vegetables, home recipe', 'Pasta with cream sauce, meat, and added vegetables, ready-to-heat', 'Pasta with cream sauce, meat, and added vegetables, restaurant', 'Pasta with cream sauce, poultry, and added vegetables, home recipe', 'Pasta with cream sauce, poultry, and added vegetables, ready-to-heat', 'Pasta with cream sauce, poultry, and added vegetables, restaurant', 'Pasta with cream sauce, ready-to-heat', 'Pasta with cream sauce, restaurant', 'Pasta with cream sauce, seafood, and added vegetables, home recipe', 'Pasta with cream sauce, seafood, and added vegetables, ready-to-heat', 'Pasta with cream sauce, seafood, and added vegetables, restaurant', 'Pasta with sauce and meat, from school lunch', 'Pasta with sauce, NFS', 'Pasta with sauce, meatless, school lunch', 'Pasta with tomato-based sauce and beans or lentils', 'Pasta with tomato-based sauce and cheese', 'Pasta with tomato-based sauce and meat, home recipe', 'Pasta with tomato-based sauce and meat, ready-to-heat', 'Pasta with tomato-based sauce and meat, restaurant', 'Pasta with tomato-based sauce and poultry, home recipe', 'Pasta with tomato-based sauce and poultry, ready-to-heat', 'Pasta with tomato-based sauce and poultry, restaurant', 'Pasta with tomato-based sauce and seafood, home recipe', 'Pasta with tomato-based sauce and seafood, ready-to-heat', 'Pasta with tomato-based sauce and seafood, restaurant', 'Pasta with tomato-based sauce, and added vegetables, home recipe', 'Pasta with tomato-based sauce, and added vegetables, ready-to-heat', 'Pasta with tomato-based sauce, and added vegetables, restaurant', 'Pasta with tomato-based sauce, cheese and meat', 'Pasta with tomato-based sauce, home recipe', 'Pasta with tomato-based sauce, meat, and added vegetables, home recipe', 'Pasta with tomato-based sauce, meat, and added vegetables, ready-to-heat', 'Pasta with tomato-based sauce, meat, and added vegetables, restaurant', 'Pasta with tomato-based sauce, poultry, and added vegetables, home recipe', 'Pasta with tomato-based sauce, poultry, and added vegetables, ready-to-heat', 'Pasta with tomato-based sauce, poultry, and added vegetables, restaurant', 'Pasta with tomato-based sauce, ready-to-heat', 'Pasta with tomato-based sauce, restaurant', 'Pasta with tomato-based sauce, seafood, and added vegetables, home recipe', 'Pasta with tomato-based sauce, seafood, and added vegetables, ready-to-heat', 'Pasta with tomato-based sauce, seafood, and added vegetables, restaurant', 'Pasta with vegetable and cheese sauce, diet frozen meal', 'Pasta with vegetables, no sauce or dressing', 'Pasta, cooked', 'Pasta, gluten free', 'Pasta, vegetable, cooked', 'Pasta, whole grain, cooked', 'Pasta, whole grain, with cream sauce and meat, home recipe', 'Pasta, whole grain, with cream sauce and meat, ready-to-heat', 'Pasta, whole grain, with cream sauce and meat, restaurant', 'Pasta, whole grain, with cream sauce and poultry, home recipe', 'Pasta, whole grain, with cream sauce and poultry, ready-to-heat', 'Pasta, whole grain, with cream sauce and poultry, restaurant', 'Pasta, whole grain, with cream sauce and seafood, home recipe', 'Pasta, whole grain, with cream sauce and seafood, ready-to-heat', 'Pasta, whole grain, with cream sauce and seafood, restaurant', 'Pasta, whole grain, with cream sauce, and added vegetables, home recipe', 'Pasta, whole grain, with cream sauce, and added vegetables, ready-to-heat', 'Pasta, whole grain, with cream sauce, and added vegetables, restaurant', 'Pasta, whole grain, with cream sauce, home recipe', 'Pasta, whole grain, with cream sauce, meat, and added vegetables, home recipe', 'Pasta, whole grain, with cream sauce, meat, and added vegetables, ready-to-heat', 'Pasta, whole grain, with cream sauce, meat, and added vegetables, restaurant', 'Pasta, whole grain, with cream sauce, poultry, and added vegetables, home recipe', 'Pasta, whole grain, with cream sauce, poultry, and added vegetables, ready-to-heat', 'Pasta, whole grain, with cream sauce, poultry, and added vegetables, restaurant', 'Pasta, whole grain, with cream sauce, ready-to-heat', 'Pasta, whole grain, with cream sauce, restaurant', 'Pasta, whole grain, with cream sauce, seafood, and added vegetables, home recipe', 'Pasta, whole grain, with cream sauce, seafood, and added vegetables, ready-to-heat', 'Pasta, whole grain, with cream sauce, seafood, and added vegetables, restaurant', 'Pasta, whole grain, with tomato-based sauce and added vegetables, home recipe', 'Pasta, whole grain, with tomato-based sauce and added vegetables, ready-to-heat', 'Pasta, whole grain, with tomato-based sauce and added vegetables, restaurant', 'Pasta, whole grain, with tomato-based sauce and meat, home recipe', 'Pasta, whole grain, with tomato-based sauce and meat, ready-to-heat', 'Pasta, whole grain, with tomato-based sauce and meat, restaurant', 'Pasta, whole grain, with tomato-based sauce and poultry, home recipe', 'Pasta, whole grain, with tomato-based sauce and poultry, ready-to-heat', 'Pasta, whole grain, with tomato-based sauce and poultry, restaurant', 'Pasta, whole grain, with tomato-based sauce and seafood, home recipe', 'Pasta, whole grain, with tomato-based sauce and seafood, ready-to-heat', 'Pasta, whole grain, with tomato-based sauce and seafood, restaurant', 'Pasta, whole grain, with tomato-based sauce, home recipe', 'Pasta, whole grain, with tomato-based sauce, meat, and added vegetables, home recipe', 'Pasta, whole grain, with tomato-based sauce, meat, and added vegetables, ready-to-heat', 'Pasta, whole grain, with tomato-based sauce, meat, and added vegetables, restaurant', 'Pasta, whole grain, with tomato-based sauce, poultry, and added vegetables, home recipe', 'Pasta, whole grain, with tomato-based sauce, poultry, and added vegetables, ready-to-heat', 'Pasta, whole grain, with tomato-based sauce, poultry, and added vegetables, restaurant', 'Pasta, whole grain, with tomato-based sauce, ready-to-heat', 'Pasta, whole grain, with tomato-based sauce, restaurant', 'Pasta, whole grain, with tomato-based sauce, seafood, and added vegetables, home recipe', 'Pasta, whole grain, with tomato-based sauce, seafood, and added vegetables, ready-to-heat', 'Pasta, whole grain, with tomato-based sauce, seafood, and added vegetables, restaurant', 'Pastrami sandwich', 'Pastrami, NFS', 'Pastrami, made from any kind of meat, reduced fat', 'Pastry, Chinese, made with rice flour', 'Pastry, Italian, with cheese', 'Pastry, cheese-filled', 'Pastry, cookie type, fried', 'Pastry, egg and cheese filled', 'Pastry, filled with potatoes and peas, fried', 'Pastry, fruit-filled', 'Pastry, made with bean or lotus seed paste filling, baked', 'Pastry, made with bean paste and salted egg yolk filling, baked', 'Pastry, mainly flour and water, fried', 'Pastry, meat / poultry-filled', 'Pastry, puff', 'Pastry, puff, custard or cream filled, iced or not iced', 'Pea and ham soup, chunky style, canned or ready-to-serve', 'Pea salad', 'Pea salad with cheese', 'Pea soup, prepared with milk', 'Peach cobbler, baby food, NS as to strained or junior', 'Peach cobbler, baby food, junior', 'Peach cobbler, baby food, strained', 'Peach nectar', 'Peach yogurt dessert, baby food, strained', 'Peach, canned, NFS', 'Peach, canned, in syrup', 'Peach, canned, juice pack', 'Peach, dried', 'Peach, frozen', 'Peach, raw', 'Peaches, baby food, NS as to strained or junior', 'Peaches, baby food, junior', 'Peaches, baby food, strained', 'Peaches, baby food, toddler', 'Peanut Bar, chocolate covered candy', 'Peanut bar', 'Peanut brittle', 'Peanut butter', 'Peanut butter and chocolate spread', 'Peanut butter and jelly', 'Peanut butter and jelly sandwich, NFS', 'Peanut butter and jelly sandwich, frozen commercial product without crusts', 'Peanut butter and jelly sandwich, with reduced fat peanut butter, reduced sugar jelly, on wheat bread', 'Peanut butter and jelly sandwich, with reduced fat peanut butter, reduced sugar jelly, on white bread', 'Peanut butter and jelly sandwich, with reduced fat peanut butter, reduced sugar jelly, on whole wheat bread', 'Peanut butter and jelly sandwich, with reduced fat peanut butter, regular jelly, on wheat bread', 'Peanut butter and jelly sandwich, with reduced fat peanut butter, regular jelly, on white bread', 'Peanut butter and jelly sandwich, with reduced fat peanut butter, regular jelly, on whole wheat bread', 'Peanut butter and jelly sandwich, with regular peanut butter, reduced sugar jelly, on wheat bread', 'Peanut butter and jelly sandwich, with regular peanut butter, reduced sugar jelly, on white bread', 'Peanut butter and jelly sandwich, with regular peanut butter, reduced sugar jelly, on whole wheat bread', 'Peanut butter and jelly sandwich, with regular peanut butter, regular jelly, on wheat bread', 'Peanut butter and jelly sandwich, with regular peanut butter, regular jelly, on white bread', 'Peanut butter and jelly sandwich, with regular peanut butter, regular jelly, on whole wheat bread', 'Peanut butter morsels', 'Peanut butter sandwich, NFS', 'Peanut butter sandwich, with reduced fat peanut butter, on wheat bread', 'Peanut butter sandwich, with reduced fat peanut butter, on white bread', 'Peanut butter sandwich, with reduced fat peanut butter, on whole wheat bread', 'Peanut butter sandwich, with regular peanut butter, on wheat bread', 'Peanut butter sandwich, with regular peanut butter, on white bread', 'Peanut butter sandwich, with regular peanut butter, on whole wheat bread', 'Peanut butter, chocolate covered', 'Peanut butter, lower sodium', 'Peanut butter, lower sodium and lower sugar', 'Peanut butter, lower sugar', 'Peanut butter, reduced fat', 'Peanut butter, vitamin and mineral fortified', 'Peanut oil', 'Peanut sauce', 'Peanuts, NFS', 'Peanuts, boiled', 'Peanuts, chocolate covered', 'Peanuts, dry roasted, lightly salted', 'Peanuts, dry roasted, salted', 'Peanuts, dry roasted, unsalted', 'Peanuts, honey roasted', 'Peanuts, roasted, salted', 'Peanuts, roasted, unsalted', 'Peanuts, sugar-coated', 'Peanuts, unroasted', 'Peanuts, yogurt covered', 'Pear juice, baby food', 'Pear nectar', 'Pear, Asian, raw', 'Pear, canned, NFS', 'Pear, canned, in syrup', 'Pear, canned, juice pack', 'Pear, dried', 'Pear, raw', 'Pears and pineapple, baby food, NS as to strained or junior', 'Pears and pineapple, baby food, junior', 'Pears and pineapple, baby food, strained', 'Pears, baby food, NS as to strained or junior', 'Pears, baby food, junior', 'Pears, baby food, strained', 'Pears, baby food, toddler', 'Peas and brown rice, baby food', 'Peas and carrots, canned, cooked, fat added', 'Peas and carrots, canned, cooked, no added fat', 'Peas and carrots, cooked, NS as to form', 'Peas and carrots, fresh, cooked, fat added', 'Peas and carrots, fresh, cooked, no added fat', 'Peas and carrots, frozen, cooked, fat added', 'Peas and carrots, frozen, cooked, no added fat', 'Peas and corn, cooked, fat added', 'Peas and corn, cooked, no added fat', 'Peas, baby food, NS as to strained or junior', 'Peas, baby food, junior', 'Peas, baby food, strained', 'Peas, baby food, toddler', 'Pecans, NFS', 'Pecans, honey roasted', 'Pecans, salted', 'Pecans, unroasted', 'Pecans, unsalted', 'Pepper steak', 'Pepper, Serrano, raw', 'Pepper, banana, raw', 'Pepper, for use on a sandwich', 'Pepper, hot chili, raw', 'Pepper, hot, pickled', 'Pepper, poblano, raw', 'Pepper, raw, NFS', 'Pepper, sweet, green, raw', 'Pepper, sweet, red, raw', 'Pepperoni and salami submarine sandwich, with lettuce, tomato and spread', 'Pepperoni, NFS', 'Pepperoni, reduced fat', 'Pepperoni, reduced sodium', 'Pepperpot soup', 'Peppers and onions, cooked, fat added', 'Peppers and onions, cooked, no added fat', 'Peppers, green, cooked', 'Peppers, pickled', 'Peppers, red, cooked', 'Perch, baked or broiled, made with butter', 'Perch, baked or broiled, made with cooking spray', 'Perch, baked or broiled, made with margarine', 'Perch, baked or broiled, made with oil', 'Perch, baked or broiled, no added fat', 'Perch, coated, baked or broiled, made with butter', 'Perch, coated, baked or broiled, made with cooking spray', 'Perch, coated, baked or broiled, made with margarine', 'Perch, coated, baked or broiled, made with oil', 'Perch, coated, baked or broiled, no added fat', 'Perch, coated, fried, made with butter', 'Perch, coated, fried, made with cooking spray', 'Perch, coated, fried, made with margarine', 'Perch, coated, fried, made with oil', 'Perch, coated, fried, no added fat', 'Perch, cooked, NS as to cooking method', 'Perch, steamed or poached', 'Persimmon, dried', 'Persimmon, raw', 'Peruvian beans, from dried', 'Pesto sauce', 'Pheasant, cooked', 'Pho', 'Pickled sausage', 'Pickles, NFS', 'Pickles, dill', 'Pickles, fried', 'Pickles, sweet', 'Pie shell', 'Pie shell, chocolate wafer', 'Pie shell, graham cracker', 'Pie, NFS', 'Pie, Toll house chocolate chip', 'Pie, apple, fried pie', 'Pie, apple, individual size or tart', 'Pie, apple, one crust', 'Pie, apple, two crust', 'Pie, apple-sour cream', 'Pie, apricot, fried pie', 'Pie, apricot, individual size or tart', 'Pie, apricot, two crust', 'Pie, banana cream', 'Pie, banana cream, individual size or tart', 'Pie, berry, not blackberry, blueberry, boysenberry, huckleberry, raspberry, or strawberry, individual size or tart', 'Pie, berry, not blackberry, blueberry, boysenberry, huckleberry, raspberry, or strawberry; one crust', 'Pie, berry, not blackberry, blueberry, boysenberry, huckleberry, raspberry, or strawberry; two crust', 'Pie, black bottom', 'Pie, blackberry, individual size or tart', 'Pie, blackberry, two crust', 'Pie, blueberry, individual size or tart', 'Pie, blueberry, two crust', 'Pie, buttermilk', 'Pie, cherry, fried pie', 'Pie, cherry, individual size or tart', 'Pie, cherry, made with cream cheese and sour cream', 'Pie, cherry, one crust', 'Pie, cherry, two crust', 'Pie, chess', 'Pie, chiffon, chocolate', 'Pie, chiffon, not chocolate', 'Pie, chocolate cream', 'Pie, chocolate cream, individual size or tart', 'Pie, chocolate-marshmallow', 'Pie, coconut cream', 'Pie, coconut cream, individual size or tart', 'Pie, custard', 'Pie, custard, individual size or tart', 'Pie, fried, NFS', 'Pie, individual size or tart, NFS', 'Pie, lemon cream', 'Pie, lemon cream, individual size or tart', 'Pie, lemon meringue', 'Pie, lemon meringue, individual size or tart', 'Pie, lemon, fried pie', 'Pie, lemon, not cream or meringue', 'Pie, lemon, not cream or meringue, individual size or tart', 'Pie, mince, two crust', 'Pie, oatmeal', 'Pie, peach, fried pie', 'Pie, peach, individual size or tart', 'Pie, peach, one crust', 'Pie, peach, two crust', 'Pie, peanut butter cream', 'Pie, pear, individual size or tart', 'Pie, pear, two crust', 'Pie, pecan', 'Pie, pecan, individual size or tart', 'Pie, pineapple cream', 'Pie, pineapple, individual size or tart', 'Pie, pineapple, two crust', 'Pie, pudding, flavors other than chocolate', 'Pie, pumpkin', 'Pie, pumpkin, individual size or tart', 'Pie, raisin, individual size or tart', 'Pie, raisin, two crust', 'Pie, raspberry, one crust', 'Pie, raspberry, two crust', 'Pie, rhubarb, two crust', 'Pie, shoo-fly', 'Pie, sour cream, raisin', 'Pie, squash', 'Pie, strawberry cream', 'Pie, strawberry cream, individual size or tart', 'Pie, strawberry, individual size or tart', 'Pie, strawberry, one crust', 'Pie, strawberry-rhubarb, two crust', 'Pie, sweet potato', 'Pie, tofu with fruit', 'Pie, vanilla cream', 'Pig in a blanket, frankfurter or hot dog wrapped in dough', 'Pike, baked or broiled, fat added', 'Pike, baked or broiled, no added fat', 'Pike, coated, baked or broiled, fat added', 'Pike, coated, baked or broiled, no added fat', 'Pike, coated, fried', 'Pike, cooked, NS as to cooking method', 'Pike, steamed or poached', 'Pimiento', 'Pina Colada', 'Pina Colada, nonalcoholic', 'Pine nuts', 'Pineapple candy, Puerto Rican style', 'Pineapple dessert, baby food, strained', 'Pineapple juice, 100%', 'Pineapple salad with dressing', 'Pineapple, canned, NFS', 'Pineapple, canned, in syrup', 'Pineapple, canned, juice pack', 'Pineapple, dried', 'Pineapple, frozen', 'Pineapple, raw', 'Pink beans, cooked', 'Pinto bean soup, home recipe, canned or ready-to-serve', 'Pinto beans and brown rice', 'Pinto beans and rice, from fast food / restaurant', 'Pinto beans and white rice', 'Pinto beans with meat', 'Pinto beans, NFS', 'Pinto beans, from canned, fat added', 'Pinto beans, from canned, no added fat', 'Pinto beans, from canned, reduced sodium', 'Pinto beans, from dried, fat added', 'Pinto beans, from dried, no added fat', 'Pinto beans, from fast food / restaurant', 'Pistachio nuts, NFS', 'Pistachio nuts, lightly salted', 'Pistachio nuts, salted', 'Pistachio nuts, unsalted', 'Pita chips', 'Pizza rolls', 'Pizza with beans and vegetables, thick crust', 'Pizza with beans and vegetables, thin crust', 'Pizza with cheese and extra vegetables, medium crust', 'Pizza with cheese and extra vegetables, thick crust', 'Pizza with cheese and extra vegetables, thin crust', 'Pizza with extra meat and extra vegetables, medium crust', 'Pizza with extra meat and extra vegetables, thick crust', 'Pizza with extra meat and extra vegetables, thin crust', 'Pizza with extra meat, medium crust', 'Pizza with extra meat, thick crust', 'Pizza with extra meat, thin crust', 'Pizza with meat and fruit, medium crust', 'Pizza with meat and fruit, thick crust', 'Pizza with meat and fruit, thin crust', 'Pizza with meat and vegetables, from frozen, medium crust', 'Pizza with meat and vegetables, from frozen, thick crust', 'Pizza with meat and vegetables, from frozen, thin crust', 'Pizza with meat and vegetables, from restaurant or fast food, medium crust', 'Pizza with meat and vegetables, from restaurant or fast food, thick crust', 'Pizza with meat and vegetables, from restaurant or fast food, thin crust', 'Pizza with meat other than pepperoni, from frozen, medium crust', 'Pizza with meat other than pepperoni, from frozen, thick crust', 'Pizza with meat other than pepperoni, from frozen, thin crust', 'Pizza with meat other than pepperoni, from restaurant or fast food, NS as to type of crust', 'Pizza with meat other than pepperoni, from restaurant or fast food, medium crust', 'Pizza with meat other than pepperoni, from restaurant or fast food, thick crust', 'Pizza with meat other than pepperoni, from restaurant or fast food, thin crust', 'Pizza with pepperoni, from frozen, medium crust', 'Pizza with pepperoni, from frozen, thick crust', 'Pizza with pepperoni, from frozen, thin crust', 'Pizza with pepperoni, from restaurant or fast food,  medium crust', 'Pizza with pepperoni, from restaurant or fast food, NS as to type of crust', 'Pizza with pepperoni, from restaurant or fast food, thick crust', 'Pizza with pepperoni, from restaurant or fast food, thin crust', 'Pizza with pepperoni, from school lunch, thick crust', 'Pizza with pepperoni, from school lunch, thin crust', 'Pizza with pepperoni, stuffed crust', 'Pizza, cheese and vegetables, gluten-free thick crust', 'Pizza, cheese and vegetables, gluten-free thin crust', 'Pizza, cheese and vegetables, whole wheat thick crust', 'Pizza, cheese and vegetables, whole wheat thin crust', 'Pizza, cheese with vegetables, from frozen, thick crust', 'Pizza, cheese, from frozen, thick crust', 'Pizza, cheese, from frozen, thin crust', 'Pizza, cheese, from restaurant or fast food, NS as to type of crust', 'Pizza, cheese, from restaurant or fast food, medium crust', 'Pizza, cheese, from restaurant or fast food, thick crust', 'Pizza, cheese, from restaurant or fast food, thin crust', 'Pizza, cheese, from school lunch, medium crust', 'Pizza, cheese, from school lunch, thick crust', 'Pizza, cheese, from school lunch, thin crust', 'Pizza, cheese, gluten-free thick crust', 'Pizza, cheese, gluten-free thin crust', 'Pizza, cheese, stuffed crust', 'Pizza, cheese, whole wheat thick crust', 'Pizza, cheese, whole wheat thin crust', 'Pizza, cheese, with fruit, medium crust', 'Pizza, cheese, with fruit, thick crust', 'Pizza, cheese, with fruit, thin crust', 'Pizza, cheese, with vegetables, from frozen, thin crust', 'Pizza, cheese, with vegetables, from restaurant or fast food, medium crust', 'Pizza, cheese, with vegetables, from restaurant or fast food, thick crust', 'Pizza, cheese, with vegetables, from restaurant or fast food, thin crust', 'Pizza, extra cheese, thick crust', 'Pizza, extra cheese, thin crust', 'Pizza, no cheese, thick crust', 'Pizza, no cheese, thin crust', 'Pizza, with meat other than pepperoni, from school lunch, medium crust', 'Pizza, with meat other than pepperoni, from school lunch, thick crust', 'Pizza, with meat other than pepperoni, from school lunch, thin crust', 'Pizza, with meat other than pepperoni, stuffed crust', 'Pizza, with meat, gluten-free thick crust', 'Pizza, with meat, gluten-free thin crust', 'Pizza, with meat, whole wheat thick crust', 'Pizza, with meat, whole wheat thin crust', 'Pizza, with pepperoni, from school lunch, medium crust', 'Plantain chips', 'Plantain soup, Puerto Rican style', 'Plantain, cooked with butter or margarine', 'Plantain, cooked with oil', 'Plantain, cooked, fat added, NS as to fat type', 'Plantain, cooked, no added fat', 'Planters Peanut Bar', 'Plum, canned', 'Plum, raw', 'Plums, baby food, NS as to strained or junior', 'Plums, baby food, junior', 'Plums, baby food, strained', 'Plums, bananas, and rice, baby food strained', 'Pocky', 'Poi', 'Poke greens, cooked', 'Polish sausage', 'Pomegranate juice beverage, 40-50% juice, light', 'Pomegranate juice, 100%', 'Pomegranate, raw', 'Pompano, baked or broiled, fat added', 'Pompano, baked or broiled, no added fat', 'Pompano, coated, baked or broiled, fat added', 'Pompano, coated, baked or broiled, no added fat', 'Pompano, coated, fried', 'Pompano, cooked, NS as to cooking method', 'Pompano, raw', 'Pompano, smoked', 'Pompano, steamed or poached', 'Popcorn cake', 'Popcorn chips, other flavors', 'Popcorn chips, plain', 'Popcorn chips, sweet flavors', 'Popcorn, NFS', 'Popcorn, air-popped, unbuttered', 'Popcorn, air-popped, with added butter or margarine', 'Popcorn, caramel coated', 'Popcorn, caramel coated, with nuts', 'Popcorn, chocolate coated', 'Popcorn, microwave, NFS', 'Popcorn, microwave, butter flavored', 'Popcorn, microwave, butter flavored, light', 'Popcorn, microwave, cheese flavored', 'Popcorn, microwave, kettle corn', 'Popcorn, microwave, kettle corn, light', 'Popcorn, microwave, low sodium', 'Popcorn, microwave, other flavored', 'Popcorn, microwave, plain', 'Popcorn, microwave, plain, light', 'Popcorn, microwave, unsalted', 'Popcorn, movie theater, unbuttered', 'Popcorn, movie theater, with added butter', 'Popcorn, popped in oil, unbuttered', 'Popcorn, popped in oil, with added butter or margarine', 'Popcorn, ready-to-eat packaged, NFS', 'Popcorn, ready-to-eat packaged, butter flavored', 'Popcorn, ready-to-eat packaged, butter flavored, light', 'Popcorn, ready-to-eat packaged, cheese flavored', 'Popcorn, ready-to-eat packaged, cheese flavored, light', 'Popcorn, ready-to-eat packaged, kettle corn, light', 'Popcorn, ready-to-eat packaged, low sodium', 'Popcorn, ready-to-eat packaged, other flavored', 'Popcorn, ready-to-eat packaged, plain', 'Popcorn, ready-to-eat packaged, plain, light', 'Popcorn, ready-to-eat packaged, unsalted', 'Popcorn, ready-to-eat-packaged, kettle corn', 'Popover', 'Poppy seed dressing', 'Popsicle', 'Popsicle, NFS', 'Popsicle, no sugar added', 'Porcupine balls with mushroom sauce', 'Porcupine balls with tomato-based sauce', 'Porgy, baked or broiled, fat added', 'Porgy, baked or broiled, no added fat', 'Porgy, coated, baked or broiled, fat added', 'Porgy, coated, baked or broiled, no added fat', 'Porgy, coated, fried', 'Porgy, cooked, NS as to cooking method', 'Porgy, raw', 'Porgy, steamed or poached', 'Pork and beans', 'Pork and beef sausage', 'Pork and onions with soy-based sauce', 'Pork and rice with tomato-based sauce', 'Pork and vegetables excluding  carrots, broccoli, and dark-green leafy; no potatoes, tomato-based sauce', 'Pork and vegetables excluding carrots, broccoli, and dark- green leafy; no potatoes, soy-based sauce', 'Pork and vegetables excluding carrots, broccoli, and dark-green leafy; no potatoes, no sauce', 'Pork and vegetables including carrots, broccoli, and/or dark-green leafy; no potatoes, no sauce', 'Pork and vegetables including carrots, broccoli, and/or dark-green leafy; no potatoes, soy-based sauce', 'Pork and vegetables including carrots, broccoli, and/or dark-green leafy; no potatoes, tomato-based sauce', 'Pork and vegetables, Hawaiian style', 'Pork and watercress with soy-based sauce', 'Pork bacon, NS as to fresh, smoked or cured, cooked', 'Pork bacon, NS as to fresh, smoked or cured, reduced sodium, cooked', 'Pork bacon, smoked or cured, cooked', 'Pork bacon, smoked or cured, reduced sodium, cooked', 'Pork barbecue sandwich or Sloppy Joe, on bun', 'Pork chop stewed with vegetables, Puerto Rican style', 'Pork chop, NS as to cooking method, NS as to fat eaten', 'Pork chop, NS as to cooking method, lean and fat eaten', 'Pork chop, NS as to cooking method, lean only eaten', 'Pork chop, battered, fried, NS as to fat eaten', 'Pork chop, battered, fried, lean and fat eaten', 'Pork chop, battered, fried, lean only eaten', 'Pork chop, breaded or floured, broiled or baked, NS as to fat eaten', 'Pork chop, breaded or floured, broiled or baked, lean and fat eaten', 'Pork chop, breaded or floured, broiled or baked, lean only eaten', 'Pork chop, breaded or floured, fried, NS as to fat eaten', 'Pork chop, breaded or floured, fried, lean and fat eaten', 'Pork chop, breaded or floured, fried, lean only eaten', 'Pork chop, broiled or baked, NS as to fat eaten', 'Pork chop, broiled or baked, lean and fat eaten', 'Pork chop, broiled or baked, lean only eaten', 'Pork chop, fried, NS as to fat eaten', 'Pork chop, fried, lean and fat eaten', 'Pork chop, fried, lean only eaten', 'Pork chop, smoked or cured, cooked, NS as to fat eaten', 'Pork chop, smoked or cured, cooked, lean and fat eaten', 'Pork chop, smoked or cured, cooked, lean only eaten', 'Pork chop, stewed, NS as to fat eaten', 'Pork chop, stewed, lean and fat eaten', 'Pork chop, stewed, lean only eaten', 'Pork chow mein or chop suey with noodles', 'Pork chow mein or chop suey, no noodles', 'Pork ears, tail, head, snout, miscellaneous parts, cooked', 'Pork egg foo yung', 'Pork hash', 'Pork jerky', 'Pork or ham with soy-based sauce', 'Pork roast, NS as to cut, cooked, NS as to fat eaten', 'Pork roast, NS as to cut, cooked, lean and fat eaten', 'Pork roast, NS as to cut, cooked, lean only eaten', 'Pork roast, loin, cooked, NS as to fat eaten', 'Pork roast, loin, cooked, lean and fat eaten', 'Pork roast, loin, cooked, lean only eaten', 'Pork roast, shoulder, cooked, NS as to fat eaten', 'Pork roast, shoulder, cooked, lean and fat eaten', 'Pork roast, shoulder, cooked, lean only eaten', 'Pork roast, smoked or cured, cooked, NS as to fat eaten', 'Pork roast, smoked or cured, cooked, lean and fat eaten', 'Pork roast, smoked or cured, cooked, lean only eaten', 'Pork roll, cured, fried', 'Pork sandwich', 'Pork sandwich, on white roll, with onions, dill pickles and barbecue sauce', 'Pork sausage', 'Pork sausage rice links', 'Pork sausage, reduced fat', 'Pork sausage, reduced sodium', 'Pork shish kabob with vegetables, excluding potatoes', 'Pork skin rinds', 'Pork skin, boiled', 'Pork steak or cutlet, NS as to cooking method, NS as to fat eaten', 'Pork steak or cutlet, NS as to cooking method, lean and fat eaten', 'Pork steak or cutlet, NS as to cooking method, lean only eaten', 'Pork steak or cutlet, battered, fried, NS as to fat eaten', 'Pork steak or cutlet, battered, fried, lean and fat eaten', 'Pork steak or cutlet, battered, fried, lean only eaten', 'Pork steak or cutlet, breaded or floured, broiled or baked, NS as to fat eaten', 'Pork steak or cutlet, breaded or floured, broiled or baked, lean and fat eaten', 'Pork steak or cutlet, breaded or floured, broiled or baked, lean only eaten', 'Pork steak or cutlet, breaded or floured, fried, NS as to fat eaten', 'Pork steak or cutlet, breaded or floured, fried, lean and fat eaten', 'Pork steak or cutlet, breaded or floured, fried, lean only eaten', 'Pork steak or cutlet, broiled or baked, NS as to fat eaten', 'Pork steak or cutlet, broiled or baked, lean and fat eaten', 'Pork steak or cutlet, broiled or baked, lean only eaten', 'Pork steak or cutlet, fried, NS as to fat eaten', 'Pork steak or cutlet, fried, lean and fat eaten', 'Pork steak or cutlet, fried, lean only eaten', 'Pork stew, no potatoes, tomato-based sauce, Mexican style', 'Pork stew, with potatoes, tomato-based sauce, Mexican style', 'Pork vegetable soup with potato, pasta, or rice, stew type, chunky style', 'Pork with chili and tomatoes', 'Pork with vegetable excluding carrots, broccoli and/or dark-green leafy; soup, Asian Style', 'Pork, NS as to cut, breaded or floured, fried, NS as to fat eaten', 'Pork, NS as to cut, breaded or floured, fried, lean and fat eaten', 'Pork, NS as to cut, breaded or floured, fried, lean only eaten', 'Pork, NS as to cut, cooked, NS as to fat eaten', 'Pork, NS as to cut, cooked, lean and fat eaten', 'Pork, NS as to cut, cooked, lean only eaten', 'Pork, NS as to cut, fried, NS as to fat eaten', 'Pork, NS as to cut, fried, lean and fat eaten', 'Pork, NS as to cut, fried, lean only eaten', 'Pork, cracklings, cooked', 'Pork, ground or patty, breaded, cooked', 'Pork, ground or patty, cooked', 'Pork, neck bones, cooked', 'Pork, pickled, NS as to cut', 'Pork, pig\'s feet, cooked', 'Pork, pig\'s feet, pickled', 'Pork, pig\'s hocks, cooked', 'Pork, potatoes, and vegetables excluding carrots, broccoli, and dark-green leafy; gravy', 'Pork, potatoes, and vegetables excluding carrots, broccoli, and dark-green leafy; no sauce', 'Pork, potatoes, and vegetables excluding carrots, broccoli, and dark-green leafy; tomato-based sauce', 'Pork, potatoes, and vegetables including carrots, broccoli, and/or dark-green leafy; gravy', 'Pork, potatoes, and vegetables including carrots, broccoli, and/or dark-green leafy; no sauce', 'Pork, potatoes, and vegetables including carrots, broccoli, and/or dark-green leafy; tomato-based sauce', 'Pork, rice, and vegetables excluding carrots, broccoli, and dark-green leafy; soy-based sauce', 'Pork, rice, and vegetables excluding carrots, broccoli, and dark-green leafy; tomato-based sauce', 'Pork, rice, and vegetables including carrots, broccoli, and/or dark-green leafy; soy-based sauce', 'Pork, rice, and vegetables including carrots, broccoli, and/or dark-green leafy; tomato-based sauce', 'Pork, spareribs, barbecued, with sauce, NS as to fat eaten', 'Pork, spareribs, barbecued, with sauce, lean and fat eaten', 'Pork, spareribs, barbecued, with sauce, lean only eaten', 'Pork, spareribs, cooked, NS as to fat eaten', 'Pork, spareribs, cooked, lean and fat eaten', 'Pork, spareribs, cooked, lean only eaten', 'Pork, tenderloin, baked', 'Pork, tenderloin, battered, fried', 'Pork, tenderloin, braised', 'Pork, tenderloin, breaded, fried', 'Pork, tenderloin, cooked, NS as to cooking method', 'Pork, tofu, and vegetables including carrots, broccoli, and/or dark-green leafy; no potatoes, soy-base sauce', 'Pork, tofu, and vegetables, excluding carrots, broccoli, and dark-green leafy; no potatoes, soy-based sauce', 'Potato and cheese soup', 'Potato and ham fritters, Puerto Rican style', 'Potato chicken pie, Puerto Rican style', 'Potato chips, NFS', 'Potato chips, baked, flavored', 'Potato chips, baked, plain', 'Potato chips, barbecue flavored', 'Potato chips, cheese flavored', 'Potato chips, fat free', 'Potato chips, lightly salted', 'Potato chips, other flavored', 'Potato chips, plain', 'Potato chips, popped, NFS', 'Potato chips, popped, flavored', 'Potato chips, popped, plain', 'Potato chips, reduced fat', 'Potato chips, reduced fat, unsalted', 'Potato chips, restructured, fat free', 'Potato chips, restructured, flavored', 'Potato chips, restructured, lightly salted', 'Potato chips, restructured, multigrain', 'Potato chips, restructured, plain', 'Potato chips, restructured, reduced fat, lightly salted', 'Potato chips, ruffled, barbecue flavored', 'Potato chips, ruffled, cheese flavored', 'Potato chips, ruffled, other flavored', 'Potato chips, ruffled, plain', 'Potato chips, ruffled, sour cream and onion flavored', 'Potato chips, sour cream and onion flavored', 'Potato chips, unsalted', 'Potato chowder', 'Potato from Puerto Rican beef stew, with gravy', 'Potato from Puerto Rican chicken fricassee, with sauce', 'Potato from Puerto Rican style stuffed pot roast, with gravy', 'Potato only from Puerto Rican mixed dishes, gravy and other components reported separately', 'Potato pancake', 'Potato patty', 'Potato salad with egg, from restaurant', 'Potato salad with egg, made with Italian dressing', 'Potato salad with egg, made with any type of fat free dressing', 'Potato salad with egg, made with creamy dressing', 'Potato salad with egg, made with light Italian dressing', 'Potato salad with egg, made with light creamy dressing', 'Potato salad with egg, made with light mayonnaise', 'Potato salad with egg, made with light mayonnaise-type salad dressing', 'Potato salad with egg, made with mayonnaise', 'Potato salad with egg, made with mayonnaise-type salad dressing', 'Potato salad, German style', 'Potato salad, from restaurant', 'Potato salad, made with Italian dressing', 'Potato salad, made with any type of fat free dressing', 'Potato salad, made with creamy dressing', 'Potato salad, made with light Italian dressing', 'Potato salad, made with light creamy dressing', 'Potato salad, made with light mayonnaise', 'Potato salad, made with light mayonnaise-type salad dressing', 'Potato salad, made with mayonnaise', 'Potato salad, made with mayonnaise-type salad dressing', 'Potato skins without topping', 'Potato skins, NFS', 'Potato skins, with cheese', 'Potato skins, with cheese and bacon', 'Potato soup, NS as to made with milk or water', 'Potato soup, cream of, prepared with milk', 'Potato soup, prepared with water', 'Potato sticks, flavored', 'Potato sticks, fry shaped', 'Potato sticks, plain', 'Potato tots, NFS', 'Potato tots, fast food / restaurant', 'Potato tots, from fresh, fried or baked', 'Potato tots, frozen, NS as to fried or baked', 'Potato tots, frozen, baked', 'Potato tots, frozen, fried', 'Potato tots, school', 'Potato, NFS', 'Potato, baked, NFS', 'Potato, baked, peel eaten', 'Potato, baked, peel eaten, with butter', 'Potato, baked, peel eaten, with cheese', 'Potato, baked, peel eaten, with chili', 'Potato, baked, peel eaten, with meat', 'Potato, baked, peel eaten, with sour cream', 'Potato, baked, peel eaten, with vegetables', 'Potato, baked, peel not eaten', 'Potato, baked, peel not eaten, with butter', 'Potato, baked, peel not eaten, with cheese', 'Potato, baked, peel not eaten, with chili', 'Potato, baked, peel not eaten, with meat', 'Potato, baked, peel not eaten, with sour cream', 'Potato, baked, peel not eaten, with vegetables', 'Potato, boiled, NFS', 'Potato, boiled, from fresh,  peel eaten, no addded fat', 'Potato, boiled, from fresh, peel eaten, NS as to fat', 'Potato, boiled, from fresh, peel eaten, fat added, NS as to fat type', 'Potato, boiled, from fresh, peel eaten, made with butter', 'Potato, boiled, from fresh, peel eaten, made with margarine', 'Potato, boiled, from fresh, peel eaten, made with oil', 'Potato, boiled, from fresh, peel not eaten, NS as to fat', 'Potato, boiled, from fresh, peel not eaten, fat added, NS as to fat type', 'Potato, boiled, from fresh, peel not eaten, made with butter', 'Potato, boiled, from fresh, peel not eaten, made with margarine', 'Potato, boiled, from fresh, peel not eaten, made with oil', 'Potato, boiled, from fresh, peel not eaten, no added fat', 'Potato, boiled, ready-to-heat', 'Potato, canned, NS as to fat', 'Potato, canned, fat added, NS as to fat type', 'Potato, canned, no added fat', 'Potato, french fries, NFS', 'Potato, french fries, NS as to fresh or frozen', 'Potato, french fries, fast food', 'Potato, french fries, from fresh, baked', 'Potato, french fries, from fresh, fried', 'Potato, french fries, from frozen, baked', 'Potato, french fries, from frozen, fried', 'Potato, french fries, restaurant', 'Potato, french fries, school', 'Potato, french fries, with cheese', 'Potato, french fries, with cheese, fast food / restaurant', 'Potato, french fries, with cheese, school', 'Potato, french fries, with chili', 'Potato, french fries, with chili and cheese', 'Potato, french fries, with chili and cheese, fast food / restaurant', 'Potato, french fries, with chili, fast food / restaurant', 'Potato, hash brown, NFS', 'Potato, hash brown, from dry mix', 'Potato, hash brown, from fast food', 'Potato, hash brown, from fast food, with cheese', 'Potato, hash brown, from fresh', 'Potato, hash brown, from fresh, with cheese', 'Potato, hash brown, from restaurant', 'Potato, hash brown, from restaurant, with cheese', 'Potato, hash brown, from school lunch', 'Potato, hash brown, ready-to-heat', 'Potato, hash brown, ready-to-heat, with cheese', 'Potato, home fries, NFS', 'Potato, home fries, from fresh', 'Potato, home fries, from restaurant / fast food', 'Potato, home fries, ready-to-heat', 'Potato, home fries, with vegetables', 'Potato, mashed, NFS', 'Potato, mashed, from dry mix, NFS', 'Potato, mashed, from dry mix, made with milk', 'Potato, mashed, from dry mix, made with milk, with cheese', 'Potato, mashed, from dry mix, made with milk, with gravy', 'Potato, mashed, from fast food', 'Potato, mashed, from fast food, with gravy', 'Potato, mashed, from fresh, NFS', 'Potato, mashed, from fresh, made with milk', 'Potato, mashed, from fresh, made with milk, with cheese', 'Potato, mashed, from fresh, made with milk, with gravy', 'Potato, mashed, from restaurant', 'Potato, mashed, from restaurant, with gravy', 'Potato, mashed, from school lunch', 'Potato, mashed, ready-to-heat', 'Potato, mashed, ready-to-heat, NFS', 'Potato, mashed, ready-to-heat, with cheese', 'Potato, mashed, ready-to-heat, with gravy', 'Potato, roasted, NFS', 'Potato, roasted, from fresh, peel eaten, NS as to fat', 'Potato, roasted, from fresh, peel eaten, fat added, NS as to fat type', 'Potato, roasted, from fresh, peel eaten, made with butter', 'Potato, roasted, from fresh, peel eaten, made with margarine', 'Potato, roasted, from fresh, peel eaten, made with oil', 'Potato, roasted, from fresh, peel eaten, no added fat', 'Potato, roasted, from fresh, peel not eaten, NS as to fat', 'Potato, roasted, from fresh, peel not eaten, fat added, NS as to fat type', 'Potato, roasted, from fresh, peel not eaten, made with butter', 'Potato, roasted, from fresh, peel not eaten, made with margarine', 'Potato, roasted, from fresh, peel not eaten, made with oil', 'Potato, roasted, from fresh, peel not eaten, no added fat', 'Potato, roasted, ready-to-heat', 'Potato, scalloped, NFS', 'Potato, scalloped, from dry mix', 'Potato, scalloped, from dry mix, with meat', 'Potato, scalloped, from fast food or restaurant', 'Potato, scalloped, from fresh', 'Potato, scalloped, from fresh, with meat', 'Potato, scalloped, ready-to-heat', 'Potato, scalloped, ready-to-heat, with meat', 'Potatoes with cheese and broccoli, baby food, toddler', 'Potatoes, baby food, toddler', 'Pralines', 'Pretzel chips, hard, flavored', 'Pretzel chips, hard, gluten free', 'Pretzel chips, hard, plain', 'Pretzel, baby food', 'Pretzels, NFS', 'Pretzels, hard, NFS', 'Pretzels, hard, cheese filled', 'Pretzels, hard, chocolate coated', 'Pretzels, hard, coated, NFS', 'Pretzels, hard, coated, gluten free', 'Pretzels, hard, filled, NFS', 'Pretzels, hard, flavored', 'Pretzels, hard, flavored, gluten free', 'Pretzels, hard, multigrain', 'Pretzels, hard, peanut butter filled', 'Pretzels, hard, plain, gluten free', 'Pretzels, hard, plain, lightly salted', 'Pretzels, hard, plain, salted', 'Pretzels, hard, plain, unsalted', 'Pretzels, hard, white chocolate coated', 'Pretzels, hard, yogurt coated', 'Pretzels, soft, NFS', 'Pretzels, soft, filled with cheese', 'Pretzels, soft, from frozen, NFS', 'Pretzels, soft, from frozen, cinnamon sugar coated', 'Pretzels, soft, from frozen, coated or flavored', 'Pretzels, soft, from frozen, salted', 'Pretzels, soft, from frozen, topped with cheese', 'Pretzels, soft, from frozen, topped with meat', 'Pretzels, soft, from frozen, unsalted', 'Pretzels, soft, from school lunch', 'Pretzels, soft, gluten free', 'Pretzels, soft, gluten free, cinnamon sugar coated', 'Pretzels, soft, gluten free, coated or flavored', 'Pretzels, soft, multigrain', 'Pretzels, soft, ready-to-eat, NFS', 'Pretzels, soft, ready-to-eat, cinnamon sugar coated', 'Pretzels, soft, ready-to-eat, coated or flavored', 'Pretzels, soft, ready-to-eat, salted, buttered', 'Pretzels, soft, ready-to-eat, salted, no butter', 'Pretzels, soft, ready-to-eat, topped with cheese', 'Pretzels, soft, ready-to-eat, topped with meat', 'Pretzels, soft, ready-to-eat, unsalted, buttered', 'Pretzels, soft, ready-to-eat, unsalted, no butter', 'Prune juice, 100%', 'Prune, dried', 'Prunes with oatmeal, baby food, strained', 'Prunes, baby food, strained', 'Pudding, bread', 'Pudding, chocolate, NFS', 'Pudding, chocolate, made from dry mix', 'Pudding, chocolate, made from dry mix, sugar free', 'Pudding, chocolate, ready-to-eat', 'Pudding, chocolate, ready-to-eat, sugar free', 'Pudding, flavors other than chocolate, NFS', 'Pudding, flavors other than chocolate, made from dry mix', 'Pudding, flavors other than chocolate, made from dry mix, sugar free', 'Pudding, flavors other than chocolate, ready-to-eat', 'Pudding, flavors other than chocolate, ready-to-eat, sugar free', 'Pudding, rice', 'Pudding, tapioca, made from dry mix', 'Pudding, tapioca, ready-to-eat', 'Puerto Rican pasteles', 'Puerto Rican sandwich', 'Puerto Rican seasoning with ham', 'Puerto Rican seasoning with ham and tomato sauce', 'Puerto Rican seasoning without ham and tomato sauce', 'Puerto Rican stew', 'Puerto Rican white cheese', 'Puffs, fried, crab meat and cream cheese filled', 'Pumpkin seeds, NFS', 'Pumpkin seeds, salted', 'Pumpkin seeds, unsalted', 'Pumpkin, canned, cooked', 'Pumpkin, cooked', 'Pupusa, bean-filled', 'Pupusa, cheese-filled', 'Pupusa, meat-filled', 'Quail egg, canned', 'Quail, cooked', 'Quarter Pounder (McDonalds)', 'Quarter Pounder with cheese (McDonalds)', 'Quesadilla with chicken', 'Quesadilla with chicken, from fast food', 'Quesadilla with meat ', 'Quesadilla with vegetables', 'Quesadilla with vegetables and chicken', 'Quesadilla with vegetables and meat', 'Quesadilla, just cheese, from fast food', 'Quesadilla, just cheese, meatless', 'Queso Anejo, aged Mexican cheese', 'Queso Asadero', 'Queso Fresco', 'Queso cotija', 'Quiche with meat, poultry or fish', 'Quinoa, NS as to fat', 'Quinoa, fat added', 'Quinoa, no added fat', 'Rabbit stew with potatoes and vegetables', 'Rabbit, NS as to domestic or wild, breaded, fried', 'Rabbit, NS as to domestic or wild, cooked', 'Rabbit, domestic, NS as to cooking method', 'Rabbit, wild, cooked', 'Raccoon, cooked', 'Radicchio, raw', 'Radish, raw', 'Radishes, pickled, Hawaiian style', 'Raisins', 'Raisins, chocolate covered', 'Raisins, yogurt covered', 'Ranch dip, light', 'Ranch dip, regular', 'Ranch dip, yogurt based', 'Raspberries, frozen', 'Raspberries, raw', 'Ratatouille', 'Ravioli, NS as to filling, no sauce', 'Ravioli, NS as to filling, with cream sauce', 'Ravioli, NS as to filling, with tomato sauce', 'Ravioli, cheese and spinach filled, with tomato sauce', 'Ravioli, cheese and spinach-filled, no sauce', 'Ravioli, cheese and spinach-filled, with cream sauce', 'Ravioli, cheese-filled, no sauce', 'Ravioli, cheese-filled, with cream sauce', 'Ravioli, cheese-filled, with meat sauce', 'Ravioli, cheese-filled, with tomato sauce', 'Ravioli, cheese-filled, with tomato sauce, baby food, toddler', 'Ravioli, cheese-filled, with tomato sauce, canned', 'Ravioli, cheese-filled, with tomato sauce, diet frozen meal', 'Ravioli, meat-filled, no sauce', 'Ravioli, meat-filled, with cream sauce', 'Ravioli, meat-filled, with tomato sauce or meat sauce', 'Ravioli, meat-filled, with tomato sauce or meat sauce, canned', 'Raw vegetable, NFS', 'Ray, baked or broiled, fat added', 'Ray, baked or broiled, no added fat', 'Ray, coated, baked or broiled, fat added', 'Ray, coated, baked or broiled, no added fat', 'Ray, coated, fried', 'Ray, cooked, NS as to cooking method', 'Ray, steamed or poached', 'Red pepper, cooked, as ingredient', 'Reese\'s Crispy Crunchy Bar', 'Reese\'s Fast Break', 'Reese\'s Peanut Butter Cup', 'Reese\'s Pieces', 'Reese\'s Sticks', 'Refried beans', 'Refried beans with meat', 'Refried beans, from canned, reduced sodium', 'Refried beans, from fast food / restaurant', 'Relish, corn', 'Relish, pickle', 'Reuben sandwich, corned beef sandwich with sauerkraut and cheese, with spread', 'Rhubarb', 'Rice and potato soup, Puerto Rican style', 'Rice cake', 'Rice cereal with apples, baby food, dry, instant', 'Rice cereal with applesauce and bananas, baby food, jarred', 'Rice cereal with bananas, baby food, dry, instant', 'Rice cereal with mixed fruit, baby food, jarred', 'Rice cereal with mixed fruits, baby food, dry, instant', 'Rice cereal, baby food, dry, instant', 'Rice cereal, baby food, jarred, NFS', 'Rice croquette', 'Rice dessert or salad with fruit', 'Rice dressing', 'Rice meal fritter, Puerto Rican style', 'Rice milk', 'Rice noodles, cooked', 'Rice paper', 'Rice pilaf', 'Rice soup, NFS', 'Rice with Spanish sausage, Puerto Rican style', 'Rice with chicken, Puerto Rican style', 'Rice with onions, Puerto Rican style', 'Rice with raisins', 'Rice with squid, Puerto Rican style', 'Rice with stewed beans, Puerto Rican style', 'Rice with vienna sausage, Puerto Rican style', 'Rice, brown and wild, cooked, NS as to fat', 'Rice, brown and wild, cooked, fat added', 'Rice, brown and wild, cooked, no added fat', 'Rice, brown, cooked, NS as to fat', 'Rice, brown, cooked, fat added, NS as to fat type', 'Rice, brown, cooked, fat added, made with oil', 'Rice, brown, cooked, made with butter', 'Rice, brown, cooked, made with margarine', 'Rice, brown, cooked, no added fat', 'Rice, brown, with carrots and dark green vegetables, NS as to fat', 'Rice, brown, with carrots and dark green vegetables, fat added', 'Rice, brown, with carrots and dark green vegetables, no added fat', 'Rice, brown, with carrots and tomatoes and/or tomato-based sauce, NS as to fat', 'Rice, brown, with carrots and tomatoes and/or tomato-based sauce, fat added', 'Rice, brown, with carrots and tomatoes and/or tomato-based sauce, no added fat', 'Rice, brown, with carrots, NS as to fat', 'Rice, brown, with carrots, dark green vegetables, and tomatoes and/or tomato-based sauce, NS as to fat', 'Rice, brown, with carrots, dark green vegetables, and tomatoes and/or tomato-based sauce, fat added', 'Rice, brown, with carrots, dark green vegetables, and tomatoes and/or tomato-based sauce, no added fat', 'Rice, brown, with carrots, fat added', 'Rice, brown, with carrots, no added fat', 'Rice, brown, with cheese and/or cream based sauce, NS as to fat', 'Rice, brown, with cheese and/or cream based sauce, fat added', 'Rice, brown, with cheese and/or cream based sauce, no added fat', 'Rice, brown, with corn, NS as to fat', 'Rice, brown, with corn, fat added', 'Rice, brown, with corn, no added fat', 'Rice, brown, with dark green vegetables and tomatoes and/or tomato-based sauce, NS as to fat', 'Rice, brown, with dark green vegetables and tomatoes and/or tomato-based sauce, fat added', 'Rice, brown, with dark green vegetables and tomatoes and/or tomato-based sauce, no added fat', 'Rice, brown, with dark green vegetables, NS as to fat', 'Rice, brown, with dark green vegetables, fat added', 'Rice, brown, with dark green vegetables, no added fat', 'Rice, brown, with gravy, NS as to fat', 'Rice, brown, with gravy, fat added', 'Rice, brown, with gravy, no added fat', 'Rice, brown, with other vegetables, NS as to fat', 'Rice, brown, with other vegetables, fat added', 'Rice, brown, with other vegetables, no added fat', 'Rice, brown, with peas and carrots, NS as to fat', 'Rice, brown, with peas and carrots, fat added', 'Rice, brown, with peas and carrots, no added fat', 'Rice, brown, with peas, NS as to fat', 'Rice, brown, with peas, fat added', 'Rice, brown, with peas, no added fat', 'Rice, brown, with soy-based sauce, NS as to fat', 'Rice, brown, with soy-based sauce, fat added', 'Rice, brown, with soy-based sauce, no added fat', 'Rice, brown, with tomatoes and/or tomato based sauce, NS as to fat', 'Rice, brown, with tomatoes and/or tomato based sauce, fat added', 'Rice, brown, with tomatoes and/or tomato based sauce, no added fat', 'Rice, brown, with vegetables and gravy, NS as to fat', 'Rice, brown, with vegetables and gravy, fat added', 'Rice, brown, with vegetables and gravy, no added fat', 'Rice, brown, with vegetables, cheese and/or cream based sauce, NS as to fat', 'Rice, brown, with vegetables, cheese and/or cream based sauce, fat added', 'Rice, brown, with vegetables, cheese and/or cream based sauce, no added fat', 'Rice, brown, with vegetables, soy-based sauce, NS as to fat', 'Rice, brown, with vegetables, soy-based sauce, fat added', 'Rice, brown, with vegetables, soy-based sauce, no added fat', 'Rice, cooked with coconut milk', 'Rice, cooked, NFS', 'Rice, cooked, with milk', 'Rice, cream of, cooked, NS as to fat', 'Rice, cream of, cooked, fat added', 'Rice, cream of, cooked, made with milk', 'Rice, cream of, cooked, no added fat', 'Rice, creamed, made with milk and sugar, Puerto Rican style', 'Rice, fried, NFS', 'Rice, fried, meatless', 'Rice, fried, with beef', 'Rice, fried, with chicken', 'Rice, fried, with pork', 'Rice, fried, with shrimp', 'Rice, sweet, cooked with honey', 'Rice, white and wild, cooked, NS as to fat', 'Rice, white and wild, cooked, fat added', 'Rice, white and wild, cooked, no added fat', 'Rice, white, cooked with fat, Puerto Rican style', 'Rice, white, cooked, NS as to fat', 'Rice, white, cooked, fat added, NS as to fat type', 'Rice, white, cooked, glutinous', 'Rice, white, cooked, made with butter', 'Rice, white, cooked, made with margarine', 'Rice, white, cooked, made with oil', 'Rice, white, cooked, no added fat', 'Rice, white, with carrots and dark green vegetables, NS as to fat', 'Rice, white, with carrots and dark green vegetables, fat added', 'Rice, white, with carrots and dark green vegetables, no added fat', 'Rice, white, with carrots and tomatoes and/or tomato-based sauce, NS as to fat', 'Rice, white, with carrots and tomatoes and/or tomato-based sauce, fat added', 'Rice, white, with carrots and tomatoes and/or tomato-based sauce, no added fat', 'Rice, white, with carrots, NS as to fat', 'Rice, white, with carrots, dark green vegetables, and tomatoes and/or tomato-based sauce, NS as to fat', 'Rice, white, with carrots, dark green vegetables, and tomatoes and/or tomato-based sauce, fat added', 'Rice, white, with carrots, dark green vegetables, and tomatoes and/or tomato-based sauce, no added fat', 'Rice, white, with carrots, fat added', 'Rice, white, with carrots, no added fat', 'Rice, white, with cheese and/or cream based sauce, NS as to fat', 'Rice, white, with cheese and/or cream based sauce, fat added', 'Rice, white, with cheese and/or cream based sauce, no added fat', 'Rice, white, with corn, NS as to fat', 'Rice, white, with corn, fat added', 'Rice, white, with corn, no added fat', 'Rice, white, with dark green vegetables and tomatoes and/or tomato-based sauce, NS as to fat', 'Rice, white, with dark green vegetables and tomatoes and/or tomato-based sauce, fat added', 'Rice, white, with dark green vegetables and tomatoes and/or tomato-based sauce, no added fat', 'Rice, white, with dark green vegetables, NS as to fat', 'Rice, white, with dark green vegetables, fat added', 'Rice, white, with dark green vegetables, no added fat', 'Rice, white, with gravy, NS as to fat', 'Rice, white, with gravy, fat added', 'Rice, white, with gravy, no added fat', 'Rice, white, with lentils, NS as to fat', 'Rice, white, with lentils, fat added', 'Rice, white, with lentils, no added fat', 'Rice, white, with other vegetables, NS as to fat', 'Rice, white, with other vegetables, fat added', 'Rice, white, with other vegetables, no added fat', 'Rice, white, with peas and carrots, NS as to fat', 'Rice, white, with peas and carrots, fat added', 'Rice, white, with peas and carrots, no added fat', 'Rice, white, with peas, NS as to fat', 'Rice, white, with peas, fat added', 'Rice, white, with peas, no added fat', 'Rice, white, with soy-based sauce, NS as to fat', 'Rice, white, with soy-based sauce, fat added', 'Rice, white, with soy-based sauce, no added fat', 'Rice, white, with tomatoes and/or tomato-based sauce, NS as to fat', 'Rice, white, with tomatoes and/or tomato-based sauce, fat added', 'Rice, white, with tomatoes and/or tomato-based sauce, no added fat', 'Rice, white, with vegetables and gravy, NS as to fat', 'Rice, white, with vegetables and gravy, fat added', 'Rice, white, with vegetables and gravy, no added fat', 'Rice, white, with vegetables, cheese and/or cream based sauce, NS as to fat', 'Rice, white, with vegetables, cheese and/or cream based sauce, fat added', 'Rice, white, with vegetables, cheese and/or cream based sauce, no added fat', 'Rice, white, with vegetables, soy-based sauce, NS as to fat', 'Rice, white, with vegetables, soy-based sauce, fat added', 'Rice, white, with vegetables, soy-based sauce, no added fat', 'Rice, wild, 100%, cooked, NS as to fat', 'Rice, wild, 100%, cooked, fat added', 'Rice, wild, 100%, cooked, no added fat', 'Ripe plantain fritters, Puerto Rican style', 'Ripe plantain meat pie, Puerto Rican style', 'Ripe plantain omelet, Puerto Rican style', 'Ripe plantain, raw', 'Roast beef sandwich', 'Roast beef sandwich with bacon and cheese sauce', 'Roast beef sandwich with cheese', 'Roast beef sandwich, with gravy', 'Roast beef submarine sandwich, on roll, au jus', 'Roast beef submarine sandwich, with cheese, lettuce, tomato and spread', 'Roast beef submarine sandwich, with lettuce, tomato and spread', 'Rob Roy', 'Roe, herring', 'Roe, shad, cooked', 'Roe, sturgeon', 'Roll with meat and/or shrimp, vegetables and rice paper, not fried', 'Roll, French or Vienna', 'Roll, Mexican, bolillo', 'Roll, NS as to major flour', 'Roll, bran, NS as to type of bran', 'Roll, cheese', 'Roll, diet', 'Roll, egg bread', 'Roll, garlic', 'Roll, gluten free', 'Roll, hard, NS as to major flour', 'Roll, multigrain', 'Roll, multigrain, hamburger bun', 'Roll, multigrain, hot dog bun', 'Roll, oatmeal', 'Roll, pumpernickel', 'Roll, rye', 'Roll, sour dough', 'Roll, sweet, cinnamon bun, frosted', 'Roll, sweet, cinnamon bun, no frosting', 'Roll, sweet, frosted', 'Roll, sweet, no frosting', 'Roll, sweet, with fruit, frosted', 'Roll, sweet, with fruit, frosted, diet', 'Roll, wheat or cracked wheat', 'Roll, wheat or cracked wheat, hamburger bun', 'Roll, wheat or cracked wheat, hot dog bun', 'Roll, white, hamburger bun', 'Roll, white, hard', 'Roll, white, hoagie, submarine', 'Roll, white, hot dog bun', 'Roll, white, soft', 'Roll, whole grain white', 'Roll, whole grain white, hamburger bun', 'Roll, whole grain white, hot dog bun', 'Roll, whole wheat', 'Roll, whole wheat, hamburger bun', 'Roll, whole wheat, hot dog bun', 'Rolo', 'Romaine lettuce, raw', 'Rum', 'Rum and cola', 'Rum and diet cola', 'Rum cake, without icing', 'Rum cooler', 'Rum, hot buttered', 'Russian dressing', 'Russian dressing, fat free', 'Russian dressing, light', 'Rusty Nail', 'Rutabaga, cooked', 'Rutabaga, raw', 'SNICKERS Bar', 'Safflower oil', 'Salad dressing, NFS, for salads', 'Salad dressing, NFS, for sandwiches', 'Salad dressing, fat free, NFS', 'Salad dressing, light, NFS', 'Salami sandwich, with spread', 'Salami, NFS', 'Salami, made from any type of meat, reduced fat', 'Salami, made from any type of meat, reduced sodium', 'Salisbury steak dinner, NFS, frozen meal', 'Salisbury steak with gravy', 'Salisbury steak with gravy, macaroni and cheese, frozen meal', 'Salisbury steak with gravy, macaroni and cheese, vegetable, frozen meal', 'Salisbury steak with gravy, potatoes, vegetable, dessert, frozen meal', 'Salisbury steak with gravy, potatoes, vegetable, frozen meal', 'Salisbury steak with gravy, whipped potatoes, vegetable, dessert, frozen meal', 'Salisbury steak, baked, with tomato sauce, vegetable, diet frozen meal', 'Salisbury steak, potatoes, vegetable, dessert, diet frozen meal', 'Salmon cake or patty', 'Salmon cake sandwich', 'Salmon loaf', 'Salmon salad', 'Salmon soup, cream style', 'Salmon, baked or broiled, made with butter', 'Salmon, baked or broiled, made with cooking spray', 'Salmon, baked or broiled, made with margarine', 'Salmon, baked or broiled, made with oil', 'Salmon, baked or broiled, no added fat', 'Salmon, canned', 'Salmon, coated, baked or broiled, made with butter', 'Salmon, coated, baked or broiled, made with cooking spray', 'Salmon, coated, baked or broiled, made with margarine', 'Salmon, coated, baked or broiled, made with oil', 'Salmon, coated, baked or broiled, no added fat', 'Salmon, coated, fried, made with butter', 'Salmon, coated, fried, made with cooking spray', 'Salmon, coated, fried, made with margarine', 'Salmon, coated, fried, made with oil', 'Salmon, coated, fried, no added fat', 'Salmon, cooked, NS as to cooking method', 'Salmon, dried', 'Salmon, raw', 'Salmon, smoked', 'Salmon, steamed or poached', 'Salsa verde or salsa, green', 'Salsa, NFS', 'Salsa, pico de gallo', 'Salsa, red, commercially-prepared', 'Salsa, red, homemade', 'Salsify, cooked', 'Salt pork, cooked', 'Salty Dog', 'Sambar, vegetable stew', 'Sandwich spread', 'Sandwich spread, meat substitute type', 'Sandwich, NFS', 'Sangria, red', 'Sangria, white', 'Sardine sandwich', 'Sardines with mustard sauce', 'Sardines with tomato-based sauce', 'Sardines, canned in oil', 'Sardines, cooked', 'Sardines, dried', 'Sardines, skinless, boneless, packed in water', 'Sauce as ingredient in hamburgers', 'Sauerkraut', 'Sausage and cheese on English muffin', 'Sausage and french toast, frozen meal', 'Sausage and noodles with cream or white sauce', 'Sausage and peppers, no sauce', 'Sausage and rice with cheese sauce', 'Sausage and rice with mushroom sauce', 'Sausage and rice with tomato-based sauce', 'Sausage and spaghetti sauce sandwich', 'Sausage and vegetables including  carrots, broccoli, and/or dark-green leafy; no potatoes, tomato-based sauce', 'Sausage and vegetables, excluding carrots, broccoli, and dark-green leafy; no potatoes, tomato-based sauce', 'Sausage balls, made with biscuit mix and cheese', 'Sausage gravy', 'Sausage griddle cake sandwich', 'Sausage on biscuit', 'Sausage sandwich', 'Sausage with tomato-based sauce', 'Sausage, NFS', 'Sausage, noodles, and vegetables excluding carrots, broccoli, and dark-green leafy; tomato-based sauce', 'Sausage, noodles, and vegetables including carrots, broccoli, and/or dark-green leafy; tomato-based sauce', 'Sausage, potatoes, and vegetables excluding carrots, broccoli, and dark-green leafy; gravy', 'Sausage, potatoes, and vegetables including carrots, broccoli, and/or dark-green leafy; gravy', 'Scallops and noodles with cheese sauce', 'Scallops with cheese sauce', 'Scallops, baked or broiled, fat added', 'Scallops, baked or broiled, no added fat', 'Scallops, coated, baked or broiled, fat added', 'Scallops, coated, baked or broiled, no added fat', 'Scallops, coated, fried', 'Scallops, cooked, NS as to cooking method', 'Scallops, steamed or boiled', 'Scone', 'Scone, with fruit', 'Scotch', 'Scrambled egg sandwich', 'Scrambled eggs with jerked beef, Puerto Rican style', 'Scrapple, cooked', 'Screwdriver', 'Sea bass, baked or broiled, fat added', 'Sea bass, baked or broiled, no added fat', 'Sea bass, coated, baked or broiled, fat added', 'Sea bass, coated, baked or broiled, no added fat', 'Sea bass, coated, fried', 'Sea bass, cooked, NS as to cooking method', 'Sea bass, pickled', 'Sea bass, steamed or poached', 'Seabreeze', 'Seafood dip', 'Seafood garden salad with seafood, lettuce, eggs, tomato and/or carrots, other vegetables, no dressing', 'Seafood garden salad with seafood, lettuce, eggs, vegetables excluding tomato and carrots, no dressing', 'Seafood garden salad with seafood, lettuce, tomato and/or carrots, other vegetables, no dressing', 'Seafood garden salad with seafood, lettuce, vegetables excluding tomato and carrots, no dressing', 'Seafood newburg', 'Seafood paella, Puerto Rican style', 'Seafood restructured', 'Seafood salad', 'Seafood salad sandwich', 'Seafood sauce', 'Seafood souffle', 'Seafood soup with potatoes and vegetables including carrots, broccoli, and/or dark-green leafy', 'Seafood soup with potatoes, and vegetables excluding carrots, broccoli, and dark-green leafy', 'Seafood soup with vegetables excluding carrots, broccoli, and dark-green leafy; no potatoes', 'Seafood soup with vegetables including carrots, broccoli, and/or dark-green leafy; no potatoes', 'Seafood stew with potatoes and vegetables excluding carrots, broccoli, and dark-green leafy; tomato-based sauce', 'Seafood stew with potatoes and vegetables including carrots, broccoli, and/or dark-green leafy; tomato-based sauce', 'Seasoned shredded soup meat', 'Seaweed soup', 'Seaweed, cooked, fat added', 'Seaweed, cooked, no added fat', 'Seaweed, dried', 'Seaweed, pickled', 'Seaweed, raw', 'Sesame Crunch, Sahadi', 'Sesame chicken', 'Sesame dressing', 'Sesame dressing, light', 'Sesame oil', 'Sesame seeds', 'Seven and Seven', 'Seven-layer salad, lettuce salad made with a combination of onion, celery, green pepper, peas, mayonnaise, cheese, eggs, and/or bacon', 'Shark, baked or broiled, fat added', 'Shark, baked or broiled, no added fat', 'Shark, coated, baked or broiled, fat added', 'Shark, coated, baked or broiled, no added fat', 'Shark, coated, fried', 'Shark, cooked, NS as to cooking method', 'Shark, steamed or poached', 'Shav soup', 'Shellfish and noodles with tomato-based sauce', 'Shellfish mixture and vegetables excluding carrots, broccoli, and dark-green leafy; no potatoes, mushroom sauce', 'Shellfish mixture and vegetables excluding carrots, broccoli, and dark-green leafy; no potatoes, soy-based sauce', 'Shellfish mixture and vegetables including carrots, broccoli, and/or dark-green leafy; no potatoes, mushroom sauce', 'Shellfish mixture and vegetables including carrots, broccoli, and/or dark-green leafy; no potatoes, soy-based sauce', 'Shepherd\'s pie with beef', 'Shepherd\'s pie with lamb', 'Sherbet, all flavors', 'Shirley Temple', 'Shortening, NS as to vegetable or animal', 'Shrimp and clams in tomato-based sauce, with noodles, frozen meal', 'Shrimp and noodles with cheese sauce', 'Shrimp and noodles with cream or white sauce', 'Shrimp and noodles with gravy', 'Shrimp and noodles with mushroom sauce', 'Shrimp and noodles with soy-based sauce', 'Shrimp and noodles with tomato sauce', 'Shrimp and noodles, no sauce', 'Shrimp and vegetables excluding carrots, broccoli, and dark-green leafy; no potatoes, no sauce', 'Shrimp and vegetables excluding carrots, broccoli, and dark-green leafy; no potatoes, soy-based sauce', 'Shrimp and vegetables in sauce with noodles, diet frozen meal', 'Shrimp and vegetables including carrots, broccoli, and/or dark-green leafy; no potatoes, no sauce', 'Shrimp and vegetables including carrots, broccoli, and/or dark-green leafy; no potatoes, soy-based sauce', 'Shrimp cake or patty', 'Shrimp chips', 'Shrimp chow mein or chop suey with noodles', 'Shrimp chow mein or chop suey, no noodles', 'Shrimp cocktail', 'Shrimp creole, no rice', 'Shrimp creole, with rice', 'Shrimp egg foo yung', 'Shrimp garden salad, shrimp, lettuce, eggs, tomato and/or carrots, other vegetables, no dressing', 'Shrimp garden salad, shrimp, lettuce, eggs, vegetables excluding tomato and carrots, no dressing', 'Shrimp gumbo', 'Shrimp in garlic sauce, Puerto Rican style', 'Shrimp salad', 'Shrimp scampi', 'Shrimp shish kabob with vegetables, excluding potatoes', 'Shrimp soup, cream of, NS as to prepared with milk or water', 'Shrimp soup, cream of, prepared with milk', 'Shrimp soup, cream of, prepared with water', 'Shrimp teriyaki', 'Shrimp toast, fried', 'Shrimp with crab stuffing', 'Shrimp with lobster sauce', 'Shrimp, baked or broiled, made with butter', 'Shrimp, baked or broiled, made with cooking spray', 'Shrimp, baked or broiled, made with margarine', 'Shrimp, baked or broiled, made with oil', 'Shrimp, baked or broiled, no added fat', 'Shrimp, canned', 'Shrimp, coated, baked or broiled, made with butter', 'Shrimp, coated, baked or broiled, made with cooking spray', 'Shrimp, coated, baked or broiled, made with margarine', 'Shrimp, coated, baked or broiled, made with oil', 'Shrimp, coated, baked or broiled, no added fat', 'Shrimp, coated, fried, from fast food / restaurant', 'Shrimp, coated, fried, made with butter', 'Shrimp, coated, fried, made with cooking spray', 'Shrimp, coated, fried, made with margarine', 'Shrimp, coated, fried, made with oil', 'Shrimp, coated, fried, no added fat', 'Shrimp, cooked, NS as to cooking method', 'Shrimp, dried', 'Shrimp, steamed or boiled', 'Shrimp-egg patty', 'Simple syrup', 'Singapore Sling', 'Sirloin beef, with gravy, potatoes, vegetable, frozen meal', 'Sirloin tips, with gravy, potatoes, vegetable, frozen meal', 'Sirloin, chopped, with gravy, mashed potatoes, vegetable, frozen meal', 'Sixlets', 'Skittles', 'Sliced chicken sandwich, with cheese and spread', 'Sliced chicken sandwich, with spread', 'Sloe gin fizz', 'Slush frozen drink', 'Slush frozen drink, no sugar added', 'Snack bar, oatmeal', 'Snack cake, chocolate, with icing or filling', 'Snack cake, chocolate, with icing or filling, reduced fat and calories', 'Snack cake, not chocolate, with icing or filling', 'Snack cake, not chocolate, with icing or filling, reduced fat and calories', 'Snack mix', 'Snack mix, plain (Chex Mix)', 'Snails, cooked, NS as to cooking method', 'Snow cone', 'Snow cone, no sugar added', 'Snowpea, NS as to form, cooked', 'Snowpea, fresh, cooked, fat added', 'Snowpea, fresh, cooked, no added fat', 'Snowpea, frozen, cooked, fat added', 'Snowpea, frozen, cooked, no added fat', 'Snowpeas, raw', 'Soft drink, NFS', 'Soft drink, NFS, diet', 'Soft drink, chocolate flavored', 'Soft drink, chocolate flavored, diet', 'Soft drink, cola', 'Soft drink, cola, chocolate flavored', 'Soft drink, cola, chocolate flavored, diet', 'Soft drink, cola, decaffeinated', 'Soft drink, cola, decaffeinated, diet', 'Soft drink, cola, diet', 'Soft drink, cola, fruit or vanilla flavored', 'Soft drink, cola, fruit or vanilla flavored, diet', 'Soft drink, cola, reduced sugar', 'Soft drink, cream soda', 'Soft drink, cream soda, diet', 'Soft drink, fruit flavored, caffeine containing', 'Soft drink, fruit flavored, caffeine containing, diet', 'Soft drink, fruit flavored, caffeine free', 'Soft drink, fruit flavored, diet, caffeine free', 'Soft drink, ginger ale', 'Soft drink, ginger ale, diet', 'Soft drink, pepper type', 'Soft drink, pepper type, decaffeinated', 'Soft drink, pepper type, decaffeinated, diet', 'Soft drink, pepper type, diet', 'Soft drink, root beer', 'Soft drink, root beer, diet', 'Soft fruit confections', 'Soft serve, blended with candy or cookies, from fast food', 'Soft taco with beans', 'Soft taco with beans and sour cream', 'Soft taco with chicken', 'Soft taco with chicken and beans', 'Soft taco with chicken and sour cream', 'Soft taco with chicken, beans, and sour cream', 'Soft taco with chicken, from fast food', 'Soft taco with fish', 'Soft taco with meat', 'Soft taco with meat and beans', 'Soft taco with meat and sour cream', 'Soft taco with meat and sour cream, from fast food', 'Soft taco with meat, beans, and sour cream', 'Soft taco with meat, from fast food', 'Sopa Seca de Fideo, Mexican style, made with dry noodles, home recipe', 'Sopa de Fideo Aguada, Mexican style noodle soup, home recipe', 'Sopa de tortilla, Mexican style tortilla soup, home recipe', 'Sopa seca de arroz, home recipe, Mexican style', 'Sopa seca, Mexican style, NFS', 'Sopaipilla with syrup or honey', 'Sopaipilla, without syrup or honey', 'Sorbet', 'Soup, NFS', 'Soup, cream of, NFS', 'Soup, fruit', 'Soup, mostly noodles', 'Soup, mostly noodles, reduced sodium', 'Soupy rice mixture with chicken and potatoes, Puerto Rican style', 'Soupy rice with chicken, Puerto Rican style', 'Sour cream, fat free', 'Sour cream, imitation', 'Sour cream, light', 'Sour cream, regular', 'Soursop, nectar', 'Soy based sauce, for use with vegetables', 'Soy chips', 'Soy milk', 'Soy milk, chocolate', 'Soy milk, light', 'Soy milk, light, chocolate', 'Soy milk, nonfat', 'Soy milk, nonfat, chocolate', 'Soy nut butter', 'Soy nuts', 'Soy sauce', 'Soy sauce, reduced sodium', 'Soybean curd', 'Soybean curd cheese', 'Soybean curd, breaded, fried', 'Soybean curd, deep fried', 'Soybean oil', 'Soybean soup, miso broth', 'Soybeans, cooked', 'Soyburger, meatless, with cheese on bun', 'Spaghetti and meatballs dinner, NFS, frozen meal', 'Spaghetti sauce', 'Spaghetti sauce with added vegetables', 'Spaghetti sauce with meat', 'Spaghetti sauce with meat and added vegetables', 'Spaghetti sauce with poultry', 'Spaghetti sauce with poultry and added vegetables', 'Spaghetti sauce with seafood', 'Spaghetti sauce with seafood and added vegetables', 'Spaghetti sauce, fat free', 'Spaghetti sauce, reduced sodium', 'Spaghetti squash, cooked', 'Spaghetti with corned beef, Puerto Rican style', 'Spaghetti with meat and mushroom sauce, diet frozen meal', 'Spaghetti with meat sauce, diet frozen meal', 'Spaghetti, tomato sauce, and beef, baby food, junior', 'Spanakopitta', 'Spanish rice with ground beef', 'Spanish rice, NS as to fat', 'Spanish rice, fat added', 'Spanish rice, from restaurant', 'Spanish rice, no added fat', 'Spanish stew', 'Spanish vegetable soup, Puerto Rican style', 'Spinach and artichoke dip', 'Spinach and cheese casserole', 'Spinach dip, light', 'Spinach dip, regular', 'Spinach dip, yogurt based', 'Spinach quiche, meatless', 'Spinach salad, no dressing', 'Spinach souffle', 'Spinach soup', 'Spinach, NS as to form, cooked', 'Spinach, canned, cooked with butter or margarine', 'Spinach, canned, cooked with oil', 'Spinach, canned, cooked, fat added, NS as to fat type', 'Spinach, canned, cooked, no added fat', 'Spinach, cooked, as ingredient', 'Spinach, creamed', 'Spinach, creamed, baby food, strained', 'Spinach, for use on a sandwich', 'Spinach, fresh, cooked with butter or margarine', 'Spinach, fresh, cooked with oil', 'Spinach, fresh, cooked, fat added, NS as to fat type', 'Spinach, fresh, cooked, no added fat', 'Spinach, frozen, cooked with butter or margarine', 'Spinach, frozen, cooked with oil', 'Spinach, frozen, cooked, fat added, NS as to fat type', 'Spinach, frozen, cooked, no added fat', 'Spinach, raw', 'Split pea and ham soup', 'Split pea and ham soup, canned, reduced sodium, prepared with water or ready-to-serve', 'Split pea soup', 'Split pea soup, canned, reduced sodium, prepared with water or ready-to-serve', 'Split peas, from dried, fat added', 'Split peas, from dried, no added fat', 'Spoonbread', 'Sports drink (Gatorade G)', 'Sports drink (Powerade)', 'Sports drink, NFS', 'Sports drink, dry concentrate, not reconstituted', 'Sports drink, low calorie', 'Sports drink, low calorie (Gatorade G2)', 'Sports drink, low calorie (Powerade Zero)', 'Sprouts, NFS', 'Squash and corn, baby food, strained', 'Squash fritter or cake', 'Squash, baby food, NS as to strained or junior', 'Squash, baby food, junior', 'Squash, baby food, strained', 'Squash, summer, casserole with tomato and cheese', 'Squash, summer, casserole, with cheese sauce', 'Squash, summer, casserole, with rice and tomato sauce', 'Squash, summer, souffle', 'Squash, winter type, soup, home recipe, canned, or ready-to-serve', 'Squash, winter, souffle', 'Squid, baked or broiled, fat added', 'Squid, baked or broiled, no added fat', 'Squid, canned', 'Squid, coated, baked or broiled, fat added', 'Squid, coated, baked or broiled, no added fat', 'Squid, coated, fried', 'Squid, dried', 'Squid, pickled', 'Squid, raw', 'Squid, steamed or boiled', 'Squirrel, cooked', 'Starfruit, raw', 'Steak and cheese sandwich, plain, on roll', 'Steak and cheese submarine sandwich, plain, on roll', 'Steak and cheese submarine sandwich, with fried peppers and onions, on roll', 'Steak and cheese submarine sandwich, with lettuce and tomato', 'Steak sandwich, plain, on biscuit', 'Steak sandwich, plain, on roll', 'Steak sauce', 'Steak submarine sandwich with lettuce and tomato', 'Steak tartare', 'Steak teriyaki', 'Steak, NS as to type of meat, cooked, NS as to fat eaten', 'Steak, NS as to type of meat, cooked, lean and fat eaten', 'Steak, NS as to type of meat, cooked, lean only eaten', 'Stew, NFS', 'Stewed chicken with tomato-based sauce, Mexican style', 'Stewed chitterlings, Puerto Rican style', 'Stewed codfish, Puerto Rican style', 'Stewed codfish, no potatoes, Puerto Rican style', 'Stewed corned beef, Puerto Rican style', 'Stewed dried beef, Puerto Rican style', 'Stewed gizzards, Puerto Rican style', 'Stewed goat, Puerto Rican style', 'Stewed pig\'s feet, Puerto Rican style', 'Stewed pork, Puerto Rican style', 'Stewed potatoes', 'Stewed potatoes with tomatoes', 'Stewed potatoes, Puerto Rican style', 'Stewed rabbit, Puerto Rican style,', 'Stewed rice, Puerto Rican style', 'Stewed salmon, Puerto Rican style', 'Stewed seasoned ground beef, Mexican style', 'Stewed seasoned ground beef, Puerto Rican style', 'Stewed tripe, with potatoes, Puerto Rican style', 'Stewed variety meats, mostly liver, Puerto Rican style', 'Stewed, seasoned, ground beef and pork with potatoes, Mexican style', 'Stewed, seasoned, ground beef and pork, Mexican style', 'Stewed, seasoned, ground beef with potatoes, Mexican style', 'Stinger', 'Stir fried beef and vegetables in soy sauce', 'Strawberries, canned', 'Strawberries, frozen', 'Strawberries, raw', 'Strawberry beverage powder, dry mix, not reconstituted', 'Strawberry drink syrup', 'Strawberry juice, 100%', 'Strawberry milk, NFS', 'Strawberry milk, fat free', 'Strawberry milk, low fat', 'Strawberry milk, non-dairy', 'Strawberry milk, reduced fat', 'Strawberry milk, reduced sugar', 'Strawberry milk, whole', 'Strudel, apple', 'Strudel, berry', 'Strudel, cheese', 'Strudel, cheese and fruit', 'Strudel, cherry', 'Strudel, peach', 'Stuffed cabbage rolls with beef and rice', 'Stuffed cabbage, with meat and rice, Syrian dish, Puerto Rican style', 'Stuffed cabbage, with meat, Puerto Rican style', 'Stuffed chicken, drumstick or breast, Puerto Rican style', 'Stuffed christophine, Puerto Rican style', 'Stuffed grape leaves with beef and rice', 'Stuffed grape leaves with lamb and rice', 'Stuffed green pepper, Puerto Rican style', 'Stuffed jalapeno pepper', 'Stuffed pepper, with meat', 'Stuffed pepper, with rice and meat', 'Stuffed pepper, with rice, meatless', 'Stuffed pork roast, Puerto Rican style', 'Stuffed pot roast, Puerto Rican style, NFS', 'Stuffed pot roast, with potatoes, Puerto Rican style', 'Stuffed shells, cheese- and spinach- filled, no sauce', 'Stuffed shells, cheese-filled, no sauce', 'Stuffed shells, cheese-filled, with meat sauce', 'Stuffed shells, cheese-filled, with tomato sauce, meatless', 'Stuffed shells, with chicken, with tomato sauce', 'Stuffed shells, with fish and/or shellfish, with tomato sauce', 'Stuffed tannier fritters, Puerto Rican style', 'Stuffed tomato, with rice and meat', 'Stuffed tomato, with rice, meatless', 'Sturgeon, baked or broiled, fat added', 'Sturgeon, coated, fried', 'Sturgeon, cooked, NS as to cooking method', 'Sturgeon, smoked', 'Sturgeon, steamed', 'Sugar cane beverage', 'Sugar substitute and sugar blend', 'Sugar substitute, aspartame, powder', 'Sugar substitute, liquid, NFS', 'Sugar substitute, monk fruit, powder', 'Sugar substitute, powder, NFS', 'Sugar substitute, saccharin, liquid', 'Sugar substitute, saccharin, powder', 'Sugar substitute, stevia, liquid', 'Sugar substitute, stevia, powder', 'Sugar substitute, sucralose, powder', 'Sugar, NFS', 'Sugar, brown', 'Sugar, cinnamon', 'Sugar, white, confectioner\'s, powdered', 'Sugar, white, granulated or lump', 'Sugar-coated chocolate discs', 'Sugared pecans, sugar and egg white coating', 'Summer squash, cooked, as ingredient', 'Summer squash, green, raw', 'Summer squash, yellow or green, NS as to form, cooked', 'Summer squash, yellow or green, canned, cooked with butter or margarine', 'Summer squash, yellow or green, canned, cooked with oil', 'Summer squash, yellow or green, canned, cooked, fat added, NS as to fat type', 'Summer squash, yellow or green, canned, cooked, no added fat', 'Summer squash, yellow or green, fresh, cooked with butter or margarine', 'Summer squash, yellow or green, fresh, cooked with oil', 'Summer squash, yellow or green, fresh, cooked, fat added, NS as to fat type', 'Summer squash, yellow or green, fresh, cooked, no added fat', 'Summer squash, yellow or green, frozen, cooked with butter or margarine', 'Summer squash, yellow or green, frozen, cooked with oil', 'Summer squash, yellow or green, frozen, cooked, fat added, NS as to fat type', 'Summer squash, yellow or green, frozen, cooked, no added fat', 'Summer squash, yellow, raw', 'Sun-dried tomatoes', 'Sunflower oil', 'Sunflower seeds, NFS', 'Sunflower seeds, flavored', 'Sunflower seeds, plain, salted', 'Sunflower seeds, plain, unsalted', 'Sushi roll tuna', 'Sushi roll, California', 'Sushi roll, avocado', 'Sushi roll, eel', 'Sushi roll, salmon', 'Sushi roll, shrimp', 'Sushi roll, vegetable', 'Sushi, NFS', 'Sushi, topped with crab', 'Sushi, topped with eel', 'Sushi, topped with egg', 'Sushi, topped with salmon', 'Sushi, topped with shrimp', 'Sushi, topped with tuna', 'Swedish meatballs with cream or white sauce', 'Sweet and sour chicken or turkey', 'Sweet and sour chicken or turkey, without vegetables', 'Sweet and sour pork', 'Sweet and sour pork with rice', 'Sweet and sour sauce', 'Sweet and sour shrimp', 'Sweet and sour soup', 'Sweet bread dough, filled with bean paste, meatless, steamed', 'Sweet bread dough, filled with meat, steamed', 'Sweet potato and pumpkin casserole, Puerto Rican style', 'Sweet potato chips', 'Sweet potato fries, NFS', 'Sweet potato fries, NS as to fresh or frozen', 'Sweet potato fries, fast food / restaurant', 'Sweet potato fries, from fresh, baked', 'Sweet potato fries, from fresh, fried', 'Sweet potato fries, frozen, baked', 'Sweet potato fries, frozen, fried', 'Sweet potato fries, school', 'Sweet potato paste', 'Sweet potato tots, NFS', 'Sweet potato tots, fast food / restaurant', 'Sweet potato tots, from frozen, NS as to fried or baked', 'Sweet potato tots, from frozen, baked', 'Sweet potato tots, from frozen, fried', 'Sweet potato tots, school', 'Sweet potato, NFS', 'Sweet potato, baked, peel eaten, NS as to fat', 'Sweet potato, baked, peel eaten, fat added, NS as to fat type', 'Sweet potato, baked, peel eaten, made with butter', 'Sweet potato, baked, peel eaten, made with margarine', 'Sweet potato, baked, peel eaten, made with oil', 'Sweet potato, baked, peel eaten, no added fat', 'Sweet potato, baked, peel not eaten, NS as to fat', 'Sweet potato, baked, peel not eaten, fat added, NS as to fat type', 'Sweet potato, baked, peel not eaten, made with butter', 'Sweet potato, baked, peel not eaten, made with margarine', 'Sweet potato, baked, peel not eaten, made with oil', 'Sweet potato, baked, peel not eaten, no added fat', 'Sweet potato, boiled, NS as to fat', 'Sweet potato, boiled, fat added, NS as to fat type', 'Sweet potato, boiled, made with butter', 'Sweet potato, boiled, made with margarine', 'Sweet potato, boiled, made with oil', 'Sweet potato, boiled, no added fat', 'Sweet potato, candied', 'Sweet potato, canned, NS as to fat', 'Sweet potato, canned, fat added', 'Sweet potato, canned, no added fat', 'Sweet potato, casserole or mashed', 'Sweet potato, squash, pumpkin, chrysanthemum, or bean leaves, cooked', 'Sweet potato, yellow, Puerto Rican, cooked', 'Sweet potatoes and chicken, baby food, strained', 'Sweet potatoes, baby food, NS as to strained or junior', 'Sweet potatoes, baby food, junior', 'Sweet potatoes, baby food, strained', 'Sweetbreads, cooked', 'Swiss steak', 'Swiss steak, with gravy, meatless', 'Swordfish, baked or broiled, fat added', 'Swordfish, baked or broiled, no added fat', 'Swordfish, coated, baked or broiled, fat added', 'Swordfish, coated, baked or broiled, no added fat', 'Swordfish, coated, fried', 'Swordfish, cooked, NS as to cooking method', 'Swordfish, steamed or poached', 'Syrup, NFS', 'Szechuan beef', 'TWIX Caramel Cookie Bars', 'TWIX Chocolate Fudge Cookie Bars', 'TWIX Peanut Butter Cookie Bars', 'Tabbouleh', 'Table fat, NFS', 'Taco or tostada salad with chicken', 'Taco or tostada salad with chicken and sour cream', 'Taco or tostada salad with meat', 'Taco or tostada salad with meat and sour cream', 'Taco or tostada salad, meatless', 'Taco or tostada salad, meatless with sour cream', 'Taco or tostada with beans', 'Taco or tostada with beans and sour cream', 'Taco or tostada with chicken', 'Taco or tostada with chicken and beans', 'Taco or tostada with chicken and sour cream', 'Taco or tostada with chicken, beans, and sour cream', 'Taco or tostada with fish', 'Taco or tostada with meat', 'Taco or tostada with meat and beans', 'Taco or tostada with meat and beans, from fast food', 'Taco or tostada with meat and sour cream', 'Taco or tostada with meat, beans, and sour cream', 'Taco or tostada with meat, from fast food', 'Taco sauce', 'Taco shell, corn', 'Taco shell, flour', 'Taco with crab meat, Puerto Rican style', 'Taffy', 'Tahini', 'Tamal in a leaf, Puerto Rican style', 'Tamale casserole with meat', 'Tamale casserole, Puerto Rican style', 'Tamale with chicken', 'Tamale with meat', 'Tamale, meatless, with sauce, Puerto Rican or Caribbean style', 'Tamale, plain, meatless, no sauce, Mexican style', 'Tamale, sweet', 'Tamale, sweet, with fruit', 'Tamarind', 'Tamarind candy', 'Tamarind drink', 'Tamarind, dried', 'Tangerine juice, 100%', 'Tangerine, raw', 'Tannier, cooked', 'Taquito or flauta with cheese', 'Taquito or flauta with chicken', 'Taquito or flauta with chicken and cheese', 'Taquito or flauta with egg', 'Taquito or flauta with egg and breakfast meat', 'Taquito or flauta with meat', 'Taquito or flauta with meat and cheese', 'Taro chips', 'Taro leaves, cooked', 'Taro, cooked', 'Tartar sauce', 'Tea, hot, chai, with milk', 'Tea, hot, chamomile', 'Tea, hot, herbal', 'Tea, hot, hibiscus ', 'Tea, hot, leaf, black', 'Tea, hot, leaf, black, decaffeinated', 'Tea, hot, leaf, green', 'Tea, hot, leaf, green, decaffeinated', 'Tea, hot, leaf, oolong', 'Tea, iced, bottled, black', 'Tea, iced, bottled, black, decaffeinated', 'Tea, iced, bottled, black, decaffeinated, diet', 'Tea, iced, bottled, black, decaffeinated, unsweetened', 'Tea, iced, bottled, black, diet', 'Tea, iced, bottled, black, unsweetened', 'Tea, iced, bottled, green', 'Tea, iced, bottled, green, diet', 'Tea, iced, bottled, green, unsweetened', 'Tea, iced, brewed, black, decaffeinated, pre-sweetened with low calorie sweetener', 'Tea, iced, brewed, black, decaffeinated, pre-sweetened with sugar', 'Tea, iced, brewed, black, decaffeinated, unsweetened', 'Tea, iced, brewed, black, pre-sweetened with low calorie sweetener', 'Tea, iced, brewed, black, pre-sweetened with sugar', 'Tea, iced, brewed, black, unsweetened', 'Tea, iced, brewed, green, decaffeinated, pre-sweetened with low calorie sweetener', 'Tea, iced, brewed, green, decaffeinated, pre-sweetened with sugar', 'Tea, iced, brewed, green, decaffeinated, unsweetened', 'Tea, iced, brewed, green, pre-sweetened with low calorie sweetener', 'Tea, iced, brewed, green, pre-sweetened with sugar', 'Tea, iced, brewed, green, unsweetened', 'Tea, iced, instant, black, decaffeinated, pre-sweetened with low calorie sweetener', 'Tea, iced, instant, black, decaffeinated, pre-sweetened with sugar', 'Tea, iced, instant, black, decaffeinated, unsweetened', 'Tea, iced, instant, black, pre-sweetened with low calorie sweetener', 'Tea, iced, instant, black, pre-sweetened with sugar', 'Tea, iced, instant, black, pre-sweetened, dry', 'Tea, iced, instant, black, unsweetened', 'Tea, iced, instant, black, unsweetened, dry', 'Tea, iced, instant, green, pre-sweetened with low calorie sweetener', 'Tea, iced, instant, green, pre-sweetened with sugar', 'Tea, iced, instant, green, unsweetened', 'Tequila ', 'Tequila Sunrise', 'Teriyaki chicken with rice and vegetable, diet frozen meal', 'Teriyaki sauce', 'Teriyaki sauce, reduced sodium', 'Textured vegetable protein, dry', 'Thistle leaves, cooked', 'Thousand Island dressing', 'Thousand Island dressing, fat free', 'Thousand Island dressing, light', 'Thuringer', 'Tilapia, baked or broiled, made with butter', 'Tilapia, baked or broiled, made with cooking spray', 'Tilapia, baked or broiled, made with margarine', 'Tilapia, baked or broiled, made with oil', 'Tilapia, baked or broiled, no added fat', 'Tilapia, coated, baked or broiled, made with butter', 'Tilapia, coated, baked or broiled, made with cooking spray', 'Tilapia, coated, baked or broiled, made with margarine', 'Tilapia, coated, baked or broiled, made with oil', 'Tilapia, coated, baked or broiled, no added fat', 'Tilapia, coated, fried, made with butter', 'Tilapia, coated, fried, made with cooking spray', 'Tilapia, coated, fried, made with margarine', 'Tilapia, coated, fried, made with oil', 'Tilapia, coated, fried, no added fat', 'Tilapia, cooked, NS as to cooking method', 'Tilapia, steamed or poached', 'Tiramisu', 'Toblerone, milk chocolate with honey and almond nougat', 'Toffee, chocolate covered', 'Toffee, chocolate-coated, with nuts', 'Toffee, plain', 'Tofu and vegetables excluding carrots, broccoli, and dark-green leafy; no potatoes, with soy-based sauce', 'Tofu and vegetables including carrots, broccoli, and/or dark-green leafy; no potatoes, with soy-based sauce', 'Tom Collins', 'Tomato and cucumber salad made with tomato, cucumber, oil, and vinegar', 'Tomato and vegetable juice, 100%', 'Tomato and vegetable juice, 100%, low sodium', 'Tomato aspic', 'Tomato beef noodle soup, prepared with water', 'Tomato beef rice soup, prepared with water', 'Tomato beef soup, prepared with water', 'Tomato chili sauce', 'Tomato juice cocktail', 'Tomato juice, 100%', 'Tomato juice, 100%, low sodium', 'Tomato noodle soup, canned, prepared with milk', 'Tomato noodle soup, canned, prepared with water or ready-to-serve', 'Tomato rice soup, prepared with water', 'Tomato sandwich', 'Tomato sauce, for use with vegetables', 'Tomato soup, NFS', 'Tomato soup, canned, reduced sodium, prepared with milk', 'Tomato soup, canned, reduced sodium, prepared with water, or ready-to-serve', 'Tomato soup, cream of, prepared with milk', 'Tomato soup, instant type, prepared with water', 'Tomato soup, prepared with water, or ready-to-serve', 'Tomato vegetable soup with noodles, prepared with water', 'Tomato vegetable soup, prepared with water', 'Tomato, green, pickled', 'Tomatoes as ingredient in omelet', 'Tomatoes, NS as to form, cooked', 'Tomatoes, canned, cooked', 'Tomatoes, canned, reduced sodium, cooked', 'Tomatoes, cooked, as ingredient', 'Tomatoes, for use on a sandwich', 'Tomatoes, fresh, cooked', 'Tomatoes, raw', 'Tomatoes, scalloped', 'Tongue pot roast, Puerto Rican style', 'Tongue, cooked', 'Tongue, smoked, cured, or pickled, cooked', 'Topping from cheese pizza', 'Topping from meat and vegetable pizza', 'Topping from meat pizza', 'Topping from vegetable pizza', 'Topping, butterscotch or caramel', 'Topping, chocolate', 'Topping, chocolate flavored hazelnut spread', 'Topping, fruit', 'Topping, marshmallow', 'Topping, nuts and syrup', 'Tortellini, cheese-filled, meatless, with tomato sauce', 'Tortellini, cheese-filled, meatless, with tomato sauce, canned', 'Tortellini, cheese-filled, meatless, with vinaigrette dressing', 'Tortellini, cheese-filled, no sauce', 'Tortellini, cheese-filled, with cream sauce', 'Tortellini, meat-filled, no sauce', 'Tortellini, meat-filled, with tomato sauce', 'Tortellini, meat-filled, with tomato sauce, canned', 'Tortellini, spinach-filled, no sauce', 'Tortellini, spinach-filled, with tomato sauce', 'Tortilla chips, cool ranch flavor (Doritos)', 'Tortilla chips, flavored', 'Tortilla chips, low fat, unsalted', 'Tortilla chips, nacho cheese flavor (Doritos)', 'Tortilla chips, other flavors (Doritos)', 'Tortilla chips, plain', 'Tortilla chips, popped', 'Tortilla chips, reduced fat, flavored', 'Tortilla chips, reduced fat, plain', 'Tortilla chips, reduced sodium', 'Tortilla, NFS', 'Tortilla, corn', 'Tortilla, flour', 'Tortilla, whole wheat', 'Trail mix with chocolate', 'Trail mix with nuts', 'Trail mix with nuts and fruit', 'Trail mix with pretzels, cereal, or granola', 'Trail mix, NFS', 'Trifle', 'Tripe, cooked', 'Tropical fruit medley, baby food, strained', 'Trout, baked or broiled, made with butter', 'Trout, baked or broiled, made with cooking spray', 'Trout, baked or broiled, made with margarine', 'Trout, baked or broiled, made with oil', 'Trout, baked or broiled, no added fat', 'Trout, coated, baked or broiled, made with butter', 'Trout, coated, baked or broiled, made with cooking spray', 'Trout, coated, baked or broiled, made with margarine', 'Trout, coated, baked or broiled, made with oil', 'Trout, coated, baked or broiled, no added fat', 'Trout, coated, fried, made with butter', 'Trout, coated, fried, made with cooking spray', 'Trout, coated, fried, made with margarine', 'Trout, coated, fried, made with oil', 'Trout, coated, fried, no added fat', 'Trout, cooked, NS as to cooking method', 'Trout, smoked', 'Trout, steamed or poached', 'Truffles', 'Tuna and rice with mushroom sauce', 'Tuna cake or patty', 'Tuna casserole with vegetables and mushroom sauce, no noodles', 'Tuna loaf', 'Tuna noodle casserole with cream or white sauce', 'Tuna noodle casserole with mushroom sauce', 'Tuna noodle casserole with vegetables and mushroom sauce', 'Tuna noodle casserole with vegetables, cream or white sauce', 'Tuna pot pie', 'Tuna salad sandwich, on bread', 'Tuna salad sandwich, on bread, with cheese', 'Tuna salad sandwich, on bun', 'Tuna salad sandwich, on bun, with cheese', 'Tuna salad with cheese', 'Tuna salad with egg', 'Tuna salad wrap sandwich', 'Tuna salad, made with Italian dressing', 'Tuna salad, made with any type of fat free dressing', 'Tuna salad, made with creamy dressing', 'Tuna salad, made with light Italian dressing', 'Tuna salad, made with light creamy dressing', 'Tuna salad, made with light mayonnaise', 'Tuna salad, made with light mayonnaise-type salad dressing', 'Tuna salad, made with mayonnaise', 'Tuna salad, made with mayonnaise-type salad dressing', 'Tuna with cream or white sauce', 'Tuna, canned, NS as to oil or water pack', 'Tuna, canned, oil pack', 'Tuna, canned, water pack', 'Tuna, fresh, baked or broiled, fat added', 'Tuna, fresh, baked or broiled, no added fat', 'Tuna, fresh, coated, baked or broiled, fat added', 'Tuna, fresh, coated, baked or broiled, no added fat', 'Tuna, fresh, coated, fried', 'Tuna, fresh, cooked, NS as to cooking method', 'Tuna, fresh, dried', 'Tuna, fresh, raw', 'Tuna, fresh, smoked', 'Tuna, fresh, steamed or poached', 'Turkey and bacon submarine sandwich, with cheese, lettuce, tomato and spread', 'Turkey and bacon submarine sandwich, with lettuce, tomato and spread', 'Turkey bacon, cooked', 'Turkey bacon, reduced sodium, cooked', 'Turkey dinner, NFS, frozen meal', 'Turkey ham, prepackaged or deli, luncheon meat', 'Turkey light or dark meat, stewed, skin eaten', 'Turkey or chicken and beef sausage', 'Turkey or chicken and pork sausage', 'Turkey or chicken burger, on wheat bun', 'Turkey or chicken burger, on white bun', 'Turkey or chicken sausage', 'Turkey or chicken sausage, reduced fat', 'Turkey or chicken sausage, reduced sodium', 'Turkey or chicken, pork, and beef sausage, reduced sodium', 'Turkey salad or turkey spread sandwich', 'Turkey sandwich, with spread', 'Turkey stick, baby food', 'Turkey submarine sandwich, with cheese, lettuce, tomato and spread', 'Turkey with barbecue sauce, skin eaten', 'Turkey with barbecue sauce, skin not eaten', 'Turkey with gravy', 'Turkey with gravy, dressing, potatoes, vegetable, frozen meal', 'Turkey with gravy, dressing, vegetable and fruit, diet frozen meal', 'Turkey with vegetable, stuffing, diet frozen meal', 'Turkey, NFS', 'Turkey, baby food, NS as to strained or junior', 'Turkey, baby food, junior', 'Turkey, baby food, strained', 'Turkey, back', 'Turkey, canned', 'Turkey, dark meat, roasted, skin eaten', 'Turkey, dark meat, roasted, skin not eaten', 'Turkey, drumstick, cooked, skin eaten', 'Turkey, drumstick, cooked, skin not eaten', 'Turkey, drumstick, roasted, skin eaten', 'Turkey, drumstick, roasted, skin not eaten', 'Turkey, drumstick, smoked, skin eaten', 'Turkey, ground', 'Turkey, ham, and roast beef club sandwich with cheese, lettuce, tomato, and spread', 'Turkey, ham, and roast beef club sandwich, with lettuce, tomato and spread', 'Turkey, light and dark meat, roasted, skin eaten', 'Turkey, light and dark meat, roasted, skin not eaten', 'Turkey, light meat, breaded, baked or fried, skin eaten', 'Turkey, light meat, breaded, baked or fried, skin not eaten', 'Turkey, light meat, roasted, skin eaten', 'Turkey, light meat, roasted, skin not eaten', 'Turkey, light meat, skin eaten', 'Turkey, light meat, skin not eaten', 'Turkey, light or dark meat, fried, coated, skin eaten', 'Turkey, light or dark meat, fried, coated, skin not eaten', 'Turkey, light or dark meat, smoked, skin eaten', 'Turkey, light or dark meat, smoked, skin not eaten', 'Turkey, light or dark meat, stewed, skin not eaten', 'Turkey, neck', 'Turkey, nuggets', 'Turkey, prepackaged or deli, luncheon meat', 'Turkey, prepackaged or deli, luncheon meat, reduced sodium', 'Turkey, rice and vegetables, baby food, NS as to strained or junior', 'Turkey, rice and vegetables, baby food, junior', 'Turkey, rice and vegetables, baby food, strained', 'Turkey, rice, and vegetables, baby food, toddler', 'Turkey, tail', 'Turkey, thigh, cooked, skin eaten', 'Turkey, thigh, cooked, skin not eaten', 'Turkey, wing, cooked, skin eaten', 'Turkey, wing, cooked, skin not eaten', 'Turkey, wing, smoked, skin eaten', 'Turnip greens, canned, cooked, fat added', 'Turnip greens, canned, cooked, no added fat', 'Turnip greens, canned, reduced sodium, cooked, fat added', 'Turnip greens, canned, reduced sodium, cooked, no added fat', 'Turnip greens, fresh, cooked, fat added', 'Turnip greens, fresh, cooked, no added fat', 'Turnip greens, frozen, cooked, fat added', 'Turnip greens, frozen, cooked, no added fat', 'Turnip, cooked', 'Turnip, pickled', 'Turnip, raw', 'Turnover filled with ground beef and cabbage', 'Turnover filled with meat and vegetable, no potatoes, no gravy', 'Turnover or dumpling, apple', 'Turnover or dumpling, berry', 'Turnover or dumpling, cherry', 'Turnover or dumpling, lemon', 'Turnover or dumpling, peach', 'Turnover, cheese-filled, tomato-based sauce', 'Turnover, chicken- or turkey-, and cheese-filled, no gravy', 'Turnover, chicken- or turkey-, and vegetable-filled, lower in fat', 'Turnover, filled with egg, meat and cheese', 'Turnover, filled with egg, meat, and cheese, lower in fat', 'Turnover, guava', 'Turnover, meat- and bean-filled, no gravy', 'Turnover, meat- and cheese-filled, lower in fat', 'Turnover, meat- and cheese-filled, no gravy', 'Turnover, meat- and cheese-filled, tomato-based sauce', 'Turnover, meat- and cheese-filled, tomato-based sauce, lower in fat', 'Turnover, meat-, potato-, and vegetable-filled, no gravy', 'Turnover, meat-filled, no gravy', 'Turnover, meat-filled, with gravy', 'Turnover, pumpkin', 'Turrnip greens, NS as to form, cooked', 'Turtle and vegetable soup', 'Turtle, cooked, NS as to cooking method', 'Tutti-fruitti pudding, baby food, NS as to strained or junior', 'Tutti-fruitti pudding, baby food, junior', 'Tutti-fruitti pudding, baby food, strained', 'Tzatziki dip', 'Upma, Indian breakfast dish', 'Vada, fried dumpling', 'Vanilla wafer dessert base', 'Veal Marsala', 'Veal and noodles with cream or white sauce', 'Veal chop, NS as to cooking method, NS as to fat eaten', 'Veal chop, NS as to cooking method, lean and fat eaten', 'Veal chop, NS as to cooking method, lean only eaten', 'Veal chop, broiled, NS as to fat eaten', 'Veal chop, broiled, lean and fat eaten', 'Veal chop, broiled, lean only eaten', 'Veal chop, fried, NS as to fat eaten', 'Veal chop, fried, lean and fat eaten', 'Veal chop, fried, lean only eaten', 'Veal cordon bleu', 'Veal cutlet or steak, NS as to cooking method, NS as to fat eaten', 'Veal cutlet or steak, NS as to cooking method, lean and fat eaten', 'Veal cutlet or steak, NS as to cooking method, lean only eaten', 'Veal cutlet or steak, broiled, NS as to fat eaten', 'Veal cutlet or steak, broiled, lean and fat eaten', 'Veal cutlet or steak, broiled, lean only eaten', 'Veal cutlet or steak, fried, NS as to fat eaten', 'Veal cutlet or steak, fried, lean and fat eaten', 'Veal cutlet or steak, fried, lean only eaten', 'Veal fricassee, Puerto Rican style', 'Veal goulash with vegetables excluding carrots, broccoli, and dark-green leafy; no potatoes, tomato-based sauce', 'Veal goulash with vegetables including carrots, broccoli, and/or dark-green leafy; no potatoes, tomato-based sauce', 'Veal parmigiana', 'Veal patty, breaded, cooked', 'Veal scallopini', 'Veal stew with potatoes and vegetables excluding carrots, broccoli, and/or dark-green leafy; tomato-based sauce', 'Veal stew with potatoes and vegetables including carrots, broccoli, and/or dark-green leafy; tomato-based sauce', 'Veal with butter sauce', 'Veal with cream sauce', 'Veal with gravy', 'Veal with vegetables excluding carrots, broccoli, and dark-green leafy; and potatoes, cream or white sauce', 'Veal with vegetables including carrots, broccoli, and/or dark-green leafy; no potatoes, cream or white sauce', 'Veal, NS as to cut, cooked, NS as to fat eaten', 'Veal, NS as to cut, cooked, lean and fat eaten', 'Veal, NS as to cut, cooked, lean only eaten', 'Veal, baby food, strained', 'Veal, ground or patty, cooked', 'Veal, roasted, NS as to fat eaten', 'Veal, roasted, lean and fat eaten', 'Veal, roasted, lean only eaten', 'Vegan mayonnaise', 'Vegetable and beef, baby food, NS as to strained or junior', 'Vegetable and beef, baby food, junior', 'Vegetable and beef, baby food, strained', 'Vegetable and chicken, baby food, NS as to strained or junior', 'Vegetable and chicken, baby food, junior', 'Vegetable and chicken, baby food, strained', 'Vegetable and fruit juice drink, with high vitamin C', 'Vegetable and fruit juice drink, with high vitamin C, diet', 'Vegetable and fruit juice drink, with high vitamin C, light', 'Vegetable and fruit juice, 100% juice, with high vitamin C', 'Vegetable and turkey, baby food, NS as to strained or junior', 'Vegetable and turkey, baby food, junior', 'Vegetable and turkey, baby food, strained', 'Vegetable beef noodle soup, prepared with water', 'Vegetable beef soup with noodles or pasta, home recipe', 'Vegetable beef soup with rice, canned, prepared with water or ready-to-serve', 'Vegetable beef soup with rice, home recipe', 'Vegetable beef soup, canned, prepared with milk', 'Vegetable beef soup, canned, prepared with water, or ready-to-serve', 'Vegetable beef soup, chunky style', 'Vegetable beef soup, home recipe', 'Vegetable broth, bouillon', 'Vegetable chicken rice soup, canned, prepared with water or ready-to-serve', 'Vegetable chips', 'Vegetable curry', 'Vegetable curry with rice', 'Vegetable dip, light', 'Vegetable dip, regular', 'Vegetable dip, yogurt based', 'Vegetable lasagna, frozen meal', 'Vegetable mixture, dried', 'Vegetable noodle soup, canned, prepared with water, or ready-to-serve', 'Vegetable noodle soup, home recipe', 'Vegetable noodle soup, reduced sodium, canned, prepared with water or ready-to-serve', 'Vegetable oil, NFS', 'Vegetable rice soup, canned, prepared with water or ready-to-serve', 'Vegetable smoothie', 'Vegetable soup with chicken broth, home recipe, Mexican style', 'Vegetable soup, Spanish style, stew type', 'Vegetable soup, canned, prepared with water or ready-to-serve', 'Vegetable soup, chunky style', 'Vegetable soup, cream of, prepared with milk', 'Vegetable soup, home recipe', 'Vegetable soup, made from dry mix', 'Vegetable soup, reduced sodium, canned, ready to serve', 'Vegetable soup, with pasta, chunky style', 'Vegetable stew without meat', 'Vegetable submarine sandwich, with fat free spread', 'Vegetable submarine sandwich, with spread', 'Vegetable tempura', 'Vegetables and cheese in pastry', 'Vegetables and rice, baby food, strained', 'Vegetables as ingredient in curry', 'Vegetables in pastry', 'Vegetables, pickled', 'Vegetables, stew type, cooked, fat added', 'Vegetables, stew type, cooked, no added fat', 'Vegetarian burger or patty, meatless, no bun', 'Vegetarian chili, made with meat substitute', 'Vegetarian pot pie', 'Vegetarian stew', 'Vegetarian stroganoff', 'Vegetarian vegetable soup, prepared with water', 'Vegetarian, fillet', 'Venison or deer and noodles with cream or white sauce', 'Venison or deer stew with potatoes and vegetables excluding carrots, broccoli, and dark-green leafy; tomato-based sauce', 'Venison or deer stew with potatoes and vegetables including carrots, broccoli, and/or dark-green leafy; tomato-based sauce', 'Venison or deer with gravy', 'Venison or deer with tomato-based sauce', 'Venison or deer, noodles, and vegetables excluding carrots, broccoli, and dark-green leafy; tomato-based sauce', 'Venison or deer, noodles, and vegetables including carrots, broccoli, and/or dark-green leafy; tomato-based sauce', 'Venison or deer, potatoes, and vegetables excluding carrots, broccoli, and dark-green leafy; gravy', 'Venison or deer, potatoes, and vegetables including carrots, broccoli, and/or dark-green leafy; gravy', 'Venison/deer jerky', 'Venison/deer ribs, cooked', 'Venison/deer steak, breaded or floured, cooked, NS as to cooking method', 'Venison/deer steak, cooked, NS as to cooking method', 'Venison/deer, NFS', 'Venison/deer, cured', 'Venison/deer, roasted', 'Venison/deer, stewed', 'Vermicelli, made from soybeans', 'Vienna sausage, canned', 'Vienna sausages stewed with potatoes, Puerto Rican style', 'Vinegar', 'Vodka', 'Vodka and cola', 'Vodka and diet cola', 'Vodka and energy drink', 'Vodka and lemonade', 'Vodka and soda', 'Vodka and tonic', 'Vodka and water', 'Vodka sauce with tomatoes and cream', 'Waffle, NFS', 'Waffle, chocolate', 'Waffle, chocolate, from fast food / restaurant', 'Waffle, chocolate, from frozen', 'Waffle, cinnamon', 'Waffle, cornmeal', 'Waffle, from school, NFS', 'Waffle, fruit', 'Waffle, fruit, from fast food / restaurant', 'Waffle, fruit, from frozen', 'Waffle, gluten free', 'Waffle, gluten free, from frozen', 'Waffle, plain', 'Waffle, plain, from fast food / restaurant', 'Waffle, plain, from frozen', 'Waffle, plain, reduced fat', 'Waffle, plain, reduced fat, from frozen', 'Waffle, whole grain', 'Waffle, whole grain, from fast food / restaurant', 'Waffle, whole grain, from frozen', 'Waffle, whole grain, fruit, from frozen', 'Waffle, whole grain, reduced fat', 'Waffle, whole grain, reduced fat, from frozen', 'Walnut oil', 'Walnuts, excluding honey roasted', 'Walnuts, honey roasted', 'Wasabi paste', 'Wasabi peas', 'Water Chesnut', 'Water, baby, bottled, unsweetened', 'Water, bottled, flavored (Capri Sun Roarin\' Waters)', 'Water, bottled, flavored (Glaceau Vitamin Water)', 'Water, bottled, flavored (Propel Water)', 'Water, bottled, flavored (SoBe Life Water)', 'Water, bottled, flavored, sugar free (Glaceau Vitamin Water)', 'Water, bottled, flavored, sugar free (SoBe)', 'Water, bottled, sweetened, with low calorie sweetener', 'Water, bottled, unsweetened', 'Water, tap', 'Watercress broth with shrimp', 'Watercress, cooked', 'Watercress, raw', 'Watermelon juice, 100%', 'Watermelon, raw', 'Wax candy, liquid filled', 'Welsh rarebit', 'Whatchamacallit', 'Wheat bran, unprocessed', 'Wheat bread as ingredient in sandwiches', 'Wheat bun as ingredient in sandwiches', 'Wheat cereal, chocolate flavored, cooked', 'Wheat flour fritter, without syrup', 'Wheat germ oil', 'Wheat germ, plain', 'Wheat, cream of, cooked, made with milk and sugar, Puerto Rican style', 'Whey, sweet, dry', 'Whipped topping', 'Whipped topping, fat free', 'Whipped topping, sugar free', 'Whiskey', 'Whiskey and cola', 'Whiskey and diet cola ', 'Whiskey and ginger ale', 'Whiskey and soda', 'Whiskey and water', 'Whiskey sour', 'White Russian', 'White beans, NFS', 'White beans, from canned, fat added', 'White beans, from canned, no added fat', 'White beans, from canned, reduced sodium', 'White beans, from dried, fat added', 'White beans, from dried, no added fat', 'White pizza, cheese, thick crust', 'White pizza, cheese, thin crust', 'White pizza, cheese, with meat and vegetables, thick crust', 'White pizza, cheese, with meat and vegetables, thin crust', 'White pizza, cheese, with meat, thick crust', 'White pizza, cheese, with meat, thin crust', 'White pizza, cheese, with vegetables, thick crust', 'White pizza, cheese, with vegetables, thin crust', 'White sauce or gravy', 'Whiting, baked or broiled, made with butter', 'Whiting, baked or broiled, made with cooking spray', 'Whiting, baked or broiled, made with margarine', 'Whiting, baked or broiled, made with oil', 'Whiting, baked or broiled, no added fat', 'Whiting, coated, baked or broiled, made with butter', 'Whiting, coated, baked or broiled, made with cooking spray', 'Whiting, coated, baked or broiled, made with margarine', 'Whiting, coated, baked or broiled, made with oil', 'Whiting, coated, baked or broiled, no added fat', 'Whiting, coated, fried, made with butter', 'Whiting, coated, fried, made with cooking spray', 'Whiting, coated, fried, made with margarine', 'Whiting, coated, fried, made with oil', 'Whiting, coated, fried, no added fat', 'Whiting, cooked, NS as to cooking method', 'Whiting, steamed or poached', 'Whole wheat cereal with apples, baby food, dry, instant', 'Whole wheat cereal, cooked, NS as to fat', 'Whole wheat cereal, cooked, fat added', 'Whole wheat cereal, cooked, no added fat', 'Whopper (Burger King)', 'Whopper Jr (Burger King)', 'Whopper Jr with cheese (Burger King)', 'Whopper with cheese (Burger King)', 'Wild pig, smoked', 'Wine cooler', 'Wine spritzer', 'Wine, dessert, sweet', 'Wine, light', 'Wine, light, nonalcoholic', 'Wine, nonalcoholic', 'Wine, rice', 'Wine, table, red', 'Wine, table, rose', 'Wine, table, white', 'Winter melon, cooked', 'Winter squash, cooked, fat added', 'Winter squash, cooked, no added fat', 'Winter squash, raw', 'Wonton soup', 'Wonton, fried, filled with meat, poultry, or seafood,', 'Wonton, fried, filled with meat, poultry, or seafood, and vegetable', 'Wonton, fried, meatless', 'Worcestershire sauce', 'Wrap sandwich, NFS', 'Wrap sandwich, filled with vegetables', 'Yam buns; Puerto Rican style', 'Yam, cooked, Puerto Rican', 'Yat Ga Mein with meat, fish, or poultry', 'Yeast', 'Yeast extract spread', 'Yellow rice, cooked, NS as to fat', 'Yellow rice, cooked, fat added', 'Yellow rice, cooked, no added fat', 'Yellow string beans, cooked', 'Yogurt and fruit snack, baby food', 'Yogurt covered fruit snacks candy rolls, with high vitamin C', 'Yogurt covered fruit snacks candy, with added vitamin C', 'Yogurt dressing', 'Yogurt parfait, low fat, with fruit', 'Yogurt, Greek, NS as to type of milk or flavor', 'Yogurt, Greek, NS as to type of milk, flavors other than fruit', 'Yogurt, Greek, NS as to type of milk, fruit', 'Yogurt, Greek, NS as to type of milk, plain', 'Yogurt, Greek, low fat milk, flavors other than fruit', 'Yogurt, Greek, low fat milk, fruit', 'Yogurt, Greek, low fat milk, plain', 'Yogurt, Greek, nonfat milk, flavors other than fruit', 'Yogurt, Greek, nonfat milk, fruit', 'Yogurt, Greek, nonfat milk, plain', 'Yogurt, Greek, whole milk, flavors other than fruit', 'Yogurt, Greek, whole milk, fruit', 'Yogurt, Greek, whole milk, plain', 'Yogurt, Greek, with oats', 'Yogurt, NFS', 'Yogurt, NS as to type of milk or flavor', 'Yogurt, NS as to type of milk, flavors other than fruit', 'Yogurt, NS as to type of milk, fruit', 'Yogurt, NS as to type of milk, plain', 'Yogurt, coconut milk', 'Yogurt, liquid', 'Yogurt, low fat milk, flavors other than fruit', 'Yogurt, low fat milk, fruit', 'Yogurt, low fat milk, plain', 'Yogurt, nonfat milk, flavors other than fruit', 'Yogurt, nonfat milk, fruit', 'Yogurt, nonfat milk, plain', 'Yogurt, soy', 'Yogurt, whole milk, baby food', 'Yogurt, whole milk, baby food, with fruit and multigrain cereal puree, NFS', 'Yogurt, whole milk, baby food, with fruit and multigrain cereal puree, plus DHA', 'Yogurt, whole milk, baby food, with fruit and multigrain cereal puree, plus iron', 'Yogurt, whole milk, flavors other than fruit', 'Yogurt, whole milk, fruit', 'Yogurt, whole milk, plain', 'Yokan', 'Yuca fries', 'Zombie', 'Zucchini lasagna, diet frozen meal', 'Zucchini soup, cream of, prepared with milk', 'Zucchini, pickled', 'Zwieback toast']))));
var $author$project$Foods$builtIns = $author$project$Foods$Foods(
	A3($elm$core$List$map2, $author$project$Food$make, $author$project$FoodDescription$builtIns, $author$project$EnergyRate$builtIns));
var $author$project$Food$description = function (_v0) {
	var food = _v0.a;
	return food.description;
};
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $elm$core$String$toLower = _String_toLower;
var $author$project$FoodDescription$toString = function (_v0) {
	var foodDescription = _v0.a;
	return foodDescription;
};
var $author$project$Food$search = F2(
	function (searchString, _v0) {
		var food = _v0.a;
		return A2(
			$elm$core$String$contains,
			$elm$core$String$toLower(searchString),
			$elm$core$String$toLower(
				$author$project$FoodDescription$toString(food.description)));
	});
var $elm$core$List$sortBy = _List_sortBy;
var $author$project$Foods$search = F2(
	function (searchString, _v0) {
		var foods = _v0.a;
		return A2(
			$elm$core$List$sortBy,
			A2(
				$elm$core$Basics$composeR,
				$author$project$Food$description,
				A2($elm$core$Basics$composeR, $author$project$FoodDescription$toString, $elm$core$String$toLower)),
			A2(
				$elm$core$List$filter,
				$author$project$Food$search(searchString),
				foods));
	});
var $author$project$Main$foodSearch = F2(
	function (customFoods, query) {
		if ($elm$core$String$isEmpty(query)) {
			return _List_Nil;
		} else {
			var customMatches = A2($author$project$Foods$search, query, customFoods);
			var builtInMatches = A2($author$project$Foods$search, query, $author$project$Foods$builtIns);
			return _Utils_ap(customMatches, builtInMatches);
		}
	});
var $author$project$WaistSize$maxWaistSize = 5000;
var $author$project$WaistSize$minWaistSize = 200;
var $elm$core$String$toFloat = _String_toFloat;
var $author$project$WaistSize$fromCmString = function (raw) {
	var _v0 = $elm$core$String$toFloat(raw);
	if (_v0.$ === 'Nothing') {
		return $elm$core$Result$Err('not a number');
	} else {
		var f = _v0.a;
		var asInt = $elm$core$Basics$round(f * 10);
		return (_Utils_cmp(asInt, $author$project$WaistSize$minWaistSize) < 0) ? $elm$core$Result$Err('too low') : ((_Utils_cmp(asInt, $author$project$WaistSize$maxWaistSize) > 0) ? $elm$core$Result$Err('too high') : $elm$core$Result$Ok(
			$author$project$WaistSize$WaistSize(asInt)));
	}
};
var $author$project$BodyWeight$maxBodyWeight = 10000;
var $author$project$BodyWeight$minBodyWeight = 10;
var $author$project$BodyWeight$fromKgString = function (raw) {
	var _v0 = $elm$core$String$toFloat(raw);
	if (_v0.$ === 'Nothing') {
		return $elm$core$Result$Err('not a number');
	} else {
		var f = _v0.a;
		var asInt = $elm$core$Basics$round(f * 10);
		return (_Utils_cmp(asInt, $author$project$BodyWeight$maxBodyWeight) > 0) ? $elm$core$Result$Err('too high') : ((_Utils_cmp(asInt, $author$project$BodyWeight$minBodyWeight) < 0) ? $elm$core$Result$Err('too low') : $elm$core$Result$Ok(
			$author$project$BodyWeight$BodyWeight(asInt)));
	}
};
var $author$project$BodyWeightRecords$insert = F3(
	function (timestamp, bodyWeight, _v0) {
		var bodyWeights = _v0.a;
		return $author$project$BodyWeightRecords$BodyWeightRecords(
			A2(
				$elm$core$List$cons,
				{bodyWeight: bodyWeight, timestamp: timestamp},
				bodyWeights));
	});
var $elm$core$Set$Set_elm_builtin = function (a) {
	return {$: 'Set_elm_builtin', a: a};
};
var $elm$core$Set$empty = $elm$core$Set$Set_elm_builtin($elm$core$Dict$empty);
var $elm$core$Set$insert = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return $elm$core$Set$Set_elm_builtin(
			A3($elm$core$Dict$insert, key, _Utils_Tuple0, dict));
	});
var $elm$core$Set$fromList = function (list) {
	return A3($elm$core$List$foldl, $elm$core$Set$insert, $elm$core$Set$empty, list);
};
var $elm$core$Dict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$get, key, dict);
		if (_v0.$ === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var $elm$core$Set$member = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return A2($elm$core$Dict$member, key, dict);
	});
var $author$project$Foods$insert = F2(
	function (food, _v0) {
		var foods = _v0.a;
		var descriptions = $elm$core$Set$fromList(
			A2(
				$elm$core$List$map,
				$author$project$FoodDescription$toString,
				A2($elm$core$List$map, $author$project$Food$description, foods)));
		var description = $author$project$FoodDescription$toString(
			$author$project$Food$description(food));
		return A2($elm$core$Set$member, description, descriptions) ? $author$project$Foods$Foods(foods) : $author$project$Foods$Foods(
			A2($elm$core$List$cons, food, foods));
	});
var $author$project$Meals$insert = F2(
	function (meal, _v0) {
		var meals = _v0.a;
		return $author$project$Meals$Meals(
			A2($elm$core$List$cons, meal, meals));
	});
var $author$project$WaistSizeRecords$insert = F3(
	function (timestamp, waistSize, _v0) {
		var waistSizes = _v0.a;
		return $author$project$WaistSizeRecords$WaistSizeRecords(
			A2(
				$elm$core$List$cons,
				{timestamp: timestamp, waistSize: waistSize},
				waistSizes));
	});
var $author$project$Energy$maxEnergy = 100000;
var $author$project$Energy$fromKcalString = function (raw) {
	var _v0 = $elm$core$String$toInt(raw);
	if (_v0.$ === 'Nothing') {
		return $elm$core$Result$Err('not a whole number');
	} else {
		var num = _v0.a;
		return (num < 0) ? $elm$core$Result$Err('negative') : ((_Utils_cmp(num, $author$project$Energy$maxEnergy) > 0) ? $elm$core$Result$Err('too high') : $elm$core$Result$Ok(
			$author$project$Energy$Energy(num)));
	}
};
var $author$project$EnergyRate$fromKcalPer100gString = function (raw) {
	var _v0 = $author$project$Energy$fromKcalString(raw);
	if (_v0.$ === 'Err') {
		var err = _v0.a;
		return $elm$core$Result$Err(err);
	} else {
		var energy_ = _v0.a;
		return $elm$core$Result$Ok(
			A2($author$project$EnergyRate$EnergyRate, energy_, $author$project$FoodMass$hundredGrams));
	}
};
var $author$project$FoodDescription$okChars = $elm$core$Set$fromList(
	_List_fromArray(
		[
			_Utils_chr('a'),
			_Utils_chr('b'),
			_Utils_chr('c'),
			_Utils_chr('d'),
			_Utils_chr('e'),
			_Utils_chr('f'),
			_Utils_chr('g'),
			_Utils_chr('h'),
			_Utils_chr('i'),
			_Utils_chr('k'),
			_Utils_chr('l'),
			_Utils_chr('m'),
			_Utils_chr('n'),
			_Utils_chr('o'),
			_Utils_chr('p'),
			_Utils_chr('q'),
			_Utils_chr('r'),
			_Utils_chr('s'),
			_Utils_chr('t'),
			_Utils_chr('u'),
			_Utils_chr('v'),
			_Utils_chr('w'),
			_Utils_chr('x'),
			_Utils_chr('y'),
			_Utils_chr('z'),
			_Utils_chr('A'),
			_Utils_chr('B'),
			_Utils_chr('C'),
			_Utils_chr('D'),
			_Utils_chr('E'),
			_Utils_chr('F'),
			_Utils_chr('G'),
			_Utils_chr('H'),
			_Utils_chr('I'),
			_Utils_chr('J'),
			_Utils_chr('K'),
			_Utils_chr('L'),
			_Utils_chr('M'),
			_Utils_chr('N'),
			_Utils_chr('O'),
			_Utils_chr('P'),
			_Utils_chr('Q'),
			_Utils_chr('R'),
			_Utils_chr('S'),
			_Utils_chr('T'),
			_Utils_chr('U'),
			_Utils_chr('V'),
			_Utils_chr('W'),
			_Utils_chr('X'),
			_Utils_chr('Y'),
			_Utils_chr('Z'),
			_Utils_chr('0'),
			_Utils_chr('1'),
			_Utils_chr('2'),
			_Utils_chr('3'),
			_Utils_chr('4'),
			_Utils_chr('5'),
			_Utils_chr('6'),
			_Utils_chr('7'),
			_Utils_chr('8'),
			_Utils_chr('9'),
			_Utils_chr(' '),
			_Utils_chr('!'),
			_Utils_chr('\"'),
			_Utils_chr('£'),
			_Utils_chr('$'),
			_Utils_chr('%'),
			_Utils_chr('^'),
			_Utils_chr('&'),
			_Utils_chr('*'),
			_Utils_chr('('),
			_Utils_chr(')'),
			_Utils_chr('_'),
			_Utils_chr('-'),
			_Utils_chr('+'),
			_Utils_chr('='),
			_Utils_chr('~'),
			_Utils_chr('#'),
			_Utils_chr('['),
			_Utils_chr(']'),
			_Utils_chr('{'),
			_Utils_chr('}'),
			_Utils_chr(';'),
			_Utils_chr(':'),
			_Utils_chr('\''),
			_Utils_chr('@'),
			_Utils_chr('<'),
			_Utils_chr(','),
			_Utils_chr('>'),
			_Utils_chr('.'),
			_Utils_chr('/'),
			_Utils_chr('?')
		]));
var $author$project$FoodDescription$isOkChars = function (s) {
	isOkChars:
	while (true) {
		var _v0 = $elm$core$String$uncons(s);
		if (_v0.$ === 'Just') {
			var _v1 = _v0.a;
			var top = _v1.a;
			var tail = _v1.b;
			if (A2($elm$core$Set$member, top, $author$project$FoodDescription$okChars)) {
				var $temp$s = tail;
				s = $temp$s;
				continue isOkChars;
			} else {
				return false;
			}
		} else {
			return true;
		}
	}
};
var $author$project$FoodDescription$maxLength = 1000;
var $elm$core$String$trim = _String_trim;
var $author$project$FoodDescription$fromString = function (untrimmed) {
	var trimmed = $elm$core$String$trim(untrimmed);
	return (_Utils_cmp(
		$elm$core$String$length(trimmed),
		$author$project$FoodDescription$maxLength) > 0) ? $elm$core$Result$Err('too long') : ((!$elm$core$String$length(trimmed)) ? $elm$core$Result$Err('empty') : ($author$project$FoodDescription$isOkChars(trimmed) ? $elm$core$Result$Ok(
		$author$project$FoodDescription$FoodDescription(trimmed)) : $elm$core$Result$Err('contains invalid characters')));
};
var $author$project$Main$makeFood = function (_v0) {
	var description = _v0.description;
	var energy = _v0.energy;
	var _v1 = _Utils_Tuple2(
		$author$project$FoodDescription$fromString(description),
		$author$project$EnergyRate$fromKcalPer100gString(energy));
	if (_v1.a.$ === 'Err') {
		if (_v1.b.$ === 'Err') {
			var err = _v1.a.a;
			return $elm$core$Result$Err(err);
		} else {
			var err = _v1.a.a;
			return $elm$core$Result$Err(err);
		}
	} else {
		if (_v1.b.$ === 'Err') {
			var err = _v1.b.a;
			return $elm$core$Result$Err(err);
		} else {
			var description_ = _v1.a.a;
			var energy_ = _v1.b.a;
			return $elm$core$Result$Ok(
				A2($author$project$Food$make, description_, energy_));
		}
	}
};
var $author$project$Food$energyRate = function (_v0) {
	var food = _v0.a;
	return food.energyRate;
};
var $author$project$FoodMass$maxMass = 10000;
var $author$project$FoodMass$minMass = 1;
var $author$project$FoodMass$fromGramString = function (raw) {
	var _v0 = $elm$core$String$toInt(raw);
	if (_v0.$ === 'Nothing') {
		return $elm$core$Result$Err('a food weight must be a whole number');
	} else {
		var intGrams = _v0.a;
		return (intGrams < 0) ? $elm$core$Result$Err('a food weight must be a positive number') : ((_Utils_cmp(intGrams, $author$project$FoodMass$maxMass) > 0) ? $elm$core$Result$Err('a food weight must not be more than 10kg') : ((_Utils_cmp(intGrams, $author$project$FoodMass$minMass) < 0) ? $elm$core$Result$Err('too low') : $elm$core$Result$Ok(
			$author$project$FoodMass$FoodMass(intGrams))));
	}
};
var $author$project$Main$makeMeal = function (_v0) {
	var mealWeight = _v0.mealWeight;
	var food = _v0.food;
	var time = _v0.time;
	return A2(
		$elm$core$Result$map,
		A2(
			$author$project$Meal$make,
			time,
			$author$project$Food$energyRate(food)),
		$author$project$FoodMass$fromGramString(mealWeight));
};
var $author$project$PageNum$minus1 = function (_v0) {
	var p = _v0.a;
	return (!p.pageNum) ? $elm$core$Result$Err('minimum page number reached') : $elm$core$Result$Ok(
		$author$project$PageNum$PageNum(
			_Utils_update(
				p,
				{pageNum: p.pageNum - 1})));
};
var $author$project$PageNum$plus1 = function (_v0) {
	var p = _v0.a;
	return _Utils_eq(p.pageNum + 1, p.totalPages) ? $elm$core$Result$Err('maximum page number reached') : $elm$core$Result$Ok(
		$author$project$PageNum$PageNum(
			_Utils_update(
				p,
				{pageNum: p.pageNum + 1})));
};
var $elm$file$File$Download$string = F3(
	function (name, mime, content) {
		return A2(
			$elm$core$Task$perform,
			$elm$core$Basics$never,
			A3(_File_download, name, mime, content));
	});
var $elm$file$File$toString = _File_toString;
var $author$project$Main$foodResultsPerPage = 20;
var $author$project$Main$totalPages = function (numResults) {
	return $elm$core$Basics$ceiling(numResults / $author$project$Main$foodResultsPerPage);
};
var $author$project$Main$updateOk = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'DownloadData':
				return _Utils_Tuple2(
					$author$project$Main$Ok_(model),
					A3(
						$elm$file$File$Download$string,
						'diet.json',
						'application/json',
						$author$project$Main$encodeCache(model)));
			case 'UploadData':
				return _Utils_Tuple2(
					$author$project$Main$Ok_(model),
					A2(
						$elm$file$File$Select$file,
						_List_fromArray(
							['application/json']),
						$author$project$Main$SelectedFile));
			case 'SelectedFile':
				var file = msg.a;
				return _Utils_Tuple2(
					$author$project$Main$Ok_(model),
					A2(
						$elm$core$Task$perform,
						$author$project$Main$FileLoaded,
						$elm$file$File$toString(file)));
			case 'FileLoaded':
				var raw = msg.a;
				var _v1 = A2($elm$json$Json$Decode$decodeString, $author$project$Main$decodeNonEmptyCache, raw);
				if (_v1.$ === 'Err') {
					var err = _v1.a;
					return _Utils_Tuple2(
						$author$project$Main$Ok_(
							_Utils_update(
								model,
								{fileUploadStatus: $author$project$Main$BadFile})),
						$elm$core$Platform$Cmd$none);
				} else {
					var customFoods = _v1.a.customFoods;
					var bodyWeightRecords = _v1.a.bodyWeightRecords;
					var waistSizeRecords = _v1.a.waistSizeRecords;
					var meals = _v1.a.meals;
					var newModel = _Utils_update(
						model,
						{bodyWeightRecords: bodyWeightRecords, customFoods: customFoods, meals: meals, waistSizeRecords: waistSizeRecords});
					return _Utils_Tuple2(
						$author$project$Main$Ok_(newModel),
						$author$project$Main$dumpCache(newModel));
				}
			case 'FoodSearchBox':
				var query = msg.a;
				var pageNumR = $author$project$PageNum$first(
					$author$project$Main$totalPages(
						$elm$core$List$length(
							A2($author$project$Main$foodSearch, model.customFoods, query))));
				if (pageNumR.$ === 'Err') {
					var err = pageNumR.a;
					return _Utils_Tuple2(
						$author$project$Main$Fatal(err),
						$elm$core$Platform$Cmd$none);
				} else {
					var p = pageNumR.a;
					return _Utils_Tuple2(
						$author$project$Main$Ok_(
							_Utils_update(
								model,
								{foodSearchBox: query, foodSearchResultsPage: p})),
						$elm$core$Platform$Cmd$none);
				}
			case 'FoodSearchResultClick':
				var food = msg.a;
				return _Utils_Tuple2(
					$author$project$Main$Ok_(
						_Utils_update(
							model,
							{
								foodSearchBox: '',
								foodSearchResultsPage: $author$project$PageNum$empty,
								selectedFood: $elm$core$Maybe$Just(food)
							})),
					$elm$core$Platform$Cmd$none);
			case 'OneMoreFoodSearchPage':
				var _v3 = $author$project$PageNum$plus1(model.foodSearchResultsPage);
				if (_v3.$ === 'Err') {
					var err = _v3.a;
					return _Utils_Tuple2(
						$author$project$Main$Fatal(err),
						$elm$core$Platform$Cmd$none);
				} else {
					var newPageNum = _v3.a;
					return _Utils_Tuple2(
						$author$project$Main$Ok_(
							_Utils_update(
								model,
								{foodSearchResultsPage: newPageNum})),
						$elm$core$Platform$Cmd$none);
				}
			case 'OneLessFoodSearchPage':
				var _v4 = $author$project$PageNum$minus1(model.foodSearchResultsPage);
				if (_v4.$ === 'Err') {
					var err = _v4.a;
					return _Utils_Tuple2(
						$author$project$Main$Fatal(err),
						$elm$core$Platform$Cmd$none);
				} else {
					var newPageNum = _v4.a;
					return _Utils_Tuple2(
						$author$project$Main$Ok_(
							_Utils_update(
								model,
								{foodSearchResultsPage: newPageNum})),
						$elm$core$Platform$Cmd$none);
				}
			case 'MealWeightBox':
				var contents = msg.a;
				return _Utils_Tuple2(
					$author$project$Main$Ok_(
						_Utils_update(
							model,
							{mealWeightBox: contents})),
					$elm$core$Platform$Cmd$none);
			case 'SubmitMeal':
				var _v5 = model.selectedFood;
				if (_v5.$ === 'Nothing') {
					return _Utils_Tuple2(
						$author$project$Main$Ok_(model),
						$elm$core$Platform$Cmd$none);
				} else {
					var selectedFood = _v5.a;
					var _v6 = $author$project$Main$makeMeal(
						{food: selectedFood, mealWeight: model.mealWeightBox, time: model.now});
					if (_v6.$ === 'Err') {
						return _Utils_Tuple2(
							$author$project$Main$Ok_(model),
							$elm$core$Platform$Cmd$none);
					} else {
						var meal = _v6.a;
						var newModel = _Utils_update(
							model,
							{
								mealNotification: $author$project$Main$On,
								meals: A2($author$project$Meals$insert, meal, model.meals)
							});
						return _Utils_Tuple2(
							$author$project$Main$Ok_(newModel),
							$author$project$Main$dumpCache(newModel));
					}
				}
			case 'SubmitNewFood':
				var _v7 = $author$project$Main$makeFood(
					{description: model.newFoodDescriptionBox, energy: model.newFoodEnergyBox});
				if (_v7.$ === 'Err') {
					return _Utils_Tuple2(
						$author$project$Main$Ok_(model),
						$elm$core$Platform$Cmd$none);
				} else {
					var food = _v7.a;
					var newModel = _Utils_update(
						model,
						{
							customFoods: A2($author$project$Foods$insert, food, model.customFoods),
							foodNotification: $author$project$Main$On
						});
					return _Utils_Tuple2(
						$author$project$Main$Ok_(newModel),
						$author$project$Main$dumpCache(newModel));
				}
			case 'NewFoodDescriptionBox':
				var box = msg.a;
				return _Utils_Tuple2(
					$author$project$Main$Ok_(
						_Utils_update(
							model,
							{newFoodDescriptionBox: box})),
					$elm$core$Platform$Cmd$none);
			case 'NewFoodEnergyBox':
				var box = msg.a;
				return _Utils_Tuple2(
					$author$project$Main$Ok_(
						_Utils_update(
							model,
							{newFoodEnergyBox: box})),
					$elm$core$Platform$Cmd$none);
			case 'BodyWeightBox':
				var box = msg.a;
				return _Utils_Tuple2(
					$author$project$Main$Ok_(
						_Utils_update(
							model,
							{bodyWeightBox: box})),
					$elm$core$Platform$Cmd$none);
			case 'SubmitBodyWeight':
				return A2(
					$elm$core$Result$withDefault,
					_Utils_Tuple2(
						$author$project$Main$Ok_(model),
						$elm$core$Platform$Cmd$none),
					A2(
						$elm$core$Result$map,
						function (bodyWeight) {
							var newModel = _Utils_update(
								model,
								{
									bodyWeightNotification: $author$project$Main$On,
									bodyWeightRecords: A3($author$project$BodyWeightRecords$insert, model.now, bodyWeight, model.bodyWeightRecords)
								});
							return _Utils_Tuple2(
								$author$project$Main$Ok_(newModel),
								$author$project$Main$dumpCache(newModel));
						},
						$author$project$BodyWeight$fromKgString(model.bodyWeightBox)));
			case 'WaistSizeBox':
				var box = msg.a;
				return _Utils_Tuple2(
					$author$project$Main$Ok_(
						_Utils_update(
							model,
							{waistSizeBox: box})),
					$elm$core$Platform$Cmd$none);
			case 'SubmitWaistSize':
				var _v8 = $author$project$WaistSize$fromCmString(model.waistSizeBox);
				if (_v8.$ === 'Err') {
					return _Utils_Tuple2(
						$author$project$Main$Ok_(model),
						$elm$core$Platform$Cmd$none);
				} else {
					var waistSize = _v8.a;
					var newModel = _Utils_update(
						model,
						{
							waistSizeNotification: $author$project$Main$On,
							waistSizeRecords: A3($author$project$WaistSizeRecords$insert, model.now, waistSize, model.waistSizeRecords)
						});
					return _Utils_Tuple2(
						$author$project$Main$Ok_(newModel),
						$author$project$Main$dumpCache(newModel));
				}
			case 'OneMoreBodyWeightPage':
				var _v9 = $author$project$PageNum$plus1(model.bodyWeightsPage);
				if (_v9.$ === 'Err') {
					var err = _v9.a;
					return _Utils_Tuple2(
						$author$project$Main$Fatal(err),
						$elm$core$Platform$Cmd$none);
				} else {
					var newPage = _v9.a;
					return _Utils_Tuple2(
						$author$project$Main$Ok_(
							_Utils_update(
								model,
								{bodyWeightsPage: newPage})),
						$elm$core$Platform$Cmd$none);
				}
			case 'OneLessBodyWeightPage':
				var _v10 = $author$project$PageNum$minus1(model.bodyWeightsPage);
				if (_v10.$ === 'Err') {
					var err = _v10.a;
					return _Utils_Tuple2(
						$author$project$Main$Fatal(err),
						$elm$core$Platform$Cmd$none);
				} else {
					var newPage = _v10.a;
					return _Utils_Tuple2(
						$author$project$Main$Ok_(
							_Utils_update(
								model,
								{bodyWeightsPage: newPage})),
						$elm$core$Platform$Cmd$none);
				}
			case 'OneMoreWaistSizePage':
				var _v11 = $author$project$PageNum$plus1(model.waistSizesPage);
				if (_v11.$ === 'Err') {
					var err = _v11.a;
					return _Utils_Tuple2(
						$author$project$Main$Fatal(err),
						$elm$core$Platform$Cmd$none);
				} else {
					var newPage = _v11.a;
					return _Utils_Tuple2(
						$author$project$Main$Ok_(
							_Utils_update(
								model,
								{waistSizesPage: newPage})),
						$elm$core$Platform$Cmd$none);
				}
			case 'OneLessWaistSizePage':
				var _v12 = $author$project$PageNum$minus1(model.waistSizesPage);
				if (_v12.$ === 'Err') {
					var err = _v12.a;
					return _Utils_Tuple2(
						$author$project$Main$Fatal(err),
						$elm$core$Platform$Cmd$none);
				} else {
					var newPage = _v12.a;
					return _Utils_Tuple2(
						$author$project$Main$Ok_(
							_Utils_update(
								model,
								{waistSizesPage: newPage})),
						$elm$core$Platform$Cmd$none);
				}
			case 'OneMoreMealsPage':
				var _v13 = $author$project$PageNum$plus1(model.mealsPage);
				if (_v13.$ === 'Err') {
					var err = _v13.a;
					return _Utils_Tuple2(
						$author$project$Main$Fatal(err),
						$elm$core$Platform$Cmd$none);
				} else {
					var newPage = _v13.a;
					return _Utils_Tuple2(
						$author$project$Main$Ok_(
							_Utils_update(
								model,
								{mealsPage: newPage})),
						$elm$core$Platform$Cmd$none);
				}
			case 'OneLessMealsPage':
				var _v14 = $author$project$PageNum$minus1(model.mealsPage);
				if (_v14.$ === 'Err') {
					var err = _v14.a;
					return _Utils_Tuple2(
						$author$project$Main$Fatal(err),
						$elm$core$Platform$Cmd$none);
				} else {
					var newPage = _v14.a;
					return _Utils_Tuple2(
						$author$project$Main$Ok_(
							_Utils_update(
								model,
								{mealsPage: newPage})),
						$elm$core$Platform$Cmd$none);
				}
			case 'BadTimestamp':
				return _Utils_Tuple2(
					$author$project$Main$Fatal('bad timestamp'),
					$elm$core$Platform$Cmd$none);
			case 'Now':
				var now = msg.a;
				return _Utils_Tuple2(
					$author$project$Main$Ok_(
						_Utils_update(
							model,
							{now: now})),
					$elm$core$Platform$Cmd$none);
			default:
				var zone = msg.a;
				return _Utils_Tuple2(
					$author$project$Main$Ok_(
						_Utils_update(
							model,
							{zone: zone})),
					$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Main$update = F2(
	function (msg, model) {
		switch (model.$) {
			case 'Fatal':
				var error = model.a;
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
			case 'LoadingZoneAndTime':
				var cache = model.a;
				return A2($author$project$Main$updateLoadingZoneAndTime, cache, msg);
			case 'LoadingZone':
				var cache = model.a;
				var time = model.b;
				return A3($author$project$Main$updateLoadingZone, cache, time, msg);
			case 'LoadingTime':
				var cache = model.a;
				var zone = model.b;
				return A3($author$project$Main$updateLoadingTime, cache, zone, msg);
			default:
				var okModel = model.a;
				return A2($author$project$Main$updateOk, msg, okModel);
		}
	});
var $elm$json$Json$Decode$value = _Json_decodeValue;
var $mdgriffith$elm_ui$Internal$Model$Colored = F3(
	function (a, b, c) {
		return {$: 'Colored', a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Internal$Model$StyleClass = F2(
	function (a, b) {
		return {$: 'StyleClass', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$Flag = function (a) {
	return {$: 'Flag', a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$Second = function (a) {
	return {$: 'Second', a: a};
};
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $mdgriffith$elm_ui$Internal$Flag$flag = function (i) {
	return (i > 31) ? $mdgriffith$elm_ui$Internal$Flag$Second(1 << (i - 32)) : $mdgriffith$elm_ui$Internal$Flag$Flag(1 << i);
};
var $mdgriffith$elm_ui$Internal$Flag$bgColor = $mdgriffith$elm_ui$Internal$Flag$flag(8);
var $mdgriffith$elm_ui$Internal$Model$floatClass = function (x) {
	return $elm$core$String$fromInt(
		$elm$core$Basics$round(x * 255));
};
var $mdgriffith$elm_ui$Internal$Model$formatColorClass = function (_v0) {
	var red = _v0.a;
	var green = _v0.b;
	var blue = _v0.c;
	var alpha = _v0.d;
	return $mdgriffith$elm_ui$Internal$Model$floatClass(red) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(green) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(blue) + ('-' + $mdgriffith$elm_ui$Internal$Model$floatClass(alpha))))));
};
var $mdgriffith$elm_ui$Element$Background$color = function (clr) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$bgColor,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Colored,
			'bg-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(clr),
			'background-color',
			clr));
};
var $mdgriffith$elm_ui$Internal$Model$FontFamily = F2(
	function (a, b) {
		return {$: 'FontFamily', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$fontFamily = $mdgriffith$elm_ui$Internal$Flag$flag(5);
var $elm$core$String$words = _String_words;
var $mdgriffith$elm_ui$Internal$Model$renderFontClassName = F2(
	function (font, current) {
		return _Utils_ap(
			current,
			function () {
				switch (font.$) {
					case 'Serif':
						return 'serif';
					case 'SansSerif':
						return 'sans-serif';
					case 'Monospace':
						return 'monospace';
					case 'Typeface':
						var name = font.a;
						return A2(
							$elm$core$String$join,
							'-',
							$elm$core$String$words(
								$elm$core$String$toLower(name)));
					case 'ImportFont':
						var name = font.a;
						var url = font.b;
						return A2(
							$elm$core$String$join,
							'-',
							$elm$core$String$words(
								$elm$core$String$toLower(name)));
					default:
						var name = font.a.name;
						return A2(
							$elm$core$String$join,
							'-',
							$elm$core$String$words(
								$elm$core$String$toLower(name)));
				}
			}());
	});
var $mdgriffith$elm_ui$Element$Font$family = function (families) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$fontFamily,
		A2(
			$mdgriffith$elm_ui$Internal$Model$FontFamily,
			A3($elm$core$List$foldl, $mdgriffith$elm_ui$Internal$Model$renderFontClassName, 'ff-', families),
			families));
};
var $mdgriffith$elm_ui$Internal$Model$Fill = function (a) {
	return {$: 'Fill', a: a};
};
var $mdgriffith$elm_ui$Element$fill = $mdgriffith$elm_ui$Internal$Model$Fill(1);
var $mdgriffith$elm_ui$Internal$Style$classes = {above: 'a', active: 'atv', alignBottom: 'ab', alignCenterX: 'cx', alignCenterY: 'cy', alignContainerBottom: 'acb', alignContainerCenterX: 'accx', alignContainerCenterY: 'accy', alignContainerRight: 'acr', alignLeft: 'al', alignRight: 'ar', alignTop: 'at', alignedHorizontally: 'ah', alignedVertically: 'av', any: 's', behind: 'bh', below: 'b', bold: 'w7', borderDashed: 'bd', borderDotted: 'bdt', borderNone: 'bn', borderSolid: 'bs', capturePointerEvents: 'cpe', clip: 'cp', clipX: 'cpx', clipY: 'cpy', column: 'c', container: 'ctr', contentBottom: 'cb', contentCenterX: 'ccx', contentCenterY: 'ccy', contentLeft: 'cl', contentRight: 'cr', contentTop: 'ct', cursorPointer: 'cptr', cursorText: 'ctxt', focus: 'fcs', focusedWithin: 'focus-within', fullSize: 'fs', grid: 'g', hasBehind: 'hbh', heightContent: 'hc', heightExact: 'he', heightFill: 'hf', heightFillPortion: 'hfp', hover: 'hv', imageContainer: 'ic', inFront: 'fr', inputLabel: 'lbl', inputMultiline: 'iml', inputMultilineFiller: 'imlf', inputMultilineParent: 'imlp', inputMultilineWrapper: 'implw', inputText: 'it', italic: 'i', link: 'lnk', nearby: 'nb', noTextSelection: 'notxt', onLeft: 'ol', onRight: 'or', opaque: 'oq', overflowHidden: 'oh', page: 'pg', paragraph: 'p', passPointerEvents: 'ppe', root: 'ui', row: 'r', scrollbars: 'sb', scrollbarsX: 'sbx', scrollbarsY: 'sby', seButton: 'sbt', single: 'e', sizeByCapital: 'cap', spaceEvenly: 'sev', strike: 'sk', text: 't', textCenter: 'tc', textExtraBold: 'w8', textExtraLight: 'w2', textHeavy: 'w9', textJustify: 'tj', textJustifyAll: 'tja', textLeft: 'tl', textLight: 'w3', textMedium: 'w5', textNormalWeight: 'w4', textRight: 'tr', textSemiBold: 'w6', textThin: 'w1', textUnitalicized: 'tun', transition: 'ts', transparent: 'clr', underline: 'u', widthContent: 'wc', widthExact: 'we', widthFill: 'wf', widthFillPortion: 'wfp', wrapped: 'wrp'};
var $mdgriffith$elm_ui$Internal$Model$Attr = function (a) {
	return {$: 'Attr', a: a};
};
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $mdgriffith$elm_ui$Internal$Model$htmlClass = function (cls) {
	return $mdgriffith$elm_ui$Internal$Model$Attr(
		$elm$html$Html$Attributes$class(cls));
};
var $mdgriffith$elm_ui$Internal$Model$OnlyDynamic = F2(
	function (a, b) {
		return {$: 'OnlyDynamic', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$StaticRootAndDynamic = F2(
	function (a, b) {
		return {$: 'StaticRootAndDynamic', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$Unkeyed = function (a) {
	return {$: 'Unkeyed', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$AsEl = {$: 'AsEl'};
var $mdgriffith$elm_ui$Internal$Model$asEl = $mdgriffith$elm_ui$Internal$Model$AsEl;
var $mdgriffith$elm_ui$Internal$Model$Generic = {$: 'Generic'};
var $mdgriffith$elm_ui$Internal$Model$div = $mdgriffith$elm_ui$Internal$Model$Generic;
var $mdgriffith$elm_ui$Internal$Model$NoNearbyChildren = {$: 'NoNearbyChildren'};
var $mdgriffith$elm_ui$Internal$Model$columnClass = $mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.column);
var $mdgriffith$elm_ui$Internal$Model$gridClass = $mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.grid);
var $mdgriffith$elm_ui$Internal$Model$pageClass = $mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.page);
var $mdgriffith$elm_ui$Internal$Model$paragraphClass = $mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.paragraph);
var $mdgriffith$elm_ui$Internal$Model$rowClass = $mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.row);
var $mdgriffith$elm_ui$Internal$Model$singleClass = $mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.single);
var $mdgriffith$elm_ui$Internal$Model$contextClasses = function (context) {
	switch (context.$) {
		case 'AsRow':
			return $mdgriffith$elm_ui$Internal$Model$rowClass;
		case 'AsColumn':
			return $mdgriffith$elm_ui$Internal$Model$columnClass;
		case 'AsEl':
			return $mdgriffith$elm_ui$Internal$Model$singleClass;
		case 'AsGrid':
			return $mdgriffith$elm_ui$Internal$Model$gridClass;
		case 'AsParagraph':
			return $mdgriffith$elm_ui$Internal$Model$paragraphClass;
		default:
			return $mdgriffith$elm_ui$Internal$Model$pageClass;
	}
};
var $mdgriffith$elm_ui$Internal$Model$Keyed = function (a) {
	return {$: 'Keyed', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$NoStyleSheet = {$: 'NoStyleSheet'};
var $mdgriffith$elm_ui$Internal$Model$Styled = function (a) {
	return {$: 'Styled', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$Unstyled = function (a) {
	return {$: 'Unstyled', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$addChildren = F2(
	function (existing, nearbyChildren) {
		switch (nearbyChildren.$) {
			case 'NoNearbyChildren':
				return existing;
			case 'ChildrenBehind':
				var behind = nearbyChildren.a;
				return _Utils_ap(behind, existing);
			case 'ChildrenInFront':
				var inFront = nearbyChildren.a;
				return _Utils_ap(existing, inFront);
			default:
				var behind = nearbyChildren.a;
				var inFront = nearbyChildren.b;
				return _Utils_ap(
					behind,
					_Utils_ap(existing, inFront));
		}
	});
var $mdgriffith$elm_ui$Internal$Model$addKeyedChildren = F3(
	function (key, existing, nearbyChildren) {
		switch (nearbyChildren.$) {
			case 'NoNearbyChildren':
				return existing;
			case 'ChildrenBehind':
				var behind = nearbyChildren.a;
				return _Utils_ap(
					A2(
						$elm$core$List$map,
						function (x) {
							return _Utils_Tuple2(key, x);
						},
						behind),
					existing);
			case 'ChildrenInFront':
				var inFront = nearbyChildren.a;
				return _Utils_ap(
					existing,
					A2(
						$elm$core$List$map,
						function (x) {
							return _Utils_Tuple2(key, x);
						},
						inFront));
			default:
				var behind = nearbyChildren.a;
				var inFront = nearbyChildren.b;
				return _Utils_ap(
					A2(
						$elm$core$List$map,
						function (x) {
							return _Utils_Tuple2(key, x);
						},
						behind),
					_Utils_ap(
						existing,
						A2(
							$elm$core$List$map,
							function (x) {
								return _Utils_Tuple2(key, x);
							},
							inFront)));
		}
	});
var $mdgriffith$elm_ui$Internal$Model$AsParagraph = {$: 'AsParagraph'};
var $mdgriffith$elm_ui$Internal$Model$asParagraph = $mdgriffith$elm_ui$Internal$Model$AsParagraph;
var $mdgriffith$elm_ui$Internal$Flag$alignBottom = $mdgriffith$elm_ui$Internal$Flag$flag(41);
var $mdgriffith$elm_ui$Internal$Flag$alignRight = $mdgriffith$elm_ui$Internal$Flag$flag(40);
var $mdgriffith$elm_ui$Internal$Flag$centerX = $mdgriffith$elm_ui$Internal$Flag$flag(42);
var $mdgriffith$elm_ui$Internal$Flag$centerY = $mdgriffith$elm_ui$Internal$Flag$flag(43);
var $elm$html$Html$div = _VirtualDom_node('div');
var $mdgriffith$elm_ui$Internal$Model$lengthClassName = function (x) {
	switch (x.$) {
		case 'Px':
			var px = x.a;
			return $elm$core$String$fromInt(px) + 'px';
		case 'Content':
			return 'auto';
		case 'Fill':
			var i = x.a;
			return $elm$core$String$fromInt(i) + 'fr';
		case 'Min':
			var min = x.a;
			var len = x.b;
			return 'min' + ($elm$core$String$fromInt(min) + $mdgriffith$elm_ui$Internal$Model$lengthClassName(len));
		default:
			var max = x.a;
			var len = x.b;
			return 'max' + ($elm$core$String$fromInt(max) + $mdgriffith$elm_ui$Internal$Model$lengthClassName(len));
	}
};
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $mdgriffith$elm_ui$Internal$Model$transformClass = function (transform) {
	switch (transform.$) {
		case 'Untransformed':
			return $elm$core$Maybe$Nothing;
		case 'Moved':
			var _v1 = transform.a;
			var x = _v1.a;
			var y = _v1.b;
			var z = _v1.c;
			return $elm$core$Maybe$Just(
				'mv-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(x) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(y) + ('-' + $mdgriffith$elm_ui$Internal$Model$floatClass(z))))));
		default:
			var _v2 = transform.a;
			var tx = _v2.a;
			var ty = _v2.b;
			var tz = _v2.c;
			var _v3 = transform.b;
			var sx = _v3.a;
			var sy = _v3.b;
			var sz = _v3.c;
			var _v4 = transform.c;
			var ox = _v4.a;
			var oy = _v4.b;
			var oz = _v4.c;
			var angle = transform.d;
			return $elm$core$Maybe$Just(
				'tfrm-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(tx) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(ty) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(tz) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(sx) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(sy) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(sz) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(ox) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(oy) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(oz) + ('-' + $mdgriffith$elm_ui$Internal$Model$floatClass(angle))))))))))))))))))));
	}
};
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $mdgriffith$elm_ui$Internal$Model$getStyleName = function (style) {
	switch (style.$) {
		case 'Shadows':
			var name = style.a;
			return name;
		case 'Transparency':
			var name = style.a;
			var o = style.b;
			return name;
		case 'Style':
			var _class = style.a;
			return _class;
		case 'FontFamily':
			var name = style.a;
			return name;
		case 'FontSize':
			var i = style.a;
			return 'font-size-' + $elm$core$String$fromInt(i);
		case 'Single':
			var _class = style.a;
			return _class;
		case 'Colored':
			var _class = style.a;
			return _class;
		case 'SpacingStyle':
			var cls = style.a;
			var x = style.b;
			var y = style.c;
			return cls;
		case 'PaddingStyle':
			var cls = style.a;
			var top = style.b;
			var right = style.c;
			var bottom = style.d;
			var left = style.e;
			return cls;
		case 'BorderWidth':
			var cls = style.a;
			var top = style.b;
			var right = style.c;
			var bottom = style.d;
			var left = style.e;
			return cls;
		case 'GridTemplateStyle':
			var template = style.a;
			return 'grid-rows-' + (A2(
				$elm$core$String$join,
				'-',
				A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.rows)) + ('-cols-' + (A2(
				$elm$core$String$join,
				'-',
				A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.columns)) + ('-space-x-' + ($mdgriffith$elm_ui$Internal$Model$lengthClassName(template.spacing.a) + ('-space-y-' + $mdgriffith$elm_ui$Internal$Model$lengthClassName(template.spacing.b)))))));
		case 'GridPosition':
			var pos = style.a;
			return 'gp grid-pos-' + ($elm$core$String$fromInt(pos.row) + ('-' + ($elm$core$String$fromInt(pos.col) + ('-' + ($elm$core$String$fromInt(pos.width) + ('-' + $elm$core$String$fromInt(pos.height)))))));
		case 'PseudoSelector':
			var selector = style.a;
			var subStyle = style.b;
			var name = function () {
				switch (selector.$) {
					case 'Focus':
						return 'fs';
					case 'Hover':
						return 'hv';
					default:
						return 'act';
				}
			}();
			return A2(
				$elm$core$String$join,
				' ',
				A2(
					$elm$core$List$map,
					function (sty) {
						var _v1 = $mdgriffith$elm_ui$Internal$Model$getStyleName(sty);
						if (_v1 === '') {
							return '';
						} else {
							var styleName = _v1;
							return styleName + ('-' + name);
						}
					},
					subStyle));
		default:
			var x = style.a;
			return A2(
				$elm$core$Maybe$withDefault,
				'',
				$mdgriffith$elm_ui$Internal$Model$transformClass(x));
	}
};
var $mdgriffith$elm_ui$Internal$Model$reduceStyles = F2(
	function (style, nevermind) {
		var cache = nevermind.a;
		var existing = nevermind.b;
		var styleName = $mdgriffith$elm_ui$Internal$Model$getStyleName(style);
		return A2($elm$core$Set$member, styleName, cache) ? nevermind : _Utils_Tuple2(
			A2($elm$core$Set$insert, styleName, cache),
			A2($elm$core$List$cons, style, existing));
	});
var $mdgriffith$elm_ui$Internal$Model$Property = F2(
	function (a, b) {
		return {$: 'Property', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$Style = F2(
	function (a, b) {
		return {$: 'Style', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$dot = function (c) {
	return '.' + c;
};
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$core$String$fromFloat = _String_fromNumber;
var $mdgriffith$elm_ui$Internal$Model$formatColor = function (_v0) {
	var red = _v0.a;
	var green = _v0.b;
	var blue = _v0.c;
	var alpha = _v0.d;
	return 'rgba(' + ($elm$core$String$fromInt(
		$elm$core$Basics$round(red * 255)) + ((',' + $elm$core$String$fromInt(
		$elm$core$Basics$round(green * 255))) + ((',' + $elm$core$String$fromInt(
		$elm$core$Basics$round(blue * 255))) + (',' + ($elm$core$String$fromFloat(alpha) + ')')))));
};
var $mdgriffith$elm_ui$Internal$Model$formatBoxShadow = function (shadow) {
	return A2(
		$elm$core$String$join,
		' ',
		A2(
			$elm$core$List$filterMap,
			$elm$core$Basics$identity,
			_List_fromArray(
				[
					shadow.inset ? $elm$core$Maybe$Just('inset') : $elm$core$Maybe$Nothing,
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.offset.a) + 'px'),
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.offset.b) + 'px'),
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.blur) + 'px'),
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.size) + 'px'),
					$elm$core$Maybe$Just(
					$mdgriffith$elm_ui$Internal$Model$formatColor(shadow.color))
				])));
};
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$Tuple$mapFirst = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var $elm$core$Tuple$mapSecond = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var $mdgriffith$elm_ui$Internal$Model$renderFocusStyle = function (focus) {
	return _List_fromArray(
		[
			A2(
			$mdgriffith$elm_ui$Internal$Model$Style,
			$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.focusedWithin) + ':focus-within',
			A2(
				$elm$core$List$filterMap,
				$elm$core$Basics$identity,
				_List_fromArray(
					[
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'border-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.borderColor),
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'background-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.backgroundColor),
						A2(
						$elm$core$Maybe$map,
						function (shadow) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'box-shadow',
								$mdgriffith$elm_ui$Internal$Model$formatBoxShadow(
									{
										blur: shadow.blur,
										color: shadow.color,
										inset: false,
										offset: A2(
											$elm$core$Tuple$mapSecond,
											$elm$core$Basics$toFloat,
											A2($elm$core$Tuple$mapFirst, $elm$core$Basics$toFloat, shadow.offset)),
										size: shadow.size
									}));
						},
						focus.shadow),
						$elm$core$Maybe$Just(
						A2($mdgriffith$elm_ui$Internal$Model$Property, 'outline', 'none'))
					]))),
			A2(
			$mdgriffith$elm_ui$Internal$Model$Style,
			($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + ':focus .focusable, ') + (($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + '.focusable:focus, ') + ('.ui-slide-bar:focus + ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + ' .focusable-thumb'))),
			A2(
				$elm$core$List$filterMap,
				$elm$core$Basics$identity,
				_List_fromArray(
					[
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'border-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.borderColor),
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'background-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.backgroundColor),
						A2(
						$elm$core$Maybe$map,
						function (shadow) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'box-shadow',
								$mdgriffith$elm_ui$Internal$Model$formatBoxShadow(
									{
										blur: shadow.blur,
										color: shadow.color,
										inset: false,
										offset: A2(
											$elm$core$Tuple$mapSecond,
											$elm$core$Basics$toFloat,
											A2($elm$core$Tuple$mapFirst, $elm$core$Basics$toFloat, shadow.offset)),
										size: shadow.size
									}));
						},
						focus.shadow),
						$elm$core$Maybe$Just(
						A2($mdgriffith$elm_ui$Internal$Model$Property, 'outline', 'none'))
					])))
		]);
};
var $elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var $elm$virtual_dom$VirtualDom$property = F2(
	function (key, value) {
		return A2(
			_VirtualDom_property,
			_VirtualDom_noInnerHtmlOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $mdgriffith$elm_ui$Internal$Style$AllChildren = F2(
	function (a, b) {
		return {$: 'AllChildren', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Batch = function (a) {
	return {$: 'Batch', a: a};
};
var $mdgriffith$elm_ui$Internal$Style$Child = F2(
	function (a, b) {
		return {$: 'Child', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Class = F2(
	function (a, b) {
		return {$: 'Class', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Descriptor = F2(
	function (a, b) {
		return {$: 'Descriptor', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Left = {$: 'Left'};
var $mdgriffith$elm_ui$Internal$Style$Prop = F2(
	function (a, b) {
		return {$: 'Prop', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Right = {$: 'Right'};
var $mdgriffith$elm_ui$Internal$Style$Self = function (a) {
	return {$: 'Self', a: a};
};
var $mdgriffith$elm_ui$Internal$Style$Supports = F2(
	function (a, b) {
		return {$: 'Supports', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Content = function (a) {
	return {$: 'Content', a: a};
};
var $mdgriffith$elm_ui$Internal$Style$Bottom = {$: 'Bottom'};
var $mdgriffith$elm_ui$Internal$Style$CenterX = {$: 'CenterX'};
var $mdgriffith$elm_ui$Internal$Style$CenterY = {$: 'CenterY'};
var $mdgriffith$elm_ui$Internal$Style$Top = {$: 'Top'};
var $mdgriffith$elm_ui$Internal$Style$alignments = _List_fromArray(
	[$mdgriffith$elm_ui$Internal$Style$Top, $mdgriffith$elm_ui$Internal$Style$Bottom, $mdgriffith$elm_ui$Internal$Style$Right, $mdgriffith$elm_ui$Internal$Style$Left, $mdgriffith$elm_ui$Internal$Style$CenterX, $mdgriffith$elm_ui$Internal$Style$CenterY]);
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $mdgriffith$elm_ui$Internal$Style$contentName = function (desc) {
	switch (desc.a.$) {
		case 'Top':
			var _v1 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.contentTop);
		case 'Bottom':
			var _v2 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.contentBottom);
		case 'Right':
			var _v3 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.contentRight);
		case 'Left':
			var _v4 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.contentLeft);
		case 'CenterX':
			var _v5 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.contentCenterX);
		default:
			var _v6 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.contentCenterY);
	}
};
var $mdgriffith$elm_ui$Internal$Style$selfName = function (desc) {
	switch (desc.a.$) {
		case 'Top':
			var _v1 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignTop);
		case 'Bottom':
			var _v2 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignBottom);
		case 'Right':
			var _v3 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignRight);
		case 'Left':
			var _v4 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignLeft);
		case 'CenterX':
			var _v5 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignCenterX);
		default:
			var _v6 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignCenterY);
	}
};
var $mdgriffith$elm_ui$Internal$Style$describeAlignment = function (values) {
	var createDescription = function (alignment) {
		var _v0 = values(alignment);
		var content = _v0.a;
		var indiv = _v0.b;
		return _List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$contentName(
					$mdgriffith$elm_ui$Internal$Style$Content(alignment)),
				content),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$selfName(
							$mdgriffith$elm_ui$Internal$Style$Self(alignment)),
						indiv)
					]))
			]);
	};
	return $mdgriffith$elm_ui$Internal$Style$Batch(
		A2($elm$core$List$concatMap, createDescription, $mdgriffith$elm_ui$Internal$Style$alignments));
};
var $mdgriffith$elm_ui$Internal$Style$elDescription = _List_fromArray(
	[
		A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
		A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'column'),
		A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre'),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Descriptor,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hasBehind),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.behind),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '-1')
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Descriptor,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.seButton),
		_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.text),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthFill),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'auto !important')
							]))
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightContent),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '100000')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthFill),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthFillPortion),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthContent),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
			])),
		$mdgriffith$elm_ui$Internal$Style$describeAlignment(
		function (alignment) {
			switch (alignment.$) {
				case 'Top':
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', '0 !important')
							]));
				case 'Bottom':
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', '0 !important')
							]));
				case 'Right':
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-end')
							]));
				case 'Left':
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
							]));
				case 'CenterX':
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'center')
							]));
				default:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto')
									]))
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important')
							]));
			}
		})
	]);
var $mdgriffith$elm_ui$Internal$Style$gridAlignments = function (values) {
	var createDescription = function (alignment) {
		return _List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$selfName(
							$mdgriffith$elm_ui$Internal$Style$Self(alignment)),
						values(alignment))
					]))
			]);
	};
	return $mdgriffith$elm_ui$Internal$Style$Batch(
		A2($elm$core$List$concatMap, createDescription, $mdgriffith$elm_ui$Internal$Style$alignments));
};
var $mdgriffith$elm_ui$Internal$Style$Above = {$: 'Above'};
var $mdgriffith$elm_ui$Internal$Style$Behind = {$: 'Behind'};
var $mdgriffith$elm_ui$Internal$Style$Below = {$: 'Below'};
var $mdgriffith$elm_ui$Internal$Style$OnLeft = {$: 'OnLeft'};
var $mdgriffith$elm_ui$Internal$Style$OnRight = {$: 'OnRight'};
var $mdgriffith$elm_ui$Internal$Style$Within = {$: 'Within'};
var $mdgriffith$elm_ui$Internal$Style$locations = function () {
	var loc = $mdgriffith$elm_ui$Internal$Style$Above;
	var _v0 = function () {
		switch (loc.$) {
			case 'Above':
				return _Utils_Tuple0;
			case 'Below':
				return _Utils_Tuple0;
			case 'OnRight':
				return _Utils_Tuple0;
			case 'OnLeft':
				return _Utils_Tuple0;
			case 'Within':
				return _Utils_Tuple0;
			default:
				return _Utils_Tuple0;
		}
	}();
	return _List_fromArray(
		[$mdgriffith$elm_ui$Internal$Style$Above, $mdgriffith$elm_ui$Internal$Style$Below, $mdgriffith$elm_ui$Internal$Style$OnRight, $mdgriffith$elm_ui$Internal$Style$OnLeft, $mdgriffith$elm_ui$Internal$Style$Within, $mdgriffith$elm_ui$Internal$Style$Behind]);
}();
var $mdgriffith$elm_ui$Internal$Style$baseSheet = _List_fromArray(
	[
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		'html,body',
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'padding', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		_Utils_ap(
			$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
			_Utils_ap(
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.single),
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.imageContainer))),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'block'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'img',
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'max-height', '100%'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'object-fit', 'cover')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthFill),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'img',
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'max-width', '100%'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'object-fit', 'cover')
							]))
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + ':focus',
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'outline', 'none')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.root),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'min-height', '100%'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				_Utils_ap(
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill)),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inFront),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.nearby),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'fixed'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20')
							]))
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.nearby),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'relative'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'row'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.single),
				$mdgriffith$elm_ui$Internal$Style$elDescription),
				$mdgriffith$elm_ui$Internal$Style$Batch(
				function (fn) {
					return A2($elm$core$List$map, fn, $mdgriffith$elm_ui$Internal$Style$locations);
				}(
					function (loc) {
						switch (loc.$) {
							case 'Above':
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.above),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'bottom', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill),
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto')
												])),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthFill),
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
												])),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							case 'Below':
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.below),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'bottom', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												])),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill),
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto')
												]))
										]));
							case 'OnRight':
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.onRight),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							case 'OnLeft':
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.onLeft),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'right', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							case 'Within':
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inFront),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							default:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.behind),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
						}
					}))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'relative'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'row'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'resize', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-feature-settings', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'box-sizing', 'border-box'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'padding', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-width', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'solid'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-size', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'color', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-family', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'line-height', '1'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-style', 'inherit'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.wrapped),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-wrap', 'wrap')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.noTextSelection),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, '-moz-user-select', 'none'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, '-webkit-user-select', 'none'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, '-ms-user-select', 'none'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'user-select', 'none')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cursorPointer),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'cursor', 'pointer')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cursorText),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'cursor', 'text')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.passPointerEvents),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none !important')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.capturePointerEvents),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto !important')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.transparent),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.opaque),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.hover, $mdgriffith$elm_ui$Internal$Style$classes.transparent)) + ':hover',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.hover, $mdgriffith$elm_ui$Internal$Style$classes.opaque)) + ':hover',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.focus, $mdgriffith$elm_ui$Internal$Style$classes.transparent)) + ':focus',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.focus, $mdgriffith$elm_ui$Internal$Style$classes.opaque)) + ':focus',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.active, $mdgriffith$elm_ui$Internal$Style$classes.transparent)) + ':active',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.active, $mdgriffith$elm_ui$Internal$Style$classes.opaque)) + ':active',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.transition),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Prop,
						'transition',
						A2(
							$elm$core$String$join,
							', ',
							A2(
								$elm$core$List$map,
								function (x) {
									return x + ' 160ms';
								},
								_List_fromArray(
									['transform', 'opacity', 'filter', 'background-color', 'color', 'font-size']))))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.scrollbars),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow', 'auto'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.scrollbarsX),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-x', 'auto'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.row),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.scrollbarsY),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-y', 'auto'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.column),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.single),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.clip),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow', 'hidden')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.clipX),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-x', 'hidden')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.clipY),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-y', 'hidden')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthContent),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', 'auto')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.borderNone),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-width', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.borderDashed),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'dashed')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.borderDotted),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'dotted')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.borderSolid),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'solid')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.text),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-block')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inputText),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'line-height', '1.05'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'background', 'transparent'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'inherit')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.single),
				$mdgriffith$elm_ui$Internal$Style$elDescription),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.row),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'row'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', '0%'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthExact),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.link),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFillPortion),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthFill),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '100000')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.container),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerRight,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterX,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignCenterX),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-left', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterX,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignCenterX),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-right', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:only-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterX,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignCenterY),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterX + ' ~ u'),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.alignContainerRight + (' ~ s.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterX)),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment.$) {
								case 'Top':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
											]));
								case 'Bottom':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-end')
											]));
								case 'Right':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
											]),
										_List_Nil);
								case 'Left':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
											]),
										_List_Nil);
								case 'CenterX':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'center')
											]),
										_List_Nil);
								default:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'center')
											]));
							}
						}),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.spaceEvenly),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'space-between')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inputLabel),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'baseline')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.column),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'column'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', '0px'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'min-height', 'min-content'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightExact),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '100000')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthFill),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthFillPortion),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthContent),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerBottom,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterY,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignCenterY),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', '0 !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterY,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignCenterY),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', '0 !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:only-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterY,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignCenterY),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterY + ' ~ u'),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.alignContainerBottom + (' ~ s.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterY)),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment.$) {
								case 'Top':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto')
											]));
								case 'Bottom':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto')
											]));
								case 'Right':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-end')
											]));
								case 'Left':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
											]));
								case 'CenterX':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'center')
											]));
								default:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'center')
											]),
										_List_Nil);
							}
						}),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.container),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.spaceEvenly),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'space-between')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.grid),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', '-ms-grid'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'.gp',
						_List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Supports,
						_Utils_Tuple2('display', 'grid'),
						_List_fromArray(
							[
								_Utils_Tuple2('display', 'grid')
							])),
						$mdgriffith$elm_ui$Internal$Style$gridAlignments(
						function (alignment) {
							switch (alignment.$) {
								case 'Top':
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
										]);
								case 'Bottom':
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
										]);
								case 'Right':
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
										]);
								case 'Left':
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
										]);
								case 'CenterX':
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
										]);
								default:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'center')
										]);
							}
						})
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.page),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'block'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any + ':first-child'),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot(
							$mdgriffith$elm_ui$Internal$Style$classes.any + ($mdgriffith$elm_ui$Internal$Style$selfName(
								$mdgriffith$elm_ui$Internal$Style$Self($mdgriffith$elm_ui$Internal$Style$Left)) + (':first-child + .' + $mdgriffith$elm_ui$Internal$Style$classes.any))),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot(
							$mdgriffith$elm_ui$Internal$Style$classes.any + ($mdgriffith$elm_ui$Internal$Style$selfName(
								$mdgriffith$elm_ui$Internal$Style$Self($mdgriffith$elm_ui$Internal$Style$Right)) + (':first-child + .' + $mdgriffith$elm_ui$Internal$Style$classes.any))),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment.$) {
								case 'Top':
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 'Bottom':
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 'Right':
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'right'),
												A2(
												$mdgriffith$elm_ui$Internal$Style$Descriptor,
												'::after',
												_List_fromArray(
													[
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'content', '\"\"'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'table'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'clear', 'both')
													]))
											]));
								case 'Left':
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'left'),
												A2(
												$mdgriffith$elm_ui$Internal$Style$Descriptor,
												'::after',
												_List_fromArray(
													[
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'content', '\"\"'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'table'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'clear', 'both')
													]))
											]));
								case 'CenterX':
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								default:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
							}
						})
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inputMultiline),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre-wrap !important'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'background-color', 'transparent')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inputMultilineWrapper),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.single),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inputMultilineParent),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre-wrap !important'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'cursor', 'text'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inputMultilineFiller),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre-wrap !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'color', 'transparent')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.paragraph),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'block'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-wrap', 'break-word'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hasBehind),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.behind),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '-1')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$AllChildren,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.text),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$AllChildren,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.paragraph),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								'::after',
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'content', 'none')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								'::before',
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'content', 'none')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$AllChildren,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.single),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthExact),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-block')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inFront),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.behind),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.above),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.below),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.onRight),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.onLeft),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.text),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.row),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.column),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-flex')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.grid),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-grid')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment.$) {
								case 'Top':
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 'Bottom':
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 'Right':
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'right')
											]));
								case 'Left':
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'left')
											]));
								case 'CenterX':
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								default:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
							}
						})
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				'.hidden',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'none')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textThin),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '100')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textExtraLight),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '200')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textLight),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '300')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textNormalWeight),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '400')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textMedium),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '500')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textSemiBold),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '600')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bold),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '700')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textExtraBold),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '800')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textHeavy),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '900')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.italic),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-style', 'italic')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.strike),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'line-through')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.underline),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'underline'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip-ink', 'auto'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip', 'ink')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				_Utils_ap(
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.underline),
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.strike)),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'line-through underline'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip-ink', 'auto'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip', 'ink')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textUnitalicized),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-style', 'normal')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textJustify),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'justify')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textJustifyAll),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'justify-all')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textCenter),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'center')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textRight),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'right')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textLeft),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'left')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				'.modal',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'fixed'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none')
					]))
			]))
	]);
var $mdgriffith$elm_ui$Internal$Style$fontVariant = function (_var) {
	return _List_fromArray(
		[
			A2(
			$mdgriffith$elm_ui$Internal$Style$Class,
			'.v-' + _var,
			_List_fromArray(
				[
					A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-feature-settings', '\"' + (_var + '\"'))
				])),
			A2(
			$mdgriffith$elm_ui$Internal$Style$Class,
			'.v-' + (_var + '-off'),
			_List_fromArray(
				[
					A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-feature-settings', '\"' + (_var + '\" 0'))
				]))
		]);
};
var $mdgriffith$elm_ui$Internal$Style$commonValues = $elm$core$List$concat(
	_List_fromArray(
		[
			A2(
			$elm$core$List$map,
			function (x) {
				return A2(
					$mdgriffith$elm_ui$Internal$Style$Class,
					'.border-' + $elm$core$String$fromInt(x),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Style$Prop,
							'border-width',
							$elm$core$String$fromInt(x) + 'px')
						]));
			},
			A2($elm$core$List$range, 0, 6)),
			A2(
			$elm$core$List$map,
			function (i) {
				return A2(
					$mdgriffith$elm_ui$Internal$Style$Class,
					'.font-size-' + $elm$core$String$fromInt(i),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Style$Prop,
							'font-size',
							$elm$core$String$fromInt(i) + 'px')
						]));
			},
			A2($elm$core$List$range, 8, 32)),
			A2(
			$elm$core$List$map,
			function (i) {
				return A2(
					$mdgriffith$elm_ui$Internal$Style$Class,
					'.p-' + $elm$core$String$fromInt(i),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Style$Prop,
							'padding',
							$elm$core$String$fromInt(i) + 'px')
						]));
			},
			A2($elm$core$List$range, 0, 24)),
			_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Class,
				'.v-smcp',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-variant', 'small-caps')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Class,
				'.v-smcp-off',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-variant', 'normal')
					]))
			]),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('zero'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('onum'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('liga'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('dlig'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('ordn'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('tnum'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('afrc'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('frac')
		]));
var $mdgriffith$elm_ui$Internal$Style$explainer = '\n.explain {\n    border: 6px solid rgb(174, 121, 15) !important;\n}\n.explain > .' + ($mdgriffith$elm_ui$Internal$Style$classes.any + (' {\n    border: 4px dashed rgb(0, 151, 167) !important;\n}\n\n.ctr {\n    border: none !important;\n}\n.explain > .ctr > .' + ($mdgriffith$elm_ui$Internal$Style$classes.any + ' {\n    border: 4px dashed rgb(0, 151, 167) !important;\n}\n\n')));
var $mdgriffith$elm_ui$Internal$Style$inputTextReset = '\ninput[type="search"],\ninput[type="search"]::-webkit-search-decoration,\ninput[type="search"]::-webkit-search-cancel-button,\ninput[type="search"]::-webkit-search-results-button,\ninput[type="search"]::-webkit-search-results-decoration {\n  -webkit-appearance:none;\n}\n';
var $mdgriffith$elm_ui$Internal$Style$sliderReset = '\ninput[type=range] {\n  -webkit-appearance: none; \n  background: transparent;\n  position:absolute;\n  left:0;\n  top:0;\n  z-index:10;\n  width: 100%;\n  outline: dashed 1px;\n  height: 100%;\n  opacity: 0;\n}\n';
var $mdgriffith$elm_ui$Internal$Style$thumbReset = '\ninput[type=range]::-webkit-slider-thumb {\n    -webkit-appearance: none;\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range]::-moz-range-thumb {\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range]::-ms-thumb {\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range][orient=vertical]{\n    writing-mode: bt-lr; /* IE */\n    -webkit-appearance: slider-vertical;  /* WebKit */\n}\n';
var $mdgriffith$elm_ui$Internal$Style$trackReset = '\ninput[type=range]::-moz-range-track {\n    background: transparent;\n    cursor: pointer;\n}\ninput[type=range]::-ms-track {\n    background: transparent;\n    cursor: pointer;\n}\ninput[type=range]::-webkit-slider-runnable-track {\n    background: transparent;\n    cursor: pointer;\n}\n';
var $mdgriffith$elm_ui$Internal$Style$overrides = '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.row) + (' > ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + (' { flex-basis: auto !important; } ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.row) + (' > ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.container) + (' { flex-basis: auto !important; }}' + ($mdgriffith$elm_ui$Internal$Style$inputTextReset + ($mdgriffith$elm_ui$Internal$Style$sliderReset + ($mdgriffith$elm_ui$Internal$Style$trackReset + ($mdgriffith$elm_ui$Internal$Style$thumbReset + $mdgriffith$elm_ui$Internal$Style$explainer)))))))))))))));
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $mdgriffith$elm_ui$Internal$Style$Intermediate = function (a) {
	return {$: 'Intermediate', a: a};
};
var $mdgriffith$elm_ui$Internal$Style$emptyIntermediate = F2(
	function (selector, closing) {
		return $mdgriffith$elm_ui$Internal$Style$Intermediate(
			{closing: closing, others: _List_Nil, props: _List_Nil, selector: selector});
	});
var $mdgriffith$elm_ui$Internal$Style$renderRules = F2(
	function (_v0, rulesToRender) {
		var parent = _v0.a;
		var generateIntermediates = F2(
			function (rule, rendered) {
				switch (rule.$) {
					case 'Prop':
						var name = rule.a;
						var val = rule.b;
						return _Utils_update(
							rendered,
							{
								props: A2(
									$elm$core$List$cons,
									_Utils_Tuple2(name, val),
									rendered.props)
							});
					case 'Supports':
						var _v2 = rule.a;
						var prop = _v2.a;
						var value = _v2.b;
						var props = rule.b;
						return _Utils_update(
							rendered,
							{
								others: A2(
									$elm$core$List$cons,
									$mdgriffith$elm_ui$Internal$Style$Intermediate(
										{closing: '\n}', others: _List_Nil, props: props, selector: '@supports (' + (prop + (':' + (value + (') {' + parent.selector))))}),
									rendered.others)
							});
					case 'Adjacent':
						var selector = rule.a;
						var adjRules = rule.b;
						return _Utils_update(
							rendered,
							{
								others: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.selector + (' + ' + selector), ''),
										adjRules),
									rendered.others)
							});
					case 'Child':
						var child = rule.a;
						var childRules = rule.b;
						return _Utils_update(
							rendered,
							{
								others: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.selector + (' > ' + child), ''),
										childRules),
									rendered.others)
							});
					case 'AllChildren':
						var child = rule.a;
						var childRules = rule.b;
						return _Utils_update(
							rendered,
							{
								others: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.selector + (' ' + child), ''),
										childRules),
									rendered.others)
							});
					case 'Descriptor':
						var descriptor = rule.a;
						var descriptorRules = rule.b;
						return _Utils_update(
							rendered,
							{
								others: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2(
											$mdgriffith$elm_ui$Internal$Style$emptyIntermediate,
											_Utils_ap(parent.selector, descriptor),
											''),
										descriptorRules),
									rendered.others)
							});
					default:
						var batched = rule.a;
						return _Utils_update(
							rendered,
							{
								others: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.selector, ''),
										batched),
									rendered.others)
							});
				}
			});
		return $mdgriffith$elm_ui$Internal$Style$Intermediate(
			A3($elm$core$List$foldr, generateIntermediates, parent, rulesToRender));
	});
var $mdgriffith$elm_ui$Internal$Style$renderCompact = function (styleClasses) {
	var renderValues = function (values) {
		return $elm$core$String$concat(
			A2(
				$elm$core$List$map,
				function (_v3) {
					var x = _v3.a;
					var y = _v3.b;
					return x + (':' + (y + ';'));
				},
				values));
	};
	var renderClass = function (rule) {
		var _v2 = rule.props;
		if (!_v2.b) {
			return '';
		} else {
			return rule.selector + ('{' + (renderValues(rule.props) + (rule.closing + '}')));
		}
	};
	var renderIntermediate = function (_v0) {
		var rule = _v0.a;
		return _Utils_ap(
			renderClass(rule),
			$elm$core$String$concat(
				A2($elm$core$List$map, renderIntermediate, rule.others)));
	};
	return $elm$core$String$concat(
		A2(
			$elm$core$List$map,
			renderIntermediate,
			A3(
				$elm$core$List$foldr,
				F2(
					function (_v1, existing) {
						var name = _v1.a;
						var styleRules = _v1.b;
						return A2(
							$elm$core$List$cons,
							A2(
								$mdgriffith$elm_ui$Internal$Style$renderRules,
								A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, name, ''),
								styleRules),
							existing);
					}),
				_List_Nil,
				styleClasses)));
};
var $mdgriffith$elm_ui$Internal$Style$rules = _Utils_ap(
	$mdgriffith$elm_ui$Internal$Style$overrides,
	$mdgriffith$elm_ui$Internal$Style$renderCompact(
		_Utils_ap($mdgriffith$elm_ui$Internal$Style$baseSheet, $mdgriffith$elm_ui$Internal$Style$commonValues)));
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $mdgriffith$elm_ui$Internal$Model$staticRoot = function (opts) {
	var _v0 = opts.mode;
	switch (_v0.$) {
		case 'Layout':
			return A3(
				$elm$virtual_dom$VirtualDom$node,
				'div',
				_List_Nil,
				_List_fromArray(
					[
						A3(
						$elm$virtual_dom$VirtualDom$node,
						'style',
						_List_Nil,
						_List_fromArray(
							[
								$elm$virtual_dom$VirtualDom$text($mdgriffith$elm_ui$Internal$Style$rules)
							]))
					]));
		case 'NoStaticStyleSheet':
			return $elm$virtual_dom$VirtualDom$text('');
		default:
			return A3(
				$elm$virtual_dom$VirtualDom$node,
				'elm-ui-static-rules',
				_List_fromArray(
					[
						A2(
						$elm$virtual_dom$VirtualDom$property,
						'rules',
						$elm$json$Json$Encode$string($mdgriffith$elm_ui$Internal$Style$rules))
					]),
				_List_Nil);
	}
};
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$fontName = function (font) {
	switch (font.$) {
		case 'Serif':
			return 'serif';
		case 'SansSerif':
			return 'sans-serif';
		case 'Monospace':
			return 'monospace';
		case 'Typeface':
			var name = font.a;
			return '\"' + (name + '\"');
		case 'ImportFont':
			var name = font.a;
			var url = font.b;
			return '\"' + (name + '\"');
		default:
			var name = font.a.name;
			return '\"' + (name + '\"');
	}
};
var $mdgriffith$elm_ui$Internal$Model$isSmallCaps = function (_var) {
	switch (_var.$) {
		case 'VariantActive':
			var name = _var.a;
			return name === 'smcp';
		case 'VariantOff':
			var name = _var.a;
			return false;
		default:
			var name = _var.a;
			var index = _var.b;
			return (name === 'smcp') && (index === 1);
	}
};
var $mdgriffith$elm_ui$Internal$Model$hasSmallCaps = function (typeface) {
	if (typeface.$ === 'FontWith') {
		var font = typeface.a;
		return A2($elm$core$List$any, $mdgriffith$elm_ui$Internal$Model$isSmallCaps, font.variants);
	} else {
		return false;
	}
};
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $mdgriffith$elm_ui$Internal$Model$renderProps = F3(
	function (force, _v0, existing) {
		var key = _v0.a;
		var val = _v0.b;
		return force ? (existing + ('\n  ' + (key + (': ' + (val + ' !important;'))))) : (existing + ('\n  ' + (key + (': ' + (val + ';')))));
	});
var $mdgriffith$elm_ui$Internal$Model$renderStyle = F4(
	function (options, maybePseudo, selector, props) {
		if (maybePseudo.$ === 'Nothing') {
			return _List_fromArray(
				[
					selector + ('{' + (A3(
					$elm$core$List$foldl,
					$mdgriffith$elm_ui$Internal$Model$renderProps(false),
					'',
					props) + '\n}'))
				]);
		} else {
			var pseudo = maybePseudo.a;
			switch (pseudo.$) {
				case 'Hover':
					var _v2 = options.hover;
					switch (_v2.$) {
						case 'NoHover':
							return _List_Nil;
						case 'ForceHover':
							return _List_fromArray(
								[
									selector + ('-hv {' + (A3(
									$elm$core$List$foldl,
									$mdgriffith$elm_ui$Internal$Model$renderProps(true),
									'',
									props) + '\n}'))
								]);
						default:
							return _List_fromArray(
								[
									selector + ('-hv:hover {' + (A3(
									$elm$core$List$foldl,
									$mdgriffith$elm_ui$Internal$Model$renderProps(false),
									'',
									props) + '\n}'))
								]);
					}
				case 'Focus':
					var renderedProps = A3(
						$elm$core$List$foldl,
						$mdgriffith$elm_ui$Internal$Model$renderProps(false),
						'',
						props);
					return _List_fromArray(
						[
							selector + ('-fs:focus {' + (renderedProps + '\n}')),
							('.' + ($mdgriffith$elm_ui$Internal$Style$classes.any + (':focus ' + (selector + '-fs  {')))) + (renderedProps + '\n}'),
							(selector + '-fs:focus-within {') + (renderedProps + '\n}'),
							('.ui-slide-bar:focus + ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + (' .focusable-thumb' + (selector + '-fs {')))) + (renderedProps + '\n}')
						]);
				default:
					return _List_fromArray(
						[
							selector + ('-act:active {' + (A3(
							$elm$core$List$foldl,
							$mdgriffith$elm_ui$Internal$Model$renderProps(false),
							'',
							props) + '\n}'))
						]);
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$renderVariant = function (_var) {
	switch (_var.$) {
		case 'VariantActive':
			var name = _var.a;
			return '\"' + (name + '\"');
		case 'VariantOff':
			var name = _var.a;
			return '\"' + (name + '\" 0');
		default:
			var name = _var.a;
			var index = _var.b;
			return '\"' + (name + ('\" ' + $elm$core$String$fromInt(index)));
	}
};
var $mdgriffith$elm_ui$Internal$Model$renderVariants = function (typeface) {
	if (typeface.$ === 'FontWith') {
		var font = typeface.a;
		return $elm$core$Maybe$Just(
			A2(
				$elm$core$String$join,
				', ',
				A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$renderVariant, font.variants)));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $mdgriffith$elm_ui$Internal$Model$transformValue = function (transform) {
	switch (transform.$) {
		case 'Untransformed':
			return $elm$core$Maybe$Nothing;
		case 'Moved':
			var _v1 = transform.a;
			var x = _v1.a;
			var y = _v1.b;
			var z = _v1.c;
			return $elm$core$Maybe$Just(
				'translate3d(' + ($elm$core$String$fromFloat(x) + ('px, ' + ($elm$core$String$fromFloat(y) + ('px, ' + ($elm$core$String$fromFloat(z) + 'px)'))))));
		default:
			var _v2 = transform.a;
			var tx = _v2.a;
			var ty = _v2.b;
			var tz = _v2.c;
			var _v3 = transform.b;
			var sx = _v3.a;
			var sy = _v3.b;
			var sz = _v3.c;
			var _v4 = transform.c;
			var ox = _v4.a;
			var oy = _v4.b;
			var oz = _v4.c;
			var angle = transform.d;
			var translate = 'translate3d(' + ($elm$core$String$fromFloat(tx) + ('px, ' + ($elm$core$String$fromFloat(ty) + ('px, ' + ($elm$core$String$fromFloat(tz) + 'px)')))));
			var scale = 'scale3d(' + ($elm$core$String$fromFloat(sx) + (', ' + ($elm$core$String$fromFloat(sy) + (', ' + ($elm$core$String$fromFloat(sz) + ')')))));
			var rotate = 'rotate3d(' + ($elm$core$String$fromFloat(ox) + (', ' + ($elm$core$String$fromFloat(oy) + (', ' + ($elm$core$String$fromFloat(oz) + (', ' + ($elm$core$String$fromFloat(angle) + 'rad)')))))));
			return $elm$core$Maybe$Just(translate + (' ' + (scale + (' ' + rotate))));
	}
};
var $mdgriffith$elm_ui$Internal$Model$renderStyleRule = F3(
	function (options, rule, maybePseudo) {
		switch (rule.$) {
			case 'Style':
				var selector = rule.a;
				var props = rule.b;
				return A4($mdgriffith$elm_ui$Internal$Model$renderStyle, options, maybePseudo, selector, props);
			case 'Shadows':
				var name = rule.a;
				var prop = rule.b;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + name,
					_List_fromArray(
						[
							A2($mdgriffith$elm_ui$Internal$Model$Property, 'box-shadow', prop)
						]));
			case 'Transparency':
				var name = rule.a;
				var transparency = rule.b;
				var opacity = A2(
					$elm$core$Basics$max,
					0,
					A2($elm$core$Basics$min, 1, 1 - transparency));
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + name,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'opacity',
							$elm$core$String$fromFloat(opacity))
						]));
			case 'FontSize':
				var i = rule.a;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.font-size-' + $elm$core$String$fromInt(i),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'font-size',
							$elm$core$String$fromInt(i) + 'px')
						]));
			case 'FontFamily':
				var name = rule.a;
				var typefaces = rule.b;
				var features = A2(
					$elm$core$String$join,
					', ',
					A2($elm$core$List$filterMap, $mdgriffith$elm_ui$Internal$Model$renderVariants, typefaces));
				var families = _List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Model$Property,
						'font-family',
						A2(
							$elm$core$String$join,
							', ',
							A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$fontName, typefaces))),
						A2($mdgriffith$elm_ui$Internal$Model$Property, 'font-feature-settings', features),
						A2(
						$mdgriffith$elm_ui$Internal$Model$Property,
						'font-variant',
						A2($elm$core$List$any, $mdgriffith$elm_ui$Internal$Model$hasSmallCaps, typefaces) ? 'small-caps' : 'normal')
					]);
				return A4($mdgriffith$elm_ui$Internal$Model$renderStyle, options, maybePseudo, '.' + name, families);
			case 'Single':
				var _class = rule.a;
				var prop = rule.b;
				var val = rule.c;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + _class,
					_List_fromArray(
						[
							A2($mdgriffith$elm_ui$Internal$Model$Property, prop, val)
						]));
			case 'Colored':
				var _class = rule.a;
				var prop = rule.b;
				var color = rule.c;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + _class,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							prop,
							$mdgriffith$elm_ui$Internal$Model$formatColor(color))
						]));
			case 'SpacingStyle':
				var cls = rule.a;
				var x = rule.b;
				var y = rule.c;
				var yPx = $elm$core$String$fromInt(y) + 'px';
				var xPx = $elm$core$String$fromInt(x) + 'px';
				var single = '.' + $mdgriffith$elm_ui$Internal$Style$classes.single;
				var row = '.' + $mdgriffith$elm_ui$Internal$Style$classes.row;
				var wrappedRow = '.' + ($mdgriffith$elm_ui$Internal$Style$classes.wrapped + row);
				var right = '.' + $mdgriffith$elm_ui$Internal$Style$classes.alignRight;
				var paragraph = '.' + $mdgriffith$elm_ui$Internal$Style$classes.paragraph;
				var page = '.' + $mdgriffith$elm_ui$Internal$Style$classes.page;
				var left = '.' + $mdgriffith$elm_ui$Internal$Style$classes.alignLeft;
				var halfY = $elm$core$String$fromFloat(y / 2) + 'px';
				var halfX = $elm$core$String$fromFloat(x / 2) + 'px';
				var column = '.' + $mdgriffith$elm_ui$Internal$Style$classes.column;
				var _class = '.' + cls;
				var any = '.' + $mdgriffith$elm_ui$Internal$Style$classes.any;
				return $elm$core$List$concat(
					_List_fromArray(
						[
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (row + (' > ' + (any + (' + ' + any)))),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-left', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (wrappedRow + (' > ' + any)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin', halfY + (' ' + halfX))
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (column + (' > ' + (any + (' + ' + any)))),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-top', yPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (page + (' > ' + (any + (' + ' + any)))),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-top', yPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (page + (' > ' + left)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-right', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (page + (' > ' + right)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-left', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_Utils_ap(_class, paragraph),
							_List_fromArray(
								[
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'line-height',
									'calc(1em + ' + ($elm$core$String$fromInt(y) + 'px)'))
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							'textarea' + (any + _class),
							_List_fromArray(
								[
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'line-height',
									'calc(1em + ' + ($elm$core$String$fromInt(y) + 'px)')),
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'height',
									'calc(100% + ' + ($elm$core$String$fromInt(y) + 'px)'))
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + (' > ' + left)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-right', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + (' > ' + right)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-left', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + '::after'),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'content', '\'\''),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'display', 'block'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'height', '0'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'width', '0'),
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'margin-top',
									$elm$core$String$fromInt((-1) * ((y / 2) | 0)) + 'px')
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + '::before'),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'content', '\'\''),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'display', 'block'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'height', '0'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'width', '0'),
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'margin-bottom',
									$elm$core$String$fromInt((-1) * ((y / 2) | 0)) + 'px')
								]))
						]));
			case 'PaddingStyle':
				var cls = rule.a;
				var top = rule.b;
				var right = rule.c;
				var bottom = rule.d;
				var left = rule.e;
				var _class = '.' + cls;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					_class,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'padding',
							$elm$core$String$fromFloat(top) + ('px ' + ($elm$core$String$fromFloat(right) + ('px ' + ($elm$core$String$fromFloat(bottom) + ('px ' + ($elm$core$String$fromFloat(left) + 'px')))))))
						]));
			case 'BorderWidth':
				var cls = rule.a;
				var top = rule.b;
				var right = rule.c;
				var bottom = rule.d;
				var left = rule.e;
				var _class = '.' + cls;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					_class,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'border-width',
							$elm$core$String$fromInt(top) + ('px ' + ($elm$core$String$fromInt(right) + ('px ' + ($elm$core$String$fromInt(bottom) + ('px ' + ($elm$core$String$fromInt(left) + 'px')))))))
						]));
			case 'GridTemplateStyle':
				var template = rule.a;
				var toGridLengthHelper = F3(
					function (minimum, maximum, x) {
						toGridLengthHelper:
						while (true) {
							switch (x.$) {
								case 'Px':
									var px = x.a;
									return $elm$core$String$fromInt(px) + 'px';
								case 'Content':
									var _v2 = _Utils_Tuple2(minimum, maximum);
									if (_v2.a.$ === 'Nothing') {
										if (_v2.b.$ === 'Nothing') {
											var _v3 = _v2.a;
											var _v4 = _v2.b;
											return 'max-content';
										} else {
											var _v6 = _v2.a;
											var maxSize = _v2.b.a;
											return 'minmax(max-content, ' + ($elm$core$String$fromInt(maxSize) + 'px)');
										}
									} else {
										if (_v2.b.$ === 'Nothing') {
											var minSize = _v2.a.a;
											var _v5 = _v2.b;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + 'max-content)'));
										} else {
											var minSize = _v2.a.a;
											var maxSize = _v2.b.a;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + ($elm$core$String$fromInt(maxSize) + 'px)')));
										}
									}
								case 'Fill':
									var i = x.a;
									var _v7 = _Utils_Tuple2(minimum, maximum);
									if (_v7.a.$ === 'Nothing') {
										if (_v7.b.$ === 'Nothing') {
											var _v8 = _v7.a;
											var _v9 = _v7.b;
											return $elm$core$String$fromInt(i) + 'fr';
										} else {
											var _v11 = _v7.a;
											var maxSize = _v7.b.a;
											return 'minmax(max-content, ' + ($elm$core$String$fromInt(maxSize) + 'px)');
										}
									} else {
										if (_v7.b.$ === 'Nothing') {
											var minSize = _v7.a.a;
											var _v10 = _v7.b;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + ($elm$core$String$fromInt(i) + ('fr' + 'fr)'))));
										} else {
											var minSize = _v7.a.a;
											var maxSize = _v7.b.a;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + ($elm$core$String$fromInt(maxSize) + 'px)')));
										}
									}
								case 'Min':
									var m = x.a;
									var len = x.b;
									var $temp$minimum = $elm$core$Maybe$Just(m),
										$temp$maximum = maximum,
										$temp$x = len;
									minimum = $temp$minimum;
									maximum = $temp$maximum;
									x = $temp$x;
									continue toGridLengthHelper;
								default:
									var m = x.a;
									var len = x.b;
									var $temp$minimum = minimum,
										$temp$maximum = $elm$core$Maybe$Just(m),
										$temp$x = len;
									minimum = $temp$minimum;
									maximum = $temp$maximum;
									x = $temp$x;
									continue toGridLengthHelper;
							}
						}
					});
				var toGridLength = function (x) {
					return A3(toGridLengthHelper, $elm$core$Maybe$Nothing, $elm$core$Maybe$Nothing, x);
				};
				var xSpacing = toGridLength(template.spacing.a);
				var ySpacing = toGridLength(template.spacing.b);
				var rows = function (x) {
					return 'grid-template-rows: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						' ',
						A2($elm$core$List$map, toGridLength, template.rows)));
				var msRows = function (x) {
					return '-ms-grid-rows: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						ySpacing,
						A2($elm$core$List$map, toGridLength, template.columns)));
				var msColumns = function (x) {
					return '-ms-grid-columns: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						ySpacing,
						A2($elm$core$List$map, toGridLength, template.columns)));
				var gapY = 'grid-row-gap:' + (toGridLength(template.spacing.b) + ';');
				var gapX = 'grid-column-gap:' + (toGridLength(template.spacing.a) + ';');
				var columns = function (x) {
					return 'grid-template-columns: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						' ',
						A2($elm$core$List$map, toGridLength, template.columns)));
				var _class = '.grid-rows-' + (A2(
					$elm$core$String$join,
					'-',
					A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.rows)) + ('-cols-' + (A2(
					$elm$core$String$join,
					'-',
					A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.columns)) + ('-space-x-' + ($mdgriffith$elm_ui$Internal$Model$lengthClassName(template.spacing.a) + ('-space-y-' + $mdgriffith$elm_ui$Internal$Model$lengthClassName(template.spacing.b)))))));
				var modernGrid = _class + ('{' + (columns + (rows + (gapX + (gapY + '}')))));
				var supports = '@supports (display:grid) {' + (modernGrid + '}');
				var base = _class + ('{' + (msColumns + (msRows + '}')));
				return _List_fromArray(
					[base, supports]);
			case 'GridPosition':
				var position = rule.a;
				var msPosition = A2(
					$elm$core$String$join,
					' ',
					_List_fromArray(
						[
							'-ms-grid-row: ' + ($elm$core$String$fromInt(position.row) + ';'),
							'-ms-grid-row-span: ' + ($elm$core$String$fromInt(position.height) + ';'),
							'-ms-grid-column: ' + ($elm$core$String$fromInt(position.col) + ';'),
							'-ms-grid-column-span: ' + ($elm$core$String$fromInt(position.width) + ';')
						]));
				var modernPosition = A2(
					$elm$core$String$join,
					' ',
					_List_fromArray(
						[
							'grid-row: ' + ($elm$core$String$fromInt(position.row) + (' / ' + ($elm$core$String$fromInt(position.row + position.height) + ';'))),
							'grid-column: ' + ($elm$core$String$fromInt(position.col) + (' / ' + ($elm$core$String$fromInt(position.col + position.width) + ';')))
						]));
				var _class = '.grid-pos-' + ($elm$core$String$fromInt(position.row) + ('-' + ($elm$core$String$fromInt(position.col) + ('-' + ($elm$core$String$fromInt(position.width) + ('-' + $elm$core$String$fromInt(position.height)))))));
				var modernGrid = _class + ('{' + (modernPosition + '}'));
				var supports = '@supports (display:grid) {' + (modernGrid + '}');
				var base = _class + ('{' + (msPosition + '}'));
				return _List_fromArray(
					[base, supports]);
			case 'PseudoSelector':
				var _class = rule.a;
				var styles = rule.b;
				var renderPseudoRule = function (style) {
					return A3(
						$mdgriffith$elm_ui$Internal$Model$renderStyleRule,
						options,
						style,
						$elm$core$Maybe$Just(_class));
				};
				return A2($elm$core$List$concatMap, renderPseudoRule, styles);
			default:
				var transform = rule.a;
				var val = $mdgriffith$elm_ui$Internal$Model$transformValue(transform);
				var _class = $mdgriffith$elm_ui$Internal$Model$transformClass(transform);
				var _v12 = _Utils_Tuple2(_class, val);
				if ((_v12.a.$ === 'Just') && (_v12.b.$ === 'Just')) {
					var cls = _v12.a.a;
					var v = _v12.b.a;
					return A4(
						$mdgriffith$elm_ui$Internal$Model$renderStyle,
						options,
						maybePseudo,
						'.' + cls,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Model$Property, 'transform', v)
							]));
				} else {
					return _List_Nil;
				}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$encodeStyles = F2(
	function (options, stylesheet) {
		return $elm$json$Json$Encode$object(
			A2(
				$elm$core$List$map,
				function (style) {
					var styled = A3($mdgriffith$elm_ui$Internal$Model$renderStyleRule, options, style, $elm$core$Maybe$Nothing);
					return _Utils_Tuple2(
						$mdgriffith$elm_ui$Internal$Model$getStyleName(style),
						A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, styled));
				},
				stylesheet));
	});
var $mdgriffith$elm_ui$Internal$Model$bracket = F2(
	function (selector, rules) {
		var renderPair = function (_v0) {
			var name = _v0.a;
			var val = _v0.b;
			return name + (': ' + (val + ';'));
		};
		return selector + (' {' + (A2(
			$elm$core$String$join,
			'',
			A2($elm$core$List$map, renderPair, rules)) + '}'));
	});
var $mdgriffith$elm_ui$Internal$Model$fontRule = F3(
	function (name, modifier, _v0) {
		var parentAdj = _v0.a;
		var textAdjustment = _v0.b;
		return _List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Model$bracket, '.' + (name + ('.' + (modifier + (', ' + ('.' + (name + (' .' + modifier))))))), parentAdj),
				A2($mdgriffith$elm_ui$Internal$Model$bracket, '.' + (name + ('.' + (modifier + ('> .' + ($mdgriffith$elm_ui$Internal$Style$classes.text + (', .' + (name + (' .' + (modifier + (' > .' + $mdgriffith$elm_ui$Internal$Style$classes.text)))))))))), textAdjustment)
			]);
	});
var $mdgriffith$elm_ui$Internal$Model$renderFontAdjustmentRule = F3(
	function (fontToAdjust, _v0, otherFontName) {
		var full = _v0.a;
		var capital = _v0.b;
		var name = _Utils_eq(fontToAdjust, otherFontName) ? fontToAdjust : (otherFontName + (' .' + fontToAdjust));
		return A2(
			$elm$core$String$join,
			' ',
			_Utils_ap(
				A3($mdgriffith$elm_ui$Internal$Model$fontRule, name, $mdgriffith$elm_ui$Internal$Style$classes.sizeByCapital, capital),
				A3($mdgriffith$elm_ui$Internal$Model$fontRule, name, $mdgriffith$elm_ui$Internal$Style$classes.fullSize, full)));
	});
var $mdgriffith$elm_ui$Internal$Model$renderNullAdjustmentRule = F2(
	function (fontToAdjust, otherFontName) {
		var name = _Utils_eq(fontToAdjust, otherFontName) ? fontToAdjust : (otherFontName + (' .' + fontToAdjust));
		return A2(
			$elm$core$String$join,
			' ',
			_List_fromArray(
				[
					A2(
					$mdgriffith$elm_ui$Internal$Model$bracket,
					'.' + (name + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.sizeByCapital + (', ' + ('.' + (name + (' .' + $mdgriffith$elm_ui$Internal$Style$classes.sizeByCapital))))))),
					_List_fromArray(
						[
							_Utils_Tuple2('line-height', '1')
						])),
					A2(
					$mdgriffith$elm_ui$Internal$Model$bracket,
					'.' + (name + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.sizeByCapital + ('> .' + ($mdgriffith$elm_ui$Internal$Style$classes.text + (', .' + (name + (' .' + ($mdgriffith$elm_ui$Internal$Style$classes.sizeByCapital + (' > .' + $mdgriffith$elm_ui$Internal$Style$classes.text)))))))))),
					_List_fromArray(
						[
							_Utils_Tuple2('vertical-align', '0'),
							_Utils_Tuple2('line-height', '1')
						]))
				]));
	});
var $mdgriffith$elm_ui$Internal$Model$adjust = F3(
	function (size, height, vertical) {
		return {height: height / size, size: size, vertical: vertical};
	});
var $elm$core$List$maximum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$max, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$List$minimum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$min, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$Basics$neq = _Utils_notEqual;
var $mdgriffith$elm_ui$Internal$Model$convertAdjustment = function (adjustment) {
	var lines = _List_fromArray(
		[adjustment.capital, adjustment.baseline, adjustment.descender, adjustment.lowercase]);
	var lineHeight = 1.5;
	var normalDescender = (lineHeight - 1) / 2;
	var oldMiddle = lineHeight / 2;
	var descender = A2(
		$elm$core$Maybe$withDefault,
		adjustment.descender,
		$elm$core$List$minimum(lines));
	var newBaseline = A2(
		$elm$core$Maybe$withDefault,
		adjustment.baseline,
		$elm$core$List$minimum(
			A2(
				$elm$core$List$filter,
				function (x) {
					return !_Utils_eq(x, descender);
				},
				lines)));
	var base = lineHeight;
	var ascender = A2(
		$elm$core$Maybe$withDefault,
		adjustment.capital,
		$elm$core$List$maximum(lines));
	var capitalSize = 1 / (ascender - newBaseline);
	var capitalVertical = 1 - ascender;
	var fullSize = 1 / (ascender - descender);
	var fullVertical = 1 - ascender;
	var newCapitalMiddle = ((ascender - newBaseline) / 2) + newBaseline;
	var newFullMiddle = ((ascender - descender) / 2) + descender;
	return {
		capital: A3($mdgriffith$elm_ui$Internal$Model$adjust, capitalSize, ascender - newBaseline, capitalVertical),
		full: A3($mdgriffith$elm_ui$Internal$Model$adjust, fullSize, ascender - descender, fullVertical)
	};
};
var $mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules = function (converted) {
	return _Utils_Tuple2(
		_List_fromArray(
			[
				_Utils_Tuple2('display', 'block')
			]),
		_List_fromArray(
			[
				_Utils_Tuple2('display', 'inline-block'),
				_Utils_Tuple2(
				'line-height',
				$elm$core$String$fromFloat(converted.height)),
				_Utils_Tuple2(
				'vertical-align',
				$elm$core$String$fromFloat(converted.vertical) + 'em'),
				_Utils_Tuple2(
				'font-size',
				$elm$core$String$fromFloat(converted.size) + 'em')
			]));
};
var $mdgriffith$elm_ui$Internal$Model$typefaceAdjustment = function (typefaces) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (face, found) {
				if (found.$ === 'Nothing') {
					if (face.$ === 'FontWith') {
						var _with = face.a;
						var _v2 = _with.adjustment;
						if (_v2.$ === 'Nothing') {
							return found;
						} else {
							var adjustment = _v2.a;
							return $elm$core$Maybe$Just(
								_Utils_Tuple2(
									$mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules(
										function ($) {
											return $.full;
										}(
											$mdgriffith$elm_ui$Internal$Model$convertAdjustment(adjustment))),
									$mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules(
										function ($) {
											return $.capital;
										}(
											$mdgriffith$elm_ui$Internal$Model$convertAdjustment(adjustment)))));
						}
					} else {
						return found;
					}
				} else {
					return found;
				}
			}),
		$elm$core$Maybe$Nothing,
		typefaces);
};
var $mdgriffith$elm_ui$Internal$Model$renderTopLevelValues = function (rules) {
	var withImport = function (font) {
		if (font.$ === 'ImportFont') {
			var url = font.b;
			return $elm$core$Maybe$Just('@import url(\'' + (url + '\');'));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	};
	var fontImports = function (_v2) {
		var name = _v2.a;
		var typefaces = _v2.b;
		var imports = A2(
			$elm$core$String$join,
			'\n',
			A2($elm$core$List$filterMap, withImport, typefaces));
		return imports;
	};
	var allNames = A2($elm$core$List$map, $elm$core$Tuple$first, rules);
	var fontAdjustments = function (_v1) {
		var name = _v1.a;
		var typefaces = _v1.b;
		var _v0 = $mdgriffith$elm_ui$Internal$Model$typefaceAdjustment(typefaces);
		if (_v0.$ === 'Nothing') {
			return A2(
				$elm$core$String$join,
				'',
				A2(
					$elm$core$List$map,
					$mdgriffith$elm_ui$Internal$Model$renderNullAdjustmentRule(name),
					allNames));
		} else {
			var adjustment = _v0.a;
			return A2(
				$elm$core$String$join,
				'',
				A2(
					$elm$core$List$map,
					A2($mdgriffith$elm_ui$Internal$Model$renderFontAdjustmentRule, name, adjustment),
					allNames));
		}
	};
	return _Utils_ap(
		A2(
			$elm$core$String$join,
			'\n',
			A2($elm$core$List$map, fontImports, rules)),
		A2(
			$elm$core$String$join,
			'\n',
			A2($elm$core$List$map, fontAdjustments, rules)));
};
var $mdgriffith$elm_ui$Internal$Model$topLevelValue = function (rule) {
	if (rule.$ === 'FontFamily') {
		var name = rule.a;
		var typefaces = rule.b;
		return $elm$core$Maybe$Just(
			_Utils_Tuple2(name, typefaces));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $mdgriffith$elm_ui$Internal$Model$toStyleSheetString = F2(
	function (options, stylesheet) {
		var combine = F2(
			function (style, rendered) {
				return {
					rules: _Utils_ap(
						rendered.rules,
						A3($mdgriffith$elm_ui$Internal$Model$renderStyleRule, options, style, $elm$core$Maybe$Nothing)),
					topLevel: function () {
						var _v1 = $mdgriffith$elm_ui$Internal$Model$topLevelValue(style);
						if (_v1.$ === 'Nothing') {
							return rendered.topLevel;
						} else {
							var topLevel = _v1.a;
							return A2($elm$core$List$cons, topLevel, rendered.topLevel);
						}
					}()
				};
			});
		var _v0 = A3(
			$elm$core$List$foldl,
			combine,
			{rules: _List_Nil, topLevel: _List_Nil},
			stylesheet);
		var topLevel = _v0.topLevel;
		var rules = _v0.rules;
		return _Utils_ap(
			$mdgriffith$elm_ui$Internal$Model$renderTopLevelValues(topLevel),
			$elm$core$String$concat(rules));
	});
var $mdgriffith$elm_ui$Internal$Model$toStyleSheet = F2(
	function (options, styleSheet) {
		var _v0 = options.mode;
		switch (_v0.$) {
			case 'Layout':
				return A3(
					$elm$virtual_dom$VirtualDom$node,
					'div',
					_List_Nil,
					_List_fromArray(
						[
							A3(
							$elm$virtual_dom$VirtualDom$node,
							'style',
							_List_Nil,
							_List_fromArray(
								[
									$elm$virtual_dom$VirtualDom$text(
									A2($mdgriffith$elm_ui$Internal$Model$toStyleSheetString, options, styleSheet))
								]))
						]));
			case 'NoStaticStyleSheet':
				return A3(
					$elm$virtual_dom$VirtualDom$node,
					'div',
					_List_Nil,
					_List_fromArray(
						[
							A3(
							$elm$virtual_dom$VirtualDom$node,
							'style',
							_List_Nil,
							_List_fromArray(
								[
									$elm$virtual_dom$VirtualDom$text(
									A2($mdgriffith$elm_ui$Internal$Model$toStyleSheetString, options, styleSheet))
								]))
						]));
			default:
				return A3(
					$elm$virtual_dom$VirtualDom$node,
					'elm-ui-rules',
					_List_fromArray(
						[
							A2(
							$elm$virtual_dom$VirtualDom$property,
							'rules',
							A2($mdgriffith$elm_ui$Internal$Model$encodeStyles, options, styleSheet))
						]),
					_List_Nil);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$embedKeyed = F4(
	function (_static, opts, styles, children) {
		var dynamicStyleSheet = A2(
			$mdgriffith$elm_ui$Internal$Model$toStyleSheet,
			opts,
			A3(
				$elm$core$List$foldl,
				$mdgriffith$elm_ui$Internal$Model$reduceStyles,
				_Utils_Tuple2(
					$elm$core$Set$empty,
					$mdgriffith$elm_ui$Internal$Model$renderFocusStyle(opts.focus)),
				styles).b);
		return _static ? A2(
			$elm$core$List$cons,
			_Utils_Tuple2(
				'static-stylesheet',
				$mdgriffith$elm_ui$Internal$Model$staticRoot(opts)),
			A2(
				$elm$core$List$cons,
				_Utils_Tuple2('dynamic-stylesheet', dynamicStyleSheet),
				children)) : A2(
			$elm$core$List$cons,
			_Utils_Tuple2('dynamic-stylesheet', dynamicStyleSheet),
			children);
	});
var $mdgriffith$elm_ui$Internal$Model$embedWith = F4(
	function (_static, opts, styles, children) {
		var dynamicStyleSheet = A2(
			$mdgriffith$elm_ui$Internal$Model$toStyleSheet,
			opts,
			A3(
				$elm$core$List$foldl,
				$mdgriffith$elm_ui$Internal$Model$reduceStyles,
				_Utils_Tuple2(
					$elm$core$Set$empty,
					$mdgriffith$elm_ui$Internal$Model$renderFocusStyle(opts.focus)),
				styles).b);
		return _static ? A2(
			$elm$core$List$cons,
			$mdgriffith$elm_ui$Internal$Model$staticRoot(opts),
			A2($elm$core$List$cons, dynamicStyleSheet, children)) : A2($elm$core$List$cons, dynamicStyleSheet, children);
	});
var $mdgriffith$elm_ui$Internal$Flag$heightBetween = $mdgriffith$elm_ui$Internal$Flag$flag(45);
var $mdgriffith$elm_ui$Internal$Flag$heightFill = $mdgriffith$elm_ui$Internal$Flag$flag(37);
var $elm$virtual_dom$VirtualDom$keyedNode = function (tag) {
	return _VirtualDom_keyedNode(
		_VirtualDom_noScript(tag));
};
var $elm$core$Basics$not = _Basics_not;
var $elm$html$Html$p = _VirtualDom_node('p');
var $elm$core$Bitwise$and = _Bitwise_and;
var $mdgriffith$elm_ui$Internal$Flag$present = F2(
	function (myFlag, _v0) {
		var fieldOne = _v0.a;
		var fieldTwo = _v0.b;
		if (myFlag.$ === 'Flag') {
			var first = myFlag.a;
			return _Utils_eq(first & fieldOne, first);
		} else {
			var second = myFlag.a;
			return _Utils_eq(second & fieldTwo, second);
		}
	});
var $elm$html$Html$s = _VirtualDom_node('s');
var $elm$html$Html$u = _VirtualDom_node('u');
var $mdgriffith$elm_ui$Internal$Flag$widthBetween = $mdgriffith$elm_ui$Internal$Flag$flag(44);
var $mdgriffith$elm_ui$Internal$Flag$widthFill = $mdgriffith$elm_ui$Internal$Flag$flag(39);
var $mdgriffith$elm_ui$Internal$Model$finalizeNode = F6(
	function (has, node, attributes, children, embedMode, parentContext) {
		var createNode = F2(
			function (nodeName, attrs) {
				if (children.$ === 'Keyed') {
					var keyed = children.a;
					return A3(
						$elm$virtual_dom$VirtualDom$keyedNode,
						nodeName,
						attrs,
						function () {
							switch (embedMode.$) {
								case 'NoStyleSheet':
									return keyed;
								case 'OnlyDynamic':
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedKeyed, false, opts, styles, keyed);
								default:
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedKeyed, true, opts, styles, keyed);
							}
						}());
				} else {
					var unkeyed = children.a;
					return A2(
						function () {
							switch (nodeName) {
								case 'div':
									return $elm$html$Html$div;
								case 'p':
									return $elm$html$Html$p;
								default:
									return $elm$virtual_dom$VirtualDom$node(nodeName);
							}
						}(),
						attrs,
						function () {
							switch (embedMode.$) {
								case 'NoStyleSheet':
									return unkeyed;
								case 'OnlyDynamic':
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedWith, false, opts, styles, unkeyed);
								default:
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedWith, true, opts, styles, unkeyed);
							}
						}());
				}
			});
		var html = function () {
			switch (node.$) {
				case 'Generic':
					return A2(createNode, 'div', attributes);
				case 'NodeName':
					var nodeName = node.a;
					return A2(createNode, nodeName, attributes);
				default:
					var nodeName = node.a;
					var internal = node.b;
					return A3(
						$elm$virtual_dom$VirtualDom$node,
						nodeName,
						attributes,
						_List_fromArray(
							[
								A2(
								createNode,
								internal,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class($mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.single))
									]))
							]));
			}
		}();
		switch (parentContext.$) {
			case 'AsRow':
				return (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$widthFill, has) && (!A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$widthBetween, has))) ? html : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$alignRight, has) ? A2(
					$elm$html$Html$u,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.any, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.container, $mdgriffith$elm_ui$Internal$Style$classes.contentCenterY, $mdgriffith$elm_ui$Internal$Style$classes.alignContainerRight])))
						]),
					_List_fromArray(
						[html])) : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$centerX, has) ? A2(
					$elm$html$Html$s,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.any, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.container, $mdgriffith$elm_ui$Internal$Style$classes.contentCenterY, $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterX])))
						]),
					_List_fromArray(
						[html])) : html));
			case 'AsColumn':
				return (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$heightFill, has) && (!A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$heightBetween, has))) ? html : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$centerY, has) ? A2(
					$elm$html$Html$s,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.any, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.container, $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterY])))
						]),
					_List_fromArray(
						[html])) : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$alignBottom, has) ? A2(
					$elm$html$Html$u,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.any, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.container, $mdgriffith$elm_ui$Internal$Style$classes.alignContainerBottom])))
						]),
					_List_fromArray(
						[html])) : html));
			default:
				return html;
		}
	});
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $mdgriffith$elm_ui$Internal$Model$textElementClasses = $mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.text + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.widthContent + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.heightContent)))));
var $mdgriffith$elm_ui$Internal$Model$textElement = function (str) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class($mdgriffith$elm_ui$Internal$Model$textElementClasses)
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(str)
			]));
};
var $mdgriffith$elm_ui$Internal$Model$textElementFillClasses = $mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.text + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.widthFill + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.heightFill)))));
var $mdgriffith$elm_ui$Internal$Model$textElementFill = function (str) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class($mdgriffith$elm_ui$Internal$Model$textElementFillClasses)
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(str)
			]));
};
var $mdgriffith$elm_ui$Internal$Model$createElement = F3(
	function (context, children, rendered) {
		var gatherKeyed = F2(
			function (_v8, _v9) {
				var key = _v8.a;
				var child = _v8.b;
				var htmls = _v9.a;
				var existingStyles = _v9.b;
				switch (child.$) {
					case 'Unstyled':
						var html = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									html(context)),
								htmls),
							existingStyles) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									html(context)),
								htmls),
							existingStyles);
					case 'Styled':
						var styled = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									A2(styled.html, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context)),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.styles : _Utils_ap(styled.styles, existingStyles)) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									A2(styled.html, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context)),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.styles : _Utils_ap(styled.styles, existingStyles));
					case 'Text':
						var str = child.a;
						return _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									_Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asEl) ? $mdgriffith$elm_ui$Internal$Model$textElementFill(str) : $mdgriffith$elm_ui$Internal$Model$textElement(str)),
								htmls),
							existingStyles);
					default:
						return _Utils_Tuple2(htmls, existingStyles);
				}
			});
		var gather = F2(
			function (child, _v6) {
				var htmls = _v6.a;
				var existingStyles = _v6.b;
				switch (child.$) {
					case 'Unstyled':
						var html = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								html(context),
								htmls),
							existingStyles) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								html(context),
								htmls),
							existingStyles);
					case 'Styled':
						var styled = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								A2(styled.html, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.styles : _Utils_ap(styled.styles, existingStyles)) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								A2(styled.html, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.styles : _Utils_ap(styled.styles, existingStyles));
					case 'Text':
						var str = child.a;
						return _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asEl) ? $mdgriffith$elm_ui$Internal$Model$textElementFill(str) : $mdgriffith$elm_ui$Internal$Model$textElement(str),
								htmls),
							existingStyles);
					default:
						return _Utils_Tuple2(htmls, existingStyles);
				}
			});
		if (children.$ === 'Keyed') {
			var keyedChildren = children.a;
			var _v1 = A3(
				$elm$core$List$foldr,
				gatherKeyed,
				_Utils_Tuple2(_List_Nil, _List_Nil),
				keyedChildren);
			var keyed = _v1.a;
			var styles = _v1.b;
			var newStyles = $elm$core$List$isEmpty(styles) ? rendered.styles : _Utils_ap(rendered.styles, styles);
			if (!newStyles.b) {
				return $mdgriffith$elm_ui$Internal$Model$Unstyled(
					A5(
						$mdgriffith$elm_ui$Internal$Model$finalizeNode,
						rendered.has,
						rendered.node,
						rendered.attributes,
						$mdgriffith$elm_ui$Internal$Model$Keyed(
							A3($mdgriffith$elm_ui$Internal$Model$addKeyedChildren, 'nearby-element-pls', keyed, rendered.children)),
						$mdgriffith$elm_ui$Internal$Model$NoStyleSheet));
			} else {
				var allStyles = newStyles;
				return $mdgriffith$elm_ui$Internal$Model$Styled(
					{
						html: A4(
							$mdgriffith$elm_ui$Internal$Model$finalizeNode,
							rendered.has,
							rendered.node,
							rendered.attributes,
							$mdgriffith$elm_ui$Internal$Model$Keyed(
								A3($mdgriffith$elm_ui$Internal$Model$addKeyedChildren, 'nearby-element-pls', keyed, rendered.children))),
						styles: allStyles
					});
			}
		} else {
			var unkeyedChildren = children.a;
			var _v3 = A3(
				$elm$core$List$foldr,
				gather,
				_Utils_Tuple2(_List_Nil, _List_Nil),
				unkeyedChildren);
			var unkeyed = _v3.a;
			var styles = _v3.b;
			var newStyles = $elm$core$List$isEmpty(styles) ? rendered.styles : _Utils_ap(rendered.styles, styles);
			if (!newStyles.b) {
				return $mdgriffith$elm_ui$Internal$Model$Unstyled(
					A5(
						$mdgriffith$elm_ui$Internal$Model$finalizeNode,
						rendered.has,
						rendered.node,
						rendered.attributes,
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							A2($mdgriffith$elm_ui$Internal$Model$addChildren, unkeyed, rendered.children)),
						$mdgriffith$elm_ui$Internal$Model$NoStyleSheet));
			} else {
				var allStyles = newStyles;
				return $mdgriffith$elm_ui$Internal$Model$Styled(
					{
						html: A4(
							$mdgriffith$elm_ui$Internal$Model$finalizeNode,
							rendered.has,
							rendered.node,
							rendered.attributes,
							$mdgriffith$elm_ui$Internal$Model$Unkeyed(
								A2($mdgriffith$elm_ui$Internal$Model$addChildren, unkeyed, rendered.children))),
						styles: allStyles
					});
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$Single = F3(
	function (a, b, c) {
		return {$: 'Single', a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Internal$Model$Transform = function (a) {
	return {$: 'Transform', a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$core$Bitwise$or = _Bitwise_or;
var $mdgriffith$elm_ui$Internal$Flag$add = F2(
	function (myFlag, _v0) {
		var one = _v0.a;
		var two = _v0.b;
		if (myFlag.$ === 'Flag') {
			var first = myFlag.a;
			return A2($mdgriffith$elm_ui$Internal$Flag$Field, first | one, two);
		} else {
			var second = myFlag.a;
			return A2($mdgriffith$elm_ui$Internal$Flag$Field, one, second | two);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$ChildrenBehind = function (a) {
	return {$: 'ChildrenBehind', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront = F2(
	function (a, b) {
		return {$: 'ChildrenBehindAndInFront', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$ChildrenInFront = function (a) {
	return {$: 'ChildrenInFront', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$nearbyElement = F2(
	function (location, elem) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class(
					function () {
						switch (location.$) {
							case 'Above':
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.nearby, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.above]));
							case 'Below':
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.nearby, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.below]));
							case 'OnRight':
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.nearby, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.onRight]));
							case 'OnLeft':
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.nearby, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.onLeft]));
							case 'InFront':
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.nearby, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.inFront]));
							default:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.nearby, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.behind]));
						}
					}())
				]),
			_List_fromArray(
				[
					function () {
					switch (elem.$) {
						case 'Empty':
							return $elm$virtual_dom$VirtualDom$text('');
						case 'Text':
							var str = elem.a;
							return $mdgriffith$elm_ui$Internal$Model$textElement(str);
						case 'Unstyled':
							var html = elem.a;
							return html($mdgriffith$elm_ui$Internal$Model$asEl);
						default:
							var styled = elem.a;
							return A2(styled.html, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, $mdgriffith$elm_ui$Internal$Model$asEl);
					}
				}()
				]));
	});
var $mdgriffith$elm_ui$Internal$Model$addNearbyElement = F3(
	function (location, elem, existing) {
		var nearby = A2($mdgriffith$elm_ui$Internal$Model$nearbyElement, location, elem);
		switch (existing.$) {
			case 'NoNearbyChildren':
				if (location.$ === 'Behind') {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenBehind(
						_List_fromArray(
							[nearby]));
				} else {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenInFront(
						_List_fromArray(
							[nearby]));
				}
			case 'ChildrenBehind':
				var existingBehind = existing.a;
				if (location.$ === 'Behind') {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenBehind(
						A2($elm$core$List$cons, nearby, existingBehind));
				} else {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						existingBehind,
						_List_fromArray(
							[nearby]));
				}
			case 'ChildrenInFront':
				var existingInFront = existing.a;
				if (location.$ === 'Behind') {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						_List_fromArray(
							[nearby]),
						existingInFront);
				} else {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenInFront(
						A2($elm$core$List$cons, nearby, existingInFront));
				}
			default:
				var existingBehind = existing.a;
				var existingInFront = existing.b;
				if (location.$ === 'Behind') {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						A2($elm$core$List$cons, nearby, existingBehind),
						existingInFront);
				} else {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						existingBehind,
						A2($elm$core$List$cons, nearby, existingInFront));
				}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$Embedded = F2(
	function (a, b) {
		return {$: 'Embedded', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$NodeName = function (a) {
	return {$: 'NodeName', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$addNodeName = F2(
	function (newNode, old) {
		switch (old.$) {
			case 'Generic':
				return $mdgriffith$elm_ui$Internal$Model$NodeName(newNode);
			case 'NodeName':
				var name = old.a;
				return A2($mdgriffith$elm_ui$Internal$Model$Embedded, name, newNode);
			default:
				var x = old.a;
				var y = old.b;
				return A2($mdgriffith$elm_ui$Internal$Model$Embedded, x, y);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$alignXName = function (align) {
	switch (align.$) {
		case 'Left':
			return $mdgriffith$elm_ui$Internal$Style$classes.alignedHorizontally + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.alignLeft);
		case 'Right':
			return $mdgriffith$elm_ui$Internal$Style$classes.alignedHorizontally + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.alignRight);
		default:
			return $mdgriffith$elm_ui$Internal$Style$classes.alignedHorizontally + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.alignCenterX);
	}
};
var $mdgriffith$elm_ui$Internal$Model$alignYName = function (align) {
	switch (align.$) {
		case 'Top':
			return $mdgriffith$elm_ui$Internal$Style$classes.alignedVertically + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.alignTop);
		case 'Bottom':
			return $mdgriffith$elm_ui$Internal$Style$classes.alignedVertically + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.alignBottom);
		default:
			return $mdgriffith$elm_ui$Internal$Style$classes.alignedVertically + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.alignCenterY);
	}
};
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $mdgriffith$elm_ui$Internal$Model$FullTransform = F4(
	function (a, b, c, d) {
		return {$: 'FullTransform', a: a, b: b, c: c, d: d};
	});
var $mdgriffith$elm_ui$Internal$Model$Moved = function (a) {
	return {$: 'Moved', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$composeTransformation = F2(
	function (transform, component) {
		switch (transform.$) {
			case 'Untransformed':
				switch (component.$) {
					case 'MoveX':
						var x = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(x, 0, 0));
					case 'MoveY':
						var y = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(0, y, 0));
					case 'MoveZ':
						var z = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(0, 0, z));
					case 'MoveXYZ':
						var xyz = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(xyz);
					case 'Rotate':
						var xyz = component.a;
						var angle = component.b;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(0, 0, 0),
							_Utils_Tuple3(1, 1, 1),
							xyz,
							angle);
					default:
						var xyz = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(0, 0, 0),
							xyz,
							_Utils_Tuple3(0, 0, 1),
							0);
				}
			case 'Moved':
				var moved = transform.a;
				var x = moved.a;
				var y = moved.b;
				var z = moved.c;
				switch (component.$) {
					case 'MoveX':
						var newX = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(newX, y, z));
					case 'MoveY':
						var newY = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(x, newY, z));
					case 'MoveZ':
						var newZ = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(x, y, newZ));
					case 'MoveXYZ':
						var xyz = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(xyz);
					case 'Rotate':
						var xyz = component.a;
						var angle = component.b;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							moved,
							_Utils_Tuple3(1, 1, 1),
							xyz,
							angle);
					default:
						var scale = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							moved,
							scale,
							_Utils_Tuple3(0, 0, 1),
							0);
				}
			default:
				var moved = transform.a;
				var x = moved.a;
				var y = moved.b;
				var z = moved.c;
				var scaled = transform.b;
				var origin = transform.c;
				var angle = transform.d;
				switch (component.$) {
					case 'MoveX':
						var newX = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(newX, y, z),
							scaled,
							origin,
							angle);
					case 'MoveY':
						var newY = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(x, newY, z),
							scaled,
							origin,
							angle);
					case 'MoveZ':
						var newZ = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(x, y, newZ),
							scaled,
							origin,
							angle);
					case 'MoveXYZ':
						var newMove = component.a;
						return A4($mdgriffith$elm_ui$Internal$Model$FullTransform, newMove, scaled, origin, angle);
					case 'Rotate':
						var newOrigin = component.a;
						var newAngle = component.b;
						return A4($mdgriffith$elm_ui$Internal$Model$FullTransform, moved, scaled, newOrigin, newAngle);
					default:
						var newScale = component.a;
						return A4($mdgriffith$elm_ui$Internal$Model$FullTransform, moved, newScale, origin, angle);
				}
		}
	});
var $mdgriffith$elm_ui$Internal$Flag$height = $mdgriffith$elm_ui$Internal$Flag$flag(7);
var $mdgriffith$elm_ui$Internal$Flag$heightContent = $mdgriffith$elm_ui$Internal$Flag$flag(36);
var $mdgriffith$elm_ui$Internal$Flag$merge = F2(
	function (_v0, _v1) {
		var one = _v0.a;
		var two = _v0.b;
		var three = _v1.a;
		var four = _v1.b;
		return A2($mdgriffith$elm_ui$Internal$Flag$Field, one | three, two | four);
	});
var $mdgriffith$elm_ui$Internal$Flag$none = A2($mdgriffith$elm_ui$Internal$Flag$Field, 0, 0);
var $mdgriffith$elm_ui$Internal$Model$renderHeight = function (h) {
	switch (h.$) {
		case 'Px':
			var px = h.a;
			var val = $elm$core$String$fromInt(px);
			var name = 'height-px-' + val;
			return _Utils_Tuple3(
				$mdgriffith$elm_ui$Internal$Flag$none,
				$mdgriffith$elm_ui$Internal$Style$classes.heightExact + (' ' + name),
				_List_fromArray(
					[
						A3($mdgriffith$elm_ui$Internal$Model$Single, name, 'height', val + 'px')
					]));
		case 'Content':
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightContent, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.heightContent,
				_List_Nil);
		case 'Fill':
			var portion = h.a;
			return (portion === 1) ? _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.heightFill,
				_List_Nil) : _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.heightFillPortion + (' height-fill-' + $elm$core$String$fromInt(portion)),
				_List_fromArray(
					[
						A3(
						$mdgriffith$elm_ui$Internal$Model$Single,
						$mdgriffith$elm_ui$Internal$Style$classes.any + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.column + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
							'height-fill-' + $elm$core$String$fromInt(portion))))),
						'flex-grow',
						$elm$core$String$fromInt(portion * 100000))
					]));
		case 'Min':
			var minSize = h.a;
			var len = h.b;
			var cls = 'min-height-' + $elm$core$String$fromInt(minSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'min-height',
				$elm$core$String$fromInt(minSize) + 'px !important');
			var _v1 = $mdgriffith$elm_ui$Internal$Model$renderHeight(len);
			var newFlag = _v1.a;
			var newAttrs = _v1.b;
			var newStyle = _v1.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
		default:
			var maxSize = h.a;
			var len = h.b;
			var cls = 'max-height-' + $elm$core$String$fromInt(maxSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'max-height',
				$elm$core$String$fromInt(maxSize) + 'px');
			var _v2 = $mdgriffith$elm_ui$Internal$Model$renderHeight(len);
			var newFlag = _v2.a;
			var newAttrs = _v2.b;
			var newStyle = _v2.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
	}
};
var $mdgriffith$elm_ui$Internal$Flag$widthContent = $mdgriffith$elm_ui$Internal$Flag$flag(38);
var $mdgriffith$elm_ui$Internal$Model$renderWidth = function (w) {
	switch (w.$) {
		case 'Px':
			var px = w.a;
			return _Utils_Tuple3(
				$mdgriffith$elm_ui$Internal$Flag$none,
				$mdgriffith$elm_ui$Internal$Style$classes.widthExact + (' width-px-' + $elm$core$String$fromInt(px)),
				_List_fromArray(
					[
						A3(
						$mdgriffith$elm_ui$Internal$Model$Single,
						'width-px-' + $elm$core$String$fromInt(px),
						'width',
						$elm$core$String$fromInt(px) + 'px')
					]));
		case 'Content':
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthContent, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.widthContent,
				_List_Nil);
		case 'Fill':
			var portion = w.a;
			return (portion === 1) ? _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.widthFill,
				_List_Nil) : _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.widthFillPortion + (' width-fill-' + $elm$core$String$fromInt(portion)),
				_List_fromArray(
					[
						A3(
						$mdgriffith$elm_ui$Internal$Model$Single,
						$mdgriffith$elm_ui$Internal$Style$classes.any + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.row + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
							'width-fill-' + $elm$core$String$fromInt(portion))))),
						'flex-grow',
						$elm$core$String$fromInt(portion * 100000))
					]));
		case 'Min':
			var minSize = w.a;
			var len = w.b;
			var cls = 'min-width-' + $elm$core$String$fromInt(minSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'min-width',
				$elm$core$String$fromInt(minSize) + 'px');
			var _v1 = $mdgriffith$elm_ui$Internal$Model$renderWidth(len);
			var newFlag = _v1.a;
			var newAttrs = _v1.b;
			var newStyle = _v1.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
		default:
			var maxSize = w.a;
			var len = w.b;
			var cls = 'max-width-' + $elm$core$String$fromInt(maxSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'max-width',
				$elm$core$String$fromInt(maxSize) + 'px');
			var _v2 = $mdgriffith$elm_ui$Internal$Model$renderWidth(len);
			var newFlag = _v2.a;
			var newAttrs = _v2.b;
			var newStyle = _v2.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
	}
};
var $mdgriffith$elm_ui$Internal$Flag$borderWidth = $mdgriffith$elm_ui$Internal$Flag$flag(27);
var $elm$core$Basics$ge = _Utils_ge;
var $mdgriffith$elm_ui$Internal$Model$skippable = F2(
	function (flag, style) {
		if (_Utils_eq(flag, $mdgriffith$elm_ui$Internal$Flag$borderWidth)) {
			if (style.$ === 'Single') {
				var val = style.c;
				switch (val) {
					case '0px':
						return true;
					case '1px':
						return true;
					case '2px':
						return true;
					case '3px':
						return true;
					case '4px':
						return true;
					case '5px':
						return true;
					case '6px':
						return true;
					default:
						return false;
				}
			} else {
				return false;
			}
		} else {
			switch (style.$) {
				case 'FontSize':
					var i = style.a;
					return (i >= 8) && (i <= 32);
				case 'PaddingStyle':
					var name = style.a;
					var t = style.b;
					var r = style.c;
					var b = style.d;
					var l = style.e;
					return _Utils_eq(t, b) && (_Utils_eq(t, r) && (_Utils_eq(t, l) && ((t >= 0) && (t <= 24))));
				default:
					return false;
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Flag$width = $mdgriffith$elm_ui$Internal$Flag$flag(6);
var $mdgriffith$elm_ui$Internal$Flag$xAlign = $mdgriffith$elm_ui$Internal$Flag$flag(30);
var $mdgriffith$elm_ui$Internal$Flag$yAlign = $mdgriffith$elm_ui$Internal$Flag$flag(29);
var $mdgriffith$elm_ui$Internal$Model$gatherAttrRecursive = F8(
	function (classes, node, has, transform, styles, attrs, children, elementAttrs) {
		gatherAttrRecursive:
		while (true) {
			if (!elementAttrs.b) {
				var _v1 = $mdgriffith$elm_ui$Internal$Model$transformClass(transform);
				if (_v1.$ === 'Nothing') {
					return {
						attributes: A2(
							$elm$core$List$cons,
							$elm$html$Html$Attributes$class(classes),
							attrs),
						children: children,
						has: has,
						node: node,
						styles: styles
					};
				} else {
					var _class = _v1.a;
					return {
						attributes: A2(
							$elm$core$List$cons,
							$elm$html$Html$Attributes$class(classes + (' ' + _class)),
							attrs),
						children: children,
						has: has,
						node: node,
						styles: A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$Transform(transform),
							styles)
					};
				}
			} else {
				var attribute = elementAttrs.a;
				var remaining = elementAttrs.b;
				switch (attribute.$) {
					case 'NoAttribute':
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = has,
							$temp$transform = transform,
							$temp$styles = styles,
							$temp$attrs = attrs,
							$temp$children = children,
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 'Class':
						var flag = attribute.a;
						var exactClassName = attribute.b;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, flag, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							var $temp$classes = exactClassName + (' ' + classes),
								$temp$node = node,
								$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						}
					case 'Attr':
						var actualAttribute = attribute.a;
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = has,
							$temp$transform = transform,
							$temp$styles = styles,
							$temp$attrs = A2($elm$core$List$cons, actualAttribute, attrs),
							$temp$children = children,
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 'StyleClass':
						var flag = attribute.a;
						var style = attribute.b;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, flag, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							if (A2($mdgriffith$elm_ui$Internal$Model$skippable, flag, style)) {
								var $temp$classes = $mdgriffith$elm_ui$Internal$Model$getStyleName(style) + (' ' + classes),
									$temp$node = node,
									$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							} else {
								var $temp$classes = $mdgriffith$elm_ui$Internal$Model$getStyleName(style) + (' ' + classes),
									$temp$node = node,
									$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
									$temp$transform = transform,
									$temp$styles = A2($elm$core$List$cons, style, styles),
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							}
						}
					case 'TransformComponent':
						var flag = attribute.a;
						var component = attribute.b;
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
							$temp$transform = A2($mdgriffith$elm_ui$Internal$Model$composeTransformation, transform, component),
							$temp$styles = styles,
							$temp$attrs = attrs,
							$temp$children = children,
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 'Width':
						var width = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$width, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							switch (width.$) {
								case 'Px':
									var px = width.a;
									var $temp$classes = ($mdgriffith$elm_ui$Internal$Style$classes.widthExact + (' width-px-' + $elm$core$String$fromInt(px))) + (' ' + classes),
										$temp$node = node,
										$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has),
										$temp$transform = transform,
										$temp$styles = A2(
										$elm$core$List$cons,
										A3(
											$mdgriffith$elm_ui$Internal$Model$Single,
											'width-px-' + $elm$core$String$fromInt(px),
											'width',
											$elm$core$String$fromInt(px) + 'px'),
										styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 'Content':
									var $temp$classes = classes + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.widthContent),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$add,
										$mdgriffith$elm_ui$Internal$Flag$widthContent,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
										$temp$transform = transform,
										$temp$styles = styles,
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 'Fill':
									var portion = width.a;
									if (portion === 1) {
										var $temp$classes = classes + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.widthFill),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$widthFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									} else {
										var $temp$classes = classes + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.widthFillPortion + (' width-fill-' + $elm$core$String$fromInt(portion)))),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$widthFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
											$temp$transform = transform,
											$temp$styles = A2(
											$elm$core$List$cons,
											A3(
												$mdgriffith$elm_ui$Internal$Model$Single,
												$mdgriffith$elm_ui$Internal$Style$classes.any + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.row + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
													'width-fill-' + $elm$core$String$fromInt(portion))))),
												'flex-grow',
												$elm$core$String$fromInt(portion * 100000)),
											styles),
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									}
								default:
									var _v4 = $mdgriffith$elm_ui$Internal$Model$renderWidth(width);
									var addToFlags = _v4.a;
									var newClass = _v4.b;
									var newStyles = _v4.c;
									var $temp$classes = classes + (' ' + newClass),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$merge,
										addToFlags,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
										$temp$transform = transform,
										$temp$styles = _Utils_ap(newStyles, styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
							}
						}
					case 'Height':
						var height = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$height, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							switch (height.$) {
								case 'Px':
									var px = height.a;
									var val = $elm$core$String$fromInt(px) + 'px';
									var name = 'height-px-' + val;
									var $temp$classes = $mdgriffith$elm_ui$Internal$Style$classes.heightExact + (' ' + (name + (' ' + classes))),
										$temp$node = node,
										$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has),
										$temp$transform = transform,
										$temp$styles = A2(
										$elm$core$List$cons,
										A3($mdgriffith$elm_ui$Internal$Model$Single, name, 'height ', val),
										styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 'Content':
									var $temp$classes = $mdgriffith$elm_ui$Internal$Style$classes.heightContent + (' ' + classes),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$add,
										$mdgriffith$elm_ui$Internal$Flag$heightContent,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
										$temp$transform = transform,
										$temp$styles = styles,
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 'Fill':
									var portion = height.a;
									if (portion === 1) {
										var $temp$classes = $mdgriffith$elm_ui$Internal$Style$classes.heightFill + (' ' + classes),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$heightFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									} else {
										var $temp$classes = classes + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.heightFillPortion + (' height-fill-' + $elm$core$String$fromInt(portion)))),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$heightFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
											$temp$transform = transform,
											$temp$styles = A2(
											$elm$core$List$cons,
											A3(
												$mdgriffith$elm_ui$Internal$Model$Single,
												$mdgriffith$elm_ui$Internal$Style$classes.any + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.column + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
													'height-fill-' + $elm$core$String$fromInt(portion))))),
												'flex-grow',
												$elm$core$String$fromInt(portion * 100000)),
											styles),
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									}
								default:
									var _v6 = $mdgriffith$elm_ui$Internal$Model$renderHeight(height);
									var addToFlags = _v6.a;
									var newClass = _v6.b;
									var newStyles = _v6.c;
									var $temp$classes = classes + (' ' + newClass),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$merge,
										addToFlags,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
										$temp$transform = transform,
										$temp$styles = _Utils_ap(newStyles, styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
							}
						}
					case 'Describe':
						var description = attribute.a;
						switch (description.$) {
							case 'Main':
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'main', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 'Navigation':
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'nav', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 'ContentInfo':
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'footer', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 'Complementary':
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'aside', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 'Heading':
								var i = description.a;
								if (i <= 1) {
									var $temp$classes = classes,
										$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'h1', node),
										$temp$has = has,
										$temp$transform = transform,
										$temp$styles = styles,
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								} else {
									if (i < 7) {
										var $temp$classes = classes,
											$temp$node = A2(
											$mdgriffith$elm_ui$Internal$Model$addNodeName,
											'h' + $elm$core$String$fromInt(i),
											node),
											$temp$has = has,
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									} else {
										var $temp$classes = classes,
											$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'h6', node),
											$temp$has = has,
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									}
								}
							case 'Paragraph':
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 'Button':
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'role', 'button'),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 'Label':
								var label = description.a;
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'aria-label', label),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 'LivePolite':
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'aria-live', 'polite'),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							default:
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'aria-live', 'assertive'),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
						}
					case 'Nearby':
						var location = attribute.a;
						var elem = attribute.b;
						var newStyles = function () {
							switch (elem.$) {
								case 'Empty':
									return styles;
								case 'Text':
									var str = elem.a;
									return styles;
								case 'Unstyled':
									var html = elem.a;
									return styles;
								default:
									var styled = elem.a;
									return _Utils_ap(styles, styled.styles);
							}
						}();
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = has,
							$temp$transform = transform,
							$temp$styles = newStyles,
							$temp$attrs = attrs,
							$temp$children = A3($mdgriffith$elm_ui$Internal$Model$addNearbyElement, location, elem, children),
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 'AlignX':
						var x = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$xAlign, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							var $temp$classes = $mdgriffith$elm_ui$Internal$Model$alignXName(x) + (' ' + classes),
								$temp$node = node,
								$temp$has = function (flags) {
								switch (x.$) {
									case 'CenterX':
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$centerX, flags);
									case 'Right':
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$alignRight, flags);
									default:
										return flags;
								}
							}(
								A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$xAlign, has)),
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						}
					default:
						var y = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$yAlign, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							var $temp$classes = $mdgriffith$elm_ui$Internal$Model$alignYName(y) + (' ' + classes),
								$temp$node = node,
								$temp$has = function (flags) {
								switch (y.$) {
									case 'CenterY':
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$centerY, flags);
									case 'Bottom':
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$alignBottom, flags);
									default:
										return flags;
								}
							}(
								A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$yAlign, has)),
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						}
				}
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$Untransformed = {$: 'Untransformed'};
var $mdgriffith$elm_ui$Internal$Model$untransformed = $mdgriffith$elm_ui$Internal$Model$Untransformed;
var $mdgriffith$elm_ui$Internal$Model$element = F4(
	function (context, node, attributes, children) {
		return A3(
			$mdgriffith$elm_ui$Internal$Model$createElement,
			context,
			children,
			A8(
				$mdgriffith$elm_ui$Internal$Model$gatherAttrRecursive,
				$mdgriffith$elm_ui$Internal$Model$contextClasses(context),
				node,
				$mdgriffith$elm_ui$Internal$Flag$none,
				$mdgriffith$elm_ui$Internal$Model$untransformed,
				_List_Nil,
				_List_Nil,
				$mdgriffith$elm_ui$Internal$Model$NoNearbyChildren,
				$elm$core$List$reverse(attributes)));
	});
var $mdgriffith$elm_ui$Internal$Model$AllowHover = {$: 'AllowHover'};
var $mdgriffith$elm_ui$Internal$Model$Layout = {$: 'Layout'};
var $mdgriffith$elm_ui$Internal$Model$Rgba = F4(
	function (a, b, c, d) {
		return {$: 'Rgba', a: a, b: b, c: c, d: d};
	});
var $mdgriffith$elm_ui$Internal$Model$focusDefaultStyle = {
	backgroundColor: $elm$core$Maybe$Nothing,
	borderColor: $elm$core$Maybe$Nothing,
	shadow: $elm$core$Maybe$Just(
		{
			blur: 0,
			color: A4($mdgriffith$elm_ui$Internal$Model$Rgba, 155 / 255, 203 / 255, 1, 1),
			offset: _Utils_Tuple2(0, 0),
			size: 3
		})
};
var $mdgriffith$elm_ui$Internal$Model$optionsToRecord = function (options) {
	var combine = F2(
		function (opt, record) {
			switch (opt.$) {
				case 'HoverOption':
					var hoverable = opt.a;
					var _v4 = record.hover;
					if (_v4.$ === 'Nothing') {
						return _Utils_update(
							record,
							{
								hover: $elm$core$Maybe$Just(hoverable)
							});
					} else {
						return record;
					}
				case 'FocusStyleOption':
					var focusStyle = opt.a;
					var _v5 = record.focus;
					if (_v5.$ === 'Nothing') {
						return _Utils_update(
							record,
							{
								focus: $elm$core$Maybe$Just(focusStyle)
							});
					} else {
						return record;
					}
				default:
					var renderMode = opt.a;
					var _v6 = record.mode;
					if (_v6.$ === 'Nothing') {
						return _Utils_update(
							record,
							{
								mode: $elm$core$Maybe$Just(renderMode)
							});
					} else {
						return record;
					}
			}
		});
	var andFinally = function (record) {
		return {
			focus: function () {
				var _v0 = record.focus;
				if (_v0.$ === 'Nothing') {
					return $mdgriffith$elm_ui$Internal$Model$focusDefaultStyle;
				} else {
					var focusable = _v0.a;
					return focusable;
				}
			}(),
			hover: function () {
				var _v1 = record.hover;
				if (_v1.$ === 'Nothing') {
					return $mdgriffith$elm_ui$Internal$Model$AllowHover;
				} else {
					var hoverable = _v1.a;
					return hoverable;
				}
			}(),
			mode: function () {
				var _v2 = record.mode;
				if (_v2.$ === 'Nothing') {
					return $mdgriffith$elm_ui$Internal$Model$Layout;
				} else {
					var actualMode = _v2.a;
					return actualMode;
				}
			}()
		};
	};
	return andFinally(
		A3(
			$elm$core$List$foldr,
			combine,
			{focus: $elm$core$Maybe$Nothing, hover: $elm$core$Maybe$Nothing, mode: $elm$core$Maybe$Nothing},
			options));
};
var $mdgriffith$elm_ui$Internal$Model$toHtml = F2(
	function (mode, el) {
		switch (el.$) {
			case 'Unstyled':
				var html = el.a;
				return html($mdgriffith$elm_ui$Internal$Model$asEl);
			case 'Styled':
				var styles = el.a.styles;
				var html = el.a.html;
				return A2(
					html,
					mode(styles),
					$mdgriffith$elm_ui$Internal$Model$asEl);
			case 'Text':
				var text = el.a;
				return $mdgriffith$elm_ui$Internal$Model$textElement(text);
			default:
				return $mdgriffith$elm_ui$Internal$Model$textElement('');
		}
	});
var $mdgriffith$elm_ui$Internal$Model$renderRoot = F3(
	function (optionList, attributes, child) {
		var options = $mdgriffith$elm_ui$Internal$Model$optionsToRecord(optionList);
		var embedStyle = function () {
			var _v0 = options.mode;
			if (_v0.$ === 'NoStaticStyleSheet') {
				return $mdgriffith$elm_ui$Internal$Model$OnlyDynamic(options);
			} else {
				return $mdgriffith$elm_ui$Internal$Model$StaticRootAndDynamic(options);
			}
		}();
		return A2(
			$mdgriffith$elm_ui$Internal$Model$toHtml,
			embedStyle,
			A4(
				$mdgriffith$elm_ui$Internal$Model$element,
				$mdgriffith$elm_ui$Internal$Model$asEl,
				$mdgriffith$elm_ui$Internal$Model$div,
				attributes,
				$mdgriffith$elm_ui$Internal$Model$Unkeyed(
					_List_fromArray(
						[child]))));
	});
var $mdgriffith$elm_ui$Internal$Model$FontSize = function (a) {
	return {$: 'FontSize', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$SansSerif = {$: 'SansSerif'};
var $mdgriffith$elm_ui$Internal$Model$Typeface = function (a) {
	return {$: 'Typeface', a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$fontColor = $mdgriffith$elm_ui$Internal$Flag$flag(14);
var $mdgriffith$elm_ui$Internal$Flag$fontSize = $mdgriffith$elm_ui$Internal$Flag$flag(4);
var $mdgriffith$elm_ui$Internal$Model$rootStyle = function () {
	var families = _List_fromArray(
		[
			$mdgriffith$elm_ui$Internal$Model$Typeface('Open Sans'),
			$mdgriffith$elm_ui$Internal$Model$Typeface('Helvetica'),
			$mdgriffith$elm_ui$Internal$Model$Typeface('Verdana'),
			$mdgriffith$elm_ui$Internal$Model$SansSerif
		]);
	return _List_fromArray(
		[
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$bgColor,
			A3(
				$mdgriffith$elm_ui$Internal$Model$Colored,
				'bg-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(
					A4($mdgriffith$elm_ui$Internal$Model$Rgba, 1, 1, 1, 0)),
				'background-color',
				A4($mdgriffith$elm_ui$Internal$Model$Rgba, 1, 1, 1, 0))),
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$fontColor,
			A3(
				$mdgriffith$elm_ui$Internal$Model$Colored,
				'fc-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(
					A4($mdgriffith$elm_ui$Internal$Model$Rgba, 0, 0, 0, 1)),
				'color',
				A4($mdgriffith$elm_ui$Internal$Model$Rgba, 0, 0, 0, 1))),
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$fontSize,
			$mdgriffith$elm_ui$Internal$Model$FontSize(20)),
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$fontFamily,
			A2(
				$mdgriffith$elm_ui$Internal$Model$FontFamily,
				A3($elm$core$List$foldl, $mdgriffith$elm_ui$Internal$Model$renderFontClassName, 'font-', families),
				families))
		]);
}();
var $mdgriffith$elm_ui$Element$layoutWith = F3(
	function (_v0, attrs, child) {
		var options = _v0.options;
		return A3(
			$mdgriffith$elm_ui$Internal$Model$renderRoot,
			options,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$htmlClass(
					A2(
						$elm$core$String$join,
						' ',
						_List_fromArray(
							[$mdgriffith$elm_ui$Internal$Style$classes.root, $mdgriffith$elm_ui$Internal$Style$classes.any, $mdgriffith$elm_ui$Internal$Style$classes.single]))),
				_Utils_ap($mdgriffith$elm_ui$Internal$Model$rootStyle, attrs)),
			child);
	});
var $mdgriffith$elm_ui$Element$layout = $mdgriffith$elm_ui$Element$layoutWith(
	{options: _List_Nil});
var $mdgriffith$elm_ui$Internal$Model$PaddingStyle = F5(
	function (a, b, c, d, e) {
		return {$: 'PaddingStyle', a: a, b: b, c: c, d: d, e: e};
	});
var $mdgriffith$elm_ui$Internal$Flag$padding = $mdgriffith$elm_ui$Internal$Flag$flag(2);
var $mdgriffith$elm_ui$Element$padding = function (x) {
	var f = x;
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$padding,
		A5(
			$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
			'p-' + $elm$core$String$fromInt(x),
			f,
			f,
			f,
			f));
};
var $mdgriffith$elm_ui$Internal$Model$Serif = {$: 'Serif'};
var $mdgriffith$elm_ui$Element$Font$serif = $mdgriffith$elm_ui$Internal$Model$Serif;
var $mdgriffith$elm_ui$Internal$Model$Empty = {$: 'Empty'};
var $mdgriffith$elm_ui$Element$none = $mdgriffith$elm_ui$Internal$Model$Empty;
var $mdgriffith$elm_ui$Element$Font$color = function (fontColor) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$fontColor,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Colored,
			'fc-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(fontColor),
			'color',
			fontColor));
};
var $mdgriffith$elm_ui$Internal$Model$AsColumn = {$: 'AsColumn'};
var $mdgriffith$elm_ui$Internal$Model$asColumn = $mdgriffith$elm_ui$Internal$Model$AsColumn;
var $mdgriffith$elm_ui$Internal$Model$Height = function (a) {
	return {$: 'Height', a: a};
};
var $mdgriffith$elm_ui$Element$height = $mdgriffith$elm_ui$Internal$Model$Height;
var $mdgriffith$elm_ui$Internal$Model$Content = {$: 'Content'};
var $mdgriffith$elm_ui$Element$shrink = $mdgriffith$elm_ui$Internal$Model$Content;
var $mdgriffith$elm_ui$Internal$Model$Width = function (a) {
	return {$: 'Width', a: a};
};
var $mdgriffith$elm_ui$Element$width = $mdgriffith$elm_ui$Internal$Model$Width;
var $mdgriffith$elm_ui$Element$column = F2(
	function (attrs, children) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asColumn,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.contentTop + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.contentLeft)),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
						attrs))),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
	});
var $mdgriffith$elm_ui$Element$rgb255 = F3(
	function (red, green, blue) {
		return A4($mdgriffith$elm_ui$Internal$Model$Rgba, red / 255, green / 255, blue / 255, 1);
	});
var $author$project$Main$darkBrown = A3($mdgriffith$elm_ui$Element$rgb255, 34, 19, 16);
var $mdgriffith$elm_ui$Internal$Model$Monospace = {$: 'Monospace'};
var $mdgriffith$elm_ui$Element$Font$monospace = $mdgriffith$elm_ui$Internal$Model$Monospace;
var $author$project$Main$mustard = A3($mdgriffith$elm_ui$Element$rgb255, 185, 119, 32);
var $mdgriffith$elm_ui$Internal$Model$Describe = function (a) {
	return {$: 'Describe', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$Paragraph = {$: 'Paragraph'};
var $mdgriffith$elm_ui$Internal$Model$SpacingStyle = F3(
	function (a, b, c) {
		return {$: 'SpacingStyle', a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Internal$Flag$spacing = $mdgriffith$elm_ui$Internal$Flag$flag(3);
var $mdgriffith$elm_ui$Internal$Model$spacingName = F2(
	function (x, y) {
		return 'spacing-' + ($elm$core$String$fromInt(x) + ('-' + $elm$core$String$fromInt(y)));
	});
var $mdgriffith$elm_ui$Element$spacing = function (x) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$spacing,
		A3(
			$mdgriffith$elm_ui$Internal$Model$SpacingStyle,
			A2($mdgriffith$elm_ui$Internal$Model$spacingName, x, x),
			x,
			x));
};
var $mdgriffith$elm_ui$Element$paragraph = F2(
	function (attrs, children) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asParagraph,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$Describe($mdgriffith$elm_ui$Internal$Model$Paragraph),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$spacing(5),
						attrs))),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
	});
var $mdgriffith$elm_ui$Element$Font$size = function (i) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$fontSize,
		$mdgriffith$elm_ui$Internal$Model$FontSize(i));
};
var $mdgriffith$elm_ui$Internal$Model$Text = function (a) {
	return {$: 'Text', a: a};
};
var $mdgriffith$elm_ui$Element$text = function (content) {
	return $mdgriffith$elm_ui$Internal$Model$Text(content);
};
var $author$project$Main$viewFatalError = function (err) {
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$spacing(20)
			]),
		_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Element$paragraph,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$Font$size(40),
						$mdgriffith$elm_ui$Element$Font$color($author$project$Main$darkBrown)
					]),
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$text('Sorry, something went wrong')
					])),
				A2(
				$mdgriffith$elm_ui$Element$paragraph,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$Font$size(20),
						$mdgriffith$elm_ui$Element$Font$color($author$project$Main$darkBrown)
					]),
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$text('It\'s not your fault. It\'s because of a mistake in the code.')
					])),
				A2(
				$mdgriffith$elm_ui$Element$paragraph,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$Font$size(20),
						$mdgriffith$elm_ui$Element$Font$family(
						_List_fromArray(
							[$mdgriffith$elm_ui$Element$Font$monospace])),
						$mdgriffith$elm_ui$Element$Font$color($author$project$Main$mustard)
					]),
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$text(err)
					]))
			]));
};
var $author$project$Main$BodyWeightBox = function (a) {
	return {$: 'BodyWeightBox', a: a};
};
var $author$project$Main$SubmitBodyWeight = {$: 'SubmitBodyWeight'};
var $mdgriffith$elm_ui$Element$el = F2(
	function (attrs, child) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asEl,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
					attrs)),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(
				_List_fromArray(
					[child])));
	});
var $author$project$Main$yellow = A3($mdgriffith$elm_ui$Element$rgb255, 255, 176, 63);
var $author$project$Main$boxErr = F2(
	function (contents, f) {
		if (contents === '') {
			return $mdgriffith$elm_ui$Element$none;
		} else {
			var _v0 = f(contents);
			if (_v0.$ === 'Err') {
				var err = _v0.a;
				return A2(
					$mdgriffith$elm_ui$Element$el,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$Background$color($author$project$Main$yellow)
						]),
					$mdgriffith$elm_ui$Element$text(err));
			} else {
				return $mdgriffith$elm_ui$Element$none;
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$Button = {$: 'Button'};
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$disabled = $elm$html$Html$Attributes$boolProperty('disabled');
var $mdgriffith$elm_ui$Element$Input$enter = 'Enter';
var $mdgriffith$elm_ui$Internal$Model$NoAttribute = {$: 'NoAttribute'};
var $mdgriffith$elm_ui$Element$Input$hasFocusStyle = function (attr) {
	if (((attr.$ === 'StyleClass') && (attr.b.$ === 'PseudoSelector')) && (attr.b.a.$ === 'Focus')) {
		var _v1 = attr.b;
		var _v2 = _v1.a;
		return true;
	} else {
		return false;
	}
};
var $mdgriffith$elm_ui$Element$Input$focusDefault = function (attrs) {
	return A2($elm$core$List$any, $mdgriffith$elm_ui$Element$Input$hasFocusStyle, attrs) ? $mdgriffith$elm_ui$Internal$Model$NoAttribute : $mdgriffith$elm_ui$Internal$Model$htmlClass('focusable');
};
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $mdgriffith$elm_ui$Element$Events$onClick = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Attr, $elm$html$Html$Events$onClick);
var $elm$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
	return {$: 'MayPreventDefault', a: a};
};
var $elm$html$Html$Events$preventDefaultOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayPreventDefault(decoder));
	});
var $mdgriffith$elm_ui$Element$Input$onKeyLookup = function (lookup) {
	var decode = function (code) {
		var _v0 = lookup(code);
		if (_v0.$ === 'Nothing') {
			return $elm$json$Json$Decode$fail('No key matched');
		} else {
			var msg = _v0.a;
			return $elm$json$Json$Decode$succeed(msg);
		}
	};
	var isKey = A2(
		$elm$json$Json$Decode$andThen,
		decode,
		A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string));
	return $mdgriffith$elm_ui$Internal$Model$Attr(
		A2(
			$elm$html$Html$Events$preventDefaultOn,
			'keydown',
			A2(
				$elm$json$Json$Decode$map,
				function (fired) {
					return _Utils_Tuple2(fired, true);
				},
				isKey)));
};
var $mdgriffith$elm_ui$Internal$Model$Class = F2(
	function (a, b) {
		return {$: 'Class', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$cursor = $mdgriffith$elm_ui$Internal$Flag$flag(21);
var $mdgriffith$elm_ui$Element$pointer = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$cursor, $mdgriffith$elm_ui$Internal$Style$classes.cursorPointer);
var $mdgriffith$elm_ui$Element$Input$space = ' ';
var $elm$html$Html$Attributes$tabindex = function (n) {
	return A2(
		_VirtualDom_attribute,
		'tabIndex',
		$elm$core$String$fromInt(n));
};
var $mdgriffith$elm_ui$Element$Input$button = F2(
	function (attrs, _v0) {
		var onPress = _v0.onPress;
		var label = _v0.label;
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asEl,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.contentCenterX + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.contentCenterY + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.seButton + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.noTextSelection)))))),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Element$pointer,
							A2(
								$elm$core$List$cons,
								$mdgriffith$elm_ui$Element$Input$focusDefault(attrs),
								A2(
									$elm$core$List$cons,
									$mdgriffith$elm_ui$Internal$Model$Describe($mdgriffith$elm_ui$Internal$Model$Button),
									A2(
										$elm$core$List$cons,
										$mdgriffith$elm_ui$Internal$Model$Attr(
											$elm$html$Html$Attributes$tabindex(0)),
										function () {
											if (onPress.$ === 'Nothing') {
												return A2(
													$elm$core$List$cons,
													$mdgriffith$elm_ui$Internal$Model$Attr(
														$elm$html$Html$Attributes$disabled(true)),
													attrs);
											} else {
												var msg = onPress.a;
												return A2(
													$elm$core$List$cons,
													$mdgriffith$elm_ui$Element$Events$onClick(msg),
													A2(
														$elm$core$List$cons,
														$mdgriffith$elm_ui$Element$Input$onKeyLookup(
															function (code) {
																return _Utils_eq(code, $mdgriffith$elm_ui$Element$Input$enter) ? $elm$core$Maybe$Just(msg) : (_Utils_eq(code, $mdgriffith$elm_ui$Element$Input$space) ? $elm$core$Maybe$Just(msg) : $elm$core$Maybe$Nothing);
															}),
														attrs));
											}
										}()))))))),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(
				_List_fromArray(
					[label])));
	});
var $mdgriffith$elm_ui$Element$Input$Label = F3(
	function (a, b, c) {
		return {$: 'Label', a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Element$Input$OnLeft = {$: 'OnLeft'};
var $mdgriffith$elm_ui$Element$Input$labelLeft = $mdgriffith$elm_ui$Element$Input$Label($mdgriffith$elm_ui$Element$Input$OnLeft);
var $mdgriffith$elm_ui$Internal$Model$Px = function (a) {
	return {$: 'Px', a: a};
};
var $mdgriffith$elm_ui$Element$px = $mdgriffith$elm_ui$Internal$Model$Px;
var $elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var $mdgriffith$elm_ui$Internal$Flag$borderColor = $mdgriffith$elm_ui$Internal$Flag$flag(28);
var $mdgriffith$elm_ui$Element$Border$color = function (clr) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$borderColor,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Colored,
			'bc-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(clr),
			'border-color',
			clr));
};
var $mdgriffith$elm_ui$Internal$Model$Hover = {$: 'Hover'};
var $mdgriffith$elm_ui$Internal$Model$PseudoSelector = F2(
	function (a, b) {
		return {$: 'PseudoSelector', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$hover = $mdgriffith$elm_ui$Internal$Flag$flag(33);
var $mdgriffith$elm_ui$Internal$Model$AlignX = function (a) {
	return {$: 'AlignX', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$AlignY = function (a) {
	return {$: 'AlignY', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$Nearby = F2(
	function (a, b) {
		return {$: 'Nearby', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$TransformComponent = F2(
	function (a, b) {
		return {$: 'TransformComponent', a: a, b: b};
	});
var $elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var $mdgriffith$elm_ui$Internal$Model$map = F2(
	function (fn, el) {
		switch (el.$) {
			case 'Styled':
				var styled = el.a;
				return $mdgriffith$elm_ui$Internal$Model$Styled(
					{
						html: F2(
							function (add, context) {
								return A2(
									$elm$virtual_dom$VirtualDom$map,
									fn,
									A2(styled.html, add, context));
							}),
						styles: styled.styles
					});
			case 'Unstyled':
				var html = el.a;
				return $mdgriffith$elm_ui$Internal$Model$Unstyled(
					A2(
						$elm$core$Basics$composeL,
						$elm$virtual_dom$VirtualDom$map(fn),
						html));
			case 'Text':
				var str = el.a;
				return $mdgriffith$elm_ui$Internal$Model$Text(str);
			default:
				return $mdgriffith$elm_ui$Internal$Model$Empty;
		}
	});
var $elm$virtual_dom$VirtualDom$mapAttribute = _VirtualDom_mapAttribute;
var $mdgriffith$elm_ui$Internal$Model$mapAttrFromStyle = F2(
	function (fn, attr) {
		switch (attr.$) {
			case 'NoAttribute':
				return $mdgriffith$elm_ui$Internal$Model$NoAttribute;
			case 'Describe':
				var description = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$Describe(description);
			case 'AlignX':
				var x = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$AlignX(x);
			case 'AlignY':
				var y = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$AlignY(y);
			case 'Width':
				var x = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$Width(x);
			case 'Height':
				var x = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$Height(x);
			case 'Class':
				var x = attr.a;
				var y = attr.b;
				return A2($mdgriffith$elm_ui$Internal$Model$Class, x, y);
			case 'StyleClass':
				var flag = attr.a;
				var style = attr.b;
				return A2($mdgriffith$elm_ui$Internal$Model$StyleClass, flag, style);
			case 'Nearby':
				var location = attr.a;
				var elem = attr.b;
				return A2(
					$mdgriffith$elm_ui$Internal$Model$Nearby,
					location,
					A2($mdgriffith$elm_ui$Internal$Model$map, fn, elem));
			case 'Attr':
				var htmlAttr = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$Attr(
					A2($elm$virtual_dom$VirtualDom$mapAttribute, fn, htmlAttr));
			default:
				var fl = attr.a;
				var trans = attr.b;
				return A2($mdgriffith$elm_ui$Internal$Model$TransformComponent, fl, trans);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$removeNever = function (style) {
	return A2($mdgriffith$elm_ui$Internal$Model$mapAttrFromStyle, $elm$core$Basics$never, style);
};
var $mdgriffith$elm_ui$Internal$Model$unwrapDecsHelper = F2(
	function (attr, _v0) {
		var styles = _v0.a;
		var trans = _v0.b;
		var _v1 = $mdgriffith$elm_ui$Internal$Model$removeNever(attr);
		switch (_v1.$) {
			case 'StyleClass':
				var style = _v1.b;
				return _Utils_Tuple2(
					A2($elm$core$List$cons, style, styles),
					trans);
			case 'TransformComponent':
				var flag = _v1.a;
				var component = _v1.b;
				return _Utils_Tuple2(
					styles,
					A2($mdgriffith$elm_ui$Internal$Model$composeTransformation, trans, component));
			default:
				return _Utils_Tuple2(styles, trans);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$unwrapDecorations = function (attrs) {
	var _v0 = A3(
		$elm$core$List$foldl,
		$mdgriffith$elm_ui$Internal$Model$unwrapDecsHelper,
		_Utils_Tuple2(_List_Nil, $mdgriffith$elm_ui$Internal$Model$Untransformed),
		attrs);
	var styles = _v0.a;
	var transform = _v0.b;
	return A2(
		$elm$core$List$cons,
		$mdgriffith$elm_ui$Internal$Model$Transform(transform),
		styles);
};
var $mdgriffith$elm_ui$Element$mouseOver = function (decs) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$hover,
		A2(
			$mdgriffith$elm_ui$Internal$Model$PseudoSelector,
			$mdgriffith$elm_ui$Internal$Model$Hover,
			$mdgriffith$elm_ui$Internal$Model$unwrapDecorations(decs)));
};
var $mdgriffith$elm_ui$Internal$Flag$borderRound = $mdgriffith$elm_ui$Internal$Flag$flag(17);
var $mdgriffith$elm_ui$Element$Border$rounded = function (radius) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$borderRound,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Single,
			'br-' + $elm$core$String$fromInt(radius),
			'border-radius',
			$elm$core$String$fromInt(radius) + 'px'));
};
var $mdgriffith$elm_ui$Internal$Flag$borderStyle = $mdgriffith$elm_ui$Internal$Flag$flag(11);
var $mdgriffith$elm_ui$Element$Border$solid = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$borderStyle, $mdgriffith$elm_ui$Internal$Style$classes.borderSolid);
var $author$project$Main$whiteHover = A3($mdgriffith$elm_ui$Element$rgb255, 234, 233, 228);
var $mdgriffith$elm_ui$Internal$Model$BorderWidth = F5(
	function (a, b, c, d, e) {
		return {$: 'BorderWidth', a: a, b: b, c: c, d: d, e: e};
	});
var $mdgriffith$elm_ui$Element$Border$width = function (v) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$borderWidth,
		A5(
			$mdgriffith$elm_ui$Internal$Model$BorderWidth,
			'b-' + $elm$core$String$fromInt(v),
			v,
			v,
			v,
			v));
};
var $author$project$Main$submitButtonStyle = _List_fromArray(
	[
		$mdgriffith$elm_ui$Element$padding(15),
		$mdgriffith$elm_ui$Element$mouseOver(
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$Background$color($author$project$Main$whiteHover)
			])),
		$mdgriffith$elm_ui$Element$Border$solid,
		$mdgriffith$elm_ui$Element$Border$width(1),
		$mdgriffith$elm_ui$Element$Border$color($author$project$Main$darkBrown),
		$mdgriffith$elm_ui$Element$Border$rounded(3)
	]);
var $mdgriffith$elm_ui$Element$Input$TextInputNode = function (a) {
	return {$: 'TextInputNode', a: a};
};
var $mdgriffith$elm_ui$Element$Input$TextArea = {$: 'TextArea'};
var $mdgriffith$elm_ui$Internal$Model$LivePolite = {$: 'LivePolite'};
var $mdgriffith$elm_ui$Element$Region$announce = $mdgriffith$elm_ui$Internal$Model$Describe($mdgriffith$elm_ui$Internal$Model$LivePolite);
var $mdgriffith$elm_ui$Internal$Model$AsRow = {$: 'AsRow'};
var $mdgriffith$elm_ui$Internal$Model$asRow = $mdgriffith$elm_ui$Internal$Model$AsRow;
var $mdgriffith$elm_ui$Element$Input$applyLabel = F3(
	function (attrs, label, input) {
		if (label.$ === 'HiddenLabel') {
			var labelText = label.a;
			return A4(
				$mdgriffith$elm_ui$Internal$Model$element,
				$mdgriffith$elm_ui$Internal$Model$asColumn,
				$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
				attrs,
				$mdgriffith$elm_ui$Internal$Model$Unkeyed(
					_List_fromArray(
						[input])));
		} else {
			var position = label.a;
			var labelAttrs = label.b;
			var labelChild = label.c;
			var labelElement = A4(
				$mdgriffith$elm_ui$Internal$Model$element,
				$mdgriffith$elm_ui$Internal$Model$asEl,
				$mdgriffith$elm_ui$Internal$Model$div,
				labelAttrs,
				$mdgriffith$elm_ui$Internal$Model$Unkeyed(
					_List_fromArray(
						[labelChild])));
			switch (position.$) {
				case 'Above':
					return A4(
						$mdgriffith$elm_ui$Internal$Model$element,
						$mdgriffith$elm_ui$Internal$Model$asColumn,
						$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.inputLabel),
							attrs),
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							_List_fromArray(
								[labelElement, input])));
				case 'Below':
					return A4(
						$mdgriffith$elm_ui$Internal$Model$element,
						$mdgriffith$elm_ui$Internal$Model$asColumn,
						$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.inputLabel),
							attrs),
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							_List_fromArray(
								[input, labelElement])));
				case 'OnRight':
					return A4(
						$mdgriffith$elm_ui$Internal$Model$element,
						$mdgriffith$elm_ui$Internal$Model$asRow,
						$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.inputLabel),
							attrs),
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							_List_fromArray(
								[input, labelElement])));
				default:
					return A4(
						$mdgriffith$elm_ui$Internal$Model$element,
						$mdgriffith$elm_ui$Internal$Model$asRow,
						$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.inputLabel),
							attrs),
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							_List_fromArray(
								[labelElement, input])));
			}
		}
	});
var $elm$html$Html$Attributes$attribute = $elm$virtual_dom$VirtualDom$attribute;
var $mdgriffith$elm_ui$Element$Input$autofill = A2(
	$elm$core$Basics$composeL,
	$mdgriffith$elm_ui$Internal$Model$Attr,
	$elm$html$Html$Attributes$attribute('autocomplete'));
var $mdgriffith$elm_ui$Internal$Model$Behind = {$: 'Behind'};
var $mdgriffith$elm_ui$Element$createNearby = F2(
	function (loc, element) {
		if (element.$ === 'Empty') {
			return $mdgriffith$elm_ui$Internal$Model$NoAttribute;
		} else {
			return A2($mdgriffith$elm_ui$Internal$Model$Nearby, loc, element);
		}
	});
var $mdgriffith$elm_ui$Element$behindContent = function (element) {
	return A2($mdgriffith$elm_ui$Element$createNearby, $mdgriffith$elm_ui$Internal$Model$Behind, element);
};
var $mdgriffith$elm_ui$Internal$Model$MoveY = function (a) {
	return {$: 'MoveY', a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$moveY = $mdgriffith$elm_ui$Internal$Flag$flag(26);
var $mdgriffith$elm_ui$Element$moveUp = function (y) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$TransformComponent,
		$mdgriffith$elm_ui$Internal$Flag$moveY,
		$mdgriffith$elm_ui$Internal$Model$MoveY(-y));
};
var $mdgriffith$elm_ui$Element$Input$calcMoveToCompensateForPadding = function (attrs) {
	var gatherSpacing = F2(
		function (attr, found) {
			if ((attr.$ === 'StyleClass') && (attr.b.$ === 'SpacingStyle')) {
				var _v2 = attr.b;
				var x = _v2.b;
				var y = _v2.c;
				if (found.$ === 'Nothing') {
					return $elm$core$Maybe$Just(y);
				} else {
					return found;
				}
			} else {
				return found;
			}
		});
	var _v0 = A3($elm$core$List$foldr, gatherSpacing, $elm$core$Maybe$Nothing, attrs);
	if (_v0.$ === 'Nothing') {
		return $mdgriffith$elm_ui$Internal$Model$NoAttribute;
	} else {
		var vSpace = _v0.a;
		return $mdgriffith$elm_ui$Element$moveUp(
			$elm$core$Basics$floor(vSpace / 2));
	}
};
var $mdgriffith$elm_ui$Internal$Flag$overflow = $mdgriffith$elm_ui$Internal$Flag$flag(20);
var $mdgriffith$elm_ui$Element$clip = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$overflow, $mdgriffith$elm_ui$Internal$Style$classes.clip);
var $mdgriffith$elm_ui$Element$rgb = F3(
	function (r, g, b) {
		return A4($mdgriffith$elm_ui$Internal$Model$Rgba, r, g, b, 1);
	});
var $mdgriffith$elm_ui$Element$Input$darkGrey = A3($mdgriffith$elm_ui$Element$rgb, 186 / 255, 189 / 255, 182 / 255);
var $mdgriffith$elm_ui$Element$paddingXY = F2(
	function (x, y) {
		if (_Utils_eq(x, y)) {
			var f = x;
			return A2(
				$mdgriffith$elm_ui$Internal$Model$StyleClass,
				$mdgriffith$elm_ui$Internal$Flag$padding,
				A5(
					$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
					'p-' + $elm$core$String$fromInt(x),
					f,
					f,
					f,
					f));
		} else {
			var yFloat = y;
			var xFloat = x;
			return A2(
				$mdgriffith$elm_ui$Internal$Model$StyleClass,
				$mdgriffith$elm_ui$Internal$Flag$padding,
				A5(
					$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
					'p-' + ($elm$core$String$fromInt(x) + ('-' + $elm$core$String$fromInt(y))),
					yFloat,
					xFloat,
					yFloat,
					xFloat));
		}
	});
var $mdgriffith$elm_ui$Element$Input$defaultTextPadding = A2($mdgriffith$elm_ui$Element$paddingXY, 12, 12);
var $mdgriffith$elm_ui$Element$Input$white = A3($mdgriffith$elm_ui$Element$rgb, 1, 1, 1);
var $mdgriffith$elm_ui$Element$Input$defaultTextBoxStyle = _List_fromArray(
	[
		$mdgriffith$elm_ui$Element$Input$defaultTextPadding,
		$mdgriffith$elm_ui$Element$Border$rounded(3),
		$mdgriffith$elm_ui$Element$Border$color($mdgriffith$elm_ui$Element$Input$darkGrey),
		$mdgriffith$elm_ui$Element$Background$color($mdgriffith$elm_ui$Element$Input$white),
		$mdgriffith$elm_ui$Element$Border$width(1),
		$mdgriffith$elm_ui$Element$spacing(5),
		$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
		$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink)
	]);
var $mdgriffith$elm_ui$Element$Input$getHeight = function (attr) {
	if (attr.$ === 'Height') {
		var h = attr.a;
		return $elm$core$Maybe$Just(h);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $mdgriffith$elm_ui$Internal$Model$Label = function (a) {
	return {$: 'Label', a: a};
};
var $mdgriffith$elm_ui$Element$Input$hiddenLabelAttribute = function (label) {
	if (label.$ === 'HiddenLabel') {
		var textLabel = label.a;
		return $mdgriffith$elm_ui$Internal$Model$Describe(
			$mdgriffith$elm_ui$Internal$Model$Label(textLabel));
	} else {
		return $mdgriffith$elm_ui$Internal$Model$NoAttribute;
	}
};
var $mdgriffith$elm_ui$Internal$Model$InFront = {$: 'InFront'};
var $mdgriffith$elm_ui$Element$inFront = function (element) {
	return A2($mdgriffith$elm_ui$Element$createNearby, $mdgriffith$elm_ui$Internal$Model$InFront, element);
};
var $mdgriffith$elm_ui$Element$Input$isConstrained = function (len) {
	isConstrained:
	while (true) {
		switch (len.$) {
			case 'Content':
				return false;
			case 'Px':
				return true;
			case 'Fill':
				return true;
			case 'Min':
				var l = len.b;
				var $temp$len = l;
				len = $temp$len;
				continue isConstrained;
			default:
				var l = len.b;
				return true;
		}
	}
};
var $mdgriffith$elm_ui$Element$Input$isHiddenLabel = function (label) {
	if (label.$ === 'HiddenLabel') {
		return true;
	} else {
		return false;
	}
};
var $mdgriffith$elm_ui$Element$Input$isStacked = function (label) {
	if (label.$ === 'Label') {
		var loc = label.a;
		switch (loc.$) {
			case 'OnRight':
				return false;
			case 'OnLeft':
				return false;
			case 'Above':
				return true;
			default:
				return true;
		}
	} else {
		return true;
	}
};
var $mdgriffith$elm_ui$Element$Input$negateBox = function (box) {
	return {bottom: -box.bottom, left: -box.left, right: -box.right, top: -box.top};
};
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $mdgriffith$elm_ui$Internal$Model$paddingName = F4(
	function (top, right, bottom, left) {
		return 'pad-' + ($elm$core$String$fromInt(top) + ('-' + ($elm$core$String$fromInt(right) + ('-' + ($elm$core$String$fromInt(bottom) + ('-' + $elm$core$String$fromInt(left)))))));
	});
var $mdgriffith$elm_ui$Element$paddingEach = function (_v0) {
	var top = _v0.top;
	var right = _v0.right;
	var bottom = _v0.bottom;
	var left = _v0.left;
	if (_Utils_eq(top, right) && (_Utils_eq(top, bottom) && _Utils_eq(top, left))) {
		var topFloat = top;
		return A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$padding,
			A5(
				$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
				'p-' + $elm$core$String$fromInt(top),
				topFloat,
				topFloat,
				topFloat,
				topFloat));
	} else {
		return A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$padding,
			A5(
				$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
				A4($mdgriffith$elm_ui$Internal$Model$paddingName, top, right, bottom, left),
				top,
				right,
				bottom,
				left));
	}
};
var $mdgriffith$elm_ui$Element$htmlAttribute = $mdgriffith$elm_ui$Internal$Model$Attr;
var $mdgriffith$elm_ui$Element$Input$isFill = function (len) {
	isFill:
	while (true) {
		switch (len.$) {
			case 'Fill':
				return true;
			case 'Content':
				return false;
			case 'Px':
				return false;
			case 'Min':
				var l = len.b;
				var $temp$len = l;
				len = $temp$len;
				continue isFill;
			default:
				var l = len.b;
				var $temp$len = l;
				len = $temp$len;
				continue isFill;
		}
	}
};
var $mdgriffith$elm_ui$Element$Input$isPixel = function (len) {
	isPixel:
	while (true) {
		switch (len.$) {
			case 'Content':
				return false;
			case 'Px':
				return true;
			case 'Fill':
				return false;
			case 'Min':
				var l = len.b;
				var $temp$len = l;
				len = $temp$len;
				continue isPixel;
			default:
				var l = len.b;
				var $temp$len = l;
				len = $temp$len;
				continue isPixel;
		}
	}
};
var $mdgriffith$elm_ui$Internal$Model$paddingNameFloat = F4(
	function (top, right, bottom, left) {
		return 'pad-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(top) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(right) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(bottom) + ('-' + $mdgriffith$elm_ui$Internal$Model$floatClass(left)))))));
	});
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $mdgriffith$elm_ui$Element$Input$redistributeOver = F4(
	function (isMultiline, stacked, attr, els) {
		switch (attr.$) {
			case 'Nearby':
				return _Utils_update(
					els,
					{
						parent: A2($elm$core$List$cons, attr, els.parent)
					});
			case 'Width':
				var width = attr.a;
				return $mdgriffith$elm_ui$Element$Input$isFill(width) ? _Utils_update(
					els,
					{
						fullParent: A2($elm$core$List$cons, attr, els.fullParent),
						input: A2($elm$core$List$cons, attr, els.input),
						parent: A2($elm$core$List$cons, attr, els.parent)
					}) : (stacked ? _Utils_update(
					els,
					{
						fullParent: A2($elm$core$List$cons, attr, els.fullParent)
					}) : _Utils_update(
					els,
					{
						parent: A2($elm$core$List$cons, attr, els.parent)
					}));
			case 'Height':
				var height = attr.a;
				return (!stacked) ? _Utils_update(
					els,
					{
						fullParent: A2($elm$core$List$cons, attr, els.fullParent),
						parent: A2($elm$core$List$cons, attr, els.parent)
					}) : ($mdgriffith$elm_ui$Element$Input$isFill(height) ? _Utils_update(
					els,
					{
						fullParent: A2($elm$core$List$cons, attr, els.fullParent),
						parent: A2($elm$core$List$cons, attr, els.parent)
					}) : ($mdgriffith$elm_ui$Element$Input$isPixel(height) ? _Utils_update(
					els,
					{
						parent: A2($elm$core$List$cons, attr, els.parent)
					}) : _Utils_update(
					els,
					{
						parent: A2($elm$core$List$cons, attr, els.parent)
					})));
			case 'AlignX':
				return _Utils_update(
					els,
					{
						fullParent: A2($elm$core$List$cons, attr, els.fullParent)
					});
			case 'AlignY':
				return _Utils_update(
					els,
					{
						fullParent: A2($elm$core$List$cons, attr, els.fullParent)
					});
			case 'StyleClass':
				switch (attr.b.$) {
					case 'SpacingStyle':
						var _v1 = attr.b;
						return _Utils_update(
							els,
							{
								fullParent: A2($elm$core$List$cons, attr, els.fullParent),
								input: A2($elm$core$List$cons, attr, els.input),
								parent: A2($elm$core$List$cons, attr, els.parent),
								wrapper: A2($elm$core$List$cons, attr, els.wrapper)
							});
					case 'PaddingStyle':
						var cls = attr.a;
						var _v2 = attr.b;
						var pad = _v2.a;
						var t = _v2.b;
						var r = _v2.c;
						var b = _v2.d;
						var l = _v2.e;
						if (isMultiline) {
							return _Utils_update(
								els,
								{
									cover: A2($elm$core$List$cons, attr, els.cover),
									parent: A2($elm$core$List$cons, attr, els.parent)
								});
						} else {
							var newTop = t - A2($elm$core$Basics$min, t, b);
							var newLineHeight = $mdgriffith$elm_ui$Element$htmlAttribute(
								A2(
									$elm$html$Html$Attributes$style,
									'line-height',
									'calc(1.0em + ' + ($elm$core$String$fromFloat(
										2 * A2($elm$core$Basics$min, t, b)) + 'px)')));
							var newHeight = $mdgriffith$elm_ui$Element$htmlAttribute(
								A2(
									$elm$html$Html$Attributes$style,
									'height',
									'calc(1.0em + ' + ($elm$core$String$fromFloat(
										2 * A2($elm$core$Basics$min, t, b)) + 'px)')));
							var newBottom = b - A2($elm$core$Basics$min, t, b);
							var reducedVerticalPadding = A2(
								$mdgriffith$elm_ui$Internal$Model$StyleClass,
								$mdgriffith$elm_ui$Internal$Flag$padding,
								A5(
									$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
									A4($mdgriffith$elm_ui$Internal$Model$paddingNameFloat, newTop, r, newBottom, l),
									newTop,
									r,
									newBottom,
									l));
							return _Utils_update(
								els,
								{
									cover: A2($elm$core$List$cons, attr, els.cover),
									input: A2(
										$elm$core$List$cons,
										newHeight,
										A2($elm$core$List$cons, newLineHeight, els.input)),
									parent: A2($elm$core$List$cons, reducedVerticalPadding, els.parent)
								});
						}
					case 'BorderWidth':
						var _v3 = attr.b;
						return _Utils_update(
							els,
							{
								cover: A2($elm$core$List$cons, attr, els.cover),
								parent: A2($elm$core$List$cons, attr, els.parent)
							});
					case 'Transform':
						return _Utils_update(
							els,
							{
								cover: A2($elm$core$List$cons, attr, els.cover),
								parent: A2($elm$core$List$cons, attr, els.parent)
							});
					case 'FontSize':
						return _Utils_update(
							els,
							{
								fullParent: A2($elm$core$List$cons, attr, els.fullParent)
							});
					case 'FontFamily':
						var _v4 = attr.b;
						return _Utils_update(
							els,
							{
								fullParent: A2($elm$core$List$cons, attr, els.fullParent)
							});
					default:
						var flag = attr.a;
						var cls = attr.b;
						return _Utils_update(
							els,
							{
								parent: A2($elm$core$List$cons, attr, els.parent)
							});
				}
			case 'NoAttribute':
				return els;
			case 'Attr':
				var a = attr.a;
				return _Utils_update(
					els,
					{
						input: A2($elm$core$List$cons, attr, els.input)
					});
			case 'Describe':
				return _Utils_update(
					els,
					{
						input: A2($elm$core$List$cons, attr, els.input)
					});
			case 'Class':
				return _Utils_update(
					els,
					{
						parent: A2($elm$core$List$cons, attr, els.parent)
					});
			default:
				return _Utils_update(
					els,
					{
						input: A2($elm$core$List$cons, attr, els.input)
					});
		}
	});
var $mdgriffith$elm_ui$Element$Input$redistribute = F3(
	function (isMultiline, stacked, attrs) {
		return function (redist) {
			return {
				cover: $elm$core$List$reverse(redist.cover),
				fullParent: $elm$core$List$reverse(redist.fullParent),
				input: $elm$core$List$reverse(redist.input),
				parent: $elm$core$List$reverse(redist.parent),
				wrapper: $elm$core$List$reverse(redist.wrapper)
			};
		}(
			A3(
				$elm$core$List$foldl,
				A2($mdgriffith$elm_ui$Element$Input$redistributeOver, isMultiline, stacked),
				{cover: _List_Nil, fullParent: _List_Nil, input: _List_Nil, parent: _List_Nil, wrapper: _List_Nil},
				attrs));
	});
var $mdgriffith$elm_ui$Element$Input$renderBox = function (_v0) {
	var top = _v0.top;
	var right = _v0.right;
	var bottom = _v0.bottom;
	var left = _v0.left;
	return $elm$core$String$fromInt(top) + ('px ' + ($elm$core$String$fromInt(right) + ('px ' + ($elm$core$String$fromInt(bottom) + ('px ' + ($elm$core$String$fromInt(left) + 'px'))))));
};
var $mdgriffith$elm_ui$Internal$Model$Transparency = F2(
	function (a, b) {
		return {$: 'Transparency', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$transparency = $mdgriffith$elm_ui$Internal$Flag$flag(0);
var $mdgriffith$elm_ui$Element$alpha = function (o) {
	var transparency = function (x) {
		return 1 - x;
	}(
		A2(
			$elm$core$Basics$min,
			1.0,
			A2($elm$core$Basics$max, 0.0, o)));
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$transparency,
		A2(
			$mdgriffith$elm_ui$Internal$Model$Transparency,
			'transparency-' + $mdgriffith$elm_ui$Internal$Model$floatClass(transparency),
			transparency));
};
var $mdgriffith$elm_ui$Element$Input$charcoal = A3($mdgriffith$elm_ui$Element$rgb, 136 / 255, 138 / 255, 133 / 255);
var $mdgriffith$elm_ui$Element$rgba = $mdgriffith$elm_ui$Internal$Model$Rgba;
var $mdgriffith$elm_ui$Element$Input$renderPlaceholder = F3(
	function (_v0, forPlaceholder, on) {
		var placeholderAttrs = _v0.a;
		var placeholderEl = _v0.b;
		return A2(
			$mdgriffith$elm_ui$Element$el,
			_Utils_ap(
				forPlaceholder,
				_Utils_ap(
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$Font$color($mdgriffith$elm_ui$Element$Input$charcoal),
							$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.noTextSelection + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.passPointerEvents)),
							$mdgriffith$elm_ui$Element$clip,
							$mdgriffith$elm_ui$Element$Border$color(
							A4($mdgriffith$elm_ui$Element$rgba, 0, 0, 0, 0)),
							$mdgriffith$elm_ui$Element$Background$color(
							A4($mdgriffith$elm_ui$Element$rgba, 0, 0, 0, 0)),
							$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$alpha(
							on ? 1 : 0)
						]),
					placeholderAttrs)),
			placeholderEl);
	});
var $mdgriffith$elm_ui$Element$scrollbarY = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$overflow, $mdgriffith$elm_ui$Internal$Style$classes.scrollbarsY);
var $elm$html$Html$span = _VirtualDom_node('span');
var $elm$html$Html$Attributes$spellcheck = $elm$html$Html$Attributes$boolProperty('spellcheck');
var $mdgriffith$elm_ui$Element$Input$spellcheck = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Attr, $elm$html$Html$Attributes$spellcheck);
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $mdgriffith$elm_ui$Internal$Model$unstyled = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Unstyled, $elm$core$Basics$always);
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $mdgriffith$elm_ui$Element$Input$value = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Attr, $elm$html$Html$Attributes$value);
var $mdgriffith$elm_ui$Element$Input$textHelper = F3(
	function (textInput, attrs, textOptions) {
		var withDefaults = _Utils_ap($mdgriffith$elm_ui$Element$Input$defaultTextBoxStyle, attrs);
		var redistributed = A3(
			$mdgriffith$elm_ui$Element$Input$redistribute,
			_Utils_eq(textInput.type_, $mdgriffith$elm_ui$Element$Input$TextArea),
			$mdgriffith$elm_ui$Element$Input$isStacked(textOptions.label),
			withDefaults);
		var onlySpacing = function (attr) {
			if ((attr.$ === 'StyleClass') && (attr.b.$ === 'SpacingStyle')) {
				var _v9 = attr.b;
				return true;
			} else {
				return false;
			}
		};
		var heightConstrained = function () {
			var _v7 = textInput.type_;
			if (_v7.$ === 'TextInputNode') {
				var inputType = _v7.a;
				return false;
			} else {
				return A2(
					$elm$core$Maybe$withDefault,
					false,
					A2(
						$elm$core$Maybe$map,
						$mdgriffith$elm_ui$Element$Input$isConstrained,
						$elm$core$List$head(
							$elm$core$List$reverse(
								A2($elm$core$List$filterMap, $mdgriffith$elm_ui$Element$Input$getHeight, withDefaults)))));
			}
		}();
		var getPadding = function (attr) {
			if ((attr.$ === 'StyleClass') && (attr.b.$ === 'PaddingStyle')) {
				var cls = attr.a;
				var _v6 = attr.b;
				var pad = _v6.a;
				var t = _v6.b;
				var r = _v6.c;
				var b = _v6.d;
				var l = _v6.e;
				return $elm$core$Maybe$Just(
					{
						bottom: A2(
							$elm$core$Basics$max,
							0,
							$elm$core$Basics$floor(b - 3)),
						left: A2(
							$elm$core$Basics$max,
							0,
							$elm$core$Basics$floor(l - 3)),
						right: A2(
							$elm$core$Basics$max,
							0,
							$elm$core$Basics$floor(r - 3)),
						top: A2(
							$elm$core$Basics$max,
							0,
							$elm$core$Basics$floor(t - 3))
					});
			} else {
				return $elm$core$Maybe$Nothing;
			}
		};
		var parentPadding = A2(
			$elm$core$Maybe$withDefault,
			{bottom: 0, left: 0, right: 0, top: 0},
			$elm$core$List$head(
				$elm$core$List$reverse(
					A2($elm$core$List$filterMap, getPadding, withDefaults))));
		var inputElement = A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asEl,
			function () {
				var _v3 = textInput.type_;
				if (_v3.$ === 'TextInputNode') {
					var inputType = _v3.a;
					return $mdgriffith$elm_ui$Internal$Model$NodeName('input');
				} else {
					return $mdgriffith$elm_ui$Internal$Model$NodeName('textarea');
				}
			}(),
			_Utils_ap(
				function () {
					var _v4 = textInput.type_;
					if (_v4.$ === 'TextInputNode') {
						var inputType = _v4.a;
						return _List_fromArray(
							[
								$mdgriffith$elm_ui$Internal$Model$Attr(
								$elm$html$Html$Attributes$type_(inputType)),
								$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.inputText)
							]);
					} else {
						return _List_fromArray(
							[
								$mdgriffith$elm_ui$Element$clip,
								$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
								$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.inputMultiline),
								$mdgriffith$elm_ui$Element$Input$calcMoveToCompensateForPadding(withDefaults),
								$mdgriffith$elm_ui$Element$paddingEach(parentPadding),
								$mdgriffith$elm_ui$Internal$Model$Attr(
								A2(
									$elm$html$Html$Attributes$style,
									'margin',
									$mdgriffith$elm_ui$Element$Input$renderBox(
										$mdgriffith$elm_ui$Element$Input$negateBox(parentPadding)))),
								$mdgriffith$elm_ui$Internal$Model$Attr(
								A2($elm$html$Html$Attributes$style, 'box-sizing', 'content-box'))
							]);
					}
				}(),
				_Utils_ap(
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$Input$value(textOptions.text),
							$mdgriffith$elm_ui$Internal$Model$Attr(
							$elm$html$Html$Events$onInput(textOptions.onChange)),
							$mdgriffith$elm_ui$Element$Input$hiddenLabelAttribute(textOptions.label),
							$mdgriffith$elm_ui$Element$Input$spellcheck(textInput.spellchecked),
							A2(
							$elm$core$Maybe$withDefault,
							$mdgriffith$elm_ui$Internal$Model$NoAttribute,
							A2($elm$core$Maybe$map, $mdgriffith$elm_ui$Element$Input$autofill, textInput.autofill))
						]),
					redistributed.input)),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(_List_Nil));
		var wrappedInput = function () {
			var _v0 = textInput.type_;
			if (_v0.$ === 'TextArea') {
				return A4(
					$mdgriffith$elm_ui$Internal$Model$element,
					$mdgriffith$elm_ui$Internal$Model$asEl,
					$mdgriffith$elm_ui$Internal$Model$div,
					_Utils_ap(
						(heightConstrained ? $elm$core$List$cons($mdgriffith$elm_ui$Element$scrollbarY) : $elm$core$Basics$identity)(
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
									A2($elm$core$List$any, $mdgriffith$elm_ui$Element$Input$hasFocusStyle, withDefaults) ? $mdgriffith$elm_ui$Internal$Model$NoAttribute : $mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.focusedWithin),
									$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.inputMultilineWrapper)
								])),
						redistributed.parent),
					$mdgriffith$elm_ui$Internal$Model$Unkeyed(
						_List_fromArray(
							[
								A4(
								$mdgriffith$elm_ui$Internal$Model$element,
								$mdgriffith$elm_ui$Internal$Model$asParagraph,
								$mdgriffith$elm_ui$Internal$Model$div,
								A2(
									$elm$core$List$cons,
									$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
									A2(
										$elm$core$List$cons,
										$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
										A2(
											$elm$core$List$cons,
											$mdgriffith$elm_ui$Element$inFront(inputElement),
											A2(
												$elm$core$List$cons,
												$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.inputMultilineParent),
												redistributed.wrapper)))),
								$mdgriffith$elm_ui$Internal$Model$Unkeyed(
									function () {
										if (textOptions.text === '') {
											var _v1 = textOptions.placeholder;
											if (_v1.$ === 'Nothing') {
												return _List_fromArray(
													[
														$mdgriffith$elm_ui$Element$text('\u00A0')
													]);
											} else {
												var place = _v1.a;
												return _List_fromArray(
													[
														A3($mdgriffith$elm_ui$Element$Input$renderPlaceholder, place, _List_Nil, textOptions.text === '')
													]);
											}
										} else {
											return _List_fromArray(
												[
													$mdgriffith$elm_ui$Internal$Model$unstyled(
													A2(
														$elm$html$Html$span,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class($mdgriffith$elm_ui$Internal$Style$classes.inputMultilineFiller)
															]),
														_List_fromArray(
															[
																$elm$html$Html$text(textOptions.text + '\u00A0')
															])))
												]);
										}
									}()))
							])));
			} else {
				var inputType = _v0.a;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$element,
					$mdgriffith$elm_ui$Internal$Model$asEl,
					$mdgriffith$elm_ui$Internal$Model$div,
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
						A2(
							$elm$core$List$cons,
							A2($elm$core$List$any, $mdgriffith$elm_ui$Element$Input$hasFocusStyle, withDefaults) ? $mdgriffith$elm_ui$Internal$Model$NoAttribute : $mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.focusedWithin),
							$elm$core$List$concat(
								_List_fromArray(
									[
										redistributed.parent,
										function () {
										var _v2 = textOptions.placeholder;
										if (_v2.$ === 'Nothing') {
											return _List_Nil;
										} else {
											var place = _v2.a;
											return _List_fromArray(
												[
													$mdgriffith$elm_ui$Element$behindContent(
													A3($mdgriffith$elm_ui$Element$Input$renderPlaceholder, place, redistributed.cover, textOptions.text === ''))
												]);
										}
									}()
									])))),
					$mdgriffith$elm_ui$Internal$Model$Unkeyed(
						_List_fromArray(
							[inputElement])));
			}
		}();
		return A3(
			$mdgriffith$elm_ui$Element$Input$applyLabel,
			A2(
				$elm$core$List$cons,
				A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$cursor, $mdgriffith$elm_ui$Internal$Style$classes.cursorText),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$Input$isHiddenLabel(textOptions.label) ? $mdgriffith$elm_ui$Internal$Model$NoAttribute : $mdgriffith$elm_ui$Element$spacing(5),
					A2($elm$core$List$cons, $mdgriffith$elm_ui$Element$Region$announce, redistributed.fullParent))),
			textOptions.label,
			wrappedInput);
	});
var $mdgriffith$elm_ui$Element$Input$text = $mdgriffith$elm_ui$Element$Input$textHelper(
	{
		autofill: $elm$core$Maybe$Nothing,
		spellchecked: false,
		type_: $mdgriffith$elm_ui$Element$Input$TextInputNode('text')
	});
var $mdgriffith$elm_ui$Internal$Model$Padding = F5(
	function (a, b, c, d, e) {
		return {$: 'Padding', a: a, b: b, c: c, d: d, e: e};
	});
var $mdgriffith$elm_ui$Internal$Model$Spaced = F3(
	function (a, b, c) {
		return {$: 'Spaced', a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Internal$Model$extractSpacingAndPadding = function (attrs) {
	return A3(
		$elm$core$List$foldr,
		F2(
			function (attr, _v0) {
				var pad = _v0.a;
				var spacing = _v0.b;
				return _Utils_Tuple2(
					function () {
						if (pad.$ === 'Just') {
							var x = pad.a;
							return pad;
						} else {
							if ((attr.$ === 'StyleClass') && (attr.b.$ === 'PaddingStyle')) {
								var _v3 = attr.b;
								var name = _v3.a;
								var t = _v3.b;
								var r = _v3.c;
								var b = _v3.d;
								var l = _v3.e;
								return $elm$core$Maybe$Just(
									A5($mdgriffith$elm_ui$Internal$Model$Padding, name, t, r, b, l));
							} else {
								return $elm$core$Maybe$Nothing;
							}
						}
					}(),
					function () {
						if (spacing.$ === 'Just') {
							var x = spacing.a;
							return spacing;
						} else {
							if ((attr.$ === 'StyleClass') && (attr.b.$ === 'SpacingStyle')) {
								var _v6 = attr.b;
								var name = _v6.a;
								var x = _v6.b;
								var y = _v6.c;
								return $elm$core$Maybe$Just(
									A3($mdgriffith$elm_ui$Internal$Model$Spaced, name, x, y));
							} else {
								return $elm$core$Maybe$Nothing;
							}
						}
					}());
			}),
		_Utils_Tuple2($elm$core$Maybe$Nothing, $elm$core$Maybe$Nothing),
		attrs);
};
var $mdgriffith$elm_ui$Element$wrappedRow = F2(
	function (attrs, children) {
		var _v0 = $mdgriffith$elm_ui$Internal$Model$extractSpacingAndPadding(attrs);
		var padded = _v0.a;
		var spaced = _v0.b;
		if (spaced.$ === 'Nothing') {
			return A4(
				$mdgriffith$elm_ui$Internal$Model$element,
				$mdgriffith$elm_ui$Internal$Model$asRow,
				$mdgriffith$elm_ui$Internal$Model$div,
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.contentLeft + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.contentCenterY + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.wrapped)))),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
							attrs))),
				$mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
		} else {
			var _v2 = spaced.a;
			var spaceName = _v2.a;
			var x = _v2.b;
			var y = _v2.c;
			var newPadding = function () {
				if (padded.$ === 'Just') {
					var _v5 = padded.a;
					var name = _v5.a;
					var t = _v5.b;
					var r = _v5.c;
					var b = _v5.d;
					var l = _v5.e;
					if ((_Utils_cmp(r, x / 2) > -1) && (_Utils_cmp(b, y / 2) > -1)) {
						var newTop = t - (y / 2);
						var newRight = r - (x / 2);
						var newLeft = l - (x / 2);
						var newBottom = b - (y / 2);
						return $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_ui$Internal$Model$StyleClass,
								$mdgriffith$elm_ui$Internal$Flag$padding,
								A5(
									$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
									A4($mdgriffith$elm_ui$Internal$Model$paddingNameFloat, newTop, newRight, newBottom, newLeft),
									newTop,
									newRight,
									newBottom,
									newLeft)));
					} else {
						return $elm$core$Maybe$Nothing;
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}();
			if (newPadding.$ === 'Just') {
				var pad = newPadding.a;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$element,
					$mdgriffith$elm_ui$Internal$Model$asRow,
					$mdgriffith$elm_ui$Internal$Model$div,
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.contentLeft + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.contentCenterY + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.wrapped)))),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
							A2(
								$elm$core$List$cons,
								$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
								_Utils_ap(
									attrs,
									_List_fromArray(
										[pad]))))),
					$mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
			} else {
				var halfY = -(y / 2);
				var halfX = -(x / 2);
				return A4(
					$mdgriffith$elm_ui$Internal$Model$element,
					$mdgriffith$elm_ui$Internal$Model$asEl,
					$mdgriffith$elm_ui$Internal$Model$div,
					attrs,
					$mdgriffith$elm_ui$Internal$Model$Unkeyed(
						_List_fromArray(
							[
								A4(
								$mdgriffith$elm_ui$Internal$Model$element,
								$mdgriffith$elm_ui$Internal$Model$asRow,
								$mdgriffith$elm_ui$Internal$Model$div,
								A2(
									$elm$core$List$cons,
									$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.contentLeft + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.contentCenterY + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.wrapped)))),
									A2(
										$elm$core$List$cons,
										$mdgriffith$elm_ui$Internal$Model$Attr(
											A2(
												$elm$html$Html$Attributes$style,
												'margin',
												$elm$core$String$fromFloat(halfY) + ('px' + (' ' + ($elm$core$String$fromFloat(halfX) + 'px'))))),
										A2(
											$elm$core$List$cons,
											$mdgriffith$elm_ui$Internal$Model$Attr(
												A2(
													$elm$html$Html$Attributes$style,
													'width',
													'calc(100% + ' + ($elm$core$String$fromInt(x) + 'px)'))),
											A2(
												$elm$core$List$cons,
												$mdgriffith$elm_ui$Internal$Model$Attr(
													A2(
														$elm$html$Html$Attributes$style,
														'height',
														'calc(100% + ' + ($elm$core$String$fromInt(y) + 'px)'))),
												A2(
													$elm$core$List$cons,
													A2(
														$mdgriffith$elm_ui$Internal$Model$StyleClass,
														$mdgriffith$elm_ui$Internal$Flag$spacing,
														A3($mdgriffith$elm_ui$Internal$Model$SpacingStyle, spaceName, x, y)),
													_List_Nil))))),
								$mdgriffith$elm_ui$Internal$Model$Unkeyed(children))
							])));
			}
		}
	});
var $author$project$Main$bodyWeightView = F2(
	function (bodyWeightBox, notificationStatus) {
		return A2(
			$mdgriffith$elm_ui$Element$wrappedRow,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$spacing(8)
				]),
			$elm$core$List$concat(
				_List_fromArray(
					[
						$elm$core$List$singleton(
						A2(
							$mdgriffith$elm_ui$Element$Input$text,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$width(
									$mdgriffith$elm_ui$Element$px(100))
								]),
							{
								label: A2(
									$mdgriffith$elm_ui$Element$Input$labelLeft,
									_List_Nil,
									$mdgriffith$elm_ui$Element$text('New body weight in kg:')),
								onChange: $author$project$Main$BodyWeightBox,
								placeholder: $elm$core$Maybe$Nothing,
								text: bodyWeightBox
							})),
						$elm$core$List$singleton(
						A2($author$project$Main$boxErr, bodyWeightBox, $author$project$BodyWeight$fromKgString)),
						$elm$core$List$singleton(
						A2(
							$mdgriffith$elm_ui$Element$Input$button,
							$author$project$Main$submitButtonStyle,
							{
								label: $mdgriffith$elm_ui$Element$text('Record new body weight'),
								onPress: $elm$core$Maybe$Just($author$project$Main$SubmitBodyWeight)
							})),
						function () {
						if (notificationStatus.$ === 'On') {
							return $elm$core$List$singleton(
								A2(
									$mdgriffith$elm_ui$Element$el,
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$Background$color($author$project$Main$yellow)
										]),
									$mdgriffith$elm_ui$Element$text('body weight recorded')));
						} else {
							return _List_Nil;
						}
					}()
					])));
	});
var $author$project$EnergyRate$denominator = function (_v0) {
	var m = _v0.b;
	return m;
};
var $author$project$EnergyRate$energy = function (_v0) {
	var e = _v0.a;
	return e;
};
var $author$project$FoodMass$ratio = F2(
	function (_v0, _v1) {
		var a = _v0.a;
		var b = _v1.a;
		return a / b;
	});
var $author$project$Energy$scale = F2(
	function (by, _v0) {
		var e = _v0.a;
		return $author$project$Energy$Energy(
			$elm$core$Basics$round(e * by));
	});
var $author$project$Meal$energy = function (_v0) {
	var energyRate = _v0.a.energyRate;
	var foodMass = _v0.a.foodMass;
	var energy_ = $author$project$EnergyRate$energy(energyRate);
	var denominator = $author$project$EnergyRate$denominator(energyRate);
	var ratio = A2($author$project$FoodMass$ratio, foodMass, denominator);
	return A2($author$project$Energy$scale, ratio, energy_);
};
var $author$project$Timestamp$greaterThanOrEqual = F2(
	function (_v0, _v1) {
		var a = _v0.a;
		var b = _v1.a;
		return _Utils_cmp(a, b) > -1;
	});
var $elm$time$Time$flooredDiv = F2(
	function (numerator, denominator) {
		return $elm$core$Basics$floor(numerator / denominator);
	});
var $elm$core$Basics$modBy = _Basics_modBy;
var $elm$time$Time$toAdjustedMinutesHelp = F3(
	function (defaultOffset, posixMinutes, eras) {
		toAdjustedMinutesHelp:
		while (true) {
			if (!eras.b) {
				return posixMinutes + defaultOffset;
			} else {
				var era = eras.a;
				var olderEras = eras.b;
				if (_Utils_cmp(era.start, posixMinutes) < 0) {
					return posixMinutes + era.offset;
				} else {
					var $temp$defaultOffset = defaultOffset,
						$temp$posixMinutes = posixMinutes,
						$temp$eras = olderEras;
					defaultOffset = $temp$defaultOffset;
					posixMinutes = $temp$posixMinutes;
					eras = $temp$eras;
					continue toAdjustedMinutesHelp;
				}
			}
		}
	});
var $elm$time$Time$toAdjustedMinutes = F2(
	function (_v0, time) {
		var defaultOffset = _v0.a;
		var eras = _v0.b;
		return A3(
			$elm$time$Time$toAdjustedMinutesHelp,
			defaultOffset,
			A2(
				$elm$time$Time$flooredDiv,
				$elm$time$Time$posixToMillis(time),
				60000),
			eras);
	});
var $elm$time$Time$toHour = F2(
	function (zone, time) {
		return A2(
			$elm$core$Basics$modBy,
			24,
			A2(
				$elm$time$Time$flooredDiv,
				A2($elm$time$Time$toAdjustedMinutes, zone, time),
				60));
	});
var $elm$time$Time$toMinute = F2(
	function (zone, time) {
		return A2(
			$elm$core$Basics$modBy,
			60,
			A2($elm$time$Time$toAdjustedMinutes, zone, time));
	});
var $author$project$Timestamp$toPosix = function (_v0) {
	var t = _v0.a;
	return $elm$time$Time$millisToPosix(((t * 3600) * 1000) + $author$project$Timestamp$epoch);
};
var $author$project$Timestamp$latestMidnight = F2(
	function (now, zone) {
		var posix = $author$project$Timestamp$toPosix(now);
		var minutes = A2($elm$time$Time$toMinute, zone, posix);
		var hours = A2($elm$time$Time$toHour, zone, posix);
		var millisSinceMidnight = (((hours * 60) + minutes) * 60) * 1000;
		return $author$project$Timestamp$fromPosix(
			$elm$time$Time$millisToPosix(
				function (m) {
					return m - millisSinceMidnight;
				}(
					$elm$time$Time$posixToMillis(posix))));
	});
var $author$project$Timestamp$isToday = function (_v0) {
	var now = _v0.now;
	var t = _v0.t;
	var zone = _v0.zone;
	var midnight = A2($author$project$Timestamp$latestMidnight, now, zone);
	return A2(
		$elm$core$Result$withDefault,
		false,
		A2(
			$elm$core$Result$map,
			function (m) {
				return A2($author$project$Timestamp$greaterThanOrEqual, t, m);
			},
			midnight));
};
var $elm$core$List$sum = function (numbers) {
	return A3($elm$core$List$foldl, $elm$core$Basics$add, 0, numbers);
};
var $author$project$Energy$sum = A2(
	$elm$core$Basics$composeR,
	$elm$core$List$map(
		function (_v0) {
			var e = _v0.a;
			return e;
		}),
	A2($elm$core$Basics$composeR, $elm$core$List$sum, $author$project$Energy$Energy));
var $author$project$Meal$timestamp = function (_v0) {
	var meal = _v0.a;
	return meal.timestamp;
};
var $author$project$Meals$energyToday = F3(
	function (_v0, now, zone) {
		var meals = _v0.a;
		return $author$project$Energy$sum(
			A2(
				$elm$core$List$map,
				$author$project$Meal$energy,
				A2(
					$elm$core$List$filter,
					A2(
						$elm$core$Basics$composeR,
						$author$project$Meal$timestamp,
						function (t) {
							return $author$project$Timestamp$isToday(
								{now: now, t: t, zone: zone});
						}),
					meals)));
	});
var $author$project$Energy$toKcal = function (_v0) {
	var e = _v0.a;
	return e;
};
var $author$project$Main$energyTodayView = function (energy) {
	return A2(
		$mdgriffith$elm_ui$Element$paragraph,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$Font$color($author$project$Main$darkBrown)
			]),
		_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Element$el,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$Font$size(50)
					]),
				$mdgriffith$elm_ui$Element$text(
					$elm$core$String$fromInt(
						$author$project$Energy$toKcal(energy)))),
				$mdgriffith$elm_ui$Element$text(' kCal eaten today')
			]));
};
var $author$project$Main$FoodSearchBox = function (a) {
	return {$: 'FoodSearchBox', a: a};
};
var $author$project$Main$foodSearchBoxView = function (contents) {
	return A2(
		$mdgriffith$elm_ui$Element$Input$text,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$width(
				$mdgriffith$elm_ui$Element$px(400))
			]),
		{
			label: A2(
				$mdgriffith$elm_ui$Element$Input$labelLeft,
				_List_Nil,
				$mdgriffith$elm_ui$Element$text('Food search:')),
			onChange: $author$project$Main$FoodSearchBox,
			placeholder: $elm$core$Maybe$Nothing,
			text: contents
		});
};
var $author$project$PageNum$isFirstPage = function (_v0) {
	var p = _v0.a;
	return !p.pageNum;
};
var $author$project$PageNum$isLastPage = function (_v0) {
	var p = _v0.a;
	return _Utils_eq(p.pageNum + 1, p.totalPages);
};
var $author$project$Main$OneLessFoodSearchPage = {$: 'OneLessFoodSearchPage'};
var $author$project$Main$lessMoreStyle = _List_fromArray(
	[
		$mdgriffith$elm_ui$Element$padding(15),
		$mdgriffith$elm_ui$Element$mouseOver(
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$Background$color($author$project$Main$whiteHover)
			])),
		$mdgriffith$elm_ui$Element$Border$solid,
		$mdgriffith$elm_ui$Element$Font$color($author$project$Main$mustard),
		$mdgriffith$elm_ui$Element$Border$width(1),
		$mdgriffith$elm_ui$Element$Border$color($author$project$Main$mustard),
		$mdgriffith$elm_ui$Element$Border$rounded(3)
	]);
var $author$project$Main$lessFoodSearchResultsButton = A2(
	$mdgriffith$elm_ui$Element$Input$button,
	$author$project$Main$lessMoreStyle,
	{
		label: $mdgriffith$elm_ui$Element$text('less results'),
		onPress: $elm$core$Maybe$Just($author$project$Main$OneLessFoodSearchPage)
	});
var $author$project$Main$OneMoreFoodSearchPage = {$: 'OneMoreFoodSearchPage'};
var $author$project$Main$moreFoodSearchResultsButton = A2(
	$mdgriffith$elm_ui$Element$Input$button,
	$author$project$Main$lessMoreStyle,
	{
		label: $mdgriffith$elm_ui$Element$text('more results'),
		onPress: $elm$core$Maybe$Just($author$project$Main$OneMoreFoodSearchPage)
	});
var $mdgriffith$elm_ui$Element$row = F2(
	function (attrs, children) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asRow,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.contentLeft + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.contentCenterY)),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
						attrs))),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
	});
var $author$project$PageNum$totalPages = function (_v0) {
	var p = _v0.a;
	return p.totalPages;
};
var $author$project$Main$foodSearchPaginationView = function (pageNum) {
	return ($author$project$PageNum$totalPages(pageNum) <= 1) ? _List_Nil : ($author$project$PageNum$isFirstPage(pageNum) ? $elm$core$List$singleton($author$project$Main$moreFoodSearchResultsButton) : ($author$project$PageNum$isLastPage(pageNum) ? $elm$core$List$singleton($author$project$Main$lessFoodSearchResultsButton) : $elm$core$List$singleton(
		A2(
			$mdgriffith$elm_ui$Element$row,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$spacing(8)
				]),
			_List_fromArray(
				[$author$project$Main$moreFoodSearchResultsButton, $author$project$Main$lessFoodSearchResultsButton])))));
};
var $author$project$Main$FoodSearchResultClick = function (a) {
	return {$: 'FoodSearchResultClick', a: a};
};
var $author$project$Main$bluePaleSky = A3($mdgriffith$elm_ui$Element$rgb255, 214, 236, 249);
var $author$project$Main$bluePaleSkyHover = A3($mdgriffith$elm_ui$Element$rgb255, 204, 226, 239);
var $author$project$Energy$toInt = function (_v0) {
	var energy = _v0.a;
	return energy;
};
var $author$project$Main$foodSearchResultView = function (food) {
	return A2(
		$mdgriffith$elm_ui$Element$Input$button,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$Background$color($author$project$Main$bluePaleSky),
				$mdgriffith$elm_ui$Element$mouseOver(
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$Background$color($author$project$Main$bluePaleSkyHover)
					])),
				$mdgriffith$elm_ui$Element$padding(20),
				$mdgriffith$elm_ui$Element$Border$rounded(3)
			]),
		{
			label: A2(
				$mdgriffith$elm_ui$Element$row,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$spacing(5)
					]),
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$text(
						$author$project$FoodDescription$toString(
							$author$project$Food$description(food))),
						$mdgriffith$elm_ui$Element$text(
						function (e) {
							return '(' + (e + ' kCal / 100g)');
						}(
							$elm$core$String$fromInt(
								$author$project$Energy$toInt(
									$author$project$EnergyRate$energy(
										$author$project$Food$energyRate(food))))))
					])),
			onPress: $elm$core$Maybe$Just(
				$author$project$Main$FoodSearchResultClick(food))
		});
};
var $author$project$Main$foodSearchResultsView = function (foods) {
	return $elm$core$List$isEmpty(foods) ? _List_Nil : $elm$core$List$singleton(
		A2(
			$mdgriffith$elm_ui$Element$wrappedRow,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$spacing(8)
				]),
			A2($elm$core$List$map, $author$project$Main$foodSearchResultView, foods)));
};
var $author$project$PageNum$pageNum = function (_v0) {
	var p = _v0.a;
	return p.pageNum + 1;
};
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $author$project$Main$foodSearchView = F3(
	function (customFoods, searchBox, pageNum) {
		var matches = A2(
			$elm$core$List$take,
			$author$project$PageNum$pageNum(pageNum) * $author$project$Main$foodResultsPerPage,
			A2($author$project$Main$foodSearch, customFoods, searchBox));
		return A2(
			$mdgriffith$elm_ui$Element$column,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$Font$color($author$project$Main$darkBrown),
					$mdgriffith$elm_ui$Element$spacing(8),
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
				]),
			A2(
				$elm$core$List$cons,
				$author$project$Main$foodSearchBoxView(searchBox),
				_Utils_ap(
					$author$project$Main$foodSearchResultsView(matches),
					$author$project$Main$foodSearchPaginationView(pageNum))));
	});
var $author$project$Main$blueMountain = A3($mdgriffith$elm_ui$Element$rgb255, 137, 180, 214);
var $mdgriffith$elm_ui$Internal$Model$Heading = function (a) {
	return {$: 'Heading', a: a};
};
var $mdgriffith$elm_ui$Element$Region$heading = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Describe, $mdgriffith$elm_ui$Internal$Model$Heading);
var $author$project$Main$header = function (text) {
	return A2(
		$mdgriffith$elm_ui$Element$el,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$Font$size(25),
				$mdgriffith$elm_ui$Element$Region$heading(1),
				$mdgriffith$elm_ui$Element$Font$color($author$project$Main$blueMountain)
			]),
		$mdgriffith$elm_ui$Element$text(text));
};
var $author$project$Main$NewFoodDescriptionBox = function (a) {
	return {$: 'NewFoodDescriptionBox', a: a};
};
var $author$project$Main$NewFoodEnergyBox = function (a) {
	return {$: 'NewFoodEnergyBox', a: a};
};
var $author$project$Main$SubmitNewFood = {$: 'SubmitNewFood'};
var $author$project$Main$makeNewFoodView = F3(
	function (description, energy, notificationStatus) {
		return A2(
			$mdgriffith$elm_ui$Element$wrappedRow,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$spacing(8)
				]),
			$elm$core$List$concat(
				_List_fromArray(
					[
						$elm$core$List$singleton(
						A2(
							$mdgriffith$elm_ui$Element$Input$text,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$width(
									$mdgriffith$elm_ui$Element$px(400))
								]),
							{
								label: A2(
									$mdgriffith$elm_ui$Element$Input$labelLeft,
									_List_Nil,
									$mdgriffith$elm_ui$Element$text('New food description:')),
								onChange: $author$project$Main$NewFoodDescriptionBox,
								placeholder: $elm$core$Maybe$Nothing,
								text: description
							})),
						$elm$core$List$singleton(
						A2($author$project$Main$boxErr, description, $author$project$FoodDescription$fromString)),
						$elm$core$List$singleton(
						A2(
							$mdgriffith$elm_ui$Element$Input$text,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$width(
									$mdgriffith$elm_ui$Element$px(100))
								]),
							{
								label: A2(
									$mdgriffith$elm_ui$Element$Input$labelLeft,
									_List_Nil,
									$mdgriffith$elm_ui$Element$text('New food energy:')),
								onChange: $author$project$Main$NewFoodEnergyBox,
								placeholder: $elm$core$Maybe$Nothing,
								text: energy
							})),
						$elm$core$List$singleton(
						A2($author$project$Main$boxErr, energy, $author$project$EnergyRate$fromKcalPer100gString)),
						$elm$core$List$singleton(
						A2(
							$mdgriffith$elm_ui$Element$Input$button,
							$author$project$Main$submitButtonStyle,
							{
								label: $mdgriffith$elm_ui$Element$text('Record new food'),
								onPress: $elm$core$Maybe$Just($author$project$Main$SubmitNewFood)
							})),
						function () {
						if (notificationStatus.$ === 'On') {
							return $elm$core$List$singleton(
								A2(
									$mdgriffith$elm_ui$Element$el,
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$Background$color($author$project$Main$yellow)
										]),
									$mdgriffith$elm_ui$Element$text('new food recorded')));
						} else {
							return _List_Nil;
						}
					}()
					])));
	});
var $author$project$Main$mealWeightBoxError = function (contents) {
	return A2($author$project$Main$boxErr, contents, $author$project$FoodMass$fromGramString);
};
var $author$project$Main$MealWeightBox = function (a) {
	return {$: 'MealWeightBox', a: a};
};
var $author$project$Main$mealWeightBoxView = function (contents) {
	return A2(
		$mdgriffith$elm_ui$Element$Input$text,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width(
				$mdgriffith$elm_ui$Element$px(100))
			]),
		{
			label: A2(
				$mdgriffith$elm_ui$Element$Input$labelLeft,
				_List_Nil,
				$mdgriffith$elm_ui$Element$text('Meal weight in grams: ')),
			onChange: $author$project$Main$MealWeightBox,
			placeholder: $elm$core$Maybe$Nothing,
			text: contents
		});
};
var $mdgriffith$elm_ui$Internal$Flag$fontWeight = $mdgriffith$elm_ui$Internal$Flag$flag(13);
var $mdgriffith$elm_ui$Element$Font$regular = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$fontWeight, $mdgriffith$elm_ui$Internal$Style$classes.textNormalWeight);
var $author$project$Main$selectedFoodView = function (food) {
	return A2(
		$mdgriffith$elm_ui$Element$paragraph,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$Font$size(30)
			]),
		_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Element$el,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$Font$size(20),
						$mdgriffith$elm_ui$Element$Font$regular
					]),
				$mdgriffith$elm_ui$Element$text('Selected food: ')),
				$mdgriffith$elm_ui$Element$text(
				$author$project$FoodDescription$toString(
					$author$project$Food$description(food))),
				$mdgriffith$elm_ui$Element$text(
				function (s) {
					return ' (' + (s + ' kCal / 100g)');
				}(
					$elm$core$String$fromInt(
						$author$project$Energy$toInt(
							$author$project$EnergyRate$energy(
								$author$project$Food$energyRate(food))))))
			]));
};
var $author$project$Main$SubmitMeal = {$: 'SubmitMeal'};
var $author$project$Main$submitMealButton = A2(
	$mdgriffith$elm_ui$Element$Input$button,
	$author$project$Main$submitButtonStyle,
	{
		label: $mdgriffith$elm_ui$Element$text('Record meal'),
		onPress: $elm$core$Maybe$Just($author$project$Main$SubmitMeal)
	});
var $author$project$Main$makeNewMealView = F3(
	function (selectedFood, mealWeightBox, notificationStatus) {
		if (selectedFood.$ === 'Nothing') {
			return $mdgriffith$elm_ui$Element$none;
		} else {
			var selectedFood_ = selectedFood.a;
			return A2(
				$mdgriffith$elm_ui$Element$column,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$spacing(8)
					]),
				_List_fromArray(
					[
						$author$project$Main$selectedFoodView(selectedFood_),
						A2(
						$mdgriffith$elm_ui$Element$wrappedRow,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$spacing(8)
							]),
						$elm$core$List$concat(
							_List_fromArray(
								[
									$elm$core$List$singleton(
									$author$project$Main$mealWeightBoxView(mealWeightBox)),
									$elm$core$List$singleton(
									$author$project$Main$mealWeightBoxError(mealWeightBox)),
									$elm$core$List$singleton($author$project$Main$submitMealButton),
									function () {
									if (notificationStatus.$ === 'On') {
										return $elm$core$List$singleton(
											A2(
												$mdgriffith$elm_ui$Element$el,
												_List_fromArray(
													[
														$mdgriffith$elm_ui$Element$Background$color($author$project$Main$yellow)
													]),
												$mdgriffith$elm_ui$Element$text('meal recorded')));
									} else {
										return _List_Nil;
									}
								}()
								])))
					]));
		}
	});
var $author$project$Main$SubmitWaistSize = {$: 'SubmitWaistSize'};
var $author$project$Main$WaistSizeBox = function (a) {
	return {$: 'WaistSizeBox', a: a};
};
var $author$project$Main$waistSizeView = F2(
	function (waistSizeBox, notificationStatus) {
		return A2(
			$mdgriffith$elm_ui$Element$wrappedRow,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$spacing(8)
				]),
			$elm$core$List$concat(
				_List_fromArray(
					[
						$elm$core$List$singleton(
						A2(
							$mdgriffith$elm_ui$Element$Input$text,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$width(
									$mdgriffith$elm_ui$Element$px(100))
								]),
							{
								label: A2(
									$mdgriffith$elm_ui$Element$Input$labelLeft,
									_List_Nil,
									$mdgriffith$elm_ui$Element$text('New waist size in cm:')),
								onChange: $author$project$Main$WaistSizeBox,
								placeholder: $elm$core$Maybe$Nothing,
								text: waistSizeBox
							})),
						$elm$core$List$singleton(
						A2($author$project$Main$boxErr, waistSizeBox, $author$project$WaistSize$fromCmString)),
						$elm$core$List$singleton(
						A2(
							$mdgriffith$elm_ui$Element$Input$button,
							$author$project$Main$submitButtonStyle,
							{
								label: $mdgriffith$elm_ui$Element$text('Record a new waist size'),
								onPress: $elm$core$Maybe$Just($author$project$Main$SubmitWaistSize)
							})),
						function () {
						if (notificationStatus.$ === 'On') {
							return $elm$core$List$singleton(
								A2(
									$mdgriffith$elm_ui$Element$el,
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$Background$color($author$project$Main$yellow)
										]),
									$mdgriffith$elm_ui$Element$text('waist size recorded')));
						} else {
							return _List_Nil;
						}
					}()
					])));
	});
var $author$project$Main$viewOk = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$spacing(15),
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
			]),
		_List_fromArray(
			[
				$author$project$Main$header('Amount eaten today'),
				$author$project$Main$energyTodayView(
				A3($author$project$Meals$energyToday, model.meals, model.now, model.zone)),
				$author$project$Main$header('Record a meal'),
				A3($author$project$Main$foodSearchView, model.customFoods, model.foodSearchBox, model.foodSearchResultsPage),
				A3($author$project$Main$makeNewMealView, model.selectedFood, model.mealWeightBox, model.mealNotification),
				$author$project$Main$header('Record a new food'),
				A3($author$project$Main$makeNewFoodView, model.newFoodDescriptionBox, model.newFoodEnergyBox, model.foodNotification),
				$author$project$Main$header('Record a body weight'),
				A2($author$project$Main$bodyWeightView, model.bodyWeightBox, model.bodyWeightNotification),
				$author$project$Main$header('Record a waist size'),
				A2($author$project$Main$waistSizeView, model.waistSizeBox, model.waistSizeNotification)
			]));
};
var $author$project$Main$viewElement = function (model) {
	switch (model.$) {
		case 'Fatal':
			var err = model.a;
			return $author$project$Main$viewFatalError(err);
		case 'LoadingZoneAndTime':
			return $mdgriffith$elm_ui$Element$none;
		case 'LoadingZone':
			return $mdgriffith$elm_ui$Element$none;
		case 'LoadingTime':
			return $mdgriffith$elm_ui$Element$none;
		default:
			var okModel = model.a;
			return $author$project$Main$viewOk(okModel);
	}
};
var $author$project$Main$white = A3($mdgriffith$elm_ui$Element$rgb255, 244, 243, 238);
var $author$project$Main$view = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$layout,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$Font$family(
				_List_fromArray(
					[$mdgriffith$elm_ui$Element$Font$serif])),
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$padding(8),
				$mdgriffith$elm_ui$Element$Background$color($author$project$Main$white)
			]),
		$author$project$Main$viewElement(model));
};
var $author$project$Main$main = $elm$browser$Browser$element(
	{init: $author$project$Main$init, subscriptions: $author$project$Main$subscriptions, update: $author$project$Main$update, view: $author$project$Main$view});
_Platform_export({'Main':{'init':$author$project$Main$main($elm$json$Json$Decode$value)(0)}});}(this));