var string2aheui = function(_n2a) {
	var n2a = typeof _n2a === "undefined" ? new number2aheui() : _n2a;

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
		if(str.match(/^[0-9]+$/)) return "number";
		return "mixed";
	}

	function convert_onecase(str, base) {
		var code = n2a.getAheui(base);
		var charcode = to_charcode(str);

		for(var i in charcode) {
			var cc = charcode[i] - base;

			if(i < charcode.length - 1) code += "빠";
			if(cc > 0) code += n2a.getAheui(cc) + "다";
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

		var code = n2a.getAheui(range2[0]) + n2a.getAheui(range1[0]);

		for(var i in charcode) {
			var cc = charcode[i];
			var range, tempcode = "";

			if(cc >= range1[0] && cc <= range1[1]) {
				range = 1;
				tempcode = n2a.getAheui(cc - range1[0]);
			}
			else {
				range = 2;
				tempcode = n2a.getAheui(cc - range2[0]);
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

			code += n2a.getAheui(cc) + "맣";
		}

		return code;
	}

	function convert_number(str) {
		var num = parseInt(str, 10);
		return n2a.getAheui(num) + "망";
	}

	function convert(str) {
		var type = detect_type(str);

		switch(type) {
			case "lowercase": return convert_lowercase(str);
			case "uppercase": return convert_uppercase(str);
			case "korean": return convert_korean(str);
			case "mixedcase": return convert_mixedcase(str);
			case "mixed": return convert_mixed(str);
			case "number": return convert_number(str);
		}
	}

	return {
		get: convert
	};
};