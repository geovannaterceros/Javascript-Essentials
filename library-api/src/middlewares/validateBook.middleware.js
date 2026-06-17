export default function validateBook(req, res, next) {
  const { title, author, year } = req.body;

  if (!title || !author || !year) {
    return res.status(400).json({
      error: 'Title, author and year are required',
    });
  }

  if (typeof year !== 'number') {
    return res.status(400).json({
      error: 'Year must be a number',
    });
  }

  next();
}
