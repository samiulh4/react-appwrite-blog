import { useState, useEffect } from "react";
import ArticleCard from "../components/Article/ArticleCard"
import appWriteService from "../services/AppWriteService";


const Home = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const articleData = await appWriteService.getArticles([]);
      setArticles(articleData.documents);
    }
    fetchArticles();
  }, [])

  return (
    <>
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.$id} {...article} />
          ))}
        </div>
      ) : (
        <h3 className="text-center text-3xl font-bold mb-6 text-green-600">Loading..</h3>
      )}
    </>
  )
}

export default Home