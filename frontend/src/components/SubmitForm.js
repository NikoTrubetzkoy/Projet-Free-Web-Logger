import { useEffect, useState } from "react";
//import { useForm } from "react-hook-form";
//import toast from "react-hot-toast";
import Moment from "react-moment";

export default function SubmitForm({ userName, myLog }) {
  //const [isModalVisible, setIsModalVisible] = useState(false);
  const [dateStamp, setDateStamp] = useState("");
  useEffect(() => {
    setDateStamp(new Date().toString());
  }, []);

  const nameTag = <span>Votre identifiant : {userName}</span>;

  //const [logTitle, setLogTitle] = useState("");
  async function submitLog(data) {
    var formData = Object.fromEntries(data);
    formData = {
      ...formData,
      log: myLog,
      dateStamp: dateStamp,
      user: userName,
    };
    console.log(formData);

    const res = await fetch("http://localhost:3011/articles/record", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    //const dataFromBack = await res.json();
    //console.log("RESPONSE FROM BACK: ", dataFromBack, typeof dataFromBack);
  }

  /*const submitLog = async (data) => {
    console.log("DATA FOR SERVER: ", data, typeof data);
    const res = await fetch("http://localhost:3011/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const dataFromBack = await res.json();
    console.log("RESPONSE FROM BACK: ", dataFromBack, typeof dataFromBack);
  };*/

  //console.log(userName, dateStamp, myLog);

  return (
    <form action={submitLog}>
      {nameTag}
      <div>
        <Moment>{dateStamp}</Moment>
      </div>
      <div>
        <input type="text" placeholder="Votre titre ?" name="title" />
      </div>

      <div>
        <input class="m-2" id="priv" type="radio" name="public" value="false" />
        <label htmlFor="priv">Garder privé</label>
      </div>
      <div>
        <input class="m-2" id="publ" type="radio" name="public" value="true" />
        <label htmlFor="publ ">Rendre public</label>
      </div>
      <button type="submit">Sauvegarder et Publier</button>
    </form>
  );
}
