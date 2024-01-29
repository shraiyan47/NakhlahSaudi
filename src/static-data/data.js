import { MdBook, MdMenuBook } from "react-icons/md";
import { RiSpeakFill } from "react-icons/ri";
import { FaEarListen } from "react-icons/fa6";
import { FiHome } from "react-icons/fi";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { SiReacthookform } from "react-icons/si";
import {
  Bangladesh,
  Business,
  Culture,
  Man1,
  Man2,
  Man3,
  Minutes10,
  Minutes20,
  Minutes30,
  Minutes45,
  Travel,
  USA,
  Worker,
  SAU,
  ApplePay,
  Bkash,
  Nogod,
  Rocket,
  Crown,
  Tree,
  Cartoon,
  Bike,
  Car,
  Book,
} from "../lib/ImageLocation";

// get start page data
export const getStartQuestion = [
  {
    id: 1,
    question: "How is yor current capacity?",
    imgs: [Man3, Man1, Man2],
    options: ["No Knowledge", "Know the Basic", "Know Intermediate"],
  },
  {
    id: 2,
    question: "What is your learning object?",
    imgs: [Travel, Worker, Business, Culture],
    options: ["Travel", "Worker", "Business", "Culture"],
  },
  {
    id: 3,
    question: "What is your Learning Goal?",
    imgs: [Minutes10, Minutes20, Minutes30, Minutes45],
    options: ["10 Minutes", "15 Minutes", "20 Minutes", "25 Minutes"],
  },
  {
    id: 4,
    question: "What is your Flag?",
    imgs: [USA, Bangladesh],
    options: ["English", "বাংলা"],
  },
];

// user data
export const userDashboard = {
  home: {
    user: {
      flag: SAU,
      title: "Arabic Language",
      stage: "Beginner",
      point: "600",
      completed: 60,
      subTitle: "bronze",
    },
    listOfItems: [
      {
        id: 1,
        title: "Grammer",
        completed: 40,
        icon: <MdBook />,
      },
      {
        id: 2,
        title: "Speaking",
        completed: 60,
        icon: <RiSpeakFill />,
      },
      {
        id: 3,
        title: "Reading",
        completed: 80,
        icon: <MdMenuBook />,
      },
      {
        id: 4,
        title: "Lisening",
        completed: 50,
        icon: <FaEarListen />,
      },
    ],
  },
  leaderBoardList: {
    bronze: [
      {
        id: 1,
        name: "Hasan Khan",
        username: "hasankhanbd",
        point: 1000,
      },
      {
        id: 2,
        name: "Rasid Khan",
        username: "rasidkhanbd",
        point: 950,
      },
      {
        id: 3,
        name: "Miraz Khan",
        username: "mirazkhanbd",
        point: 800,
      },
      {
        id: 4,
        name: "Faisal Hasan",
        username: "faisalhasanbd",
        point: 1000,
      },
    ],
    silver: [
      {
        id: 1,
        name: "Hasan Khan",
        username: "hasankhanbd",
        point: 1900,
      },
      {
        id: 2,
        name: "Rasid Khan",
        username: "rasidkhanbd",
        point: 1850,
      },
      {
        id: 3,
        name: "Miraz Khan",
        username: "mirazkhanbd",
        point: 1800,
      },
      {
        id: 4,
        name: "Faisal Hasan",
        username: "faisalhasanbd",
        point: 1500,
      },
    ],
    titanium: [
      {
        id: 1,
        name: "Hasan Khan",
        username: "hasankhanbd",
        point: 2800,
      },
      {
        id: 2,
        name: "Rasid Khan",
        username: "rasidkhanbd",
        point: 2500,
      },
      {
        id: 3,
        name: "Miraz Khan",
        username: "mirazkhanbd",
        point: 2300,
      },
      {
        id: 4,
        name: "Faisal Hasan",
        username: "faisalhasanbd",
        point: 2200,
      },
    ],
    gold: [
      {
        id: 1,
        name: "Hasan Khan",
        username: "hasankhanbd",
        point: 1000,
      },
      {
        id: 2,
        name: "Rasid Khan",
        username: "rasidkhanbd",
        point: 950,
      },
      {
        id: 3,
        name: "Miraz Khan",
        username: "mirazkhanbd",
        point: 800,
      },
      {
        id: 4,
        name: "Faisal Hasan",
        username: "faisalhasanbd",
        point: 1000,
      },
    ],
    platinum: [
      {
        id: 1,
        name: "Hasan Khan",
        username: "hasankhanbd",
        point: 1000,
      },
      {
        id: 2,
        name: "Rasid Khan",
        username: "rasidkhanbd",
        point: 950,
      },
      {
        id: 3,
        name: "Miraz Khan",
        username: "mirazkhanbd",
        point: 800,
      },
      {
        id: 4,
        name: "Faisal Hasan",
        username: "faisalhasanbd",
        point: 1000,
      },
    ],
    diamond: [
      {
        id: 1,
        name: "Hasan Khan",
        username: "hasankhanbd",
        point: 5980,
      },
      {
        id: 2,
        name: "Rasid Khan",
        username: "rasidkhanbd",
        point: 5950,
      },
      {
        id: 3,
        name: "Miraz Khan",
        username: "mirazkhanbd",
        point: 5800,
      },
      {
        id: 4,
        name: "Faisal Hasan",
        username: "faisalhasanbd",
        point: 5300,
      },
    ],
  },
  myPlan: [
    {
      id: 1,
      header: {
        title: null,
        description: null,
      },
      title: "Free Plan",
      lists: [
        "Unlimited Palm Tree",
        "24/7 Support",
        "High Time Learning",
        "Best Learning Experience",
        "Ad Free Service",
        "Mistakes Reviews",
      ],
      service: false,
    },
    {
      id: 2,
      header: {
        title: "Choose Plan",
        description:
          "Flexible plans and pricing allows you to easily learn and practice more and more.",
      },
      title: "Premium Plan",
      lists: [
        "Unlimited Palm Tree",
        "24/7 Support",
        "High Time Learning",
        "Best Learning Experience",
        "Ad Free Service",
        "Mistakes Reviews",
      ],
      service: true,
      subTitle: "Choose your plan",
      plans: [
        {
          id: 1,
          title: "Monthly",
          cost: "$5",
          time: "",
        },
        {
          id: 2,
          title: "yearly",
          cost: "$50",
          time: "12",
        },
      ],
    },
    {
      id: 3,
      header: {
        title: "Payment",
        description: "Select the payment method you want to use",
      },
      pay: ["apple pay", "ssl pay"],
      listOfOption: [
        {
          id: 1,
          img: [ApplePay],
        },
        {
          id: 2,
          img: [Bkash, Nogod, Rocket],
        },
      ],
    },
    {
      id: 4,
      header: {
        title: "Review Summery",
        description: "",
      },
      img: Crown,
      title: "$5",
      subTitle: "/ month",
      lists: [
        "Unlimited Palm Tree",
        "24/7 Support",
        "High Time Learning",
        "Best Learning Experience",
        "Ad Free Service",
        "Mistakes Reviews",
      ],
      service: true,
      paymentList: [
        {
          id: 1,
          title: "Amount",
          value: "$5,00",
        },
        {
          id: 2,
          title: "Tax",
          value: "$1,00",
        },
        {
          id: 3,
          title: "Total",
          value: "$6,00",
        },
      ],
    },
    {
      id: 5,
      header: {
        title: null,
        description: null,
      },
      title: "Congratulations",
      img: Crown,
      subTitle:
        "You have Successfully subscribe 1 month premium plan. Now you can enjoy all the benefits",
    },
    {
      id: 6,
      header: {
        title: null,
        description: null,
      },
      title: "Premium Plan",
      lists: [
        "Unlimited Palm Tree",
        "24/7 Support",
        "High Time Learning",
        "Best Learning Experience",
        "Ad Free Service",
        "Mistakes Reviews",
      ],
      service: true,
      dateList: [
        {
          id: 1,
          title: "Start Date",
          date: "30/10/2023",
        },
        {
          id: 2,
          title: "Expire Date",
          date: "30/11/2023",
        },
      ],
    },
  ],
};

