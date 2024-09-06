function Heading(props: { children?: string }) {
  return <h1>{props.children || ""}</h1>;
}

export default Heading
