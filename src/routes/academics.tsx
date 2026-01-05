import { createFileRoute } from '@tanstack/react-router'
import Page from '../components/page';

export const Route = createFileRoute('/academics')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Page>
        <div className='text-center'>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Academic & Research Projects</h1>
            <div>
                <p className="text-sm sm:text-base leading-relaxed">My academic work focuses on computational psychology, data analysis, and applied research in cognitive science and systems analysis.</p>
            </div>
            <div className='mb-6 sm:mb-8'>
                <p className="text-sm sm:text-base leading-relaxed">Here are some of my notable research and academic projects.</p>
            </div>

            <div>
              <a href="https://github.com/gamma2653/odorsampling" className="no-underline"><h2 className='text-lg sm:text-xl lg:text-2xl font-extrabold'>
                1. Odor Sampling Model
              </h2></a>
              <p className='text-xs sm:text-sm font-semibold mb-2'>
                Technologies used: <a href='https://www.python.org/'>Python</a>, <a href='https://yaml.org/'>YAML</a>, Makefile, Scientific Computing
              </p>
              <div className='mt-3 sm:mt-4'>
                  <p className="text-sm sm:text-base leading-relaxed">
                    A computational model designed to simulate physicochemical odor sampling mechanisms in animal olfactory systems.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed">
                    This project uses configurable YAML-based experiments to model how animals sample and process odors at a molecular level, bridging neuroscience, chemistry, and computational modeling.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed">
                    The system features a structured approach to scientific experimentation with Python 3 implementations, improved data structures, and automated visualization capabilities.
                  </p>
              </div>
            </div>

            <div className='mt-6 sm:mt-8'>
              <a href="https://babylab.cornell.edu" className="no-underline"><h2 className='text-lg sm:text-xl lg:text-2xl font-extrabold'>
                2. Research Assistant - Cornell B.A.B.Y. Lab
              </h2></a>
              <p className='text-xs sm:text-sm font-semibold mb-2'>
                Behavioral Analysis of Beginning Years Laboratory - Developmental Psychology
              </p>
              <div className='mt-3 sm:mt-4'>
                  <p className="text-sm sm:text-base leading-relaxed">
                    Served as a research assistant at the Cornell B.A.B.Y. Lab, part of the Eleanor J. Gibson Laboratory of Developmental Psychology, directed by Dr. Michael Goldstein.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed">
                    The lab employs a unique comparative approach to studying communication and social learning development, maintaining active research programs on both human infant communication development and songbird vocal learning.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed">
                    Research focuses on the mechanisms by which communicative development takes place, examining how human infants and baby birds develop increasingly sophisticated means of communicating that regulate and are regulated by social interaction and feedback.
                  </p>
              </div>
            </div>
        </div>
    </Page>
  )
}
