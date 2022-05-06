import hinataFailedSvg from "../../hinata-failed.svg";
import Loading from "../Loader/Loading";

export const PageStateHandler = ({
  children,
  showLoader = false,
  showError = null,
  showEmpty = false,
  retryHandler = () => {
    console.log("Retry!!");
  },
}) => {
  if (showLoader) {
    return <Loading />;
  }
  if (showError) {
    return (
      <div className="position-absolute h-100 w-100 start-0 d-flex flex-column justify-content-center align-items-center">
        <img
          src={hinataFailedSvg}
          alt="hinata is furious"
          className="animate__animated animate__headShake"
          style={{ width: "300px", height: "300px" }}
        />
        <h4 className="text-center animate__animated animate__fadeIn">
          По вашему запросу ничего не найдено
        </h4>
        <div
          className="position-absolute bottom-0 end-0 alert alert-danger me-3"
          role="alert"
          onClick={retryHandler}
        >
          <p className="bold">{showError.name}</p>
          Not found, please retry!
        </div>
      </div>
    );
  }
  if (showEmpty) {
    return (
      <div className="container">
        <p>No data available</p>
      </div>
    );
  }
  return <>{children}</>;
};
