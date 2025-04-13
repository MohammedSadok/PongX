export function ProjectsSection() {
  return (
    <div className="text-center max-w-6xl mx-auto px-4 transition-all duration-500 transform">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">Projects</h1>
      <p className="text-xl mb-8">
        Showcasing my latest development work and technical innovations
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {[
          {
            title: "ClassEye",
            description:
              "Microservices application for intelligent classroom attendance management integrating facial recognition. Built with Spring Boot, Spring Cloud, Jenkins, Docker, Vite, React, Redux and TypeScript.",
            image: "/placeholder.svg?height=200&width=300",
            tags: [
              "Spring Boot",
              "Spring Cloud",
              "DevOps",
              "React",
              "Microservices",
            ],
          },
          {
            title: "Black Pixel",
            description:
              "Multimedia analysis application developed with Next.js, Tailwind CSS and TensorFlow, allowing users to import images, apply filters, detect objects and dynamically modify image resolution.",
            image: "/placeholder.svg?height=200&width=300",
            tags: ["Next.js", "TensorFlow", "Tailwind CSS", "Image Processing"],
          },
          {
            title: "MicroPay",
            description:
              "Innovative application for making micro-payments, developed with React (Vite) and using the Solana blockchain to ensure fast, secure and low-cost transactions.",
            image: "/placeholder.svg?height=200&width=300",
            tags: ["React", "Vite", "Blockchain", "Solana"],
          },
          {
            title: "E-Commerce Platform",
            description:
              "Comprehensive e-commerce application with Spring Boot backend, Next.js frontend, and a React Native mobile version, offering a complete shopping experience.",
            image: "/placeholder.svg?height=200&width=300",
            tags: ["Spring Boot", "Next.js", "React Native", "Full Stack"],
          },
          {
            title: "Exam Management System",
            description:
              "Full-stack application for managing and scheduling exam sessions, including supervisor distribution, teacher assignment, location booking and student management.",
            image: "/placeholder.svg?height=200&width=300",
            tags: ["Next.js", "Spring Boot", "MySQL", "Full Stack"],
          },
          {
            title: "Olive Grove Monitoring",
            description:
              "Mobile application for tracking and managing olive groves, featuring data collection, analysis, and reporting tools for agricultural management.",
            image: "/placeholder.svg?height=200&width=300",
            tags: ["React Native", "Spring Boot", "MySQL", "Mobile"],
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
            <p className="text-gray-400 mb-4 flex-grow">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300"
                >
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
  );
}
