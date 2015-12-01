import React, { Component } from 'react';
import { mobservableForm } from '../lib/mobservableForm.js';

import BootstrapInput from './BootstrapInput.js';

class ExampleForm extends Component {
  static propTypes = {
    handleSubmit: React.PropTypes.func.isRequired,
    resetForm: React.PropTypes.func.isRequired,
    fields: React.PropTypes.object.isRequired
  }
  render() {
    const {
      handleSubmit,
      resetForm,
      fields: {
        text,
        email
      }
    } = this.props;

    return <form noValidate onSubmit={handleSubmit}>
      <BootstrapInput type="text" field={text} placeholder="Text..."/>
      <BootstrapInput type="email" field={email} placeholder="Email..."/>
      <div>
        <button>Submit</button>
        <button type="button" onClick={resetForm}>
          Reset
        </button>
      </div>
    </form>;
  }
}

export default mobservableForm({
  form: 'example',
  fields: ['text', 'email'],
  validate: ({ text, email }) => {
    const errors = {};

    if (text.length < 3) {
      errors.text = 'Must be at least 3 characters';
    }

    if (!email) {
      errors.email = 'Must supply an email';
    }

    return errors;
  }
})(ExampleForm);
