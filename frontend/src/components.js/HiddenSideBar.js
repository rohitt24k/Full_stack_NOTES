function HiddenSideBar({ setShowSideBar }) {
  return (
    <div>
      <span
        className="material-symbols-outlined"
        onClick={() => {
          setShowSideBar((c) => !c);
        }}
      >
        menu
      </span>
    </div>
  );
}

export default HiddenSideBar;
