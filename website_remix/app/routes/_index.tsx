import type { MetaFunction } from "@remix-run/node";
import Container from "~/components/Container";
import { buildHeader } from "~/utils";


export const meta: MetaFunction = () => buildHeader()

export default function Index() {
  return (
    <Container className="home-container w-full flex flex-col">
      <div className='text-[5.8rem] font-bold mb-4 leading-[5.5rem] md:leading-[6.4rem] xl:leading-[7rem] mt-8 sm:mt-28 gradient-header'>Hi, my name is Brian</div>
      <div className="text-4xl">I'm a full stack developer & developer educator.</div>
    </Container>
  );
}