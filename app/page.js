"use client";
import React, { useState, useEffect } from "react";

import Image from "next/image";
import { ShoppingCart, User, Book, TrendingUp, Home, X, Star, FileText, Menu } from "lucide-react";

// Function to convert USD to INR
const usdToInr = (usd) => {
  const exchangeRate = 74.5; // Approximate exchange rate
  return Math.round(usd * exchangeRate);
}

const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    price: 9.99,
    trending: false,
    cover: "/great gatsby.jpeg",
    summary: "Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
    reviews: [
      { id: 1, user: "Alice", rating: 5, comment: "A classic that never gets old!" },
      { id: 2, user: "Bob", rating: 4, comment: "Beautifully written, captures the essence of the era." }
    ]
  },

  {
    id: 2,
    title: "Dune",
    author: "Frank Herbert",
    genre: "Science Fiction",
    price: 12.99,
    trending: true,
    cover: "/dune.jpeg",
    summary: "Set in the distant future amidst a feudal interstellar society, Dune tells the story of young Paul Atreides, whose family accepts the stewardship of the desert planet Arrakis.",
    reviews: [
      { id: 1, user: "Charlie", rating: 5, comment: "A masterpiece of science fiction!" },
      { id: 2, user: "Diana", rating: 4, comment: "Complex but rewarding read." }
    ]
  },

  {
    id: 3,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    price: 10.99,
    trending: false,
    cover: "/mockingbird.jpeg",
    summary: "The story of young Scout Finch and her father, lawyer Atticus Finch, as they navigate issues of racism and injustice in their small Southern town.",
    reviews: [
      { id: 1, user: "Eve", rating: 5, comment: "A powerful and moving story that everyone should read." },
      { id: 2, user: "Frank", rating: 5, comment: "Timeless classic with important lessons." }
    ]
  },

  {
    id: 4,
    title: "1984",
    author: "George Orwell",
    genre: "Science Fiction",
    price: 11.99,
    trending: true,
    cover: "/19842.png",
    summary: "A dystopian novel set in a totalitarian society, exploring themes of government surveillance, censorship, and the manipulation of truth.",
    reviews: [
      { id: 1, user: "Grace", rating: 5, comment: "Chillingly relevant even today." },
      { id: 2, user: "Henry", rating: 4, comment: "A must-read for understanding the dangers of totalitarianism." }
    ]
  },

  {
    id: 5,
    title: "Harry Potter and the Sorcerer's Stone",
    author: " J.K. Rowling",
    genre: "Fiction",
    price: 11.99,
    trending: true,
    cover: "/HPTSS.jpeg",
    summary: "A young boy discovers he’s a wizard and embarks on an adventure at Hogwarts, where he faces dark magic and uncovers mysteries about his past.",
    reviews: [
      { id: 1, user: "Grace", rating: 5, comment: "Chillingly relevant even today." },
      { id: 2, user: "Henry", rating: 4, comment: "A must-read for understanding the dangers of totalitarianism." }
    ]
  },

  {
    id: 6,
    title: "A Deadly Cross",
    author: "James Patterson",
    genre: "Thriller",
    price: 10.99,
    trending: false,
    cover: "/deadlycross.jpeg",
    summary: "Detective Alex Cross is pulled into a twisted murder investigation involving a high-profile couple, unraveling a web of dark secrets.",
    reviews: [
      { id: 1, user: "Eve", rating: 5, comment: "A powerful and moving story that everyone should read." },
      { id: 2, user: "Frank", rating: 5, comment: "Timeless classic with important lessons." }
    ]
  },

  {
    id: 7,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Non Fiction",
    price: 12.99,
    trending: false,
    cover: "/prideand.jpeg",
    summary: "A witty exploration of love, class, and social expectations, as Elizabeth Bennet navigates her evolving relationship with the aloof Mr. Darcy.",
    reviews: [
      { id: 1, user: "Charlie", rating: 5, comment: "A masterpiece of science fiction!" },
      { id: 2, user: "Diana", rating: 4, comment: "Complex but rewarding read." }
    ]
  },

  {
    id: 8,
    title: "A Time for Mercy",
    author: "John Grisham",
    genre: "Science Fiction",
    price: 10.99,
    trending: false,
    cover: "/timeformercy.jpeg",
    summary: "Lawyer Jake Brigance defends a young boy charged with murder in a small town, confronting moral dilemmas and local tensions.",
    reviews: [
      { id: 1, user: "Eve", rating: 5, comment: "A powerful and moving story that everyone should read." },
      { id: 2, user: "Frank", rating: 5, comment: "Timeless classic with important lessons." }
    ]
  },

  {
    id: 9,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Fiction",
    price: 10.99,
    trending: false,
    cover: "/thecatcher.jpeg",
    summary: "A rebellious teenager wanders New York City, struggling with alienation and searching for meaning in a world he feels disconnected from.",
    reviews: [
      { id: 1, user: "Eve", rating: 5, comment: "A powerful and moving story that everyone should read." },
      { id: 2, user: "Frank", rating: 5, comment: "Timeless classic with important lessons." }
    ]
  },

  {
    id: 10,
    title: "The Law of Innocence",
    author: "Michael Connelly",
    genre: "Thriller",
    price: 10.99,
    trending: false,
    cover: "/thelawof.jpeg",
    summary: "Defense attorney Mickey Haller fights to prove his own innocence after being framed for murder, navigating a complex legal battle.",
    reviews: [
      { id: 1, user: "Eve", rating: 5, comment: "A powerful and moving story that everyone should read." },
      { id: 2, user: "Frank", rating: 5, comment: "Timeless classic with important lessons." }
    ]
  },

  {
    id: 11,
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    price: 10.99,
    trending: true,
    cover: "/alchemist.jpeg",
    summary: "A young shepherd embarks on a journey to find treasure, learning life lessons about dreams, fate, and personal fulfillment along the way.",
    reviews: [
      { id: 1, user: "Eve", rating: 5, comment: "Crazy book bhai no cap" },
      { id: 2, user: "Frank", rating: 5, comment: "It does got the game bro hands down" }
    ]
  },

  {
    id: 12,
    title: "The Alchemist",
    author: "Alex Michaelides",
    genre: "Thriller",
    price: 10.99,
    trending: false,
    cover: "/silentpatient.jpeg",
    summary: "A famous painter shoots her husband and stops speaking, while a psychotherapist becomes obsessed with uncovering the truth behind her silence.",
    reviews: [
      { "id": 1, "user": "Olivia", "rating": 5, "comment": "Shocking twists and intense psychological tension." },
    { "id": 2, "user": "Ethan", "rating": 4, "comment": "A gripping, well-paced thriller with a clever ending." }
    ]
  },

  {
    id: 13,
    title: "Verity",
    author: "Colleen Hoover",
    genre: "Thriller",
    price: 10.99,
    trending: false,
    cover: "/verity.jpeg",
    summary: "A struggling writer uncovers dark secrets while finishing a bestselling author’s manuscript, blurring the line between truth and fiction.",
    reviews: [
      { "id": 1, "user": "Sophia", "rating": 5, "comment": "Disturbing, intense, and unforgettable." },
      { "id": 2, "user": "Liam", "rating": 4, "comment": "An emotional rollercoaster with an unpredictable plot." }
    ]
  },

  {
    id: 14,
    title: "Tuesdays with Morrie",
    author: "Mitch Albom",
    genre: "Fiction",
    price: 10.99,
    trending: false,
    cover: "/truesdays.jpeg",
    summary: "A heartwarming account of the author's weekly visits to his dying former professor, exploring life’s important lessons through their conversations.",
    reviews: [
      { id: 1, user: "Eve", rating: 5, comment: "A powerful and moving story that everyone should read." },
      { id: 2, user: "Frank", rating: 5, comment: "Timeless classic with important lessons." }
    ]
  },
  
]

