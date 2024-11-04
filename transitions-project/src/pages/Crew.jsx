import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';

const crewMembers = {
    dallas: {
        name: "DALLAS, A.J.",
        image: " ./DallasGreen.jpg",
        position: "CAPTAIN",
        id: "081-DELTA-445-ALPHA",
        securityLevel: "A",
        status: "ACTIVE",
        medicalStatus: {
          physical: "CLEARED",
          psychological: "CLEARED",
          lastEvaluation: "2122.04.15"
        },
        classified: "MEDICAL STATUS [CLASSIFIED - SECURITY]"
},
  ripley: {
        name: "RIPLEY, E.L.",
        image: " ./RipleyGreen.jpg",
        position: "LIEUTENANT",
        id: "091-BETA-123-BRAVO",
        securityLevel: "A",
        status: "ACTIVE",
        medicalStatus: {
          physical: "CLEARED",
          psychological: "CLEARED",
          lastEvaluation: "2122.04.15"
        },
        classified: "MEDICAL STATUS [CLASSIFIED - SECURITY]"
},
  ash: {
        name: "ASH",
        image: " ./AshGreen.jpg",
        position: "SCIENCE OFFICER",
        id: "071-GAMMA-567-DELTA",
        securityLevel: "B",
        status: "ACTIVE",
        medicalStatus: {
          physical: "CLEARED",
          psychological: "CLEARED",
          lastEvaluation: "2122.03.22"
        },
        classified: "MEDICAL STATUS [CLASSIFIED - SECURITY]"
},
  kane: {
        name: "KANE, T.M.",
        image: " ./KaneGreen.jpg",
        position: "EXECUTIVE OFFICER",
        id: "065-DELTA-322-EPSILON",
        securityLevel: "A",
        status: "ACTIVE",
        medicalStatus: {
          physical: "CLEARED",
          psychological: "CLEARED",
          lastEvaluation: "2122.04.10"
        },
        classified: "MEDICAL STATUS [CLASSIFIED - SECURITY]"
      },
  lambert: {
        name: "LAMBERT, J.M.",
        image: " ./LambertGreen.jpg",
        position: "NAVIGATOR",
        id: "082-ALPHA-912-BETA",
        securityLevel: "A",
        status: "ACTIVE",
        medicalStatus: {
          physical: "CLEARED",
          psychological: "CLEARED",
          lastEvaluation: "2122.04.05"
        },
        classified: "MEDICAL STATUS [CLASSIFIED - SECURITY]"
      },
  parker: {
        name: "PARKER, D.R.",
        image: " ./ParkerGreen.jpg",
        position: "CHIEF ENGINEER",
        id: "052-OMEGA-111-GAMMA",
        securityLevel: "B",
        status: "ACTIVE",
        medicalStatus: {
          physical: "CLEARED",
          psychological: "CLEARED",
          lastEvaluation: "2122.04.12"
        },
        classified: "MEDICAL STATUS [CLASSIFIED - SECURITY]"
      },
  brett: {
        name: "BRETT, S.E.",
        image: " ./BrettGreen.jpg",
        position: "ENGINEER TECHNICIAN",
        id: "084-DELTA-765-ZETA",
        securityLevel: "B",
        status: "ACTIVE",
        medicalStatus: {
          physical: "CLEARED",
          psychological: "CLEARED",
          lastEvaluation: "2122.03.29"
        },
        classified: "MEDICAL STATUS [CLASSIFIED - SECURITY]"
      },
  eigth_passenger: {
        name: "8TH PASSENGER",
        image: " ./8thPassengerGreen.jpg",
        position: "UNKNOWN",
        id: "CLASSIFIED",
        securityLevel: "X",
        status: "UNKNOWN",
        medicalStatus: {
          physical: "UNKNOWN",
          psychological: "UNKNOWN",
          lastEvaluation: "UNKNOWN"
        },
        classified: "MEDICAL STATUS [CLASSIFIED - SECURITY]"
      }
};

