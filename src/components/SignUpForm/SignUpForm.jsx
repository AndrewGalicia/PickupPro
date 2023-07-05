import { Component } from 'react';
import { signUp } from '../../utilities/users-service';
import './SignUpForm.css';

export default class SignUpForm extends Component {
  
  state = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm: '',
    instagram: '',
    city: '',
    skillLevel: '',
    error: ''
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: ''
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const {
        username,
        firstName,
        lastName,
        email,
        password,
        instagram,
        city,
        skillLevel
      } = this.state;
      const formData = {
        username,
        firstName,
        lastName,
        email,
        password,
        instagram,
        city,
        skillLevel
      };
      const user = await signUp(formData);
      this.props.setUser(user);
      this.props.history.push('/');
    } catch {
      this.setState({ error: 'Sign Up Failed - Try Again' });
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
        <div>
          <form className="signup-form-container" autoComplete="off" onSubmit={this.handleSubmit}>
            <div className='signup-big-div'>
              <div className='sign-form-a'>
                <label>Username:</label>
                <input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                  required
                />
                <label>First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                  required
                />
                <label>Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                  required
                />
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className='sign-form-b'>
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                />
                <label>Confirm Password:</label>
                <input
                  type="password"
                  name="confirm"
                  value={this.state.confirm}
                  onChange={this.handleChange}
                  required
                />
                <label>Instagram:</label>
                <input
                  type="text"
                  name="instagram"
                  value={this.state.instagram}
                  onChange={this.handleChange}
                />
                <label>City:</label>
                <input
                  type="text"
                  name="city"
                  value={this.state.city}
                  onChange={this.handleChange}
                  required
                />
                <label>Skill Level:</label>
                <select
                  name="skillLevel"
                  value={this.state.skillLevel}
                  onChange={this.handleChange}
                  required
                >
                  <option value="">Select Skill Level</option>
                  <option value="beginner">Beginner</option>
                  <option value="casual">Casual</option>
                  <option value="expert">Expert</option>
                  <option value="pro">Pro</option>
                </select>
                </div>
              </div>
            <button className="classic-button" type="submit" disabled={disable}>
              SIGN UP
            </button>
          </form>
          <p className="error-message">&nbsp;{this.state.error}</p>
        </div> 
    );
  }
}
