import React from 'react';
import './Connections.css';

// Import logos
import classmate1Logo from '../assets/logos/CafeReyes.png';
import classmate2Logo from '../assets/logos/CLickers.png';
import classmate3Logo from '../assets/logos/INGCO.png';
import classmate4Logo from '../assets/logos/kfc.png';
import classmate5Logo from '../assets/logos/Shoepatoes.jpg';
import classmate6Logo from '../assets/logos/MedPoint.png';
import classmate7Logo from '../assets/logos/Motortrade.jpg';
import classmate8Logo from '../assets/logos/NationalBookStore.jpg';
import classmate9Logo from '../assets/logos/OHMART.jpg';
import classmate10Logo from '../assets/logos/ParaPo.png';
import classmate11Logo from '../assets/logos/SavemoreLogo.png';
import classmate12Logo from '../assets/logos/TiagoShopLogo.png';
import classmate13Logo from '../assets/logos/Toyota.png';
import classmate14Logo from '../assets/logos/tx.png';
import classmate15Logo from '../assets/logos/UnionBank.png';
import classmate16Logo from '../assets/logos/WATSONS.png';
import classmate17Logo from '../assets/logos/WNE.png';
import classmate18Logo from '../assets/logos/LRT-LOGO.png';
import classmate19Logo from '../assets/logos/SkyEase.png';

// Add more imports as needed

const classmates = [
    { name: 'Cafe Reyes', website: 'http://192.168.10.18:3000', logo: classmate1Logo },
    { name: 'Clickers', website: 'http://192.168.10.17', logo: classmate2Logo },
    { name: 'INGCO', website: 'http://192.168.10.29', logo: classmate3Logo },
    { name: 'KFC', website: 'http://192.168.10.19', logo: classmate4Logo },
    { name: 'LRT', website: 'http://192.168.10.43', logo: classmate18Logo },
    { name: 'MedPoint', website: 'http://192.168.10.36', logo: classmate6Logo },
    { name: 'Motortrade', website: 'http://192.168.10.23/moto', logo: classmate7Logo },
    { name: 'National Book Store', website: 'http://192.168.10.24', logo: classmate8Logo },
    { name: 'OHMART', website: 'http://192.168.10.21', logo: classmate9Logo },
    { name: 'ParaPo', website: 'http://192.168.10.37   ', logo: classmate10Logo },
    { name: 'Savemore', website: 'http://192.168.10.25', logo: classmate11Logo },
    { name: 'Shoepatoes', website: 'http://192.168.10.26', logo: classmate5Logo },
    { name: 'SkyEase', website: 'http://192.168.10.41', logo: classmate19Logo },
    { name: 'Tiago Shop', website: 'https://tiagoshop.vercel.app', logo: classmate12Logo },
    { name: 'Toyota', website: 'http://192.168.10.38', logo: classmate13Logo },
    { name: 'TX', website: 'http://192.168.10.22', logo: classmate14Logo },
    { name: 'Union Bank', website: 'http://192.168.10.14', logo: classmate15Logo },
    { name: 'Watsons', website: 'http://192.168.10.27', logo: classmate16Logo },
    { name: 'WNE', website: 'http://192.168.10.12/yacapin', logo: classmate17Logo },
    // Add more classmates as needed
];  

const Connections = () => {
    return (
        <div className="connections">
            <h1>Partner Shops</h1>
            <div className="classmate-cards">
                {classmates.map((classmate, index) => (
                    <a
                        key={index}
                        className="classmate-card"
                        href={classmate.website}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {classmate.logo && (
                            <img
                                src={classmate.logo}
                                alt={`${classmate.name} logo`}
                                className="classmate-logo"
                            />
                        )}
                        <h3>{classmate.name}</h3>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Connections;
