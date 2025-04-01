using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11.Data;

namespace Mission11.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        //Add book context
        private BookContext _bookContext;
        public BookController(BookContext temp)
        {
            _bookContext = temp;
        }

        //Get Books route
        [HttpGet]
        public IActionResult GetBooks(int pageHowMany, int pageNumber, string sortOrder, [FromQuery] List<string> categoryTypes = null)
        {
            var query = _bookContext.Books.AsQueryable();

            var booksQuery = _bookContext.Books.AsQueryable();

            if (categoryTypes != null && categoryTypes.Any())
            {
                query = query.Where(p => categoryTypes.Contains(p.Category));
            }

            //Sort ascending or descending
            if (sortOrder == "asc")
            {
                query = query.OrderBy(b => b.Title);
            }
            else if (sortOrder == "desc")
            {
                query = query.OrderByDescending(b => b.Title);
            }


            //Get total books from context
            var totalNumBooks = query.Count();

            //Query
            var BookList = query
                .Skip((pageNumber - 1) * pageHowMany)
                .Take(pageHowMany)
                .ToList();


            var someObject = new
            {
                Books = BookList,
                TotalNumBooks = totalNumBooks
            };

            return Ok(someObject);
        }

        [HttpGet("GetProjectTypes")]
        public IActionResult GetCategoryTypes()
        {
            var projectTypes = _bookContext.Books
            .Select(p => p.Category)
            .Distinct()
            .ToList();

            return Ok(projectTypes);
        }

        [HttpGet("GetBook")]
        public IActionResult GetBook(int bookID)
        {
            var book = _bookContext.Books.FirstOrDefault(p => p.BookID == bookID);
            if (book == null) return NotFound();
            return Ok(book);
        }

        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _bookContext.Books.Add(newBook);
            _bookContext.SaveChanges();
            return Ok(newBook);
        }

        [HttpPut("UpdateBook/{BookID}")]
        public IActionResult UpdateBook(int BookID, [FromBody] Book updatedBook)
        {
            var existingBook = _bookContext.Books.Find(BookID);

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.Category = updatedBook.Category;
            existingBook.Price = updatedBook.Price;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification;

            _bookContext.Books.Update(existingBook);
            _bookContext.SaveChanges();

            return Ok(existingBook);
        }

        [HttpDelete("DeleteBook/{BookID}")]
        public IActionResult DeleteBook(int BookID)
        {
            var book = _bookContext.Books.Find(BookID);
            if (book == null) return NotFound();

            _bookContext.Books.Remove(book);
            _bookContext.SaveChanges();

            return NoContent();
        }
    }
}

