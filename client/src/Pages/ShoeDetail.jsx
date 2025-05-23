import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import useProductStore from "../Store/productStore";
import { Notyf } from "notyf";

function ShoeDetail() {
  const notyf = new Notyf();
  const [product, setProduct] = useState();
  const { addToCart, cart } = useProductStore();
  // const [isAdded, setIsAdded] = useState(false);

  const { id } = useParams();

  useEffect(
    function () {
      let isMounted = true;
      async function fetchProduct() {
        try {
          const res = await fetch(`http://localhost:3000/api/products/${id}`);
          if (!res.ok) {
            console.log("Something went wrong!");
          }
          const data = await res.json();
          if (isMounted) {
            setProduct(data.product);
          }
        } catch (error) {
          console.log(error.message);
        }
      }
      fetchProduct();

      return function () {
        isMounted = false;
        setProduct();
      };
    },
    [id]
  );

  function handleAddToCart(product) {
    notyf.success("Product Added to Cart!");
    addToCart(product);
    // setIsAdded(true);
  }

  if (!product) {
    return (
      <div className="flex h-screen justify-center items-center">
        <p className="text-lg font-semibold text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar logo="full-logo2.png" />
      <div className="container mx-auto  md:px-10 flex justify-center items-center h-[600px]">
        <div className="grid grid-cols-1 md:grid-cols-2  items-center px-20">
          {/* Product Image */}
          <div className="flex justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-w-md rounded-lg shadow-lg object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Product Name and Price */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-800">
                {product.name}
              </h1>
              <p className="text-xl font-semibold text-gray-600">
                Rs. {product.price}
              </p>
            </div>

            {/* Product Description */}
            <p className="text-gray-500">
              This place is for the description of the Shoe which was
              unfortunately not added in the Schema of the product🥲
            </p>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition">
                Buy Now
              </button>
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg shadow-lg transition"
                onClick={() => handleAddToCart(product)}
                // disabled={isAdded}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShoeDetail;
