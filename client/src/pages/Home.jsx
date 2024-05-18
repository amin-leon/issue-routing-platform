import React from 'react';

// const backgroundImage = 'https://images.unsplash.com/photo-1557318041-1ce374d55ebf?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const Home = () => {
  const containerStyle = {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    position: 'relative',
    height: '100vh', // Adjust the height as needed
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  };

  return (
    <div className="flex justify-center pt-64" style={containerStyle}>
      <div className="absolute inset-0" style={overlayStyle}></div>
      <div className="text-center text-black z-10">
        <h1 className="text-5xl font-bold mb-4">WELCOME TO NATIONAL POLICE COLLEGE</h1>
        <p className="text-2xl">Issueless Invironment</p>
      </div>
    </div>
  );
};

export default Home;
