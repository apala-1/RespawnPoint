const express = require("express");
const pool = require("../config/db");  // Use the pool object from db.js
const router = express.Router();

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
router.post('/tutorials', async (req, res) => {
    const { name, youtube_url, tutorial_text } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO tutorials (name, youtube_url, tutorial_text) VALUES ($1, $2, $3) RETURNING *',
            [name, youtube_url, tutorial_text]
        );
        res.status(201).json(result.rows[0]); // Send back the created tutorial
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
router.put('/tutorials/:id', async (req, res) => {
    console.log('PUT request received for tutorial ID:', req.params.id);  // Add this line
    const { id } = req.params;
    const { name, youtube_url, tutorial_text } = req.body;

    try {
        const result = await pool.query('SELECT * FROM tutorials WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Tutorial not found' });
        }

        // Update tutorial
        await pool.query(
            'UPDATE tutorials SET name = $1, youtube_url = $2, tutorial_text = $3 WHERE id = $4',
            [name, youtube_url, tutorial_text, id]
        );

        // Fetch updated tutorial
        const updatedResult = await pool.query('SELECT * FROM tutorials WHERE id = $1', [id]);
        res.status(200).json(updatedResult.rows[0]);
    } catch (err) {
        console.error('Error in update:', err);  // Log the error
        res.status(500).json({ message: 'Error updating tutorial', error: err.message });
    }
});

router.delete('/tutorials/:id', async (req, res) => {
    const { id } = req.params;
  
    console.log('Attempting to delete tutorial with ID:', id);  // Log the ID being passed
  
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: 'Invalid tutorial ID' });
    }
  
    try {
      const result = await pool.query('SELECT * FROM tutorials WHERE id = $1', [id]);
  
      if (result.rows.length === 0) {
        console.log('Tutorial not found');
        return res.status(404).json({ message: 'Tutorial not found' });
      }
  
      // Attempting the delete operation
      await pool.query('DELETE FROM tutorials WHERE id = $1', [id]);
  
      console.log(`Tutorial with ID ${id} deleted successfully`);
      res.status(200).json({ message: 'Tutorial deleted successfully' });
    } catch (err) {
      console.error('Error deleting tutorial:', err); // Log the actual error message
      res.status(500).json({ message: 'Error deleting tutorial', error: err.message });
    }
  });
  


module.exports = router;
