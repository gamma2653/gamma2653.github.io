import { createFileRoute } from '@tanstack/react-router'
import Page from '../components/page';

export const Route = createFileRoute('/robotics')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Page>
        <div className='text-center'>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Robotics</h1>
            <div>
                <p className="text-sm sm:text-base leading-relaxed">My robotics projects combine hardware and software to create interactive systems and explore innovative applications of embedded systems.</p>
            </div>
            <div className='mb-6 sm:mb-8'>
                <p className="text-sm sm:text-base leading-relaxed">I contributed to several projects as part of Cornell Cup Robotics, a student project team focused on building autonomous robots.</p>
            </div>

            <div>
              <a href="https://github.com/cornell-cup/c1c0-scheduler" className="no-underline"><h2 className='text-lg sm:text-xl lg:text-2xl font-extrabold'>
                1. C1C0 Scheduler (Cornell Cup Robotics)
              </h2></a>
              <p className='text-xs sm:text-sm font-semibold mb-2'>
                Technologies used: <a href='https://www.python.org/'>Python</a>, Client-Server Architecture, Makefile
              </p>
              <div className='mt-3 sm:mt-4'>
                  <p className="text-sm sm:text-base leading-relaxed">
                    C1C0 Scheduler is a communication integration system that serves as the central hub for coordinating multiple subsystems of the C1C0 robot.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed">
                    This project implements a massive data queue that manages inter-subsystem communication through standardized protocols, enabling modules like locomotion, arm control, and facial recognition to work together seamlessly.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed">
                    The modular architecture allows for extensible subsystem integration with client-server communication patterns.
                  </p>
              </div>
            </div>

            <div className='mt-6 sm:mt-8'>
              <a href="https://github.com/cornell-cup/r2-object_detection" className="no-underline"><h2 className='text-lg sm:text-xl lg:text-2xl font-extrabold'>
                2. R2 Object Detection (Cornell Cup Robotics)
              </h2></a>
              <p className='text-xs sm:text-sm font-semibold mb-2'>
                Technologies used: <a href='https://www.python.org/'>Python</a>, <a href='https://www.tensorflow.org/'>TensorFlow</a>, SSD MobileNet V1, Computer Vision
              </p>
              <div className='mt-3 sm:mt-4'>
                  <p className="text-sm sm:text-base leading-relaxed">
                    R2 Object Detection enables dynamic real-time object detection using the robot's camera system for autonomous navigation and interaction.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed">
                    Built on TensorFlow's Object Detection API with the SSD MobileNet V1 COCO pre-trained model, this project implements computer vision capabilities for identifying and tracking objects in the robot's environment.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed">
                    The system includes kinematic calculations and integrates with the robot's arm for object manipulation tasks.
                  </p>
              </div>
            </div>

            <div className='mt-6 sm:mt-8'>
              <a href="https://github.com/cornell-cup/c1c0-facial-recognition" className="no-underline"><h2 className='text-lg sm:text-xl lg:text-2xl font-extrabold'>
                3. C1C0 Facial Recognition (Cornell Cup Robotics)
              </h2></a>
              <p className='text-xs sm:text-sm font-semibold mb-2'>
                Technologies used: <a href='https://www.python.org/'>Python</a>, Machine Learning, Computer Vision, ImageMagick
              </p>
              <div className='mt-3 sm:mt-4'>
                  <p className="text-sm sm:text-base leading-relaxed">
                    C1C0 Facial Recognition implements face detection, recognition, and learning capabilities for the C1C0 robot to identify and remember individuals.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed">
                    The system uses an efficiency cache to compare and store facial data, enabling real-time recognition through a terminal-based interface that processes commands continuously.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed">
                    Features include automated image caching, real-time camera integration, and optimized processing with configurable parameters for scale, upsampling, and jitter variations.
                  </p>
              </div>
            </div>

            <div className='mt-6 sm:mt-8'>
              <a href="https://github.com/gamma2653/PhoneControlledRobot" className="no-underline"><h2 className='text-lg sm:text-xl lg:text-2xl font-extrabold'>
                4. Phone-Controlled Robot Arm
              </h2></a>
              <p className='text-xs sm:text-sm font-semibold mb-2'>
                Technologies used: <a href='https://www.arduino.cc/'>Arduino</a>, <a href='https://en.wikipedia.org/wiki/C%2B%2B'>C++</a>, HC-06 Bluetooth Module
              </p>
              <div className='mt-3 sm:mt-4'>
                  <p className="text-sm sm:text-base leading-relaxed">
                    A phone-controlled robot arm system built with Arduino and C++, enabling wireless control via Bluetooth connectivity.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed">
                    This project improves upon an original design by Dejan from howtomechatronics.com, addressing serial communication issues with the HC-06 Bluetooth module.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed">
                    Key enhancements include adding delimiters to distinguish between separate data lines and refactoring the code for improved organization and reliability.
                  </p>
              </div>
            </div>

            <div className='mt-6 sm:mt-8'>
              <a href="https://github.com/gamma2653/c1c0_sounds" className="no-underline"><h2 className='text-lg sm:text-xl lg:text-2xl font-extrabold'>
                5. C1C0 Sounds (Morse Code to Dynamic Chirps)
              </h2></a>
              <p className='text-xs sm:text-sm font-semibold mb-2'>
                Technologies used: <a href='https://www.python.org/'>Python</a>
              </p>
              <div className='mt-3 sm:mt-4'>
                  <p className="text-sm sm:text-base leading-relaxed">
                    C1C0 Sounds is an experimental script for converting Morse code into dynamic audio chirps.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed">
                    Created as a demonstration experiment for the C1C0 robot, this project explores audio signal processing and conversion techniques for robotics communication systems.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed">
                    The project showcases Python programming skills and demonstrates creative approaches to signal encoding and transmission.
                  </p>
              </div>
            </div>
        </div>
    </Page>
  )
}
