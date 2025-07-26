import type { MetaFunction } from "@remix-run/node";
import { buildHeader } from "~/utils";
import { Link } from "@remix-run/react";
import StylizedList from "~/components/StylizedList";
import StylizedListItem from "~/components/StylizedListItem";
import me from "../images/me.jpg"
import mockup1 from "../images/mockups/iphone-mockup1.svg"
import mockup2 from "../images/mockups/iphone-mockup2.svg"
import mockup3 from "../images/mockups/iphone-mockup3.svg"
import ContentList from "~/components/ContentList";

export const meta: MetaFunction = () => buildHeader({})

export default function Index() {
  return (
    <div>
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col gap-3 max-w-3xl text-center">
          <img src={me} alt="Brian Morrison" className="w-32 h-32 rounded-full mx-auto" />
          <div className='text-5xl font-bold font-sans gradient-header'>My name is Brian</div>
          <div className="md:text-4xl text-3xl font-bold text-neutral-700">I&apos;m a full stack developer with 15+ years experience.</div>
          <Link to="/contact" className="flex justify-center gap-2 font-bold text-2xl underline">Let&apos;s talk</Link>
        </div>
      </div>

      <div className="min-h-screen">
        <div className="bg-gradient h-full md:m-8 md:rounded-lg p-8 mb-8">
          <div className="flex flex-col gap-2 text-center max-w-xl mx-auto">
            <div>Mobile App • 2025</div>
            <h2 className="!mt-2">WishPin</h2>
            <p className="!mb-0">WishPin is a web application that allows users to create and manage wish lists for their loved ones.</p>
            <div className="flex gap-2 items-center mb-2 flex-wrap justify-center">
              <StylizedListItem>React Native</StylizedListItem>
              <StylizedListItem>Docker</StylizedListItem>
              <StylizedListItem>Convex</StylizedListItem>
              <StylizedListItem>Clerk</StylizedListItem>
            </div>
            <div className="flex justify-center mb-2">
              <Link to="/portfolio" className="flex justify-center gap-2 font-bold">View Project</Link>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <img src={mockup1} alt="WishPin App - Lists Screen" className="h-80" />
              <img src={mockup2} alt="WishPin App - Items Screen" className="h-80" />
              <img src={mockup3} alt="WishPin App - Add Item Screen" className="h-80" />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="min-h-screen">
        <div className="h-full m-8 rounded-sm">
          This is where another thing will go
        </div>
      </div> */}

      <div>
        <ContentList />
      </div>
    </div>
  );
}