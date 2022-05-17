import express from 'express';
import db from './config/db.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ hello: 'this is ' });
  console.log('Server Sent A Hello World!');
});
router.post('/cards', async (req, res) => {
  const { cardNum, cardPin } = req.body;
  try {
    const sql = `SELECT * FROM card WHERE card_num = ?;`;
    const [[result]] = await db.execute(sql, [cardNum]);
    if (!result) {
      return res.status(404).json({ message: 'no card number', result });
    }
    if (result.pin !== cardPin) {
      return res.status(401).json(false);
    }
    res.status(200).json(true);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
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
    // find the items from VM2

    // Combine two item lists
    return res.status(200).json({ items });
  } catch (error) {
    return res.status(500).json(error);
  }
});
// router.use('/items');
// router.use('/purchases');

export default router;
