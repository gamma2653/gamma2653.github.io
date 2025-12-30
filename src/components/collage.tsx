type CollageProps = {
    imgs: string[];
}

const Collage = ({ imgs }: CollageProps) => {
    const img_count = imgs.length;
    const cols = img_count >= 3 ? 3 : img_count;
    console.log(`Rendering collage with ${img_count} images in ${cols} columns.`);
    // return (
    //     <div>
    //         <div className={`grid grid-cols-${cols} gap-4`}>
    //             {imgs.map((img, index) => (
    //                 <div>
    //                     <img key={index} src={img} alt={`Collage Image ${index + 1}`} className="h-auto w-full rounded-lg shadow-md" />
    //                 </div>
    //             ))}
    //         </div>
    //     </div>
    // );
    // For some reason, Tailwind doesn't support dynamic grid-cols-{n}, so we have to hardcode the layouts.
    if (img_count >= 3) {
        return (
            <div>
                <div className={`grid grid-cols-3 gap-4`}>
                    {imgs.map((img, index) => (
                        <div key={index}>
                            <img src={img} alt={`Collage Image ${index + 1}`} className="h-auto w-full rounded-lg shadow-md" />
                        </div>
                    ))}
                </div>
            </div>
        );
    } else if (img_count === 2) {
        return (
            <div>
                <div className={`grid grid-cols-2 gap-4`}>
                    {imgs.map((img, index) => (
                        <div key={index}>
                            <img src={img} alt={`Collage Image ${index + 1}`} className="h-auto w-full rounded-lg shadow-md" />
                        </div>
                    ))}
                </div>
            </div>
        );
    } else if (img_count === 1) {
        return (
            <div>
                <div className={`grid grid-cols-1 gap-4`}>
                    {imgs.map((img, index) => (
                        <div key={index}>
                            <img src={img} alt={`Collage Image ${index + 1}`} className="h-auto w-full rounded-lg shadow-md" />
                        </div>
                    ))}
                </div>
            </div>
        );
    } else {
        return <div>No images to display.</div>;
    }
}
export default Collage;