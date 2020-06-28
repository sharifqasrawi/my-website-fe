import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../security/store/auth.reducer';
import * as fromDirectories from '../admin/directories/store/directories.reducer';
import * as fromFiles from '../admin/files/store/files.reducer';
import * as fromMessaging from '../admin/messaging/store/messaging.reducer';
import * as fromUsers from '../admin/users/store/users.reducer';
import * as fromVisits from '../admin/visits/store/visits.reducer';

export interface AppState {
    auth: fromAuth.State,
    directories: fromDirectories.State,
    files: fromFiles.State,
    messaging: fromMessaging.State,
    users: fromUsers.State,
    visits: fromVisits.State,
}

export const appReducer: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer,
    directories: fromDirectories.directoriesReducer,
    files: fromFiles.filesReducer,
    messaging: fromMessaging.messagesReducer,
    users: fromUsers.usersReducer,
    visits: fromVisits.visitsReducer,
}