const blogPosts = [
  {
    id: 1,
    title: "The Importance of Reading in the Digital Age",
    image: "/impreading.jpeg",
    description: "In an era dominated by screens and digital media, the act of reading books remains as crucial as ever. This blog post explores the cognitive benefits of reading, its impact on empathy and social skills, and how it can be a form of self-care in our fast-paced world.",
    reviews: [
      { id: 1, user: "Jane", rating: 5, comment: "Great insights! This article reminded me why I love reading so much." },
      { id: 2, user: "Mike", rating: 4, comment: "Interesting perspective on the role of books in the digital age." }
    ]
  },
  {
    id: 2,
    title: "Exploring the World of Science Fiction Literature",
    image: "/scifiblog.jpeg",
    description: "Science fiction has long been a genre that pushes the boundaries of imagination and explores potential futures. This post delves into the history of sci-fi literature, its subgenres, and some must-read classics and contemporary works that have shaped the genre.",
    reviews: [
      { id: 1, user: "Alex", rating: 5, comment: "As a sci-fi fan, I found this article incredibly informative!" },
      { id: 2, user: "Sarah", rating: 4, comment: "Great recommendations for both new and seasoned sci-fi readers." }
    ]
  },
  {
    id: 3,
    title: "The Art of Writing: Tips from Famous Authors",
    image: "/writingart.jpeg",
    description: "Ever wondered how your favorite authors approach their craft? This blog post compiles writing advice from renowned authors across various genres. From developing characters to crafting compelling plots, these tips offer valuable insights for aspiring writers and book enthusiasts alike.",
    reviews: [
      { id: 1, user: "Emily", rating: 5, comment: "Inspiring advice! This motivated me to start writing again." },
      { id: 2, user: "David", rating: 4, comment: "Fascinating to see how different authors approach their work." }
    ]
  },
]