const CrewPage = () => {
  const logoRef = useRef(null);
  const [selectedCrew, setSelectedCrew] = useState("dallas");

  const handleSelectCrew = (crewKey) => {
    setSelectedCrew(crewKey);
  };

  useEffect(() => {
    gsap.to(logoRef.current, {
      rotationY: 720,
      duration: 20,
      loop: true,
      ease: "linear"
    });
  }, []);

  const crew = crewMembers[selectedCrew];

  return (
    <div className='terminal-container'>
      <div className='scan-line'></div>
      <div className='flexHeader'>
        <div className="terminal-header2">
          TERMINAL ACCESS: v7.1.2<br />
          SYSTEM: APOLLO CENTRAL COMPUTER
        </div>
        <div>
          <Link to="/" className='backButton'>BACK</Link>
        </div>
      </div>
      <div className="crew">
        <div className="crew-list">
          {Object.keys(crewMembers).map((key) => (
            <div
              key={key}
              className={`crew-member ${selectedCrew === key ? "active" : ""}`}
              onClick={() => handleSelectCrew(key)}
            >
              {crewMembers[key].name}
            </div>
          ))}
        </div>
        <div className="crew-details">
          <img src={crew.image} alt={crew.name} className="crew-image" />
          <div className="crew-info">
            <h2>PERSONNEL FILE: {crew.name}</h2>
            <p>POSITION: <Typewriter key={`position-${selectedCrew}`}
              options={{ autoStart: true, loop: false, delay: 60 }}
              onInit={(typewriter) => {
                typewriter.typeString(`${crew.position}`).start();
              }}
            /></p>
            <p>ID: <Typewriter key={`id-${selectedCrew}`}
              options={{ autoStart: true, loop: false, delay: 60 }}
              onInit={(typewriter) => {
                typewriter.typeString(`${crew.id}`).start();
              }}
            /></p>
            <p>SECURITY LEVEL: <Typewriter key={`security-${selectedCrew}`}
              options={{ autoStart: true, loop: false, delay: 60 }}
              onInit={(typewriter) => {
                typewriter.typeString(`${crew.securityLevel}`).start();
              }}
            /></p>
            <p>STATUS: <Typewriter key={`status-${selectedCrew}`}
              options={{ autoStart: true, loop: false, delay: 60 }}
              onInit={(typewriter) => {
                typewriter.typeString(`${crew.status}`).start();
              }}
            /></p>
            <h3>MEDICAL STATUS</h3>
            <p>PHYSICAL: <Typewriter key={`physical-${selectedCrew}`}
              options={{ autoStart: true, loop: false, delay: 60 }}
              onInit={(typewriter) => {
                typewriter.typeString(`${crew.medicalStatus.physical}`).start();
              }}
            /></p>
            <p>PSYCHOLOGICAL: <Typewriter key={`psychological-${selectedCrew}`}
              options={{ autoStart: true, loop: false, delay: 60 }}
              onInit={(typewriter) => {
                typewriter.typeString(`${crew.medicalStatus.psychological}`).start();
              }}
            /></p>
            <p>LAST EVALUATION: <Typewriter key={`evaluation-${selectedCrew}`}
              options={{ autoStart: true, loop: false, delay: 60 }}
              onInit={(typewriter) => {
                typewriter.typeString(`${crew.medicalStatus.lastEvaluation}`).start();
              }}
            /></p>
            <p className='medicalStatus'><Typewriter key={`classified-${selectedCrew}`}
              options={{ autoStart: true, loop: false, delay: 60 }}
              onInit={(typewriter) => {
                typewriter.typeString(`${crew.classified}`).start();
              }}
            /></p>
          </div>
        </div>
      </div>
      <div className='homeBottom'>
        STATUS: [SECURE]
        <img src="./WeylandYutaniLogo.jpg" alt="Logo" ref={logoRef} />
      </div>
    </div>
  );
};

export default CrewPage;
