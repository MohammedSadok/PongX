"use client";
import profile from "@/public/profile.jpeg"; // Assuming you have this image
import {
  IconBrandAws,
  IconBrandDocker,
  IconBrandGit,
  IconBrandMysql,
  IconBrandNextjs,
  IconBrandReact,
  IconBrandTailwind,
  IconBrandTypescript,
} from "@tabler/icons-react";
import Image from "next/image";
import { FaJava, FaMobile } from "react-icons/fa";
import {
  SiExpo,
  SiJenkins,
  SiMongodb,
  SiPostgresql,
  SiRedux,
  SiSpringboot,
} from "react-icons/si";

const HomeSection: React.FC = () => {
  const size = 35;

  // Define skills with icons and colors
  const skills = [
    { icon: <FaJava size={size} />, name: "Java", color: "text-[#007396]" },
    {
      icon: <SiSpringboot size={size} />,
      name: "Spring Boot",
      color: "text-[#6DB33F]",
    },
    {
      icon: <IconBrandReact size={size} />,
      name: "React",
      color: "text-[#61DAFB]",
    },
    {
      icon: <IconBrandNextjs size={size} />,
      name: "Next.js",
      color: "text-primary-foreground",
    },
    { icon: <SiRedux size={size} />, name: "Redux", color: "text-[#764ABC]" },
    {
      icon: <IconBrandTypescript size={size} />,
      name: "TypeScript",
      color: "text-[#3178C6]",
    },
    {
      icon: <IconBrandTailwind size={size} />,
      name: "Tailwind CSS",
      color: "text-[#38BDF8]",
    },
    {
      icon: <FaMobile size={size} />,
      name: "React Native",
      color: "text-[#61DAFB]",
    },
    { icon: <SiExpo size={size} />, name: "Expo", color: "text-white" },
    {
      icon: <IconBrandDocker size={size} />,
      name: "Docker",
      color: "text-[#2496ED]",
    },
    {
      icon: <SiJenkins size={size} />,
      name: "Jenkins",
      color: "text-[#D33833]",
    },
    {
      icon: <IconBrandAws size={size} />,
      name: "AWS",
      color: "text-[#FF9900]",
    },
    { icon: <IconBrandGit size={size} />, name: "Git", color: "text-red-600" },
    {
      icon: <IconBrandMysql size={size} />,
      name: "MySQL",
      color: "text-[#00758F]",
    },
    {
      icon: <SiPostgresql size={size} />,
      name: "PostgreSQL",
      color: "text-[#336791]",
    },
    {
      icon: <SiMongodb size={size} />,
      name: "MongoDB",
      color: "text-[#4DB33D]",
    },
  ];

  return (
    <section id="home" className="container mx-auto py-16 px-4 md:px-8">
      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Profile Image */}
        <div className="w-48 h-48 md:w-64 md:h-64 relative rounded-full overflow-hidden shadow-lg border-4 border-primary">
          <Image
            src={profile}
            alt="Mohammed Sadok"
            layout="fill"
            objectFit="cover"
            priority // Load image faster
          />
        </div>

        {/* About Me Text */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hi, I'm Mohammed Sadok
          </h1>
          <h2 className="text-2xl text-green-400 mb-4">Software Engineer</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Passionate software engineer specializing in developing innovative
            solutions and solving complex problems. Proficient in Java,
            JavaScript, TypeScript, and DevOps tools like Docker, Jenkins, and
            AWS. Self-motivated, detail-oriented, and adaptable with strong
            teamwork abilities.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:mohammed.sadok.2003@gmail.com"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md transition-colors"
            >
              Contact Me
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0077B5] hover:bg-[#006699] text-white px-4 py-2 rounded-md transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-semibold text-center mb-8">My Skills</h2>
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center group transition-transform transform hover:scale-110"
            >
              <div
                className={`p-3 rounded-full bg-card border mb-2 ${skill.color}`}
              >
                {skill.icon}
              </div>
              <span className="text-sm text-muted-foreground group-hover:text-foreground">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
