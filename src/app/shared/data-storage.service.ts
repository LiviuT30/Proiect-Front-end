import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { exhaustMap, map, take, tap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.authService.user.pipe(take(1),
    exhaustMap(user => {
      return this.http
      .put(
        'https://speedrun-a1ff9-default-rtdb.europe-west1.firebasedatabase.app/recipes.json?auth=' + user.token,
        recipes );
       } ))
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.authService.user.pipe(take(1),
    exhaustMap(user => {
      return this.http
      .get<Recipe[]>(
        'https://speedrun-a1ff9-default-rtdb.europe-west1.firebasedatabase.app/recipes.json?auth=' + user.token
      )
    }),
    map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    }),
    tap(recipes => {
      this.recipeService.setRecipes(recipes);
    }));
  }
}
