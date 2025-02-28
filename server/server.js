const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require("cors");
const pool = require("./db");
const multer  = require("multer")
const fs = require('fs')
const path = require("path")

const app = express();
app.use(express.json());
app.use(cors());


// Create a new user
app.post('/users', async (req, res) => {
    const { username, email, password, role } = req.body;

    // Validate input
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email, and password are required' });
    }

    try {
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user data into the database
        const result = await pool.query(
            'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
            [username, email, hashedPassword, role]
        );

        // Return success response
        res.status(201).json({
            message: 'Registration successful',
            user: result.rows[0],
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error, please try again later' });
    }
});

// Get all users
app.get("/users", async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM users");
        res.json(allUsers.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


app.get("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Update a user
app.put("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password, role } = req.body;
        await pool.query(
            "UPDATE users SET username = $1, email = $2, password = $3, role = $4 WHERE id = $5",
            [username, email, password, role, id]
        );
        res.json("User updated successfully");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Delete a user
app.delete("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM users WHERE id = $1", [id]);
        res.json("User deleted successfully");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


// user login

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Check if user exists
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

     
        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token (you can customize this to your needs)
        const token = jwt.sign({ userId: user.id, username: user.username, role: user.role }, 'your-secret-key', { expiresIn: '1h' });

        // Respond with token and user data
        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error, please try again later' });
    }
});

// Create a new car
// Set up multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, "uploads");
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  const upload = multer({ storage });
  
  // Create a new car
  app.post("/cars", upload.single("image"), async (req, res) => {
    try {
      const { name, brand, price_per_day, is_available } = req.body;
      const image_url = req.file ? `/uploads/${req.file.filename}` : null; // Save the file path
  
      const carData = await pool.query(
        "INSERT INTO cars (name, brand, price_per_day, is_available, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [name, brand, price_per_day, is_available, image_url]
      );
      res.json(carData.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
  
  // Get all cars
  app.get("/cars", async (req, res) => {
    try {
      const allCars = await pool.query("SELECT * FROM cars");
      res.json(allCars.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
  
  // Get a single car by ID
  app.get("/cars/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const car = await pool.query("SELECT * FROM cars WHERE id = $1", [id]);
      res.json(car.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
  
  // Update a car
  app.put("/cars/:id", upload.single("image"), async (req, res) => {
    try {
      const { id } = req.params;
      const { name, brand, price_per_day, is_available } = req.body;
      let image_url = req.body.image_url;
  
      if (req.file) {
        image_url = `/uploads/${req.file.filename}`; // Update the file path if a new image is uploaded
      }
  
      await pool.query(
        "UPDATE cars SET name = $1, brand = $2, price_per_day = $3, is_available = $4, image_url = $5 WHERE id = $6",
        [name, brand, price_per_day, is_available, image_url, id]
      );
      res.json("Car updated successfully");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
  
  // Delete a car
  app.delete("/cars/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      // Get the car to delete its image file
      const car = await pool.query("SELECT * FROM cars WHERE id = $1", [id]);
      if (car.rows.length > 0 && car.rows[0].image_url) {
        const imagePath = path.join(__dirname, car.rows[0].image_url);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath); // Delete the image file
        }
      }
  
      await pool.query("DELETE FROM cars WHERE id = $1", [id]);
      res.json("Car deleted successfully");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
  
  // Serve static files (uploaded images)
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ========================== Bookings APIs ==========================

// Create a new booking
app.post("/bookings", async (req, res) => {
    try {
        const { user_id, car_id, start_date, end_date, total_price, status } = req.body;
        const bookingData = await pool.query(
            "INSERT INTO bookings (user_id, car_id, start_date, end_date, total_price, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [user_id, car_id, start_date, end_date, total_price, status]
        );
        res.json(bookingData.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Get all bookings
app.get("/bookings", async (req, res) => {
    try {
        const allBookings = await pool.query("SELECT * FROM bookings");
        res.json(allBookings.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Get a single booking
app.get("/bookings/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await pool.query("SELECT * FROM bookings WHERE id = $1", [id]);
        res.json(booking.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Update a booking
app.put("/bookings/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id, car_id, start_date, end_date, total_price, status } = req.body;
        await pool.query(
            "UPDATE bookings SET user_id = $1, car_id = $2, start_date = $3, end_date = $4, total_price = $5, status = $6 WHERE id = $7",
            [user_id, car_id, start_date, end_date, total_price, status, id]
        );
        res.json("Booking updated successfully");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Delete a booking
app.delete("/bookings/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM bookings WHERE id = $1", [id]);
        res.json("Booking deleted successfully");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// ========================== Payments APIs ==========================

// Create a new payment
app.post("/payments", async (req, res) => {
    try {
        const { booking_id, amount } = req.body;
        const paymentData = await pool.query(
            "INSERT INTO payments (booking_id, amount) VALUES ($1, $2) RETURNING *",
            [booking_id, amount]
        );
        res.json(paymentData.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Get all payments
app.get("/payments", async (req, res) => {
    try {
        const allPayments = await pool.query("SELECT * FROM payments");
        res.json(allPayments.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Get a single payment
app.get("/payments/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await pool.query("SELECT * FROM payments WHERE id = $1", [id]);
        res.json(payment.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// POST API for creating feedback
app.post("/feedbacks", async (req, res) => {
    try {
        const { feedback } = req.body;

        if (!feedback || feedback.trim() === "") {
            return res.status(400).json({ error: "Feedback cannot be empty" });
        }

        const newFeedback = await pool.query(
            "INSERT INTO review (feedback) VALUES ($1) RETURNING *",
            [feedback]
        );

        res.status(201).json(newFeedback.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// GET API to fetch all feedbacks
app.get("/feedbacks", async (req, res) => {
    try {
        const allFeedbacks = await pool.query("SELECT * FROM review ORDER BY feedback_id ASC");
        res.status(200).json(allFeedbacks.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// DELETE API to delete a specific feedback by ID
app.delete("/feedbacks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteFeedback = await pool.query("DELETE FROM review WHERE feedback_id = $1 RETURNING *", [id]);

        if (deleteFeedback.rowCount === 0) {
            return res.status(404).json({ error: "Feedback not found" });
        }

        res.status(200).json({ message: "Feedback deleted successfully", feedback: deleteFeedback.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
