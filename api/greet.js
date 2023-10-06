module.exports = (req, res) => {
    const name = req.query.name || 'Guest';
  
    res.status(200).send(`Hello, ${name}!`);
  };
  