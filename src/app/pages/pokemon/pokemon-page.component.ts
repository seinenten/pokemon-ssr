import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../pokemons/interfaces';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon-page',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent implements OnInit{

  private pokemonsService = inject(PokemonsService);
  private route = inject(ActivatedRoute);

  public pokemon = signal<Pokemon | null>(null);

  ngOnInit(): void {
    this.loadPokemon();
  }

  loadPokemon(){
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.pokemonsService.loadPokemon(id).subscribe(this.pokemon.set)
  }



}
