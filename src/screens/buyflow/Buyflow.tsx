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

export enum Steps {
  email = 'email',
  age = 'age',
  name = 'name',
  summary = 'summary',
}

const PRODUCTS = {
  [ProductIds.devIns]: {
    title: 'Developer Insurance',
    steps: [Steps.email, Steps.age, Steps.summary],
  },
  [ProductIds.desigrIns]: {
    title: 'Designer Insurance',
    steps: [Steps.email, Steps.age, Steps.name, Steps.summary],
  },
}

const DEFAULT_STATE = {
  [Steps.email]: '',
  [Steps.age]: 0,
}

const DEFAULT_NAME_STATE = {
  [Steps.name]: {
    firstName: '',
    lastName: '',
  },
}

const PRODUCT_DEFAULT_STATE = {
  [ProductIds.devIns]: DEFAULT_STATE,
  [ProductIds.desigrIns]: Object.assign(DEFAULT_NAME_STATE, DEFAULT_STATE),
}

const Buyflow: React.FC<BuyflowProps> = (props) => {
  const { productId } = props;
  const [currentStep, setStep] = useState(0)
  const [collectedData, updateData] = useState(PRODUCT_DEFAULT_STATE[props.productId])

  const getStepCallback = () => (value: any) => {
    const steps = PRODUCTS[productId].steps;
    updateData({ ...collectedData, [steps[currentStep]]: value })
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
