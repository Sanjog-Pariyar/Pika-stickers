
import store from "../store/store";

const Inputs = () => {
  return (
    <input 
        className="search-box"
        type="text" 
        placeholder="Search stickers"
        value={store.filter}
        onChange={(e) => store.setFilter(e.target.value)}
    />
  )
}

export default (Inputs)