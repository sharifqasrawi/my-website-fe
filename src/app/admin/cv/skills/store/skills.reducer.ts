import { Skill } from './../../../../models/skill.model';
import { Category } from './../../../../models/category.model';

import * as SkillsActions from './skills.actions';


export interface State {
    skillCategories: Category[],
    loadingCategories: boolean,
    loadedCategories: boolean,
    creatingCategory: boolean,
    createdCategory: boolean,
    updatingCategory: boolean,
    updatedCategory: boolean,
    deletingCategory: boolean,
    deletedCategory: boolean,

    skills: Skill[],
    loadingSkills: boolean,
    loadedSkills: boolean,
    creatingSkill: boolean,
    createdSkill: boolean,
    updatingSkill: boolean,
    updatedSkill: boolean,
    deletingSkill: boolean,
    deletedSkill: boolean,
    errors: string[],
}

const initialState: State = {
    skillCategories: [],
    loadingCategories: false,
    loadedCategories: false,
    creatingCategory: false,
    createdCategory: false,
    updatingCategory: false,
    updatedCategory: false,
    deletingCategory: false,
    deletedCategory: false,

    skills: [],
    loadingSkills: false,
    loadedSkills: false,
    creatingSkill: false,
    createdSkill: false,
    updatingSkill: false,
    updatedSkill: false,
    deletingSkill: false,
    deletedSkill: false,

    errors: null,
};

