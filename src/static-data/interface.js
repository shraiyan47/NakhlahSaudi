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
} from "lucide-react";

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
  Questions: [
    "MCQ",
    "Fill In The Blank",
    "True Or False",
    "Sentence Making",
    "Pair Matching",
  ],
  "Question Types": [],
  Contents: [
    "MCQ",
    "Fill In The Blank",
    "True Or False",
    "Sentence Making",
    "Pair Matching",
  ],
  "Content Types": [],

  "Content Data Types": [],
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
      ],
    },
    element: {
      title: "Element",
      list: [
        {
          id: 1,
          title: "Learning Journey",
          icon: <LineChart className="w-6 h-6 text-slate-600" />,
          link: "/admin/learning-journey",
        },
        {
          id: 2,
          title: "Learning Lessons",
          icon: <SiReacthookform className="w-6 h-6 text-slate-700" />,
          link: "/admin/learning-materials",
        },
        {
          id: 3,
          title: "Questionaires",
          icon: <ShieldQuestion className="w-6 h-6 text-slate-600" />,
          link: "/admin/questionaries",
        },
        {
          id: 4,
          title: "Customer",
          icon: <PersonStanding className="w-6 h-6 text-slate-600" />,
          link: "#",
          subLinks: null,
        },
      ],
    },
  },
};
