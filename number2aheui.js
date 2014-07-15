var number2aheui = function() {
	var cho = {"+": 3, "*": 4, "-": 16, "/": 2, ">": 8};
	var jong = [0, 0, 1, 7, 16, 8, 18, 9, 15, 10];

	function han_assemble(cho, jung, jong) {
		return String.fromCharCode(0xac00 + (((cho * 21) + jung) * 28) + jong);
	}

	function try_dis(num) {
		var shortest = [];

		for(var i=2 ; i<=9 ; i++) {
			var nr = Math.floor(num / i);
			var diff = nr * i - num;
			var t;

			if(diff === 0) t = get_expr(nr).concat([i, "*"]);
			else t = get_expr(nr).concat([i, "*"], get_expr(-diff), ["+"]);

			if(t.length < shortest.length || shortest.length === 0) shortest = t.slice(0);
		}

		return shortest;
	}

	function try_sqrt(num) {
		var rt = Math.floor(Math.sqrt(num));
		var remainder = num - rt * rt;
		var exp_plus = get_expr(rt).concat(">", "*", get_expr(remainder), "+");

		rt = Math.ceil(Math.sqrt(num));
		remainder = rt * rt - num;
		var exp_minus = get_expr(rt).concat(">", "*", get_expr(remainder), "-");

		return exp_plus.length < exp_minus.length ? exp_plus : exp_minus;
	}

	function get_basic(num) {
		if(num === 0)
			return [2, 2, "-"];

		else if(num === 1)
			return [2, 2, "/"];

		else if(num >= 2 && num <= 9)
			return [num];

		else if(num >= 10 && num <= 18) {
			var n1 = Math.ceil(num / 2);
			var n2 = num - n1;
			return [n1, n2, "+"];
		}
	}

	function get_expr(num) {
		if(num <= 18) return get_basic(num);

		for(var i=2 ; i<=9 ; i++) {
			var nr = Math.floor(num / i);

			if(nr >= 2 && nr <= 9 && nr * i === num)
				return [i, nr, "*"];
		}

		var rt = Math.sqrt(num);
		if(Math.floor(rt) === rt)
			return get_expr(rt).concat([">", "*"]);

		var arr_dis = try_dis(num);
		var arr_sqrt = try_sqrt(num);

		return arr_dis.length < arr_sqrt.length ? arr_dis : arr_sqrt;
	}

	function get_expression(num) {
		return get_expr(num);
	}

	function get_aheui_expression(num) {
		var expr = get_expression(num);

		var aheui = "";

		for(var i in expr) {
			var v = expr[i];
			if(typeof v === "number") aheui += han_assemble(7, 0, jong[v]);
			else aheui += han_assemble(cho[v], 0, 0);
		}

		return aheui;
	}

	return {
		get: get_expression,
		getAheui: get_aheui_expression
	};
};