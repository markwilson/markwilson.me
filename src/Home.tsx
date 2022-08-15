import "./Home.css";
import SlowLoadingImage from "./SlowLoadingImage";

const Home = () => (
  <div className="page">
    <h1>Mark Wilson</h1>
    <h2>Engineering Manager</h2>
    <div className="portrait">
      <SlowLoadingImage
        src="/portrait.jpg"
        alt="Mark Wilson's headshot"
        width={200}
        height={200}
      />
    </div>
    <div className="links">
      <a href="https://www.linkedin.com/in/mark-wilson-34611923">
        <img src="/linkedin.png" alt="LinkedIn logo" />
      </a>
    </div>
  </div>
);

export default Home;
