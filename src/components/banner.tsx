import { mergeClasses } from "../util"

type BannerProps = {
  img: string;
  imgDark?: string;
  to: string;
  caption?: string;
  text_overlay?: string;
  classNames?: {
    div?: string;
    div_a?: string;
    div_a_img?: string;
    div_a_imgDark?: string;
    div_a_caption?: string;
    div_a_text_overlay?: string;
  }
}

export default function Banner({img, imgDark, to, caption, text_overlay, classNames}: BannerProps) {
  return (
    <div className={mergeClasses(classNames?.div)}>
      <a href={to} className={mergeClasses("relative dark:text-white text-black hover:opacity-75", classNames?.div_a)}>
        <img src={img} alt="Banner" className={mergeClasses("w-full h-auto rounded-xl shadow-md block", imgDark ? "dark:hidden" : "", classNames?.div_a_img)}></img>
        {imgDark && <img src={imgDark} alt="Banner Dark Mode" className={mergeClasses("w-full h-auto rounded-xl shadow-md hidden dark:block mb-8", classNames?.div_a_imgDark)}></img>}
        {caption && <p className={mergeClasses("text-center mt-2", classNames?.div_a_caption)}>{caption}</p>}
        {/* Overlay text on image */}
        {text_overlay &&
          <div className={mergeClasses("absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2", classNames?.div_a_text_overlay)}>
            <h2 className="text-4xl font-bold drop-shadow-lg">{text_overlay}</h2>
          </div>
        }
      </a>
    </div>
  )
}
