/*
 * Public API Surface of ngx-helper
 */

export { NgxHelperComponent } from './lib/ngx-helper.component';
export { NgxHelperModule } from './lib/ngx-helper.module';

export { INgxHelperConfig, INgxHelperStyle } from './lib/ngx-helper.interface';
export { NGX_HELPER_LOADING_HEADER } from './lib/ngx-helper.values';

export { NgxHelperConnectionService, NgxHelperContainerService, NgxHelperLoadingService } from './lib/providers';

// BOTTOM SHEET
export { INgxHelperBottomSheetConfig } from './lib/bottom-sheet/ngx-helper-bottom-sheet.interface';
export { NgxHelperBottomSheetService } from './lib/bottom-sheet/ngx-helper-bottom-sheet.service';

// CONFIRM
export { NgxHelperConfirmService } from './lib/confirm/ngx-helper-confirm.service';

// COORDINATES
export { INgxHelperCoordinates, INgxHelperCoordinatesConfig } from './lib/coordinates/ngx-helper-coordinates.interface';
export { NgxHelperCoordinatesService } from './lib/coordinates/ngx-helper-coordinates.service';

// DIALOG
export { INgxHelperDialogConfig } from './lib/dialog/ngx-helper-dialog.interface';
export { NgxHelperDialogService } from './lib/dialog/ngx-helper-dialog.service';

// IMAGE
export { NgxHelperImageService } from './lib/image/ngx-helper-image.service';
