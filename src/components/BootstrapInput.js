import React, { Component } from 'react';

class BootstrapInput extends Component {
  render() {
    const {
      error,
      touched,
      value,
      onChange
    } = this.props;

    const className = 'form-group' + ((error && touched) ? ' has-error' : '');

    return <div className={className}>
      <input className="form-control" value={value} onChange={onChange}/>
      <span className="help-block">
        {touched && error}
      </span>
    </div>;
  }
}

BootstrapInput.propTypes = {
  error: React.PropTypes.string,
  touched: React.PropTypes.bool.isRequired,
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
};

export default BootstrapInput;
