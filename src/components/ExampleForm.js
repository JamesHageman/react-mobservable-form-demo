import React, { Component } from 'react';
import { mobservableForm } from 'mobservable-form';

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
      <div>
        <input type="text" placeholder="Text..." {...text}/>
        {text.touched && text.error}
      </div>

      <div>
        <input type="email" placeholder="Email..." {...email}/>
        {email.touched && email.error}
      </div>

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

    if (text.length < 10) {
      errors.text = 'Must be at least 10 characters';
    }

    if (!email) {
      errors.email = 'Must supply an email';
    }

    return errors;
  }
})(ExampleForm);
