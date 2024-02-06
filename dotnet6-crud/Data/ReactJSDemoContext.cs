using dotnet6_crud.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace dotnet6_crud.Data
{
    public class ReactJSDemoContext : DbContext
    {
        #pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public ReactJSDemoContext(DbContextOptions<ReactJSDemoContext> context) : base(context)
        #pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        {
        }
        public DbSet<TvShows> TvShow { get; set; }
    }
}
