import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddPoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: ['', ''],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(i, e) {
    const options = [
      ...this.state.options.slice(0, i),
      e.target.value,
      ...this.state.options.slice(i + 1),
    ];
    if (options.filter(x => x === '').length === 0) {
      options.push('');
    }
    this.setState({
      options,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const poll = {
      title: this.title.value.trim(),
      options: this.state.options.map(x => x.trim()).filter(x => x !== ''),
    };
    if (poll.title.length > 0 && poll.options.length >= 2) {
      this.props.onAddPoll(poll);
      this.title.value = '';
      this.setState({
        options: ['', ''],
      });
    } else {
      this.title.focus();
    }
  }
  render() {
    const renderOptions = this.state.options.map((option, i) => {
      const placeholder = `Choice ${i + 1}${i + 1 > 2 ? ' (optional)' : ''}`;
      return (
        <input
          key={i}
          type="text"
          placeholder={placeholder}
          defaultValue=""
          onChange={e => this.handleInputChange(i, e)}
        />
      );
    });

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          ref={(node) => { this.title = node; }}
          placeholder="Add your question"
        />
        {renderOptions}
        <button type="submit">Create Poll</button>
      </form>
    );
  }
}

AddPoll.propTypes = {
  onAddPoll: PropTypes.func.isRequired,
};

export default AddPoll;
