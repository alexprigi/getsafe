import React, { useState } from 'react'

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center"
}

export type Name = {
  firstName: string
  lastName: string
}
interface NameStepProps {
  cb: (field: string, value: Name) => void
}

const NameStep: React.FC<NameStepProps> = (props) => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  return (
    <>
      <div style={containerStyle}>
        <div>
          firstName:{' '}
          <input
            type="text"
            onChange={({ target: { value } }) => {
              setFirstName(value)
            }}
            value={firstName}
          ></input>
        </div>
        <div>
          lastName:{' '}
          <input
            type="text"
            onChange={({ target: { value } }) => {
              setLastName(value)
            }}
            value={lastName}
          ></input>
        </div>
      </div>
      <button onClick={() => props.cb('name', { firstName, lastName })}>
        Next
      </button>
    </>
  )
}

export default NameStep
