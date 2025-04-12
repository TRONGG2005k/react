const Spinner = () => {
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f9f9f9'
        }}>
            <div style={{
                width: '50px',
                height: '50px',
                border: '6px solid #ccc',
                borderTop: '6px solid #3498db',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
            }} />
            <style>
                {`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                `}
            </style>
        </div>
    );
};

export default Spinner;
