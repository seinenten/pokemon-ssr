import { TestBed } from "@angular/core/testing";
import { routes } from "./app.routes";
import { provideRouter, Router } from "@angular/router";
import { Location } from '@angular/common';

describe('App Routes', () => {

  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter( routes )
      ]
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });


  it('Should navigate to "about" redirects to "/about" ', async() => {
    await router.navigate(['about']);
    expect(location.path()).toBe('/about');
  });

  it('Should navigate to "pricing" redirects to "/pricing" ', async() => {
    await router.navigate(['pricing']);
    expect(location.path()).toBe('/pricing');
  });

  it('Should navigate to "contact" redirects to "/contact" ', async() => {
    await router.navigate(['contact']);
    expect(location.path()).toBe('/contact');
  });

  it('Should navigate to "pokemons/page/1" redirects to "/pokemons/page/1" ', async() => {
    await router.navigate(['pokemons/page/1']);
    expect(location.path()).toBe('/pokemons/page/1');
  });

  it('Should navigate to "**" redirects to "/about" ', async() => {
    await router.navigate(['uknowPage']);
    expect(location.path()).toBe('/about');
  });

  it('Should load the proper component ', async() => {
    const aboutRoute = routes.find((route) => route.path === 'about')!;
    expect(aboutRoute).toBeDefined();

    const aboutComponent = await aboutRoute.loadComponent!() as any;
    expect( aboutComponent.default.name ).toBe('AboutPageComponent');

    const pokemonsPageRoute = routes.find((route) => route.path === 'pokemons/page/:page')!;
    expect(aboutRoute).toBeDefined();

    const pokemonsPageComponent = await pokemonsPageRoute.loadComponent!() as any;
    expect( pokemonsPageComponent.default.name ).toBe('PokemonsPageComponent');

  });


})
