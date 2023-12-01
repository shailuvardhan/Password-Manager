import './index.css'

const PasswordItems = props => {
  const {userDetails, showPassword, onDeleteUserDetails} = props
  const {id, username, password, websiteName, initialClassName} = userDetails
  const initialLowercase = websiteName.slice(0, 1)
  const initial = initialLowercase.toUpperCase()

  const deleteUserDetails = () => {
    onDeleteUserDetails(id)
  }

  return (
    <li className="each-user-details">
      <div className={`initial-container ${initialClassName}`}>
        <p className="initial">{initial}</p>
      </div>
      <div className="app-details">
        <div className="app-user">
          <p className="website-name">{websiteName}</p>
          <p className="user-name">{username}</p>
          {showPassword ? (
            <p className="password">{password}</p>
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="stars"
            />
          )}
        </div>
        <button
          type="button"
          className="delete-btn"
          data-testid="delete"
          onClick={deleteUserDetails}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="delete-image"
          />
        </button>
      </div>
    </li>
  )
}

export default PasswordItems
