import { ReactNode, useRef, useState } from "react";
import { motion } from "framer-motion";
type PostionType = {
  width: number;
  left: number;
  opacity: number;
};
const FollowCursorNavMenuBar = () => {
  const [position, setPosition] = useState<PostionType>({
    width: 120,
    left: 4,
    opacity: 0,
  });

  const tabs = ["pricing", "products", "features", "docs", "blog"];

  return (
    <ul className="border border-black rounded-full h-fit bg-white flex relative p-1 items-center mt-10">
      {tabs.map((tab) => (
        <Tab key={tab} setPosition={setPosition}>
          {tab}
        </Tab>
      ))}
      <Indicator pos={position} />
    </ul>
  );
};

type TabPropsType = {
  children: ReactNode;
  setPosition: React.Dispatch<React.SetStateAction<PostionType>>;
};
const Tab = ({ children, setPosition }: TabPropsType) => {
  const ref = useRef<HTMLLIElement | null>(null);
  const handleMouseEnter = () => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const { width } = rect;
    setPosition((prev) => ({
      ...prev,
      width,
      opacity: 1,
      left: ref.current?.offsetLeft!,
    }));
  };
  return (
    <li
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => {
        setPosition((prev) => ({ ...prev, opacity: 0 }));
      }}
      className="uppercase font-semibold p-4 px-7 text-white mix-blend-difference cursor-pointer z-10"
    >
      {children}
    </li>
  );
};

const Indicator = ({ pos }: { pos: PostionType }) => {
  return (
    <motion.li
      animate={pos}
      className={`absolute h-[90%] bg-black z-0 rounded-full top-[0.2rem]`}
    />
  );
};
export default FollowCursorNavMenuBar;
