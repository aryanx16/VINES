import React, { useRef } from 'react';
import HomeNavbar from '../components/HomeNavbar';
import GradientText from '../Animations/GradientText';
import ShinyText from '../Animations/ShinyText';
import SpotlightCard from '../Animations/SpotLightCard';
import { BlurText } from '../Animations/BlurText';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import Footer from '../components/Footer';

const About = () => {
    const navigate = useNavigate()
    const featuresSectionRef = useRef(null); // Create a ref for the Features Section

    const scrollToFeatures = () => {
        // Scroll to the Features Section
        if (featuresSectionRef.current) {
            featuresSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="font-mono bg-neutral-950 text-gray-100  relative">
            {/* Navbar */}
            
            <div className='absolute top-0  '>
        {/* <MouseEffect/> */}

            </div>
            <HomeNavbar />

            {/* Hero Section */}
            <section className="flex font-mono flex-col items-center pt-52 pb-64 md:pt-36 md:pb-44 text-center px-6">
                <h1 className="text-5xl sm:text-7xl font-extrabold mb-4">
                    <GradientText
                        colors={["#ffffff", "#ccffff"]}
                        animationSpeed={5}
                        className="custom-class font-extrabold font-sans text-6xl md:text-9xl"
                    >
                        Share Your Videos with the World!
                    </GradientText>
                </h1>
                <p className="text-lg sm:text-xl text-gray-200 mb-8">
                    Upload, watch, and connect with creators across the globe.

                </p>
                <div className="flex gap-4">
                    <motion.button whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, }}

                        animate={{ opacity: 1, transition: { duration: 1 } }}
                        exit={{ opacity: 0, y: 20 }} onClick={() => { navigate("/home") }} className="px-6 py-3 bg-neutral-950 border border-neutral-600 rounded-lg hover:bg-neutral-900 transition-transform shadow-xl shadow-neutral-900 font-mono transform hover:scale-105 ">
                        <ShinyText text="Get Started" disabled={false} speed={3} className='custom-class  hover:text-white font-extrabold' />
                    </motion.button>
                    {/* <GradientText
                        colors={["#0099ff","#cc00cc"]} // Custom gradient colors
                        animationSpeed={3} // Custom animation speed in seconds
                        showBorder={true} // Show or hide border
                        className="custom-class border border-neutral-700 bg-neutral-700 hover:bg-neutral-700 transition-transform transform hover:scale-105 shadow-xl shadow-neutral-900 flex justify-center items-center p-1" // Add one or more custom classes
                        >
                        Get Started
                        </GradientText> */}
                    <motion.button onClick={scrollToFeatures} whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, }}

                        animate={{ opacity: 1, transition: { duration: 1 } }}
                        exit={{ opacity: 0, y: 20 }} className="px-6 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-transform transform hover:scale-105">
                        Learn More
                    </motion.button>
                </div>
            </section>

            {/* Features Section */}
            <section ref={featuresSectionRef} className="py-16 pt-28 bg-black">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-12">
                        <BlurText text=" Why Choose Us?" className="custom-class md:text-5xl" delay={100} />
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
                        {/* Feature 1 */}
                        <SpotlightCard className="custom-spotlight-card border-2 border-neutral-500" spotlightColor="rgba(255, 255,255, 0.2)">
                            <img className='' src="https://cdn3d.iconscout.com/3d/premium/thumb/protection-3d-icon-download-in-png-blend-fbx-gltf-file-formats--safety-lock-secure-safe-password-pack-crime-security-icons-9148076.png?f=webp" alt="" />
                            <h3 className="text-2xl font-semibold mb-2 text-center">
                                High-Quality Videos
                            </h3>
                            <p className="text-gray-300 text-center">
                                Stream videos in 4K and beyond with minimal buffering.
                            </p>
                       
                        </SpotlightCard>
                        {/* Feature 2 */}
                        <SpotlightCard className="custom-spotlight-card border-2 border-neutral-500" spotlightColor="rgba(255, 255,255, 0.2)">
                            <img className='' src="https://cdn3d.iconscout.com/3d/premium/thumb/community-3d-icon-download-in-png-blend-fbx-gltf-file-formats--people-group-social-communication-business-user-interface-pack-icons-5272750.png?f=webp" alt="" />
                            <h3 className="text-2xl font-semibold mb-2 text-center">
                                Engaged Community
                            </h3>
                            <p className="text-gray-300 text-center">
                                Connect with creators and viewers from all over the world.
                            </p>
                        </SpotlightCard>

                        {/* Feature 3 */}
                        <SpotlightCard className="custom-spotlight-card rounded-sm border-2 border-neutral-500" spotlightColor="rgba(255, 255,255, 0.2)">
                            <img src="https://cdn3d.iconscout.com/3d/premium/thumb/coin-stack-3d-icon-download-in-png-blend-fbx-gltf-file-formats--wealth-currency-savings-monetization-pack-business-icons-10890969.png?f=webp" alt="" />
                            <h3 className="text-2xl font-semibold mb-2 text-center">
                                Easy Monetization
                            </h3>
                            <p className="text-gray-300 text-center">
                                Earn money through ads, sponsorships, and memberships.
                            </p>
                        </SpotlightCard>

                    </div>
                </div>
            </section>

            {/* Video Showcase */}
        

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default About;
