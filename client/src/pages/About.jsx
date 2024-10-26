const About = () => {
  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 opacity-50"></div>

      <h1 className="text-4xl font-bold text-gray-800 mb-4 z-10 relative">
        About the Bhagavad Gita
      </h1>
      <p className="text-gray-700 mb-4 z-10 relative">
        The Bhagavad Gita, often referred to simply as the Gita, is a 700-verse
        Hindu scripture that is part of the Indian epic Mahabharata. It is
        written in the form of a dialogue between Prince Arjuna and the god
        Krishna, who serves as his charioteer. The Gita addresses the moral and
        philosophical dilemmas faced by Arjuna as he prepares to go into battle.
      </p>

      <h2 className="text-3xl font-semibold text-gray-800 mb-2 z-10 relative">
        Purpose of This Project
      </h2>
      <p className="text-gray-700 mb-4 z-10 relative">
        The RadhaKrishnaVaani project aims to make the teachings of the Bhagavad
        Gita more accessible to everyone. Through this platform, users can
        explore verses, watch spiritual videos, and interact with an AI-powered
        chatbot that provides insights based on the Gita's teachings.
      </p>

      <h2 className="text-3xl font-semibold text-gray-800 mb-2 z-10 relative">
        Features
      </h2>
      <ul className="list-disc list-inside text-gray-700 mb-4 z-10 relative">
        <li>Browse chapters and verses from the Bhagavad Gita</li>
        <li>
          Watch spiritual videos related to the teachings of Krishna and Radha
        </li>
        <li>
          Interact with an AI chatbot for personalized guidance and insights
        </li>
        <li>
          Explore a gallery of images depicting scenes from the Bhagavad Gita
        </li>
        <li>
          Stay updated with the latest content through our subscription form
        </li>
      </ul>

      <h2 className="text-3xl font-semibold text-gray-800 mb-2 z-10 relative">
        Join Us
      </h2>
      <p className="text-gray-700 z-10 relative">
        We invite you to explore the profound wisdom of the Bhagavad Gita and
        engage with our community. Your journey towards self-discovery and
        understanding begins here.
      </p>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export default About;
