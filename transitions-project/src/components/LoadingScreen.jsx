import { useEffect, useRef } from 'react';
import gsap from "gsap";

const LoadingScreen = ({ onLoadingComplete }) => {
  const logoRef = useRef(null);
  const loadingBarRef = useRef(null);

  useEffect(() => {
    gsap.to(logoRef.current, {
      rotationY: 720,
      duration: 20,
      repeat: 0,
      ease: "linear"
    });

    gsap.to(loadingBarRef.current, {
      width: "100%",
      duration: 10,
      ease: "power2.out",
      onComplete: () => {
        
        gsap.to(".loading-screen", {
          opacity: 0,
          duration: 1,
          onComplete: () => {
            onLoadingComplete();
          }
        });
      }
    });
  }, [onLoadingComplete]);

  return (
    <div className="loading-screen" style={styles.loadingScreen}>
      <div className="scan-line"></div>
      <div className="logo-container" style={styles.logoContainer}>
        <img
          src="./WeylandYutaniLogo.jpg"
          alt="Weyland-Yutani Logo"
          ref={logoRef}
          style={styles.logo}
        />
      </div>
      <div className='countries'>
        <img src="./Logo2.jpg" alt="TOKYO-LONDON-SANFRANCISCO" />
      </div>
      <div className="loading-bar-container" style={styles.loadingBarContainer}>
        <div className="loading-bar" ref={loadingBarRef} style={styles.loadingBar}></div>
      </div>
      <div className="loading-text">
        <img src="./Logo3.jpg" alt="LOADING DATA USER" />
      </div>
    </div>
  );
};

export default LoadingScreen;

const styles = {
  loadingScreen: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#000",
    color: "#456E42",
    textAlign: "center",
    marginTop: "-40px",
  },
  logoContainer: {
    marginBottom: "20px",
    marginTop: "-50px"
  },
  logo: {
    width: "100%",
    height: "auto",
  },
  loadingBarContainer: {
    width: "60%",
    height: "20px",
    backgroundColor: "#333",
    borderRadius: "5px",
    overflow: "hidden",
    margin: "0 auto",
    justifyContent: "center",
  },
  loadingBar: {
    width: "0",
    height: "100%",
    backgroundColor: "#235126",
  },
};
