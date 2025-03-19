using Microsoft.EntityFrameworkCore;

namespace Mission11.Data
{
    //Inherit from DbContext
    public class BookContext : DbContext
    {
    public BookContext(DbContextOptions<BookContext> options) : base(options)
        {
        }

    // DbSet from book table
    public DbSet<Book> Books { get; set; }
    }
}
