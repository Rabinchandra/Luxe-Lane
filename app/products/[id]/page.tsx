"use client";
import React, { useEffect, useState, useContext } from "react";
import { getProductById } from "@/services/productService";
import { IProduct } from "@/interface/IProduct";
import Numeral from "react-numeral";
import AddToFavoriteButton from "@/components/product-detail/AddToFavoriteButton";
import { Rate } from "antd";
import RelatedProductsItems from "@/components/RelatedProducts";
import AnimatedComponent from "@/components/AnimatedComponent";
import Image from "next/image";
import { UserAuthContext } from "@/context/UserAuthContext";
import Cart from "@/services/cartServices";
import { ICartItem } from "@/interface/ICartItem";
import { CartContext } from "@/context/CartContext";
import ProductComparisonService from "@/services/productComparisonService";
import { message } from "antd";
import ReviewService from "@/services/reviewServices";
import { Modal } from "antd";

type Params = {
  params: {
    id: string;
  };
};

function ProductDetail({ params }: Params) {
  const id = params.id;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [product, setProduct] = useState<IProduct | null>(null);
  const [quantity, setQuantity] = useState(0);
  const { user } = useContext(UserAuthContext);
  const { cart, setCart } = useContext(CartContext);
  const [messageApi, contextHolder] = message.useMessage();
  const [reviewText, setReviewText] = useState("");
  // Review Modal
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  // fixing async await problem on client side
  useEffect(() => {
    scrollTo(0, 0);
    // Get the product from the firebase by product
    getProductById(id).then((res) => setProduct(res));
  }, []);

  useEffect(() => {
    if (cart && cart.length > 0 && product) {
      const currentCart = cart.find((c) => c.id == product.id);
      setQuantity(currentCart?.quantity || 0);
    }
  }, [user, product, cart]);

  // Antd error message
  const error = (msg: string) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };

  // Antd success message
  const success = (msg: string) => {
    messageApi.open({
      type: "success",
      content: msg,
    });
  };

  // Increment Quantity / Cart
  const incrementQuantity = () => {
    // Extract the neccessary attributes
    const cartItem: ICartItem = {
      id: product?.id || "",
      name: product?.name || "",
      images: product?.images || [],
      price: product?.price || 0,
      quantity: quantity,
    };

    if (user && cartItem.id !== "") {
      setQuantity(quantity + 1);
      Cart.addToCart(user, quantity + 1, cartItem);
    } else {
      console.log("Login!!");
    }
  };

  const decrementQuantity = () => {
    const currentCartProduct = cart.find((c) => c.id == product?.id);

    setQuantity(quantity - 1);
    if (user && currentCartProduct) {
      setQuantity(quantity - 1);
      Cart.removeFromCart(user, quantity - 1, currentCartProduct);
    } else {
      console.log("Login!!");
    }
  };

  const handleAddToComparison = () => {
    if (user && product) {
      ProductComparisonService.addToComparison(user, product)
        .then((msg) => success(`${msg}`))
        .catch((err) => error(err));
    }
  };

  function convertStringToObject(input: string): { [key: string]: string } {
    const lines = input.split("\n");
    const obj: { [key: string]: string } = {};

    lines.forEach((line) => {
      const [keyPart, valuePart] = line.split(":").map((part) => part.trim());
      const key = keyPart.replace(/^\*?\s*/, ""); // Remove leading '* ' or '*' and spaces
      const value = valuePart.replace(/^"|"$/g, ""); // Remove surrounding quotes if any
      obj[key] = value;
    });

    return obj;
  }

  const handleAddReview = () => {
    setModalText("Adding your review...");
    showModal();
    ReviewService.analyse(reviewText)
      .then((res) => {
        const obj = convertStringToObject(res);

        if (obj.status == "appropriate") {
          handleCancel();
          success("Your review is sucessfully added!");
          // Push the review in productObj
          product?.reviews.push({
            user: user?.displayName || "Anonymous",
            rating: 3,
            comment: reviewText,
          });
        } else {
          setModalText("Sorry! Your review cannot be added. " + obj.feedback);
        }
      })
      .catch((err) => {
        setModalText(
          "Sorry! Something went wrong. Please make sure that your review is appropriate"
        );
      });
  };

  // Review Modal Functions
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="product-detail">
      {contextHolder}
      <AnimatedComponent _delay={0}>
        <header className="text-slate-400 font-extralight text-sm mt-8 mx-14">
          Home / {product?.category} / {product?.subcategories[0]}
        </header>
      </AnimatedComponent>

      <main className="mt-16 flex justify-between mx-32">
        {/* Image */}
        <section className="image">
          <AnimatedComponent _delay={2}>
            <div
              className=" bg-center bg-contain bg-no-repeat current-image"
              style={{
                backgroundImage: `url(${product?.images[currentImageIndex]})`,
              }}
            ></div>
          </AnimatedComponent>
          {/* Images */}
          <div className="all-images flex justify-center space-x-10 mt-8">
            {product?.images.map((img, index) => (
              <AnimatedComponent _delay={3 + index / 2}>
                <img
                  src={img}
                  className={`h-10 cursor-pointer product-detail-image ${
                    index == currentImageIndex
                      ? "product-detail-active-image"
                      : ""
                  }`}
                  key={"image_" + Math.random()}
                  onClick={() => setCurrentImageIndex(index)}
                />
              </AnimatedComponent>
            ))}
          </div>
        </section>
        {/* Info */}
        <section className="info w-[50%]">
          <AnimatedComponent>
            <div className="text-3xl font-bold">{product?.name}</div>
          </AnimatedComponent>

          <AnimatedComponent _delay={1.3}>
            <div className="my-8 flex align-middle">
              <span className="text-3xl font-bold mr-14 block">
                $ <Numeral value={product?.price} format={"0,0"} />
              </span>
              {/* Add to Cart */}
              {quantity === 0 ? (
                <AnimatedComponent _delay={0}>
                  <button
                    className="btn-secondary text-sm rounded-full w-[130px]"
                    onClick={incrementQuantity}
                  >
                    Add to Cart
                  </button>
                </AnimatedComponent>
              ) : (
                <div className="btn-secondary text-sm rounded-full w-[130px]">
                  <AnimatedComponent _delay={0}>
                    <button
                      className="increment-cart-no pr-2"
                      onClick={incrementQuantity}
                    >
                      <Image src="/plus.png" alt="" width={10} height={10} />
                    </button>
                    <span className="px-3 font-bold">{quantity}</span>

                    <button
                      className="decrement-cart-no pl-2"
                      onClick={decrementQuantity}
                    >
                      <Image src="/minus.png" alt="" width={10} height={10} />
                    </button>
                  </AnimatedComponent>
                </div>
              )}
            </div>
          </AnimatedComponent>

          {/* Add to favorite */}
          <AnimatedComponent _delay={1.6}>
            <AddToFavoriteButton />
          </AnimatedComponent>

          <AnimatedComponent _delay={1.9}>
            <p className="mt-8 leading-7 text-gray-400 font-extralight mb-6">
              {product?.description}
            </p>
          </AnimatedComponent>

          <div className="flex">
            {product?.rating && (
              <AnimatedComponent _delay={1}>
                <Rate
                  allowHalf
                  defaultValue={Number(product?.rating)}
                  disabled
                  className="text-3xl"
                />
              </AnimatedComponent>
            )}{" "}
            <AnimatedComponent _delay={2.6}>
              <span className="block mt-2 ml-5">(2.5K Reviews)</span>
            </AnimatedComponent>
          </div>
          <div className="buttons mt-12 space-x-8 flex">
            <AnimatedComponent _delay={3}>
              <button className="btn-primary buy-now-btn">Buy Now</button>
            </AnimatedComponent>

            <AnimatedComponent _delay={3.3} _style={{ display: "inline" }}>
              <button
                className="btn-secondary compare-product-btn"
                onClick={handleAddToComparison}
              >
                Compare Product
              </button>
            </AnimatedComponent>
          </div>
        </section>

        {/* Related Products */}
      </main>
      <AnimatedComponent _delay={0}>
        <div className="related-products ml-32 mt-32 mb-16 overflow animation-element">
          <RelatedProductsItems currentObjectID={product?.objectID || ""} />
        </div>
      </AnimatedComponent>

      <section className="mx-32 pb-16 flex justify-between">
        <div className="product-more-detail w-[45%]">
          <AnimatedComponent>
            <h2 className="text-3xl font-bold">Product Details</h2>
          </AnimatedComponent>
          <table className="mt-14">
            {Object.entries(product?.attributes || {}).map((attribute) => (
              <tr>
                <td className="font-extrabold">
                  <AnimatedComponent>{attribute[0]}</AnimatedComponent>
                </td>
                <td className="font-extralight text-gray-700">
                  <AnimatedComponent>{attribute[1]}</AnimatedComponent>
                </td>
              </tr>
            ))}
          </table>
        </div>
        <div className="customer-reviews w-[45%]">
          <AnimatedComponent>
            <h2 className="text-3xl font-bold mb-14">Customer Products</h2>
          </AnimatedComponent>
          {product?.reviews.map((review) => (
            <AnimatedComponent>
              <div className="review mb-8 w-[80%] flex space-x-6">
                <div>
                  <div
                    className="review-user-img w-[50px] h-[50px] rounded-full flex-1 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://img.freepik.com/free-photo/freedom-concept-with-hiker-mountain_23-2148107064.jpg)`,
                    }}
                  ></div>
                </div>
                <div>
                  <h2 className="my-1 font-bold">{review.user}</h2>
                  <Rate
                    allowHalf
                    defaultValue={Number(review?.rating)}
                    disabled
                    className="text-sm"
                  />
                  <p className="font-extralight text-sm mt-3">
                    {review.comment}
                  </p>
                </div>
              </div>
            </AnimatedComponent>
          ))}

          <div className="current-user-review mx-10">
            <textarea
              placeholder="Type your review here"
              className="border-b-[1px] p-2 w-[100%] block outline-none"
              onChange={(e) => setReviewText(e.target.value)}
            />
            <Rate allowHalf className="mt-4 rate" />
            <button
              className="btn-secondary mt-7 block"
              onClick={handleAddReview}
            >
              Add Review
            </button>
          </div>

          <Modal
            style={{ top: 150 }}
            title="Review Status"
            open={open}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <p>{modalText}</p>
          </Modal>
        </div>
      </section>
    </div>
  );
}

export default ProductDetail;
