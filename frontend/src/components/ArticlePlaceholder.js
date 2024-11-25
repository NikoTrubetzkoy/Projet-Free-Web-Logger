export default function ArticlePlaceholder({ content, title, date }) {
  //console.log("PLACEHOLDER CONTENT : ", content, typeof content);
  return (
    <div class="w-2/5 justify-self-auto p-4 text-base hover:text-lg container mx-auto">
      <div class="my-8 justify-self-centert decoration-solid">{title}</div>
      {content}
      <div class="my-6 justify-self-end">Publié le :{date}</div>
    </div>
  );
}
