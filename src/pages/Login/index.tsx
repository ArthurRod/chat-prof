import { ArrowLeft } from "phosphor-react";
import { useState } from "react";
import ReactInputMask from "react-input-mask";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function Login() {
  const countryCode = "+55";
  const pathName = window.location.pathname

  const { sendOTP, verifyOTP } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState(countryCode);
  const [expandForm, setExpandForm] = useState(false);
  const [OTP, setOTP] = useState("");

  const navigate = useNavigate();

  function handlePhoneNumberLogin(event: any) {
    const otp = event.target.value;
    setOTP(otp);

    if (otp.length === 6) {
      verifyOTP(otp)
        .then(() => {
          navigate("/home");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <div className="login-register login">
      <Link className="back-button" to="/">
        <ArrowLeft size={16} />
        Voltar
      </Link>
      <h3 className="title">Login</h3>
      <form onSubmit={(event) => sendOTP(event, phoneNumber, setExpandForm)}>
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
    </div>
  );
}
