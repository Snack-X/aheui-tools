var string2aheui = function() {
	var n2a = new number2aheui();
	var expcache = {};

	function to_charcode(str) {
		var a = [];
		for(var i=0 ; i<str.length ; i++) a.push(str.charCodeAt(i));
		return a;
	}

	function detect_type(str) {
		if(str.match(/^[a-z]+$/)) return "lowercase";
		if(str.match(/^[A-Z]+$/)) return "uppercase";
		if(str.match(/^[a-zA-Z]+$/)) return "mixedcase";
		if(str.match(/^[가-힣]+$/)) return "korean";
		return "mixed";
	}

	function get_exp(num) {
		if(num === 0)
			expcache[0] = "";

		if(typeof expcache[num] === "undefined")
			expcache[num] = n2a.getAheui(num);

		return expcache[num];
	}

	function convert_onecase(str, base) {
		var code = get_exp(base);
		var charcode = to_charcode(str);

		for(var i in charcode) {
			var cc = charcode[i] - base;

			if(i < charcode.length - 1) code += "빠";
			if(cc > 0) code += get_exp(cc) + "다";
			code += "맣";
		}

		return code;
	}

	function convert_lowercase(str) {
		return convert_onecase(str, 97);
	}

	function convert_uppercase(str) {
		return convert_onecase(str, 65);
	}

	function convert_korean(str) {
		return convert_onecase(str, 44032);
	}

	function convert_twocase(str, range1, range2) {
		var charcode = to_charcode(str);
		var current = 1;

		var code = get_exp(range2[0]) + get_exp(range1[0]);

		for(var i in charcode) {
			var cc = charcode[i];
			var range, tempcode = "";

			if(cc >= range1[0] && cc <= range1[1]) {
				range = 1;
				tempcode = get_exp(cc - range1[0]);
			}
			else {
				range = 2;
				tempcode = get_exp(cc - range2[0]);
			}

			if(current != range) {
				code += "파";
				current = range;
			}
			code += "빠";
			if(tempcode !== "") code += tempcode + "다";
			code += "맣";
		}

		code += "마마";

		return code;
	}

	function convert_mixedcase(str) {
		return convert_twocase(str, [65, 90], [97, 122]);
	}

	function convert_mixed(str) {
		var charcode = to_charcode(str);
		var code = "";

		for(var i in charcode) {
			var cc = charcode[i];

			code += get_exp(cc) + "맣";
		}

		return code;
	}

	function convert(str) {
		var type = detect_type(str);

		switch(type) {
			case "lowercase": return convert_lowercase(str);
			case "uppercase": return convert_uppercase(str);
			case "korean": return convert_korean(str);
			case "mixedcase": return convert_mixedcase(str);
			case "mixed": return convert_mixed(str);
		}
	}

	return {
		get: convert
	};
};