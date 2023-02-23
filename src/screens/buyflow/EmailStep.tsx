import React from "react";
import { Type as TextFieldType, Input } from '../../components/TextField/TextField'
import Form from '../../components/Form/Form'

interface EmailStepProps {
  cb: (value: string) => void;
}

const inputs: Input[] = [
  {
    id: "email",
    label: "Email",
    inputType: TextFieldType.email,
    errorText: "Please enter a valid email!",
    initialValue: "",
    isRequired: true
  }];

const EmailStep: React.FC<EmailStepProps> = (props) => {

  return (
    <Form
      title="Please enter your email address"
      submitText="Next"
      onSubmitAction={(values) => props.cb(values)}
      inputs={inputs}>
    </Form>
  );
};

export default EmailStep;
