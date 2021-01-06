import React, { Component } from "react";
import axios from "axios";

export default class edit_user_data extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeDOB = this.onChangeDOB.bind(this);
    this.onChangeBio = this.onChangeBio.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      dob: "",
      bio: "",
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:8087/users/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          email: response.data.email,
          dob: response.data.dob,
          bio: response.data.bio,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  onChangeFirstName(e) {
    this.setState({
      firstname: e.target.value,
    });
  }
  onChangeLastName(e) {
    this.setState({
      lastname: e.target.value,
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }
  onChangeDOB(e) {
    this.setState({
      dob: e.target.value,
    });
  }
  onChangeBio(e) {
    this.setState({
      bio: e.target.value,
    });
  }
  onSubmit(e) {
    e.preventDefault();
    console.log(
      `The values are ${this.state.firstname}, ${this.state.lastname},${this.state.email},${this.state.dob},${this.state.bio}`
    );

    const User = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      dob: this.state.dob,
      bio: this.state.bio,
    };
    axios
      .post(
        "http://localhost:8087/users/update/" + this.props.match.params.id,
        User
      )
      .then((res) => console.log(res.data));
    this.props.history.push("/");

    this.setState({
      first_name: "",
      last_name: "",
      email: "",
      dob: "",
      bio: "",
    });
  }
  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h4>Edit User</h4>
        <form onSubmit={this.onSubmit}>
          <div class="form-row">
            <div class="col">
              <label>First Name </label>
              <input
                type="text"
                className="form-control"
                value={this.state.first_name}
                onChange={this.onChangeFirstName}
              />
            </div>
            <div class="col">
              <label>Last Name </label>
              <input
                type="text"
                className="form-control"
                value={this.state.last_name}
                onChange={this.onChangeLastName}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email </label>
            <input
              type="email"
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>
          <div className="form-group">
            <label>Date of Birth </label>
            <input
              type="date"
              className="form-control"
              value={this.state.dob}
              onChange={this.onChangeDOB}
            />
          </div>
          <div className="form-group">
            <label>Short Bio </label>
            <input
              type="text"
              className="form-control"
              value={this.state.bio}
              onChange={this.onChangeBio}
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Edit" className="btn btn-dark" />
          </div>
        </form>
      </div>
    );
  }
}
