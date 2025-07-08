import React, { useState, useEffect } from "react";
import "./Pagination.css";

const Pagination = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=100");
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getData();
  }, []);

  const selectPageHandler = (selectedPage) => {
    setPage(selectedPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prevPage = () => {
    if (page > 1) selectPageHandler(page - 1);
  };

  const nextPage = () => {
    const totalPages = Math.ceil(products.length / 10);
    if (page < totalPages) selectPageHandler(page + 1);
  };

  return (
    <div className="app">
      <h1 className="heading">Product Pagination App</h1>

      <div className="container">
        {products.slice((page - 1) * 10, page * 10).map((item) => (
          <div key={item.id} className="item-container">
            <div className="img__container">
              <img className="img" src={item.thumbnail} alt={item.title} />
              <button className="btn">Buy</button>
            </div>
            <h3 className="title">{item.title}</h3>
            <p className="price">
              Price: <span className="original__price">${item.price}</span>
              <span className="discount">{item.discountPercentage}% off</span>
            </p>
            <p className="category">Category: {item.category}</p>
          </div>
        ))}
      </div>

      <div className="pagination">
        <span
          className={`prev__page ${page === 1 ? "pagination__disable" : ""}`}
          onClick={prevPage}
        >
          👈
        </span>
        {[...Array(Math.ceil(products.length / 10))].map((_, i) => (
          <span
            className={`page__number ${page === i + 1 ? "active" : ""}`}
            key={i}
            onClick={() => selectPageHandler(i + 1)}
          >
            {i + 1}
          </span>
        ))}
        <span
          className={`next__page ${
            page === Math.ceil(products.length / 10)
              ? "pagination__disable"
              : ""
          }`}
          onClick={nextPage}
        >
          👉
        </span>
      </div>
    </div>
  );
};

export default Pagination;
