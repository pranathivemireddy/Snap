const Video = () => {
  const handleClick = () => {
    window.location.href = '/stalls';
  }
  return (
    <>
        <video src="/video.mp4" width="320" height="180" controls autoPlay></video>  
        <button className="bg-orange-500 px-7.5" onClick={handleClick}>HUNGRY? TOUCH HERE TO ORDER</button>
    </>
  );
};
export default Video;
