import axios from "axios";
import { useEffect, useState } from "react";

import { copy, linkIcon, loader, tick } from "../assets";
const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const [fetched, setIsFetched] = useState(false);

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFetched(false);
    try {
      const { data } = await getSummary({ articleUrl: article.url });
      if (data?.summary) {
        setIsFetched(true);

        const encodedParams = new URLSearchParams();
        encodedParams.set("to", "ar");
        encodedParams.set("text", data.summary);
        await axios
          .request({
            method: "POST",
            url: "https://translo.p.rapidapi.com/api/v3/translate",
            headers: {
              "content-type": "application/x-www-form-urlencoded",
              "X-RapidAPI-Key": rapidApiKey,
              "X-RapidAPI-Host": "translo.p.rapidapi.com",
            },
            data: encodedParams,
          })
          .then((response) => {
            console.log(response.data.translated_text);
            const newArticle = {
              ...article,
              summary: response.data.translated_text,
            };
            const updatedAllArticles = [...allArticles, newArticle];
            setArticle(newArticle);
            setAllArticles(updatedAllArticles);

            localStorage.setItem(
              "articles",
              JSON.stringify(updatedAllArticles)
            );
            setIsFetched(false);
          })
          .catch((e) => {
            setIsFetched(false);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (error) {
    console.log(error);
  }

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2 ">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
          dir="rtl"
        >
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            <p>↵</p>
          </button>{" "}
          <img
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) => {
              setArticle({ ...article, url: e.target.value });
            }}
            required
            className="url_input peer"
          />
        </form>
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => {
            return (
              <div
                className="link_card"
                key={index}
                onClick={() => {
                  setArticle(item);
                }}
              >
                <div className="copy_btn">
                  <img
                    src={copied === item.url ? tick : copy}
                    alt="copy_icon"
                    className="w-[40%] h-[40%] object-contain"
                    onClick={() => handleCopy(item.url)}
                  />
                </div>
                <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                  {item.url}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="my-10 max-w-full flex - justify-center items-center">
        {isFetching || fetched ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Well , that was not supposed to happen...
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-cairo font-bold text-gray-600 text-xl">
                المخلص
              </h2>
              <div className="summary_box">
                <p
                  dir="rtl"
                  className="font-inter font-medium text-gray-700 text-sm"
                >
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
