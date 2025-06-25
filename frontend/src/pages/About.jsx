import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from 'react-router-dom';

const About = () => {
    const featuresSectionRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { scrollYProgress } = useScroll();
    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    // Track mouse movement for interactive effects
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const scrollToFeatures = () => {
        if (featuresSectionRef.current) {
            featuresSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const features = [
        {
            icon: "🎥",
            title: "Video Upload Hub",
            description: "Easy-to-use interface for clubs to upload and manage their event videos. Support for multiple formats with automatic optimization for smooth playback.",
            gradient: "from-red-500/10 to-pink-500/20"
        },
        {
            icon: "📱",
            title: "Club Management",
            description: "Comprehensive dashboard for club administrators to organize videos, manage member access, and track engagement metrics for their content.",
            gradient: "from-blue-500/10 to-cyan-500/20"
        },
        {
            icon: "🎬",
            title: "Event Showcase",
            description: "Beautiful video galleries to showcase your club's activities and achievements. Create compelling visual stories that attract new members.",
            gradient: "from-purple-500/10 to-violet-500/20"
        }
    ];

    const stats = [
        { number: "500+", label: "Active Clubs", icon: "🏫" },
        { number: "10K+", label: "Videos Uploaded", icon: "🎬" },
        { number: "50K+", label: "Hours of Content", icon: "⏱️" },
        { number: "25+", label: "Universities", icon: "🎓" }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 60, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.4, 0.25, 1]
            }
        }
    };

    const floatingVariants = {
        animate: {
            y: [-20, 20, -20],
            rotate: [0, 5, -5, 0],
            transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
            {/* Advanced Background with Moving Gradients */}
            <div className="fixed inset-0 z-0">
                {/* Base gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-slate-950 to-black" />
                
                {/* Static grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
                
                {/* Animated orbs */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl"
                    animate={{
                        x: [0, 100, -50, 0],
                        y: [0, -50, 100, 0],
                        scale: [1, 1.2, 0.8, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-600/10 to-teal-600/10 rounded-full blur-3xl"
                    animate={{
                        x: [0, -80, 60, 0],
                        y: [0, 80, -40, 0],
                        scale: [1, 0.8, 1.3, 1]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear"                     }}
                />
                
                {/* Interactive cursor glow */}
                <div 
                    className="absolute pointer-events-none transition-all duration-300 ease-out"
                    style={{
                        left: mousePosition.x - 400,
                        top: mousePosition.y - 400,
                        width: '800px',
                        height: '800px',
                        background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)',
                        borderRadius: '50%'
                    }}
                />
            </div>

            {/* Navigation */}
            <nav className="relative z-50 flex justify-between items-center p-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                >
                    Vines
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="hidden md:flex space-x-8"
                >
                    <a href="#home" className="hover:text-blue-400 transition-colors">Home</a>
                    <a href="#about" className="hover:text-blue-400 transition-colors">Features</a>
                    <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
                </motion.div>
            </nav>

            {/* Hero Section */}
            <section id='home' className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
                    className="max-w-7xl mx-auto"
                >
                    {/* Status Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="inline-flex items-center px-4 py-2 mb-8 bg-white/5 border border-white/10 rounded-full text-sm font-medium backdrop-blur-xl"
                    >
                        <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse" />
                        <span className="bg-gradient-to-r from-emerald-300 to-blue-300 bg-clip-text text-transparent">
                            Platform for club event videos
                        </span>
                    </motion.div>

                    {/* Main Headline */}
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black mb-8 leading-[0.9] tracking-tight">
                        <motion.span
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="block bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent"
                        >
                            Share Your Club's
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="block text-3xl sm:text-5xl lg:text-6xl xl:text-7xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-extrabold"
                        >
                            Event Videos
                        </motion.span>
                    </h1>
                    
                    {/* Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="space-y-4 mb-12 max-w-4xl mx-auto"
                    >
                        <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed font-medium">
                            The dedicated platform for college clubs to upload, showcase and share their event videos with the campus community.
                        </p>
                        <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-3xl mx-auto">
                            From club meetings and workshops to major events and celebrations - preserve and share your club's memorable moments
                        </p>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
                    >
                        <motion.button 
                            whileHover={{ scale: 1.05, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 overflow-hidden border border-blue-500/30 w-full sm:w-auto"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            <span className="relative flex items-center justify-center gap-3">
                                <Link to={'/home'}>
                                Get Started 
                                </Link>
                            </span>
                        </motion.button>
                        
                        <motion.button 
                            whileHover={{ scale: 1.05, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={scrollToFeatures} 
                            className="group px-8 sm:px-12 py-4 sm:py-5 bg-white/5 border border-white/20 rounded-2xl font-bold text-base sm:text-lg hover:bg-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-xl w-full sm:w-auto"
                        >
                            <span className="flex items-center justify-center gap-3">
                                Discover Features
                                <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </span>
                        </motion.button>
                    </motion.div>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"
                />
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    transition={{ delay: 2 }}
                    className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-xl"
                />
            </section>

            {/* Stats Section */}
            <section  id='' className="relative z-10 py-16 sm:py-24  backdrop-blur-xl border-y border-white/10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="text-center group cursor-pointer"
                            >
                                <div className="text-4xl sm:text-6xl mb-2 group-hover:scale-110 transition-transform duration-300">
                                    {stat.icon}
                                </div>
                                <div className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                                    {stat.number}
                                </div>
                                <div className="text-gray-400 font-semibold text-xs sm:text-sm uppercase tracking-wider">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section id='about' ref={featuresSectionRef} className="relative z-10 py-20 sm:py-32">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16 sm:mb-20"
                    >
                        <div className="inline-flex items-center px-4 py-2 mb-8 bg-white/5 border border-white/10 rounded-full text-sm font-medium backdrop-blur-xl">
                            <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse" />
                            <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                                Video Platform Features
                            </span>
                        </div>
                        
                        <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black mb-6 sm:mb-8 tracking-tight">
                            <span className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                Everything Clubs
                            </span>
                            <span className="block text-2xl sm:text-4xl lg:text-6xl bg-gradient-to-r from-gray-400 to-gray-500 bg-clip-text text-transparent">
                                Need to Share Videos
                            </span>
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
                            Upload, manage, and showcase your club's event videos with our specialized platform designed for student organizations
                        </p>
                    </motion.div>

                    {/* Features Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto"
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ scale: 1.02, y: -10 }}
                                className="group cursor-pointer"
                            >
                                <div className={`h-full p-6 sm:p-8 bg-gradient-to-br ${feature.gradient} border border-white/10 rounded-3xl backdrop-blur-xl hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10`}>
                                    <div className="flex flex-col items-center text-center h-full">
                                        <div className="text-5xl sm:text-6xl mb-6 sm:mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white group-hover:bg-gradient-to-r group-hover:from-blue-300 group-hover:to-purple-300 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-300 leading-relaxed flex-grow text-base sm:text-lg font-medium">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="relative z-10 py-20 sm:py-32 bg-gradient-to-br from-blue-950/20 via-purple-950/20 to-black/40 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-blue-600/5" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)]" />
                
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-5xl mx-auto"
                    >
                        <div className="inline-flex items-center px-4 py-2 mb-8 bg-white/5 border border-white/10 rounded-full text-sm font-medium backdrop-blur-xl">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse" />
                            <span className="bg-gradient-to-r from-emerald-300 to-blue-300 bg-clip-text text-transparent">
                                Join the video sharing revolution
                            </span>
                        </div>
                        
                        <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black mb-6 sm:mb-8 tracking-tight">
                            <span className="block text-white">Share Your Club's Story</span>
                            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Through Video
                            </span>
                        </h2>
                        <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-10 sm:mb-12 leading-relaxed font-medium max-w-4xl mx-auto">
                            Upload and showcase your club's event videos to engage members, attract new participants, and preserve your organization's memorable moments
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative px-10 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-2xl font-black text-lg sm:text-xl text-white hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 overflow-hidden border border-blue-400/30"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            <Link to={'/home'}>
                            <span className="relative flex items-center gap-3">
                                Start Uploading
                                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            </span>
                            </Link>
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer id='contact' className="relative z-10 py-12 sm:py-16 bg-black/80 border-t border-white/10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Vines
                        </div>
                        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                            The premier platform for college clubs to upload, manage, and showcase their event videos.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
                        </div>
                        <div className="mt-8 pt-8 border-t border-white/10 text-gray-500 text-sm">
                            © 2025 Vines. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default About;