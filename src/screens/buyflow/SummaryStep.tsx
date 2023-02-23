import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from "../../navigation/routes";
import { ProductIds } from './Buyflow'
import { Name } from './NameStep'

interface SummaryStepProps {
  collectedData: {
    email: string
    age: number
    name?: Name
  },
  productId: ProductIds
}

const SummaryStep: React.FC<SummaryStepProps> = (props) => {
  const renderName = () => {
    return <>
      <div>Firstname: <span data-testid="firstName">{props.collectedData?.name?.firstName}</span></div>
      <div>Lastname: <span data-testid="lastName">{props.collectedData?.name?.lastName}</span></div>
    </>
  }

  return (
    <>
      <div>Email: <span data-testid="email">{props.collectedData.email}</span></div>
      <div>Age: <span data-testid="age">{props.collectedData.age}</span></div> 
      
      {props.collectedData.name ? renderName() : null}
      
      <div>
        <Link data-testid="purchase-link" to={ROUTES.PURCHASED + `=${props.productId}`}> Purchase</Link>
      </div>
    </>
  )
}

export default SummaryStep
