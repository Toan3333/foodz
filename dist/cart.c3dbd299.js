// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"app/cart.js":[function(require,module,exports) {
var cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
var showCart = document.querySelector("#showCart");
var sumMoney = document.querySelector("#sumMoney");
// show cart
function renderCart() {
  showCart.innerHTML = "";
  cart.forEach(function (item) {
    var template = "<tr id=\"carts\">\n      <td class=\"pro-thumnail\">\n        <img src=\"".concat(item.image, "\" alt=\"\" />\n      </td>\n      <td class=\"pro-title\">\n        <a href=\"#\">").concat(item.name, "</a>\n      </td>\n      <td class=\"pro-price\">$ ").concat(item.price, "</td>\n      <td class=\"pro-quantity\">\n        <button class=\"sub\" data-id=\"").concat(item.id, "\">-</button>\n        <span>").concat(item.qty, "</span>\n        <button class=\"plus\" data-id=\"").concat(item.id, "\">+</button>\n      </td>\n      <td class=\"pro-subtotal\">$ ").concat(item.qty * item.price, "</td>\n      <td class=\"pro-remove\">\n        <button class=\"delete-btn\" data-id=\"").concat(item.id, "\">\n          <i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i> Remove\n        </button>\n      </td>\n    </tr>");
    showCart.insertAdjacentHTML("beforeend", template);
  });
  total();
}
renderCart();

// tổng tiền
function total() {
  var sum = 0;
  cart.forEach(function (item) {
    sum += item.price * item.qty;
  });
  sumMoney.innerHTML = "Grand total: $".concat(sum);
}
// xoá sản phẩm
showCart.addEventListener("click", function (e) {
  if (e.target.matches(".delete-btn")) {
    var id = e.target.getAttribute("data-id");
    console.log(id);
    // tìm index
    var index = cart.findIndex(function (item) {
      return item.id == id;
    });
    cart.splice(index, 1);
    // đổ dữ liệu từ local ra bên ngoài
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    total();
  }
});
// Tăng số lượng
showCart.addEventListener("click", function (e) {
  if (e.target.matches(".plus")) {
    var id = e.target.getAttribute("data-id");
    console.log(id);
    var index = cart.findIndex(function (item) {
      return item.id == id;
    });
    cart[index].qty += 1;
    // đổ dữ liệu từ local ra bên ngoài
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    total();
  }
});
// Giảm số lượng
showCart.addEventListener("click", function (e) {
  if (e.target.matches(".sub")) {
    var id = e.target.getAttribute("data-id");
    console.log(id);
    var index = cart.findIndex(function (item) {
      return item.id == id;
    });
    if (cart[index].qty > 1) {
      cart[index].qty -= 1;
    } else {
      cart.splice(index, 1);
    }

    // đổ dữ liệu từ local ra bên ngoài
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    total();
  }
});

// import cartService from "./services/cartService";
// import JsonServerConstants from "./constants/JsonServerConstants";

// const cartApi = new cartService(JsonServerConstants.EndPoint);
// const showCart = document.querySelector("#showCart");
// let totalPrice = 0;

// let totalShow = document.querySelector("#total");

// showCart.addEventListener("click", handleDeleteCart);
// showCart.addEventListener("change", handleQuantityChange);

// function updateTotalPrice() {
//   totalPrice = calculateTotalPrice(); // Uncomment this line
//   console.log("Total Price:", totalPrice);

//   // Set the formatted total price to the total.textContent
//   totalShow.textContent = `Grand Total: ${totalPrice}`;
// }

// async function handleDeleteCart(e) {
//   if (e.target.classList.contains("delete-btn")) {
//     const id = e.target.getAttribute("data-id");
//     try {
//       const deletedItem = await cartApi.DeleteCart(id);
//       const productRow = e.target.closest("tr");
//       productRow.remove();
//       totalPrice -= deletedItem.price;
//       updateTotalPrice();
//     } catch (error) {
//       console.error("Error deleting product:", error);
//     }
//   }
// }

// function renderCart(item) {
//   const template = `<tr id="carts">
//     <td class="pro-thumnail">
//       <img src="${item.image}" alt="" />
//     </td>
//     <td class="pro-title">
//       <a href="#">${item.name}</a>
//     </td>
//     <td class="pro-price">$ ${item.price}</td>
//     <td class="pro-quantity">
//       <div class="product-detail__quantity">
//         <div class="quantity cart-quantity">
//           <input type="number" value="1" min="1" max="10" data-id="${item.id}" class="quantity-input" />
//         </div>
//       </div>
//     </td>
//     <td class="pro-subtotal">$ ${item.price}</td>
//     <td class="pro-remove">
//       <button class="delete-btn"  data-id="${item.id}">
//         <i class="fa fa-trash-o" aria-hidden="true"></i> Remove
//       </button>
//     </td>
//   </tr>`;
//   showCart.insertAdjacentHTML("beforeend", template);
//   totalPrice += item.price;
//   updateTotalPrice();
// }

// function handleQuantityChange(e) {
//   if (e.target.matches(".quantity-input")) {
//     const newQuantity = parseInt(e.target.value, 10);
//     const itemId = e.target.getAttribute("data-id");

//     cartApi.updateCartItemQuantity(itemId, newQuantity).then((updatedItem) => {
//       const productRow = e.target.closest("tr");
//       const priceElement = productRow.querySelector(".pro-price");
//       const subtotalElement = productRow.querySelector(".pro-subtotal");

//       priceElement.textContent = `$ ${updatedItem.price}`;
//       subtotalElement.textContent = `$ ${(updatedItem.price * newQuantity).toFixed(2)}`;
//       updateTotalPrice();
//     });
//   }
// }

// async function calculateTotalPrice() {
//   let total = 0;
//   const quantityInputs = Array.from(document.querySelectorAll(".quantity-input"));

//   console.log("Quantity Inputs:", quantityInputs);

//   // Use Promise.all to await all promises before continuing
//   await Promise.all(
//     quantityInputs.map(async (input) => {
//       const itemId = input.getAttribute("data-id");
//       const quantity = parseInt(input.value, 10);

//       // Await the promise returned by getCartItemById
//       const item = await cartApi.getCartItemById(itemId);

//       console.log("Item ID:", itemId);
//       console.log("Quantity:", quantity);
//       console.log("Item:", item);

//       // Check if item.price and quantity are valid numbers
//       if (item && !isNaN(item.price) && !isNaN(quantity)) {
//         total += quantity * parseFloat(item.price);
//       }
//     })
//   );

//   console.log("Calculated Total:", total);

//   return total;
// }

// cartApi.findAllCart().then((data) => {
//   data.forEach((item) => {
//     renderCart(item);
//   });
//   // Sau khi đã thêm tất cả sản phẩm vào giỏ hàng, cập nhật tổng tiền
//   updateTotalPrice();
// });
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51284" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app/cart.js"], null)
//# sourceMappingURL=/cart.c3dbd299.js.map