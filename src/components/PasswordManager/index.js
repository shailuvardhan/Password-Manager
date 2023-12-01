import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItems from '../PasswordItems'
import './index.css'

const backgroundColorsList = [
  'red',
  'blue',
  'green',
  'orange',
  'violet',
  'yellow',
  'sky-blue',
  'aqua',
]
const getInitialClassName = () =>
  backgroundColorsList[Math.floor(Math.random() * backgroundColorsList.length)]

class PasswordManager extends Component {
  state = {
    userAppsDetailsList: [],
    websiteName: '',
    username: '',
    password: '',
    searchInput: '',
    showPassword: false,
  }

  onChangeSearchUserName = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeWebsite = event => {
    this.setState({websiteName: event.target.value})
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  toggleCheckbox = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  submitForm = event => {
    event.preventDefault()
    const {userAppsDetailsList, websiteName, username, password} = this.state
    const initialClassName = getInitialClassName()
    if (username !== '' && websiteName !== '' && password !== '') {
      const newUserDetails = {
        id: uuidv4(),
        websiteName,
        username,
        password,
        initialClassName,
      }

      this.setState({
        userAppsDetailsList: [...userAppsDetailsList, newUserDetails],
        websiteName: '',
        username: '',
        password: '',
      })
    }
  }

  onDeleteUserDetails = id => {
    const {userAppsDetailsList} = this.state
    const filteredList = userAppsDetailsList.filter(
      eachItem => eachItem.id !== id,
    )
    this.setState({userAppsDetailsList: filteredList})
  }

  render() {
    const {userAppsDetailsList, showPassword, searchInput} = this.state
    const filteredDetailsList = userAppsDetailsList.filter(eachData =>
      eachData.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="bg-container">
        <div className="container">
          <div className="app-logo">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
              alt="app logo"
              className="logo-img"
            />
          </div>
          <div className="cards-container">
            <div className="top-card-container">
              <div className="inputs-card-container">
                <form onSubmit={this.submitForm}>
                  <h1 className="title">Add New Password</h1>
                  <div className="input-img-container">
                    <div className="img-container">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                        alt="website"
                        className="img"
                      />
                    </div>
                    <div className="input-container">
                      <input
                        type="text"
                        className="add-input"
                        placeholder="Enter Website"
                        onChange={this.onChangeWebsite}
                      />
                    </div>
                  </div>
                  <div className="input-img-container">
                    <div className="img-container">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                        alt="username"
                        className="img"
                      />
                    </div>
                    <div className="input-container">
                      <input
                        type="text"
                        className="add-input"
                        placeholder="Enter Username"
                        onChange={this.onChangeUserName}
                      />
                    </div>
                  </div>
                  <div className="input-img-container">
                    <div className="img-container">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                        alt="password"
                        className="img"
                      />
                    </div>
                    <div className="input-container">
                      <input
                        type="password"
                        className="add-input"
                        placeholder="Enter Password"
                        onChange={this.onChangePassword}
                      />
                    </div>
                  </div>
                  <div className="button-container">
                    <button type="submit" className="add-btn">
                      Add
                    </button>
                  </div>
                </form>
              </div>
              <div className="right-img-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                  alt="password manager"
                  className="password-manager-img"
                />
              </div>
            </div>
            <div className="bottom-card-container">
              <div className="yours-passwords-searchBar-container">
                <div className="your-passwords-container">
                  <p className="sub-title">Your Passwords</p>
                  <button className="btn" type="button">
                    {filteredDetailsList.length}
                  </button>
                </div>
                <div className="searchBar-container">
                  <div className="img-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                      alt="search"
                      className="search-logo-img"
                    />
                  </div>
                  <div className="input-container">
                    <input
                      type="search"
                      className="bottom-search-input"
                      placeholder="Search"
                      value={searchInput}
                      onChange={this.onChangeSearchUserName}
                    />
                  </div>
                </div>
              </div>
              <hr className="line" />
              <div className="show-saved-passwords-container">
                <div className="show-password-container">
                  <input
                    type="checkbox"
                    className="checkbox"
                    onChange={this.toggleCheckbox}
                    id="showPwd"
                  />
                  <label htmlFor="showPwd" className="description">
                    Show Passwords
                  </label>
                </div>
                <ul className="lists-container">
                  {filteredDetailsList.length > 0 ? (
                    filteredDetailsList.map(eachData => (
                      <PasswordItems
                        userDetails={eachData}
                        key={eachData.id}
                        showPassword={showPassword}
                        onDeleteUserDetails={this.onDeleteUserDetails}
                      />
                    ))
                  ) : (
                    <div className="no-pwd-img-container">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                        className="no-password"
                        alt="no passwords"
                      />
                      <p className="no-passwords">No passwords</p>
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
