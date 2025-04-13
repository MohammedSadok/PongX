export function AboutSection() {
  return (
    <div className="text-center max-w-5xl mx-auto px-4 transition-all duration-500 transform">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">About</h1>

      <div className="mb-10 relative">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-green-400 animate-pulse">PROMPTING IS ALL YOU NEED</h2>
        <p className="text-xl mb-6">An interactive experience demonstrating creative web development with physics</p>

        {/* Animated elements */}
        <div className="absolute -z-10 top-0 left-0 w-full h-full overflow-hidden opacity-20">
          <div
            className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-green-400 animate-ping"
            style={{ animationDuration: "3s" }}
          ></div>
          <div
            className="absolute top-3/4 right-1/4 w-12 h-12 rounded-full bg-blue-400 animate-ping"
            style={{ animationDuration: "4s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 w-20 h-20 rounded-full bg-purple-400 animate-ping"
            style={{ animationDuration: "5s" }}
          ></div>
        </div>
      </div>

      <div className="mb-12 text-left">
        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <p className="text-lg mb-4">
          We create interactive experiences that blend art, technology, and playfulness to demonstrate the power of
          creative web development using modern frameworks and techniques.
        </p>
        <p className="text-lg">
          Our goal is to push the boundaries of what's possible in the browser, creating memorable digital experiences
          that inspire and educate.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-left">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              name: "Alex Chen",
              role: "Creative Director",
              avatar: "/placeholder.svg?height=100&width=100",
              bio: "Specializes in interactive design and creative coding",
            },
            {
              name: "Sam Rodriguez",
              role: "Lead Developer",
              avatar: "/placeholder.svg?height=100&width=100",
              bio: "Expert in WebGL, Three.js and physics simulations",
            },
            {
              name: "Jamie Taylor",
              role: "UX Designer",
              avatar: "/placeholder.svg?height=100&width=100",
              bio: "Creates intuitive and engaging user experiences",
            },
            {
              name: "Morgan Lee",
              role: "Technical Artist",
              avatar: "/placeholder.svg?height=100&width=100",
              bio: "Bridges the gap between design and development",
            },
          ].map((member, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg text-center transform transition-transform hover:scale-105"
            >
              <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
                <img
                  src={member.avatar || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-green-400 mb-2">{member.role}</p>
              <p className="text-sm text-gray-400">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6 text-left bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Our Technology</h2>
        <p>
          This interactive experience demonstrates the power of creative web development using React, Canvas API, and
          modern JavaScript.
        </p>
        <p>
          The ball physics simulation allows you to interact with the UI in a playful way, combining game mechanics with
          web navigation.
        </p>
        <p>We've implemented features like:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li className="animate-fadeIn" style={{ animationDelay: "0.1s" }}>
            Real-time physics simulation with collision detection
          </li>
          <li className="animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            Interactive canvas rendering with optimized performance
          </li>
          <li className="animate-fadeIn" style={{ animationDelay: "0.3s" }}>
            Responsive design that works across devices
          </li>
          <li className="animate-fadeIn" style={{ animationDelay: "0.4s" }}>
            Theme customization with dynamic color palettes
          </li>
          <li className="animate-fadeIn" style={{ animationDelay: "0.5s" }}>
            Smooth animations and transitions between sections
          </li>
        </ul>
      </div>

      <div className="mt-10 flex justify-center space-x-4">
        <div className="w-3 h-3 rounded-full bg-green-400 animate-bounce" style={{ animationDelay: "0s" }}></div>
        <div className="w-3 h-3 rounded-full bg-green-400 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        <div className="w-3 h-3 rounded-full bg-green-400 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
      </div>
    </div>
  )
}
