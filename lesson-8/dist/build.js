/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/ErrorComp.js":
/*!********************************!*\
  !*** ./public/js/ErrorComp.js ***!
  \********************************/
/***/ (() => {

eval("Vue.component('error', {\n  data() {\n    return {\n      text: ''\n    };\n  },\n\n  computed: {\n    isVisible() {\n      return this.text !== '';\n    }\n\n  },\n  template: `\n    <div class=\"error-block\" v-if=\"isVisible\">\n        <p>{{ text }}</p>\n        <button class=\"error-close-btn\" @click=\"text=''\">&times;</button>\n    </div>\n    `\n});\n\n//# sourceURL=webpack://lesson-8/./public/js/ErrorComp.js?");

/***/ }),

/***/ "./public/js/cards.js":
/*!****************************!*\
  !*** ./public/js/cards.js ***!
  \****************************/
/***/ (() => {

eval("Vue.component('cards', {\n  data() {\n    return {\n      products: [],\n      filtered: []\n    };\n  },\n\n  mounted() {\n    this.$root.getJson('http://localhost:3000/api/products').then(data => {\n      for (let item of data) {\n        this.$data.products.push(Object.assign({\n          imgPath: `img/pic${item.id}.jpeg`\n        }, item));\n      }\n\n      this.$data.filtered = this.$data.products;\n    }).catch(error => {\n      this.$root.$refs.error.text = 'Connection failed';\n    });\n  },\n\n  template: `\n        <div class=\"featured-items\">\n            <card v-for=\"product of filtered\" :product=\"product\"></card>\n        </div>\n    `\n});\nVue.component('card', {\n  props: ['product'],\n  template: `\n            <div class=\"card-block\">\n                <a href=\"product.html\" class=\"card\">\n                    <img :src=\"product.imgPath\" :alt=\"product.imgPath\" class=\"card-pic\">\n                    <div class=\"text-box\">\n                        <p class=\"card-header\">{{ product.name }}</p>\n                        <p class=\"card-text\">{{ product.description }}</p>\n                        <p class=\"card-price\">\\${{ product.price.toFixed(2) }}</p>\n                    </div>\n                </a>\n                <div class=\"add-box\" @click=\"buy(product)\">\n                    <div class=\"add\">\n                        <img src=\"img/cart.svg\" alt=\"chart\">\n                        <p class=\"add-text\">Add to Cart</p>\n                    </div>\n                </div>\n            </div>\n    `,\n  methods: {\n    postJson(url, data) {\n      return fetch(url, {\n        method: 'POST',\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify(data)\n      }).then(result => result.json()).catch(error => {\n        this.$root.$refs.error.text = 'Connection failed';\n      });\n    },\n\n    buy(product) {\n      this.$root.$refs.cart.countGoods++;\n      this.$root.$refs.cart.amount += product.price;\n      let item = this.$root.$refs.cart.goods.find(element => element.id === product.id);\n\n      if (item) {\n        this.$root.putJson(`http://localhost:3000/api/cart/${item.id}`, {\n          quantity: 1\n        }).then(data => {\n          if (data.result === 1) {\n            item.quantity++;\n          }\n        }).catch(error => {\n          this.$root.$refs.error.text = 'Connection failed';\n        });\n      } else {\n        let cartProduct = Object.assign({\n          quantity: 1\n        }, product);\n        this.postJson(`http://localhost:3000/api/cart`, cartProduct).then(data => {\n          if (data.result === 1) {\n            this.$root.$refs.cart.goods.push(cartProduct);\n          }\n        }).catch(error => {\n          this.$root.$refs.error.text = 'Connection failed';\n        });\n      }\n    }\n\n  }\n});\n\n//# sourceURL=webpack://lesson-8/./public/js/cards.js?");

/***/ }),

/***/ "./public/js/cart.js":
/*!***************************!*\
  !*** ./public/js/cart.js ***!
  \***************************/
