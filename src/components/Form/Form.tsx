import React, { useMemo, useReducer} from 'react'
import TextField, { Input } from '../TextField/TextField'
import { formReducer, initialState, ActionKind } from './utils'

interface FormProps {
    title?: string
    submitText: string
    onSubmitAction: (...values: any[]) => void
    inputs: Input[]
}

const Form: React.FC<FormProps> = (props) => {
    const { title, inputs, submitText, onSubmitAction } = props
    const initFormState = useMemo(() => initialState(inputs), [inputs])
    const [formState, dispatchFormState] = useReducer(formReducer, initFormState);

    const inputChangeHandler = (inputIdentifier: string, inputValue: any, inputValidity: any) => {
        dispatchFormState({
            type: ActionKind.UpdatedFormValues,
            payload: {
                value: inputValue,
                isValid: inputValidity,
                inputId: inputIdentifier
            }
        })
    }
        
    
    const onSubmitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (formState.formIsValid) {
            onSubmitAction(...Object.values(formState.inputValues))
        } else {
            for (const key in formState.inputValidities) {
                if (!formState.inputValidities[key]) {
                    dispatchFormState({ type: ActionKind.SetFormError, payload: { inputId: key, showError: true } })
                }
            }
        }
    }

    const renderInput = (input: Input) => {
        return <TextField
            key={input.id}
            id={input.id}
            label={input.label}
            inputType={input.inputType}
            errorText={input.errorText}
            onInputChange={inputChangeHandler}
            customValidity={input.customValidity}
            showError={formState.showErrors[input.id]}
            initialValue={input.initialValue}
            isRequired={input.isRequired} />
    };

    return (
        <form
            noValidate
            onSubmit={onSubmitHandler}>
            {title && <span>{title}</span>}

            {inputs.map((input) => {
                return renderInput(input);
            })}

            <input type="submit" value={submitText} />
        </form>
    );
};

export default Form