import React from 'react'
import { Type as TextFieldType, Input} from '../../components/TextField/TextField'
import Form from '../../components/Form/Form'

export type Name = {
  firstName: string
  lastName: string
}

interface NameStepProps {
  cb: (value: Name) => void
}

const inputs: Input[] = [
  {
    id: "firstName",
    label: "Firstname",
    inputType: TextFieldType.text,
    errorText: "Please enter a valid first name!",
    initialValue: "",
    isRequired: true
  }, {
    id: "lastName",
    label: "Lastname",
    inputType: TextFieldType.text,
    errorText: "Please enter a valid last name!",
    initialValue: "",
    isRequired: true
  }];

const NameStep: React.FC<NameStepProps> = (props) => {

  return (
    <Form
      title="Please enter your name"
      submitText="Next"
      onSubmitAction={(firstNameValue, lastNameValue) => {
        props.cb({ firstName: firstNameValue, lastName: lastNameValue })
      }}
      inputs={inputs}>
    </Form>
  )
}

export default NameStep
