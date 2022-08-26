import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule} from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';
import { VinculoInfoComponent } from './vinculo-info/vinculo-info.component';



@NgModule({
    declarations: [
  
    VinculoInfoComponent
  ],
    imports: [
      CommonModule,
      MatToolbarModule,
      MatIconModule,
      MatButtonModule,
      MatSidenavModule,
      MatFormFieldModule,
      MatInputModule,
      MatCardModule,
      MatListModule,
      MatTableModule,
      MatDialogModule,
      MatSelectModule,
      MatChipsModule,
      MatDividerModule,
      MatSlideToggleModule,
      MatMenuModule,
      MatProgressBarModule,
      MatExpansionModule,
      MatBadgeModule
    ],
    exports: [
      MatToolbarModule,
      MatIconModule,
      MatButtonModule,
      MatSidenavModule,
      MatFormFieldModule,
      MatInputModule,
      MatCardModule,
      MatListModule,
      MatTableModule,
      MatDialogModule,
      MatSelectModule,
      MatSortModule,
      MatPaginatorModule,
      MatSnackBarModule,
      MatGridListModule,
      MatProgressSpinnerModule,
      MatTooltipModule,
      MatCheckboxModule,
      MatChipsModule,
      MatDividerModule,
      MatSlideToggleModule,
      MatMenuModule,
      MatProgressBarModule,
      MatExpansionModule,
      MatBadgeModule
    ],
  })
  export class MaterialModule { }