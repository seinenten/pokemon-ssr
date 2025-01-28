import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCardComponent } from './pokemon-card.component';
import { provideRouter } from '@angular/router';
import { SimplePokemon } from '../../interfaces';

const mockPokemon: SimplePokemon = {
  id: '1',
  name: 'charmander'
}

describe('PokemonCardComponent', () => {

  let fixture: ComponentFixture<PokemonCardComponent>
  let compiled: HTMLElement;
  let component: PokemonCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCardComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCardComponent);
    fixture.componentRef.setInput('pokemon', mockPokemon);

    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
    //console.log(compiled);
  });

  it('should have the simplePokemon signal inputValue', () => { // TS
    expect(component.pokemon()).toEqual(mockPokemon);
    //console.log(compiled);
  });

  it('should render the pokemon name and image correctly', () => { // HTML
    expect(compiled.querySelector('h2')?.innerHTML.trim()).toBe(mockPokemon.name);
    // || compiled.textContent
    const image = compiled.querySelector('img')!;
    expect(image).toBeDefined;
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mockPokemon.id}.png`;
    expect(image.src).toBe(imageUrl);
  });

  it('should haver the proper ng-reflect-router-link', () => { // HTML
    //console.log(compiled);
    const divWithLink = compiled.querySelector('div');

    expect(divWithLink?.attributes.getNamedItem('ng-reflect-router-link')?.value
    ).toBe(`/pokemons,${mockPokemon.name}`);

  });

});