export const gamificationData = [
  {
    id: 1,
    questions: "What is the correct sentance?",
    given: "I am a boy",
    givenImg: Cartoon,
    givenType: "sentence",
    option: ["أنا صبي", "انا فتاة", "انا رجل"],
    ans: ["I am a boy", "أنا صبي"],
  },
  {
    id: 2,
    questions: "What is the correct word?",
    given: "شجرة",
    givenType: "word",
    option: [Bike, Car, Book, Tree],
    optionType: "img",
    optionName: ["bike", "car", "book", "tree"],
    ans: ["شجرة", "tree"],
  },
  {
    id: 3,
    questions: "What is the correct word?",
    given: "Tree",
    givenImg: Tree,
    givenType: "img",
    option: ["شجرة", "كرة", "حافلة", "بيت"],
    optionType: "word",
    ans: ["Tree", "شجرة"],
  },
  {
    id: 4,
    questions: "What is the correct word?",
    given: "Tree",
    givenImg: "",
    givenType: "word",
    option: ["شجرة", "كرة", "حافلة", "بيت"],
    optionType: "word",
    ans: ["Tree", "شجرة"],
  },
];

// static-data-masum

export const staticQueType = [
  {
    id: 1,
    title: "MCQ",
  },
  {
    id: 2,
    title: "Fill in the blank",
  },
  {
    id: 3,
    title: "Adshort questionvance",
  },
  {
    id: 4,
    title: "True 0r False",
  },
];
export const staticConType = [
  {
    id: 1,
    title: "Sound",
  },
  {
    id: 2,
    title: "Audio",
  },
  {
    id: 3,
    title: "Word",
  },
];
export const staticConTypeCategory = [
  {
    id: 1,
    title: "Image",
  },
  {
    id: 2,
    title: "Audio",
  },
  {
    id: 3,
    title: "Text",
  },
];

