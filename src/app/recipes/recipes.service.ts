import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipes: Recipe[] = [
    {
      id: 'r1',
      title: 'my one',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Casque_Skanderbeg_Vienne.jpg/786px-Casque_Skanderbeg_Vienne.jpg?20200811060012',
      ingredients: ['French fries', 'pork meat', 'salad']
    },
    {
      id: 'r2',
      title: 'my two',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Hatt_-_Livrustkammaren_-_56274.tif/lossy-page1-120px-Hatt_-_Livrustkammaren_-_56274.tif.jpg',
      ingredients: ['French fries', 'pork meat', 'salad']
    }
  ]
  constructor() { }

  getAllRecipes() {
    return [...this.recipes];
  }

  getRecipe(recipeId: string | null) {
    return { ...this.recipes.find(r => r.id === recipeId) };
  }

  deleteRecipe(recipeId?: string) {
    this.recipes = this.recipes.filter(r => r.id !== recipeId);
  }
}
