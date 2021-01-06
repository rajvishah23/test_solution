import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const User = (props) => (
  <tr>
    <td>{props.user.firstname}</td>
    <td>{props.user.lastname}</td>
    <td>{props.user.email}</td>
    <td>{props.user.dob}</td>
    <td>{props.user.bio}</td>
    <td>
      <Link to={"/edit/" + props.user._id}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteUser(props.user._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class view_user_data extends Component {
  constructor(props) {
    super(props);

    this.deleteUser = this.deleteUser.bind(this);

    this.state = { users: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8087/users/")
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteUser(id) {
    axios.delete("http://localhost:8087/users/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      users: this.state.users.filter((el) => el._id !== id),
    });
  }

  userList() {
    return this.state.users.map((currentuser) => {
      return (
        <User
          user={currentuser}
          deleteUser={this.deleteUser}
          key={currentuser._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h4>Users List</h4>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Email</th>
              <th>Date Of Birth</th>
              <th>Short Bio</th>
            </tr>
          </thead>
          <tbody>{this.userList()}</tbody>
        </table>
      </div>
    );
  }
}
