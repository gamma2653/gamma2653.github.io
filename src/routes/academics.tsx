import { createFileRoute } from '@tanstack/react-router'
import Page from '../components/page';

export const Route = createFileRoute('/academics')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Page>
        <div className='text-center pl-12 pr-12'>
            <h1 className="text-3xl font-bold mb-4">Academic & Research Projects</h1>
            <div>
                <p className="2xl:pl-100 2xl:pr-100 xl:pl-50 xl:pr-50 sm:pl-0 sm:pr-0">My academic work focuses on computational psychology, data analysis, and applied research in cognitive science and systems analysis.</p>
            </div>
            <div className='mb-8'>
                <p className="2xl:pl-100 2xl:pr-100 xl:pl-50 xl:pr-50 sm:pl-0 sm:pr-0">Here are some of my notable research and academic projects.</p>
            </div>

            <div>
              <a href="https://github.com/gamma2653/odorsampling" className="no-underline"><h1 className='text-2xl font-extrabold'>
                1. Odor Sampling Model
              </h1></a>
              <p className='text-sm font-semibold mb-2'>
                Technologies used: <a href='https://www.python.org/'>Python</a>, <a href='https://yaml.org/'>YAML</a>, Makefile, Scientific Computing
              </p>
              <div className='mt-4'>
                  <p className="2xl:pl-100 2xl:pr-100 xl:pl-50 xl:pr-50 sm:pl-0 sm:pr-0">
                    A computational model designed to simulate physicochemical odor sampling mechanisms in animal olfactory systems.
                  </p>
                  <p className="2xl:pl-100 2xl:pr-100 xl:pl-50 xl:pr-50 sm:pl-0 sm:pr-0">
                    This project uses configurable YAML-based experiments to model how animals sample and process odors at a molecular level, bridging neuroscience, chemistry, and computational modeling.
                  </p>
                  <p className="2xl:pl-100 2xl:pr-100 xl:pl-50 xl:pr-50 sm:pl-0 sm:pr-0">
                    The system features a structured approach to scientific experimentation with Python 3 implementations, improved data structures, and automated visualization capabilities.
                  </p>
              </div>
            </div>

            <div className='mt-8'>
              <a href="https://babylab.cornell.edu" className="no-underline"><h1 className='text-2xl font-extrabold'>
                2. Research Assistant - Cornell B.A.B.Y. Lab
              </h1></a>
              <p className='text-sm font-semibold mb-2'>
                Behavioral Analysis of Beginning Years Laboratory - Developmental Psychology
              </p>
              <div className='mt-4'>
                  <p className="2xl:pl-100 2xl:pr-100 xl:pl-50 xl:pr-50 sm:pl-0 sm:pr-0">
                    Served as a research assistant at the Cornell B.A.B.Y. Lab, part of the Eleanor J. Gibson Laboratory of Developmental Psychology, directed by Dr. Michael Goldstein.
                  </p>
                  <p className="2xl:pl-100 2xl:pr-100 xl:pl-50 xl:pr-50 sm:pl-0 sm:pr-0">
                    The lab employs a unique comparative approach to studying communication and social learning development, maintaining active research programs on both human infant communication development and songbird vocal learning.
                  </p>
                  <p className="2xl:pl-100 2xl:pr-100 xl:pl-50 xl:pr-50 sm:pl-0 sm:pr-0">
                    Research focuses on the mechanisms by which communicative development takes place, examining how human infants and baby birds develop increasingly sophisticated means of communicating that regulate and are regulated by social interaction and feedback.
                  </p>
              </div>
            </div>
        </div>
    </Page>
  )
}
