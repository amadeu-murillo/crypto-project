const Navbar = ({ onConnectWallet, onDisconnectWallet, userWallet }) => { // Alterado
    const shortWallet = userWallet ? `${userWallet.substring(0, 4)}...${userWallet.substring(userWallet.length - 4)}` : null;
  
    return (
      <nav className="navbar glass-card">
        <div className="navbar-container">
          <h1 className="navbar-title glow-text">SOL CASINO</h1>
          {userWallet ? (
            <div className="flex items-center gap-4">
                <span className="text-sm text-gray-300">{shortWallet}</span>
                <button onClick={onDisconnectWallet} className="fancy-btn navbar-button">
                    Desconectar
                </button>
            </div>
          ) : (
            <button onClick={onConnectWallet} className="fancy-btn navbar-button">
              Conectar Carteira
            </button>
          )}
        </div>
      </nav>
    );
};

export default Navbar;