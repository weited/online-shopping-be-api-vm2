import express from 'express';
import db from './config/db.js';

const router = express.Router();

router.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Hi, this is REST api VM2 for kit514 assignment2' });
});

/**
 *@route   POST ip/vm2/api/cards
 *@desc    Check card number and pin
 */
router.post('/cards', async (req, res) => {
  const { cardNum, cardPin } = req.body;
  try {
    const sql = `SELECT * FROM card WHERE card_num = ? AND pin = ?;`;
    const [[result]] = await db.execute(sql, [cardNum, cardPin]);
    if (!result) {
      return res.status(403).json(false);
    }
    res.status(200).json(true);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

/**
 *@route   GET ip/vm2/api/items
 *@desc    get all items in VM2
 */
router.get('/items', async (req, res) => {
  const { name } = req.query;
  try {
    // if there is name parameter in query
    if (name) {
      const sql = `SELECT * FROM item WHERE item_name like '%${name}%' ORDER BY price_of_unit ASC;`;
      const [items] = await db.execute(sql);
      return res.status(200).json({ items });
    }

    // if there isn't name parameter in query, find all items
    const sql = 'SELECT * FROM item;';
    const [items] = await db.execute(sql);
    return res.status(200).json({ items });
  } catch (error) {
    return res.status(500).json(error);
  }
});

export default router;
