import { MdBook, MdMenuBook } from "react-icons/md";
import { RiSpeakFill } from "react-icons/ri";
import { FaEarListen } from "react-icons/fa6";
import { FiHome } from "react-icons/fi";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { SiReacthookform } from "react-icons/si";
import {
  ShieldQuestion,
  LineChart,
  User,
  BookUser,
  Users,
  PersonStanding,
  AreaChart,
  BadgeInfo,
  Cylinder,
  Settings
} from "lucide-react";

export const tabsGeneralSetup = {
  "Journey Pointer": [
    "MCQ",
    "Fill In The Blank",
    "True Or False",
    "Sentence Making",
    "Pair Matching",
  ],
  "Terms & Conditions" : [],
  "Privacy Policy" : [],
  "Learning Guide" : [],
  "Languages" : [],
 };
export const tabsGeneralSetup1 = [{
 "Journey Pointer": [],
 "Terms & Conditions" : [],
 "Privacy Policy" : [],
 "Learning Guide" : []
},
  {
    id: 1,
    title: "Journey Pointer",
    link: "",
  },
  {
    id: 2,
    title: "Terms & Conditions",
    link: "",
  },
  {
    id: 3,
    title: "Privacy Policy",
    link: "",
  },
  {
    id: 4,
    title: "Learning Guide",
    link: "",
  },
  {
    id: 5,
    title: "Learning Tips",
    link: "",
  },
  {
    id: 6,
    title: "Languages",
    link: "",
  },
];

export const tabsJourney = [
  {
    id: 1,
    title: "Learner Purposes",
    link: "/admin/learning-journey/purposes",
  },
  {
    id: 2,
    title: "Learner Levels",
    link: "/admin/learning-journey/goals",
  },
  {
    id: 3,
    title: "Learner Start Points",
    link: "/admin/learning-journey/start-points",
  },
  {
    id: 4,
    title: "Learner Goals",
    link: "/admin/learning-journey/levels",
  },
];

export const tabsLesson = [
 
  {
    id: 1,
    title: "Learning Journies",
    link: "/admin/learning-materials/levels",
  },
  {
    id: 2,
    title: "Learning Units",
    link: "/admin/learning-materials/tasks",
  },
  {
    id: 3,
    title: "Learning Levels",
    link: "/admin/learning-materials/task-units",
  },
  {
    id: 4,
    title: "Learning Lessons",
    link: "/admin/learning-materials/unit-lessons",
  },
];

export const tabsQuestionaries = {
  "Questions Mapping": [
    "MCQ",
    "Fill In The Blank",
    "True Or False",
    "Sentence Making",
    "Pair Matching",
  ],

  // "Question Content Types": [],

  "Questions":[], // Question Title
  "Questions Content":[], // Question Content

  "Question Types": [],
  
  // Contents: [
   
  //   "MCQ",
  //   "Fill In The Blank",
  //   "True Or False",
  //   "Sentence Making",
  //   "Pair Matching",
  // ],
  // // "Content Types": [],
  // "Content Data Types": [],

  // "Content Details": [],
  // "Languages" : [],
  // "Content Details by Languages" : [],

};


export const tabsContents = {
 
  "Contents": [
      
    "MCQ",
    "Fill In The Blank",
    "True Or False",
    "Sentence Making",
    "Pair Matching",
  ],
   "Content Types": [],
  "Categories": [],

  "Details": [],
  // "Languages" : [],
  "Cont. Details by Languages" : [],
  "Details of Cont. Det. by Languages" : [], 
  "Syllables" : [], 
  "Clauses": [],

};
export const adminDashboard = {
  leftNavList: {
    main: {
      title: "Main",
      list: [
        {
          id: 1,
          title: "Dashboard",
          icon: <AreaChart className="w-6 h-6 text-slate-700" />,
          link: "/admin",
          subLinks: null,
        },
        {
          id: 2,
          title: "User",
          icon: <User className="w-6 h-6 text-slate-700" />,
          link: "#",
          subLinks: [
            {
              id: 1,
              title: "User Group",
              icon: <Users className="w-5 h-5 text-slate-700" />,
              link: "#",
              subLinks: null,
            },
            {
              id: 2,
              title: "User List",
              icon: <BookUser className="w-5 h-5 text-slate-700" />,
              link: "#",
              subLinks: null,
            },
          ],
        },

        {
          id: 3,
          title: "General SetUp",
          icon:  <Settings className="w-6 h-6 text-slate-700" />,
          link: "#",
          subLinks: [
            {
              id: 1,
              title: "Languages",
              icon: <BadgeInfo className="w-6 h-6 text-slate-600" />,
              link: "/admin/general-setup/languages",
              // link : "#",
              subLinks: null,
            },
          ]
          // subLinks: [
           
          //   {
          //     id: 1,
          //     title: "Journey Pointer",
          //     icon: <Users className="w-5 h-5 text-slate-700" />,
          //     link: "/admin/general-setup/journey-pointer",
          //     subLinks: null,
          //   },
          //   {
          //     id: 2,
          //     title: "Terms & Conditions",
          //     icon: <Users className="w-5 h-5 text-slate-700" />,
          //     link: "/admin/general-setup/Terms-&-Conditions",
          //     subLinks: null,
          //   },
          //   {
          //     id: 3,
          //     title: "Privacy Policy",
          //     icon: <Users className="w-5 h-5 text-slate-700" />,
          //     link: "/admin/general-setup/Privacy-Policy",
          //     subLinks: null,
          //   },
          //   {
          //     id: 4,
          //     title: "Learning Guide",
          //     icon: <Users className="w-5 h-5 text-slate-700" />,
          //     link: "/admin/general-setup/Learning-Guide",
          //     subLinks: null,
          //   },
          //   {
          //     id: 5,
          //     title: "Leaning Tips",
          //     icon: <Users className="w-5 h-5 text-slate-700" />,
          //     link: "/admin/general-setup/Leaning-Tips",
          //     subLinks: null,
          //   },
          //   {
          //     id: 6,
          //     title: "Language",
          //     icon: <BookUser className="w-5 h-5 text-slate-700" />,
          //     link: "/admin/general-setup/language",
          //     subLinks: null,
          //   },
          // ],
        },
      ],
    },
    element: {
      title: "Element",
      list: [
        {
          id: 1,
          title: "Learner Info",
          icon: <LineChart className="w-6 h-6 text-slate-600" />,
          link: "/admin/learning-journey",
        },
        {
          id: 2,
          title: "Learning Journey",
          icon: <SiReacthookform className="w-6 h-6 text-slate-700" />,
          link: "/admin/learning-materials",
        },
        {
          id: 3,
          title: "Questionaires",
          icon: <ShieldQuestion className="w-6 h-6 text-slate-600" />,
          link: "#",
          subLinks: [
            {
              id: 1,
              title: "Questions",
              icon: <BadgeInfo className="w-6 h-6 text-slate-600" />,
               link: "/admin/questionaries",
             
              subLinks: null,
            },
            {
              id: 2,
              title: "Contents",
              icon: <Cylinder className="w-6 h-6 text-slate-600" />,
           link: "/admin/contents",
        
              subLinks: null,
            },
          ]
        },
        // {
        //   id: 4,
        //   title: "Contents",
        //   icon: <ShieldQuestion className="w-6 h-6 text-slate-600" />,
        //   link: "/admin/contents",
        // },
        // {
        //   id: 4,
        //   title: "Customer",
        //   icon: <PersonStanding className="w-6 h-6 text-slate-600" />,
        //   link: "#",
        //   subLinks: null,
        // },
      ],
    },
  },
};