export const staticJourneyData = [
  {
    id: 1,
    title: "Basic",
  },
  {
    id: 2,
    title: "Intermediate",
  },
  {
    id: 3,
    title: "Advance",
  },
];
export const staticUnitData = [
  {
    id: 1,
    title: "unit-1",
    journey: {
      id: 1,
      title: "Basic",
    },
  },

  {
    id: 2,
    title: "unit-2",
    journey: {
      id: 2,
      title: "Intermediate",
    },
  },
  {
    id: 3,
    title: "unit-3",
    journey: {
      id: 3,
      title: "Advance",
    },
  },
  {
    id: 4,
    title: "unit-4",
    journey: {
      id: 2,
      title: "Intermediate",
    },
  },
];
export const staticLevelData = [
  {
    id: 1,
    title: "Level-1",
    unit: {
      id: 4,
      title: "unit-4",
      journey: {
        id: 2,
        title: "Intermediate",
      },
    },
  },
  {
    id: 2,
    title: "Level-2",
    unit: {
      id: 3,
      title: "unit-3",
      journey: {
        id: 3,
        title: "Advance",
      },
    },
  },
  {
    id: 3,
    title: "Level-3",
    unit: {
      id: 2,
      title: "unit-2",
      journey: {
        id: 2,
        title: "Intermediate",
      },
    },
  },
  {
    id: 4,
    title: "Level-4",
    unit: {
      id: 1,
      title: "unit-1",
      journey: {
        id: 1,
        title: "Basic",
      },
    },
  },
];
export const staticLessonData = [
  {
    id: 1,
    title: "lesson-1",
    level: {
      id: 4,
      title: "Level-4",
      unit: {
        id: 1,
        title: "unit-1",
        journey: {
          id: 1,
          title: "Basic",
        },
      },
    },
  },
  {
    id: 2,
    title: "lesson-2",
    level: {
      id: 2,
      title: "Level-2",
      unit: {
        id: 3,
        title: "unit-3",
        journey: {
          id: 3,
          title: "Advance",
        },
      },
    },
  },
  {
    id: 3,
    title: "lesson-3",
    level: {
      id: 2,
      title: "Level-2",
      unit: {
        id: 3,
        title: "unit-3",
        journey: {
          id: 3,
          title: "Advance",
        },
      },
    },
  },
  {
    id: 4,
    title: "lesson-4",
    level: {
      id: 1,
      title: "Level-1",
      unit: {
        id: 4,
        title: "unit-4",
        journey: {
          id: 2,
          title: "Intermediate",
        },
      },
    },
  },
];
export const staticTaskUnit = [
  {
    id: 1,
    goal: "task-unit-1",
    time: 5,
  },
  {
    id: 2,
    goal: "text2",
    time: 10,
  },
  {
    id: 3,
    goal: "text3",
    time: 15,
  },
  {
    id: 4,
    goal: "text4",
    time: 20,
  },
  {
    id: 5,
    goal: "text5",
    time: 25,
  },
];

export const purposeData = [
  {
    id: 1,
    purpose: "text1",
    formats: Minutes10,
  },
  {
    id: 2,
    purpose: "text2",
    formats: Minutes10,
  },
  {
    id: 3,
    purpose: "text3",
    formats: Minutes10,
  },
  {
    id: 4,
    purpose: "text4",
    formats: Minutes10,
  },
  {
    id: 5,
    purpose: "text5",
    formats: Minutes10,
  },
];
//level data
export const levelData = [
  {
    id: 1,
    level: "text1",
    formats: Minutes10,
  },
  {
    id: 2,
    level: "text2",
    formats: Minutes10,
  },
  {
    id: 3,
    level: "text3",
    formats: Minutes10,
  },
  {
    id: 4,
    level: "text4",
    formats: Minutes10,
  },
  {
    id: 5,
    level: "text5",
    formats: Minutes10,
  },
];
export const startingPointData = [
  {
    id: 1,
    title: "text1",
    subtitle: "sub 1",
    formats: Minutes10,
  },
  {
    id: 2,
    title: "text2",
    subtitle: "sub 1",
    formats: Minutes10,
  },
  {
    id: 3,
    title: "text3",
    subtitle: "sub 1",
    formats: Minutes10,
  },
  {
    id: 4,
    title: "text4",
    subtitle: "sub 1",
    formats: Minutes10,
  },
  {
    id: 5,
    title: "text5",
    subtitle: "sub 1",
    formats: Minutes10,
  },
];

export const goalData = [
  {
    id: 1,
    goal: "text1",
    time: 5,
  },
  {
    id: 2,
    goal: "text2",
    time: 10,
  },
  {
    id: 3,
    goal: "text3",
    time: 15,
  },
  {
    id: 4,
    goal: "text4",
    time: 20,
  },
  {
    id: 5,
    goal: "text5",
    time: 25,
  },
];
