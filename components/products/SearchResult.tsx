"use client";
import React from "react";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

function SearchResult() {
  const data = [
    {
      id: "1",
      name: "Samsung Galaxy S22 Ultra",
      description:
        "Experience the next level of innovation with the Samsung Galaxy S22 Ultra. Its revolutionary camera system, powerful performance, and stunning design redefine smartphone excellence.",
      brand: "Samsung",
      category: "Electronics",
      subcategories: ["Mobile Phones"],
      price: 1399.99,
      discount: 7,
      images: [
        "https://m.media-amazon.com/images/I/71J8tz0UeJL._AC_UF1000,1000_QL80_.jpg",
        "https://images.samsung.com/is/image/samsung/p6pim/in/2401/gallery/in-galaxy-s24-s928-sm-s928bztcins-thumb-539573311?imwidth=480",
      ],
      stock: 200,
      attributes: {
        "Operating System": "Android 12",
        Storage: "512GB",
        RAM: "16GB",
        "Screen Size": "6.8 inches",
        Camera: "200MP + 12MP + 10MP Triple Camera",
        Battery: "5000mAh",
        Color: "Phantom Silver",
        Network: "5G",
        Processor: "Exynos 2200 Octa-Core",
      },
      reviews: [
        {
          user: "MobileEnthusiast",
          rating: 5,
          comment:
            "Absolutely fantastic phone! The camera quality is unmatched.",
        },
        {
          user: "TechReviewer123",
          rating: 4.5,
          comment: "Impressive performance and stunning display.",
        },
      ],
      rating: 4.75,
    },
    {
      id: "2",
      name: "iPhone 14 Pro",
      description:
        "Introducing the iPhone 14 Pro, where innovation meets elegance. With its advanced features, sleek design, and intuitive user experience, it sets a new standard for smartphones.",
      brand: "Apple",
      category: "Electronics",
      subcategories: ["Mobile Phones"],
      price: 1499.99,
      discount: 0,
      images: [
        "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-Pro-iPhone-14-Pro-Max-space-black-220907-geo_inline.jpg.large.jpg",
        "https://i.gadgets360cdn.com/products/large/Apple-iPhone-14-Pro-MaxDB-390x800-1662580432.jpg?downsize=*:360",
      ],
      stock: 150,
      attributes: {
        "Operating System": "iOS 16",
        Storage: "1TB",
        RAM: "8GB",
        "Screen Size": "6.7 inches",
        Camera: "12MP + 12MP + 12MP Triple Camera",
        Battery: "4200mAh",
        Color: "Graphite",
        Network: "5G",
        Processor: "A16 Bionic",
      },
      reviews: [
        {
          user: "AppleLover456",
          rating: 5,
          comment:
            "Amazing phone! The performance and camera quality are top-notch.",
        },
        {
          user: "TechGuru2024",
          rating: 4.5,
          comment: "Great value for money. Apple never disappoints.",
        },
      ],
      rating: 4.75,
    },
    {
      id: "3",
      name: "Google Pixel 7 Pro",
      description:
        "Explore new possibilities with the Google Pixel 7 Pro. Featuring an exceptional camera system, smooth performance, and innovative features, it's designed to enhance your mobile experience.",
      brand: "Google",
      category: "Electronics",
      subcategories: ["Mobile Phones"],
      price: 1099.99,
      discount: 5,
      images: [
        "https://wp-pa.phonandroid.com/uploads/2024/01/Google-Pixel-7-Pro.jpg",
        "https://www.digitaltrends.com/wp-content/uploads/2022/12/google-pixel-7-pro-revisit-4.jpg?p=1",
      ],
      stock: 180,
      attributes: {
        "Operating System": "Android 12",
        Storage: "256GB",
        RAM: "8GB",
        "Screen Size": "6.5 inches",
        Camera: "50MP + 12MP Dual Camera",
        Battery: "4500mAh",
        Color: "Sorta Sage",
        Network: "5G",
        Processor: "Google Tensor",
      },
      reviews: [
        {
          user: "PixelFanatic2023",
          rating: 4.5,
          comment:
            "Love the clean Android experience and the camera quality is impressive.",
        },
        {
          user: "TechEnthusiast99",
          rating: 4,
          comment: "Great phone overall, but battery life could be better.",
        },
      ],
      rating: 4.25,
    },
    {
      id: "4",
      name: "OnePlus 10 Pro",
      description:
        "Experience the power of speed with the OnePlus 10 Pro. With its blazing-fast performance, stunning display, and flagship camera system, it's designed to exceed expectations.",
      brand: "OnePlus",
      category: "Electronics",
      subcategories: ["Mobile Phones"],
      price: 1199.99,
      discount: 8,
      images: [
        "https://fdn.gsmarena.com/imgroot/news/21/11/oneplus-10-specs/-1200/gsmarena_001.jpg",
        "https://mobilewaves.com.bd/storage/uploads/all/PhOGbMWptZk1nnjQQIyOIzLj6o22FhSnQ3WmdzVP.jpg",
      ],
      stock: 120,
      attributes: {
        "Operating System": "OxygenOS (Based on Android 12)",
        Storage: "512GB",
        RAM: "12GB",
        "Screen Size": "6.9 inches",
        Camera: "50MP + 48MP + 8MP Triple Camera",
        Battery: "5000mAh",
        Color: "Morning Mist",
        Network: "5G",
        Processor: "Snapdragon 8 Gen 2",
      },
      reviews: [
        {
          user: "OnePlusFan123",
          rating: 5,
          comment:
            "Fast, smooth, and the camera is incredible! OnePlus never disappoints.",
        },
        {
          user: "TechReviewer2024",
          rating: 4.5,
          comment:
            "Excellent phone with top-notch performance and build quality.",
        },
      ],
      rating: 4.75,
    },
    {
      id: "5",
      name: "Xiaomi Mi 12",
      description:
        "Unleash the future with Xiaomi Mi 12. Packed with cutting-edge features, superior performance, and an advanced camera setup, it redefines smartphone excellence.",
      brand: "Xiaomi",
      category: "Electronics",
      subcategories: ["Mobile Phones"],
      price: 999.99,
      discount: 6,
      images: [
        "https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1666598531.28686121!500x500.png",
        "https://www.mobiledokan.co/wp-content/uploads/2021/11/Xiaomi-12-1-500x500.jpg",
      ],
      stock: 150,
      attributes: {
        "Operating System": "MIUI 13 (Based on Android 12)",
        Storage: "256GB",
        RAM: "12GB",
        "Screen Size": "6.8 inches",
        Camera: "108MP + 50MP + 20MP Triple Camera",
        Battery: "4800mAh",
        Color: "Cosmic Black",
        Network: "5G",
        Processor: "Snapdragon 8 Gen 2",
      },
      reviews: [
        {
          user: "MiFanatic2023",
          rating: 4.5,
          comment:
            "Fantastic phone with excellent performance and camera quality.",
        },
        {
          user: "TechEnthusiast456",
          rating: 4,
          comment:
            "Great value for money, but software updates could be more consistent.",
        },
      ],
      rating: 4.25,
    },
    {
      id: "6",
      name: "Sony Xperia 5 III",
      description:
        "Experience cinematic excellence with the Sony Xperia 5 III. With its professional-grade camera system, immersive display, and sleek design, it's perfect for entertainment and creativity.",
      brand: "Sony",
      category: "Electronics",
      subcategories: ["Mobile Phones"],
      price: 1099.99,
      discount: 5,
      images: [
        "https://m.media-amazon.com/images/I/6132y3QPcnL._AC_UF894,1000_QL80_.jpg",
        "https://kaleidoscope.scene7.com/is/image/OttoUK/600w/Sony-Xperia-5-V-Mobile-Phone---Platinum-Silver~75R941FRSP.jpg",
      ],
      stock: 100,
      attributes: {
        "Operating System": "Android 12",
        Storage: "256GB",
        RAM: "8GB",
        "Screen Size": "6.1 inches",
        Camera: "12MP + 12MP + 12MP Triple Camera",
        Battery: "4500mAh",
        Color: "Frosted Black",
        Network: "5G",
        Processor: "Snapdragon 888",
      },
      reviews: [
        {
          user: "SonyLover789",
          rating: 5,
          comment:
            "Excellent phone with superb camera performance and audio quality.",
        },
        {
          user: "TechEnthusiast789",
          rating: 4.5,
          comment:
            "Great phone overall, but a bit pricey compared to the competition.",
        },
      ],
      rating: 4.75,
    },
    {
      id: "7",
      name: "Realme GT 2 Pro",
      description:
        "Unleash the power of speed with Realme GT 2 Pro. Its flagship performance, stunning display, and advanced camera system redefine the smartphone experience.",
      brand: "Realme",
      category: "Electronics",
      subcategories: ["Mobile Phones"],
      price: 899.99,
      discount: 10,
      images: [
        "https://rukminim2.flixcart.com/image/850/1000/l3rmzrk0/mobile/c/c/o/-original-imagetmegwtng3xg.jpeg?q=90&crop=false",
        "https://www.gadgetsinnepal.com.np/wp-content/uploads/2021/12/realme-gt2-pro-price-in-nepal.jpg",
      ],
      stock: 200,
      attributes: {
        "Operating System": "Realme UI 3 (Based on Android 12)",
        Storage: "256GB",
        RAM: "12GB",
        "Screen Size": "6.7 inches",
        Camera: "108MP + 8MP + 2MP Triple Camera",
        Battery: "5000mAh",
        Color: "Lunar Gray",
        Network: "5G",
        Processor: "Snapdragon 8 Gen 1",
      },
      reviews: [
        {
          user: "RealmeFan456",
          rating: 4.5,
          comment: "Great phone with amazing performance and fast charging.",
        },
        {
          user: "TechReviewer567",
          rating: 4,
          comment:
            "Impressive specs for the price, but software updates could be faster.",
        },
      ],
      rating: 4.25,
    },
    {
      id: "8",
      name: "Oppo Find X5 Pro",
      description:
        "Experience the future of photography with Oppo Find X5 Pro. Its revolutionary camera system, premium design, and powerful performance redefine smartphone excellence.",
      brand: "Oppo",
      category: "Electronics",
      subcategories: ["Mobile Phones"],
      price: 1299.99,
      discount: 8,
      images: [
        "https://www.cnet.com/a/img/resize/f36f59b0168e1991214947aab5522e7d531b80ce/hub/2022/02/23/770aa07e-784e-41ff-8b11-1cc7e81ed99b/oppo-find-x5-pro-cnet-review-12.jpg?auto=webp&fit=crop&height=900&width=1200",
        "https://www.androidauthority.com/wp-content/uploads/2022/02/Oppo-Find-X5-Pro-in-hand-back.jpg",
      ],
      stock: 180,
      attributes: {
        "Operating System": "ColorOS 13 (Based on Android 12)",
        Storage: "512GB",
        RAM: "12GB",
        "Screen Size": "6.78 inches",
        Camera: "50MP + 50MP + 13MP Triple Camera",
        Battery: "5000mAh",
        Color: "Glacial Blue",
        Network: "5G",
        Processor: "Snapdragon 8 Gen 1",
      },
      reviews: [
        {
          user: "OppoFan789",
          rating: 4.5,
          comment: "Amazing camera quality and stunning design.",
        },
        {
          user: "TechEnthusiast2024",
          rating: 4,
          comment: "Great phone overall, but the UI could be more intuitive.",
        },
      ],
      rating: 4.25,
    },
    {
      id: "9",
      name: "Nokia X100",
      description:
        "Relive the legend with Nokia X100. Combining durability, performance, and affordability, it's the perfect companion for everyday adventures.",
      brand: "Nokia",
      category: "Electronics",
      subcategories: ["Mobile Phones"],
      price: 699.99,
      discount: 10,
      images: [
        "https://cdn1.smartprix.com/rx-iOiYWRuyc-w420-h420/nokia-x100-5g.jpg",
        "https://assets.mspimages.in/gear/wp-content/uploads/2020/04/Nokia-9-PureView-2.jpg",
      ],
      stock: 250,
      attributes: {
        "Operating System": "Android 12",
        Storage: "128GB",
        RAM: "6GB",
        "Screen Size": "6.5 inches",
        Camera: "48MP + 8MP + 5MP Triple Camera",
        Battery: "4500mAh",
        Color: "Midnight Sun",
        Network: "5G",
        Processor: "Snapdragon 690",
      },
      reviews: [
        {
          user: "NokiaFanatic2023",
          rating: 4,
          comment:
            "Solid build quality and decent performance at an affordable price.",
        },
        {
          user: "TechEnthusiast101",
          rating: 4.5,
          comment:
            "Great value for money, but camera performance could be better.",
        },
      ],
      rating: 4.25,
    },
    {
      id: "10",
      name: "Asus ROG Phone 6",
      description:
        "Unleash your gaming potential with the Asus ROG Phone 6. Designed for gaming enthusiasts, it combines powerful performance, innovative features, and immersive gaming experiences.",
      brand: "Asus",
      category: "Electronics",
      subcategories: ["Mobile Phones"],
      price: 1199.99,
      discount: 5,
      images: [
        "https://dlcdnwebimgs.asus.com/gain/B46BEF43-3A3C-4A30-B73A-7A1434566EC8",
        "https://d2xamzlzrdbdbn.cloudfront.net/products/23fff611-22ad-4733-821c-eaa4baaf3b2e23220802.jpg",
      ],
      stock: 120,
      attributes: {
        "Operating System": "ROG UI (Based on Android 12)",
        Storage: "512GB",
        RAM: "16GB",
        "Screen Size": "6.78 inches",
        Camera: "64MP + 13MP Dual Camera",
        Battery: "6000mAh",
        Color: "Phantom Black",
        Network: "5G",
        Processor: "Snapdragon 8 Gen 1",
      },
      reviews: [
        {
          user: "GamingEnthusiast123",
          rating: 5,
          comment:
            "The ultimate gaming phone! Amazing performance and gaming features.",
        },
        {
          user: "TechReviewer456",
          rating: 4.5,
          comment:
            "Impressive specs and great for gaming, but it's a bit bulky.",
        },
      ],
      rating: 4.75,
    },
  ];

  return (
    <main>
      <motion.header
        className="font-bold text-xl mb-8"
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: 10 }}
        transition={{
          type: "spring",
          duration: 1,
          delay: 1,
        }}
      >
        Search Result here
      </motion.header>
      <div className="search-result grid grid-cols-4 gap-10">
        {data.map((d, index) => (
          <ProductCard
            key={`product-card-${index}`}
            name={d.name}
            category={d.category}
            imgUrl={d.images[0]}
            price={d.price}
            rating={d.rating}
            index={index}
          />
        ))}
      </div>
    </main>
  );
}

export default SearchResult;
