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
        public IActionResult GetBooks(int pageHowMany, int pageNumber, string sortOrder)
        {
            var booksQuery = _bookContext.Books.AsQueryable();

            //Sort ascending or descending
            if (sortOrder == "asc")
            {
                booksQuery = booksQuery.OrderBy(b => b.Title);
            }
            else if (sortOrder == "desc")
            {
                booksQuery = booksQuery.OrderByDescending(b => b.Title);
            }

            //Query
            var BookList = booksQuery
                .Skip((pageNumber - 1) * pageHowMany)
                .Take(pageHowMany)
                .ToList();

            //Get total books from context
            var totalNumBooks = _bookContext.Books.Count();

            var someObject = new
            {
                Books = BookList,
                TotalNumBooks = totalNumBooks
            };

            return Ok(someObject);
        }
    }
}

