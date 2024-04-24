import { RelatedProducts } from "@algolia/recommend-react";
import recommend from "@algolia/recommend";
import { Rate } from "antd";
import { useState, useEffect } from "react";

const recommendClient = recommend(
  "61K89SD3KF",
  "aca5cb2a6d51386a56dc1e10517e8554"
);
const indexName = "merged";

function RelatedItem({ item }: any) {
  return (
    <div className="w-[260px]">
      <div
        className="image-wrapper h-[270px] w-100 bg-no-repeat bg-contain bg-center"
        style={{ backgroundImage: `url(${item.images[0]})` }}
      ></div>
      <h3 className="text-center mt-4 w-[200px] mx-auto">{item.name}</h3>
      <div className="rating text-center my-2">
        <Rate
          allowHalf
          defaultValue={Number(item.rating)}
          disabled
          className="text-[14px]"
        />
      </div>
    </div>
  );
}

function RelatedProductsItems({
  currentObjectID,
}: {
  currentObjectID: string;
}) {
  return (
    <RelatedProducts
      recommendClient={recommendClient}
      indexName={indexName}
      objectIDs={[currentObjectID]}
      itemComponent={RelatedItem}
      maxRecommendations={8}
    />
  );
}

export default RelatedProductsItems;
