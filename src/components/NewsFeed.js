import { useEffect, useState } from "react";
import axios from "axios";

const NewsFeed = () => {
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "http://localhost:8000/news",
    };

    axios
      .request(options)
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const first7Articles = articles?.slice(0, 7);
  return (
    <div className="news-feed">
      <h2>NewsFeed</h2>
      {first7Articles?.map((article, index) => {
        return (
          <div key={index}>
            <a href={article.URL}>
              <p>{article.Title}</p>
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default NewsFeed;
