import { Input, isInputValid } from '../TextField/TextField'

type State = {
    inputValues: { [key: string]: any }
    inputValidities: { [key: string]: any }
    showErrors: { [key: string]: any }
    formIsValid: boolean;
}

export const DEFAULT_FORM_STATE: State = {
    inputValues: {},
    inputValidities: {},
    showErrors: {},
    formIsValid: false
};

export enum ActionKind {
    UpdatedFormValues = 'UPDATE_FORM_VALUES',
    SetFormError = 'SET_FORM_ERROR',
}

type Payload = {
    value?: any
    isValid?: boolean
    showError?: boolean
    inputId: string
}

type Action = {
    type: ActionKind,
    payload: Payload
}

export function initialState(inputs: Input[]) {
    // Initialize reducer with default values for inputs
    let inputValues: { [key: string]: any } = {}
    let inputValidities: { [key: string]: any } = {}
    let showErrors: { [key: string]: any } = {}
    // The form is valid if every input of the form is valid itself
    let formIsValid = true;

    inputs.forEach(input => {
        inputValues[input.id] = input.initialValue
        inputValidities[input.id] = isInputValid(input.initialValue, input.inputType, input.isRequired, input.customValidity)
        formIsValid = formIsValid && (inputValidities[input.id]);
        showErrors[input.id] = false
    })

    return {
        inputValues,
        inputValidities,
        showErrors,
        formIsValid
    }
}

// Reducer to save the current state of the form
export function formReducer(state: State = DEFAULT_FORM_STATE, action: Action): State {
    const { type, payload } = action;

    if (type === ActionKind.UpdatedFormValues) {
        // Update the input value of the given input id
        const updatedValues = {
            ...state.inputValues,
            [payload.inputId]: payload.value
        };

        // Update the validity flag of the given input id
        const updatedValidities = {
            ...state.inputValidities,
            [payload.inputId]: payload.isValid
        };

        // The form is valid if every input of the form is valid itself
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && (updatedValidities[key]);
        }

        // Reset the form error flag for the given input id
        const updatedErrors = {
            ...state.showErrors,
            [payload.inputId]: false
        };

        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues,
            showErrors: updatedErrors
        };

    } else if (type === ActionKind.SetFormError) {
        // Set the form error flag for the given input id
        const updatedErrors = {
            ...state.showErrors,
            [payload.inputId]: payload.showError
        };
        return {
            ...state,
            showErrors: updatedErrors
        };
    }
    return state;
}