using dotnet6_crud.Data;
using dotnet6_crud.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace dotnet6_crud.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TvShowsController : Controller
    {
        private readonly ReactJSDemoContext _reactJSDemoContext;
        public TvShowsController(ReactJSDemoContext reactJSDemoContext)
        {
            _reactJSDemoContext = reactJSDemoContext;
        }

        [HttpGet("GetListTvShows")]
        public async Task<IActionResult> Get()
        {
            try
            {
                var tvShows = await _reactJSDemoContext.TvShow.ToListAsync();
                return Ok(tvShows);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it according to your application's needs
                return StatusCode(500, $"Internal Server Error {ex.Message}");
            }
        }

        [HttpPost("AddTvShow")]
        public async Task<IActionResult> Post(TvShows tvShows)
        {
            try
            {
                _reactJSDemoContext.TvShow.Add(tvShows);
                await _reactJSDemoContext.SaveChangesAsync();
                return CreatedAtAction(nameof(Get), new { id = tvShows.Id }, tvShows);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it according to your application's needs
                return StatusCode(500, $"Internal Server Error {ex.Message}");
            }
        }

        [HttpGet("GetSingleTvShow/{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var tvShow = await _reactJSDemoContext.TvShow
                    .Where(_ => _.Id == id)
                    .FirstOrDefaultAsync();

                if (tvShow == null)
                {
                    return NotFound();
                }

                return Ok(tvShow);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it according to your application's needs
                return StatusCode(500, $"Internal Server Error {ex.Message}");
            }
        }

        [HttpPut("UpdateTvShow")]
        public async Task<IActionResult> Put(TvShows tvShows)
        {
            try
            {
                _reactJSDemoContext.TvShow.Update(tvShows);
                await _reactJSDemoContext.SaveChangesAsync();
                return Ok(tvShows);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it according to your application's needs
                return StatusCode(500, $"Internal Server Error {ex.Message}");
            }
        }

        [HttpDelete("DeleteTvShow/{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var tvShowToDelete = await _reactJSDemoContext.TvShow.FindAsync(id);
                if (tvShowToDelete == null)
                {
                    return NotFound();
                }

                _reactJSDemoContext.TvShow.Remove(tvShowToDelete);
                await _reactJSDemoContext.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                // Log the exception or handle it according to your application's needs
                return StatusCode(500, $"Internal Server Error {ex.Message}");
            }
        }
    }
}
