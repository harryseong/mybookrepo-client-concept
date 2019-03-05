import {NgModule} from '@angular/core';

import {OverlayModule} from '@angular/cdk/overlay';
import {A11yModule} from '@angular/cdk/a11y';
import {BidiModule} from '@angular/cdk/bidi';
import {ObserversModule} from '@angular/cdk/observers';
import {PortalModule} from '@angular/cdk/portal';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatMenuModule,
  MatToolbarModule,
  MatCommonModule,
  MatButtonToggleModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatTooltipModule,
  MatSlideToggleModule,
  MatDialogModule,
  MatSnackBarModule,
  MatAutocompleteModule,
  MatProgressSpinnerModule,
  MatSliderModule,
  MatSidenavModule,
  MatTabsModule,
  MatStepperModule,
  MatDividerModule,
  MatProgressBarModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';

const materialModules = [
  OverlayModule,
  PortalModule,
  BidiModule,
  A11yModule,
  ObserversModule,
  BrowserAnimationsModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatMenuModule,
  MatToolbarModule,
  MatButtonModule,
  MatCommonModule,
  MatButtonToggleModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatTooltipModule,
  MatSlideToggleModule,
  MatDialogModule,
  MatSnackBarModule,
  MatAutocompleteModule,
  MatProgressSpinnerModule,
  MatSliderModule,
  MatSidenavModule,
  MatTabsModule,
  MatStepperModule,
  MatDividerModule,
  MatProgressBarModule,
  DragDropModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
];

@NgModule({
  imports: materialModules,
  exports: materialModules,
})
export class MaterialModule {}