const BookCard = ({ book, onAddToCart, onClick }) => (
  <div className="w-[250px] cursor-pointer transition-all hover:shadow-lg bg-white rounded-lg p-4" onClick={onClick}>
    <div>
      <Image src={book.cover} alt={book.title} width={150} height={200} className="mx-auto" />
      <h3 className="text-lg mt-2 truncate font-borel" title={book.title}>{book.title}</h3>
      <p className="text-sm text-gray-600">{book.author}</p>
    </div>
    <div>
      <p>Genre: {book.genre}</p>
      <p className="font-bold mt-2">Price: ₹{usdToInr(book.price).toLocaleString('en-IN')}</p>
    </div>
    <div>
      <button onClick={(e) => { e.stopPropagation(); onAddToCart(book); }} className="w-full bg-black text-white py-2 px-4 rounded mt-2 hover:bg-black-600">Add to Cart</button>
    </div>
  </div>
)

const BookDetails = ({ book, onAddToCart, onClose }) => (
  <div className="flex flex-col md:flex-row gap-6">
    <div className="md:w-1/3">
      <Image src={book.cover} alt={book.title} width={300} height={400} className="w-full h-auto" />
    </div>
    <div className="md:w-2/3">
      <h2 className="text-2xl font-bold mb-2 font-borel">{book.title}</h2>
      <p className="text-lg mb-2">by {book.author}</p>
      <p className="text-xl font-bold mb-4">₹{usdToInr(book.price).toLocaleString('en-IN')}</p>
      <button onClick={() => { onAddToCart(book); onClose(); }} className="bg-blue-500 text-white py-2 px-4 rounded mb-4 hover:bg-blue-600">Add to Cart</button>
      <h3 className="text-xl font-semibold mb-2 font-borel">Summary</h3>
      <p className="mb-4">{book.summary}</p>
      <h3 className="text-xl font-semibold mb-2 font-borel">Recent Reviews</h3>
      {book.reviews.map(review => (
        <div key={review.id} className="mb-2">
          <div className="flex items-center">
            <span className="font-semibold mr-2">{review.user}</span>
            <div className="flex">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  </div>
)

const BlogCard = ({ blog, onClick }) => (
  <div className="w-[250px] cursor-pointer transition-all hover:shadow-lg bg-white rounded-lg p-4" onClick={onClick}>
    <div>
      <Image src={blog.image} alt={blog.title} width={250} height={150} className="mx-auto" />
    </div>
    <div>
      <h3 className="text-lg mt-2 truncate font-borel" title={blog.title}>{blog.title}</h3>
    </div>
  </div>
)

const BlogDetails = ({ blog, onClose }) => (
  <div className="flex flex-col gap-4">
    <div>
      <Image src={blog.image} alt={blog.title} width={400} height={300} className="w-full h-auto" />
    </div>
    <div>
      <h2 className="text-xl font-bold mb-2 font-borel">{blog.title}</h2>
      <h3 className="text-lg font-semibold mb-2 font-borel">Description</h3>
      <p className="mb-4">{blog.description}</p>
      <h3 className="text-lg font-semibold mb-2 font-borel">User Reviews</h3>
      {blog.reviews.map(review => (
        <div key={review.id} className="mb-2">
          <div className="flex items-center">
            <span className="font-semibold mr-2">{review.user}</span>
            <div className="flex">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  </div>
)

const CartItem = ({ item, onRemove }) => (
  <div className="flex items-center justify-between py-2">
    <div className="flex items-center">
      <Image src={item.cover} alt={item.title} width={50} height={75} className="mr-4" />
      <div>
        <h3 className="font-semibold">{item.title}</h3>
        <p className="text-sm text-gray-500">₹{usdToInr(item.price).toLocaleString('en-IN')}</p>
      </div>
    </div>
    <button onClick={() => onRemove(item.id)} className="text-red-500 hover:text-red-700">
      <X className="h-4 w-4" />
    </button>
  </div>
)

const GenreDiscovery = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState(Array(5).fill(''))

  const questions = [
    "Do you enjoy stories set in real-world environments with realistic characters and situations?",
    "Are you fascinated by futuristic technology, space exploration, or alternate realities?",
    "Do you prefer reading about true events or learning new factual information?",
    "Do you enjoy suspenseful stories filled with mysteries, plot twists, or thrill-seeking adventures?",
    "Do you like reading about magical lands, mythical creatures, or epic journeys?"
  ]

  const handleAnswer = (answer) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answer
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const result = getGenreResult(newAnswers)
      onComplete(result)
    }
  }

  const getGenreResult = (answers) => {
    let scores = {
      Fiction: 0,
      "Science Fiction": 0,
      "Fiction": 0,
      Thriller: 0,
      Fantasy: 0
    }

    if (answers[0] === 'Yes') scores.Fiction += 2
    if (answers[1] === 'Yes') scores["Science Fiction"] += 2
    if (answers[2] === 'Yes') scores["Fiction"] += 2
    if (answers[3] === 'Yes') scores.Thriller += 2
    if (answers[4] === 'Yes') scores.Thriller += 2

    const maxScore = Math.max(...Object.values(scores))
    const topGenres = Object.keys(scores).filter(genre => scores[genre] === maxScore)
    return topGenres[Math.floor(Math.random() * topGenres.length)]
  }

  useEffect(() => {
    const radioButtons = document.querySelectorAll('input[type="radio"]')
    radioButtons.forEach(button => {
      button.checked = false
    })
  }, [currentQuestion])

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <div>
        <h2 className="text-2xl font-bold text-center font-borel">Discover Your Favorite Genre</h2>
        <p className="text-center text-gray-600">Answer these questions to find your perfect genre!</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4 text-center font-borel">{questions[currentQuestion]}</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input type="radio" id="yes" name="answer" value="Yes" onChange={() => handleAnswer('Yes')} />
            <label htmlFor="yes">Yes</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="radio" id="no" name="answer" value="No" onChange={() => handleAnswer('No')} />
            <label htmlFor="no">No</label>
          </div>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500 w-full text-center mt-4">Question {currentQuestion + 1} of {questions.length}</p>
      </div>
    </div>
  )
}

export default function Component() {
  const [filter, setFilter] = useState("All")
  const [cart, setCart] = useState([])
  const [activeSection, setActiveSection] = useState("home")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBook, setSelectedBook] = useState(null)
  const [selectedBlog, setSelectedBlog] = useState(null)
  const [showGenreDiscovery, setShowGenreDiscovery] = useState(false)
  const [discoveredGenre, setDiscoveredGenre] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const filteredBooks = books.filter(book =>
    (filter === "All" || book.genre === filter) &&
    (book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const trendingBooks = books.filter(book => book.trending)

  const addToCart = (book) => {
    setCart([...cart, book])
  }

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0)

  const handleGenreDiscoveryComplete = (genre) => {
    setDiscoveredGenre(genre)
    setShowGenreDiscovery(false)
  }

  const suggestedBooks = books.filter(book => book.genre === discoveredGenre).slice(0, 2)

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF]">
      <header className="bg-transparent text-black p-4  top-0 z-10">
        <nav className="container mx-auto flex justify-between items-center">
          <div className="flex-1"></div>
          <div className="flex items-center justify-center flex-1">
            <Image src="/cititor logo.png" alt="Cititor Logo" width={150} height={50} />
          </div>
          <div className="flex-1 flex justify-end">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="bg-[#ffddba] p-2 rounded">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </button>
          </div>
        </nav>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="bg-[#ffddba] w-64 h-full p-4">
            <h2 className="font-borel text-xl mb-4">Menu</h2>
            <div className="flex flex-col space-y-4">
              <button onClick={() => { setActiveSection("home"); setIsMenuOpen(false); }} className="flex items-center"><Home className="mr-2 h-4 w-4" /> Home</button>
              <button onClick={() => { setActiveSection("trending"); setIsMenuOpen(false); }} className="flex items-center"><TrendingUp className="mr-2 h-4 w-4" /> Trending</button>
              <button onClick={() => { setActiveSection("blog"); setIsMenuOpen(false); }} className="flex items-center"><FileText className="mr-2 h-4 w-4" /> Blog</button>
              <button onClick={() => { setActiveSection("explore"); setShowGenreDiscovery(true); setIsMenuOpen(false); }} className="flex items-center"><Book className="mr-2 h-4 w-4" /> Explore</button>
              <button onClick={() => setIsMenuOpen(false)} className="flex items-center"><User className="mr-2 h-4 w-4" /> Profile</button>
            </div>
          </div>
        </div>
      )}

      <main className="container mx-auto flex-grow p-4">
        {activeSection === "home" && (
          <>
            <section className="mb-8 text-black">
              <h2 className="text-2xl font-bold mb-4 text-center font-borel text-black">Our Books</h2>
              <div className="flex justify-center items-center mb-4 space-x-4">
                <select onChange={(e) => setFilter(e.target.value)} className="p-2 border rounded">
                  <option value="All">All Genres</option>
                  <option value="Fiction">Fiction</option>
                  <option value="Science Fiction">Science Fiction</option>
                  <option value="Thriller">Thriller</option>
                </select>
                <input
                  type="search"
                  placeholder="Search books..."
                  className="p-2 border rounded w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredBooks.map(book => (
                  <BookCard key={book.id} book={book} onAddToCart={addToCart} onClick={() => setSelectedBook(book)} />
                ))}
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-center font-borel">Trending Books</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {trendingBooks.map(book => (
                  <BookCard key={book.id} book={book} onAddToCart={addToCart} onClick={() => setSelectedBook(book)} />
                ))}
              </div>
            </section>
          </>
        )}

        {activeSection === "trending" && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-center font-borel">Trending Books</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {trendingBooks.map(book => (
                <BookCard key={book.id} book={book} onAddToCart={addToCart} onClick={() => setSelectedBook(book)} />
              ))}
            </div>
          </section>
        )}

        {activeSection === "blog" && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-center font-borel">Blog Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {blogPosts.map(blog => (
                <BlogCard key={blog.id} blog={blog} onClick={() => setSelectedBlog(blog)} />
              ))}
            </div>
          </section>
        )}

        {activeSection === "explore" && (
          <section className="mb-8">
            {showGenreDiscovery ? (
              <GenreDiscovery onComplete={handleGenreDiscoveryComplete} />
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4 text-center font-borel">Your Recommended Genre: {discoveredGenre}</h2>
                <p className="mb-4 text-center">Based on your preferences, we think you'll enjoy {discoveredGenre} books. Here are some suggestions:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {suggestedBooks.map(book => (
                    <BookCard key={book.id} book={book} onAddToCart={addToCart} onClick={() => setSelectedBook(book)} />
                  ))}
                </div>
                <div className="text-center mt-4">
                  <button onClick={() => setShowGenreDiscovery(true)} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Retake Genre Quiz</button>
                </div>
              </>
            )}
          </section>
        )}
      </main>

      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-4 right-4 z-10 bg-[#ffddba] p-2 rounded flex items-center"
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        Cart ({cart.length})
      </button>

      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
          <div className="bg-[#ffddba] w-full max-w-md p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold font-borel">Your Cart</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="h-[calc(100vh-200px)] overflow-y-auto pr-4">
              {cart.map(item => (
                <CartItem key={item.id} item={item} onRemove={removeFromCart} />
              ))}
            </div>
            <div className="mt-4">
              <p className="font-bold text-lg">Total: ₹{usdToInr(totalPrice).toLocaleString('en-IN')}</p>
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600"> Checkout</button>
            </div>
          </div>
        </div>
      )}

      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-3xl max-h-[90vh] overflow-y-auto">
            <BookDetails book={selectedBook} onAddToCart={addToCart} onClose={() => setSelectedBook(null)} />
            <button onClick={() => setSelectedBook(null)} className="mt-4 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300">Close</button>
          </div>
        </div>
      )}

      {selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md max-h-[90vh] overflow-y-auto">
            <BlogDetails blog={selectedBlog} onClose={() => setSelectedBlog(null)} />
            <button onClick={() => setSelectedBlog(null)} className="mt-4 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300">Close</button>
          </div>
        </div>
      )}

      <footer className="bg-gray-200 text-gray-800 p-4">
        <div className="container mx-auto flex justify-between">
          <div>
            <h3 className="font-bold mb-2 font-borel">Quick Links</h3>
            <ul>
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
              <li><a href="#" className="hover:underline">FAQ</a></li>
            </ul>
          </div>
          <div>© 2023 Cititor. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}