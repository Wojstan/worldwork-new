const profileDescriptions = [
  'Full-stack engineer with expertise in building scalable web applications from front-end to back-end. Skilled in JavaScript, React, Node.js, and cloud services.',
  'Passionate full-stack engineer with a focus on creating seamless user experiences and efficient server-side solutions. Proficient in React, Express, and MongoDB.',
  'Experienced full-stack developer with a strong background in JavaScript, TypeScript, and cloud infrastructure. Focused on delivering high-quality, scalable software solutions.',
  'Full-stack engineer with hands-on experience in modern web technologies including JavaScript, React, and Node.js. Adept at designing responsive UIs and scalable APIs.',
  'Creative full-stack developer skilled in both front-end and back-end development. Specializes in building fast, responsive web applications using JavaScript, Angular, and Node.js.',
  'Results-driven full-stack engineer with a deep understanding of front-end frameworks and server-side architecture. Skilled in Vue.js, Node.js, and RESTful APIs.',
  'Full-stack software engineer with strong problem-solving skills. Expert in building intuitive UIs and powerful back-end services with React, GraphQL, and Node.js.',
  'Skilled full-stack developer with a passion for clean code and scalable systems. Proficient in JavaScript, Express, and cloud computing platforms like AWS.',
  'Full-stack engineer specializing in end-to-end web development with a focus on performance and scalability. Proficient in React, Node.js, and microservices architecture.',
  'Versatile full-stack engineer with extensive experience in building responsive web applications. Skilled in JavaScript, React, and backend technologies like Node.js and MongoDB.',
  'Innovative full-stack developer with expertise in creating dynamic and user-friendly web solutions. Skilled in JavaScript, React, Next.js, and serverless architecture.',
  'Full-stack engineer with a passion for building high-performance applications. Skilled in modern JavaScript, Node.js, Docker, and cloud-native development.',
]

const avatars = ['/doe.png', '/anna.png', '/lana.png', '/david.png']

export function getProfileDescription() {
  const rand = Math.floor(Math.random() * 12)

  return profileDescriptions[rand]
}

export function getAvatar() {
  const rand = Math.floor(Math.random() * 4)

  return avatars[rand]
}
