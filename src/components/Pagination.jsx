import React, { useState, useEffect } from "react";
import "./Pagination.css";
const Pagination = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getData = async () => {
      try {
        let response = await fetch("https://dummyjson.com/products?limit=100");
        let data = await response.json();
        // console.log(data);
        if (data && data.products) {
          setProducts(data.products);
        }
      } catch (error) {
        console.log(`Error occurd: ${error}`);
      }
    };
    getData();
  }, []);

  const selectPageHandler = (selectedPage) => {
    setPage(selectedPage);
  };

  const prevPage = () => {
    setPage((page) => (page === 1 ? 1 : page - 1));
  };

  const nextPage = () => {
    setPage((page) =>
      page === Math.ceil(products.length / 10) ? page : page + 1
    );
  };
  return (
    <>
      {products.length > 0 && (
        <div className="container">
          {products.slice(page * 10 - 10, page * 10).map((item) => {
            return (
              <div key={item.id} className="item-container">
                <div className="img__container">
                  <img className="img" src={item.thumbnail} alt={item.title} />
                  <button className="btn">Buy</button>
                </div>

                <h3 className="title">{item.title}</h3>
                <p className="price">
                  Price: <span className="original__price">{item.price} $</span>
                  <span className="discount">{item.discountPercentage}$</span>
                </p>
                <p className="category">Category: {item.category}</p>

                {/* <p className="description">{item.description}</p> */}
              </div>
            );
          })}
        </div>
      )}

      {products.length > 0 && (
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
              onClick={() => {
                selectPageHandler(i + 1);
              }}
            >
              {i + 1}
            </span>
          ))}
          <span
            className={`next__page ${
              page < products.length / 10 ? "" : "pagination__disable"
            }`}
            onClick={nextPage}
          >
            👉
          </span>
        </div>
      )}
    </>
  );
};

export default Pagination;

// dummyjson.com/products?limit=100
