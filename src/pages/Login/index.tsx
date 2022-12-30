import { ButtonHTMLAttributes, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function Login() {
  const countryCode = "+55";

  const { user, sendOTP, verifyOTP } = useAuth();
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
    <>
      <p>Login</p>
      <form onSubmit={(event) => sendOTP(event, phoneNumber, setExpandForm)}>
        <label htmlFor="telephone">Insira o número de telefone</label>
        <input
          type="tel"
          id="telephone"
          name="telephone"
          placeholder="+00 (00) 00000-0000"
          onChange={(event) => setPhoneNumber(event.target.value)}
          value={phoneNumber}
        />
        {expandForm && (
          <input
            type="number"
            id="code"
            name="code"
            placeholder="Insira o código"
            onChange={(event) => handlePhoneNumberLogin(event)}
            value={OTP}
          />
        )}

        {!expandForm && <button type="submit">Enviar código</button>}
        <div id="recaptcha-container"></div>
      </form>
    </>
  );
}
