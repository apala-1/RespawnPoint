const express = require("express");
const pool = require("../config/db");  // Use the pool object from db.js
const router = express.Router();
const authenticateUser = require("../middleware/authenticateUser");

// Route to fetch tutorials (GET)
router.get('/tutorials', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tutorials');
        res.status(200).json(result.rows); // Send the tutorials in the response
    } catch (err) {
        res.status(500).json({ message: 'Error fetching tutorials', error: err.message });
    }
});

// Route to add tutorial (POST)
router.post('/tutorials', authenticateUser, async (req, res) => {
    const { name, youtube_url, tutorial_text } = req.body;
    const user_id = req.user.id; // Extract user ID from the authenticated token

    try {
        const result = await pool.query(
            'INSERT INTO tutorials (name, youtube_url, tutorial_text, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, youtube_url, tutorial_text, user_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: 'Error creating tutorial', error: err.message });
    }
});


// Route to fetch a single tutorial by ID (GET)
router.get('/tutorials/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM tutorials WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Tutorial not found' });
        }
        res.status(200).json(result.rows[0]); // Send the tutorial data
    } catch (err) {
        res.status(500).json({ message: 'Error fetching tutorial', error: err.message });
    }
});


// In tutorialRoutes.js
router.put('/tutorials/:id', authenticateUser, async (req, res) => {
    const { id } = req.params;
    const { name, youtube_url, tutorial_text } = req.body;
    const userId = req.user.id; // Extracted from the JWT token

    try {
        const result = await pool.query('SELECT * FROM tutorials WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Tutorial not found' });
        }

        // Check if the logged-in user is the owner
        if (result.rows[0].user_id !== userId) {
            return res.status(403).json({ message: 'You are not authorized to update this tutorial' });
        }

        // Update the tutorial
        await pool.query(
            'UPDATE tutorials SET name = $1, youtube_url = $2, tutorial_text = $3 WHERE id = $4',
            [name, youtube_url, tutorial_text, id]
        );

        res.status(200).json({ message: 'Tutorial updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating tutorial', error: err.message });
    }
});


router.delete('/tutorials/:id', authenticateUser, async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id; // Extracted from the JWT token
    const userRole = req.user.role; // Extract the user's role from the JWT token

    try {
        // Check if the tutorial exists
        const result = await pool.query('SELECT * FROM tutorials WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Tutorial not found' });
        }

        // Allow the user to delete the tutorial if they are the owner or an admin
        if (result.rows[0].user_id !== userId && userRole !== 'admin') {
            return res.status(403).json({ message: 'You are not authorized to delete this tutorial' });
        }

        // Delete the tutorial
        await pool.query('DELETE FROM tutorials WHERE id = $1', [id]);

        // Return success response after deletion
        res.status(200).json({ message: 'Tutorial deleted successfully' });

    } catch (err) {
        res.status(500).json({ message: 'Error deleting tutorial', error: err.message });
    }
});



  


module.exports = router;
