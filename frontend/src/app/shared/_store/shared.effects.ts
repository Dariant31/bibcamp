import {Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';

@Injectable()
export class SharedEffects {

    constructor(
        private actions$: Actions,
    ) {
    }
}
