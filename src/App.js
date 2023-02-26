import {Component} from 'react'
import {v4} from 'uuid'
import './App.css'

class App extends Component {
  state = {
    passwordsList: [],
    websiteName: '',
    userName: '',
    password: '',
    showPassword: false,
    searchPasswords: '',
    isTrue: false,
  }

  changeWebsite = event => {
    this.setState({websiteName: event.target.value})
  }

  changeUserName = event => {
    this.setState({userName: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  searchPasswords = event => {
    this.setState({searchPasswords: event.target.value})
  }

  checkbox = () => {
    const {showPassword} = this.state
    this.setState({showPassword: !showPassword})
  }

  addNewPassword = event => {
    event.preventDefault()
    const {websiteName, userName, password, showPassword} = this.state
    const newItem = {
      id: v4(),
      websiteName,
      userName,
      password,
      showPassword,
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newItem],
      websiteName: '',
      userName: '',
      password: '',
      searchPasswords: '',
      isTrue: true,
    }))
  }

  deleteItem = id => {
    const {passwordsList} = this.state
    const filteredList = passwordsList.filter(each => each.id !== id)
    const ifCase = filteredList.length !== 0
    this.setState({passwordsList: filteredList, isTrue: ifCase})
  }

  render() {
    const {
      passwordsList,
      websiteName,
      userName,
      password,
      showPassword,
      searchPasswords,
    } = this.state
    let {isTrue} = this.state

    const newList = passwordsList.filter(eachValue =>
      eachValue.websiteName
        .toLowerCase()
        .includes(searchPasswords.toLowerCase()),
    )

    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="logo-img"
        />
        <div className="top-section">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="sm-img"
          />
          <div className="lg-view">
            <form className="input-boxes" onSubmit={this.addNewPassword}>
              <h1 className="input-boxes-heading">Add New Password</h1>
              <div className="input-box">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="input-img"
                />
                <input
                  type="text"
                  className="input"
                  onChange={this.changeWebsite}
                  value={websiteName}
                  placeholder="Enter Website"
                />
              </div>
              <div className="input-box">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="input-img"
                />
                <input
                  type="text"
                  className="input"
                  onChange={this.changeUserName}
                  value={userName}
                  placeholder="Enter Username"
                />
              </div>
              <div className="input-box">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="input-img"
                />
                <input
                  type="password"
                  className="input"
                  onChange={this.changePassword}
                  value={password}
                  placeholder="Enter Password"
                />
              </div>
              <div className="button-box">
                <button type="submit" className="addButton">
                  Add
                </button>
              </div>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="lg-img"
            />
          </div>
        </div>

        <div className="bottom-section">
          <div className="bottom-top-section">
            <div className="bottom-heading">
              <h1 className="passwords-count">Your Passwords</h1>
              <p className="count">{passwordsList.length}</p>
            </div>
            <div className="search-passwords">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-img"
              />
              <input
                type="search"
                className="bottom-input"
                onChange={this.searchPasswords}
                value={searchPasswords}
                placeholder="Search"
              />
            </div>
          </div>
          <hr className="hr-line" />
          <div className="check-box">
            <input
              className="checkbox-input"
              id="checkbox"
              type="checkbox"
              onClick={this.checkbox}
            />
            <label htmlFor="checkbox">Show Passwords</label>
          </div>
          {!isTrue && (
            <div className="no-password-box">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-password-img"
              />
              <p className="no-passwords-text">No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className="un-order-list">
              {newList.map(each => (
                <li key={each.id} className="list-item">
                  <div className="first-letter-box">
                    <p className="first-letter">
                      {each.websiteName.charAt(0).toUpperCase()}
                    </p>
                  </div>

                  <div className="details">
                    <p className="name">{each.websiteName}</p>
                    <p className="name username">{each.userName}</p>
                    {showPassword ? (
                      <p className="name">{each.password}</p>
                    ) : (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                        className="stars-img"
                      />
                    )}
                  </div>
                  <button
                    type="button"
                    className="delete-button"
                    data-testId="delete"
                    onClick={() => this.deleteItem(each.id)}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                      className="delete-img"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
