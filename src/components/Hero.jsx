import { logo } from "../assets";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col ">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={logo} alt="sumz_logo" className="w-28  object-contain" />
        <button
          type="button"
          onClick={() =>
            window.open(
              "https://github.com/EidAlmutairi0/AI_summarizer",
              "_blank"
            )
          }
          className="black_btn"
        >
          Github
        </button>
      </nav>
      <h1 className="head_text font-cairo ">
        لخص اي شيء مع <br className="max-md:hidden" />
        <span className="orange_gradient font-satoshi text-5xl">
          OpenAI GPT-4
        </span>
      </h1>
      <h2 className="desc font-cairo">
        لخص اي شيء بأي لغة في ثواني بإستخدام أحدث تقنيات الذكاء الإصطناعي{" "}
      </h2>
    </header>
  );
};

export default Hero;
