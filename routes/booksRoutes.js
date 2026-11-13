const express = require("express")
const bookRouter = express.Router()
const bookController = require("../controller/bookController")

bookRouter.get("/books", bookController.getBooks)

bookRouter.post("/books", bookController.createBooks)

bookRouter.get("/books/total-pages", bookController.getTotalPages)

bookRouter.get("/books/pages-by-author", bookController.getPagesByAuthor)

bookRouter.get("/books/stats-by-author", bookController.getStatsByAuthor)

bookRouter.get("/books/:id", bookController.getBookById)

bookRouter.put("/books/:id", bookController.updateBook)

bookRouter.delete("/books/:id", bookController.deleteBook)

module.exports = bookRouter