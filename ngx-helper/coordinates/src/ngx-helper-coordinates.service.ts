import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Helper } from '@webilix/helper-library';

import { NgxHelperCoordinatesGetComponent } from './get/ngx-helper-coordinates-get.component';
import { NgxHelperCoordinatesShowComponent } from './show/ngx-helper-coordinates-show.component';

import { INgxHelperCoordinates, INgxHelperCoordinatesConfig } from './ngx-helper-coordinates.interface';

@Injectable()
export class NgxHelperCoordinatesService {
    private _dialogConfig: MatDialogConfig = {
        autoFocus: false,
        width: '100vw',
        maxWidth: 'none',
        height: '100vh',
        maxHeight: 'none',
        direction: 'rtl',
        hasBackdrop: false,
        panelClass: 'ngx-helper-full-dialog',
    };

    constructor(private readonly matDialog: MatDialog) {}

    private updateCoordinatesConfig(config?: Partial<INgxHelperCoordinatesConfig>): INgxHelperCoordinatesConfig {
        return {
            zoom: config?.zoom || 15,
            image: config?.image,
            color: config?.color ? Helper.COLOR.toHEX(config.color) || undefined : undefined,
            view: config?.view,
        };
    }

    get(coordinates: INgxHelperCoordinates): Promise<INgxHelperCoordinates>;
    get(config: Partial<INgxHelperCoordinatesConfig>): Promise<INgxHelperCoordinates>;
    get(
        coordinates: INgxHelperCoordinates,
        config: Partial<INgxHelperCoordinatesConfig>,
    ): Promise<INgxHelperCoordinates>;
    get(arg1?: any, arg2?: any): Promise<INgxHelperCoordinates> {
        const coordinates: INgxHelperCoordinates | undefined = 'latitude' in arg1 ? arg1 : undefined;
        const config: Partial<INgxHelperCoordinatesConfig> | undefined =
            arg2 || (arg1 && !coordinates ? arg1 : undefined);

        return new Promise<INgxHelperCoordinates>((resolve, reject) => {
            this.matDialog
                .open(NgxHelperCoordinatesGetComponent, {
                    ...this._dialogConfig,
                    data: { coordinates, config: this.updateCoordinatesConfig(config) },
                })
                .afterClosed()
                .subscribe({
                    next: (coordinates?: INgxHelperCoordinates) => (coordinates ? resolve(coordinates) : reject()),
                });
        });
    }

    show(coordinates: INgxHelperCoordinates, config?: Partial<Omit<INgxHelperCoordinatesConfig, 'view'>>): void {
        this.matDialog.open(NgxHelperCoordinatesShowComponent, {
            ...this._dialogConfig,
            data: { coordinates, config: this.updateCoordinatesConfig(config) },
        });
    }
}
