const Modal = ({ modalState, closeModal }) => {
    if (!modalState.isOpen) return null;
  
    const { title, message, status, txSignature } = modalState;
  
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-black/80 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="glass-card p-8 rounded-lg shadow-2xl max-w-sm w-full text-center border-amber-400/50">
          <h3 className="text-2xl font-bold text-white mb-4 font-heading">{title}</h3>
          <p className="text-gray-300">{message}</p>
          
          {status === 'loading' && (
            <div className="mt-6 border-t-4 border-amber-400 border-solid rounded-full w-12 h-12 animate-spin mx-auto"></div>
          )}
  
          {status === 'success' && txSignature && (
            <a
              href={`https://solscan.io/tx/${txSignature}?cluster=mainnet`}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 text-amber-400 hover:text-amber-300 underline"
            >
              Ver Transação
            </a>
          )}
          
          {(status === 'success' || status === 'error') && (
            <button
              onClick={closeModal}
              className="mt-6 w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors"
            >
              Fechar
            </button>
          )}
        </div>
      </div>
    );
};
  
export default Modal;