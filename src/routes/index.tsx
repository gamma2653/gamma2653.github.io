// import './styles.css';
import Banner from '../components/banner';
import Page from '../components/page';
import storyboard from '../assets/images/portfolio/storyboard.png';
import c1c0_collage from '../assets/images/portfolio/c1c0_collage.jpg';
import bluestamp_collage from '../assets/images/portfolio/bluestamp_collage.jpg';
import { createFileRoute } from '@tanstack/react-router'
// import Navbar from '../features/shared/components/nav'


const App = () => {
  return (
    <Page>
      <Banner img={storyboard} to="/software" text_overlay="Software" classNames={{div: "mt-0"}}/>
      <Banner img={c1c0_collage} to="/robotics" text_overlay="Robotics" classNames={{div: "mt-2 mb-2"}} />
      <Banner img={bluestamp_collage} to="/academics" text_overlay="Academics" classNames={{div: "mt-2"}} />
      <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-2 text-center leading-relaxed">
        You will find that all of my projects have been oriented towards understanding how information is processed,
        as well as some other hobby related projects.
        From a young age I have always found the experience of life to be fascinating,
        how is it that we are able to perceive the present moment? What triggers us into action,
        and how can we learn to live more in the present?
        This lead me down a wide-spanning path of studying a combination of computer science and psychology,
        and the pleasant surprise of how interconnected these two subjects really are— unexpectedly so.
        Although clearer to many now with the advent of large AI models,
        early in my academic career it proved difficult to consolidate what I had learned in these two disparate fields,
        until it finally clicked. The crux of the connection is simple: computational irreducibility.
        The human brain is a prediction engine; or better to explain my point, a consolidation (reduction) machine.
        It attempts to create a model, however imperfect it may be, of our experience (evolutionarily for the purpose of homeostasis).
        Although research is ongoing, I believe this to be a purely cognitive (i.e. computational) process.
        With this lens, the intersection and value of studying psychology and computer science together becomes apparent:
        in the day and age where we are building "thinking" machines,
        understanding the nature of thought becomes all the more important.
      </p>
      <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-2 text-center leading-relaxed">
        Thanks for taking the time to check out my portfolio. Feel free to reach out through the contact page!
      </p>

    </Page>
  );
};


export const Route = createFileRoute('/')({
  component: App,

})
