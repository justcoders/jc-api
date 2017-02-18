const express = require('express');
const router = express();

router.get('/me', (req, res) => {
  res.send('TODO');
});

router.get('/:id', (req, res) => {
  res.send(`TODO:${req.params.id}`);
});

module.exports = router;
