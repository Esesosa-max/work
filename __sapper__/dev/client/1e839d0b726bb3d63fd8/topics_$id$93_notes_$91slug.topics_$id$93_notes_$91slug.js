(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["topics_$id$93_notes_$91slug"],{

/***/ "./src/routes/topics/[id]/notes/[slug].svelte":
/*!****************************************************!*\
  !*** ./src/routes/topics/[id]/notes/[slug].svelte ***!
  \****************************************************/
/*! exports provided: default, preload */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "preload", function() { return preload; });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/firestore */ "./node_modules/firebase/firestore/dist/index.esm.js");
/* harmony import */ var _components_config_svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/config.svelte */ "./src/components/config.svelte");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* harmony import */ var _home_alex_Documents_note_archiver_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var _home_alex_Documents_note_archiver_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* src/routes/topics/[id]/notes/[slug].svelte generated by Svelte v3.44.1 */






const file = "src/routes/topics/[id]/notes/[slug].svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[3] = list[i];
	child_ctx[5] = i;
	return child_ctx;
}

// (50:3) {:else}
function create_else_block(ctx) {
	let div7;
	let div6;
	let div1;
	let div0;
	let t0;
	let div3;
	let div2;
	let t1;
	let div5;
	let div4;

	const block = {
		c: function create() {
			div7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			this.h();
		},
		l: function claim(nodes) {
			div7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "DIV", { class: true });
			var div7_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div7);
			div6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div7_nodes, "DIV", { class: true });
			var div6_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div6);
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div6_nodes, "DIV", { class: true });
			var div1_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div1);
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div1_nodes, "DIV", { class: true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div0).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div1_nodes);
			div1_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div6_nodes, "DIV", { class: true });
			var div3_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div3);
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div3_nodes, "DIV", { class: true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div2).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div3_nodes);
			div3_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div6_nodes, "DIV", { class: true });
			var div5_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div5);
			div4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div5_nodes, "DIV", { class: true });
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div4).forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div5_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div6_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div7_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div0, "class", "circle");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div0, file, 53, 8, 1540);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div1, "class", "circle-clipper left");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div1, file, 52, 6, 1498);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div2, "class", "circle");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div2, file, 55, 8, 1611);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div3, "class", "gap-patch");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div3, file, 54, 12, 1579);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div4, "class", "circle");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div4, file, 57, 8, 1693);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div5, "class", "circle-clipper right");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div5, file, 56, 12, 1650);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div6, "class", "spinner-layer spinner-blue-only");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div6, file, 51, 4, 1446);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div7, "class", "preloader-wrapper big active");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div7, file, 50, 3, 1399);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_hydration_dev"])(target, div7, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(div7, div6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(div6, div1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(div1, div0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(div1, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(div6, div3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(div3, div2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(div3, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(div6, div5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(div5, div4);
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div7);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(50:3) {:else}",
		ctx
	});

	return block;
}

// (30:1) {#if docs}
function create_if_block(ctx) {
	let each_blocks = [];
	let each_1_lookup = new Map();
	let each_1_anchor;
	let each_value = /*docs*/ ctx[2];
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_each_argument"])(each_value);
	const get_key = ctx => /*doc*/ ctx[3].id;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_each_keys"])(ctx, each_value, get_each_context, get_key);

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context(ctx, each_value, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
	}

	const block = {
		c: function create() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
		},
		l: function claim(nodes) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(nodes);
			}

			each_1_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
		},
		m: function mount(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_hydration_dev"])(target, each_1_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*docs*/ 4) {
				each_value = /*docs*/ ctx[2];
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_each_argument"])(each_value);
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_each_keys"])(ctx, each_value, get_each_context, get_key);
				each_blocks = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["update_keyed_each"])(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, each_1_anchor.parentNode, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_block"], create_each_block, each_1_anchor, get_each_context);
			}
		},
		d: function destroy(detaching) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d(detaching);
			}

			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(each_1_anchor);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(30:1) {#if docs}",
		ctx
	});

	return block;
}

