export default function errorMiddleware(error, req, res) {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message,
    },
  })
}
