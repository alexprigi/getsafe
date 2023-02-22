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
      <div>Firstname: {props.collectedData?.name?.firstName}</div>
      <div>Lastname: {props.collectedData?.name?.lastName}</div>
    </>
  }

  return (
    <>
      <div>Email: {props.collectedData.email}</div>
      <div>Age: {props.collectedData.age}</div> 
      
      {props.collectedData.name ? renderName() : null}
      
      <div>
        <Link to={ROUTES.PURCHASED + `=${props.productId}`}> Purchase</Link>
      </div>
    </>
  )
}

export default SummaryStep
