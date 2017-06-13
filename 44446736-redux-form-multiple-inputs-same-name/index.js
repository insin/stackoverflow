import './redux-form-website.css'
import 'font-awesome/css/font-awesome.css'

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, combineReducers} from 'redux'
import {Field, FieldArray, reducer as reduxFormReducer, reduxForm} from 'redux-form'

let reducer = combineReducers({
  form: reduxFormReducer,
})

let store = (window.devToolsExtension
             ? window.devToolsExtension()(createStore)
             : createStore
            )(reducer)

function showResults(values) {
  window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
}

let EmailInput = ({input, label, type, meta: {touched, error}}) =>
  <div>
    <label>{label}</label>
    <div>
      <input {...input} name="email" type="email"/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>

let EmailFields = ({fields, meta: {submitFailed, error}}) =>
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>Add Email</button>
    </li>
    {fields.map((email, index) =>
      <li key={index}>
        {index > 2 && <button
          type="button"
          title="Remove Email"
          onClick={() => fields.remove(index)}
        />}
        <Field
          name={email}
          component={EmailInput}
          label={`Email #${index + 1}`}
        />
      </li>
    )}
    {submitFailed && error && <li className="error">{error}</li>}
  </ul>

let EmailsForm = ({handleSubmit, pristine, reset, submitting}) =>
  <form onSubmit={handleSubmit}>
    <FieldArray name="emails" component={EmailFields}/>
    <div>
      <button type="submit" disabled={submitting}>Submit</button>
      <button type="button" disabled={pristine || submitting} onClick={reset}>
        Clear Values
      </button>
    </div>
  </form>

EmailsForm = reduxForm({
  form: 'emailsForm',
  initialValues: {
    emails: ['', '', '']
  },
  validate(values) {
    const errors = {}
    if (!values.emails || !values.emails.length) {
      errors.emails = {_error: 'At least one email must be entered'}
    }
    else {
      let emailsArrayErrors = []
      values.emails.forEach((email, emailIndex) => {
        const emailErrors = {}
        if (email == null || !email.trim()) {
          emailsArrayErrors[emailIndex] = 'Required'
        }
      })
      if (emailsArrayErrors.length) {
        errors.emails = emailsArrayErrors
      }
    }
    return errors
  }
})(EmailsForm)

export default <Provider store={store}>
  <EmailsForm onSubmit={showResults}/>
</Provider>
