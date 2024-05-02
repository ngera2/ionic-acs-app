import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit, OnDestroy {
 recipes?: Recipe[];
  constructor(private recipeService: RecipesService) { 

  }
  
  ngOnInit() {
    console.log('on init');
  }

  ionViewWillEnter(){
    this.recipes = this.recipeService.getAllRecipes();
    console.log('will enter');
  }

  ionViewDidEnter(){
    console.log('did enter');
  }

  ionViewWillLeave(){
    console.log('will leave');
  }

  ionViewDidLeave(){
    console.log('did leave');
  }
  
  ngOnDestroy(): void {
    console.log('destroyed recipes');
    
  }
}
