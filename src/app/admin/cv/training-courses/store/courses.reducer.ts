import { TrainingCourse } from './../../../../models/trainingCourse.model';
import { Document } from './../../../../models/document.model';
import * as TrainingCoursesActions from './courses.actions';

export interface State {
    courses: TrainingCourse[],
    creating: boolean,
    created: boolean,
    loading: boolean,
    loaded: boolean,
    creatingDoc: boolean,
    createdDoc: boolean,
    updating: boolean,
    updated: boolean,
    updatingDoc: boolean,
    updatedDoc: boolean,
    deleting: boolean,
    deleted: boolean,
    deletingDoc: boolean,
    deletedDoc: boolean,
    errors: string[],
}

const initialState: State = {
    courses: [],
    loading: false,
    loaded: false,
    creating: false,
    created: false,
    creatingDoc: false,
    createdDoc: false,
    updating: false,
    updated: false,
    updatingDoc: false,
    updatedDoc: false,
    deleting: false,
    deleted: false,
    deletingDoc: false,
    deletedDoc: false,
    errors: null,
};

export function courseReducer(state: State = initialState, action: TrainingCoursesActions.TrainingCoursesActions) {
    switch (action.type) {

        case TrainingCoursesActions.FETCH_START:
            return {
                ...state,
                loading: true,
                loaded: false,
                errors: null
            };
        case TrainingCoursesActions.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                courses: [...action.payload]
            };
        case TrainingCoursesActions.FETCH_FAIL:
            return {
                ...state,
                loading: true,
                errors: [...action.payload]
            };


        ///////////

        case TrainingCoursesActions.CREATE_START:
            return {
                ...state,
                creating: true,
                created: false,
                errors: null
            };
        case TrainingCoursesActions.CREATE_SUCCESS:
            return {
                ...state,
                creating: false,
                created: true,
                courses: [...state.courses, action.payload]
            };
        case TrainingCoursesActions.CREATE_FAIL:
            return {
                ...state,
                creating: true,
                errors: [...action.payload]
            };

        ///////////

        case TrainingCoursesActions.UPDATE_START:
            return {
                ...state,
                updating: true,
                updated: false,
                errors: null
            };
        case TrainingCoursesActions.UPDATE_SUCCESS:
            const courseToUpdateIndex = state.courses.findIndex(e => e.id === action.payload.id);
            const courseToUpdate = state.courses.find(e => e.id === action.payload.id);
            const coursesAfterUpdate = [...state.courses];

            const courseAfterUpdate: TrainingCourse = {
                ...courseToUpdate,
                name: action.payload.name,
                type: action.payload.type,
                duration: action.payload.duration,
                establishment: action.payload.establishment,
                dateTime: action.payload.dateTime,
                courseUrl: action.payload.courseUrl,
                country_EN: action.payload.country_EN,
                city_EN: action.payload.city_EN,
                country_FR: action.payload.country_FR,
                city_FR: action.payload.city_FR,
            };

            coursesAfterUpdate[courseToUpdateIndex] = courseAfterUpdate;

            return {
                ...state,
                updating: false,
                updated: true,
                courses: [...coursesAfterUpdate]
            };
        case TrainingCoursesActions.UPDATE_FAIL:
            return {
                ...state,
                updating: true,
                errors: [...action.payload]
            };


        ///////////

        case TrainingCoursesActions.DELETE_START:
            return {
                ...state,
                deleting: true,
                deleted: false,
                errors: null
            };
        case TrainingCoursesActions.DELETE_SUCCESS:
            const courseToDeleteIndex = state.courses.findIndex(e => e.id === action.payload);
            const coursesAfterDelete = [...state.courses];

            coursesAfterDelete.splice(courseToDeleteIndex, 1);

            return {
                ...state,
                deleting: false,
                deleted: true,
                courses: [...coursesAfterDelete]
            };
        case TrainingCoursesActions.DELETE_FAIL:
            return {
                ...state,
                deleting: true,
                errors: [...action.payload]
            };


        ///////////

        case TrainingCoursesActions.CREATE_DOC_START:
            return {
                ...state,
                creatingDoc: true,
                createdDoc: false,
                errors: null
            };
        case TrainingCoursesActions.CREATE_DOC_SUCCESS:
            const courseToAddDocIndex = state.courses.findIndex(e => e.id === action.payload.courseId);
            const courseToAddDoc = state.courses.find(e => e.id === action.payload.courseId);
            const coursesAfterAddDoc = [...state.courses];

            const courseAfterAddDoc: TrainingCourse = {
                ...courseToAddDoc,
                documents: [...courseToAddDoc.documents, action.payload]
            };

            coursesAfterAddDoc[courseToAddDocIndex] = courseAfterAddDoc;

            return {
                ...state,
                creatingDoc: false,
                createdDoc: true,
                courses: [...coursesAfterAddDoc]
            };
        case TrainingCoursesActions.CREATE_DOC_FAIL:
            return {
                ...state,
                creatingDoc: false,
                errors: [...action.payload]
            };

        ///////////

        case TrainingCoursesActions.UPDATE_DOC_START:
            return {
                ...state,
                updatingDoc: true,
                updatedDoc: false,
                errors: null
            };
        case TrainingCoursesActions.UPDATE_DOC_SUCCESS:
            const courseToUpdateDocIndex = state.courses.findIndex(e => e.id === action.payload.courseId);
            const courseToUpdateDoc = state.courses.find(e => e.id === action.payload.courseId);
            const coursesAfterUpdateDoc = [...state.courses];
            const courseDocsAfterUpdate = [...courseToUpdateDoc.documents];
            const courseDocToUpdateIndex = courseDocsAfterUpdate.findIndex(d => d.id === action.payload.id);
            const courseDocToUpdate = courseDocsAfterUpdate.find(d => d.id === action.payload.id);

            const courseDocAfterUpdate: Document = {
                ...courseDocToUpdate,
                name_EN: action.payload.name_EN,
                name_FR: action.payload.name_FR,
                description_EN: action.payload.description_EN,
                description_FR: action.payload.description_FR,
                path: action.payload.path,
                fileId: action.payload.fileId,
                type: action.payload.type,
                isDisplayed: action.payload.isDisplayed
            };

            courseDocsAfterUpdate[courseDocToUpdateIndex] = courseDocAfterUpdate;

            const courseAfterUpdateDoc: TrainingCourse = {
                ...courseToUpdateDoc,
                documents: [...courseDocsAfterUpdate]
            };

            coursesAfterUpdateDoc[courseToUpdateDocIndex] = courseAfterUpdateDoc;

            return {
                ...state,
                updatingDoc: false,
                updatedDoc: true,
                courses: [...coursesAfterUpdateDoc]
            };
        case TrainingCoursesActions.UPDATE_DOC_FAIL:
            return {
                ...state,
                updatingDoc: false,
                errors: [...action.payload]
            };

        ///////////

        case TrainingCoursesActions.DELETE_DOC_START:
            return {
                ...state,
                deletingDoc: true,
                deletedDoc: false,
                errors: null
            };
        case TrainingCoursesActions.DELETE_DOC_SUCCESS:
            const courseToDeleteDocIndex = state.courses.findIndex(e => e.id === action.payload.courseId);
            const courseToDeleteDoc = state.courses.find(e => e.id === action.payload.courseId);
            const coursesAfterDeleteDoc = [...state.courses];
            const courseDocsAfterDelete = [...courseToDeleteDoc.documents];
            const courseDocToDeleteIndex = courseDocsAfterDelete.findIndex(d => d.id === action.payload.deletedDocumentId);

            courseDocsAfterDelete.splice(courseDocToDeleteIndex, 1);


            const courseAfterDeleteDoc: TrainingCourse = {
                ...courseToDeleteDoc,
                documents: [...courseDocsAfterDelete]
            };

            coursesAfterDeleteDoc[courseToDeleteDocIndex] = courseAfterDeleteDoc;

            return {
                ...state,
                deletingDoc: false,
                deletedDoc: true,
                courses: [...coursesAfterDeleteDoc]
            };
        case TrainingCoursesActions.DELETE_DOC_FAIL:
            return {
                ...state,
                deletingDoc: false,
                errors: [...action.payload]
            };

        ///////////

        case TrainingCoursesActions.CLEAR_ERRORS:
            return {
                ...state,
                errors: null
            };
        case TrainingCoursesActions.CLEAR_STATUS:
            return {
                ...state,
                loading: false,
                loaded: false,
                creating: false,
                created: false,
                creatingDoc: false,
                createdDoc: false,
                updating: false,
                updated: false,
                updatingDoc: false,
                updatedDoc: false,
                deleting: false,
                deleted: false,
                deletingDoc: false,
                deletedDoc: false,
            };
        case TrainingCoursesActions.CLEAR_CREATE:
            return {
                ...state,
                creating: false,
                created: false,
                creatingDoc: false,
                createdDoc: false,
                updating: false,
                updated: false,
                updatingDoc: false,
                updatedDoc: false,
            };

        default:
            return state;
    }
}
