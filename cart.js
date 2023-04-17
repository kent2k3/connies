
// Shopping Cart


var shoppingCart = (function () {

    cart = [];

    // Constructorssss
    function Item(name, price, count) {
        this.name = name;
        this.price = price;
        this.count = count;
    }

    // Save cart
    function saveCart() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    // Load cart
    function loadCart() {
        cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
        loadCart();
    }


    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};

    // Add to cart
    obj.addItemToCart = function (name, price, count) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart[item].count++;
                saveCart();
                return;
            }
        }
        var item = new Item(name, price, count);
        cart.push(item);
        saveCart();
    }
    // Set count from item
    obj.setCountForItem = function (name, count) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count;
                break;
            }
        }
    };
    // Remove item from cart
    obj.removeItemFromCart = function (name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart[item].count--;
                if (cart[item].count === 0) {
                    cart.splice(item, 1);
                }
                break;
            }
        }
        saveCart();
    }

    // Remove all items from cart
    obj.removeItemFromCartAll = function (name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart.splice(item, 1);
                break;
            }
        }
        saveCart();
    }

    // Clear cart
    obj.clearCart = function () {
        cart = [];
        saveCart();
    }

    // Count cart 
    obj.totalCount = function () {
        var totalCount = 0;
        for (var item in cart) {
            totalCount += cart[item].count;
        }
        return totalCount;
    }

    // Total cart
    obj.totalCart = function () {
        var totalCart = 0;
        for (var item in cart) {
            totalCart += cart[item].price * cart[item].count;
        }
        return Number(totalCart.toFixed(2));
    }

    // List cart
    obj.listCart = function () {
        var cartCopy = [];
        for (i in cart) {
            item = cart[i];
            itemCopy = {};
            for (p in item) {
                itemCopy[p] = item[p];

            }
            itemCopy.total = Number(item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy)
        }
        return cartCopy;
    }

    // cart : Array
    // Item : Object/Class
    // addItemToCart : Function
    // removeItemFromCart : Function
    // removeItemFromCartAll : Function
    // clearCart : Function
    // countCart : Function
    // totalCart : Function
    // listCart : Function
    // saveCart : Function
    // loadCart : Function
    return obj;
})();


// *****************************************
// Triggers / Events
// ***************************************** 
// Add item
$('.add-to-cart').click(function (event) {
    event.preventDefault();
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
});

// Clear items
$('.clear-cart').click(function () {
    shoppingCart.clearCart();
    displayCart();
});


function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";

    if (cartArray.length > 0) {
        output += "<form>"
            + "<label for='name'>Name:</label>"
            + "<input type='text' id='name' name='name'><br><br>"
            + "<label for='email'>Email:</label>"
            + "<input type='email' id='email' name='email'><br><br>"
            + "<label for='phone'>Phone Number:</label>"
            + "<input type='tel' id='phone' name='phone'><br><br>"
            + "</form>"
    }

    for (var i in cartArray) {
        output += "<tr>"
            + "<td>" + cartArray[i].name + "</td>"
            + "<td>(" + cartArray[i].price + ")</td>"
            + "<td><div class='input-group'>"
            + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
            + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
            //+ " = " 
            + "<td>" + cartArray[i].total + "</td>"
    }

    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
}

// Delete item button

$('.show-cart').on("click", ".delete-item", function (event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
})


// -1
$('.show-cart').on("click", ".minus-item", function (event) {
    var name = $(this).data('name');
    var item = shoppingCart.getItemFromCart(name);

    if (item.count > 0) {
        shoppingCart.removeItemFromCart(name);
        displayCart();
    }
});
// +1
$('.show-cart').on("click", ".plus-item", function (event) {
    var name = $(this).data('name')
    shoppingCart.addItemToCart(name);
    displayCart();
})

// Item count input
$('.show-cart').on("change", ".item-count", function (event) {
    var name = $(this).data('name');
    var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
});

displayCart();


// "Order Now" button click event
$('#order-now-btn').click(function () {
    var cartArray = shoppingCart.listCart();
    var output = "";

    // Check if cart is empty
    if (cartArray.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Get form details
    var name = $('#name').val();
    var email = $('#email').val();
    var phone = $('#phone').val();

    // Build output string for cart items
    output += "<table class='table'>"
        + "<thead>"
        + "<tr>"
        + "<th>Product</th>"
        + "<th>Price</th>"
        + "<th>Quantity</th>"
        + "<th>Subtotal</th>"
        + "</tr>"
        + "</thead>"
        + "<tbody>";

    for (var i in cartArray) {
        output += "<tr>"
            + "<td>" + cartArray[i].name + "</td>"
            + "<td>" + cartArray[i].price + "</td>"
            + "<td>" + cartArray[i].count + "</td>"
            + "<td>" + cartArray[i].total + "</td>"
            + "</tr>";
    }

    output += "</tbody>"
        + "</table>"
        + "<p>Total price: $" + shoppingCart.totalCart() + "</p>";

    // Display modal with form details and cart items
    $('#cart').modal('hide');
    $('#order-details').modal('show');
    $('#order-details .modal-body').html("<p>Thank you for your order, " + name + "!</p><p>Phone number: " + phone + "</p><p>Email: " + email + "</p>" + output);
    $('#order-details .modal-footer button').click(function () {
        // Reload page after closing modal
        location.reload();
    });
});

// Clear items
$('#close').click(function () {
    shoppingCart.clearCart();
    displayCart();
});