export function skillsReducer(state: State = initialState, action: SkillsActions.SkillsActions) {
    switch (action.type) {

        case SkillsActions.FETCH_CATEGORIES_START:
            return {
                ...state,
                loadingCategories: true,
                loadedCategories: false,
                errors: null
            };

        ////////////

        case SkillsActions.FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                loadingCategories: false,
                loadedCategories: true,
                skillCategories: [...action.payload]
            };

        ////////////

        case SkillsActions.FETCH_CATEGORIES_FAIL:
            return {
                ...state,
                loadingCategories: false,
                errors: [...action.payload]
            };

        ////////////

        case SkillsActions.CREATE_CATEGORY_START:
            return {
                ...state,
                creatingCategory: true,
                createdCategory: false,
                errors: null
            };

        ////////////

        case SkillsActions.CREATE_CATEGORY_SUCCESS:
            return {
                ...state,
                creatingCategory: false,
                createdCategory: true,
                skillCategories: [...state.skillCategories, action.payload]
            };

        ////////////

        case SkillsActions.CREATE_CATEGORY_FAIL:
            return {
                ...state,
                creatingCategory: false,
                errors: [...action.payload]
            };

        ////////////

        case SkillsActions.UPDATE_CATEGORY_START:
            return {
                ...state,
                updatingCategory: true,
                updatedCategory: false,
                errors: null
            };

        ////////////

        case SkillsActions.UPDATE_CATEGORY_SUCCESS:
            const categoryToUpdateIndex = state.skillCategories.findIndex(c => c.id === action.payload.id);
            const categoryToUpdate = state.skillCategories.find(c => c.id === action.payload.id);
            const categoriesAfterUpdate = [...state.skillCategories];

            const categoryAfterUpdate: Category = {
                ...categoryToUpdate,
                name_EN: action.payload.name_EN,
                name_FR: action.payload.name_FR,
            };

            categoriesAfterUpdate[categoryToUpdateIndex] = categoryAfterUpdate;

            return {
                ...state,
                updatingCategory: false,
                updatedCategory: true,
                skillCategories: [...categoriesAfterUpdate]
            };

        ////////////

        case SkillsActions.UPDATE_CATEGORY_FAIL:
            return {
                ...state,
                updatingCategory: false,
                errors: [...action.payload]
            };

        ////////////

        case SkillsActions.DELETE_CATEGORY_START:
            return {
                ...state,
                deletingCategory: true,
                deletedCategory: false,
                errors: null
            };

        ////////////

        case SkillsActions.DELETE_CATEGORY_SUCCESS:
            const categoryToDeleteIndex = state.skillCategories.findIndex(c => c.id === action.payload);
            const categoriesAfterDelete = [...state.skillCategories];

            categoriesAfterDelete.splice(categoryToDeleteIndex, 1);

            return {
                ...state,
                deletingCategory: false,
                deletedCategory: true,
                skillCategories: [...categoriesAfterDelete]
            };

        ////////////

        case SkillsActions.DELETE_CATEGORY_FAIL:
            return {
                ...state,
                deletingCategory: false,
                errors: [...action.payload]
            };


        ////////////

        case SkillsActions.FETCH_SKILLS_START:
            return {
                ...state,
                loadingSkills: true,
                loadedSkills: false,
                errors: null
            };

        ////////////

        case SkillsActions.FETCH_SKILLS_SUCCESS:
          
            return {
                ...state,
                loadingSkills: false,
                loadedSkills: true,
                skills: [...action.payload]
            };

        ////////////

        case SkillsActions.FETCH_SKILLS_FAIL:
            return {
                ...state,
                loadingSkills: false,
                errors: [...action.payload]
            };

        ////////////

        case SkillsActions.CREATE_SKILL_START:
            return {
                ...state,
                creatingSkill: true,
                createdSkill: false,
                errors: null
            };

        ////////////

        case SkillsActions.CREATE_SKILL_SUCCESS:
            const categoryToAddSkillIndex = state.skillCategories.findIndex(c => c.id === action.payload.categoryId);
            const categoryToAddSkill = state.skillCategories.find(c => c.id === action.payload.categoryId);
            const categoriesAfterAddSkill = [...state.skillCategories];

            const categoryAfterAddSkill: Category = {
                ...categoryToAddSkill,
                skills: [...categoryToAddSkill.skills, action.payload]
            };

            categoriesAfterAddSkill[categoryToAddSkillIndex] = categoryAfterAddSkill;

            return {
                ...state,
                creatingSkill: false,
                createdSkill: true,
                skillCategories: [...categoriesAfterAddSkill]
            };

        ////////////

        case SkillsActions.CREATE_SKILL_FAIL:
            return {
                ...state,
                creatingSkill: false,
                errors: [...action.payload]
            };


        ////////////

        case SkillsActions.UPDATE_SKILL_START:
            return {
                ...state,
                updatingSkill: true,
                updatedSkill: false,
                errors: null
            };

        ////////////

        case SkillsActions.UPDATE_SKILL_SUCCESS:
            const categoryToUpdateSkillIndex = state.skillCategories.findIndex(c => c.id === action.payload.categoryId);
            const categoryToUpdateSkill = state.skillCategories.find(c => c.id === action.payload.categoryId);
            const categoriesAfterUpdateSkill = [...state.skillCategories];

            const categorySkills = [...categoryToUpdateSkill.skills];
            const skillToUpdateIndex = categorySkills.findIndex(s => s.id === action.payload.id);
            const skillToUpdate = categorySkills.find(s => s.id === action.payload.id);

            const skillAfterUpdate: Skill = {
                ...skillToUpdate,
                name_EN: action.payload.name_EN,
                name_FR: action.payload.name_FR,
                level: action.payload.level,
            };


            categorySkills[skillToUpdateIndex] = skillAfterUpdate;

            const categoryAfterUpdateSkill: Category = {
                ...categoryToUpdateSkill,
                skills: [...categorySkills]
            };

            categoriesAfterUpdateSkill[categoryToUpdateSkillIndex] = categoryAfterUpdateSkill;

            return {
                ...state,
                updatingSkill: false,
                updatedSkill: true,
                skillCategories: [...categoriesAfterUpdateSkill]
            };

        ////////////

        case SkillsActions.UPDATE_SKILL_FAIL:
            return {
                ...state,
                updatingSkill: false,
                errors: [...action.payload]
            };

        ////////////

        case SkillsActions.DELETE_SKILL_START:
            return {
                ...state,
                deletingSkill: true,
                deletedSkill: false,
                errors: null
            };

        ////////////

        case SkillsActions.DELETE_SKILL_SUCCESS:
            const categoryToDeleteSkillIndex = state.skillCategories.findIndex(c => c.id === action.payload.categoryId);
            const categoryToDeleteSkill = state.skillCategories.find(c => c.id === action.payload.categoryId);
            const categoriesAfterDeleteSkill = [...state.skillCategories];

            const categorySkillsAfterDelete = [...categoryToDeleteSkill.skills];
            const skillToDeleteIndex = categorySkillsAfterDelete.findIndex(s => s.id === action.payload.deletedSkillId);
            categorySkillsAfterDelete.splice(skillToDeleteIndex, 1);

            const categoryAfterDeleteSkill: Category = {
                ...categoryToDeleteSkill,
                skills: [...categorySkillsAfterDelete]
            };

            categoriesAfterDeleteSkill[categoryToDeleteSkillIndex] = categoryAfterDeleteSkill;

            return {
                ...state,
                deletingSkill: false,
                deletedSkill: true,
                skillCategories: [...categoriesAfterDeleteSkill]
            };

        ////////////

        case SkillsActions.DELETE_SKILL_FAIL:
            return {
                ...state,
                deletingSkill: false,
                errors: [...action.payload]
            };

        ////////////


        case SkillsActions.CLEAR_ERRORS:
            return {
                ...state,
                errors: null,
            };
        case SkillsActions.CLEAR_STATUS:
            return {
                ...state,
                loadingCategories: false,
                loadedCategories: false,
                creatingCategory: false,
                createdCategory: false,
                updatingCategory: false,
                updatedCategory: false,
                deletingCategory: false,
                deletedCategory: false,

                loadingSkills: false,
                loadedSkills: false,
                creatingSkill: false,
                createdSkill: false,
                updatingSkill: false,
                updatedSkill: false,
                deletingSkill: false,
                deletedSkill: false,
            };

        case SkillsActions.CLEAR_CREATE:
            return {
                ...state,
                creatingCategory: false,
                createdCategory: false,
                updatingCategory: false,
                updatedCategory: false,

                creatingSkill: false,
                createdSkill: false,
                updatingSkill: false,
                updatedSkill: false,
            };

        default:
            return state;
    }
}