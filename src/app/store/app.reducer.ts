import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../security/store/auth.reducer';
import * as fromDirectories from '../admin/directories/store/directories.reducer';
import * as fromFiles from '../admin/files/store/files.reducer';
import * as fromMessaging from '../admin/messaging/store/messaging.reducer';
import * as fromUsers from '../admin/users/store/users.reducer';
import * as fromVisits from '../admin/visits/store/visits.reducer';
import * as fromPersonalInfo from '../admin/cv/personal-info/store/personalInfo.reducer';
import * as fromContactInfo from '../admin/cv/contact-info/store/contactInfo.reducer';
import * as fromCVFiles from '../admin/cv/cv-files/store/cvfiles.reducer';
import * as fromEducation from '../admin/cv/education/store/education.reducer';
import * as fromExperiences from '../admin/cv/experiences/store/experiences.reducer';
import * as fromLanguages from '../admin/cv/languages/store/languages.reducer';
import * as fromTrainingCourses from '../admin/cv/training-courses/store/courses.reducer';
import * as fromSkills from '../admin/cv/skills/store/skills.reducer';
import * as fromTags from '../admin/tags/store/tags.reducer';

export interface AppState {
    auth: fromAuth.State,
    directories: fromDirectories.State,
    files: fromFiles.State,
    messaging: fromMessaging.State,
    users: fromUsers.State,
    visits: fromVisits.State,
    personalInfo: fromPersonalInfo.State,
    contactInfo: fromContactInfo.State,
    cvFiles: fromCVFiles.State,
    education: fromEducation.State,
    experiences: fromExperiences.State,
    languages: fromLanguages.State,
    courses: fromTrainingCourses.State,
    skills: fromSkills.State,
    tags: fromTags.State,
}

export const appReducer: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer,
    directories: fromDirectories.directoriesReducer,
    files: fromFiles.filesReducer,
    messaging: fromMessaging.messagesReducer,
    users: fromUsers.usersReducer,
    visits: fromVisits.visitsReducer,
    personalInfo: fromPersonalInfo.personalInfoReducer,
    contactInfo: fromContactInfo.ContactInfoReducer,
    cvFiles: fromCVFiles.cvFilesReducer,
    education: fromEducation.educationReducer,
    experiences: fromExperiences.educationReducer,
    languages: fromLanguages.languageReducer,
    courses: fromTrainingCourses.courseReducer,
    skills: fromSkills.skillsReducer,
    tags: fromTags.tagsReducer,
}
