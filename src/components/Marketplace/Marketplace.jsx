import { useEffect, useState } from "react";
import { ENDPOINTS } from "@/varConstant";
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import ProductCard from "@/components/Shop/ProductCard";

import "./marketplace.css";
import bannerImg from "@/images/banner-market.png";

function Marketplace() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categoryMap = {
    All: "all",
    "Men's": "men's clothing",
    "Women's": "women's clothing",
    Jewelry: "jewelery",
    Electronics: "electronics",
  };

  //run this everytime selectedCategory changes
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const category = categoryMap[selectedCategory];
        const url =
          category === "all"
            ? ENDPOINTS.PRODUCTS
            : `${ENDPOINTS.CATEGORY}/${encodeURIComponent(category)}`;
        const response = await fetch(url);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [selectedCategory]);

  function handleCategoryClick(category) {
    setSelectedCategory(category);
  }

  return (
    <>
      <Header />
      <Hero image={bannerImg} showButton={false} imageClass="marketplace-hero-img" />


      <section className="marketplace-container">
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <>
            <div className="marketplace-header">
              <h2 className="marketplace-title">All Products</h2>
              <div className="marketplace-filters">
                {/* Object.keys here refers to the "All", "Women's", etc */}
                {Object.keys(categoryMap).map(
                  (category) => (
                    <button
                      key={category}
                      className={`filter-btn ${
                        selectedCategory === category ? "active" : ""
                      }`}
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="product-grid">
              {products.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default Marketplace;
