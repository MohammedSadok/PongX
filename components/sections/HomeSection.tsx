export function HomeSection() {
  return (
    <div className="text-center max-w-4xl mx-auto px-4 transition-all duration-500 transform">
      <h1 className="text-4xl md:text-7xl font-bold mb-6">PROMPTING GAME</h1>

      <div className="mt-8 mb-12">
        <p className="text-xl md:text-2xl">An interactive physics-based navigation experience</p>
      </div>

      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="animate-pulse-slow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-green-400"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
          </svg>
        </div>
        <p className="text-lg opacity-80">Grab the ball and hit the navigation bar to explore</p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border border-gray-800 rounded-lg bg-black bg-opacity-30 hover:bg-opacity-50 transition-all">
          <p className="text-green-400">Grab</p>
        </div>
        <div className="p-4 border border-gray-800 rounded-lg bg-black bg-opacity-30 hover:bg-opacity-50 transition-all">
          <p className="text-green-400">Navigate</p>
        </div>
        <div className="p-4 border border-gray-800 rounded-lg bg-black bg-opacity-30 hover:bg-opacity-50 transition-all">
          <p className="text-green-400">Explore</p>
        </div>
      </div>
    </div>
  )
}
