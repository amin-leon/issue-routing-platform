import React from 'react';
const Home = () => {
  const containerStyle = {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    position: 'relative',
    height: '100vh',
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
