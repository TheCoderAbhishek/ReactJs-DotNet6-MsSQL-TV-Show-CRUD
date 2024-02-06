namespace dotnet6_crud.Data.Entities
{
    public class TvShows
    {
        public int Id { get; set; }
        public string? ShowTitle { get; set; }
        public string? Genre { get; set; }
        public int ReleaseYear { get; set; }
        public string? Description { get; set; }
        public string? CoverImageUrl { get; set; }
    }
}
