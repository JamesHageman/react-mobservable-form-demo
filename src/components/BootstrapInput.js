import React, { Component } from 'react';
import { observer } from 'mobservable-react';

class BootstrapInput extends Component {
  render() {
    const {
      field: {
        error,
        touched,
        value,
        onChange
      },
      ...otherProps
    } = this.props;

    const className = 'form-group' + ((error && touched) ? ' has-error' : '');

    return <div className={className}>
      <input className="form-control" {...otherProps} value={value}
        onChange={onChange} />
      <div className="help-block">
        {touched ? error : ''}
      </div>
    </div>;
  }
}

BootstrapInput.propTypes = {
  field: React.PropTypes.shape({
    error: React.PropTypes.string,
    touched: React.PropTypes.bool.isRequired,
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
  }).isRequired
};

export default observer(BootstrapInput);
