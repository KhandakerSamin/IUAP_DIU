import Image from "next/image";

const leaders = [
  {
    name: "Dr. Shawn Chen",
    role1: "Chairman,",
    role2: "Sias University (China)",
    position: "IAUP President",
    image: "/leader.jpg"
  },
  {
    name: "Prof. Tatsuro Tanioka",
    role1: "Vice Chancellor",
    role2: "Tanioka Gakuen Education Foundation (Japan)",
    position: "IAUP Secretary-General",
    image: "/leader.jpg"
  },
  {
    name: "Dr. Md. Sabur Khan",
    role1: "Founder and Chairman",
    role2: "Daffodil International University",
    position: "Treasurer Elect 2024-2027",
    image: "/leader.jpg"
  }
];

export default function IaupLeadersSection() {
  return (
    <section className="py-16 lg:py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            IAUP <span className="text-blue-700">Leaders</span>
          </h2>
          <div className="w-24 h-1 bg-blue-700 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
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
