'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

export default function Page() {
  const mountRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  const fullText = '🙏 Hare Krishna'
  const [typedText, setTypedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    // Typing animation effect
    const typeText = () => {
      let currentIndex = 0
      const typingInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setTypedText(fullText.slice(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(typingInterval)
          // After typing is complete, continue blinking cursor for a bit then hide it
          setTimeout(() => {
            setShowCursor(false)
          }, 3000) // Show cursor for 3 more seconds after typing
        }
      }, 150) // 150ms delay between each character
    }

    // Start typing animation after a short delay
    const startTyping = setTimeout(typeText, 1000)

    return () => {
      clearTimeout(startTyping)
    }
  }, [])

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement)
    }

    // Create multiple floating lotus-like geometries
    const geometries = []
    const materials = []
    const meshes = []

    for (let i = 0; i < 5; i++) {
      const geometry = new THREE.TorusKnotGeometry(0.8, 0.2, 100, 16)
      const material = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0x4fc3f7 : 0xffa726,
        transparent: true,
        opacity: 0.3,
      })
      const mesh = new THREE.Mesh(geometry, material)

      mesh.position.x = (Math.random() - 0.5) * 10
      mesh.position.y = (Math.random() - 0.5) * 10
      mesh.position.z = (Math.random() - 0.5) * 10

      scene.add(mesh)
      geometries.push(geometry)
      materials.push(material)
      meshes.push(mesh)
    }

    const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffa726, 1)
    pointLight.position.set(10, 10, 10)
    scene.add(pointLight)

    const pointLight2 = new THREE.PointLight(0x4fc3f7, 0.8)
    pointLight2.position.set(-10, -10, 5)
    scene.add(pointLight2)

    camera.position.z = 8

    const animate = () => {
      requestAnimationFrame(animate)

      meshes.forEach((mesh, index) => {
        mesh.rotation.x += 0.005 + index * 0.001
        mesh.rotation.y += 0.008 + index * 0.001
        mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002
      })

      renderer.render(scene, camera)
    }
    animate()

    setTimeout(() => setIsLoaded(true), 500)

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-orange-800 text-white overflow-x-hidden'>
      {/* Three.js Background */}
      <div
        ref={mountRef}
        className='fixed top-0 left-0 w-full h-full z-0'
      ></div>

      {/* Animated Background Patterns - Sudarshan Chakras and Peacock Feathers */}
      <div className='fixed inset-0 z-0'>
        {/* Sudarshan Chakra - Top Left */}
        <div className='absolute top-10 left-10 w-32 h-32 opacity-25'>
          <div
            className='w-full h-full border-4 border-orange-400 rounded-full animate-spin relative'
            style={{ animationDuration: '20s' }}
          >
            <div
              className='absolute inset-2 border-2 border-yellow-400 rounded-full animate-spin'
              style={{
                animationDuration: '15s',
                animationDirection: 'reverse',
              }}
            ></div>
            <div
              className='absolute inset-4 border border-orange-300 rounded-full animate-spin'
              style={{ animationDuration: '10s' }}
            ></div>
            {/* Chakra Spokes */}
            <div className='absolute top-1/2 left-1/2 w-0.5 h-full bg-orange-400 transform -translate-x-1/2 -translate-y-1/2'></div>
            <div className='absolute top-1/2 left-1/2 w-full h-0.5 bg-orange-400 transform -translate-x-1/2 -translate-y-1/2'></div>
            <div className='absolute top-1/2 left-1/2 w-0.5 h-full bg-orange-400 transform -translate-x-1/2 -translate-y-1/2 rotate-45'></div>
            <div className='absolute top-1/2 left-1/2 w-full h-0.5 bg-orange-400 transform -translate-x-1/2 -translate-y-1/2 rotate-45'></div>
          </div>
        </div>

        {/* Peacock Feather - Top Right */}
        <div className='absolute top-20 right-16 w-16 h-32 opacity-30 animate-pulse'>
          <div className='relative'>
            {/* Feather Stem */}
            <div className='absolute bottom-0 left-1/2 w-1 h-24 bg-gradient-to-t from-green-600 to-green-400 transform -translate-x-1/2 rounded-full'></div>
            {/* Feather Eye */}
            <div className='absolute top-0 left-1/2 w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full transform -translate-x-1/2'>
              <div className='absolute inset-2 bg-gradient-to-br from-green-400 to-teal-500 rounded-full'>
                <div className='absolute inset-2 bg-gradient-to-br from-blue-700 to-indigo-800 rounded-full'>
                  <div className='absolute inset-1 bg-white rounded-full opacity-80'></div>
                </div>
              </div>
            </div>
            {/* Feather Strands */}
            <div className='absolute top-6 left-0 w-6 h-16 bg-gradient-to-b from-blue-400 to-transparent transform rotate-12 opacity-70'></div>
            <div className='absolute top-6 right-0 w-6 h-16 bg-gradient-to-b from-blue-400 to-transparent transform -rotate-12 opacity-70'></div>
          </div>
        </div>

        {/* Small Sudarshan Chakra - Bottom Right */}
        <div className='absolute bottom-32 right-20 w-20 h-20 opacity-20'>
          <div
            className='w-full h-full border-2 border-yellow-400 rounded-full animate-spin relative'
            style={{ animationDuration: '25s' }}
          >
            <div
              className='absolute inset-1 border border-orange-400 rounded-full animate-spin'
              style={{
                animationDuration: '12s',
                animationDirection: 'reverse',
              }}
            ></div>
            <div className='absolute top-1/2 left-1/2 w-0.5 h-full bg-yellow-400 transform -translate-x-1/2 -translate-y-1/2'></div>
            <div className='absolute top-1/2 left-1/2 w-full h-0.5 bg-yellow-400 transform -translate-x-1/2 -translate-y-1/2'></div>
          </div>
        </div>

        {/* Peacock Feather - Bottom Left */}
        <div
          className='absolute bottom-20 left-20 w-12 h-24 opacity-25 animate-bounce'
          style={{ animationDuration: '4s' }}
        >
          <div className='relative'>
            <div className='absolute bottom-0 left-1/2 w-0.5 h-16 bg-gradient-to-t from-green-600 to-green-400 transform -translate-x-1/2'></div>
            <div className='absolute top-0 left-1/2 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full transform -translate-x-1/2'>
              <div className='absolute inset-1 bg-gradient-to-br from-green-400 to-teal-500 rounded-full'>
                <div className='absolute inset-1 bg-gradient-to-br from-blue-700 to-indigo-800 rounded-full'></div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional floating feathers */}
        <div
          className='absolute top-1/2 left-8 w-8 h-16 opacity-15 animate-pulse'
          style={{ animationDelay: '2s' }}
        >
          <div className='w-full h-full bg-gradient-to-b from-blue-400 via-green-400 to-transparent transform rotate-45'></div>
        </div>

        <div
          className='absolute top-1/3 right-8 w-6 h-12 opacity-20 animate-pulse'
          style={{ animationDelay: '3s' }}
        >
          <div className='w-full h-full bg-gradient-to-b from-purple-400 via-blue-400 to-transparent transform -rotate-30'></div>
        </div>
      </div>

      {/* CSS for blinking cursor */}
      <style jsx>{`
        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0;
          }
        }
        .blink {
          animation: blink 1s infinite;
        }
      `}</style>

      {/* Main Content */}
      <div
        className={`relative z-10 transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Hero Section */}
        <div className='min-h-screen flex items-center justify-center px-4'>
          <div className='text-center max-w-4xl mx-auto'>
            <div className='mb-8 animate-fade-in'>
              {/* Sudarshan Chakra behind title */}
              <div className='relative mb-6'>
                <div
                  className='absolute top-1/2 left-1/2 w-48 h-48 transform -translate-x-1/2 -translate-y-1/2 opacity-10 animate-spin'
                  style={{ animationDuration: '30s' }}
                >
                  <div className='w-full h-full border-4 border-orange-400 rounded-full relative'>
                    <div className='absolute inset-4 border-2 border-yellow-400 rounded-full'></div>
                    <div className='absolute top-1/2 left-1/2 w-1 h-full bg-orange-400 transform -translate-x-1/2 -translate-y-1/2'></div>
                    <div className='absolute top-1/2 left-1/2 w-full h-1 bg-orange-400 transform -translate-x-1/2 -translate-y-1/2'></div>
                    <div className='absolute top-1/2 left-1/2 w-1 h-full bg-orange-400 transform -translate-x-1/2 -translate-y-1/2 rotate-45'></div>
                    <div className='absolute top-1/2 left-1/2 w-full h-1 bg-orange-400 transform -translate-x-1/2 -translate-y-1/2 rotate-45'></div>
                  </div>
                </div>
                <h1 className='text-6xl md:text-8xl font-bold bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-600 bg-clip-text text-transparent mb-4 relative z-10'>
                  {typedText}
                  {(
                    <span className='blink md:text-8xl bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-600 bg-clip-text text-transparent mb-4 relative z-10'>
                      |
                    </span>
                  )}
                </h1>
              </div>

              {/* Peacock feather decorative line */}
              <div className='flex items-center justify-center mb-6'>
                <div className='w-8 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-2'></div>
                <div className='w-44 h-1 bg-gradient-to-r from-orange-400 to-yellow-400'></div>
                <div className='w-8 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full ml-2'></div>
              </div>
              <h2 className='text-3xl md:text-5xl font-semibold text-blue-200 mb-4'>
                I'm Tanishq Aswar
              </h2>
              <p className='text-xl md:text-2xl text-gray-300 leading-relaxed mb-4'>
                Information Technology Undergraduate @ IIIT Lucknow
              </p>
              <p className='text-lg md:text-xl text-gray-400 leading-relaxed'>
                Sophomore@IIIT Lucknow • Full Stack Developer • InfoSec
                Enthusiast • CGPA: 8.48/10
              </p>
            </div>

            <div className='flex flex-wrap gap-4 justify-center mt-8'>
              <button
                className='bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 rounded-full font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg'
                onClick={() => scrollToSection('creations')}
              >
                View Projects
              </button>
              <button
                className='border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-3 rounded-full font-semibold transform hover:scale-105 transition-all duration-300'
                onClick={() => scrollToSection('connect')}
              >
                Contact Me
              </button>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <section id='creations' className='py-20 px-4 mt-4'>
          <div className='max-w-6xl mx-auto'>
            <h2 className='text-4xl md:text-5xl font-bold text-center mb-16 relative'>
              <div
                className='absolute top-1/2 left-1/2 w-24 h-24 transform -translate-x-1/2 -translate-y-1/2 opacity-20 animate-spin'
                style={{ animationDuration: '15s' }}
              >
                <div className='w-full h-full border-2 border-blue-400 rounded-full relative'>
                  <div className='absolute top-1/2 left-1/2 w-0.5 h-full bg-blue-400 transform -translate-x-1/2 -translate-y-1/2'></div>
                  <div className='absolute top-1/2 left-1/2 w-full h-0.5 bg-blue-400 transform -translate-x-1/2 -translate-y-1/2'></div>
                </div>
              </div>
              <span className='bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent relative z-10'>
                ✨ Creations
              </span>
              {/* Peacock feather accents */}
              <div className='absolute -top-2 -left-4 w-6 h-12 opacity-30'>
                <div className='w-full h-full bg-gradient-to-b from-blue-400 to-transparent transform rotate-45'></div>
              </div>
              <div className='absolute -top-2 -right-4 w-6 h-12 opacity-30'>
                <div className='w-full h-full bg-gradient-to-b from-purple-400 to-transparent transform -rotate-45'></div>
              </div>
            </h2>

            <div className='grid md:grid-cols-2 gap-8'>
              <div className='bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105'>
                <div className='mb-4'>
                  <h3 className='text-2xl font-bold text-orange-400 mb-2'>
                    CrowdInfra
                  </h3>
                  <p className='text-gray-300 leading-relaxed'>
                    A platform empowering communities to voice infrastructure
                    needs through crowdsourced mapping. Built with Next.js,
                    Express.js, and MongoDB, featuring AI-powered insights via
                    Gemini API.
                  </p>
                </div>
                <div className='flex gap-4 mt-6'>
                  <a
                    href='https://infra-crowd.vercel.app/landing'
                    className='bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors duration-300'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    🌐 Live Demo
                  </a>
                  <a
                    href='https://github.com/TanishqAswar/CrowdInfra'
                    className='border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-4 py-2 rounded-lg transition-all duration-300'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    💻 GitHub
                  </a>
                </div>
              </div>

              <div className='bg-gradient-to-br from-orange-900/50 to-red-900/50 backdrop-blur-lg rounded-2xl p-8 border border-orange-500/30 hover:border-orange-400/50 transition-all duration-300 transform hover:scale-105'>
                <div className='mb-4'>
                  <h3 className='text-2xl font-bold text-blue-400 mb-2'>
                    BlockPenguin
                  </h3>
                  <p className='text-gray-300 leading-relaxed'>
                    A revolutionary Unity game where achievements transform into
                    tradable digital assets on the blockchain. Features
                    responsive controls, tokenization via Thirdweb SDK, and
                    secure wallet integration.
                  </p>
                </div>
                <div className='flex gap-4 mt-6'>
                  <a
                    href='https://github.com/TanishqAswar/Block-Penguin-mySpace'
                    className='border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-4 py-2 rounded-lg transition-all duration-300'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    🎮 GitHub
                  </a>
                  <span className='bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-lg'>
                    🚧 In Development
                  </span>
                </div>
              </div>

              <div className='bg-gradient-to-br from-green-900/50 to-teal-900/50 backdrop-blur-lg rounded-2xl p-8 border border-green-500/30 hover:border-green-400/50 transition-all duration-300 transform hover:scale-105'>
                <div className='mb-4'>
                  <h3 className='text-2xl font-bold text-yellow-400 mb-2'>
                    Granthalaya
                  </h3>
                  <p className='text-gray-300 leading-relaxed'>
                    A sacred e-commerce platform dedicated to spiritual
                    literature and Vedic wisdom. Will feature AI-powered
                    personalized recommendations and live learning sessions with
                    spiritual scholars.
                  </p>
                </div>
                <div className='flex gap-4 mt-6'>
                  <span className='bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-lg'>
                    🔮 Future Project
                  </span>
                  <span className='bg-green-500/20 text-green-400 px-4 py-2 rounded-lg'>
                    📚 Spiritual Tech
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className='py-20 px-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-sm'>
          <div className='max-w-6xl mx-auto'>
            <h2 className='text-4xl md:text-5xl font-bold text-center mb-16 relative'>
              {/* Mini Sudarshan Chakras as decorative elements */}
              <div className='absolute -top-8 left-1/2 transform -translate-x-1/2 flex gap-4'>
                <div
                  className='w-8 h-8 border border-orange-400 rounded-full animate-spin opacity-40'
                  style={{ animationDuration: '10s' }}
                ></div>
                <div
                  className='w-6 h-6 border border-yellow-400 rounded-full animate-spin opacity-60'
                  style={{
                    animationDuration: '8s',
                    animationDirection: 'reverse',
                  }}
                ></div>
                <div
                  className='w-8 h-8 border border-orange-400 rounded-full animate-spin opacity-40'
                  style={{ animationDuration: '12s' }}
                ></div>
              </div>
              <span className='bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent'>
                🏆 Achievements & Accolades
              </span>
            </h2>

            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {[
                {
                  icon: '💻',
                  title: 'Codeforces Pupil',
                  desc: 'Max Rating: 1266',
                  color: 'from-blue-500 to-purple-500',
                },
                {
                  icon: '🛡️',
                  title: 'OWASP Badge',
                  desc: 'TryHackMe Certified',
                  color: 'from-red-500 to-orange-500',
                },
                {
                  icon: '🥇',
                  title: 'SecuriQuest Winner',
                  desc: '1st Place 2024',
                  color: 'from-yellow-500 to-orange-500',
                },
                {
                  icon: '🌟',
                  title: 'Hacktoberfest',
                  desc: 'Open Source Contributor',
                  color: 'from-green-500 to-teal-500',
                },
              ].map((achievement, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${achievement.color} p-1 rounded-2xl transform hover:scale-105 transition-all duration-300`}
                >
                  <div className='bg-gray-900/80 backdrop-blur-lg rounded-2xl p-6 h-full text-center'>
                    <div className='text-4xl mb-3'>{achievement.icon}</div>
                    <h3 className='text-xl font-bold text-white mb-2'>
                      {achievement.title}
                    </h3>
                    <p className='text-gray-300 text-sm'>{achievement.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Position of Responsibility Section */}
        <section className='py-16 px-4 bg-gradient-to-r from-blue-900/30 to-indigo-900/30 backdrop-blur-sm'>
          <div className='max-w-6xl mx-auto'>
            <h2 className='text-4xl md:text-5xl font-bold text-center mb-12 relative'>
              <div className='absolute -top-6 left-1/2 transform -translate-x-1/2 flex gap-2'>
                <div
                  className='w-6 h-6 border border-blue-400 rounded-full animate-spin opacity-50'
                  style={{ animationDuration: '8s' }}
                ></div>
                <div
                  className='w-4 h-4 border border-yellow-400 rounded-full animate-spin opacity-70'
                  style={{
                    animationDuration: '6s',
                    animationDirection: 'reverse',
                  }}
                ></div>
                <div
                  className='w-6 h-6 border border-blue-400 rounded-full animate-spin opacity-50'
                  style={{ animationDuration: '10s' }}
                ></div>
              </div>
              <span className='bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent'>
                🛡️ Position of Responsibility
              </span>
            </h2>

            <div className='bg-gradient-to-br from-gray-900/60 to-blue-900/40 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 max-w-4xl mx-auto'>
              <div className='text-center'>
                <div className='mb-6'>
                  <h3 className='text-2xl font-bold text-cyan-400 mb-3'>
                    Axios — InfoSec Wing Member
                  </h3>
                  <p className='text-xl text-blue-200 mb-4'>
                    <strong>IIIT Lucknow</strong>
                  </p>
                </div>

                <div className='text-left bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-xl p-6 border border-blue-400/20'>
                  <h4 className='text-lg font-semibold text-orange-400 mb-4'>
                    Key Responsibilities:
                  </h4>
                  <div className='space-y-3 text-gray-300'>
                    <div className='flex items-start gap-3'>
                      <span className='text-cyan-400 mt-1'>🎯</span>
                      <p>
                        Led CTF (Capture The Flag) training sessions for
                        students, enhancing their cybersecurity problem-solving
                        skills
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className='py-20 px-4'>
          <div className='max-w-6xl mx-auto'>
            <h2 className='text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
              🛠️ Skills & Technologies
            </h2>

            <div className='grid md:grid-cols-3 gap-8'>
              <div className='text-center'>
                <h3 className='text-2xl font-bold text-orange-400 mb-6'>
                  Languages
                </h3>
                <div className='flex flex-wrap gap-3 justify-center'>
                  {['C++', 'JavaScript', 'Java', 'C#', 'SQL', 'Bash'].map(
                    (skill, index) => (
                      <span
                        key={index}
                        className='bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/30 text-orange-300 px-4 py-2 rounded-full text-sm hover:scale-105 transition-transform duration-300'
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className='text-center'>
                <h3 className='text-2xl font-bold text-blue-400 mb-6'>
                  Frameworks
                </h3>
                <div className='flex flex-wrap gap-3 justify-center'>
                  {[
                    'React.js',
                    'Node.js',
                    'Express.js',
                    'Next.js',
                    'Unity',
                  ].map((skill, index) => (
                    <span
                      key={index}
                      className='bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 text-blue-300 px-4 py-2 rounded-full text-sm hover:scale-105 transition-transform duration-300'
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className='text-center'>
                <h3 className='text-2xl font-bold text-green-400 mb-6'>
                  Tools & Platforms
                </h3>
                <div className='flex flex-wrap gap-3 justify-center'>
                  {['MongoDB', 'Git', 'Linux', 'InfoSec Tools'].map(
                    (skill, index) => (
                      <span
                        key={index}
                        className='bg-gradient-to-r from-green-500/20 to-teal-500/20 border border-green-400/30 text-green-300 px-4 py-2 rounded-full text-sm hover:scale-105 transition-transform duration-300'
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id='connect'
          className='py-20 px-4 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-sm'
        >
          <div className='max-w-4xl mx-auto text-center'>
            <h2 className='text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent'>
              📫 Connect with Me
            </h2>
            <p className='text-xl text-gray-300 mb-12'>
              Let's collaborate on divine projects and create something
              extraordinary together
            </p>

            <div className='grid md:grid-cols-3 gap-8 mb-12'>
              <a
                href='mailto:tanishqaswar2005@gmail.com'
                className='bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-400/30 rounded-2xl p-6 hover:scale-105 transition-all duration-300 group'
              >
                <div className='text-4xl mb-4 group-hover:animate-bounce'>
                  📧
                </div>
                <h3 className='text-xl font-bold text-red-400 mb-2'>Email</h3>
                <p className='text-gray-300 text-sm'>
                  tanishqaswar2005@gmail.com
                </p>
              </a>

              <a
                href='https://www.linkedin.com/in/tanishq-aswar-04515928a/'
                target='_blank'
                rel='noopener noreferrer'
                className='bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 rounded-2xl p-6 hover:scale-105 transition-all duration-300 group'
              >
                <div className='text-4xl mb-4 group-hover:animate-bounce'>
                  💼
                </div>
                <h3 className='text-xl font-bold text-blue-400 mb-2'>
                  LinkedIn
                </h3>
                <p className='text-gray-300 text-sm'>TanishqAswar</p>
              </a>

              <a
                href='https://github.com/TanishqAswar'
                target='_blank'
                rel='noopener noreferrer'
                className='bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-2xl p-6 hover:scale-105 transition-all duration-300 group'
              >
                <div className='text-4xl mb-4 group-hover:animate-bounce'>
                  💻
                </div>
                <h3 className='text-xl font-bold text-purple-400 mb-2'>
                  GitHub
                </h3>
                <p className='text-gray-300 text-sm'>TanishqAswar</p>
              </a>
            </div>

            <a
              href='https://drive.google.com/drive/folders/1I37iTZEZPP13EqMrIiLkSJIKjZW2pHTS?usp=sharing'
              className='inline-block bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-8 py-4 rounded-full font-bold text-lg transform hover:scale-105 transition-all duration-300 shadow-lg'
              target='_blank'
              rel='noopener noreferrer'
            >
              📄 View Complete Resume
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className='py-8 px-4 text-center border-t border-purple-500/30 relative'>
          {/* Decorative Sudarshan Chakra and Peacock feathers */}
          <div className='absolute top-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 opacity-30'>
            <div className='w-6 h-12 bg-gradient-to-b from-blue-400 to-transparent'></div>
            <div
              className='w-8 h-8 border border-orange-400 rounded-full animate-spin'
              style={{ animationDuration: '20s' }}
            >
              <div className='absolute top-1/2 left-1/2 w-0.5 h-full bg-orange-400 transform -translate-x-1/2 -translate-y-1/2'></div>
              <div className='absolute top-1/2 left-1/2 w-full h-0.5 bg-orange-400 transform -translate-x-1/2 -translate-y-1/2'></div>
            </div>
            <div className='w-6 h-12 bg-gradient-to-b from-purple-400 to-transparent'></div>
          </div>

          <p className='text-gray-400 mb-4 relative z-10 mt-8'>
            🕉️ Made with devotion and code • Hare Krishna 🙏
          </p>
          <div className='w-16 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto'></div>
        </footer>
      </div>
    </div>
  )
}
