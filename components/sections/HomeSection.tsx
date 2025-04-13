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
import { FaJava } from "react-icons/fa";
import { SiSpringboot } from "react-icons/si";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Assuming you use shadcn/ui Card

const HomeSection: React.FC = () => {
  const size = 35;

  // Define skills with icons and colors
  const skills = [
    { icon: <IconBrandGit size={size} />, name: "Git", color: "text-red-600" },
    { icon: <SiSpringboot size={size} />, name: "Spring Boot", color: "text-[#6DB33F]" },
    { icon: <FaJava size={size} />, name: "Java", color: "text-[#007396]" },
    { icon: <IconBrandNextjs size={size} />, name: "Next.js", color: "text-primary-foreground" }, // Adjusted color for visibility on card
    { icon: <IconBrandAws size={size} />, name: "AWS", color: "text-[#FF9900]" },
    { icon: <IconBrandDocker size={size} />, name: "Docker", color: "text-[#2496ED]" },
    { icon: <IconBrandReact size={size} />, name: "React", color: "text-[#61DAFB]" },
    { icon: <IconBrandTailwind size={size} />, name: "Tailwind CSS", color: "text-[#38BDF8]" },
    { icon: <IconBrandTypescript size={size} />, name: "TypeScript", color: "text-[#3178C6]" },
    { icon: <IconBrandMysql size={size} />, name: "MySQL", color: "text-[#00758F]" },
  ];

  return (
    <section id="home" className="container mx-auto py-16 px-4 md:px-8">
      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Profile Image */}
        <div className="w-48 h-48 md:w-64 md:h-64 relative rounded-full overflow-hidden shadow-lg border-4 border-primary">
          <Image
            src={profile}
            alt="Your Name" // Add your name here
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
          <p className="text-lg text-muted-foreground mb-6">
            {/* Add a brief description about yourself here */}
            A passionate developer specializing in building modern web applications. I enjoy creating efficient, scalable, and user-friendly solutions.
          </p>
          {/* Optional: Add a Call to Action button */}
          {/* <Button size="lg">Contact Me</Button> */}
        </div>
      </div>

      {/* Skills Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-semibold text-center mb-8">My Skills</h2>
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
          {skills.map((skill, index) => (
            <div key={index} className="flex flex-col items-center group transition-transform transform hover:scale-110">
              <div className={`p-3 rounded-full bg-card border mb-2 ${skill.color}`}>
                {skill.icon}
              </div>
              <span className="text-sm text-muted-foreground group-hover:text-foreground">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