/***/ (() => {

eval("Vue.component('cart', {\n  data() {\n    return {\n      countGoods: 0,\n      amount: 0,\n      show: false,\n      goods: []\n    };\n  },\n\n  mounted() {\n    this.$root.getJson('http://localhost:3000/api/cart').then(data => {\n      this.amount = data.amount;\n      this.countGoods = data.countGoods;\n\n      for (let item of data.contents) {\n        this.goods.push(item);\n      }\n    });\n  },\n\n  template: `\n    <div class=\"cart scalable\" @click=\"show = !show\">\n        <img src=\"img/cart.svg\" alt=\"cart\" class=\"no-phone no-phone_pic\">\n        <div class=\"goods no-phone\">{{ countGoods }}</div>\n        <cart-window v-show=\"show\" ref=\"cartWindow\" :cart-items=\"goods\" :amount=\"amount\"></cart-window>\n    </div>\n    `\n});\nVue.component('cart-window', {\n  props: ['cartItems', 'amount'],\n  template: `\n    <div class=\"cartwindow\">\n        <p class=\"total-sum\">Total sum: \\${{ amount }}</p>\n        <cart-item v-for=\"item of cartItems\" :cart-item=\"item\"></cart-item>\n    </div>\n    `\n});\nVue.component('cart-item', {\n  props: ['cartItem'],\n  methods: {\n    removeJson(url, data) {\n      return fetch(url, {\n        method: 'DELETE',\n        body: JSON.stringify(data)\n      }).then(result => result.json()).catch(error => {\n        this.$root.$refs.error.text = 'Connection failed';\n      });\n    },\n\n    deleteProduct(product) {\n      this.$root.$refs.cart.amount -= product.price;\n      this.$root.$refs.cart.countGoods--;\n\n      if (product.quantity > 1) {\n        let item = this.$root.$refs.cart.goods.find(element => element.id === product.id);\n        this.$root.putJson(`http://localhost:3000/api/cart/${item.id}`, {\n          quantity: -1\n        }).then(data => {\n          if (data.result === 1) {\n            item.quantity--;\n          }\n        }).catch(error => {\n          this.$root.$refs.error.text = 'Connection failed';\n        });\n      } else {\n        this.removeJson(`http://localhost:3000/api/cart/${product.id}`).then(data => {\n          if (data.result === 1) {\n            this.$root.$refs.cart.goods.splice(this.$root.$refs.cart.goods.indexOf(product), 1);\n          }\n        }).catch(error => {\n          this.$root.$refs.error.text = 'Connection failed';\n        });\n      }\n    }\n\n  },\n  template: `\n    <div class=\"cart-item\">\n        <img :src=\"cartItem.imgPath\" class=\"cart-img\" :alt=\"cartItem.description\">\n        <div class=\"cart-item-desc\">\n            <h3 class=\"product-title\">{{ cartItem.name }}</h3>\n            <p class=\"product-single-price\">Price: \\${{ cartItem.price }}. Quantity: {{ cartItem.quantity }}.</p>\n        </div>\n        <div class=\"right-block\">\n            <button class=\"del-btn\" @click.prevent = \"deleteProduct(cartItem)\">&times;</button>\n            <p class=\"product-price\">\\${{ cartItem.quantity * cartItem.price }}</p>\n        </div>\n    </div>\n    `\n});\n\n//# sourceURL=webpack://lesson-8/./public/js/cart.js?");

/***/ }),

/***/ "./public/js/main.js":
/*!***************************!*\
  !*** ./public/js/main.js ***!
  \***************************/
/***/ (() => {

eval("const app = new Vue({\n  el: '#app',\n  data: {\n    goodsNum: 0\n  },\n  methods: {\n    getJson(url) {\n      return fetch(url).then(result => result.json()).catch(error => {\n        this.$root.$refs.error.text = 'Connection failed';\n      });\n    },\n\n    putJson(url, data) {\n      return fetch(url, {\n        method: 'PUT',\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify(data)\n      }).then(result => result.json()).catch(error => {\n        this.$root.$refs.error.text = 'Connection failed';\n      });\n    }\n\n  }\n});\n\n//# sourceURL=webpack://lesson-8/./public/js/main.js?");

/***/ }),

/***/ "./public/js/search.js":
/*!*****************************!*\
  !*** ./public/js/search.js ***!
  \*****************************/
/***/ (() => {

eval("Vue.component('search', {\n  data() {\n    return {\n      userSearch: ''\n    };\n  },\n\n  methods: {\n    onInput() {\n      if (this.userSearch === '') {\n        this.$root.$refs.cards.filtered = this.$root.$refs.cards.products;\n      } else {\n        this.$root.$refs.cards.filtered = this.$root.$refs.cards.products.filter(product => new RegExp(this.userSearch, 'i').test(product.name));\n      }\n    }\n\n  },\n  template: `\n            <form action=\"#\" class=\"search-form\">\n                <input type=\"text\" class=\"search-field\" v-model=\"userSearch\" @input=\"onInput\">\n                <button type=\"submit\" class=\"btn-search\">\n                    <img src=\"img/mglass.svg \" alt=\"mglass\" class=\"mgpic scalable\">\n                </button>\n            </form>\n            `\n});\n\n//# sourceURL=webpack://lesson-8/./public/js/search.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	__webpack_modules__["./public/js/main.js"]();
/******/ 	__webpack_modules__["./public/js/cart.js"]();
/******/ 	__webpack_modules__["./public/js/ErrorComp.js"]();
/******/ 	__webpack_modules__["./public/js/search.js"]();
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./public/js/cards.js"]();
/******/ 	
/******/ })()
;