export function ProjectsSection() {
  return (
    <div className="text-center max-w-6xl mx-auto px-4 transition-all duration-500 transform">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">Projects</h1>
      <p className="text-xl mb-8">Check out our latest interactive projects and experiments</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {[
          {
            title: "Neural Canvas",
            description: "AI-powered drawing tool that transforms sketches into detailed artwork",
            image: "/placeholder.svg?height=200&width=300",
            tags: ["AI", "Canvas", "WebGL"],
          },
          {
            title: "Quantum Simulator",
            description: "Interactive visualization of quantum computing principles and algorithms",
            image: "/placeholder.svg?height=200&width=300",
            tags: ["Physics", "Education", "3D"],
          },
          {
            title: "EcoSystem",
            description: "Simulated environment with artificial life forms that evolve over time",
            image: "/placeholder.svg?height=200&width=300",
            tags: ["Simulation", "Biology", "AI"],
          },
          {
            title: "Sound Waves",
            description: "Audio visualization tool that creates stunning patterns from music",
            image: "/placeholder.svg?height=200&width=300",
            tags: ["Audio", "Visualization", "WebAudio"],
          },
          {
            title: "Data Explorer",
            description: "Interactive 3D visualization of complex datasets and relationships",
            image: "/placeholder.svg?height=200&width=300",
            tags: ["Data", "3D", "Analytics"],
          },
          {
            title: "Particle Flow",
            description: "Physics-based particle system with fluid dynamics and user interaction",
            image: "/placeholder.svg?height=200&width=300",
            tags: ["Physics", "WebGL", "Interactive"],
          },
        ].map((project, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-all duration-300 flex flex-col"
          >
            <div className="mb-4 overflow-hidden rounded-md">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-gray-400 mb-4 flex-grow">{project.description}</p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tags.map((tag, tagIndex) => (
                <span key={tagIndex} className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <button className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-6 rounded-md transition-colors duration-300">
          View All Projects
        </button>
      </div>
    </div>
  )
}
