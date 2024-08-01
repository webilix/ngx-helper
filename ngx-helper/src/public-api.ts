/*
 * Public API Surface of ngx-helper
 */

export { NgxHelperComponent } from './lib/ngx-helper.component';
export { NgxHelperModule } from './lib/ngx-helper.module';

export { INgxHelperConfig, INgxHelperStyle } from './lib/ngx-helper.interface';
export { NGX_HELPER_LOADING_HEADER } from './lib/ngx-helper.values';

export { NgxHelperConnectionService, NgxHelperContainerService, NgxHelperLoadingService } from './lib/providers';

// BOTTOM SHEET
export { INgxHelperBottomSheetConfig, NgxHelperBottomSheetService } from './lib/components/bottom-sheet';

// CONFIRM
export {
    INgxHelperConfirm,
    INgxHelperConfirmConfig,
    INgxHelperConfirmResponse,
    NgxHelperConfirm,
    NgxHelperConfirmService,
} from './lib/components/confirm';

// COORDINATES
export {
    INgxHelperCoordinates,
    INgxHelperCoordinatesConfig,
    NgxHelperCoordinatesService,
} from './lib/components/coordinates';

// DIALOG
export { INgxHelperDialogConfig, NgxHelperDialogService } from './lib/components/dialog';

// HTTP
export { INgxHelperHttpUpload, NgxHelperHttpService } from './lib/components/http';

// IMAGE
export { NgxHelperImageService } from './lib/components/image';

// TOAST
export { INgxHelperToastConfig, NgxHelperToast, NgxHelperToastService } from './lib/components/toast';
