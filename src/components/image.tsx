import clsx from "clsx";

type CaptionedImageProps = {
    src: string;
    alt: string;
    caption: string;
    classNames?: {
        div?: string;
        div_img?: string;
        div_p?: string;
    }
}

const CaptionedImage = ({
    src,
    alt,
    caption,
    classNames,
}: CaptionedImageProps) => {
    return (
        <div className={clsx(classNames?.div)}>
            <img src={src} alt={alt} className={clsx("rounded-lg shadow-md", classNames?.div_img)} />
            <p className={clsx("text-center mt-2 text-sm text-gray-600", classNames?.div_p)}>{caption}</p>
        </div>
    );
}
export { CaptionedImage };