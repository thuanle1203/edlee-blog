import { useDispatch } from "react-redux";
import * as acitons from "./redux/action";

function App() {
  const dispatch = useDispatch();

  dispatch(acitons.getPosts.getPostsRequest());

  return <p>This is blog app!</p>;
}

export default App;
