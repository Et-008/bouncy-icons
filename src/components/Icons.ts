import { Youtube, YoutubeCode } from "./youtube";

interface Icon {
  name: string;
  component: React.ComponentType<any>;
  code: string;
}

const Icons: Icon[] = [
  {
    name: "Youtube",
    component: Youtube,
    code: YoutubeCode,
  },
];

export default Icons;
