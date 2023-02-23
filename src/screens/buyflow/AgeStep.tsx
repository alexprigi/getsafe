import React from 'react'
import { Type as TextFieldType, Input } from '../../components/TextField/TextField'
import Form from '../../components/Form/Form'

interface AgeStepProps {
  cb: (value: number) => void
}

const inputs: Input[] = [
  {
    id: "age",
    label: "Age",
    inputType: TextFieldType.number,
    errorText: "Please enter a valid age greater than 18!",
    initialValue: "",
    isRequired: true,
    customValidity: (value) => {
      const numberValue = Number(value)
      return !isNaN(numberValue) && numberValue > 18
    }
  }];

const AgeStep: React.FC<AgeStepProps> = (props) => {

  return (
    <Form
      title="Please enter your age"
      submitText="Next"
      onSubmitAction={(value) => props.cb(Number(value))}
      inputs={inputs}>
    </Form>
  )
}

export default AgeStep
