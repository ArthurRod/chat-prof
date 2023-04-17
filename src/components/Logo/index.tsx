import feedBackWhite from "../../assets/svg/feedback-white.svg";

export function Logo() {
  return (
    <div className="logo">
      <img className="image" src={feedBackWhite} alt="Imagem de chat" />
      <h3 className="text">Chat Prof</h3>
    </div>
  );
}
