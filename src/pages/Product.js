import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/pages/Product.module.css";
import { useLocation } from "react-router-dom";
import Remove from "@mui/icons-material/Remove";
import Add from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux";

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [color, setColor] = useState([]);
  const [size, setSize] = useState();
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/products/${id}`
        );
        setProduct(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [id]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/products/${id}`
        );
        setProduct(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [id]);

  const handleColor = (col) => {
    setColor(col);
  };

  const handleQuantity = (type) => {
    if (type === "decrease") {
      quantity > 0 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleSize = (e) => {
    setSize(e.target.value);
  };

  const handleAddToCart = () => {
    dispatch(addProduct({ ...product, quantity, color, size }));
  };

  return (
    <div>
      <Navbar />
      <div className={styles.wrapper}>
        <div className={styles.imgContainer}>
          <img src={product.img} className={styles.img} />
        </div>
        <div className={styles.infoContainer}>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.desc}>{product.desc}</p>
          <span className={styles.price}>Ksh {product.price}</span>

          <div className={styles.filterContainer}>
            <div className={styles.filter}>
              <span className={styles.filterTitle}>Color</span>
              {product.color?.map((color) => (
                <div
                  className={styles.colorFilter}
                  style={{ backgroundColor: color }}
                  key={color}
                  onClick={() => handleColor(color)}
                ></div>
              ))}
            </div>
            <div className={styles.filter}>
              <span className={styles.filterTitle}>Size</span>
              <select className={styles.sizeFilter} onChange={handleSize}>
                {product.size?.map((size) => (
                  <option key={size}>{size}</option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.addContainer}>
            <div className={styles.amountContainer}>
              <Remove onClick={() => handleQuantity("decrease")} />
              <span className={styles.amount}>{quantity}</span>
              <Add onClick={() => handleQuantity("increase")} />
            </div>
            <button onClick={handleAddToCart} className={styles.button}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;