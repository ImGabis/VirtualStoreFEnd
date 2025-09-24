import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import ThemeToggle from '../components/ThemeToggle';
import SearchBar from '../components/SearchBar';
import FilterSortBar from '../components/FilterSortBar';
import productsData from '../data/products';

const Home = () => {
  const [products, setProducts] = useState(productsData);
  const [cart, setCart] = useState([]);
  const [theme, setTheme] = useState("light");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("");
  const [showCart, setShowCart] = useState(false);

  const navigate = useNavigate();

  const handleAddToCart = (productToAdd) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productToAdd.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...productToAdd, quantity: 1 }];
      }
    });
  };

  const handleIncrement = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      ).filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));
  const toggleCart = () => setShowCart(!showCart);

  const total = cart.reduce((sum, prod) => sum + (prod.price * prod.quantity), 0);
  const totalItems = cart.reduce((sum, prod) => sum + prod.quantity, 0);

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) =>
      minPrice ? product.price >= parseInt(minPrice) : true
    )
    .filter((product) =>
      maxPrice ? product.price <= parseInt(maxPrice) : true
    )
    .filter((product) =>
      category ? product.category === category : true
    )
    .sort((a, b) => {
      switch (sortOption) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  return (
    <div className={`app ${theme}`}>
      <Header totalItems={totalItems} onCartClick={toggleCart} />
      {/* <ThemeToggle theme={theme} toggleTheme={toggleTheme} /> */}
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <FilterSortBar
        sortOption={sortOption}
        setSortOption={setSortOption}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        category={category}
        setCategory={setCategory}
      />
      <ProductList products={filteredProducts} onAddToCart={handleAddToCart} />
      
      {showCart && (
        <Cart 
          cartItems={cart} 
          onClose={toggleCart} 
          onRemove={handleRemoveFromCart}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          total={total}
          onPay={() => { navigate("/pago", { state: { carrito: cart, total } }) }}
        />
      )}
    </div>
  );
};

export default Home;