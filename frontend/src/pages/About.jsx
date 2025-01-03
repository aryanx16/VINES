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
    const imageLinks = [
        "https://images.unsplash.com/photo-1506781961370-37a89d6b3095?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1664910706524-e783eed89e71?q=80&w=3869&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1506781961370-37a89d6b3095?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1664910706524-e783eed89e71?q=80&w=3869&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1506781961370-37a89d6b3095?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1664910706524-e783eed89e71?q=80&w=3869&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1506781961370-37a89d6b3095?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1664910706524-e783eed89e71?q=80&w=3869&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1506781961370-37a89d6b3095?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1664910706524-e783eed89e71?q=80&w=3869&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ];
    return (
        <div className="font-mono bg-neutral-950 text-gray-100 min-h-screen">
            {/* Navbar */}
            <HomeNavbar />

            {/* Hero Section */}
            <section className="flex font-mono flex-col items-center  pt-36 pb-36 text-center px-6">
                <h1 className="text-5xl sm:text-7xl font-extrabold mb-4">
                    <GradientText
                        colors={["#ffffff", "#ccffff"]}
                        animationSpeed={5}
                        className="custom-class font-extrabold font-sans text-6xl md:text-9xl"
                    >
                        Share Your Videos with the World
                    </GradientText>
                </h1>
                <p className="text-lg sm:text-xl text-gray-200 mb-8">
                    Upload, watch, and connect with creators across the globe.

                </p>
                <div className="flex gap-4">
                    <motion.button       whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0,  }}
                      
                      animate={{ opacity: 1, transition:{duration:1}}}
                      exit={{ opacity: 0, y: 20 }} onClick={()=>{navigate("/home")}} className="px-6 py-3 bg-neutral-950 border border-neutral-600 rounded-lg hover:bg-neutral-900 transition-transform shadow-xl shadow-neutral-900 font-mono transform hover:scale-105 ">
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
                    <motion.button  onClick={scrollToFeatures} whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0,  }}
                      
                      animate={{ opacity: 1, transition:{duration:1}}}
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
            <section className="py-16 bg-neutral-950 pb-28">
    <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">                    <BlurText text="Featured Videos" className="custom-class md:text-5xl" delay={100} />
        </h2>
        <div className="relative overflow-hidden">
            <div className="flex gap-8 animate-scroll hover:animate-none">
                {[...Array(10)].map((_, index) => (
                    <div
                        key={index}
                        className="relative group overflow-hidden rounded-lg shadow-lg min-w-[300px] h-[200px]"
                    >
                        <img
                            className="w-full h-full object-cover"
                            src={`https://images.unsplash.com/photo-1506781961370-37a89d6b3095?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                            alt={`Image ${index + 1}`}
                        />
                        <div className="absolute transition-all duration-300 inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100  flex items-center justify-center">
                            <button className="px-4 py-2 bg-black border border-neutral-700 rounded-lg text-white hover:bg-neutral-950">
                            <ShinyText text="Watch Now" disabled={false} speed={3} className='custom-class   font-extrabold' />
                            </button>
                        </div>
                    </div>
                ))}
                {/* Duplicate images for seamless scrolling */}
                {[...Array(10)].map((_, index) => (
                    <div
                        key={`dup-${index}`}
                        className="relative group overflow-hidden rounded-lg shadow-lg min-w-[300px] h-[200px]"
                    >
                        <img
                            className="w-full h-full object-cover"
                            src={`https://plus.unsplash.com/premium_photo-1664910706524-e783eed89e71?q=80&w=3869&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                            alt={`Image ${index + 1}`}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button className="px-4 py-2 bg-green-600 rounded-lg text-white hover:bg-green-700">
                                Watch Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
</section>

            {/* Footer */}
           <Footer/>
        </div>
    );
};

export default About;
