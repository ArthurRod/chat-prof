import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactInputMask from "react-input-mask";
import { ArrowLeft } from "phosphor-react";

import { useAuth } from "../../hooks/useAuth";
import { Loading } from "../../components/Loading";
import { UserConected } from "../../routes/UserConected";

export function Login() {
  const countryCode = "+55";

  const { loadingUser, user, sendOTP, logInWithPhoneNumber } = useAuth();

  const [phoneNumber, setPhoneNumber] = useState(countryCode);
  const [expandForm, setExpandForm] = useState(false);
  const [OTP, setOTP] = useState("");

  const navigate = useNavigate();

  function handlePhoneNumberLogin(event: React.ChangeEvent<HTMLInputElement>) {
    const otp = event.target.value;

    setOTP(otp);

    if (otp.length === 6) {
      logInWithPhoneNumber(otp)
        .then(() => {
          navigate("/home");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  if (loadingUser) {
    return <Loading />;
  }

  return (
    <>
      {user ? (
        <UserConected pathName="login" />
      ) : (
        <section className="login-register login">
          <Link className="back-button" to="/">
            <ArrowLeft size={16} />
            Voltar
          </Link>
          <h3 className="title">Login</h3>
          <form
            onSubmit={(event) => sendOTP(event, phoneNumber, setExpandForm)}
          >
            <label htmlFor="telephone">Insira o número de telefone</label>
            <ReactInputMask
              type="tel"
              id="telephone"
              name="telephone"
              placeholder="+00 (00) 00000-0000"
              onChange={(event: any) => setPhoneNumber(event.target.value)}
              value={phoneNumber}
              mask="+99 (99) 99999-9999"
              required
            />
            {expandForm && (
              <input
                type="number"
                id="code"
                name="code"
                placeholder="Insira o código"
                onChange={(event) => handlePhoneNumberLogin(event)}
                value={OTP}
                required
              />
            )}

            {!expandForm && (
              <button
                disabled={phoneNumber.length < 10}
                className="btn"
                type="submit"
              >
                Enviar código
              </button>
            )}
            <div id="recaptcha-container"></div>
          </form>
        </section>
      )}
    </>
  );
}
