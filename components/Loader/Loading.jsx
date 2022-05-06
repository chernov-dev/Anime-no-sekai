import { Spinner } from "react-bootstrap";
import hinataSvg from "../../hinata.svg";

const Loading = () => {
  return (
    <div className="position-absolute h-100 w-100 start-0 d-flex flex-column justify-content-center align-items-center">
      <div className="animate__animated animate__fadeIn align-items-center d-flex flex-column">
        <Spinner animation="border"></Spinner>
        <p>Loading...</p>
      </div>
      <div className="position-absolute end-0 bottom-0">
      <img src={hinataSvg} alt="hinata is hiding" className='animate__animated animate__backInRight'/>
      </div>
    </div>
  );
};

export default Loading;
