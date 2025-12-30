import { createFileRoute } from '@tanstack/react-router'
import Page from '../components/page';
import Collage from '../components/collage';
import { CaptionedImage } from '../components/image';
import campaign_master1 from '../assets/images/software/campaign_master1.png';
import campaign_master2 from '../assets/images/software/campaign_master2.png';
import habitica_resync1 from '../assets/images/software/habitica_resync1.png';

export const Route = createFileRoute('/software')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Page>
        <div className='text-center pl-12 pr-12'>
            <h1 className="text-3xl font-bold mb-4">Software</h1>
            <div>
                <p className="2xl:pl-100 2xl:pr-100 xl:pl-50 xl:pr-50 sm:pl-0 sm:pr-0">I am always actively developing new software projects and improving my coding skills.</p>
            </div>
            <div className='mb-8'>
                <p className="2xl:pl-100 2xl:pr-100 xl:pl-50 xl:pr-50 sm:pl-0 sm:pr-0">Most recently, I have been working on three personal projects that I am excited to share.</p>
            </div>
            <div>
              <h1 className='text-4xl font-extrabold'>1. Campaign Master</h1>
              <p className='text-sm font-semibold mb-2'>Technologies used: <a href='https://reactjs.org/'>React</a>, <a href='https://www.typescriptlang.org/'>TypeScript</a>, <a href='https://tanstack.com/'>Tanstack</a>, <a href='https://tailwindcss.com/'>Tailwind CSS</a>, <a href='https://www.python.org/'>Python</a>, <a href='https://fastapi.tiangolo.com/'>FastAPI</a>, and <a href='https://pydantic.dev/'>Pydantic</a>.</p>
              <div className='mt-4'>
                  <p className="2xl:pl-100 2xl:pr-100 xl:pl-50 xl:pr-50 sm:pl-0 sm:pr-0">Campaign Master is a web application designed to help Dungeon Masters manage their Dungeons & Dragons campaigns more effectively.</p>
                  <p className="2xl:pl-100 2xl:pr-100 xl:pl-50 xl:pr-50 sm:pl-0 sm:pr-0">It offers tools for tracking player stats, managing encounters, and organizing campaign notes all in one place.</p>
                  <p className="2xl:pl-100 2xl:pr-100 xl:pl-50 xl:pr-50 sm:pl-0 sm:pr-0">Crucially, I plan to make it MCP-compliant.</p>
              </div>
              <Collage imgs={[campaign_master1, campaign_master2]} />
            </div>
            <div className='mt-8'>
              <h1 className='text-4xl font-extrabold'>
                2. Habitica-Resync (Obsidian Plugin)
              </h1>
              <p className='text-sm font-semibold mb-2'>
                Technologies used: <a href="https://reactjs.org/">React</a>, <a href="https://www.typescriptlang.org/">TypeScript</a>, <a href="https://obsidian.md/plugins">Obsidian Plugins Lib</a>
              </p>
              <div className='mt-4'>
                  <p className="2xl:pl-100 2xl:pr-100 xl:pl-50 xl:pr-50 sm:pl-0 sm:pr-0">
                    Habitica-Resync is an Obsidian plugin that syncs tasks between Obsidian and Habitica.
                  </p>
                  <p className="2xl:pl-100 2xl:pr-100 xl:pl-50 xl:pr-50 sm:pl-0 sm:pr-0">
                    It is the spiritual successor (not a direct fork) to the original Habitica plugin for Obsidian (<a href="https://github.com/SuperChamp234/habitica-sync">Habitica-Sync</a> by <a href="https://github.com/SuperChamp234">Superchamp234</a>), but built from the ground up with improved functionality and reliability, and notably has direct integration with the text files in Obsidian rather than relying soley on a separate view for plugins.
                  </p>
                  <p className="2xl:pl-100 2xl:pr-100 xl:pl-50 xl:pr-50 sm:pl-0 sm:pr-0">
                    This plugin allows users to manage their tasks in Obsidian while keeping them synchronized with their Habitica account, combining the benefits of both platforms for enhanced productivity and gamification.
                  </p>
              </div>
              <Collage imgs={[habitica_resync1]} />
            </div>
        </div>
    </Page>
  )
}
