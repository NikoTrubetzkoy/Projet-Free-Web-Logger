import { Modal } from "antd";
import { useSelector } from "react-redux";
import { useState } from "react";
import SubmitForm from "./SubmitForm";

export default function Writer() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const user = useSelector((state) => state.user.value);
  const [textContent, setTextContent] = useState("");
  //  console.log(user);
  var userNameTag = <span>Votre identifiant :</span>;

  const showModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  if (user.isConnected) {
    //console.log(user);
    userNameTag = user.username;
  } else {
    userNameTag = "Compte non activé";
  }

  var modalContent;

  if (isModalVisible) {
    modalContent = (
      <div>
        <SubmitForm userName={userNameTag} myLog={textContent} />
        <button class="place-self-end" onClick={closeModal}>
          Fermer (x)
        </button>
      </div>
    );
  } else {
    modalContent = (
      <div>
        <SubmitForm />
      </div>
    );
  }

  return (
    //<input class="size-96" type="text" name="my-log" size="200"></input>
    /*
    <div class="self-center">
      <textarea class='self-center' name="my-log" rows="25" cols="50" wrap="soft"> </textarea>
    </div> */
    <div class="flex flex-col justify-center items-center">
      <form action={() => showModal()}>
        <label
          htmlFor="message"
          class="block self-center mb-2 text-sm font-medium text-gray-900"
        >
          Publication de contenu :<br />
        </label>
        <textarea
          id="message"
          name="textContent"
          rows="10"
          cols="75"
          class="w-full self-center text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Commencez à rédiger votre article..."
          onChange={(e) => setTextContent(e.target.value)}
          value={textContent}
        ></textarea>
        <input
          class="button"
          type="submit"
          value="Enregistrer votre document et choisir son titre"
        ></input>
      </form>
      {isModalVisible && (
        <Modal
          getContainer="#react-modals"
          open={isModalVisible}
          closable={false}
          footer={null}
        >
          {modalContent}
        </Modal>
      )}
    </div>
  );
}

/* METHODE POUR POSTER LES DONNÉES
const [registerInput, setRegisterInput] = useState({
    username: "",
    password: "",
  });

 <input
          type="text"
          placeholder="Username"
          id="signUpUsername"
          value={registerInput.username}
          onChange={(e) =>
            setRegisterInput((prev) => {
              return {
                ...prev,
                username: e.target.value,
              };
            })
          }
        />
        <input
          type="password"
          placeholder="Password"
          id="signUpPassword"
          value={registerInput.password}
          onChange={(e) =>
            setRegisterInput((prev) => {
              return {
                ...prev,
                password: e.target.value,
              };
            })
          }
        />
        <button onClick={handleRegister} id="register">
          Register
        </button>
*/
