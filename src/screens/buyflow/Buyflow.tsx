import React, { useState } from 'react'
import AgeStep from './AgeStep'
import EmailStep from './EmailStep'
import NameStep from './NameStep'
import SummaryStep from './SummaryStep'

interface BuyflowProps {
  productId: ProductIds
}

export enum ProductIds {
  devIns = 'dev_ins',
  desigrIns = 'desigr_ins',
}

const PRODUCTS = {
  [ProductIds.devIns]: {
    title: 'Developer Insurance',
    steps: ['email', 'age', 'summary'],
  },
  [ProductIds.desigrIns]: {
    title: 'Designer Insurance',
    steps: ['email', 'age', 'name', 'summary'],
  },
}

const DEFAULT_STATE = {
  email: '',
  age: 0,
}

const DEFAULT_NAME_STATE = {
  name: {
    firstName: '',
    lastName: '',
  },
}

const PRODUCT_DEFAULT_STATE = {
  [ProductIds.devIns]: DEFAULT_STATE,
  [ProductIds.desigrIns]: Object.assign(DEFAULT_NAME_STATE, DEFAULT_STATE),
}

const Buyflow: React.FC<BuyflowProps> = (props) => {
  const [currentStep, setStep] = useState(0)
  const [collectedData, updateData] = useState(PRODUCT_DEFAULT_STATE[props.productId])

  const getStepCallback = () => (field: string, value: any) => {
    updateData({ ...collectedData, [field]: value })
    setStep(currentStep + 1)
  }

  const renderStep = (param: string) => {
    switch (param) {
      case 'email':
        return <EmailStep cb={getStepCallback()} />
      case 'age':
        return <AgeStep cb={getStepCallback()} />
      case 'name':
        return <NameStep cb={getStepCallback()} />
      case 'summary':
        return <SummaryStep collectedData={collectedData} productId={props.productId} />
      default:
        return <></>
    }
  }

  return (
    <>
      <h4>Buying {PRODUCTS[props.productId]?.title}</h4>
      {renderStep(PRODUCTS[props.productId]?.steps[currentStep])}
    </>
  )
}

export default Buyflow
