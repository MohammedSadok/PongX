export function WelcomeSection() {
  return (
    <div className="text-center max-w-4xl mx-auto px-4 transition-all duration-500 transform">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to Prompting Game</h1>
      <p className="text-xl mb-8">Use the ball to navigate through the sections. Click and drag to control the ball!</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg hover:bg-opacity-70 transition-all duration-300">
          <div className="text-green-400 text-3xl mb-4">🎮</div>
          <h3 className="text-xl font-semibold mb-2">Interactive Physics</h3>
          <p className="text-gray-300">
            Experience realistic ball physics with momentum, collisions, and realistic bouncing effects.
          </p>
        </div>

        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg hover:bg-opacity-70 transition-all duration-300">
          <div className="text-green-400 text-3xl mb-4">🎨</div>
          <h3 className="text-xl font-semibold mb-2">Customizable Themes</h3>
          <p className="text-gray-300">Choose from multiple color themes to personalize your experience.</p>
        </div>

        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg hover:bg-opacity-70 transition-all duration-300">
          <div className="text-green-400 text-3xl mb-4">🚀</div>
          <h3 className="text-xl font-semibold mb-2">Smooth Navigation</h3>
          <p className="text-gray-300">Navigate between sections with fluid animations and transitions.</p>
        </div>
      </div>

      <div className="mt-12 p-6 bg-gray-800 bg-opacity-50 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">How to Play</h2>
        <ul className="text-left space-y-2">
          <li className="flex items-start">
            <span className="text-green-400 mr-2">•</span>
            <span>Click and drag the ball to control it directly</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-400 mr-2">•</span>
            <span>Hit the navigation items at the top to switch sections</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-400 mr-2">•</span>
            <span>Watch the ball bounce around and interact with the environment</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-400 mr-2">•</span>
            <span>Try different themes using the palette in the bottom right</span>
          </li>
        </ul>
      </div>

      <div className="animate-bounce mt-10">
        <p className="text-sm opacity-70">Hit the navbar with the ball to explore</p>
      </div>
    </div>
  )
}
