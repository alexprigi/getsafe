import React, { useState } from 'react'

const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
}

const inputContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
}

const errorTextStyle: React.CSSProperties = {
    color: "red"
}

export enum Type {
    email = 'email',
    number = 'number',
    text = 'text',
}
export type validityFunctionType = (value: string) => boolean;
export interface Input {
    id: string
    label?: string
    inputType: Type
    isRequired?: boolean
    errorText?: string
    initialValue?: string
    showError?: boolean
    customValidity?: validityFunctionType
}

export interface TextFieldProps extends Input  {
    onInputChange: (inputIdentifier: string, inputValue: string, inputValidity: boolean) => void
}

export function isFieldFulfilled(text: string, isRequired: boolean) {
    return !(isRequired && !text);
}

export function isValueValid(text: string, inputType: Type) {
    let regularExpression;
    let isValid = true;
    switch (inputType) {
        case Type.email:
            regularExpression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    }
    if (regularExpression) {
        isValid = new RegExp(regularExpression).test(text);
    }

    return isValid;
}

export function isInputValid(text: string = "", inputType: Type, isRequired: boolean = false, customValidity?: validityFunctionType) {
    const isValid = isValueValid(text, inputType)
    const isFulfilled = isFieldFulfilled(text, isRequired)
    const isCustomValid = (customValidity && customValidity(text)) ?? true

    return isFulfilled && isValid && isCustomValid
}

const TextField: React.FC<TextFieldProps> = (props) => {
    const { id, label, initialValue, inputType, isRequired, errorText, customValidity, onInputChange } = props;

    const [value, setValue] = useState(initialValue ?? "")
    const [isValid, setValid] = useState(false)

    const textChangeHandler = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        const fieldValid = isInputValid(value, inputType, isRequired, customValidity)
        setValid(fieldValid)
        setValue(value)

        //update form values
        onInputChange(id, value, fieldValid)
    }

    const showError = props.showError && !isValid;
    return (
        <div style={containerStyle}>
            <div style={inputContainerStyle}>
                {label && <span>{label}:</span>}
                <input
                    key={id}
                    data-testid={id}
                    type={inputType}
                    required={isRequired}
                    onChange={textChangeHandler}
                    value={value}
                ></input>
            </div>
            {showError && errorText && <span style={errorTextStyle}>{errorText}</span>}
        </div>
    )
}

export default TextField
