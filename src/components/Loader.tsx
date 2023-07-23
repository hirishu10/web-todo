const Loader = ({ loadingMessage }: { loadingMessage: string }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2>{`🌀 ${loadingMessage}...`}</h2>
      <div
        style={{
          width: "100%",
          height: "20%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: "8px",
        }}
      >
        <h6>from</h6>
        <h3>web-ToDo App</h3>
      </div>
    </div>
  );
};

export default Loader;
