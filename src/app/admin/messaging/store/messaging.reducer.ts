import { EmailMessage } from './../../../models/emailMessage.model';
import { Message } from './../../../models/message.model';

import * as MessagingActions from './messaging.actions';


export interface State {
    messages: Message[],
    emailMessages: EmailMessage[],
    loading: boolean,
    loaded: boolean,
    sending: boolean,
    sent: boolean,
    errors: string[]
}

const initialState: State = {
    messages: [],
    emailMessages: [],
    loading: false,
    loaded: false,
    sending: false,
    sent: false,
    errors: null
};

export function messagesReducer(state: State = initialState, action: MessagingActions.MessagingActions) {
    switch (action.type) {
        case MessagingActions.SEND_START:
            return {
                ...state,
                sending: true,
                sent: false,
                errors: null,
            };
        case MessagingActions.SEND_SUCCESS:
            return {
                ...state,
                sending: false,
                sent: true,
            };
        case MessagingActions.SEND_FAIL:
            return {
                ...state,
                sending: false,
                errors: [...action.payload],
            };

        /////////////////////

        case MessagingActions.SEND_EMAIL_START:
            return {
                ...state,
                sending: true,
                sent: false,
                errors: null,
            };
        case MessagingActions.SEND_EMAIL_SUCCESS:
            return {
                ...state,
                sending: false,
                sent: true,
                emailMessages: [...state.emailMessages, action.payload]
            };
        case MessagingActions.SEND_EMAIL_FAIL:
            return {
                ...state,
                sending: false,
                errors: [...action.payload],
            };

        /////////////////////

        case MessagingActions.FETCH_START:
            return {
                ...state,
                loading: true,
                loaded: false,
                errors: null,
            };
        case MessagingActions.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                messages: [...action.payload]
            };
        case MessagingActions.FETCH_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload],
            };

        /////////////////////

        case MessagingActions.FETCH_EMAILS_START:
            return {
                ...state,
                loading: true,
                loaded: false,
                errors: null,
            };
        case MessagingActions.FETCH_EMAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                emailMessages: [...action.payload]
            };
        case MessagingActions.FETCH_EMAILS_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload],
            };

        ///////////////////

        case MessagingActions.DELETE_START:
            return {
                ...state,
                loading: true,
                errors: null,
            };
        case MessagingActions.DELETE_SUCCESS:
            const msgToDeleteIndex = state.messages.findIndex(m => m.id === action.payload);
            const messagesAfterDelete = [...state.messages];
            messagesAfterDelete.splice(msgToDeleteIndex, 1);

            return {
                ...state,
                loading: false,
                messages: messagesAfterDelete
            };
        case MessagingActions.DELETE_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload],
            };

        /////////////////////////

        case MessagingActions.CHANGE_SEEN_START:
            return {
                ...state,
                loading: true,
                errors: null,
            };
        case MessagingActions.CHANGE_SEEN_SUCCESS:
            const msgToChangeIndex = state.messages.findIndex(m => m.id === action.payload.id);
            const msgToChange = state.messages.find(m => m.id === action.payload.id);
            const messagesAfterChange = [...state.messages];

            const changedMessage = {
                ...msgToChange,
                isSeen: action.payload.isSeen,
                seenDateTime: action.payload.seenDateTime
            };

            messagesAfterChange[msgToChangeIndex] = changedMessage;

            return {
                ...state,
                loading: false,
                messages: messagesAfterChange
            };
        case MessagingActions.CHANGE_SEEN_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload],
            };

        /////////////////////////

        case MessagingActions.CLEAR_ERRORS:
            return {
                ...state,
                errors: null
            };
        case MessagingActions.CLEAR_STATUS:
            return {
                ...state,
                sending: false,
                sent: false,
            };
        default:
            return state;
    }
}