// (31:3) {#each docs as doc , i(doc.id)}
function create_each_block(key_1, ctx) {
	let div3;
	let div2;
	let div0;
	let img;
	let img_src_value;
	let t0;
	let span;
	let t1;
	let t2_value = /*i*/ ctx[5] + 1 + "";
	let t2;
	let t3;
	let div1;
	let a;
	let t4;
	let a_href_value;
	let t5;
	let p0;
	let t6;
	let t7_value = /*doc*/ ctx[3].data().date + "";
	let t7;
	let t8;
	let p1;
	let t9;
	let t10_value = /*doc*/ ctx[3].data().username + "";
	let t10;
	let t11;

	const block = {
		key: key_1,
		first: null,
		c: function create() {
			div3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			img = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("img");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			span = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Page:");
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t2_value);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			a = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Download");
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			p0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Uploaded on :");
			t7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t7_value);
			t8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			p1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Uploaded By :");
			t10 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t10_value);
			t11 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			this.h();
		},
		l: function claim(nodes) {
			div3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "DIV", { class: true });
			var div3_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div3);
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div3_nodes, "DIV", { class: true });
			var div2_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div2);
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div2_nodes, "DIV", { class: true });
			var div0_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div0);
			img = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div0_nodes, "IMG", { src: true, alt: true });
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div0_nodes);
			span = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div0_nodes, "SPAN", { class: true });
			var span_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(span);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(span_nodes, "Page:");
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(span_nodes, t2_value);
			span_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div0_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div2_nodes);
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div2_nodes, "DIV", { class: true });
			var div1_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div1);

			a = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div1_nodes, "A", {
				class: true,
				target: true,
				href: true,
				download: true
			});

			var a_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(a);
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(a_nodes, "Download");
			a_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div1_nodes);
			p0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div1_nodes, "P", {});
			var p0_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(p0);
			t6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(p0_nodes, "Uploaded on :");
			t7 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(p0_nodes, t7_value);
			p0_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t8 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div1_nodes);
			p1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div1_nodes, "P", {});
			var p1_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(p1);
			t9 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(p1_nodes, "Uploaded By :");
			t10 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(p1_nodes, t10_value);
			p1_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div1_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div2_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t11 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div3_nodes);
			div3_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			if (!Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["src_url_equal"])(img.src, img_src_value = /*doc*/ ctx[3].data().image)) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(img, "src", img_src_value);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(img, "alt", "foo");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(img, file, 34, 8, 932);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(span, "class", "card-title");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span, file, 35, 8, 981);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div0, "class", "card-image");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div0, file, 33, 6, 899);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a, "class", "btn-floating halfway-fab waves-effect waves-light red");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a, "target", "_blank");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a, "href", a_href_value = /*doc*/ ctx[3].data().image);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a, "download", "my-flie");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(a, file, 40, 8, 1089);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(p0, file, 43, 8, 1253);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(p1, file, 44, 8, 1299);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div1, "class", "card-content");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div1, file, 38, 6, 1053);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div2, "class", "card");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div2, file, 32, 4, 874);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div3, "class", "col s12 m6");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div3, file, 31, 3, 845);
			this.first = div3;
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_hydration_dev"])(target, div3, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(div3, div2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(div2, div0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(div0, img);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(div0, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(div0, span);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(span, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(span, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(div2, t3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(div2, div1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(div1, a);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(a, t4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(div1, t5);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(div1, p0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(p0, t6);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(p0, t7);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(div1, t8);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(div1, p1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(p1, t9);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(p1, t10);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(div3, t11);
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty & /*docs*/ 4 && !Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["src_url_equal"])(img.src, img_src_value = /*doc*/ ctx[3].data().image)) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(img, "src", img_src_value);
			}

			if (dirty & /*docs*/ 4 && t2_value !== (t2_value = /*i*/ ctx[5] + 1 + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data_dev"])(t2, t2_value);

			if (dirty & /*docs*/ 4 && a_href_value !== (a_href_value = /*doc*/ ctx[3].data().image)) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a, "href", a_href_value);
			}

			if (dirty & /*docs*/ 4 && t7_value !== (t7_value = /*doc*/ ctx[3].data().date + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data_dev"])(t7, t7_value);
			if (dirty & /*docs*/ 4 && t10_value !== (t10_value = /*doc*/ ctx[3].data().username + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data_dev"])(t10, t10_value);
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div3);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(31:3) {#each docs as doc , i(doc.id)}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let title_value;
	let t0;
	let h6;
	let t1;
	let t2;
	let t3;
	let t4;
	let t5;
	let div;
	document.title = title_value = "\n     Notes: Topic " + /*slug*/ ctx[1] + "\n    ";

	function select_block_type(ctx, dirty) {
		if (/*docs*/ ctx[2]) return create_if_block;
		return create_else_block;
	}

	let current_block_type = select_block_type(ctx, -1);
	let if_block = current_block_type(ctx);

	const block = {
		c: function create() {
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			h6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h6");
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("Notes on :");
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(/*id*/ ctx[0]);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(":");
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(/*slug*/ ctx[1]);
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			if_block.c();
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["query_selector_all"])('[data-svelte=\"svelte-1xw3sh2\"]', document.head);
			head_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(nodes);
			h6 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "H6", {});
			var h6_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(h6);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(h6_nodes, "Notes on :");
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(h6_nodes, /*id*/ ctx[0]);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(h6_nodes, ":");
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(h6_nodes, /*slug*/ ctx[1]);
			h6_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(nodes);
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "DIV", { class: true });
			var div_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div);
			if_block.l(div_nodes);
			div_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(h6, file, 27, 3, 743);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div, "class", "row");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div, file, 28, 3, 777);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_hydration_dev"])(target, t0, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_hydration_dev"])(target, h6, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(h6, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(h6, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(h6, t3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(h6, t4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_hydration_dev"])(target, t5, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_hydration_dev"])(target, div, anchor);
			if_block.m(div, null);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*slug*/ 2 && title_value !== (title_value = "\n     Notes: Topic " + /*slug*/ ctx[1] + "\n    ")) {
				document.title = title_value;
			}

			if (dirty & /*id*/ 1) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data_dev"])(t2, /*id*/ ctx[0]);
			if (dirty & /*slug*/ 2) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data_dev"])(t4, /*slug*/ ctx[1]);

			if (current_block_type === (current_block_type = select_block_type(ctx, dirty)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(div, null);
				}
			}
		},
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t0);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(h6);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t5);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div);
			if_block.d();
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

