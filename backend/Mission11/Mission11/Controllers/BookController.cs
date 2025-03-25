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
    }
}

