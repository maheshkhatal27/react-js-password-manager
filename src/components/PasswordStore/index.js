import './index.css'

const PasswordStore = props => {
  const {pwdDetails, isChecked, onDelete} = props
  const {
    id,
    webSiteInputVal,
    userNameInputVal,
    pwdInputVal,
    colorName,
  } = pwdDetails

  const initialSymbol = webSiteInputVal[0].toUpperCase()

  const deletePWdItem = () => {
    onDelete(id)
  }

  const pwdContentStarOrPlainText = isChecked ? (
    <p className="pwd-text">{pwdInputVal}</p>
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
      className="pwd-star-img"
    />
  )

  return (
    <li className="list-pwd-items">
      <div className="pwd-store-container">
        <div className={`initial-container ${colorName}`}>{initialSymbol}</div>
        <div className="pwd-detail-container">
          <p className="web-name">{webSiteInputVal}</p>
          <p className="user-name">{userNameInputVal}</p>
          <div>{pwdContentStarOrPlainText}</div>
        </div>
      </div>

      <button
        type="button"
        className="del-button"
        onClick={deletePWdItem}
        // testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          className="delete-icon"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordStore
