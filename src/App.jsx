import { useState, useEffect } from "react";
import './App.css';

function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [addedItemId, setAddedItemId] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [feedback, setFeedback] = useState({ name: "", email: "", message: "", rating: "" });
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const items = [
    { id: 1, name: "Chocolate Cake", price: 15, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587" },
    { id: 2, name: "Strawberry Cake", price: 18, image: "https://images.unsplash.com/photo-1464306076886-da185f6a9d05" },
    { id: 3, name: "Vanilla Cupcake", price: 8, image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d" },
    { id: 4, name: "Chocolate Donut", price: 6, image: "https://images.unsplash.com/photo-1551024601-bec78aea704b" },
    { id: 5, name: "Butter Cookies", price: 5, image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e" },
    { id: 6, name: "Fudge Brownie", price: 10, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c" },
    { id: 7, name: "Cheesecake Slice", price: 20, image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad" },
    { id: 8, name: "Butter Croissant", price: 7, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff" },
    { id: 9, name: "French Macarons", price: 12, image: "https://images.unsplash.com/photo-1558326567-98ae2405596b" },
    { id: 10, name: "Pancakes Stack", price: 9, image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93" },
    { id: 11, name: "Blueberry Muffin", price: 6, image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa" },
    { id: 12, name: "Red Velvet Cake", price: 16, image: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f" },
    { id: 17, name: "Chocolate Eclair", price: 9, image: "https://images.unsplash.com/photo-1612201143403-4b1c1f8c4f05" },
    { id: 18, name: "Cinnamon Roll", price: 8, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff" },
    { id: 19, name: "Fruit Tart", price: 12, image: "https://images.unsplash.com/photo-1464306076886-da185f6a9d05" },
    { id: 20, name: "Birthday Cake", price: 25, image: "https://images.unsplash.com/photo-1559628233-100c798642d4" },
  ];

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if (isOnline) {
      fetch("https://jsonplaceholder.typicode.com/comments?_limit=20")
       .then(res => res.json())
       .then(data => setReviews(data))
       .catch(() => setReviews([]));
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isOnline]);

  const addToCart = (item) => {
    setCart([...cart, item]);
    setAddedItemId(item.id);
    setTimeout(() => setAddedItemId(null), 1000);
  };

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i!== index);
    setCart(newCart);
  };

  const totalBill = cart.reduce((sum, item) => sum + item.price, 0);

  const handleSubmitOrder = () => {
    setOrderPlaced(true);
    setCart([]);
    setTimeout(() => setOrderPlaced(false), 3000);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (feedback.name && feedback.email && feedback.message && feedback.rating) {
      setFeedbackSubmitted(true);
      setFeedback({ name: "", email: "", message: "", rating: "" });
      setTimeout(() => setFeedbackSubmitted(false), 3000);
    }
  };

  if (!isOnline) {
    return (
      <div style={styles.offlineContainer}>
        <h1 style={styles.offlineTitle}>No Internet Connection</h1>
        <p style={styles.offlineText}>Please check your internet connection and try again.</p>
      </div>
    );
  }

  return (
    <div style={styles.body}>

      <div style={styles.navbar}>
        <h1 style={styles.logo}>SWEET BAKERY</h1>
        <div style={styles.navButtons}>
          <button
            style={page === "home"? styles.activeNavBtn : styles.navBtn}
            onClick={() => setPage("home")}
          >
            Home
          </button>
          <button
            style={page === "about"? styles.activeNavBtn : styles.navBtn}
            onClick={() => setPage("about")}
          >
            About
          </button>
          <button
            style={page === "items"? styles.activeNavBtn : styles.navBtn}
            onClick={() => setPage("items")}
          >
            Items
          </button>
          <button
            style={page === "cart"? styles.activeNavBtn : styles.navBtn}
            onClick={() => setPage("cart")}
          >
            Cart ({cart.length})
          </button>
          <button
            style={page === "feedback"? styles.activeNavBtn : styles.navBtn}
            onClick={() => setPage("feedback")}
          >
            Feedback
          </button>
          <button
            style={page === "customers"? styles.activeNavBtn : styles.navBtn}
            onClick={() => setPage("customers")}
          >
            Customer Reviews
          </button>
        </div>
      </div>

      {page === "home" && (
        <div style={styles.center}>
          <h1 style={styles.heading}>Welcome to Sweet Bakery</h1>
          <p style={styles.text}>
            Welcome to Sweet Bakery. We have been serving fresh, soft, and delicious baked goods for over 15 years.
            Our mission is to make every celebration sweeter with high quality desserts made from premium ingredients.
          </p>
          <p style={styles.text}>
            Whether it is a birthday, anniversary, or just a craving for something sweet, we have the perfect dessert for every occasion.
            Every item is baked fresh daily in our certified kitchen with strict hygiene standards.
          </p>
          <p style={styles.text}>
            We deliver to over 50 countries with 24/7 customer support and a 100 percent satisfaction guarantee.
            Sweet Bakery is your trusted partner for all bakery needs.
          </p>
        </div>
      )}

      {page === "about" && (
        <div style={styles.center}>
          <h1 style={styles.heading}>About Us</h1>
          <p style={styles.text}>
            Sweet Bakery started in 2010 as a small home bakery. Today we are a global brand with 25 outlets and over 200 skilled bakers.
            Our team prepares more than 5000 desserts every day using international baking techniques.
          </p>
          <p style={styles.text}>
            We never compromise on quality. All our products are made using premium ingredients sourced from trusted suppliers.
            Our chefs are trained in French, Italian, and American baking methods to ensure authentic taste and texture.
          </p>
          <p style={styles.text}>
            Our vision is to bring sweetness to every home. We provide affordable pricing, fast delivery, and custom cake design services.
            Your happiness is our biggest success.
          </p>
        </div>
      )}

      {page === "items" && (
        <div style={styles.center}>
          <h1 style={styles.heading}>Bakery Items</h1>
          <div style={styles.grid}>
            {items.map((item) => (
              <div key={item.id} style={styles.card}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={styles.img}
                  onError={(e) => e.target.src = "https://via.placeholder.com/200x160?text=Image+Not+Found"}
                />
                <h3 style={styles.itemName}>{item.name}</h3>
                <p style={styles.price}>${item.price}</p>
                <button
                  style={addedItemId === item.id? styles.addedBtn : styles.addBtn}
                  onClick={() => addToCart(item)}
                >
                  {addedItemId === item.id? "Added" : "Add to Cart"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {page === "cart" && (
        <div style={styles.center}>
          <h1 style={styles.heading}>Your Cart</h1>
          {cart.length === 0? (
            <p style={styles.text}>Your cart is empty</p>
          ) : (
            <>
              {cart.map((item, i) => (
                <div key={i} style={styles.cartItem}>
                  <span>{item.name} - ${item.price}</span>
                  <button style={styles.removeBtn} onClick={() => removeFromCart(i)}>Remove</button>
                </div>
              ))}
              <h2 style={styles.total}>Total Bill: ${totalBill}</h2>
              <button style={styles.submitBtn} onClick={handleSubmitOrder}>Submit Order</button>
              {orderPlaced && <p style={styles.success}>Order Successful. Thank you for shopping with us.</p>}
            </>
          )}
        </div>
      )}

      {page === "feedback" && (
        <div style={styles.center}>
          <h1 style={styles.heading}>Feedback and Contact</h1>
          <div style={styles.contactBox}>
            <h3>Contact Information</h3>
            <p><strong>Email:</strong> support@sweetbakery.com</p>
            <p><strong>Phone:</strong> +1 800 555 1234</p>
            <p><strong>Address:</strong> 123 Baker Street, New York, NY 10001, USA</p>
            <p><strong>Working Hours:</strong> Monday to Sunday, 9:00 AM to 9:00 PM</p>
          </div>

          <form onSubmit={handleFeedbackSubmit} style={styles.feedbackForm}>
            <h3>Submit Your Feedback</h3>
            <input
              type="text"
              placeholder="Enter your name"
              value={feedback.name}
              onChange={(e) => setFeedback({...feedback, name: e.target.value})}
              style={styles.input}
              required
            />
            <input
              type="email"
              placeholder="Enter your email"
              value={feedback.email}
              onChange={(e) => setFeedback({...feedback, email: e.target.value})}
              style={styles.input}
              required
            />
            <textarea
              placeholder="Write your message here"
              value={feedback.message}
              onChange={(e) => setFeedback({...feedback, message: e.target.value})}
              style={styles.textarea}
              required
            />

            <p style={styles.ratingLabel}>How was your experience with our bakery items?</p>
            <div style={styles.ratingGroup}>
              {["Excellent", "Good", "Average", "Poor", "Terrible"].map((rating) => (
                <label key={rating} style={styles.ratingOption}>
                  <input
                    type="radio"
                    name="rating"
                    value={rating}
                    checked={feedback.rating === rating}
                    onChange={(e) => setFeedback({...feedback, rating: e.target.value})}
                    required
                  />
                  {rating}
                </label>
              ))}
            </div>

            <button type="submit" style={styles.submitBtn}>Submit Feedback</button>
            {feedbackSubmitted && <p style={styles.success}>Feedback submitted successfully. Thank you!</p>}
          </form>
        </div>
      )}

      {page === "customers" && (
        <div style={styles.center}>
          <h1 style={styles.heading}>Customer Reviews</h1>
          <p style={styles.text}>Here are reviews from our valued customers:</p>
          <div style={styles.grid}>
            {reviews.map((rev) => (
              <div key={rev.id} style={styles.reviewCard}>
                <h4 style={styles.reviewer}>{rev.name}</h4>
                <p style={styles.reviewEmail}>{rev.email}</p>
                <p style={styles.reviewText}>{rev.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

const styles = {
  body: {
    fontFamily: "'Poppins', Arial, sans-serif",
    background: "#fff0f5",
    minHeight: "100vh",
    color: "#2c2c2c",
  },

  navbar: {
    background: "#ff7aa2",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },

  logo: {
    color: "white",
    fontWeight: "900",
    fontSize: "24px",
  },

  navButtons: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },

  navBtn: {
    background: "white",
    color: "#ff7aa2",
    border: "none",
    padding: "8px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },

  activeNavBtn: {
    background: "#d6336c",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "700",
  },

  center: {
    textAlign: "center",
    padding: "30px 20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },

  heading: {
    color: "#d6336c",
    marginBottom: "20px",
  },

  text: {
    fontSize: "16px",
    lineHeight: "1.7",
    color: "#333",
    marginBottom: "15px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    padding: "20px",
  },

  card: {
    background: "white",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },

  img: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
    borderRadius: "10px",
  },

  itemName: {
    color: "#2c2c2c",
    margin: "10px 0 5px",
  },

  price: {
    color: "#d6336c",
    fontWeight: "700",
    fontSize: "18px",
  },

  addBtn: {
    background: "#ff7aa2",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    marginTop: "10px",
    width: "100%",
  },

  addedBtn: {
    background: "#28a745",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    marginTop: "10px",
    width: "100%",
  },

  cartItem: {
    background: "white",
    padding: "12px",
    margin: "10px auto",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-between",
    maxWidth: "500px",
  },

  removeBtn: {
    background: "#ff4d4d",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  total: {
    color: "#d6336c",
    marginTop: "20px",
  },

  submitBtn: {
    background: "#28a745",
    color: "white",
    border: "none",
    padding: "12px 25px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "16px",
    marginTop: "15px",
  },

  success: {
    color: "green",
    fontWeight: "700",
    marginTop: "15px",
    fontSize: "18px",
  },

  contactBox: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    maxWidth: "500px",
    margin: "20px auto",
    textAlign: "left",
  },

  feedbackForm: {
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    maxWidth: "600px",
    margin: "20px auto",
    textAlign: "left",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    boxSizing: "border-box",
  },

  textarea: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    minHeight: "100px",
    boxSizing: "border-box",
    resize: "vertical",
  },

  ratingLabel: {
    fontWeight: "600",
    marginBottom: "10px",
  },

  ratingGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "20px",
  },

  ratingOption: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
  },

  reviewCard: {
    background: "white",
    padding: "15px",
    borderRadius: "12px",
    textAlign: "left",
    boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
  },

  reviewer: {
    color: "#d6336c",
    marginBottom: "5px",
  },

  reviewEmail: {
    color: "#666",
    fontSize: "14px",
    marginBottom: "8px",
  },

  reviewText: {
    color: "#333",
    lineHeight: "1.6",
  },

  offlineContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "#fff0f5",
    textAlign: "center",
    padding: "20px",
  },

  offlineTitle: {
    color: "#d6336c",
    fontSize: "28px",
    marginBottom: "15px",
  },

  offlineText: {
    color: "#333",
    fontSize: "18px",
  },
};

export default App;
