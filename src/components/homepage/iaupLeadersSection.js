import Image from "next/image";

const leaders = [
  {
    name: "Dr. Shown Chen",
    role1: "Chairman,",
    role2: "Sias University (China)",
    position: "IAUP President",
    image: "/leader1.png"
  },
  {
    name: "Dr. Fernando Leon-Garcia",
    role1: "President,",
    role2: "CETYS University (Mexico)",
    position: "IAUP Chairman of the Board",
    image: "/iaup.jpg"
  },
  {
    name: "Dr. Tomas Morales",
    role1: "President,",
    role2: "California State University, San Bernardino (USA)",
    position: "President Elect 2024-2027",
    image: "/iauplogo.jpg"
  },
  {
    name: "Prof. Tatsuro Tanioka",
    role1: "Vice Chancellor",
    role2: "Tanioka Gakuen Education Foundation (Japan)",
    position: "IAUP Secretary-General",
    image: "/leader2.png"
  }
];

export default function IaupLeadersSection() {
  return (
    <section className="py-24 lg:py-32 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          {/* <span className="inline-block text-primary font-semibold tracking-wide uppercase text-sm mb-4">
            Leadership
          </span> */}
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-dark mb-6">
            IAUP <span className="gradient-text">Leadership</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 lg:gap-14">
          {leaders.map((leader, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center group reveal"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden mb-6 shadow-md border-4 border-white group-hover:shadow-xl transition-all duration-300">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                />
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{leader.name}</h3>
                <div className="text-sm md:text-base text-gray-600 mb-3 hover:text-gray-800 transition-colors">
                  <p>{leader.role1}</p>
                  <p className="font-medium">{leader.role2}</p>
                </div>
                <div className="text-blue-700 font-semibold tracking-wide text-sm md:text-base">
                  {leader.position}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
