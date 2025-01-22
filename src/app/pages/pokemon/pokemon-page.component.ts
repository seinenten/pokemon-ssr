import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../pokemons/interfaces';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
    selector: 'pokemon-page',
    imports: [],
    standalone: true,
    templateUrl: './pokemon-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PokemonPageComponent implements OnInit{

  private pokemonsService = inject(PokemonsService);
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);

  public pokemon = signal<Pokemon | null>(null);

  ngOnInit(): void {
    this.loadPokemon();
  }

  loadPokemon(){
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.pokemonsService.loadPokemon(id)
    .pipe(
      tap( ({ id, name }) => {

        const pageTitle = `#${ id } - ${ name }`;
        const pageDescription = `Pagina del pokemon ${ name }`;
        const pageImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

        this.title.setTitle(pageTitle),
        this.meta.updateTag({ name: `description`, content: pageDescription });
        this.meta.updateTag({ name: `og:title`, content: pageTitle });
        this.meta.updateTag({ name: `og:description`, content: pageDescription });
        this.meta.updateTag({ name: `og:image`, content: pageImage });
      } )
    )
    .subscribe(this.pokemon.set)
  }



}
