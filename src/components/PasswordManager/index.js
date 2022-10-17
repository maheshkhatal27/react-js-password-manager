import {Component} from 'react'
import './index.css'
import {v4} from 'uuid'
import PasswordStore from '../PasswordStore'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class PasswordManager extends Component {
  state = {
    webSiteInputVal: '',
    userNameInputVal: '',
    pwdInputVal: '',
    searchInputVal: '',
    isChecked: false,
    pwdItemsList: [],
  }

  onDelete = id => {
    const {pwdItemsList} = this.state

    const newListAfterDeleting = pwdItemsList.filter(
      eachItem => eachItem.id !== id,
    )

    this.setState({pwdItemsList: newListAfterDeleting})
  }

  addPasswordDetails = event => {
    event.preventDefault()
    const {webSiteInputVal, userNameInputVal, pwdInputVal} = this.state

    const colorName =
      initialContainerBackgroundClassNames[Math.floor(Math.random() * 7)]

    const newPwdItem = {
      id: v4(),
      webSiteInputVal,
      userNameInputVal,
      pwdInputVal,
      colorName,
    }
    this.setState(prevState => ({
      pwdItemsList: [...prevState.pwdItemsList, newPwdItem],
      webSiteInputVal: '',
      userNameInputVal: '',
      pwdInputVal: '',
    }))
    console.log(newPwdItem)
  }

  onEnterWebsite = event => {
    this.setState({webSiteInputVal: event.target.value})
  }

  onEnterUserName = event => {
    this.setState({userNameInputVal: event.target.value})
  }

  onEnterPassword = event => {
    this.setState({pwdInputVal: event.target.value})
  }

  onEnterSearchPwd = event => {
    this.setState({searchInputVal: event.target.value})
  }

  onCheckedBoxSelected = () => {
    this.setState(prev => ({isChecked: !prev.isChecked}))
  }

  displayNoPassword = () => (
    <div className="no-pwd-img-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt=" no passwords"
        className="no-pwd-img"
      />
      <p className="no-pwd">No Passwords</p>
    </div>
  )

  render() {
    const {
      webSiteInputVal,
      userNameInputVal,
      pwdInputVal,
      searchInputVal,
      isChecked,
      pwdItemsList,
    } = this.state

    const currentItems = pwdItemsList.filter(eachItem =>
      eachItem.webSiteInputVal
        .toLowerCase()
        .includes(searchInputVal.toLowerCase()),
    )
    const count = currentItems.length

    return (
      <div className="pwd-manager-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          className="pwd-logo"
          alt="app logo"
        />

        <div className="top-section-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="sm-top-img"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="lg-top-img"
          />

          <form className="form-container" onSubmit={this.addPasswordDetails}>
            <h1 className="form-heading">Add New Password</h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                className="input-icon"
                alt="website"
              />
              <input
                type="text"
                placeholder="Enter Website"
                className="input-text"
                value={webSiteInputVal}
                onChange={this.onEnterWebsite}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                className="input-icon"
                alt="username"
              />
              <input
                type="text"
                placeholder="Enter Username"
                className="input-text"
                value={userNameInputVal}
                onChange={this.onEnterUserName}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                className="input-icon"
                alt="password"
              />
              <input
                type="password"
                placeholder="Enter Password"
                className="input-text"
                value={pwdInputVal}
                onChange={this.onEnterPassword}
              />
            </div>
            <div className="button-container">
              <button type="submit" className="button">
                Add
              </button>
            </div>
          </form>
        </div>

        <div className="bottom-pwd-section">
          <div className="heading-search-count-container">
            <div className="pwd-count-container">
              <h1 className="your-pwd">Your Passwords</h1>
              <div className="pwd-count">
                <p className="count">{count}</p>
              </div>
            </div>
            <div className="search-input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                className="search-icon"
                alt="search"
              />

              <input
                type="search"
                placeholder="Search"
                className="input-text-pwd"
                value={searchInputVal}
                onChange={this.onEnterSearchPwd}
              />
            </div>
          </div>

          <hr className="horizontal-line" />
          <div className="checkbox-pwd-container">
            <input
              type="checkbox"
              checked={isChecked}
              id="showPwd"
              onChange={this.onCheckedBoxSelected}
            />
            <label htmlFor="showPwd" className="show-pwd">
              Show Passwords
            </label>
          </div>
          {count === 0 ? (
            this.displayNoPassword()
          ) : (
            <ul className="pwd-list-container">
              {currentItems.map(eachPwdItem => (
                <PasswordStore
                  key={eachPwdItem.id}
                  pwdDetails={eachPwdItem}
                  isChecked={isChecked}
                  onDelete={this.onDelete}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
