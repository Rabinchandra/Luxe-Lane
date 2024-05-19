"use client";

import AnimatedComponent from "@/components/AnimatedComponent";
import { UserAuthContext } from "@/context/UserAuthContext";
import ICompareProductItem from "@/interface/ICompareProductItem";
import { IProduct } from "@/interface/IProduct";
import ProductComparisonService from "@/services/productComparisonService";
import { getProductById } from "@/services/productService";
import React, { useContext, useEffect, useState } from "react";
import DOMPurify from "dompurify";

function ProductComparison() {
  const { user } = useContext(UserAuthContext);
  const [compareItems, setCompareItems] = useState<IProduct[]>([]);
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAIResponse] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    console.log("api key", process.env.GEMINI_API_KEY);
    if (user) {
      ProductComparisonService.getProducts(user).then(
        (res: ICompareProductItem[]) => {
          console.log("Result", res);
          // for each compare item, fetch all the detail of each item
          Promise.all(res.map((item) => getProductById(item.id))).then(
            (itemsResult) => {
              setCompareItems(itemsResult as IProduct[]);
            }
          );
        }
      );
    }
  }, [user]);

  const onSubmitUserInput = () => {
    setLoading(true);

    ProductComparisonService.suggest(compareItems, userInput).then(
      (htmlString) => {
        const sanitizedHtml = DOMPurify.sanitize(htmlString);
        setAIResponse(sanitizedHtml);
        setLoading(false);
      }
    );
  };

  function formatTextWithBold(text: string) {
    // Replace starting '**' with '<b>'
    text = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
    return text;
  }

  return (
    <div className="mx-24 mb-24">
      <section className="mt-14">
        <AnimatedComponent>
          <h1 className="text-3xl font-bold">Product Comparison</h1>
        </AnimatedComponent>
        <AnimatedComponent _delay={0.5}>
          <p className="my-6">There are 2 items in your cart</p>
        </AnimatedComponent>
      </section>
      <section className="items-list flex align-bottom py-8">
        {compareItems.map((item, index) => (
          <AnimatedComponent
            _delay={Number("0." + index)}
            key={"product-compare-items-" + index}
          >
            <div className="text-center mx-8">
              <img src={item.images[0]} alt="" className="mx-auto h-[100px]" />
              <span className="block font-bold mt-2">{item.name}</span>
              <small>${item.price}</small>
            </div>
          </AnimatedComponent>
        ))}
      </section>

      {/*  */}
      <section className="smart-suggestion mt-14 mx-2">
        <AnimatedComponent _delay={2.2}>
          <header className="text-xl font-bold bg-gray-100 inline-block px-5 py-3 rounded-3xl mb-5">
            Smart Suggestion
          </header>
        </AnimatedComponent>
        <AnimatedComponent _delay={2.6}>
          <p className="text-sm text-gray-500 font-extralight mx-5">
            "Smart Suggestions leverages advanced AI algorithms to recommend
            personalized product options based on your preferences, budget, and
            purpose. Discover tailored recommendations to streamline your
            shopping experience and find the perfect fit for your needs."
          </p>
        </AnimatedComponent>
        {/* Chat with AI */}
        <section className="mt-14">
          <AnimatedComponent>
            <header className="font-bold text-xl my-4">Chat</header>
          </AnimatedComponent>
          <AnimatedComponent>
            <div className="chat-box h-[450px] overflow-scroll mb-8 bg-gray-50 p-8 rounded-xl">
              {isLoading ? (
                "Loading"
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: formatTextWithBold(aiResponse),
                  }}
                  className="leading-7"
                />
              )}
            </div>
          </AnimatedComponent>
          <div>
            <AnimatedComponent>
              <h1 className="font-bold text-xl mb-3">
                Customize Your Input for Recommendations
              </h1>
            </AnimatedComponent>
            <AnimatedComponent>
              <div className="customize-input flex space-x-4">
                <input
                  type="number"
                  placeholder="Minimum Budget"
                  className="text-sm border-[1px] px-4 py-3  inline-block rounded-2xl"
                />
                <input
                  type="number"
                  placeholder="Maximum Budget"
                  className="text-sm border-[1px] px-4 py-3  inline-block rounded-2xl"
                />
                <input
                  type="text"
                  placeholder="Purpose"
                  className="text-sm border-[1px] px-4 py-3  inline-block rounded-2xl"
                />
              </div>
            </AnimatedComponent>
          </div>

          <AnimatedComponent>
            <div className="mt-4 flex align-middle space-x-3">
              <input
                type="text"
                placeholder="Ask your question regarding the products for suggestion"
                className="text-sm border-[1px] px-4 py-3 rounded-2xl block flex-1"
                onChange={(e) => setUserInput(e.target.value)}
              />

              <div
                className="send bg-black text-white px-8 py-4 rounded-2xl cursor-pointer"
                onClick={onSubmitUserInput}
              >
                {isLoading ? "Analyzing..." : "Ask"}
              </div>
            </div>
          </AnimatedComponent>
        </section>
      </section>
    </div>
  );
}

export default ProductComparison;
