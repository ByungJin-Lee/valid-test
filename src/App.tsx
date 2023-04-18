import SignUpForm from "./components/SignUpForm/SignUpForm";

function App() {
  return (
    <main
      id="#app"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <SignUpForm />
    </main>
  );
}

export default App;
