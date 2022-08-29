import { Component } from '@angular/core';

@Component({
    template: `
    <div class="p-4">
        <div class="container">
            <router-outlet></router-outlet>
        </div>
    </div>
    `

})
export class LayoutComponent { }