import React from 'react'
import {Formik, Form} from 'formik'



export default function Todolist() {
  return (
    <>
    <h1>Todolist</h1>
    <Formik initialValues={{description: ''}} onSubmit={ async (data, {setSubmitting}) => {
      try{
      setSubmitting(true)
      console.log(data)
      //{description, creationDate, finishedTargetDate, finishedDate}
      const reqData = JSON.stringify(data)



      const response = await fetch('http://localhost:5040/todolist',
      {
        method: 'POST',
        headers: {
          "Content-Type" : "application/json" 
        },
        body: JSON.stringify(data),
      })

      
      
      setSubmitting(false)

      }catch(err){
        console.log(`${err}`)
      }
    }}

    >
    
    {({values, isSubmitting, handleBlur, handleChange, handleSubmit}) => (
      <Form >
        <label htmlFor='description'>description</label>
        <input type='text' name='description' id='description' 
        onBlur={handleBlur} onChange={handleChange} />
        <button disabled={isSubmitting} type='submit'>submitte</button>
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </Form>
    )}
    </Formik>
    </>
  )
}
