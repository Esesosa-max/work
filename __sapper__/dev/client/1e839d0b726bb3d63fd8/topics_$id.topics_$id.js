(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["topics_$id"],{

/***/ "./src/routes/topics/[id].svelte":
/*!***************************************!*\
  !*** ./src/routes/topics/[id].svelte ***!
  \***************************************/
/*! exports provided: default, preload */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "preload", function() { return preload; });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var _components_config_svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/config.svelte */ "./src/components/config.svelte");
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/firestore */ "./node_modules/firebase/firestore/dist/index.esm.js");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* harmony import */ var _home_alex_Documents_note_archiver_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/svelte-loader/lib/hot-api.js");
/* harmony import */ var _home_alex_Documents_note_archiver_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js */ "./node_modules/svelte-hmr/runtime/proxy-adapter-dom.js");
/* src/routes/topics/[id].svelte generated by Svelte v3.44.1 */





const file = "src/routes/topics/[id].svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[2] = list[i];
	return child_ctx;
}

// (43:8) {:else}
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
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div0, file, 46, 14, 1280);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div1, "class", "circle-clipper left");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div1, file, 45, 12, 1232);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div2, "class", "circle");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div2, file, 48, 14, 1363);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div3, "class", "gap-patch");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div3, file, 47, 18, 1325);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div4, "class", "circle");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div4, file, 50, 14, 1457);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div5, "class", "circle-clipper right");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div5, file, 49, 18, 1408);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div6, "class", "spinner-layer spinner-blue-only");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div6, file, 44, 10, 1174);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div7, "class", "preloader-wrapper big active");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div7, file, 43, 8, 1121);
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
		source: "(43:8) {:else}",
		ctx
	});

	return block;
}

// (27:2) {#if docs}
function create_if_block(ctx) {
	let each_blocks = [];
	let each_1_lookup = new Map();
	let each_1_anchor;
	let each_value = /*docs*/ ctx[1];
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_each_argument"])(each_value);
	const get_key = ctx => /*doc*/ ctx[2].id;
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
			if (dirty & /*id, docs*/ 3) {
				each_value = /*docs*/ ctx[1];
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
		source: "(27:2) {#if docs}",
		ctx
	});

	return block;
}

// (28:8) {#each docs as doc (doc.id)}
function create_each_block(key_1, ctx) {
	let div3;
	let div2;
	let div0;
	let span;
	let t0_value = /*doc*/ ctx[2].id + "";
	let t0;
	let t1;
	let p;
	let t2;
	let t3;
	let div1;
	let a;
	let t4;
	let a_href_value;
	let t5;

	const block = {
		key: key_1,
		first: null,
		c: function create() {
			div3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			span = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("span");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t0_value);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("...");
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			a = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("a");
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])("View Notes");
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			this.h();
		},
		l: function claim(nodes) {
			div3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "DIV", { class: true });
			var div3_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div3);
			div2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div3_nodes, "DIV", { class: true });
			var div2_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div2);
			div0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div2_nodes, "DIV", { class: true });
			var div0_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div0);
			span = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div0_nodes, "SPAN", { class: true });
			var span_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(span);
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(span_nodes, t0_value);
			span_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div0_nodes);
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div0_nodes, "P", {});
			var p_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(p);
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(p_nodes, "...");
			p_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div0_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div2_nodes);
			div1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div2_nodes, "DIV", { class: true });
			var div1_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div1);
			a = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(div1_nodes, "A", { href: true });
			var a_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(a);
			t4 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(a_nodes, "View Notes");
			a_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div1_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			div2_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t5 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(div3_nodes);
			div3_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(span, "class", "card-title");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(span, file, 31, 14, 812);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(p, file, 32, 14, 867);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div0, "class", "card-content white-text");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div0, file, 30, 12, 760);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a, "href", a_href_value = `topics/${/*id*/ ctx[0]}/notes/${/*doc*/ ctx[2].id}`);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(a, file, 35, 14, 949);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div1, "class", "card-action");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div1, file, 34, 12, 909);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div2, "class", "card blue-grey darken-1");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div2, file, 29, 10, 710);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div3, "class", "col s12 m6");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div3, file, 28, 8, 675);
			this.first = div3;
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_hydration_dev"])(target, div3, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(div3, div2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(div2, div0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(div0, span);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(span, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(div0, t1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(div0, p);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(p, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(div2, t3);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(div2, div1);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(div1, a);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(a, t4);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_hydration_dev"])(div3, t5);
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty & /*docs*/ 2 && t0_value !== (t0_value = /*doc*/ ctx[2].id + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data_dev"])(t0, t0_value);

			if (dirty & /*id, docs*/ 3 && a_href_value !== (a_href_value = `topics/${/*id*/ ctx[0]}/notes/${/*doc*/ ctx[2].id}`)) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(a, "href", a_href_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(div3);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(28:8) {#each docs as doc (doc.id)}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let title_value;
	let t;
	let div;
	document.title = title_value = "\n    Topics on:" + /*id*/ ctx[0] + " \n  ";

	function select_block_type(ctx, dirty) {
		if (/*docs*/ ctx[1]) return create_if_block;
		return create_else_block;
	}

	let current_block_type = select_block_type(ctx, -1);
	let if_block = current_block_type(ctx);

	const block = {
		c: function create() {
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("div");
			if_block.c();
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["query_selector_all"])('[data-svelte=\"svelte-16zemzv\"]', document.head);
			head_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(nodes);
			div = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "DIV", { class: true });
			var div_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(div);
			if_block.l(div_nodes);
			div_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["attr_dev"])(div, "class", "row");
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(div, file, 25, 0, 599);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_hydration_dev"])(target, t, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_hydration_dev"])(target, div, anchor);
			if_block.m(div, null);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*id*/ 1 && title_value !== (title_value = "\n    Topics on:" + /*id*/ ctx[0] + " \n  ")) {
				document.title = title_value;
			}

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
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t);
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
	const { id } = params;
	return { id };
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_slots"])('U5Bidu5D', slots, []);
	let docs;
	let { id } = $$props;

	Object(svelte__WEBPACK_IMPORTED_MODULE_3__["onMount"])(async () => {
		const q = Object(firebase_firestore__WEBPACK_IMPORTED_MODULE_2__["query"])(Object(firebase_firestore__WEBPACK_IMPORTED_MODULE_2__["collection"])(await Object(firebase_firestore__WEBPACK_IMPORTED_MODULE_2__["getFirestore"])(_components_config_svelte__WEBPACK_IMPORTED_MODULE_1__["app"]), `subjects/${id}/topics`));
		const querySnapshot = await Object(firebase_firestore__WEBPACK_IMPORTED_MODULE_2__["getDocs"])(q);
		$$invalidate(1, docs = querySnapshot.docs);
	});

	const writable_props = ['id'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<U5Bidu5D> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('id' in $$props) $$invalidate(0, id = $$props.id);
	};

	$$self.$capture_state = () => ({
		preload,
		docs,
		app: _components_config_svelte__WEBPACK_IMPORTED_MODULE_1__["app"],
		collection: firebase_firestore__WEBPACK_IMPORTED_MODULE_2__["collection"],
		query: firebase_firestore__WEBPACK_IMPORTED_MODULE_2__["query"],
		getFirestore: firebase_firestore__WEBPACK_IMPORTED_MODULE_2__["getFirestore"],
		getDocs: firebase_firestore__WEBPACK_IMPORTED_MODULE_2__["getDocs"],
		id,
		onMount: svelte__WEBPACK_IMPORTED_MODULE_3__["onMount"]
	});

	$$self.$inject_state = $$props => {
		if ('docs' in $$props) $$invalidate(1, docs = $$props.docs);
		if ('id' in $$props) $$invalidate(0, id = $$props.id);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [id, docs];
}

