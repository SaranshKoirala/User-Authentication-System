import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import PageNotFound from "./Pages/PageNotFound";
import ShoeDetail from "./Pages/ShoeDetail";
import Products from "./Pages/Products";
import Cart from "./Pages/Cart";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ShoeDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
