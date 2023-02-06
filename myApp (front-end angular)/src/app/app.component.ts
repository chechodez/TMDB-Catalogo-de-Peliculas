import { Component } from '@angular/core';
import axios from 'axios';

const consultaApi = (page = 1, language = 'en-US') => {

  const response = axios.get(`https://localhost:7207/api/Values`,{params:{page,language}})
  //const response = axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=98fff0cbf18bdf9d7a0badc4bf658187&language=${language}&page=${page}`)
  //if statement checking response code
  return response;
}

const consultaApi2 = (language = 'en-US') => {
  const response = axios.get(`https://localhost:7207/api/genre`,{params:{language}})
  //if statement checking response code
  return response;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  pagina = 1
  response = {"results":[{"adult":'',"genre_ids":'',"original_language":'',"original_title":'',"overview":'',"popularity":'',"poster_path":'',"release_date":'',"title":'',"vote_average":'',"vote_count":'',}]}
  response2={"genres":[{"id":"0","name":''}]}
  idioma='en-US';
  ngOnInit(){
    this.renderizarPagina();
  }
  //response = consultaApi(1).then(function (data) { console.log(data); return data })
  cambiarIdioma=()=>{
    this.idioma=='en-US'?this.idioma='es-ES':this.idioma='en-US'
    this.renderizarPagina()
  }
  siguiente = async () => {
    
    this.pagina += 1
    
    console.log(this.response)
    this.renderizarPagina()
  }
  anterior = async () => {
    this.pagina == 1 ? this.pagina = 1 : this.pagina -= 1
    
    console.log(this.response)
    this.renderizarPagina()
  }
  

  renderizarPagina = async() =>{
    console.log(this.response)
    //logica para renderizar
    this.response = await consultaApi(this.pagina,this.idioma).then(function (data) { return data.data })
    this.response2=await consultaApi2(this.idioma).then(function (data) { return data.data })

    document.getElementById("mainsito")!.innerHTML=''
    for (let i = 0; i < this.response.results.length;i++) {
      let adult = this.response.results[i].adult;
      let genre_ids = this.response.results[i].genre_ids;
      let original_language = this.response.results[i].original_language;
      let original_title = this.response.results[i].original_title;
      let overview = this.response.results[i].overview;
      let popularity = this.response.results[i].popularity;
      let poster_path = this.response.results[i].poster_path;
      let release_date = this.response.results[i].release_date;
      let title = this.response.results[i].title;
      let vote_average = this.response.results[i].vote_average;
      let vote_count = this.response.results[i].vote_count;

      var xd;

      var mtz=[];
      
      
      for (let j = 0; j < genre_ids.length; j++) {
      for(let k=0;k<this.response2.genres.length;k++){
                   if(genre_ids[j]== this.response2.genres[k].id){
                          xd= this.response2.genres[k].name
          }
          
      }
                  mtz.push(xd)
      }

      const article = document.createRange().createContextualFragment(/*html*/`
          <article>
                  <div class="image-container">
                      <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="Personaje" />
                  </div>
                  <h2>${title}</h2>
                      <span>${overview}</span>
                          <br />
                    <font face="Comic Sans MS,Arial,Verdana">+18:  ${adult}</font>
                        <br />
                     <font face="Comic Sans MS,Arial,Verdana">Genre ID's:  ${mtz}</font>
                         <br />
                            <font face="Comic Sans MS,Arial,Verdana">Original Languaje: ${original_language}</font>
                                <br />
                                    <font face="Comic Sans MS,Arial,Verdana">Original Title: ${original_title}</font>
                                        <br />
                                        <font face="Comic Sans MS,Arial,Verdana">Popuplarity: ${popularity}</font>
                                        <br />
                                            <font face="Comic Sans MS,Arial,Verdana">Release Date:  ${release_date}</font>
                                                <br />
                                                <font face="Comic Sans MS,Arial,Verdana">Vote average ${vote_average}</font>
                                                    <br />
                                                    <font face="Comic Sans MS,Arial,Verdana">Vote count ${vote_count}</font>
              </article>`

         );

         
         
         const main: HTMLElement | null = document.querySelector("main");
         
         main!.append(article);

  }

  }
}