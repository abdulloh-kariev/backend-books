const Book = require("../model/Book")

exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find().populate("belongs", "name -_id")

        res.json(books)
    } catch (error) {
        res.status(500).json({ message: "Server xato!" })
    }
}

exports.createBooks = async (req, res) => {
    try {
        const book = await Book.create(req.body)

        res.status(201).json(book)
    } catch (error) {
        res.status(500).json({ message: "Server xato!" })
    }
}

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate("belongs", "name -_id")

        if(!book){ 
            return res.status(404).json({ message: "kitob topilmadi!" })
        }

        res.send(book)
    } catch (error) {
        res.status(500).json({ message: "Server xato!" })
    }
}

exports.updateBook = async (req, res) => {
    const { title, author, pages } = req.body

    if(!title || !author || !pages){
        return res.status(400).json({ message: "Xamma narsa toliq bolishi kerak!" })
    }

    if(pages <= 0){
        return res.status(400).json({ message: "sahifa musbat bolaolmaydi!" })
    }

    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true })

        if(!book){ 
            return res.status(404).json({ message: "kitob topilmadi!" })
        }

        res.send(book)
    } catch (error) {
        res.status(500).json({ message: "Server xato!" })
    }
}

exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id)

        if(!book){ 
            return res.status(404).json({ message: "kitob topilmadi!" })
        }

        res.send(book)
    } catch (error) {
        res.status(500).json({ message: "Server xato!" })
    }
}

exports.getTotalPages = async (req, res) => {
    try {
        const result = await Book.aggregate([
            {
                $group: {
                    _id: null,
                    totalPages: { $sum: "$pages"  }
                }
            }
        ])

        res.json(result)
    } catch (error) {
        res.status(500).json({ message: "Server Xato!" })
    }
}

exports.getPagesByAuthor = async (req, res) => {
    try {
        const result = await Book.aggregate([
            {
                $match: { author: req.query.author }
            },
            {
                $group: {
                    _id: null,
                    totalPages: { $sum: "$pages" },
                    booksCount: { $sum: 1 }
                }
            },
        ])

        res.json(result)
    } catch (error) {
        res.status(500).json({ message: "Server Xato!" })
    }
}

exports.getStatsByAuthor = async (req, res) => {
    try {
        const result = await Book.aggregate([
            {
                $group: {
                    _id: "$author",
                    totalPages: { $sum: "$pages" },
                    booksCount: { $sum: 1 }
                }
            },
            {
                $sort: { booksCount: -1 }
            }
        ])

        res.json(result)
    } catch (error) {
        res.status(500).json({ message: "Server Xato!" })
    }
}