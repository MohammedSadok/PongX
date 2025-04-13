export function AboutSection() {
  return (
    <div className="text-center max-w-5xl mx-auto px-4 transition-all duration-500 transform">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">About Me</h1>

      <div className="mb-10 relative">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-400">
          Software Engineer
        </h2>
        <p className="text-xl mb-6">
          Focused on creating efficient, scalable, and user-friendly solutions
        </p>
      </div>

      <div className="mb-12 text-left">
        <h2 className="text-2xl font-bold mb-4">Professional Profile</h2>
        <p className="text-lg mb-4">
          I'm a software engineer passionate about developing innovative
          solutions and solving complex problems. I master several programming
          languages such as Java, JavaScript, and TypeScript, as well as DevOps
          tools like Docker, Jenkins, and AWS, allowing me to quickly adapt to
          any framework or technology.
        </p>
        <p className="text-lg">
          Self-reliant, serious, and meticulous, I have great adaptability and a
          team spirit, enabling me to effectively address both technical and
          collaborative challenges.
        </p>
      </div>

      {/* Experience Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-left">Experience</h2>
        <div className="space-y-8">
          {/* Experience 1 */}
          <div className="bg-gray-800 p-6 rounded-lg text-left hover:bg-gray-700 transition-colors">
            <div className="flex flex-wrap justify-between items-start mb-2">
              <h3 className="text-xl font-semibold text-green-400">
                Full Stack Developer
              </h3>
              <span className="text-gray-400">Apr 2024 - Sep 2024</span>
            </div>
            <p className="text-gray-300 mb-1">
              Faculté des Sciences El Jadida, El Jadida, Maroc
            </p>
            <p>
              Designed and developed a full-stack web application with Next.js
              for managing and scheduling exam sessions, including the
              distribution of invigilators, assignment of teachers, booking of
              premises, and student management.
            </p>
          </div>

          {/* Experience 2 */}
          <div className="bg-gray-800 p-6 rounded-lg text-left hover:bg-gray-700 transition-colors">
            <div className="flex flex-wrap justify-between items-start mb-2">
              <h3 className="text-xl font-semibold text-green-400">
                Mobile Developer
              </h3>
              <span className="text-gray-400">May 2023 - Jul 2023</span>
            </div>
            <p className="text-gray-300 mb-1">
              École Nationale d'Agriculture de Meknès, Meknès, Morocco
            </p>
            <p>
              Designed and created a mobile application dedicated to olive grove
              monitoring, developed using React Native, with a Spring Boot-based
              backend and a MySQL database.
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-xs px-2 py-1 rounded-full bg-gray-700">
                Back-End
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-700">
                Front-End
              </span>
            </div>
          </div>

          {/* Experience 3 */}
          <div className="bg-gray-800 p-6 rounded-lg text-left hover:bg-gray-700 transition-colors">
            <div className="flex flex-wrap justify-between items-start mb-2">
              <h3 className="text-xl font-semibold text-green-400">
                Web Developer
              </h3>
              <span className="text-gray-400">Apr 2022 - Jun 2022</span>
            </div>
            <p className="text-gray-300 mb-1">NATIVYS, Fès, Morocco</p>
            <p>
              Created a platform using Next.js allowing users to make instant
              appointments with nearby beauty professionals.
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-xs px-2 py-1 rounded-full bg-gray-700">
                Front-End
              </span>
            </div>
          </div>

          {/* Experience 4 */}
          <div className="bg-gray-800 p-6 rounded-lg text-left hover:bg-gray-700 transition-colors">
            <div className="flex flex-wrap justify-between items-start mb-2">
              <h3 className="text-xl font-semibold text-green-400">
                PFE (Final Year Project)
              </h3>
              <span className="text-gray-400">Jan 2022 - Apr 2022</span>
            </div>
            <p className="text-gray-300 mb-1">
              Ecole Supérieure de Technologie Fès, Fès, Morocco
            </p>
            <p>
              Designed and developed a mobile cryptocurrency portfolio
              management application using React Native, combined with a MySQL
              database and Express.js backend.
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-xs px-2 py-1 rounded-full bg-gray-700">
                Front-End
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-left">Education</h2>
        <div className="space-y-6">
          {/* Education 1 */}
          <div className="bg-gray-800 p-6 rounded-lg text-left">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold">
                Master spécialisé - Ingénierie Informatique et Analyse de
                Données
              </h3>
              <span className="text-gray-400">2023 - Present</span>
            </div>
            <p className="text-green-400">
              Faculté des Sciences El Jadida, El Jadida, Maroc
            </p>
          </div>

          {/* Education 2 */}
          <div className="bg-gray-800 p-6 rounded-lg text-left">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold">
                Licence Professionnelle - Web et Application Mobiles
              </h3>
              <span className="text-gray-400">2022 - 2023</span>
            </div>
            <p className="text-green-400">
              Faculté des Sciences de Rabat, Rabat, Maroc
            </p>
          </div>

          {/* Education 3 */}
          <div className="bg-gray-800 p-6 rounded-lg text-left">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold">
                Diplômes Universitaires de Technologie - Génie Logiciel
              </h3>
              <span className="text-gray-400">2020 - 2022</span>
            </div>
            <p className="text-green-400">
              Ecole Supérieure de Technologie Fès, Fès, Maroc
            </p>
          </div>

          {/* Education 4 */}
          <div className="bg-gray-800 p-6 rounded-lg text-left">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold">
                Baccalauréat - Science Physique
              </h3>
              <span className="text-gray-400">2020</span>
            </div>
            <p className="text-green-400">Lycée Ibn lhaytam, Fès, Maroc</p>
          </div>
        </div>
      </div>

      {/* Languages */}
      <div className="space-y-6 text-left bg-gray-800 p-6 rounded-lg mb-12">
        <h2 className="text-2xl font-bold mb-4">Languages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Arabic</h3>
            <div className="w-full bg-gray-600 rounded-full h-2.5">
              <div
                className="bg-green-400 h-2.5 rounded-full"
                style={{ width: "100%" }}
              ></div>
            </div>
            <p className="text-sm mt-1 text-gray-400">Native</p>
          </div>
          <div className="p-4 bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">French</h3>
            <div className="w-full bg-gray-600 rounded-full h-2.5">
              <div
                className="bg-green-400 h-2.5 rounded-full"
                style={{ width: "90%" }}
              ></div>
            </div>
            <p className="text-sm mt-1 text-gray-400">Fluent</p>
          </div>
          <div className="p-4 bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">English</h3>
            <div className="w-full bg-gray-600 rounded-full h-2.5">
              <div
                className="bg-green-400 h-2.5 rounded-full"
                style={{ width: "70%" }}
              ></div>
            </div>
            <p className="text-sm mt-1 text-gray-400">Intermediate</p>
          </div>
        </div>
      </div>

      {/* Personal Skills */}
      <div className="text-left mb-8">
        <h2 className="text-2xl font-bold mb-4">Personal Skills</h2>
        <div className="flex flex-wrap gap-3">
          {[
            "Autonomy",
            "Teamwork",
            "Adaptability",
            "Time Management",
            "Problem Solving",
            "Attention to Detail",
          ].map((skill, index) => (
            <span
              key={index}
              className="bg-green-500 text-black px-3 py-1 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
