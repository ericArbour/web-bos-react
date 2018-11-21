import Reset from "../components/Reset";

const reset = props => (
  console.log(props),
  (
    <div>
      <Reset resetToken={props.query.resetToken} />
    </div>
  )
);

export default reset;
