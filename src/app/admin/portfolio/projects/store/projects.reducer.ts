import { Project } from './../../../../models/project.model';

import * as ProjectsActions from './projects.actions';

export interface State {
    projects: Project[],
    loading: boolean,
    loaded: boolean,
    creating: boolean,
    created: boolean,
    updating: boolean,
    updated: boolean,
    updatingTags: boolean,
    updatedTags: boolean,
    deleting: boolean,
    deleted: boolean,
    errors: string[],
}

const initialState: State = {
    projects: [],
    loading: false,
    loaded: false,
    creating: false,
    created: false,
    updating: false,
    updated: false,
    updatingTags: false,
    updatedTags: false,
    deleting: false,
    deleted: false,
    errors: null,
};

export function projectsReducer(state: State = initialState, action: ProjectsActions.ProjectsActions) {
    switch (action.type) {

        case ProjectsActions.FETCH_START:
            return {
                ...state,
                loading: true,
                loaded: false,
                errors: null
            };
        case ProjectsActions.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                projects: [...action.payload]
            };
        case ProjectsActions.FETCH_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload]
            };


        ///////////

        case ProjectsActions.CREATE_START:
            return {
                ...state,
                creating: true,
                created: false,
                errors: null
            };
        case ProjectsActions.CREATE_SUCCESS:
            return {
                ...state,
                creating: false,
                created: true,
                projects: [...state.projects, action.payload]
            };
        case ProjectsActions.CREATE_FAIL:
            return {
                ...state,
                creating: false,
                errors: [...action.payload]
            };

        ///////////

        case ProjectsActions.UPDATE_START:
            return {
                ...state,
                updating: true,
                updated: false,
                errors: null
            };
        case ProjectsActions.UPDATE_SUCCESS:
            const projectToUpdateIndex = state.projects.findIndex(e => e.id === action.payload.id);
            const projectToUpdate = state.projects.find(e => e.id === action.payload.id);
            const projectsAfterUpdate = [...state.projects];

            const projectAfterUpdate: Project = {
                ...projectToUpdate,
                name_EN: action.payload.name_EN,
                description_EN: action.payload.description_EN,
                type: action.payload.type,
                size: action.payload.size,
                gitHubUrl: action.payload.gitHubUrl,
                isDisplayed: action.payload.isDisplayed,
                liveDemoUrl: action.payload.liveDemoUrl,
                videoDemoUrl: action.payload.videoDemoUrl,
                videoDemoUrlExt: action.payload.videoDemoUrlExt,
                imagePath: action.payload.imagePath,
                name_FR: action.payload.name_FR,
                description_FR: action.payload.description_FR
            };

            projectsAfterUpdate[projectToUpdateIndex] = projectAfterUpdate;

            return {
                ...state,
                updating: false,
                updated: true,
                projects: [...projectsAfterUpdate]
            };
        case ProjectsActions.UPDATE_FAIL:
            return {
                ...state,
                updating: false,
                errors: [...action.payload]
            };


        ///////////

        case ProjectsActions.DELETE_START:
            return {
                ...state,
                deleting: true,
                deleted: false,
                errors: null
            };
        case ProjectsActions.DELETE_SUCCESS:
            const projectToDeleteIndex = state.projects.findIndex(e => e.id === action.payload);
            const projectsAfterDelete = [...state.projects];

            projectsAfterDelete.splice(projectToDeleteIndex, 1);

            return {
                ...state,
                deleting: false,
                deleted: true,
                projects: [...projectsAfterDelete]
            };
        case ProjectsActions.DELETE_FAIL:
            return {
                ...state,
                deleting: false,
                errors: [...action.payload]
            };

        /////////////

        case ProjectsActions.ADD_REMOVE_TAG_START:
            return {
                ...state,
                updatingTags: true,
                updatedTags: false,
                errors: null
            };
        case ProjectsActions.ADD_REMOVE_TAG_SUCCESS:
            const projectToChangeIndex = state.projects.findIndex(c => c.id === action.payload.id);
            const projectToChange = state.projects.find(c => c.id === action.payload.id);
            const projectsAfterChange = [...state.projects];

            const projectAfterChange = {
                ...projectToChange,
                tags: [
                    ...action.payload.tags
                ]
            };

            projectsAfterChange[projectToChangeIndex] = projectAfterChange;

            return {
                ...state,
                updatingTags: false,
                updatedTags: true,
                projects: projectsAfterChange
            };
        case ProjectsActions.ADD_REMOVE_TAG_FAIL:
            return {
                ...state,
                updatingTags: false,
                errors: [...action.payload]
            };

        ///////////


        case ProjectsActions.CLEAR_ERRORS:
            return {
                ...state,
                errors: null
            };
        case ProjectsActions.CLEAR_STATUS:
            return {
                ...state,
                loading: false,
                loaded: false,
                creating: false,
                created: false,
                updating: false,
                updated: false,
                deleting: false,
                deleted: false,
            };
        case ProjectsActions.CLEAR_CREATE:
            return {
                ...state,
                creating: false,
                created: false,
                updating: false,
                updated: false,
            };

        default:
            return state;
    }
}
