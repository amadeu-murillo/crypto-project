const Navbar = ({ onConnectWallet, userWallet }) => {
    const shortWallet = userWallet ? `${userWallet.substring(0, 4)}...${userWallet.substring(userWallet.length - 4)}` : null;
  
    return (
      <nav className="navbar glass-card">
        <div className="navbar-container">
          <h1 className="navbar-title glow-text">SOL CASINO</h1>
          <button onClick={onConnectWallet} className="fancy-btn navbar-button">
            {userWallet ? shortWallet : 'Conectar Carteira'}
          </button>
        </div>
      </nav>
    );
};

export default Navbar;
