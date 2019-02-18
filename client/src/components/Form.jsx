import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';

class Form extends Component {
  state = {
    name: '',
    position: '',
    company: ''
  };

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  submit = e => {
    e.preventDefault();
    const { name, position, company } = this.state;
    axios({
      url: '/add',
      method: 'POST',
      data: {
        name,
        position,
        company
      }
    })
      .then((response) => {
        this.props.addUser(response.data);
        this.setState({
          name: '',
          company: '',
          position: ''
        });
      })
      .catch(() => alert('Failed uploading data'))
  };
  render() {
    return (
      <form className="form noValidate" autoComplete="off" onSubmit={this.submit}>
        <h2>Tell us about you</h2>
        <TextField
          id="standard-dense"
          value={this.state.name}
          label="Name"
          name="name"
          onChange={this.handleChange}
        />

        <TextField
          name="company"
          value={this.state.company}
          id="standard-dense"
          onChange={this.handleChange}
          label="Company"
        />

        <TextField
          name="position"
          value={this.state.position}
          id="standard-dense"
          onChange={this.handleChange}
          label="Position"
        />

        <Button variant="contained" color="primary" onClick={this.submit}> Submit </Button>

      </form>
    );
  }
}

export default Form;
