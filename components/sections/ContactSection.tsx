export function ContactSection() {
  return (
    <div className="text-center max-w-5xl mx-auto px-4 transition-all duration-500 transform">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact</h1>
      <p className="text-xl mb-8">Get in touch with us for collaborations, questions, or just to say hello!</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="bg-gray-800 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-left">Send a Message</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-left">
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="bg-gray-700 text-white w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div className="text-left">
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-700 text-white w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
            </div>

            <div className="text-left">
              <label htmlFor="subject" className="block text-sm font-medium mb-1">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                placeholder="Message subject"
                className="bg-gray-700 text-white w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div className="text-left">
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message
              </label>
              <textarea
                id="message"
                placeholder="Your message"
                rows={5}
                className="bg-gray-700 text-white w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              ></textarea>
            </div>

            <button className="bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-6 rounded-md transition-colors duration-300 w-full md:w-auto">
              Send Message
            </button>
          </form>
        </div>

        <div className="bg-gray-800 p-8 rounded-lg text-left">
          <h2 className="text-2xl font-bold mb-6">Connect With Us</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Our Location</h3>
              <p className="text-gray-400">
                123 Innovation Street
                <br />
                Tech District
                <br />
                San Francisco, CA 94107
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Email Us</h3>
              <p className="text-gray-400">
                info@promptinggame.com
                <br />
                support@promptinggame.com
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Call Us</h3>
              <p className="text-gray-400">
                +1 (555) 123-4567
                <br />
                Mon-Fri, 9am-5pm PST
              </p>
            </div>

            <div className="mt-8 p-4 bg-gray-700 rounded-lg border-l-4 border-green-400">
              <h3 className="text-lg font-semibold mb-2 text-green-400">Quick Contact</h3>
              <div className="flex flex-col space-y-3">
                <a
                  href="tel:+15551234567"
                  className="flex items-center text-white hover:text-green-400 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  +1 (555) 123-4567
                </a>
                <a
                  href="mailto:contact@promptinggame.com"
                  className="flex items-center text-white hover:text-green-400 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  contact@promptinggame.com
                </a>
                <a href="#" className="flex items-center text-white hover:text-green-400 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                  </svg>
                  Live Chat
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
              <div className="flex space-x-4">
                {["Twitter", "GitHub", "LinkedIn", "Instagram"].map((platform, index) => (
                  <a
                    key={index}
                    href="#"
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
