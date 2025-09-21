const Navbar = ({ onConnectWallet, userWallet }) => {
    const shortWallet = userWallet ? `${userWallet.substring(0, 4)}...${userWallet.substring(userWallet.length - 4)}` : null;
  
    return (
      <nav className="glass-card p-4 sticky top-4 mx-4 md:mx-auto max-w-6xl z-40 rounded-xl">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-amber-400 font-heading glow-text">SOL CASINO</h1>
          <button onClick={onConnectWallet} className="fancy-btn text-gray-900 font-bold py-2 px-6 rounded-lg text-sm">
            {userWallet ? shortWallet : 'Conectar Carteira'}
          </button>
        </div>
      </nav>
    );
};

export default Navbar;