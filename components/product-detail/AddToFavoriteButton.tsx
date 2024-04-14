import React from "react";
import Image from "next/image";

function AddToFavoriteButton() {
  return (
    <div className="border-b-[1.5px] border-gray-400 py-2 inline-block px-1">
      <Image
        src={"/heart.svg"}
        width={20}
        height={20}
        alt="s"
        className="inline-block mt-[-5px] mr-2"
      />
      <span>Add to Favorites</span>
    </div>
  );
}

export default AddToFavoriteButton;
