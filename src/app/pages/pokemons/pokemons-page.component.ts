import { ApplicationRef, ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router } from '@angular/router';

import { toSignal } from '@angular/core/rxjs-interop'
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'pokemons-page',
    imports: [PokemonListComponent, PokemonListSkeletonComponent],
    standalone: true,
    templateUrl: './pokemons-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PokemonsPageComponent implements OnInit{

  private pokemonsService = inject(PokemonsService);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  public pokemons = signal<SimplePokemon[]>([]);

  public currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      map( params => params.get('page') ?? '1' ),
      map( page => (isNaN(+page) ? 1 : +page ) ),
      map( page => Math.max( 1 , page ) )
    )
  )

  // public isLoading = signal(true);

  // private appRef = inject(ApplicationRef);

  // private $appState = this.appRef.isStable.subscribe( isStable => {
  //   console.log(isStable);
  // } )

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.isLoading.set(false);
    // }, 5000);
    this.loadPokemons();
  }

  public loadPokemons( page = 0 ){

    const pageToLoad = this.currentPage()! + page;

    this.pokemonsService.loadPage(pageToLoad)
    .pipe(
      tap( () => this.router.navigate([], { queryParams: { page: pageToLoad } }) ),
      tap( () => this.title.setTitle(`Pokemons SSR - Page ${ pageToLoad }`) )
    )
    .subscribe( (pokemons) => this.pokemons.set(pokemons))
  }

  aumentar(){
    this.currentPage
  }

}
