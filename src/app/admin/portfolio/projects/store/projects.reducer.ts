import { ProjectImage } from './../../../../models/projectImage.model';
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

    creatingImage: boolean,
    createdImage: boolean,
    updatingImage: boolean,
    updatedImage: boolean,
    deletingImage: boolean,
    deletedImage: boolean,
    errorsImages: string[],
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

    creatingImage: false,
    createdImage: false,
    updatingImage: false,
    updatedImage: false,
    deletingImage: false,
    deletedImage: false,
    errorsImages: null,
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
                slug_EN: action.payload.slug_EN,
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
                slug_FR: action.payload.slug_FR,
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

        case ProjectsActions.CREATE_IMAGE_START:
            return {
                ...state,
                creatingImage: true,
                createdImage: false,
                errorsImages: null
            };
        case ProjectsActions.CREATE_IMAGE_SUCCESS:
            const projectToAddImageIndex = state.projects.findIndex(p => p.id === action.payload.projectId);
            const projectToAddImage = state.projects.find(p => p.id === action.payload.projectId);
            const projectsAfterAddImage = [...state.projects];

            const projectAfterAddImage: Project = {
                ...projectToAddImage,
                projectImages: [...projectToAddImage.projectImages, action.payload]
            };

            projectsAfterAddImage[projectToAddImageIndex] = projectAfterAddImage;

            return {
                ...state,
                creatingImage: false,
                createdImage: true,
                projects: [...projectsAfterAddImage]
            };
        case ProjectsActions.CREATE_IMAGE_FAIL:
            return {
                ...state,
                creatingImage: false,
                errorsImages: [...action.payload]
            };

        ///////////

        case ProjectsActions.UPDATE_IMAGE_START:
            return {
                ...state,
                updatingImage: true,
                updatedImage: false,
                errorsImages: null
            };
        case ProjectsActions.UPDATE_IMAGE_SUCCESS:
            const projectToUpdateImageIndex = state.projects.findIndex(p => p.id === action.payload.projectId);
            const projectToUpdateImage = state.projects.find(p => p.id === action.payload.projectId);
            const projectsAfterUpdateImage = [...state.projects];

            const projectToUpdateImageImages = [...projectToUpdateImage.projectImages];
            const projectImageToUpdate = projectToUpdateImageImages.find(i => i.id === action.payload.id);
            const projectImageToUpdateIndex = projectToUpdateImageImages.findIndex(i => i.id === action.payload.id);

            const projectImageAfterUpdate: ProjectImage = {
                ...projectImageToUpdate,
                caption_EN: action.payload.caption_EN,
                caption_FR: action.payload.caption_FR,
                path: action.payload.path,
                isDisplayed: action.payload.isDisplayed
            };

            projectToUpdateImageImages[projectImageToUpdateIndex] = projectImageAfterUpdate;

            const projectAfterUpdateImage: Project = {
                ...projectToUpdateImage,
                projectImages: [...projectToUpdateImageImages]
            };

            projectsAfterUpdateImage[projectToUpdateImageIndex] = projectAfterUpdateImage;

            return {
                ...state,
                updatingImage: false,
                updatedImage: true,
                projects: [...projectsAfterUpdateImage]
            };
        case ProjectsActions.UPDATE_IMAGE_FAIL:
            return {
                ...state,
                updatingImage: false,
                errorsImages: [...action.payload]
            };

        ///////////

        case ProjectsActions.DELETE_IMAGE_START:
            return {
                ...state,
                deletingImage: true,
                deletedImage: false,
                errorsImages: null
            };
        case ProjectsActions.DELETE_IMAGE_SUCCESS:
            const projectToDeleteImageIndex = state.projects.findIndex(p => p.id === action.payload.projectId);
            const projectToDeleteImage = state.projects.find(p => p.id === action.payload.projectId);
            const projectsAfterDeleteImage = [...state.projects];

            const projectToDeleteImageImages = [...projectToDeleteImage.projectImages];
            const projectImageToDeleteIndex = projectToDeleteImageImages.findIndex(i => i.id === action.payload.deletedProjectImageId);

            projectToDeleteImageImages.splice(projectImageToDeleteIndex, 1);

            const projectAfterDeleteImage: Project = {
                ...projectToDeleteImage,
                projectImages: [...projectToDeleteImageImages]
            };

            projectsAfterDeleteImage[projectToDeleteImageIndex] = projectAfterDeleteImage;

            return {
                ...state,
                deletingImage: false,
                deletedImage: true,
                projects: [...projectsAfterDeleteImage]
            };
        case ProjectsActions.DELETE_IMAGE_FAIL:
            return {
                ...state,
                deletingImage: false,
                errorsImages: [...action.payload]
            };

        ///////////


        case ProjectsActions.CLEAR_ERRORS:
            return {
                ...state,
                errors: null,
                errorsImages: null
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
                creatingImage: false,
                createdImage: false,
                updatingImage: false,
                updatedImage: false,
                deletingImage: false,
                deletedImage: false,
            };
        case ProjectsActions.CLEAR_CREATE:
            return {
                ...state,
                creating: false,
                created: false,
                updating: false,
                updated: false,
                creatingImage: false,
                createdImage: false,
                updatingImage: false,
                updatedImage: false,
            };

        default:
            return state;
    }
}