async function preload({ params }) {
	const { id, slug } = params;
	return { id, slug };
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_slots"])('U5Bslugu5D', slots, []);
	let docs;
	let { id } = $$props;
	let { slug } = $$props;

	Object(svelte__WEBPACK_IMPORTED_MODULE_3__["onMount"])(async () => {
		const q = Object(firebase_firestore__WEBPACK_IMPORTED_MODULE_1__["query"])(Object(firebase_firestore__WEBPACK_IMPORTED_MODULE_1__["collection"])(Object(firebase_firestore__WEBPACK_IMPORTED_MODULE_1__["getFirestore"])(_components_config_svelte__WEBPACK_IMPORTED_MODULE_2__["app"]), `subjects/${id}/topics/${slug}/notes`), Object(firebase_firestore__WEBPACK_IMPORTED_MODULE_1__["orderBy"])("date"));
		const querySnapshot = await Object(firebase_firestore__WEBPACK_IMPORTED_MODULE_1__["getDocs"])(q);
		$$invalidate(2, docs = querySnapshot.docs);
	});

	const writable_props = ['id', 'slug'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<U5Bslugu5D> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('id' in $$props) $$invalidate(0, id = $$props.id);
		if ('slug' in $$props) $$invalidate(1, slug = $$props.slug);
	};

	$$self.$capture_state = () => ({
		preload,
		docs,
		collection: firebase_firestore__WEBPACK_IMPORTED_MODULE_1__["collection"],
		query: firebase_firestore__WEBPACK_IMPORTED_MODULE_1__["query"],
		getFirestore: firebase_firestore__WEBPACK_IMPORTED_MODULE_1__["getFirestore"],
		getDocs: firebase_firestore__WEBPACK_IMPORTED_MODULE_1__["getDocs"],
		orderBy: firebase_firestore__WEBPACK_IMPORTED_MODULE_1__["orderBy"],
		app: _components_config_svelte__WEBPACK_IMPORTED_MODULE_2__["app"],
		onMount: svelte__WEBPACK_IMPORTED_MODULE_3__["onMount"],
		id,
		slug
	});

	$$self.$inject_state = $$props => {
		if ('docs' in $$props) $$invalidate(2, docs = $$props.docs);
		if ('id' in $$props) $$invalidate(0, id = $$props.id);
		if ('slug' in $$props) $$invalidate(1, slug = $$props.slug);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [id, slug, docs];
}

class U5Bslugu5D extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"] {
	constructor(options) {
		super(options);
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], { id: 0, slug: 1 });

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterComponent", {
			component: this,
			tagName: "U5Bslugu5D",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*id*/ ctx[0] === undefined && !('id' in props)) {
			console.warn("<U5Bslugu5D> was created without expected prop 'id'");
		}

		if (/*slug*/ ctx[1] === undefined && !('slug' in props)) {
			console.warn("<U5Bslugu5D> was created without expected prop 'slug'");
		}
	}

	get id() {
		throw new Error("<U5Bslugu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set id(value) {
		throw new Error("<U5Bslugu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get slug() {
		throw new Error("<U5Bslugu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set slug(value) {
		throw new Error("<U5Bslugu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

if (module && module.hot) { if (false) {} U5Bslugu5D = _home_alex_Documents_note_archiver_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_4__["applyHmr"]({ m: module, id: "\"src/routes/topics/[id]/notes/[slug].svelte\"", hotOptions: {"preserveLocalState":false,"noPreserveStateKey":["@hmr:reset","@!hmr"],"preserveAllLocalStateKey":"@hmr:keep-all","preserveLocalStateKey":"@hmr:keep","noReload":false,"optimistic":true,"acceptNamedExports":true,"acceptAccessors":true,"injectCss":false,"cssEjectDelay":100,"native":false,"importAdapterName":"___SVELTE_HMR_HOT_API_PROXY_ADAPTER","noOverlay":false}, Component: U5Bslugu5D, ProxyAdapter: _home_alex_Documents_note_archiver_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_5__["adapter"], acceptable: true, preserveLocalState: false, emitCss: false, }); }
/* harmony default export */ __webpack_exports__["default"] = (U5Bslugu5D);



/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vW3NsdWddLnN2ZWx0ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFVNkY7O0FBQ2xDO0FBQzdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0MzQiw0RUFVSztHQVRKLDRFQVFNO0dBUEosNEVBRU07R0FESiw0RUFBMEI7O0dBQ3RCLDRFQUVBO0dBREosNEVBQTBCOztHQUN0Qiw0RUFFQTtHQURKLDRFQUEwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzJCQTNCeEIsR0FBSTs7Z0NBQVksR0FBRyxJQUFDLEVBQUU7OztnQ0FBM0IsTUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQUFDLEdBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQkFLeUIsR0FBQyxNQUFHLENBQUM7Ozs7Ozs7Ozs7d0JBUW5CLEdBQUcsSUFBQyxJQUFJLEdBQUcsSUFBSTs7Ozs7eUJBQ2YsR0FBRyxJQUFDLElBQUksR0FBRyxRQUFROzs7Ozs7Ozs7Ozs7OztxRUFUWCxPQUFLOzs7OztxRUFLK0YsVUFBUTs7O3FFQUdsSSxlQUFhOzs7O3FFQUNiLGVBQWE7Ozs7Ozs7Ozs7Ozs7Ozs7dUZBVFMsT0FBSzs7Ozs7Ozs7Ozs7Ozs7OztvRkFLK0YsVUFBUTs7Ozs7cUZBR2xJLGVBQWE7Ozs7OztxRkFDYixlQUFhOzs7Ozs7Ozs7OytHQVZOLEdBQUcsSUFBQyxJQUFJLEdBQUcsS0FBSzs7Ozs7Ozs7O3NHQU04RCxHQUFHLElBQUMsSUFBSSxHQUFHLEtBQUs7Ozs7Ozs7Ozs7Ozs7O0dBVDdHLDRFQWdCSztHQWZKLDRFQWNNO0dBYkosNEVBSU07R0FISiw0RUFBd0M7O0dBQ3hDLDRFQUE0Qzs7OztHQUc5Qyw0RUFPTTtHQUxKLDRFQUF5STs7O0dBR3pJLDRFQUFxQzs7OztHQUNyQyw0RUFBeUM7Ozs7Ozs7O3FJQVYvQixHQUFHLElBQUMsSUFBSSxHQUFHLEtBQUs7Ozs7NERBQ0ssR0FBQyxNQUFHLENBQUM7O3NFQUtvRCxHQUFHLElBQUMsSUFBSSxHQUFHLEtBQUs7Ozs7OERBR3ZGLEdBQUcsSUFBQyxJQUFJLEdBQUcsSUFBSTtnRUFDZixHQUFHLElBQUMsSUFBSSxHQUFHLFFBQVE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0VBcEJ6QixHQUFJOzs7ZUFLakIsR0FBSTs7Ozs7Ozs7Ozs7cUVBRkgsWUFBVTs0RUFBQyxHQUFFO3FFQUFDLEdBQUM7OEVBQUMsR0FBSTs7Ozs7Ozs7Ozs7O3FGQUFwQixZQUFVOzRGQUFDLEdBQUU7cUZBQUMsR0FBQzs4RkFBQyxHQUFJOzs7Ozs7Ozs7Ozs7Ozs7O0dBQXhCLDRFQUE4Qjs7Ozs7O0dBQzlCLDRFQWtDSzs7Ozs4RkF0Q1csR0FBSTs7Ozt5R0FHTCxHQUFFOzZHQUFHLEdBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQTFCRCxPQUFPLEdBQUcsTUFBTTtTQUN2QixFQUFFLEVBQUMsSUFBSSxLQUFLLE1BQU07VUFDMUIsRUFBRSxFQUFDLElBQUk7Ozs7OztLQU1ULElBQUk7T0FJSyxFQUFFO09BQ0YsSUFBSTs7Q0FDZixzREFBTztRQUNBLENBQUMsR0FBRyxnRUFBSyxDQUFDLHFFQUFVLENBQUMsdUVBQVksQ0FBQyw2REFBRyxlQUFlLEVBQUUsV0FBVyxJQUFJLFdBQVksa0VBQU8sQ0FBQyxNQUFNO1FBQy9GLGFBQWEsU0FBUyxrRUFBTyxDQUFDLENBQUM7a0JBQzdDLElBQUksR0FBRyxhQUFhLENBQUMsSUFBSSIsImZpbGUiOiIxZTgzOWQwYjcyNmJiM2Q2M2ZkOC90b3BpY3NfJGlkJDkzX25vdGVzXyQ5MXNsdWcudG9waWNzXyRpZCQ5M19ub3Rlc18kOTFzbHVnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBjb250ZXh0PSdtb2R1bGUnPlxuICAgIGV4cG9ydCBhc3luYyBmdW5jdGlvbiBwcmVsb2FkKHsgcGFyYW1zLCAgfSkge1xuICAgICAgICAgICBjb25zdCB7IGlkLHNsdWcgfSA9IHBhcmFtcztcbiAgIHJldHVybiB7aWQsc2x1Z31cbiAgIFxuICAgICAgIH1cbiAgIDwvc2NyaXB0PlxuXG4gICA8c2NyaXB0PlxuICAgICBsZXQgZG9jc1xuICAgICAgIGltcG9ydCB7IGNvbGxlY3Rpb24sIHF1ZXJ5LCBnZXRGaXJlc3RvcmUsIGdldERvY3Msb3JkZXJCeSB9IGZyb20gXCJmaXJlYmFzZS9maXJlc3RvcmVcIjtcbmltcG9ydCB7IGFwcCB9IGZyb20gXCIuLi8uLi8uLi8uLi9jb21wb25lbnRzL2NvbmZpZy5zdmVsdGVcIjtcbmltcG9ydCB7b25Nb3VudH0gZnJvbSAnc3ZlbHRlJ1xuICAgICAgIGV4cG9ydCBsZXQgaWRcbiAgICAgICBleHBvcnQgbGV0IHNsdWdcbiAgICAgICBvbk1vdW50KGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgcSA9IHF1ZXJ5KGNvbGxlY3Rpb24oZ2V0RmlyZXN0b3JlKGFwcCkgLGBzdWJqZWN0cy8ke2lkfS90b3BpY3MvJHtzbHVnfS9ub3Rlc2AgKSwgb3JkZXJCeShcImRhdGVcIikpXG4gICAgICAgIGNvbnN0IHF1ZXJ5U25hcHNob3QgPSBhd2FpdCBnZXREb2NzKHEpO1xuZG9jcyA9IHF1ZXJ5U25hcHNob3QuZG9jc1xuXG4gICAgICAgfSlcbiAgIDwvc2NyaXB0PlxuICAgPHN2ZWx0ZTpoZWFkPlxuICAgIDx0aXRsZT5cbiAgICAgTm90ZXM6IFRvcGljIHtzbHVnfVxuICAgIDwvdGl0bGU+XG4gIDwvc3ZlbHRlOmhlYWQ+XG4gICA8aDY+Tm90ZXMgb24gOntpZH06e3NsdWd9PC9oNj5cbiAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiB7I2lmIGRvY3N9XG4gICB7I2VhY2ggZG9jcyBhcyBkb2MgLCBpKGRvYy5pZCl9XG4gICA8ZGl2IGNsYXNzPVwiY29sIHMxMiBtNlwiPlxuICAgIDxkaXYgY2xhc3M9XCJjYXJkXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1pbWFnZVwiPlxuICAgICAgICA8aW1nIHNyYz17ZG9jLmRhdGEoKS5pbWFnZX0gIGFsdD0nZm9vJy8+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiY2FyZC10aXRsZVwiPlBhZ2U6e2kgKyAxfTwvc3Bhbj5cbiAgICAgICBcbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImNhcmQtY29udGVudFwiPlxuXG4gICAgICAgIDxhIGNsYXNzPVwiYnRuLWZsb2F0aW5nIGhhbGZ3YXktZmFiIHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodCByZWRcIiAgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj17ZG9jLmRhdGEoKS5pbWFnZX0gZG93bmxvYWQ9J215LWZsaWUnPkRvd25sb2FkPC9hPlxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIDxwPlVwbG9hZGVkIG9uIDp7ZG9jLmRhdGEoKS5kYXRlfTwvcD5cbiAgICAgICAgPHA+VXBsb2FkZWQgQnkgOntkb2MuZGF0YSgpLnVzZXJuYW1lfTwvcD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgIHsvZWFjaH1cbiAgIHs6ZWxzZX1cbiAgIDxkaXYgY2xhc3M9XCJwcmVsb2FkZXItd3JhcHBlciBiaWcgYWN0aXZlXCI+XG4gICAgPGRpdiBjbGFzcz1cInNwaW5uZXItbGF5ZXIgc3Bpbm5lci1ibHVlLW9ubHlcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGUtY2xpcHBlciBsZWZ0XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGVcIj48L2Rpdj5cbiAgICAgIDwvZGl2PjxkaXYgY2xhc3M9XCJnYXAtcGF0Y2hcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZVwiPjwvZGl2PlxuICAgICAgPC9kaXY+PGRpdiBjbGFzcz1cImNpcmNsZS1jbGlwcGVyIHJpZ2h0XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGVcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiB7L2lmfVxuICA8L2Rpdj4iXSwic291cmNlUm9vdCI6IiJ9