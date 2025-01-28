import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { SimplePokemon, PokeAPIResponse, Pokemon } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  private http = inject(HttpClient);

  public loadPage( page:number ): Observable<SimplePokemon[]>{

    if ( page !== 0){
      --page;
    }
    page = Math.max(0, page);

    const url = `https://pokeapi.co/api/v2/pokemon?offset=${ page * 20 }&limit=20`

    return this.http.get<PokeAPIResponse>(url).pipe(
      map(
        resp => {
          const simplePokemons: SimplePokemon[] = resp.results.map( pokemon => ({
            id: pokemon.url.split('/').at(-2) ?? '',
            name: pokemon.name
          }))

          return simplePokemons;

        }
      ),
    )
  }

  loadPokemon(id: string | number){
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    return this.http.get<Pokemon>(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError( err: HttpErrorResponse ){

    if ( err.status === 0){
      console.log('An error ocurred:', err.error);
    }else {
      console.log(`Backend returned code ${ err.status }, body:`, err.error);
    }

    const errorMessage = err.error ?? 'An error ocurred';

    return throwError( () => new Error(errorMessage));

  }
}
