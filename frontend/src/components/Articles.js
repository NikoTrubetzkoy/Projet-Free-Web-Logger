import { useEffect, useState } from "react";
import ArticleTag from "./ArticlePlaceholder";

const articleData1 = [
  <p>
    No published articles.
    <br /> Poëme de CH. BAUDELAIRE
  </p>,
  <p>
    Au pays parfumé que le soleil caresse,
    <br />
    J’ai connu, sous un dais d’arbres tout empourprés
    <br />
    Et de palmiers d’où pleut sur les yeux la paresse,
    <br />
    Une dame créole aux charmes ignorés.
    <br />
  </p>,
  <p>
    Son teint est pâle et chaud; la brune enchanteresse
    <br />
    A dans le cou des airs noblement maniérés;
    <br />
    Grande et svelte en marchant comme une chasseresse,
    <br />
    Son sourire est tranquille et ses yeux assurés.
    <br />
  </p>,
  <p>
    Si vous alliez, Madame, au vrai pays de gloire,
    <br />
    Sur les bords de la Seine ou de la verte Loire,
    <br />
    Belle digne d’orner les antiques manoirs,
    <br />
  </p>,
  <p>
    Vous feriez, à l’abri des ombreuses retraites
    <br />
    Germer mille sonnets dans le coeur des poètes,
    <br />
    Que vos grands yeux rendraient plus soumis que vos noirs.
    <br />
  </p>,
];

export default function Articles() {
  const [articleData2, setArticleData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3011/articles", { method: "GET" })
      .then((res) => res.json())
      .then((articlesPublished) => {
        setArticleData(articlesPublished.articlesToPublish);
        console.log("RECEIVED FROM BACKEND :", articlesPublished);
      });
  }, []);

  const articleData = (articleData2.length && articleData2) || articleData1;

  console.log(articleData, typeof articleData);

  const articles = articleData.map((data, i) => {
    console.log(">>>>> DATA NODES FROM MAPPING :", data, typeof data);
    if (data.content) {
      //  return <ArticleTag key={i} content={data.content} />;
      return (
        <ArticleTag
          key={i}
          content={data.content}
          title={data.title}
          date={data.postedOn}
        />
      );
    } else {
      return <ArticleTag key={i} content={data} />;
      /*return (
        <span
          key={i}
          class="w-2/5 justify-self-auto p-4 text-base hover:text-lg"
        >
          {data}
        </span>
      );*/
    }
  });

  return (
    <div class="flex justify-center grid justify-items-stretch">{articles}</div>
  );
}
