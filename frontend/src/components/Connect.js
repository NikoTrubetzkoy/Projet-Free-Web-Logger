import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import Modal from "antd/lib/modal/Modal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { login, logout } from "../reducers/user";

export default function Connect() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const showModal = () => {
    console.log("Modal window is visible before change :", isModalVisible);
    setIsModalVisible(!isModalVisible);
    console.log("Modal window is visible :", isModalVisible);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const {
    register: registerForm,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerFormError },
    reset: resetRegisterForm,
  } = useForm({
    mode: "onBlur",
  });

  const {
    register: connectForm,
    handleSubmit: handleConnectForm,
    formState: { errors: connectFormError },
    reset: resetConnectForm,
  } = useForm({
    mode: "onBlur",
  });

  const handleRegister = async (data) => {
    console.log(data);
    const res = await fetch("http://localhost:3011/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const dataFromBack = await res.json();
    console.log(dataFromBack);
    if (dataFromBack.result) {
      resetRegisterForm();
      setIsModalVisible(false);
      toast.success("Le nouveau compte a bien été créé.");
      dispatch(login(data.username));
    } else {
      toast.error("Username already exists, please use another one", {
        position: "top-right",
      });
    }
  };

  const handleConnect = async (data) => {
    const res = await fetch("http://localhost:3011/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const dataFromBack = await res.json();
    if (dataFromBack.result) {
      resetConnectForm();
      setIsModalVisible(false);
      setErrorMsg("");
      dispatch(login(data.username));
      toast.success("Connexion réussie !");
    } else {
      setErrorMsg("Wrong username / password");
      toast.error("Invalid credentials", {
        position: "top-right",
      });
    }
  };

  const handleLogout = async () => {
    const res = await fetch("http://localhost:3011/users/logout", {
      method: "POST",
      //credentials: "include",
    });
    await res.json();
    dispatch(logout());
  };

  const modalContent = (
    <div>
      <form
        onSubmit={handleRegisterSubmit(handleRegister)}
        //        className={styles.registerSection}
      >
        <span>Sign-up</span>
        <input
          type="text"
          placeholder="Username"
          {...registerForm("username", {
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must have at least 3 characters",
            },
          })}
        />
        {registerFormError.username && (
          <span>{registerFormError.username.message}</span>
        )}
        <input
          type="password"
          placeholder="Password"
          {...registerForm("password", {
            required: "Password is required",
            /*minLength: {
              value: 8,
              message: "Password must contain at least 8 characters",
            }*/
            /* pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "Password must contain at least 1 upper case letter, 1 lower case letter, 1 number and 1 special character.",
            }*/
          })}
        />
        {/*registerFormError.password && (
          <span>{registerFormError.password.message}</span>
        )*/}
        <button type="submit">Register</button>
      </form>
      <form
        onSubmit={handleConnectForm(handleConnect)}
        //        className={styles.registerSection}
      >
        <span>Sign-in</span>
        <input
          type="text"
          placeholder="Username"
          {...connectForm("username", {
            required: "Username is required",
          })}
        />
        {connectFormError.username && (
          <span>{connectFormError.username.message}</span>
        )}
        <input
          type="password"
          placeholder="Password"
          {...connectForm("password", {
            required: "Password is required",
          })}
        />
        {connectFormError.password && (
          <span>{connectFormError.password.message}</span>
        )}
        {errorMsg && <span>{errorMsg}</span>}
        <button type="submit">Connect</button>
      </form>
      <span onClick={closeModal}>Fermer (x)</span>
    </div>
  );

  let userSection;
  if (user.isConnected) {
    userSection = (
      <p>
        Welcome {user.username} / <button onClick={handleLogout}>Logout</button>
      </p>
    );
  } else {
    if (isModalVisible) {
      userSection = (
        <FontAwesomeIcon
          class="ml-6"
          icon={faXmark}
          onClick={() => showModal()}
          //        className={styles.userSection}
        />
      );
    } else {
      userSection = (
        <div class="mr-6" onClick={() => showModal()}>
          <span class="mr-6">Connexion au site</span>
          <FontAwesomeIcon
            icon={faUser}
            //className={styles.userSection}
          />
        </div>
      );
    }
  }

  return (
    <div class="px-5 self-center pr-4">
      {userSection}
      {isModalVisible && (
        <div id="react-modals">
          <Modal
            getContainer="#react-modals"
            //            className={styles.modal}
            open={isModalVisible}
            closable={false}
            footer={null}
          >
            {modalContent}
          </Modal>
        </div>
      )}
    </div>
  );
}
