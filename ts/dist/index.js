"use strict";
var Status;
(function (Status) {
    Status["Pending"] = "pending";
    Status["Published"] = "published";
})(Status || (Status = {}));
const product = {
    name: "Shampoo",
    price: 2.99,
    images: ["image-1.png", "image-2.png"],
    status: Status.Published,
};
