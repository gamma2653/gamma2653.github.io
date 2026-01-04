import { createFileRoute } from '@tanstack/react-router'
import Page from '../components/page';
import Collage from '../components/collage';
// import { CaptionedImage } from '../components/image';
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
              <a href="https://github.com/gamma2653/CampaignMaster" className="no-underline"><h1 className='text-2xl font-extrabold'>
                1. Campaign Master (AI-enabled TTRPG planner)
              </h1></a>
              <p className='text-sm font-semibold mb-2'>Technologies used: <a href='https://reactjs.org/'>React</a>, <a href='https://www.typescriptlang.org/'>TypeScript</a>, <a href='https://tanstack.com/'>Tanstack</a>, <a href='https://tailwindcss.com/'>Tailwind CSS</a>, <a href='https://www.python.org/'>Python</a>, <a href='https://fastapi.tiangolo.com/'>FastAPI</a>, and <a href='https://pydantic.dev/'>Pydantic</a>.</p>
              <div className='mt-4'>
                  <p className="2xl:pl-100 2xl:pr-100 xl:pl-50 xl:pr-50 sm:pl-0 sm:pr-0">
                    Campaign Master is a web application designed to help Dungeon Masters manage their Dungeons & Dragons campaigns more effectively.
                  </p>
                  <p className="2xl:pl-100 2xl:pr-100 xl:pl-50 xl:pr-50 sm:pl-0 sm:pr-0">
                    It offers tools for tracking player stats, managing encounters, and organizing campaign notes all in one place.
                  </p>
                  <p className="2xl:pl-100 2xl:pr-100 xl:pl-50 xl:pr-50 sm:pl-0 sm:pr-0">
                    Crucially, I plan to make it MCP-compliant.
                  </p>
              </div>
              <Collage imgs={[campaign_master1, campaign_master2]} />
            </div>
            <div className='mt-8'>
              <a href="https://github.com/gamma2653/habitica-resync" className="no-underline"><h1 className='text-2xl font-extrabold'>
                2. Habitica-Resync (Obsidian Plugin)
              </h1></a>
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
            
            <div className='mt-8'>
              <a href="https://github.com/gamma2653/magiteknician" className="no-underline"><h1 className='text-2xl font-extrabold'>
                3. Magiteknician (Godot game)
              </h1></a>
              <p className='text-sm font-semibold mb-2'>
                Technologies used: <a href="https://godotengine.org/">Godot Engine</a>, <a href="https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/index.html">GDScript</a>
              </p>
              <div className='mt-4'>
                  <p className="2xl:pl-100 2xl:pr-100 xl:pl-50 xl:pr-50 sm:pl-0 sm:pr-0">
                    Magiteknician is a rhythm game built with the Godot Engine, inspired by osu!
                  </p>
                  <p className="2xl:pl-100 2xl:pr-100 xl:pl-50 xl:pr-50 sm:pl-0 sm:pr-0">
                    This community-driven project implements engaging rhythm game mechanics using Godot's native GDScript language, combining music, timing, and interactive gameplay.
                  </p>
                  <p className="2xl:pl-100 2xl:pr-100 xl:pl-50 xl:pr-50 sm:pl-0 sm:pr-0">
                    The project demonstrates game development skills and showcases the capabilities of the Godot Engine for creating interactive entertainment experiences.
                  </p>
              </div>
            </div>

            <div className='mt-8'>
              <a href="https://github.com/gamma2653/StoryBoardWorkshop" className="no-underline"><h1 className='text-2xl font-extrabold'>
                4. StoryBoardWorkshop
              </h1></a>
              <p className='text-sm font-semibold mb-2'>
                Technologies used: <a href="https://www.java.com/">Java</a>, <a href="https://www.eclipse.org/">Eclipse IDE</a>
              </p>
              <div className='mt-4'>
                  <p className="2xl:pl-100 2xl:pr-100 xl:pl-50 xl:pr-50 sm:pl-0 sm:pr-0">
                    StoryBoardWorkshop is a Java-based application developed for creative storytelling and storyboard planning.
                  </p>
                  <p className="2xl:pl-100 2xl:pr-100 xl:pl-50 xl:pr-50 sm:pl-0 sm:pr-0">
                    This project showcases object-oriented programming principles and GUI development in Java, providing tools for organizing and visualizing narrative structures.
                  </p>
              </div>
            </div>

            <div className='mt-8'>
              <a href="https://github.com/gamma2653/BlockHider" className="no-underline"><h1 className='text-2xl font-extrabold'>
                5. BlockHider (Minecraft Plugin)
              </h1></a>
              <p className='text-sm font-semibold mb-2'>
                Technologies used: <a href="https://www.java.com/">Java</a>, <a href="https://www.spigotmc.org/">Spigot/Bukkit API</a>, <a href="https://maven.apache.org/">Maven</a>
              </p>
              <div className='mt-4'>
                  <p className="2xl:pl-100 2xl:pr-100 xl:pl-50 xl:pr-50 sm:pl-0 sm:pr-0">
                    BlockHider is a Minecraft server plugin that implements a hide-and-seek gameplay mode.
                  </p>
                  <p className="2xl:pl-100 2xl:pr-100 xl:pl-50 xl:pr-50 sm:pl-0 sm:pr-0">
                    Built using the Spigot/Bukkit API, this plugin demonstrates plugin architecture design, event handling, and game mechanics implementation within the Minecraft ecosystem.
                  </p>
                  <p className="2xl:pl-100 2xl:pr-100 xl:pl-50 xl:pr-50 sm:pl-0 sm:pr-0">
                    The project showcases the ability to extend existing platforms with custom functionality and create engaging multiplayer experiences.
                  </p>
              </div>
            </div>

            <div className='mt-8'>
              <a href="https://github.com/gamma2653/TCAT_Service_Journal" className="no-underline"><h1 className='text-2xl font-extrabold'>
                6. TCAT Service Journal
              </h1></a>
              <p className='text-sm font-semibold mb-2'>
                Technologies used: <a href='https://www.python.org/'>Python</a>, ETL Framework, Data Analysis, Makefile
              </p>
              <div className='mt-4'>
                  <p className="2xl:pl-100 2xl:pr-100 xl:pl-50 xl:pr-50 sm:pl-0 sm:pr-0">
                    An ETL (Extract, Transform, Load) framework for analyzing Automatic Vehicle Location (AVL) data from TCAT buses, covering the period from 2018 to 2023.
                  </p>
                  <p className="2xl:pl-100 2xl:pr-100 xl:pl-50 xl:pr-50 sm:pl-0 sm:pr-0">
                    This project provides a framework for journaling and analyzing transit bus activity, enabling performance analysis and pattern recognition across multi-year datasets.
                  </p>
                  <p className="2xl:pl-100 2xl:pr-100 xl:pl-50 xl:pr-50 sm:pl-0 sm:pr-0">
                    The system demonstrates data engineering skills with a specialized pipeline for processing transit authority vehicle location and activity patterns for the Ithaca-based TCAT (Tompkins Consolidated Area Transit) system.
                  </p>
              </div>
            </div>
        </div>
    </Page>
  )
}
