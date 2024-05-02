import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-resipe-detail',
  templateUrl: './resipe-detail.page.html',
  styleUrls: ['./resipe-detail.page.scss'],
})
export class ResipeDetailPage implements OnInit {
  loadedRecipe?: Recipe;
  constructor(private activateRoute: ActivatedRoute,
    private recipeService: RecipesService,
    private router: Router,
    private alterCtrl: AlertController
  ) { }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('recipeId')) {
        this.router.navigate(['/recipes']);
        return;
      }
      const recipeId = paramMap.get('recipeId');
      this.loadedRecipe = this.recipeService.getRecipe(recipeId);
    })
  }

  onDeleteRecipe() {
    this.alterCtrl.create({
      header: 'Are you sure?',
      message: 'Do you really want to delete the recipe?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Delete',
        handler: () => {
          if (this.loadedRecipe) {
            this.recipeService.deleteRecipe(this.loadedRecipe.id);
            this.router.navigate(['/recipes']);
          }
        }
      }]
    }).then(alterEl => {
      alterEl.present();
    })
  }

  ionViewWillEnter(){
    console.log(' recipe details :  will enter');
  }

  ionViewDidEnter(){
    console.log('recipe details :did enter');
  }

  ionViewWillLeave(){
    console.log('recipe details :will leave');
  }

  ionViewDidLeave(){
    console.log('recipe details :did leave');
  }
  
  ngOnDestroy(): void {
    console.log('recipe details :destroyed recipes');
    
  }

}
