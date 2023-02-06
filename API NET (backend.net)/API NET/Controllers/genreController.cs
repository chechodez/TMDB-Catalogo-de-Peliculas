using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net.Http.Headers;

using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API_NET.Controllers
{
    //[System.Web.Http.Cors.EnableCors(origins: "http://localhost:4200/", headers: "*", methods: "*")]


    [Route("api/[controller]")]
    [ApiController]
    public class genreController : ControllerBase
    {


        [HttpGet]

        public async Task<object?> getAsync()
        {
            
            string lenguaje = HttpContext.Request.Query["Language"];

            string URL = "https://api.themoviedb.org/3/genre/movie/list";
            string urlParameters = $"?api_key=98fff0cbf18bdf9d7a0badc4bf658187&language={lenguaje}";


            HttpClient client = new();
            client.BaseAddress = new Uri(URL);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            HttpResponseMessage response = client.GetAsync(urlParameters).Result;

            string results;

            results = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject(results);
            //Console.WriteLine(result);
            return results;

        }
    }
}