class U5Bidu5D extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"] {
	constructor(options) {
		super(options);
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], { id: 0 });

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterComponent", {
			component: this,
			tagName: "U5Bidu5D",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*id*/ ctx[0] === undefined && !('id' in props)) {
			console.warn("<U5Bidu5D> was created without expected prop 'id'");
		}
	}

	get id() {
		throw new Error("<U5Bidu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set id(value) {
		throw new Error("<U5Bidu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

if (module && module.hot) { if (false) {} U5Bidu5D = _home_alex_Documents_note_archiver_node_modules_svelte_loader_lib_hot_api_js__WEBPACK_IMPORTED_MODULE_4__["applyHmr"]({ m: module, id: "\"src/routes/topics/[id].svelte\"", hotOptions: {"preserveLocalState":false,"noPreserveStateKey":["@hmr:reset","@!hmr"],"preserveAllLocalStateKey":"@hmr:keep-all","preserveLocalStateKey":"@hmr:keep","noReload":false,"optimistic":true,"acceptNamedExports":true,"acceptAccessors":true,"injectCss":false,"cssEjectDelay":100,"native":false,"importAdapterName":"___SVELTE_HMR_HOT_API_PROXY_ADAPTER","noOverlay":false}, Component: U5Bidu5D, ProxyAdapter: _home_alex_Documents_note_archiver_node_modules_svelte_hmr_runtime_proxy_adapter_dom_js__WEBPACK_IMPORTED_MODULE_5__["adapter"], acceptable: true, preserveLocalState: false, emitCss: false, }); }
/* harmony default export */ __webpack_exports__["default"] = (U5Bidu5D);



/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLnN2ZWx0ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFRb0Q7QUFDOEI7QUFFaEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdDMUIsNEVBVU07R0FUSiw0RUFRTTtHQVBKLDRFQUVNO0dBREosNEVBQTBCOztHQUN0Qiw0RUFFQTtHQURKLDRFQUEwQjs7R0FDdEIsNEVBRUE7R0FESiw0RUFBMEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsyQkF2QnpCLEdBQUk7O2dDQUFTLEdBQUcsSUFBQyxFQUFFOzs7Z0NBQXhCLE1BQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkFBQyxHQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt3QkFJcUIsR0FBRyxJQUFDLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FFQUM3QixLQUFHOzs7O3FFQUdxQyxZQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7b0ZBSGxELEtBQUc7Ozs7Ozs7O29GQUdxQyxZQUFVOzs7Ozs7Ozs7Ozs7OzsrR0FBbEMsR0FBRSxxQkFBVSxHQUFHLElBQUMsRUFBRTs7Ozs7Ozs7Ozs7R0FQM0MsNEVBV007R0FWSiw0RUFTTTtHQVJKLDRFQUdNO0dBRkosNEVBQXdDOzs7R0FDeEMsNEVBQVU7OztHQUVaLDRFQUdNO0dBRkosNEVBQXlEOzs7Ozs7OERBSi9CLEdBQUcsSUFBQyxFQUFFOzttRkFJYixHQUFFLHFCQUFVLEdBQUcsSUFBQyxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NERBYnBDLEdBQUU7OztlQUlWLEdBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQURYLDRFQThCVTs7OztzRkFqQ0ssR0FBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBckJNLE9BQU8sR0FBRyxNQUFNO1NBQzdCLEVBQUUsS0FBSyxNQUFNO1VBQ1gsRUFBRTs7Ozs7O0tBSVIsSUFBSTtPQUdLLEVBQUU7O0NBRWIsc0RBQU87UUFDQyxDQUFDLEdBQUcsZ0VBQUssQ0FBQyxxRUFBVSxPQUFPLHVFQUFZLENBQUMsNkRBQUcsZUFBZSxFQUFFO1FBQ2xFLGFBQWEsU0FBUyxrRUFBTyxDQUFDLENBQUM7a0JBQ3JDLElBQUksR0FBRyxhQUFhLENBQUMsSUFBSSIsImZpbGUiOiIxZTgzOWQwYjcyNmJiM2Q2M2ZkOC90b3BpY3NfJGlkLnRvcGljc18kaWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IGNvbnRleHQ9J21vZHVsZSc+XG4gZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHByZWxvYWQoeyBwYXJhbXMsICB9KSB7XG5cdFx0Y29uc3QgeyBpZCB9ID0gcGFyYW1zOyAgXG4gICAgcmV0dXJuIHtpZH1cblx0fVxuPC9zY3JpcHQ+XG48c2NyaXB0PlxuICBsZXQgZG9jc1xuICBpbXBvcnQge2FwcH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb25maWcuc3ZlbHRlJ1xuICAgIGltcG9ydCB7IGNvbGxlY3Rpb24sIHF1ZXJ5LCBnZXRGaXJlc3RvcmUsIGdldERvY3MgfSBmcm9tIFwiZmlyZWJhc2UvZmlyZXN0b3JlXCI7XG4gICAgZXhwb3J0IGxldCBpZDtcbiAgICBpbXBvcnQge29uTW91bnR9IGZyb20gJ3N2ZWx0ZSdcbiAgICBvbk1vdW50KGFzeW5jKCkgPT57XG4gICAgICBjb25zdCBxID0gcXVlcnkoY29sbGVjdGlvbihhd2FpdCBnZXRGaXJlc3RvcmUoYXBwKSwgYHN1YmplY3RzLyR7aWR9L3RvcGljc2ApKTtcbmNvbnN0IHF1ZXJ5U25hcHNob3QgPSBhd2FpdCBnZXREb2NzKHEpO1xuZG9jcyA9IHF1ZXJ5U25hcHNob3QuZG9jc1xuXG59KVxuPC9zY3JpcHQ+XG5cbjxzdmVsdGU6aGVhZD5cbiAgPHRpdGxlPlxuICAgIFRvcGljcyBvbjp7aWR9IFxuICA8L3RpdGxlPlxuPC9zdmVsdGU6aGVhZD5cbjxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgeyNpZiBkb2NzfVxuICAgICAgICB7I2VhY2ggZG9jcyBhcyBkb2MgKGRvYy5pZCl9XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wgczEyIG02XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQgYmx1ZS1ncmV5IGRhcmtlbi0xXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1jb250ZW50IHdoaXRlLXRleHRcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjYXJkLXRpdGxlXCI+e2RvYy5pZH08L3NwYW4+XG4gICAgICAgICAgICAgIDxwPi4uLjwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYWN0aW9uXCI+XG4gICAgICAgICAgICAgIDxhIGhyZWY9e2B0b3BpY3MvJHtpZH0vbm90ZXMvJHtkb2MuaWR9YCAgfT5WaWV3IE5vdGVzPC9hPlxuICAgICAgICAgICAgIFxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAgey9lYWNofVxuICAgICAgICB7OmVsc2V9XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwcmVsb2FkZXItd3JhcHBlciBiaWcgYWN0aXZlXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItbGF5ZXIgc3Bpbm5lci1ibHVlLW9ubHlcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGUtY2xpcHBlciBsZWZ0XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGVcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3M9XCJnYXAtcGF0Y2hcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZVwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+PGRpdiBjbGFzcz1cImNpcmNsZS1jbGlwcGVyIHJpZ2h0XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGVcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgey9pZn1cbiAgICA8L2Rpdj4iXSwic291cmNlUm9vdCI6IiJ9