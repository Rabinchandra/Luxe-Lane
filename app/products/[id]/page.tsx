import React from "react";

function ProductDetail({ params }: { params: { id: string } }) {
  const id = params.id;
  return <div>Product Detail: {id}</div>;
}

export default ProductDetail;
