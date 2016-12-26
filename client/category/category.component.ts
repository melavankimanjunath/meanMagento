import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../shared/services/category.service';
import { CategoryDetails } from '../shared/interfaces';

@Component({
    moduleId: module.id,
    selector: 'category-app',
    templateUrl: 'category.component.html',
    providers: [CategoryService]
})
export class CategoryComponent {

    title = 'Category Landing Page';
    catDetails: CategoryDetails[] = [];

    //categoryId: number = 21;
    
    constructor(private _categoryService: CategoryService) {  }

    ngOnInit() { 
        this._categoryService.getCategory()
            .subscribe((data: CategoryDetails[]) => this.catDetails = data);
    }

}