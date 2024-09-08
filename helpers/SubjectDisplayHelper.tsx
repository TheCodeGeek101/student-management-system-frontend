import { FaAtom, FaBook, FaFlask, FaGlobe, FaGraduationCap, FaHeart, FaLandmark, FaLanguage, FaMicroscope, FaSeedling } from "react-icons/fa";

export const getIcon = (subjectName: string) => {
  switch (subjectName.toLowerCase()) {
    case 'mathematics':
      return <FaBook className="text-yellow-500" />;
    case 'additional mathematics':
      return <FaBook className="text-yellow-600" />;
    case 'physics':
      return <FaAtom className="text-blue-500" />;
    case 'agriculture':
      return <FaSeedling className="text-green-500" />;
    case 'chemistry':
      return <FaFlask className="text-purple-500" />;
    case 'biology':
      return <FaMicroscope className="text-green-500" />;
    case 'geography':
      return <FaGlobe className="text-blue-500" />;
    case 'life skills':
      return <FaHeart className="text-red" />;
    case 'social studies':
      return <FaLandmark className="text-teal-500" />;
    case 'chichewa':
      return <FaLanguage className="text-orange-500" />;
    case 'english language':
      return <FaGraduationCap className="text-blue-500" />;
      case 'english literature':
      return <FaGraduationCap className="text-blue-500" />;
    case 'history':
      return <FaLandmark className="text-gray-500" />;
    case 'computer studies':
      return <FaAtom className="text-gray-500" />;
    case 'bible knowledge':
      return <FaBook className="text-red-500" />;
    default:
      return <FaBook className="text-green-500" />;
  }
};

export const getCardColor = (subjectName: string) => {
  switch (subjectName.toLowerCase()) {
    case 'mathematics':
      return 'bg-yellow-100';
    case 'additional mathematics':
      return 'bg-yellow-200';
    case 'physics':
      return 'bg-blue-200';
    case 'agriculture':
      return 'bg-green-100';
    case 'chemistry':
      return 'bg-purple-100';
    case 'biology':
      return 'bg-green-200';
    case 'geography':
      return 'bg-blue-200';
    case 'life skills':
      return 'bg-blue-200';
    case 'social studies':
      return 'bg-teal-100';
    case 'chichewa':
      return 'bg-orange-100';
    case 'chichewa literature':
      return 'bg-orange-200';
    case 'english language':
      return 'bg-blue-200';
    case 'english literature':
      return 'bg-blue-300';
    case 'history':
      return 'bg-orange-200';
    case 'computer studies':
      return 'bg-gray-100';
    case 'bible knowledge':
      return 'bg-red-100';
    default:
      return 'bg-gray-200';
  }
};

export const getTextColor = (subjectName: string) => {
  switch (subjectName.toLowerCase()) {
    case 'mathematics':
      return 'text-yellow-900';
    case 'additional mathematics':
      return 'text-yellow-800';
    case 'physics':
      return 'text-blue-900';
    case 'agriculture':
      return 'text-green-900';
    case 'chemistry':
      return 'text-purple-900';
    case 'biology':
      return 'text-green-800';
    case 'geography':
      return 'text-blue-800';
    case 'life skills':
      return 'text-primary';
    case 'social studies':
      return 'text-teal-900';
    case 'chichewa literature':
      return 'text-orange-800';
    case 'chichewa':
      return 'text-orange-800';
    case 'english literature':
      return 'text-blue-900';
      case 'english language':
      return 'text-blue-900';
    case 'history':
      return 'text-orange-900';
    case 'computer studies':
      return 'text-gray-900';
    case 'bible knowledge':
      return 'text-red-900';
    default:
      return 'text-gray-900';
  }
};

export const getButtonColor = (subjectName: string) => {
  switch (subjectName.toLowerCase()) {
    case 'mathematics':
      return 'bg-yellow-500';
    case 'additional mathematics':
      return 'bg-yellow-600';
    case 'physics':
      return 'bg-blue-500';
    case 'agriculture':
      return 'bg-green-500';
    case 'chemistry':
      return 'bg-purple-500';
    case 'biology':
      return 'bg-green-600';
    case 'geography':
      return 'bg-blue-600';
    case 'life skills':
      return 'bg-primary';
    case 'social studies':
      return 'bg-teal-500';
    case 'chichewa ':
      return 'bg-orange-300';
    case 'chichewa literature':
      return 'bg-orange-500';
    case 'english language':
      return 'bg-blue-700';
      case 'english literature':
      return 'bg-blue-700';
    case 'history':
      return 'bg-orange-500';
    case 'computer studies':
      return 'bg-gray-500';
    case 'bible knowledge':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

