import type { MetaFunction } from "@remix-run/node";
import Container from "~/components/Container";
import { buildHeader } from "~/utils";


export const meta: MetaFunction = () => buildHeader({})

export default function Index() {
  return (
    <Container fluid className=" max-w-5xl w-full flex gap-2 h-full items-center justify-center mx-auto sm:items-start pt-28 sm:pt-28">
      <div className='w-[20px] rounded-sm flex-shrink-0 self-start md:mt-2.5 mt-0' style={{ background: 'linear-gradient(45deg, #BC00BC, #0381FF 60%)', height: 'calc(5.6rem + 0.4rem)' }}>
      </div>
      <div className='flex-1 h-full flex flex-col justify-center sm:block'>
        <div className='text-[5.6rem] font-bold mb-8 leading-[5.5rem] md:leading-[6.4rem] xl:leading-[7rem] font-sans'>Hi, my name is Brian</div>
        <div className="md:text-4xl text-3xl">I&apos;m a full stack developer with over 15 years experience building applications, managing infrastructure, and automating processes.</div>
      </div>
    </Container>
  );
}